import GroupSession from "../models/GroupSession.js";
import { getIO } from "./socketServer.js";

// Intervals in milliseconds
// Intervals in milliseconds
const HEARTBEAT_CHECK_INTERVAL = 15000; // Check every 15 seconds
const DISCONNECT_THRESHOLD = 120000; // Mark as disconnected after 2 minutes
const CLEANUP_THRESHOLD = 300000; // Remove from session after 5 minutes
const STALE_SESSION_THRESHOLD = 24 * 60 * 60 * 1000; // 24 hours

let heartbeatInterval = null;
let cleanupInterval = null;

/**
 * Start the heartbeat monitoring system
 */
export const startHeartbeatMonitor = () => {
    console.log("Starting heartbeat monitor...");

    // Check for disconnected participants
    heartbeatInterval = setInterval(async () => {
        try {
            const now = new Date();
            const disconnectThreshold = new Date(now.getTime() - DISCONNECT_THRESHOLD);
            const cleanupThreshold = new Date(now.getTime() - CLEANUP_THRESHOLD);

            // Find active sessions
            const activeSessions = await GroupSession.find({
                status: { $in: ["lobby", "relaxation", "focus", "break", "paused"] },
            });

            for (const session of activeSessions) {
                let hasChanges = false;
                const io = getIO();

                for (const participant of session.participants) {
                    // Skip already handled participants
                    if (["left", "completed"].includes(participant.status)) continue;

                    const lastSeen = new Date(participant.lastSeen);

                    // Mark as disconnected
                    if (participant.status !== "disconnected" && lastSeen < disconnectThreshold) {
                        participant.status = "disconnected";
                        hasChanges = true;

                        // Notify others
                        if (io) {
                            io.to(`session:${session._id}`).emit("participant:disconnected", {
                                userId: participant.userId,
                                sessionId: session._id,
                                reason: "heartbeat_timeout",
                            });
                        }

                        console.log(`Participant ${participant.userId} marked as disconnected in session ${session._id}`);
                    }

                    // Remove from session after cleanup threshold
                    if (participant.status === "disconnected" && lastSeen < cleanupThreshold) {
                        participant.status = "left";
                        hasChanges = true;

                        console.log(`Participant ${participant.userId} removed from session ${session._id}`);
                    }
                }

                // Check if host is disconnected and needs to be transferred
                const hostId = session.hostId.toString();
                const hostParticipant = session.participants.find(
                    p => p.userId.toString() === hostId
                );

                if (hostParticipant && ["disconnected", "left"].includes(hostParticipant.status)) {
                    // Find a new host
                    const newHost = session.participants.find(
                        p => !["disconnected", "left"].includes(p.status)
                    );

                    if (newHost) {
                        session.hostId = newHost.userId;

                        // Save immediately to avoid race conditions with client fetching API
                        await session.save();
                        // Populate for broadcast
                        await session.populate("participants.userId", "username avatar");

                        // Notify about host change with full session state
                        if (io) {
                            io.to(`session:${session._id}`).emit("session:hostChanged", {
                                newHostId: newHost.userId,
                                sessionId: session._id,
                                session: session // Send updated session
                            });
                            // Also broadcast state to be safe
                            io.to(`session:${session._id}`).emit("session:state", {
                                session: session
                            });
                        }

                        console.log(`Host transferred to ${newHost.userId} in session ${session._id}`);
                        // Reset changes flag as we saved already, unless we want to track other changes
                        // But since we are inside a loop iterating participants, other changes might have set hasChanges=true.
                        // We saved everything up to now.
                        hasChanges = false;
                    } else {
                        // No active participants left, cancel session
                        session.status = "cancelled";
                        session.timeline.completedAt = now;

                        await session.save();

                        if (io) {
                            io.to(`session:${session._id}`).emit("session:cancelled", {
                                sessionId: session._id,
                                reason: "all_participants_left",
                            });
                        }

                        console.log(`Session ${session._id} cancelled - no active participants`);
                        hasChanges = false;
                    }
                }

                // Auto-advance focus phase if timer expired
                if (session.status === "focus" && session.timeline.focusEndsAt) {
                    if (new Date(session.timeline.focusEndsAt) <= now) {
                        if (session.settings.breakDuration > 0) {
                            session.status = "break";
                            session.timeline.breakStartedAt = now;
                        } else {
                            session.status = "completed";
                            session.timeline.completedAt = now;

                            // Update stats
                            session.stats.totalFocusMinutes = session.settings.focusDuration;
                            const activeCount = session.participants.filter(
                                p => ["active", "completed"].includes(p.status)
                            ).length;
                            session.stats.completionRate =
                                (activeCount / session.stats.participantCount) * 100;

                            // Mark active participants as completed
                            session.participants.forEach(p => {
                                if (p.status === "active") {
                                    p.status = "completed";
                                    p.focusTimeCompleted = session.settings.focusDuration * 60;
                                }
                            });
                        }
                        hasChanges = true;

                        if (io) {
                            io.to(`session:${session._id}`).emit("session:phaseChanged", {
                                session,
                                newPhase: session.status,
                                changedBy: "system",
                            });
                        }

                        console.log(`Session ${session._id} auto-advanced to ${session.status}`);
                    }
                }

                if (hasChanges) {
                    await session.save();
                }
            }
        } catch (error) {
            console.error("Heartbeat monitor error:", error);
        }
    }, HEARTBEAT_CHECK_INTERVAL);

    // Cleanup stale sessions
    cleanupInterval = setInterval(async () => {
        try {
            const staleThreshold = new Date(Date.now() - STALE_SESSION_THRESHOLD);

            // Find and mark stale lobby sessions as cancelled
            const result = await GroupSession.updateMany(
                {
                    status: "lobby",
                    createdAt: { $lt: staleThreshold },
                },
                {
                    $set: {
                        status: "cancelled",
                        "timeline.completedAt": new Date(),
                    },
                }
            );

            if (result.modifiedCount > 0) {
                console.log(`Cleaned up ${result.modifiedCount} stale sessions`);
            }
        } catch (error) {
            console.error("Session cleanup error:", error);
        }
    }, 60 * 60 * 1000); // Run every hour

    console.log("Heartbeat monitor started");
};

