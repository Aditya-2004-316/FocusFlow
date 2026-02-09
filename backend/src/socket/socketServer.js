import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import GroupSession from "../models/GroupSession.js";
import User from "../models/User.js";

let io = null;

/**
 * Initialize Socket.io server
 */
export const initializeSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: (origin, callback) => {
                const allowedOrigins = [
                    ...(process.env.CORS_ORIGIN_PROD || "").split(",").map(o => o.trim().replace(/\/$/, "")),
                    ...(process.env.CORS_ORIGIN || "").split(",").map(o => o.trim().replace(/\/$/, "")),
                    "http://localhost:3000",
                    "http://localhost:5173",
                    "http://localhost:5000",
                ].filter(Boolean);

                const normalizedOrigin = origin ? origin.replace(/\/$/, "") : null;
                if (!normalizedOrigin || allowedOrigins.includes(normalizedOrigin)) {
                    callback(null, true);
                } else {
                    callback(new Error("Not allowed by CORS"));
                }
            },
            methods: ["GET", "POST"],
            credentials: true,
        },
        pingTimeout: 60000,
        pingInterval: 25000,
    });

    // Authentication middleware
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token ||
                socket.handshake.headers.authorization?.replace("Bearer ", "");

            if (!token) {
                return next(new Error("Authentication required"));
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Support both 'userId' and 'id' property names for compatibility
            const userId = decoded.userId || decoded.id;

            if (!userId) {
                console.error("Socket auth: No userId in token", decoded);
                return next(new Error("Invalid token format"));
            }

            const user = await User.findById(userId).select("_id username avatar");

            if (!user) {
                console.error("Socket auth: User not found for id:", userId);
                return next(new Error("User not found"));
            }

            socket.userId = user._id.toString();
            socket.user = {
                _id: user._id,
                username: user.username,
                avatar: user.avatar,
            };

            next();
        } catch (error) {
            console.error("Socket auth error:", error.message);
            next(new Error("Authentication failed"));
        }
    });

    // Connection handler
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.user.username} (${socket.userId})`);

        // Join a community room for chat
        socket.on("join_community", (communityId) => {
            socket.join(communityId);
            console.log(`${socket.user.username} joined community room ${communityId}`);
        });

        socket.on("leave_community", (communityId) => {
            socket.leave(communityId);
            console.log(`${socket.user.username} left community room ${communityId}`);
        });

        // Join a group session room
        socket.on("session:join", async (sessionId) => {
            try {
                const session = await GroupSession.findById(sessionId)
                    .populate("participants.userId", "username avatar");

                if (!session) {
                    socket.emit("error", { message: "Session not found" });
                    return;
                }

                // Check if user was disconnected and handle reconnection
                const participant = session.getParticipant(socket.userId);
                if (participant && participant.status === "disconnected") {
                    // Handle reconnection
                    const activeStatuses = ["lobby", "relaxation", "focus", "break", "paused"];
                    if (activeStatuses.includes(session.status)) {
                        participant.status = session.status === "lobby" ? "waiting" : "active";
                        participant.lastSeen = new Date();
                        await session.save();

                        // Notify others about reconnection
                        socket.to(`session:${sessionId}`).emit("participant:reconnected", {
                            user: socket.user,
                            sessionId,
                            newStatus: participant.status,
                        });

                        // Broadcast updated session state
                        const updatedSessionOnReconnect = await GroupSession.findById(sessionId)
                            .populate("participants.userId", "username avatar");
                        io.in(`session:${sessionId}`).emit("session:state", {
                            session: updatedSessionOnReconnect,
                            serverTime: Date.now(),
                        });

                        console.log(`${socket.user.username} reconnected to session ${sessionId}`);
                    }
                }

                // Join the socket room
                socket.join(`session:${sessionId}`);
                socket.currentSessionId = sessionId;

                // Reload session with updated data
                const updatedSession = await GroupSession.findById(sessionId)
                    .populate("participants.userId", "username avatar");

                // Broadcast current session state to EVERYONE in the room (including joiner)
                io.in(`session:${sessionId}`).emit("session:state", {
                    session: updatedSession,
                    serverTime: Date.now(),
                });

                // Also notify others specifically (for toasts)
                if (!participant || (participant && participant.status !== "disconnected")) {
                    socket.to(`session:${sessionId}`).emit("participant:joined", {
                        user: socket.user,
                        sessionId,
                    });
                }

                console.log(`${socket.user.username} joined session ${sessionId}`);
            } catch (error) {
                console.error("Error joining session:", error);
                socket.emit("error", { message: "Failed to join session" });
            }
        });

        // Leave a group session room
        socket.on("session:leave", async (sessionId) => {
            socket.leave(`session:${sessionId}`);
            socket.currentSessionId = null;

            // Notify others
            socket.to(`session:${sessionId}`).emit("participant:left", {
                user: socket.user,
                sessionId,
            });

            // Update session state for others
            const updatedSession = await GroupSession.findById(sessionId)
                .populate("participants.userId", "username avatar");
            if (updatedSession) {
                socket.to(`session:${sessionId}`).emit("session:state", {
                    session: updatedSession,
                    serverTime: Date.now(),
                });
            }

            console.log(`${socket.user.username} left session ${sessionId}`);
        });

        // Update participant status
        socket.on("participant:status", async ({ sessionId, status }) => {
            try {
                const session = await GroupSession.findById(sessionId);
                if (!session) return;

                const participant = session.getParticipant(socket.userId);
                if (!participant) return;

                participant.status = status;
                participant.lastSeen = new Date();

                if (status === "ready") {
                    participant.readyAt = new Date();
                }

                await session.save();
                await session.populate("participants.userId", "username avatar");

                // Broadcast status update to all in session (including sender)
                io.in(`session:${sessionId}`).emit("participant:statusUpdated", {
                    userId: socket.userId,
                    user: socket.user,
                    status,
                    allReady: session.allParticipantsReady(),
                    session, // Include full session state
                });
            } catch (error) {
                console.error("Error updating status:", error);
            }
        });

        // Heartbeat
        socket.on("heartbeat", async (sessionId) => {
            try {
                if (!sessionId) return;

                const session = await GroupSession.findById(sessionId);
                if (!session) return;

                const participant = session.getParticipant(socket.userId);
                if (participant) {
                    participant.lastSeen = new Date();
                    await session.save();
                }
            } catch (error) {
                console.error("Heartbeat error:", error);
            }
        });

        // Host starts the session
        socket.on("session:start", async (sessionId) => {
            try {
                const session = await GroupSession.findById(sessionId);
                if (!session) return;

                if (session.hostId.toString() !== socket.userId) {
                    socket.emit("error", { message: "Only host can start the session" });
                    return;
                }

                if (session.status !== "lobby") {
                    socket.emit("error", { message: "Session already started" });
                    return;
                }

                // Start with relaxation or focus
                const startTime = new Date();
                if (session.settings.relaxationActivity) {
                    session.status = "relaxation";
                    session.timeline.relaxationStartedAt = startTime;
                } else {
                    session.status = "focus";
                    session.timeline.focusStartedAt = startTime;
                    session.timeline.focusEndsAt = new Date(
                        startTime.getTime() + (session.settings.focusDuration * 60 * 1000)
                    );
                }

                // Update participants
                session.participants.forEach(p => {
                    if (["waiting", "ready"].includes(p.status)) {
                        p.status = "active";
                    }
                });

                await session.save();
                await session.populate("participants.userId", "username avatar");

                // Broadcast to all participants (including host who started)
                io.in(`session:${sessionId}`).emit("session:started", {
                    session,
                    startedBy: socket.user,
                    serverTime: Date.now(),
                });

                console.log(`Session ${sessionId} started by ${socket.user.username}`);
            } catch (error) {
                console.error("Error starting session:", error);
                socket.emit("error", { message: "Failed to start session" });
            }
        });

        // Advance session phase
        socket.on("session:advance", async (sessionId) => {
            try {
                const session = await GroupSession.findById(sessionId);
                if (!session) return;

                if (session.hostId.toString() !== socket.userId) {
                    socket.emit("error", { message: "Only host can advance the session" });
                    return;
                }

                const now = new Date();
                let newStatus = session.status;

                switch (session.status) {
                    case "relaxation":
                        session.status = "focus";
                        session.timeline.focusStartedAt = now;
                        session.timeline.focusEndsAt = new Date(
                            now.getTime() + (session.settings.focusDuration * 60 * 1000)
                        );
                        newStatus = "focus";
                        break;

                    case "focus":
                        if (session.settings.breakDuration > 0) {
                            session.status = "break";
                            session.timeline.breakStartedAt = now;
                            newStatus = "break";
                        } else {
                            session.status = "completed";
                            session.timeline.completedAt = now;
                            newStatus = "completed";
                        }
                        break;

                    case "break":
                        session.status = "completed";
                        session.timeline.completedAt = now;
                        newStatus = "completed";
                        break;
                }

                // If completed, update stats
                if (newStatus === "completed") {
                    session.stats.totalFocusMinutes = session.settings.focusDuration;
                    const completedCount = session.participants.filter(p =>
                        ["active", "completed"].includes(p.status)
                    ).length;
                    session.stats.completionRate =
                        (completedCount / session.stats.participantCount) * 100;

                    session.participants.forEach(p => {
                        if (p.status === "active") {
                            p.status = "completed";
                            p.focusTimeCompleted = session.settings.focusDuration * 60;
                        }
                    });
                }

                await session.save();
                await session.populate("participants.userId", "username avatar");

                // Broadcast phase change (including host)
                io.in(`session:${sessionId}`).emit("session:phaseChanged", {
                    session,
                    newPhase: newStatus,
                    changedBy: socket.user,
                    serverTime: Date.now(),
                });

                console.log(`Session ${sessionId} advanced to ${newStatus}`);
            } catch (error) {
                console.error("Error advancing session:", error);
                socket.emit("error", { message: "Failed to advance session" });
            }
        });

        // Handle disconnect
        socket.on("disconnect", async () => {
            console.log(`User disconnected: ${socket.user.username}`);

            if (socket.currentSessionId) {
                try {
                    const session = await GroupSession.findById(socket.currentSessionId);
                    if (session) {
                        const participant = session.getParticipant(socket.userId);
                        if (participant && !["left", "completed"].includes(participant.status)) {
                            participant.status = "disconnected";
                            participant.lastSeen = new Date();
                            await session.save();

                            const updatedSessionOnDisconnect = await GroupSession.findById(socket.currentSessionId)
                                .populate("participants.userId", "username avatar");

                            // Notify others specifically (for toasts)
                            socket.to(`session:${socket.currentSessionId}`).emit("participant:disconnected", {
                                user: socket.user,
                                sessionId: socket.currentSessionId,
                            });

                            // Broadcast updated state to everyone else
                            socket.to(`session:${socket.currentSessionId}`).emit("session:state", {
                                session: updatedSessionOnDisconnect,
                                serverTime: Date.now(),
                            });
                        }
                    }
                } catch (error) {
                    console.error("Error handling disconnect:", error);
                }
            }
        });
    });

    console.log("Socket.io initialized");
    return io;
};

/**
 * Get the Socket.io instance
 */
export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
};

/**
 * Emit event to a session room
 */
export const emitToSession = (sessionId, event, data) => {
    if (io) {
        io.to(`session:${sessionId}`).emit(event, data);
    }
};

export default { initializeSocket, getIO, emitToSession };
