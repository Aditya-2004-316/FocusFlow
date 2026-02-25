import GroupSession from "../models/GroupSession.js";
import Community from "../models/Community.js";
import CommunityMember from "../models/CommunityMember.js";
import Timer from "../models/Timer.js";

/**
 * @desc    Create a new group session
 * @route   POST /api/group-sessions
 * @access  Protected
 */
export const createGroupSession = async (req, res) => {
    try {
        const { communityId, title, description, scheduledAt, settings } = req.body;

        // Verify community exists and user is a member
        const community = await Community.findById(communityId);
        if (!community) {
            return res.status(404).json({ success: false, error: "Community not found" });
        }

        const isMember = community.members.some(m => m.toString() === req.user._id.toString());
        const isCreator = community.creator.toString() === req.user._id.toString();

        if (!isMember && !isCreator) {
            return res.status(403).json({
                success: false,
                error: "You must be a member of this community to create a session",
            });
        }

        const session = await GroupSession.create({
            communityId,
            hostId: req.user._id,
            title,
            description: description || "",
            scheduledAt: scheduledAt || null,
            settings: {
                focusDuration: settings?.focusDuration || 25,
                breakDuration: settings?.breakDuration !== undefined ? parseInt(settings.breakDuration) : 5,
                relaxationActivity: settings?.relaxationActivity || null,
                relaxationDuration: settings?.relaxationDuration || 3,
                allowLateJoin: settings?.allowLateJoin !== false,
                lateJoinCutoffMinutes: settings?.lateJoinCutoffMinutes !== undefined
                    ? parseInt(settings.lateJoinCutoffMinutes)
                    : 0, // 0 = use half of focusDuration at join-time
                autoStartOnReady: settings?.autoStartOnReady || false,
                minParticipants: settings?.minParticipants || 1,
                maxParticipants: settings?.maxParticipants || 10,
            },
            participants: [{
                userId: req.user._id,
                status: "waiting",
                joinedAt: new Date(),
                lastSeen: new Date(),
            }],
        });

        await session.populate("hostId", "username avatar");
        await session.populate("communityId", "name");

        res.status(201).json({
            success: true,
            message: "Group session created successfully",
            data: session,
        });
    } catch (error) {
        console.error("Create group session error:", error);
        res.status(500).json({ success: false, error: error.message || "Failed to create session" });
    }
};

/**
 * @desc    Get all group sessions for a community
 * @route   GET /api/group-sessions/community/:communityId
 * @access  Protected
 */
export const getCommunityGroupSessions = async (req, res) => {
    try {
        const { communityId } = req.params;
        const { status, limit = 20, page = 1 } = req.query;

        const query = { communityId };

        if (status) {
            if (status === "active") {
                query.status = { $in: ["lobby", "relaxation", "focus", "break", "paused"] };
            } else if (status === "upcoming") {
                query.status = "lobby";
                query.scheduledAt = { $gt: new Date() };
            } else {
                query.status = status;
            }
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const sessions = await GroupSession.find(query)
            .populate("hostId", "username avatar")
            .populate("participants.userId", "username avatar")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await GroupSession.countDocuments(query);

        res.status(200).json({
            success: true,
            data: sessions,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit)),
            },
        });
    } catch (error) {
        console.error("Get community sessions error:", error);
        res.status(500).json({ success: false, error: error.message || "Failed to fetch sessions" });
    }
};

/**
 * @desc    Get a single group session
 * @route   GET /api/group-sessions/:id
 * @access  Protected
 */
export const getGroupSession = async (req, res) => {
    try {
        const session = await GroupSession.findById(req.params.id)
            .populate("hostId", "username avatar")
            .populate("communityId", "name")
            .populate("participants.userId", "username avatar");

        if (!session) {
            return res.status(404).json({ success: false, error: "Session not found" });
        }

        res.status(200).json({ success: true, data: session });
    } catch (error) {
        console.error("Get group session error:", error);
        res.status(500).json({ success: false, error: error.message || "Failed to fetch session" });
    }
};

/**
 * @desc    Join a group session
 * @route   POST /api/group-sessions/:id/join
 * @access  Protected
 *
 * Uses findOneAndUpdate with $push/$set (atomic) to avoid read-modify-save
 * race conditions when multiple users join at the same time.
 */
