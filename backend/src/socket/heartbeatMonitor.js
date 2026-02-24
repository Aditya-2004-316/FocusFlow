import GroupSession from "../models/GroupSession.js";
import { getIO } from "./socketServer.js";

// Intervals in milliseconds
const HEARTBEAT_CHECK_INTERVAL = 15000;  // Check every 15 seconds
const DISCONNECT_THRESHOLD = 600000;     // Mark as disconnected after 10 minutes
// (was 2 min — far too short for a focus session
//  where users are intentionally in another app)
const CLEANUP_THRESHOLD = 900000;        // Remove from session after 15 minutes
const STALE_SESSION_THRESHOLD = 24 * 60 * 60 * 1000; // 24 hours

let heartbeatInterval = null;
let cleanupInterval = null;

/**
 * Start the heartbeat monitoring system
 *
 * All participant / session mutations in this monitor now use targeted
 * findOneAndUpdate operations with positional operators instead of the
 * previous read-modify-save pattern. This prevents the monitor from
 * overwriting concurrent atomic writes made by the socket server (e.g.,
 * a participant re-joining while the monitor is marking them disconnected).
 */
export const startHeartbeatMonitor = () => {

    heartbeatInterval = setInterval(async () => {
        try {
            const now = new Date();
            const disconnectThreshold = new Date(now.getTime() - DISCONNECT_THRESHOLD);
            const cleanupThreshold = new Date(now.getTime() - CLEANUP_THRESHOLD);

            // Only fetch the fields we need for decision-making.
            const activeSessions = await GroupSession.find({
                status: { $in: ["lobby", "relaxation", "focus", "break", "paused"] },
            }).select("_id status hostId participants settings timeline stats");

            for (const session of activeSessions) {
                const io = getIO();

                // ── 1. Mark timed-out participants as disconnected ─────────────────
                for (const participant of session.participants) {
                    if (["left", "completed", "disconnected"].includes(participant.status)) continue;

                    const lastSeen = new Date(participant.lastSeen);
                    if (lastSeen < disconnectThreshold) {
                        // Atomic positional update — only touches this participant's status.
                        // If the socket server has already updated this participant concurrently,
                        // the positional condition will simply not match and the update is a no-op.
                        await GroupSession.findOneAndUpdate(
                            {
                                _id: session._id,
                                "participants.userId": participant.userId,
                                "participants.status": { $nin: ["left", "completed", "disconnected"] },
                            },
                            { $set: { "participants.$.status": "disconnected" } }
                        );

                        if (io) {
                            io.to(`session:${session._id}`).emit("participant:disconnected", {
                                userId: participant.userId,
                                sessionId: session._id,
                                reason: "heartbeat_timeout",
                            });
                        }
                    }
                }

                // ── 2. Clean up participants who have been disconnected too long ──
                for (const participant of session.participants) {
                    if (participant.status !== "disconnected") continue;

                    const lastSeen = new Date(participant.lastSeen);
                    if (lastSeen < cleanupThreshold) {
                        await GroupSession.findOneAndUpdate(
                            {
                                _id: session._id,
                                "participants.userId": participant.userId,
                                "participants.status": "disconnected",
                            },
                            { $set: { "participants.$.status": "left" } }
                        );
                    }
                }

                // Re-fetch the session after mutations so host-transfer logic works on fresh data.
                const fresh = await GroupSession.findById(session._id)
                    .select("_id status hostId participants settings timeline stats");
                if (!fresh) continue;

                // ── 3. Host transfer if host is gone ──────────────────────────────
                const hostParticipant = fresh.participants.find(
                    (p) => p.userId.toString() === fresh.hostId.toString()
                );

                if (hostParticipant && ["disconnected", "left"].includes(hostParticipant.status)) {
                    const newHost = fresh.participants.find(
                        (p) => !["disconnected", "left", "completed"].includes(p.status)
                    );

                    if (newHost) {
                        // Atomic host transfer — condition guards against concurrent host changes.
                        const transferred = await GroupSession.findOneAndUpdate(
                            { _id: fresh._id, hostId: fresh.hostId },
                            { $set: { hostId: newHost.userId } },
                            { new: true }
                        ).populate("participants.userId", "username avatar");

                        if (transferred && io) {
                            io.to(`session:${fresh._id}`).emit("session:hostChanged", {
                                newHostId: newHost.userId,
                                sessionId: fresh._id,
                                session: transferred,
                            });
                            io.to(`session:${fresh._id}`).emit("session:state", {
                                session: transferred,
                                serverTime: Date.now(),
                            });
                        }
                    } else {
                        // No active participants left — cancel session atomically.
                        const cancelled = await GroupSession.findOneAndUpdate(
                            { _id: fresh._id, status: { $in: ["lobby", "relaxation", "focus", "break", "paused"] } },
                            { $set: { status: "cancelled", "timeline.completedAt": now } },
                            { new: true }
                        );
                        if (cancelled && io) {
                            io.to(`session:${fresh._id}`).emit("session:cancelled", {
                                sessionId: fresh._id,
                                reason: "all_participants_left",
                            });
                        }
                        continue; // No need to check phase advancement for cancelled session
                    }
                }

                // ── 4. Auto-advance focus phase if timer has expired ──────────────
                if (fresh.status === "focus" && fresh.timeline.focusEndsAt) {
                    if (new Date(fresh.timeline.focusEndsAt) <= now) {
                        if (fresh.settings.breakDuration > 0) {
                            const breakEndsAt = new Date(now.getTime() + fresh.settings.breakDuration * 60 * 1000);
                            const advanced = await GroupSession.findOneAndUpdate(
                                { _id: fresh._id, status: "focus" },
                                {
                                    $set: {
                                        status: "break",
                                        "timeline.breakStartedAt": now,
                                        "timeline.breakEndsAt": breakEndsAt,
                                    },
                                },
                                { new: true }
                            ).populate("participants.userId", "username avatar");

                            if (advanced && io) {
                                io.to(`session:${fresh._id}`).emit("session:phaseChanged", {
                                    session: advanced,
                                    newPhase: "break",
                                    changedBy: "system",
                                });
                            }
                        } else {
                            // No break — complete immediately
                            const activeCount = fresh.participants.filter(
                                (p) => ["active", "completed"].includes(p.status)
                            ).length;
                            const completionRate = fresh.stats.participantCount > 0
                                ? (activeCount / fresh.stats.participantCount) * 100
                                : 0;

                            await GroupSession.updateOne(
                                { _id: fresh._id, status: "focus" },
                                {
                                    $set: {
                                        status: "completed",
                                        "timeline.completedAt": now,
                                        "stats.totalFocusMinutes": fresh.settings.focusDuration,
                                        "stats.completionRate": completionRate,
                                    },
                                }
                            );
                            await GroupSession.updateOne(
                                { _id: fresh._id },
                                {
                                    $set: {
                                        "participants.$[elem].status": "completed",
                                        "participants.$[elem].focusTimeCompleted": fresh.settings.focusDuration * 60,
                                    },
                                },
                                { arrayFilters: [{ "elem.status": "active" }] }
                            );

                            const completed = await GroupSession.findById(fresh._id)
                                .populate("participants.userId", "username avatar");
                            if (completed && io) {
                                io.to(`session:${fresh._id}`).emit("session:phaseChanged", {
                                    session: completed,
                                    newPhase: "completed",
                                    changedBy: "system",
                                });
                            }
                        }
                    }
                }

                // ── 5. Auto-advance break phase if break timer has expired ─────────
                if (fresh.status === "break" && fresh.timeline.breakEndsAt) {
                    if (new Date(fresh.timeline.breakEndsAt) <= now) {
                        const activeCount = fresh.participants.filter(
                            (p) => ["active", "completed"].includes(p.status)
                        ).length;
                        const completionRate = fresh.stats.participantCount > 0
                            ? (activeCount / fresh.stats.participantCount) * 100
                            : 0;

                        await GroupSession.updateOne(
                            { _id: fresh._id, status: "break" },
                            {
                                $set: {
                                    status: "completed",
                                    "timeline.completedAt": now,
                                    "stats.totalFocusMinutes": fresh.settings.focusDuration,
                                    "stats.completionRate": completionRate,
                                },
                            }
                        );
                        await GroupSession.updateOne(
                            { _id: fresh._id },
                            {
                                $set: {
                                    "participants.$[elem].status": "completed",
                                    "participants.$[elem].focusTimeCompleted": fresh.settings.focusDuration * 60,
                                },
                            },
                            { arrayFilters: [{ "elem.status": "active" }] }
                        );

                        const breakCompleted = await GroupSession.findById(fresh._id)
                            .populate("participants.userId", "username avatar");
                        if (breakCompleted && io) {
                            io.to(`session:${fresh._id}`).emit("session:phaseChanged", {
                                session: breakCompleted,
                                newPhase: "completed",
                                changedBy: "system",
                            });
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Heartbeat monitor error:", error);
        }
    }, HEARTBEAT_CHECK_INTERVAL);

    // ── Stale session cleanup (runs hourly) ─────────────────────────────────────
    // Already uses updateMany — inherently atomic. No change needed here.
    cleanupInterval = setInterval(async () => {
        try {
            const staleThreshold = new Date(Date.now() - STALE_SESSION_THRESHOLD);

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

            if (result.modifiedCount > 0) { }
        } catch (error) {
            console.error("Session cleanup error:", error);
        }
    }, 60 * 60 * 1000); // Run every hour

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
};

/**
 * Handle participant reconnection — atomically updates the participant's status
 * and lastSeen in a single targeted operation so it cannot clobber other writes.
 */
export const handleReconnection = async (sessionId, userId) => {
    try {
        const session = await GroupSession.findById(sessionId)
            .select("status participants");
        if (!session) return null;

        const participant = session.participants.find(
            (p) => p.userId.toString() === userId.toString()
        );
        if (!participant) return null;

        const activeStatuses = ["lobby", "relaxation", "focus", "break", "paused"];
        if (!activeStatuses.includes(session.status)) {
            return { error: "Session has ended" };
        }

        if (participant.status === "disconnected") {
            const reconnectStatus = session.status === "lobby" ? "waiting" : "active";

            // Atomic positional update \u2014 only changes this participant, nothing else.
            const updated = await GroupSession.findOneAndUpdate(
                {
                    _id: sessionId,
                    "participants.userId": userId,
                    "participants.status": "disconnected",
                },
                {
                    $set: {
                        "participants.$.status": reconnectStatus,
                        "participants.$.lastSeen": new Date(),
                    },
                },
                { new: true }
            ).populate("participants.userId", "username avatar");

            const io = getIO();
            if (io && updated) {
                io.to(`session:${sessionId}`).emit("participant:reconnected", {
                    userId,
                    sessionId,
                    newStatus: reconnectStatus,
                });
            }

            return { success: true, session: updated };
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
