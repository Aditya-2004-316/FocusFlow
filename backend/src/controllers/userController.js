import User from "../models/User.js";
import Timer from "../models/Timer.js";
import CommunityMember from "../models/CommunityMember.js";
import Community from "../models/Community.js";
import asyncHandler from "../middleware/asyncHandler.js";

/**
 * @desc    Update current user's profile (firstName, lastName, email, username)
 * @route   PUT /api/users/profile
 * @access  Protected
 */
export const updateProfile = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, username } = req.body;
    const userId = req.user._id;

    // Check uniqueness for email / username (excluding current user)
    if (email && email.toLowerCase() !== req.user.email) {
        const emailTaken = await User.findOne({ email: email.toLowerCase(), _id: { $ne: userId } });
        if (emailTaken) {
            return res.status(409).json({ success: false, message: "Email is already in use by another account" });
        }
    }
    if (username && username !== req.user.username) {
        const usernameTaken = await User.findOne({ username, _id: { $ne: userId } });
        if (usernameTaken) {
            return res.status(409).json({ success: false, message: "Username is already taken" });
        }
    }

    const updates = {};
    if (firstName !== undefined) updates.firstName = firstName.trim();
    if (lastName !== undefined) updates.lastName = lastName.trim();
    if (email) updates.email = email.toLowerCase().trim();
    if (username) updates.username = username.trim();

    const user = await User.findByIdAndUpdate(
        userId,
        updates,
        { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: "Profile updated successfully", data: { user } });
});

/**
 * @desc    Update current user's password
 * @route   PUT /api/users/password
 * @access  Protected
 */
export const updatePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ success: false, message: "Current password and new password are required" });
    }
    if (newPassword.length < 6) {
        return res.status(400).json({ success: false, message: "New password must be at least 6 characters" });
    }

    // Need to select password field explicitly (it's select:false in schema)
    const user = await User.findById(req.user._id).select("+password");
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: "Current password is incorrect" });
    }

    user.password = newPassword; // pre-save hook will hash it
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully" });
});

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
                content: `completed a ${session.duration}-minute focus session: "${session.title || "Untitled Session"}"`,
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

    // Sort by timestamp descending
    activities.sort((a, b) => b.timestamp - a.timestamp);

    res.status(200).json({
        success: true,
        data: activities.slice(0, 10)
    });
});