export const joinGroupSession = async (req, res) => {
    try {
        const userId = req.user._id;
        const sessionId = req.params.id;

        // First, check session state (read-only – race-safe since we validate atomically below)
        const session = await GroupSession.findById(sessionId);
        if (!session) {
            return res.status(404).json({ success: false, error: "Session not found" });
        }

        const joinableStatuses = ["lobby"];
        if (session.settings.allowLateJoin) {
            joinableStatuses.push("relaxation");

            // For focus phase, enforce a time-based cutoff.
            // If lateJoinCutoffMinutes is 0 (unset), default to half the focus duration.
            if (session.status === "focus" || true) {
                const cutoff = session.settings.lateJoinCutoffMinutes > 0
                    ? session.settings.lateJoinCutoffMinutes
                    : Math.floor(session.settings.focusDuration / 2);

                const focusStarted = session.timeline?.focusStartedAt;
                if (focusStarted) {
                    const minutesElapsed = (Date.now() - new Date(focusStarted).getTime()) / 60000;
                    if (minutesElapsed <= cutoff) {
                        joinableStatuses.push("focus");
                    }
                    // If minutesElapsed > cutoff, focus is NOT added — late join blocked
                } else {
                    // Focus hasn't technically started (still relaxation) — allow
                    joinableStatuses.push("focus");
                }
            }
        }

        if (!joinableStatuses.includes(session.status)) {
            return res.status(400).json({
                success: false,
                error: "This session is no longer accepting participants",
            });
        }

        // Check if already an active participant
        const existingParticipant = session.participants.find(
            p => p.userId.toString() === userId.toString()
        );
        const isActiveParticipant = existingParticipant &&
            !["left", "disconnected"].includes(existingParticipant.status);

        if (isActiveParticipant) {
            return res.status(400).json({ success: false, error: "You are already in this session" });
        }

        const newParticipantStatus = session.status === "lobby" ? "waiting" : "active";
        const now = new Date();

        let updatedSession;

        if (existingParticipant) {
            // Re-joining (was left/disconnected) — atomic positional update
            updatedSession = await GroupSession.findOneAndUpdate(
                {
                    _id: sessionId,
                    "participants.userId": userId,
                    // Ensure the session is still in a joinable state (atomic check)
                    status: { $in: joinableStatuses },
                },
                {
                    $set: {
                        "participants.$.status": newParticipantStatus,
                        "participants.$.joinedAt": now,
                        "participants.$.lastSeen": now,
                    },
                },
                { new: true }
            );
        } else {
            // New participant — atomic push with capacity guard
            updatedSession = await GroupSession.findOneAndUpdate(
                {
                    _id: sessionId,
                    // Ensure the session is still in a joinable state (atomic check)
                    status: { $in: joinableStatuses },
                    // Atomic max-participant guard: only update if active count < max
                    $expr: {
                        $lt: [
                            {
                                $size: {
                                    $filter: {
                                        input: "$participants",
                                        as: "p",
                                        cond: { $not: [{ $in: ["$$p.status", ["left", "disconnected"]] }] },
                                    },
                                },
                            },
                            "$settings.maxParticipants",
                        ],
                    },
                },
                {
                    $push: {
                        participants: {
                            userId,
                            status: newParticipantStatus,
                            joinedAt: now,
                            lastSeen: now,
                        },
                    },
                },
                { new: true }
            );

            if (!updatedSession) {
                // Either status changed or session is full — re-read to give meaningful error
                const recheck = await GroupSession.findById(sessionId);
                if (!recheck) {
                    return res.status(404).json({ success: false, error: "Session not found" });
                }
                if (!joinableStatuses.includes(recheck.status)) {
                    return res.status(400).json({
                        success: false,
                        error: "This session is no longer accepting participants",
                    });
                }
                return res.status(400).json({ success: false, error: "Session is full" });
            }
        }

        if (!updatedSession) {
            return res.status(400).json({
                success: false,
                error: "Could not join session — it may have just closed",
            });
        }

        await updatedSession.populate("hostId", "username avatar");
        await updatedSession.populate("participants.userId", "username avatar");

        res.status(200).json({
            success: true,
            message: "Joined session successfully",
            data: updatedSession,
        });
    } catch (error) {
        console.error("Join group session error:", error);
        res.status(500).json({ success: false, error: error.message || "Failed to join session" });
    }
};

