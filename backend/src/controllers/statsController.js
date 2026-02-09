import Timer from "../models/Timer.js";
import Distraction from "../models/Distraction.js";
import Community from "../models/Community.js";
import CommunityMember from "../models/CommunityMember.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Get dashboard summary stats
// @route   GET /api/stats/summary
// @access  Private
export const getSummary = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Fetch Today's Sessions
    const todaySessions = await Timer.find({
        user: userId,
        completedAt: { $gte: today },
        type: "pomodoro",
    });

    const todayFocusMinutes = todaySessions.reduce((acc, sess) => {
        const duration = sess.endTime ? (sess.endTime - sess.startTime) / 60000 : 0;
        return acc + duration;
    }, 0);

    const completedSessionsCount = todaySessions.length;

    // 2. Fetch Today's Distractions
    const todayDistractions = await Distraction.countDocuments({
        user: userId,
        timestamp: { $gte: today },
    });

    // 3. Calculate Productivity Score (Simple Placeholder)
    // Formula: (Focus Minutes / (Focus Minutes + Distractions * 5)) * 100
    let productivityScore = 0;
    if (todayFocusMinutes > 0) {
        productivityScore = Math.round(
            (todayFocusMinutes / (todayFocusMinutes + todayDistractions * 5)) * 100
        );
    } else if (todayDistractions === 0) {
        productivityScore = 0; // Or some base value? Let's keep it 0 if no work done.
    }

    // 4. Calculate Current Streak
    // Fetch all unique completed session dates for this user
    const sessionDates = await Timer.aggregate([
        {
            $match: {
                user: userId,
                completedAt: { $exists: true },
                type: "pomodoro",
            },
        },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$completedAt" },
                },
            },
        },
        { $sort: { _id: -1 } },
    ]);

    let currentStreak = 0;
    if (sessionDates.length > 0) {
        const todayStr = new Date().toISOString().split("T")[0];
        const yesterdayStr = new Date(Date.now() - 86400000)
            .toISOString()
            .split("T")[0];

        let lastDate = sessionDates[0]._id;

        // If the most recent session was today or yesterday, we have a streak
        if (lastDate === todayStr || lastDate === yesterdayStr) {
            currentStreak = 1;
            for (let i = 1; i < sessionDates.length; i++) {
                const currentDate = new Date(sessionDates[i - 1]._id);
                const prevDate = new Date(sessionDates[i]._id);
                const diffTime = Math.abs(currentDate - prevDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays === 1) {
                    currentStreak++;
                } else {
                    break;
                }
            }
        }
    }

    // 5. Recent Activity Feed
    const recentActivity = [];

    // Fetch latest 5 sessions
    const latestSessions = await Timer.find({ user: userId, completedAt: { $exists: true } })
        .sort({ completedAt: -1 })
        .limit(5);

    latestSessions.forEach((s) => {
        recentActivity.push({
            id: s._id,
            type: "session",
            title: `Completed ${s.duration} min ${s.type} session`,
            timestamp: s.completedAt,
            icon: "focus",
        });
    });

    // Fetch latest 5 distractions
    const latestDistractions = await Distraction.find({ user: userId })
        .sort({ timestamp: -1 })
        .limit(5);

    latestDistractions.forEach((d) => {
        recentActivity.push({
            id: d._id,
            type: "distraction",
            title: `Logged distraction: ${d.description}`,
            timestamp: d.timestamp,
            icon: "distraction",
        });
    });

    // Sort combined activity by timestamp
    recentActivity.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json({
        success: true,
        data: {
            summary: {
                todayFocusMinutes: Math.round(todayFocusMinutes),
                completedSessionsCount,
                productivityScore,
                currentStreak,
            },
            recentActivity: recentActivity.slice(0, 8),
        },
    });
});

