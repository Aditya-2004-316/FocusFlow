import GroupSession from "../models/GroupSession.js";
import Community from "../models/Community.js";
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
            return res.status(404).json({
                success: false,
                error: "Community not found",
            });
        }

        // Check if user is a member of the community
        const isMember = community.members.some(
            m => m.toString() === req.user._id.toString()
        );
        const isCreator = community.creator.toString() === req.user._id.toString();

        if (!isMember && !isCreator) {
            return res.status(403).json({
                success: false,
                error: "You must be a member of this community to create a session",
            });
        }

        // Create the session
        const session = await GroupSession.create({
            communityId,
            hostId: req.user._id,
            title,
            description: description || "",
            scheduledAt: scheduledAt || null,
            settings: {
                focusDuration: settings?.focusDuration || 25,
                breakDuration: settings?.breakDuration || 5,
                relaxationActivity: settings?.relaxationActivity || null,
                relaxationDuration: settings?.relaxationDuration || 3,
                allowLateJoin: settings?.allowLateJoin !== false,
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

        // Populate host info
        await session.populate("hostId", "username avatar");
        await session.populate("communityId", "name");

        res.status(201).json({
            success: true,
            message: "Group session created successfully",
            data: session,
        });
    } catch (error) {
        console.error("Create group session error:", error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
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

        // Filter by status if provided
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
        res.status(500).json({
            success: false,
            error: error.message,
        });
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
            return res.status(404).json({
                success: false,
                error: "Session not found",
            });
        }

        res.status(200).json({
            success: true,
            data: session,
        });
    } catch (error) {
        console.error("Get group session error:", error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    Join a group session
 * @route   POST /api/group-sessions/:id/join
 * @access  Protected
 */
export const joinGroupSession = async (req, res) => {
    try {
        const session = await GroupSession.findById(req.params.id);

        if (!session) {
            return res.status(404).json({
                success: false,
                error: "Session not found",
            });
        }

        // Check if session is joinable
        const joinableStatuses = ["lobby"];
        if (session.settings.allowLateJoin) {
            joinableStatuses.push("relaxation", "focus");
        }

        if (!joinableStatuses.includes(session.status)) {
            return res.status(400).json({
                success: false,
                error: "This session is no longer accepting participants",
            });
        }

        // Check if already a participant
        const existingParticipant = session.getParticipant(req.user._id);
        if (existingParticipant && !["left", "disconnected"].includes(existingParticipant.status)) {
            return res.status(400).json({
                success: false,
                error: "You are already in this session",
            });
        }

        // Check max participants
        const activeCount = session.participants.filter(p =>
            !["left", "disconnected"].includes(p.status)
        ).length;

        if (activeCount >= session.settings.maxParticipants) {
            return res.status(400).json({
                success: false,
                error: "Session is full",
            });
        }

        // Add or update participant
        if (existingParticipant) {
            existingParticipant.status = session.status === "lobby" ? "waiting" : "active";
            existingParticipant.joinedAt = new Date();
            existingParticipant.lastSeen = new Date();
        } else {
            session.participants.push({
                userId: req.user._id,
                status: session.status === "lobby" ? "waiting" : "active",
                joinedAt: new Date(),
                lastSeen: new Date(),
            });
        }

        await session.save();

        // Populate for response
        await session.populate("hostId", "username avatar");
        await session.populate("participants.userId", "username avatar");

        res.status(200).json({
            success: true,
            message: "Joined session successfully",
            data: session,
        });
    } catch (error) {
        console.error("Join group session error:", error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    Leave a group session
 * @route   POST /api/group-sessions/:id/leave
 * @access  Protected
 */
export const leaveGroupSession = async (req, res) => {
    try {
        const session = await GroupSession.findById(req.params.id);

        if (!session) {
            return res.status(404).json({
                success: false,
                error: "Session not found",
            });
        }

        const participant = session.getParticipant(req.user._id);
        if (!participant) {
            return res.status(400).json({
                success: false,
                error: "You are not in this session",
            });
        }

        // Mark as left
        participant.status = "left";

        // If host leaves, transfer host role or cancel session
        if (session.hostId.toString() === req.user._id.toString()) {
            const remainingParticipants = session.participants.filter(p =>
                p.userId.toString() !== req.user._id.toString() &&
                !["left", "disconnected"].includes(p.status)
            );

            if (remainingParticipants.length > 0) {
                // Transfer host to first remaining participant
                session.hostId = remainingParticipants[0].userId;
            } else {
                // No one left, cancel session
                session.status = "cancelled";
                session.timeline.completedAt = new Date();
            }
        }

        await session.save();

        res.status(200).json({
            success: true,
            message: "Left session successfully",
        });
    } catch (error) {
        console.error("Leave group session error:", error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    Update participant status (ready, paused, etc.)
 * @route   PUT /api/group-sessions/:id/status
 * @access  Protected
 */
export const updateParticipantStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ["waiting", "ready", "active", "paused"];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                error: "Invalid status",
            });
        }

        const session = await GroupSession.findById(req.params.id);

        if (!session) {
            return res.status(404).json({
                success: false,
                error: "Session not found",
            });
        }

        const participant = session.getParticipant(req.user._id);
        if (!participant) {
            return res.status(400).json({
                success: false,
                error: "You are not in this session",
            });
        }

        participant.status = status;
        participant.lastSeen = new Date();

        if (status === "ready") {
            participant.readyAt = new Date();
        }

        await session.save();

        // Check if all participants are ready (for auto-start)
        const allReady = session.allParticipantsReady();

        await session.populate("participants.userId", "username avatar");

        res.status(200).json({
            success: true,
            message: "Status updated",
            data: {
                session,
                allReady,
            },
        });
    } catch (error) {
        console.error("Update participant status error:", error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    Start the session (host only)
 * @route   POST /api/group-sessions/:id/start
 * @access  Protected
 */
export const startSession = async (req, res) => {
    try {
        const session = await GroupSession.findById(req.params.id);

        if (!session) {
            return res.status(404).json({
                success: false,
                error: "Session not found",
            });
        }

        // Only host can start
        if (session.hostId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                error: "Only the host can start the session",
            });
        }

        // Must be in lobby
        if (session.status !== "lobby") {
            return res.status(400).json({
                success: false,
                error: "Session has already started",
            });
        }

        // Check minimum participants
        const activeParticipants = session.participants.filter(p =>
            !["left", "disconnected"].includes(p.status)
        );

        if (activeParticipants.length < session.settings.minParticipants) {
            return res.status(400).json({
                success: false,
                error: `Need at least ${session.settings.minParticipants} participants to start`,
            });
        }

        // Start with relaxation or focus
        const startTime = new Date();
        if (session.settings.relaxationActivity) {
            session.status = "relaxation";
            session.timeline.relaxationStartedAt = startTime;
        } else {
            session.status = "focus";
            session.timeline.focusStartedAt = startTime;
            // Calculate end time from start time to ensure consistency across all clients
            session.timeline.focusEndsAt = new Date(
                startTime.getTime() + (session.settings.focusDuration * 60 * 1000)
            );
        }

        // Update all waiting/ready participants to active
        session.participants.forEach(p => {
            if (["waiting", "ready"].includes(p.status)) {
                p.status = "active";
            }
        });

        await session.save();
        await session.populate("hostId", "username avatar");
        await session.populate("participants.userId", "username avatar");

        res.status(200).json({
            success: true,
            message: "Session started",
            data: session,
        });
    } catch (error) {
        console.error("Start session error:", error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    Advance to next phase (relaxation -> focus, focus -> break/complete)
 * @route   POST /api/group-sessions/:id/advance
 * @access  Protected
 */
export const advanceSession = async (req, res) => {
    try {
        const session = await GroupSession.findById(req.params.id);

        if (!session) {
            return res.status(404).json({
                success: false,
                error: "Session not found",
            });
        }

        // Only host can advance (or system via heartbeat)
        if (session.hostId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                error: "Only the host can advance the session",
            });
        }

        const now = new Date();

        switch (session.status) {
            case "relaxation":
                session.status = "focus";
                session.timeline.focusStartedAt = now;
                // Calculate end time from start time to ensure consistency across all clients
                session.timeline.focusEndsAt = new Date(
                    now.getTime() + (session.settings.focusDuration * 60 * 1000)
                );
                break;

            case "focus":
                if (session.settings.breakDuration > 0) {
                    session.status = "break";
                    session.timeline.breakStartedAt = now;
                } else {
                    session.status = "completed";
                    session.timeline.completedAt = now;
                    // Calculate stats
                    session.stats.totalFocusMinutes = session.settings.focusDuration;
                    const completedCount = session.participants.filter(p =>
                        ["active", "completed"].includes(p.status)
                    ).length;
                    session.stats.completionRate =
                        (completedCount / session.stats.participantCount) * 100;

                    // Mark active participants as completed
                    session.participants.forEach(p => {
                        if (p.status === "active") {
                            p.status = "completed";
                            p.focusTimeCompleted = session.settings.focusDuration * 60;
                        }
                    });
                }
                break;

            case "break":
                session.status = "completed";
                session.timeline.completedAt = now;
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
                break;

            default:
                return res.status(400).json({
                    success: false,
                    error: "Cannot advance from current status",
                });
        }

        await session.save();

        // If session completed, create timer records for all participants
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
        res.status(500).json({
            success: false,
            error: error.message,
        });
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
    } catch (error) {
        console.error("Error creating timer records:", error);
        // Don't throw - this is a non-critical operation
    }
};

/**
 * @desc    Cancel a session (host only)
 * @route   DELETE /api/group-sessions/:id
 * @access  Protected
 */
export const cancelSession = async (req, res) => {
    try {
        const session = await GroupSession.findById(req.params.id);

        if (!session) {
            return res.status(404).json({
                success: false,
                error: "Session not found",
            });
        }

        // Only host can cancel
        if (session.hostId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                error: "Only the host can cancel the session",
            });
        }

        // Can't cancel completed sessions
        if (session.status === "completed") {
            return res.status(400).json({
                success: false,
                error: "Cannot cancel a completed session",
            });
        }

        session.status = "cancelled";
        session.timeline.completedAt = new Date();

        await session.save();

        res.status(200).json({
            success: true,
            message: "Session cancelled",
        });
    } catch (error) {
        console.error("Cancel session error:", error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    Update heartbeat (keep participant alive)
 * @route   POST /api/group-sessions/:id/heartbeat
 * @access  Protected
 */
export const updateHeartbeat = async (req, res) => {
    try {
        const session = await GroupSession.findById(req.params.id);

        if (!session) {
            return res.status(404).json({
                success: false,
                error: "Session not found",
            });
        }

        const participant = session.getParticipant(req.user._id);
        if (!participant) {
            return res.status(400).json({
                success: false,
                error: "You are not in this session",
            });
        }

        participant.lastSeen = new Date();
        await session.save();

        res.status(200).json({
            success: true,
            data: {
                status: session.status,
                timeline: session.timeline,
            },
        });
    } catch (error) {
        console.error("Update heartbeat error:", error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