/**
 * @desc    Leave a group session
 * @route   POST /api/group-sessions/:id/leave
 * @access  Protected
 */
export const leaveGroupSession = async (req, res) => {
    try {
        const userId = req.user._id;
        const sessionId = req.params.id;

        // Atomically mark this participant as "left"
        const session = await GroupSession.findOneAndUpdate(
            { _id: sessionId, "participants.userId": userId },
            { $set: { "participants.$.status": "left" } },
            { new: true }
        );

        if (!session) {
            return res.status(404).json({ success: false, error: "Session not found or you are not in it" });
        }

        // Handle host transfer / session cancellation as a second atomic step
        const isHost = session.hostId.toString() === userId.toString();
        if (isHost) {
            const remainingParticipants = session.participants.filter(
                p => p.userId.toString() !== userId.toString() &&
                    !["left", "disconnected"].includes(p.status)
            );

            if (remainingParticipants.length > 0) {
                await GroupSession.findByIdAndUpdate(sessionId, {
                    $set: { hostId: remainingParticipants[0].userId },
                });
            } else {
                await GroupSession.findByIdAndUpdate(sessionId, {
                    $set: { status: "cancelled", "timeline.completedAt": new Date() },
                });
            }
        }

        res.status(200).json({ success: true, message: "Left session successfully" });
    } catch (error) {
        console.error("Leave group session error:", error);
        res.status(500).json({ success: false, error: error.message || "Failed to leave session" });
    }
};

/**
 * @desc    Update participant status (ready, paused, etc.)
 * @route   PUT /api/group-sessions/:id/status
 * @access  Protected
 *
 * Atomic positional update — no read-modify-save race condition.
 */
export const updateParticipantStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ["waiting", "ready", "active", "paused"];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, error: "Invalid status" });
        }

        const userId = req.user._id;
        const now = new Date();

        const updateFields = {
            "participants.$.status": status,
            "participants.$.lastSeen": now,
        };
        if (status === "ready") {
            updateFields["participants.$.readyAt"] = now;
        }

        const session = await GroupSession.findOneAndUpdate(
            {
                _id: req.params.id,
                "participants.userId": userId,
                // Only update if participant is currently active (not left/disconnected)
                "participants.status": { $nin: ["left", "disconnected"] },
            },
            { $set: updateFields },
            { new: true }
        ).populate("participants.userId", "username avatar");

        if (!session) {
            return res.status(400).json({
                success: false,
                error: "Session not found or you are not an active participant",
            });
        }

        const allReady = session.allParticipantsReady();

        res.status(200).json({
            success: true,
            message: "Status updated",
            data: { session, allReady },
        });
    } catch (error) {
        console.error("Update participant status error:", error);
        res.status(500).json({ success: false, error: error.message || "Failed to update status" });
    }
};

/**
 * @desc    Start the session (host only)
 * @route   POST /api/group-sessions/:id/start
 * @access  Protected
 *
 * Uses findOneAndUpdate with status:"lobby" condition so only ONE concurrent
 * start request can succeed — the condition acts as a distributed lock.
 */