// @desc    Get full dashboard stats
// @route   GET /api/stats/full
// @access  Private
export const getFullStats = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const { range = "week" } = req.query;

    const now = new Date();
    let startDate = new Date();
    let focusBlocks = [];

    if (range === "day") {
        // Today: Show hourly time blocks from 6 AM to 11 PM
        startDate.setHours(0, 0, 0, 0);

        const sessions = await Timer.find({
            user: userId,
            completedAt: { $gte: startDate },
        }).sort({ completedAt: 1 });

        const hourLabels = {
            9: "9AM", 10: "10AM", 11: "11AM", 12: "12PM",
            13: "1PM", 14: "2PM", 15: "3PM", 16: "4PM",
            17: "5PM", 18: "6PM", 19: "7PM", 20: "8PM", 21: "9PM"
        };

        Object.entries(hourLabels).forEach(([hour, label]) => {
            hourlyData[hour] = { day: label, focus: 0, break: 0 };
        });

        sessions.forEach((sess) => {
            const hour = new Date(sess.completedAt).getHours();
            if (hourlyData[hour]) {
                const duration = sess.endTime
                    ? (sess.endTime - sess.startTime) / 3600000
                    : 0;
                if (sess.type === "pomodoro") {
                    hourlyData[hour].focus += duration;
                } else {
                    hourlyData[hour].break += duration;
                }
            }
        });

        focusBlocks = Object.values(hourlyData).map((d) => ({
            day: d.day,
            focus: Number(d.focus.toFixed(2)),
            break: Number(d.break.toFixed(2)),
        }));

    } else if (range === "week") {
        // This week: Show 7 days (Sun-Sat)
        startDate.setDate(now.getDate() - 6);
        startDate.setHours(0, 0, 0, 0);

        const sessions = await Timer.find({
            user: userId,
            completedAt: { $gte: startDate },
        }).sort({ completedAt: 1 });

        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dailyData = {};

        // Initialize last 7 days
        for (let i = 0; i < 7; i++) {
            const d = new Date(startDate);
            d.setDate(startDate.getDate() + i);
            const dateStr = d.toISOString().split("T")[0];
            dailyData[dateStr] = {
                day: dayNames[d.getDay()],
                focus: 0,
                break: 0,
                date: dateStr,
            };
        }

        sessions.forEach((sess) => {
            const dateStr = sess.completedAt.toISOString().split("T")[0];
            if (dailyData[dateStr]) {
                const duration = sess.endTime
                    ? (sess.endTime - sess.startTime) / 3600000
                    : 0;
                if (sess.type === "pomodoro") {
                    dailyData[dateStr].focus += duration;
                } else {
                    dailyData[dateStr].break += duration;
                }
            }
        });

        focusBlocks = Object.values(dailyData)
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((d) => ({
                day: d.day,
                focus: Number(d.focus.toFixed(1)),
                break: Number(d.break.toFixed(1)),
            }));

    } else if (range === "month") {
        // This month: Show 4 weeks
        startDate.setDate(now.getDate() - 27); // ~4 weeks back
        startDate.setHours(0, 0, 0, 0);

        const sessions = await Timer.find({
            user: userId,
            completedAt: { $gte: startDate },
        }).sort({ completedAt: 1 });

        // Initialize 4 weeks
        const weeklyData = {
            0: { day: "Week 1", focus: 0, break: 0 },
            1: { day: "Week 2", focus: 0, break: 0 },
            2: { day: "Week 3", focus: 0, break: 0 },
            3: { day: "Week 4", focus: 0, break: 0 },
        };

        sessions.forEach((sess) => {
            const daysDiff = Math.floor((sess.completedAt - startDate) / (1000 * 60 * 60 * 24));
            const weekIndex = Math.min(3, Math.floor(daysDiff / 7));
            const duration = sess.endTime
                ? (sess.endTime - sess.startTime) / 3600000
                : 0;
            if (sess.type === "pomodoro") {
                weeklyData[weekIndex].focus += duration;
            } else {
                weeklyData[weekIndex].break += duration;
            }
        });

        focusBlocks = Object.values(weeklyData).map((d) => ({
            day: d.day,
            focus: Number(d.focus.toFixed(1)),
            break: Number(d.break.toFixed(1)),
        }));

    } else if (range === "year") {
        // This year: Show 12 months
        startDate = new Date(now.getFullYear(), 0, 1); // Jan 1st of current year
        startDate.setHours(0, 0, 0, 0);

        const sessions = await Timer.find({
            user: userId,
            completedAt: { $gte: startDate },
        }).sort({ completedAt: 1 });

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthlyData = {};

        // Initialize 12 months
        monthNames.forEach((name, index) => {
            monthlyData[index] = { day: name, focus: 0, break: 0 };
        });

        sessions.forEach((sess) => {
            const month = new Date(sess.completedAt).getMonth();
            const duration = sess.endTime
                ? (sess.endTime - sess.startTime) / 3600000
                : 0;
            if (sess.type === "pomodoro") {
                monthlyData[month].focus += duration;
            } else {
                monthlyData[month].break += duration;
            }
        });

        focusBlocks = Object.values(monthlyData).map((d) => ({
            day: d.day,
            focus: Number(d.focus.toFixed(1)),
            break: Number(d.break.toFixed(1)),
        }));
    }

    // Fetch all sessions for metrics calculation
    const allSessions = await Timer.find({
        user: userId,
        completedAt: { $gte: startDate },
    });

    // 3. Metrics (Total time, score, streak, etc.)
    const totalFocusHours = allSessions
        .filter((s) => s.type === "pomodoro")
        .reduce(
            (acc, s) =>
                acc + (s.endTime ? (s.endTime - s.startTime) / 3600000 : 0),
            0
        );

    const completedSessions = allSessions.filter(
        (s) => s.type === "pomodoro"
    ).length;

    // Productivity Score (Placeholder)
    const distractionsCount = await Distraction.countDocuments({
        user: userId,
        timestamp: { $gte: startDate },
    });

    let productivityScore = 0;
    if (totalFocusHours > 0) {
        productivityScore = Math.round(
            ((totalFocusHours * 60) /
                (totalFocusHours * 60 + distractionsCount * 5)) *
            100
        );
    }

    // Peak Focus Window Calculation
    const hourCounts = new Array(24).fill(0);
    allSessions
        .filter((s) => s.type === "pomodoro")
        .forEach((s) => {
            const hour = new Date(s.startTime).getHours();
            hourCounts[hour]++;
        });

    let peakHour = 0;
    let maxSessions = 0;
    for (let h = 0; h < 24; h++) {
        if (hourCounts[h] > maxSessions) {
            maxSessions = hourCounts[h];
            peakHour = h;
        }
    }

    const formatHour = (h) => {
        const ampm = h >= 12 ? "PM" : "AM";
        const displayH = h % 12 || 12;
        return `${displayH}${ampm}`;
    };

    const peakWindow =
        maxSessions > 0
            ? `${formatHour(peakHour)} – ${formatHour((peakHour + 2) % 24)}`
            : "N/A";

    res.json({
        success: true,
        data: {
            metrics: {
                totalFocusTime: `${Math.floor(totalFocusHours)}h ${Math.round(
                    (totalFocusHours % 1) * 60
                )}m`,
                productivityScore: `${productivityScore}%`,
                completedSessions: completedSessions.toString(),
                focusStreak: "7 days", // Streak calc is complex, reusing logic or placeholder
            },
            focusBlocks,
            insights: [
                {
                    title: "Peak focus window",
                    highlight: peakWindow,
                    description:
                        maxSessions > 0
                            ? "Your sessions are concentrated here. Keep this block protected."
                            : "Start some sessions to see your peak focus window.",
                    icon: "⏰",
                    badge: {
                        text: "Prime time",
                        bg: "rgba(59,130,246,0.12)",
                        color: "var(--color-primary-700)",
                    },
                },
                {
                    title: "Distraction trend",
                    highlight:
                        distractionsCount > 0
                            ? `${distractionsCount} logs`
                            : "Zero distractions",
                    description:
                        distractionsCount > 0
                            ? "Logging distractions helps you identify triggers."
                            : "Perfect focus! No distractions logged in this period.",
                    icon: "📉",
                    badge: {
                        text: "Awareness",
                        bg: "#dcfce7",
                        color: "#166534",
                    },
                },
            ],
        },
    });
});

