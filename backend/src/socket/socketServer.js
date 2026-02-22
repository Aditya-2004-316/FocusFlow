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

                // Check if user was disconnected and handle reconnection atomically
                const participant = session.participants.find(
                    p => p.userId.toString() === socket.userId
                );
                if (participant && participant.status === "disconnected") {
                    const activeStatuses = ["lobby", "relaxation", "focus", "break", "paused"];
                    if (activeStatuses.includes(session.status)) {
                        const reconnectStatus = session.status === "lobby" ? "waiting" : "active";
                        // Atomic update — no separate save() needed
                        await GroupSession.findOneAndUpdate(
                            { _id: sessionId, "participants.userId": socket.userId },
                            { $set: { "participants.$.status": reconnectStatus, "participants.$.lastSeen": new Date() } }
                        );

                        socket.to(`session:${sessionId}`).emit("participant:reconnected", {
                            user: socket.user,
                            sessionId,
                            newStatus: reconnectStatus,
                        });

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

        // Update participant status via socket (atomic)
        socket.on("participant:status", async ({ sessionId, status }) => {
            try {
                const now = new Date();
                const setFields = {
                    "participants.$.status": status,
                    "participants.$.lastSeen": now,
                };
                if (status === "ready") setFields["participants.$.readyAt"] = now;

                const session = await GroupSession.findOneAndUpdate(
                    {
                        _id: sessionId,
                        "participants.userId": socket.userId,
                        "participants.status": { $nin: ["left", "disconnected"] },
                    },
                    { $set: setFields },
                    { new: true }
                ).populate("participants.userId", "username avatar");

                if (!session) return;

                io.in(`session:${sessionId}`).emit("participant:statusUpdated", {
                    userId: socket.userId,
                    user: socket.user,
                    status,
                    allReady: session.allParticipantsReady(),
                    session,
                });
            } catch (error) {
                console.error("Error updating status:", error);
            }
        });

        // Heartbeat — pure atomic update, no document load needed
        socket.on("heartbeat", async (sessionId) => {
            try {
                if (!sessionId) return;
                await GroupSession.findOneAndUpdate(
                    { _id: sessionId, "participants.userId": socket.userId },
                    { $set: { "participants.$.lastSeen": new Date() } }
                );
            } catch (error) {
                console.error("Heartbeat error:", error);
            }
        });

        // Host starts the session — atomic, idempotent
        socket.on("session:start", async (sessionId) => {
            try {
                const current = await GroupSession.findById(sessionId);
                if (!current) return;

                if (current.hostId.toString() !== socket.userId) {
                    socket.emit("error", { message: "Only host can start the session" });
                    return;
                }

                if (current.status !== "lobby") {
                    socket.emit("error", { message: "Session already started" });
                    return;
                }

                const startTime = new Date();
                const hasRelaxation = !!current.settings.relaxationActivity;
                const timelineUpdate = hasRelaxation
                    ? { "timeline.relaxationStartedAt": startTime }
                    : {
                        "timeline.focusStartedAt": startTime,
                        "timeline.focusEndsAt": new Date(
                            startTime.getTime() + current.settings.focusDuration * 60 * 1000
                        ),
                    };

                // Atomic: only succeeds if still in lobby
                const session = await GroupSession.findOneAndUpdate(
                    { _id: sessionId, status: "lobby", hostId: socket.userId },
                    {
                        $set: {
                            status: hasRelaxation ? "relaxation" : "focus",
                            ...timelineUpdate,
                            "participants.$[active].status": "active",
                        },
                    },
                    {
                        new: true,
                        arrayFilters: [{ "active.status": { $in: ["waiting", "ready"] } }],
                    }
                );

                if (!session) {
                    socket.emit("error", { message: "Session already started" });
                    return;
                }

                await session.populate("participants.userId", "username avatar");

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

        // Advance session phase — atomic, condition-locked
        socket.on("session:advance", async (sessionId) => {
            try {
                const current = await GroupSession.findById(sessionId);
                if (!current) return;

                if (current.hostId.toString() !== socket.userId) {
                    socket.emit("error", { message: "Only host can advance the session" });
                    return;
                }

                const now = new Date();
                let newStatus;
                let timelineUpdate = {};
                let arrayFilters;

                switch (current.status) {
                    case "relaxation":
                        newStatus = "focus";
                        timelineUpdate = {
                            "timeline.focusStartedAt": now,
                            "timeline.focusEndsAt": new Date(
                                now.getTime() + current.settings.focusDuration * 60 * 1000
                            ),
                        };
                        break;
                    case "focus":
                        if (current.settings.breakDuration > 0) {
                            newStatus = "break";
                            timelineUpdate = { "timeline.breakStartedAt": now };
                        } else {
                            newStatus = "completed";
                            timelineUpdate = { "timeline.completedAt": now };
                        }
                        break;
                    case "break":
                        newStatus = "completed";
                        timelineUpdate = { "timeline.completedAt": now };
                        break;
                    default:
                        socket.emit("error", { message: "Cannot advance from current status" });
                        return;
                }

                const setOp = { status: newStatus, ...timelineUpdate };
                if (newStatus === "completed") {
                    setOp["participants.$[active].status"] = "completed";
                    setOp["participants.$[active].focusTimeCompleted"] = current.settings.focusDuration * 60;
                    const count = current.participants.filter(p => ["active", "completed"].includes(p.status)).length;
                    setOp["stats.totalFocusMinutes"] = current.settings.focusDuration;
                    setOp["stats.completionRate"] = current.stats.participantCount > 0
                        ? (count / current.stats.participantCount) * 100 : 0;
                    arrayFilters = [{ "active.status": "active" }];
                }

                // Atomic: condition on current status prevents double-advance
                const session = await GroupSession.findOneAndUpdate(
                    { _id: sessionId, status: current.status, hostId: socket.userId },
                    { $set: setOp },
                    { new: true, ...(arrayFilters ? { arrayFilters } : {}) }
                );

                if (!session) {
                    socket.emit("error", { message: "Session state changed — refresh needed" });
                    return;
                }

                await session.populate("participants.userId", "username avatar");

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

        // Handle disconnect — atomic status update
        socket.on("disconnect", async () => {
            console.log(`User disconnected: ${socket.user.username}`);

            if (socket.currentSessionId) {
                try {
                    // Atomic: only updates if participant is not already left/completed
                    const session = await GroupSession.findOneAndUpdate(
                        {
                            _id: socket.currentSessionId,
                            "participants.userId": socket.userId,
                            "participants.status": { $nin: ["left", "completed"] },
                        },
                        {
                            $set: {
                                "participants.$.status": "disconnected",
                                "participants.$.lastSeen": new Date(),
                            },
                        },
                        { new: true }
                    );

                    if (session) {
                        const updatedSession = await GroupSession.findById(socket.currentSessionId)
                            .populate("participants.userId", "username avatar");

                        socket.to(`session:${socket.currentSessionId}`).emit("participant:disconnected", {
                            user: socket.user,
                            sessionId: socket.currentSessionId,
                        });

                        socket.to(`session:${socket.currentSessionId}`).emit("session:state", {
                            session: updatedSession,
                            serverTime: Date.now(),
                        });
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