export const startSession = async (req, res) => {
    try {
        const userId = req.user._id;
        const sessionId = req.params.id;
        const startTime = new Date();

        // Read session settings first (needed to compute focusEndsAt etc.)
        const current = await GroupSession.findById(sessionId);
        if (!current) {
            return res.status(404).json({ success: false, error: "Session not found" });
        }

        if (current.hostId.toString() !== userId.toString()) {
            return res.status(403).json({ success: false, error: "Only the host can start the session" });
        }

        if (current.status !== "lobby") {
            return res.status(400).json({ success: false, error: "Session has already started" });
        }

        const activeParticipants = current.participants.filter(
            p => !["left", "disconnected"].includes(p.status)
        );
        if (activeParticipants.length < current.settings.minParticipants) {
            return res.status(400).json({
                success: false,
                error: `Need at least ${current.settings.minParticipants} participants to start`,
            });
        }

        // Determine new state
        const hasRelaxation = !!current.settings.relaxationActivity;
        const timelineUpdate = hasRelaxation
            ? { "timeline.relaxationStartedAt": startTime }
            : {
                "timeline.focusStartedAt": startTime,
                "timeline.focusEndsAt": new Date(
                    startTime.getTime() + current.settings.focusDuration * 60 * 1000
                ),
            };

        // Atomic update: condition status:"lobby" ensures idempotency
        const session = await GroupSession.findOneAndUpdate(
            { _id: sessionId, status: "lobby", hostId: userId },
            {
                $set: {
                    status: hasRelaxation ? "relaxation" : "focus",
                    ...timelineUpdate,
                    // Atomically mark all waiting/ready participants as active
                    "participants.$[active].status": "active",
                },
            },
            {
                new: true,
                arrayFilters: [{ "active.status": { $in: ["waiting", "ready"] } }],
            }
        );

        if (!session) {
            // Another request already started the session
            return res.status(400).json({ success: false, error: "Session has already started" });
        }

        await session.populate("hostId", "username avatar");
        await session.populate("participants.userId", "username avatar");

        res.status(200).json({ success: true, message: "Session started", data: session });
    } catch (error) {
        console.error("Start session error:", error);
        res.status(500).json({ success: false, error: error.message || "Failed to start session" });
    }
};

/**
 * @desc    Advance to next phase
 * @route   POST /api/group-sessions/:id/advance
 * @access  Protected
 *
 * Atomic phase transition — condition on current status prevents double-advance.
 */
export const advanceSession = async (req, res) => {
    try {
        const userId = req.user._id;
        const sessionId = req.params.id;

        const current = await GroupSession.findById(sessionId);
        if (!current) {
            return res.status(404).json({ success: false, error: "Session not found" });
        }

        if (current.hostId.toString() !== userId.toString()) {
            return res.status(403).json({ success: false, error: "Only the host can advance the session" });
        }

        const now = new Date();
        let newStatus;
        let timelineUpdate = {};
        let participantArrayFilter = null;

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
                    timelineUpdate = {
                        "timeline.breakStartedAt": now,
                        "timeline.breakEndsAt": new Date(
                            now.getTime() + current.settings.breakDuration * 60 * 1000
                        ),
                    };
                } else {
                    newStatus = "completed";
                    timelineUpdate = { "timeline.completedAt": now };
                    participantArrayFilter = "active";
                }
                break;

            case "break":
                newStatus = "completed";
                timelineUpdate = { "timeline.completedAt": now };
                participantArrayFilter = "active";
                break;

            default:
                return res.status(400).json({ success: false, error: "Cannot advance from current status" });
        }

        const updateOp = {
            $set: {
                status: newStatus,
                ...timelineUpdate,
            },
        };

        // Mark active participants as completed atomically when entering completed state
        if (participantArrayFilter) {
            updateOp.$set["participants.$[active].status"] = "completed";
            updateOp.$set["participants.$[active].focusTimeCompleted"] = current.settings.focusDuration * 60;
        }

        // Compute completion stats for completed state
        if (newStatus === "completed") {
            const completedCount = current.participants.filter(
                p => ["active", "completed"].includes(p.status)
            ).length;
            updateOp.$set["stats.totalFocusMinutes"] = current.settings.focusDuration;
            updateOp.$set["stats.completionRate"] =
                current.stats.participantCount > 0
                    ? (completedCount / current.stats.participantCount) * 100
                    : 0;
        }

        const updateOptions = { new: true };
        if (participantArrayFilter) {
            updateOptions.arrayFilters = [{ "active.status": "active" }];
        }

        // Condition on current status — only one advance can win
        const session = await GroupSession.findOneAndUpdate(
            { _id: sessionId, status: current.status, hostId: userId },
            updateOp,
            updateOptions
        );

        if (!session) {
            return res.status(400).json({ success: false, error: "Session state changed — please refresh" });
        }

        if (session.status === "completed") {
            await createTimerRecordsForSession(session);
        }

        await session.populate("hostId", "username avatar");
        await session.populate("participants.userId", "username avatar");

        res.status(200).json({
            success: true,
            message: `Session advanced to ${session.status}`,
            data: session,
        });
    } catch (error) {
        console.error("Advance session error:", error);
        res.status(500).json({ success: false, error: error.message || "Failed to advance session" });
    }
};