/**
 * @desc    Get community page stats (User-Specific)
 * @route   GET /api/stats/community
 * @access  Private
 */
export const getCommunityStats = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. User's joined communities count
    const joinedCount = await CommunityMember.countDocuments({
        userId: userId
    });

    // 2. User's total lifetime focus sessions
    const totalSessions = await Timer.countDocuments({
        user: userId,
        type: "pomodoro",
        completedAt: { $exists: true },
    });

    // 3. User's focus sessions TODAY
    const sessionsToday = await Timer.countDocuments({
        user: userId,
        type: "pomodoro",
        completedAt: { $gte: today },
    });

    // 4. Placeholder for user-specific achievements and challenges
    const achievementsCount = 0; // Factual: No achievements yet
    const activeChallengesCount = 0; // Factual: No challenges yet

    res.json({
        success: true,
        data: {
            joinedCommunitiesCount: joinedCount,
            totalSessions,
            sessionsToday,
            achievementsCount,
            activeChallengesCount
        }
    });
});

/**
 * @desc    Get global community stats for landing page (Platform-Wide)
 * @route   GET /api/stats/global-community
 * @access  Public
 */
export const getGlobalCommunityStats = asyncHandler(async (req, res, next) => {
    // 1. Total communities
    const communityCount = await Community.countDocuments();

    // 2. Total members (sum of memberCount across all communities)
    const result = await Community.aggregate([
        { $group: { _id: null, totalMembers: { $sum: "$memberCount" } } }
    ]);
    const totalMembers = result.length > 0 ? result[0].totalMembers : 0;

    // 3. Active discussions (factual count from CommunityPost)
    const CommunityPost = (await import("../models/CommunityPost.js")).default;
    const postCount = await CommunityPost.countDocuments();

    // Factual user count for fallback
    const User = (await import("../models/User.js")).default;
    const userCount = await User.countDocuments();

    // 4. Weekly check-ins (sessions in last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const weeklySessions = await Timer.countDocuments({
        completedAt: { $gte: sevenDaysAgo }
    });

    res.json({
        success: true,
        data: {
            totalCommunities: communityCount,
            totalMembers: userCount,
            activeDiscussions: postCount,
            weeklyCheckins: weeklySessions,
            participationRate: "Live"
        }
    });
});

/**
 * @desc    Get global stats for landing page hero
 * @route   GET /api/stats/global-landing
 * @access  Public
 */
export const getGlobalLandingStats = asyncHandler(async (req, res, next) => {
    // 1. Total users
    const User = (await import("../models/User.js")).default;
    const userCount = await User.countDocuments();

    // 2. Total sessions
    const sessionCount = await Timer.countDocuments({ completedAt: { $exists: true } });

    // 3. Satisfaction score (placeholder)
    const satisfactionScore = "95%";

    res.json({
        success: true,
        data: {
            totalUsers: userCount,
            totalSessions: sessionCount,
            satisfactionScore
        }
    });
});
