import User from "../models/User.js";
import Timer from "../models/Timer.js";
import CommunityMember from "../models/CommunityMember.js";
import Community from "../models/Community.js";
import asyncHandler from "../middleware/asyncHandler.js";

/**
 * @desc    Get recent community activity
 * @route   GET /api/users/activity
 * @access  Public
 */
export const getRecentActivity = asyncHandler(async (req, res) => {
    // 1. Get recent logins
    const recentLogins = await User.find({ lastLogin: { $ne: null } })
        .sort({ lastLogin: -1 })
        .limit(5)
        .select("username avatar lastLogin");

    console.log("Recent logins found:", recentLogins.length, recentLogins.map(u => ({ username: u.username, lastLogin: u.lastLogin })));

    // 2. Get recently completed focus sessions
    const recentSessions = await Timer.find({ completedAt: { $ne: null } })
        .populate("user", "username avatar")
        .sort({ completedAt: -1 })
        .limit(5);

    // 3. Get recently joined members
    const recentJoins = await CommunityMember.find()
        .populate("userId", "username avatar")
        .populate("communityId", "name")
        .sort({ joinedAt: -1 })
        .limit(5);

    // Combine and format activities
    const activities = [];

    // Format logins
    recentLogins.forEach(user => {
        activities.push({
            type: "login",
            user: {
                username: user.username,
                avatar: user.avatar,
                initials: user.username.substring(0, 2).toUpperCase()
            },
            content: `just logged in to keep the focus flowing!`,
            timestamp: user.lastLogin,
            id: `login-${user._id}-${user.lastLogin.getTime()}`
        });
    });

    // Format sessions
    recentSessions.forEach(session => {
        if (session.user) {
            activities.push({
                type: "session",
                user: {
                    username: session.user.username,
                    avatar: session.user.avatar,
                    initials: session.user.username.substring(0, 2).toUpperCase()
                },
                content: `completed a ${session.duration}-minute focus session: "${session.title || 'Untitled Session'}"`,
                timestamp: session.completedAt,
                id: `session-${session._id}`
            });
        }
    });

    // Format joins
    recentJoins.forEach(join => {
        if (join.userId && join.communityId) {
            activities.push({
                type: "join",
                user: {
                    username: join.userId.username,
                    avatar: join.userId.avatar,
                    initials: join.userId.username.substring(0, 2).toUpperCase()
                },
                content: `joined the "${join.communityId.name}" community`,
                timestamp: join.joinedAt,
                id: `join-${join._id}`
            });
        }
    });

    // Sort by timestamp
    activities.sort((a, b) => b.timestamp - a.timestamp);

    res.status(200).json({
        success: true,
        data: activities.slice(0, 10) // Return top 10
    });
});