/**
 * Helper function to create timer records for all participants in a completed session
 */
const createTimerRecordsForSession = async (session) => {
    try {
        const completedParticipants = session.participants.filter(
            p => p.status === "completed" && p.focusTimeCompleted > 0
        );

        for (const participant of completedParticipants) {
            await Timer.create({
                user: participant.userId,
                type: "pomodoro",
                duration: session.settings.focusDuration,
                title: `Group Session: ${session.title}`,
                description: `Collaborative focus session with ${session.stats.participantCount} participants`,
                tags: ["group-session", session.communityId.toString()],
                isActive: false,
                startTime: session.timeline.focusStartedAt,
                endTime: session.timeline.completedAt,
                completedAt: session.timeline.completedAt,
            });
        }

        console.log(`Created ${completedParticipants.length} timer records for session ${session._id}`);

        // Increment sessionCount for each completed participant (non-critical)
        await Promise.allSettled(
            completedParticipants.map(participant =>
                CommunityMember.findOneAndUpdate(
                    { communityId: session.communityId, userId: participant.userId },
                    { $inc: { sessionCount: 1 }, $set: { lastActiveAt: new Date() } }
                )
            )
        );
    } catch (error) {
        console.error("Error creating timer records:", error);
        // Non-critical — don't throw
    }
};

/**
 * @desc    Cancel a session (host only)
 * @route   DELETE /api/group-sessions/:id
 * @access  Protected
 */
export const cancelSession = async (req, res) => {
    try {
        const session = await GroupSession.findOneAndUpdate(
            {
                _id: req.params.id,
                hostId: req.user._id,
                status: { $ne: "completed" },
            },
            { $set: { status: "cancelled", "timeline.completedAt": new Date() } },
            { new: true }
        );

        if (!session) {
            const recheck = await GroupSession.findById(req.params.id);
            if (!recheck) {
                return res.status(404).json({ success: false, error: "Session not found" });
            }
            if (recheck.hostId.toString() !== req.user._id.toString()) {
                return res.status(403).json({ success: false, error: "Only the host can cancel the session" });
            }
            return res.status(400).json({ success: false, error: "Cannot cancel a completed session" });
        }

        res.status(200).json({ success: true, message: "Session cancelled" });
    } catch (error) {
        console.error("Cancel session error:", error);
        res.status(500).json({ success: false, error: error.message || "Failed to cancel session" });
    }
};

/**
 * @desc    Update heartbeat (keep participant alive)
 * @route   POST /api/group-sessions/:id/heartbeat
 * @access  Protected
 *
 * Pure atomic update — does NOT load the whole document.
 */
export const updateHeartbeat = async (req, res) => {
    try {
        const session = await GroupSession.findOneAndUpdate(
            { _id: req.params.id, "participants.userId": req.user._id },
            { $set: { "participants.$.lastSeen": new Date() } },
            { new: true, select: "status timeline" }
        );

        if (!session) {
            return res.status(404).json({
                success: false,
                error: "Session not found or you are not a participant",
            });
        }

        res.status(200).json({
            success: true,
            data: { status: session.status, timeline: session.timeline },
        });
    } catch (error) {
        console.error("Update heartbeat error:", error);
        res.status(500).json({ success: false, error: error.message || "Failed to update heartbeat" });
    }
};

/**
 * @desc    Delete group sessions for a specific community (Cleanup)
 * @route   DELETE /api/group-sessions/debug/cleanup
 * @access  Protected
 */
export const deleteAllSessions = async (req, res) => {
    try {
        const { communityId } = req.query;

        if (!communityId) {
            return res.status(400).json({ success: false, error: "Community ID is required for cleanup" });
        }

        const community = await Community.findById(communityId);
        if (!community) {
            return res.status(404).json({ success: false, error: "Community not found" });
        }

        if (community.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                error: "Only the community creator can reset sessions",
            });
        }

        const result = await GroupSession.deleteMany({ communityId });

        res.status(200).json({
            success: true,
            message: `Successfully deleted ${result.deletedCount} sessions for this community`,
        });
    } catch (error) {
        console.error("Cleanup sessions error:", error);
        res.status(500).json({ success: false, error: error.message || "Failed to cleanup sessions" });
    }
};