/**
 * Stop the heartbeat monitoring system
 */
export const stopHeartbeatMonitor = () => {
    if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
        heartbeatInterval = null;
    }
    if (cleanupInterval) {
        clearInterval(cleanupInterval);
        cleanupInterval = null;
    }
    console.log("Heartbeat monitor stopped");
};

/**
 * Handle participant reconnection
 */
export const handleReconnection = async (sessionId, userId) => {
    try {
        const session = await GroupSession.findById(sessionId);
        if (!session) return null;

        const participant = session.participants.find(
            p => p.userId.toString() === userId.toString()
        );

        if (!participant) return null;

        // Can only reconnect if session is still active
        const activeStatuses = ["lobby", "relaxation", "focus", "break", "paused"];
        if (!activeStatuses.includes(session.status)) {
            return { error: "Session has ended" };
        }

        // Update participant status
        if (participant.status === "disconnected") {
            participant.status = session.status === "lobby" ? "waiting" : "active";
            participant.lastSeen = new Date();
            await session.save();

            const io = getIO();
            if (io) {
                io.to(`session:${sessionId}`).emit("participant:reconnected", {
                    userId,
                    sessionId,
                    newStatus: participant.status,
                });
            }

            console.log(`Participant ${userId} reconnected to session ${sessionId}`);
            return { success: true, session };
        }

        return { success: true, session };
    } catch (error) {
        console.error("Reconnection error:", error);
        return { error: error.message };
    }
};

export default {
    startHeartbeatMonitor,
    stopHeartbeatMonitor,
    handleReconnection,
};
