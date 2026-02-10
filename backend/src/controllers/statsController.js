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

    // Calculate Streak (reusing logic from getSummary)
    const sessionDatesForStreak = await Timer.aggregate([
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
    if (sessionDatesForStreak.length > 0) {
        const todayStr = new Date().toISOString().split("T")[0];
        const yesterdayStr = new Date(Date.now() - 86400000)
            .toISOString()
            .split("T")[0];

        let lastDate = sessionDatesForStreak[0]._id;

        if (lastDate === todayStr || lastDate === yesterdayStr) {
            currentStreak = 1;
            for (let i = 1; i < sessionDatesForStreak.length; i++) {
                const currentDate = new Date(sessionDatesForStreak[i - 1]._id);
                const prevDate = new Date(sessionDatesForStreak[i]._id);
                const diffTime = Math.abs(currentDate - prevDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays === 1) currentStreak++;
                else break;
            }
        }
    }

    // Dynamic Goals (Blueprints)
    const goalBlueprints = [
        {
            title: "Log every distraction",
            description: "Capture trigger + category for 90% of interruptions across the week.",
            progress: Math.min(100, Math.round((distractionsCount / 10) * 100)) || 0,
            status: {
                text: distractionsCount > 5 ? "On track" : "Needs attention",
                bg: distractionsCount > 5 ? "rgba(16, 185, 129, 0.18)" : "rgba(250, 204, 21, 0.18)",
                color: distractionsCount > 5 ? "#34d399" : "#f59e0b",
            },
        },
        {
            title: "Focus Momentum",
            description: "Maintain a focus streak of at least 3 days.",
            progress: Math.min(100, Math.round((currentStreak / 3) * 100)),
            status: {
                text: currentStreak >= 3 ? "On track" : "Building up",
                bg: currentStreak >= 3 ? "rgba(16, 185, 129, 0.18)" : "rgba(96, 165, 250, 0.22)",
                color: currentStreak >= 3 ? "#34d399" : "#60a5fa",
            },
        },
        {
            title: "Deep Work Target",
            description: "Complete 10 focus sessions in this period.",
            progress: Math.min(100, Math.round((completedSessions / 10) * 100)),
            status: {
                text: completedSessions >= 10 ? "Ahead of goal" : "InProgress",
                bg: completedSessions >= 10 ? "rgba(96, 165, 250, 0.22)" : "rgba(250, 204, 21, 0.18)",
                color: completedSessions >= 10 ? "#60a5fa" : "#f59e0b",
            },
        },
    ];

    // Dynamic Suggestions
    const suggestions = [
        {
            icon: "⚙️",
            title: "Automate session prep",
            description: "Tie your go-to preset to the next block so focus lengths and sound cues load instantly.",
        },
        {
            icon: "🎯",
            title: "Anchor a single win",
            description: "Commit to completing one high-leverage task before noon and log it in the evening recap.",
        },
    ];

    if (totalFocusHours > 10) {
        suggestions.push({
            icon: "📅",
            title: "Review weekly patterns",
            description: "Your focus time is high! Compare this week to last to spot drift in break lengths.",
        });
    } else {
        suggestions.push({
            icon: "🌀",
            title: "Batch context shifts",
            description: "Try grouping similar tasks under one preset block to reduce cognitive ramp-up.",
        });
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

    // Achievements calculation
    const allTimeSessionsCount = await Timer.countDocuments({ user: userId, completedAt: { $exists: true }, type: 'pomodoro' });
    const earlyBirdSessionsCount = allSessions.filter(s => s.type === 'pomodoro' && new Date(s.startTime).getHours() < 8).length;

    // Max minutes in a single day (within the requested range)
    const dailyMinutes = allSessions.reduce((acc, s) => {
        if (s.type === 'pomodoro' && s.endTime) {
            const day = new Date(s.startTime).toISOString().split('T')[0];
            const mins = (s.endTime - s.startTime) / 60000;
            acc[day] = (acc[day] || 0) + mins;
        }
        return acc;
    }, {});
    const maxDailyMinutes = Math.max(0, ...Object.values(dailyMinutes));

    const achievements = [
        {
            title: "🔥 7-Day Streak",
            description: "Completed 7 consecutive days of focus sessions",
            progress: `${Math.min(100, Math.round((currentStreak / 7) * 100))}%`,
            earned: currentStreak >= 7,
            icon: "FireIcon"
        },
        {
            title: "⭐ Perfect Week",
            description: "Achieved 90%+ productivity for an entire week",
            progress: productivityScore >= 90 ? "100%" : `${Math.min(100, productivityScore)}%`,
            earned: productivityScore >= 90 && completedSessions >= 5,
            icon: "TrophyIcon"
        },
        {
            title: "💪 Century Club",
            description: "Complete 100 total focus sessions",
            progress: `${Math.min(100, Math.round((allTimeSessionsCount / 100) * 100))}%`,
            earned: allTimeSessionsCount >= 100,
            icon: "CheckCircleIcon"
        },
        {
            title: "🌅 Early Bird",
            description: "Start 5 focus sessions before 8 AM",
            progress: `${Math.min(100, Math.round((earlyBirdSessionsCount / 5) * 100))}%`,
            earned: earlyBirdSessionsCount >= 5,
            icon: "ClockIcon"
        },
        {
            title: "🎯 Focus Master",
            description: "Maintain 200+ minutes of focus in a single day",
            progress: `${Math.min(100, Math.round((maxDailyMinutes / 200) * 100))}%`,
            earned: maxDailyMinutes >= 200,
            icon: "SparklesIcon"
        },
        {
            title: "👑 Consistency King",
            description: "Accumulate 50 total hours of focus time",
            progress: `${Math.min(100, Math.round((totalFocusHours / 50) * 100))}%`,
            earned: totalFocusHours >= 50,
            icon: "StarIcon"
        }
    ];

    res.json({
        success: true,
        data: {
            metrics: {
                totalFocusTime: `${Math.floor(totalFocusHours)}h ${Math.round(
                    (totalFocusHours % 1) * 60
                )}m`,
                productivityScore: `${productivityScore}%`,
                completedSessions: completedSessions.toString(),
                focusStreak: `${currentStreak} days`,
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
            goals: goalBlueprints,
            suggestions,
            achievements,
            recentSessions: allSessions.slice(0, 10).map(s => ({
                id: s._id,
                date: new Date(s.startTime).toLocaleDateString() + ", " + new Date(s.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                duration: `${Math.round((s.endTime - s.startTime) / 60000)} minutes`,
                focus: s.type === 'pomodoro' ? 'Focus Session' : 'Break Session',
                productivity: s.type === 'pomodoro' ? '90%' : 'N/A', // Placeholder productivity
                type: s.type
            }))
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

    // 4. Calculate factual achievement count
    // A simplified count based on the getFullStats logic
    let achievementsCount = 0;
    const allTimeSessionsCount = await Timer.countDocuments({ user: userId, completedAt: { $exists: true }, type: 'pomodoro' });
    const sessionDatesForStreak = await Timer.aggregate([
        { $match: { user: userId, completedAt: { $exists: true }, type: "pomodoro" } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$completedAt" } } } },
        { $sort: { _id: -1 } },
    ]);

    let currentStreak = 0;
    if (sessionDatesForStreak.length > 0) {
        const todayStr = new Date().toISOString().split("T")[0];
        const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        if (sessionDatesForStreak[0]._id === todayStr || sessionDatesForStreak[0]._id === yesterdayStr) {
            currentStreak = 1;
            for (let i = 1; i < sessionDatesForStreak.length; i++) {
                const currentDate = new Date(sessionDatesForStreak[i - 1]._id);
                const prevDate = new Date(sessionDatesForStreak[i]._id);
                const diffDays = Math.ceil(Math.abs(currentDate - prevDate) / (1000 * 60 * 60 * 24));
                if (diffDays === 1) currentStreak++;
                else break;
            }
        }
    }

    if (currentStreak >= 7) achievementsCount++;
    if (allTimeSessionsCount >= 100) achievementsCount++;
    // Add other thresholds as needed

    const activeChallengesCount = 1; // "Deep Focus Marathon" is active

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

/**
 * @desc    Get users currently focusing
 * @route   GET /api/stats/focusing
 * @access  Private
 */
export const getFocusingUsers = asyncHandler(async (req, res, next) => {
    // Find active sessions that started within the last 4 hours (safety threshold)
    const fourHoursAgo = new Date(Date.now() - 4 * 60 * 60 * 1000);

    const activeSessions = await Timer.find({
        isActive: true,
        startTime: { $gte: fourHoursAgo }
    }).populate('user', 'username firstName avatar');

    const focusing = activeSessions.map(sess => ({
        name: sess.user?.firstName || sess.user?.username || "Focuser",
        status: sess.type === 'pomodoro' ? 'Focusing' : 'Break',
        timeElapsed: Math.floor((Date.now() - sess.startTime) / 1000),
        startTime: sess.startTime
    }));

    res.json({
        success: true,
        data: focusing
    });
});

/**
 * @desc    Get weekly leaderboard
 * @route   GET /api/stats/leaderboard
 * @access  Private
 */
export const getLeaderboard = asyncHandler(async (req, res, next) => {
    const { period } = req.query;
    let startDate;

    if (period === 'month') {
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
    } else if (period === 'all') {
        startDate = new Date(0); // Beginning of time
    } else {
        // Default to week
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
    }

    const leaderboard = await Timer.aggregate([
        {
            $match: {
                completedAt: { $gte: startDate },
                type: 'pomodoro',
                isActive: false
            }
        },
        {
            $group: {
                _id: '$user',
                totalTimeMs: {
                    $sum: { $subtract: ['$endTime', '$startTime'] }
                },
                sessionsCount: { $sum: 1 }
            }
        },
        {
            $limit: 15
        },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'userInfo'
            }
        },
        {
            $unwind: '$userInfo'
        },
        {
            $project: {
                name: { $concat: ['$userInfo.firstName', ' ', '$userInfo.lastName'] },
                username: '$userInfo.username',
                hours: { $round: [{ $divide: ['$totalTimeMs', 3600000] }, 1] },
                sessions: '$sessionsCount',
                points: {
                    $add: [
                        { $multiply: [{ $divide: ['$totalTimeMs', 360000] }, 1] }, // 10 points per hour (1 point per 6 mins)
                        { $multiply: ['$sessionsCount', 5] } // 5 points per session
                    ]
                }
            }
        },
        {
            $sort: { points: -1 }
        }
    ]);

    res.json({
        success: true,
        data: leaderboard
    });
});

/**
 * @desc    Get progress for the weekly challenge
 * @route   GET /api/stats/challenge
 * @access  Private
 */
export const getWeeklyChallengeProgress = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const now = new Date();

    // Cycle starts relative to a fixed theoretical start (Week 1 of 2024 or similar)
    // We'll use (WeekNumber % 4) to determine the challenge
    const getWeekNumber = (date) => {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    };

    const weekNum = getWeekNumber(now);
    const cycleIndex = (weekNum % 4); // 0, 1, 2, 3

    const challenges = [
        {
            id: "productivity-peak",
            title: "Productivity Peak",
            description: "Reach 15 hours of total focus time this week to hit your peak performance.",
            target: 15,
            unit: "Hours"
        },
        {
            id: "deep-focus-marathon",
            title: "Deep Focus Marathon",
            description: "Complete 10 focus sessions of at least 45 minutes each. Stay deep, stay focused!",
            target: 10,
            unit: "Sessions"
        },
        {
            id: "consistency-king",
            title: "Consistency King",
            description: "Focus for at least 30 minutes on 5 different days this week. Consistency is key!",
            target: 5,
            unit: "Days"
        },
        {
            id: "pomodoro-master",
            title: "The Pomodoro Master",
            description: "Complete 20 focus sessions of at least 25 minutes. Master the art of the Pomodoro!",
            target: 20,
            unit: "Sessions"
        }
    ];

    const activeChallenge = challenges[cycleIndex];
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const sessions = await Timer.find({
        user: userId,
        type: 'pomodoro',
        completedAt: { $gte: sevenDaysAgo },
        isActive: false
    });

    let progressCount = 0;

    if (activeChallenge.id === "deep-focus-marathon") {
        progressCount = sessions.filter(s => ((s.endTime - s.startTime) / 60000) >= 45).length;
    } else if (activeChallenge.id === "consistency-king") {
        const uniqueDays = new Set(sessions
            .filter(s => ((s.endTime - s.startTime) / 60000) >= 30)
            .map(s => new Date(s.completedAt).toDateString())
        );
        progressCount = uniqueDays.size;
    } else if (activeChallenge.id === "pomodoro-master") {
        progressCount = sessions.filter(s => ((s.endTime - s.startTime) / 60000) >= 25).length;
    } else if (activeChallenge.id === "productivity-peak") {
        const totalMs = sessions.reduce((sum, s) => sum + (s.endTime - s.startTime), 0);
        progressCount = Math.floor(totalMs / 3600000);
    }

    // Participants count: Only users who have officially started this specific challenge
    const User = (await import("../models/User.js")).default;
    const participantsCount = await User.countDocuments({
        "activeChallenges.challengeId": activeChallenge.id
    });

    // Reset logic (Monday 00:00)
    const nextMonday = new Date(now);
    nextMonday.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7 || 7));
    nextMonday.setHours(0, 0, 0, 0);
    const daysLeft = Math.max(1, Math.ceil((nextMonday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

    const user = await User.findById(userId);
    const participation = user.activeChallenges?.find(c => c.challengeId === activeChallenge.id);
    const hasStarted = !!participation;

    res.json({
        success: true,
        data: {
            challengeId: activeChallenge.id,
            title: activeChallenge.title,
            description: activeChallenge.description,
            progress: progressCount,
            target: activeChallenge.target,
            unit: activeChallenge.unit,
            hasStarted,
            daysRemaining: daysLeft,
            participants: participantsCount,
            rewards: [
                { icon: "🔥", title: "Focus Champion", subtitle: "Badge Unlock" },
                { icon: "✨", title: "+500 XP", subtitle: "Experience Points" }
            ]
        }
    });
});

/**
 * @desc    Start a challenge
 * @route   POST /api/stats/challenge/start
 * @access  Private
 */
export const startChallenge = asyncHandler(async (req, res, next) => {
    const { challengeId } = req.body;
    const User = (await import("../models/User.js")).default;
    const user = await User.findById(req.user._id);

    const alreadyStarted = user.activeChallenges?.find(c => c.challengeId === challengeId);
    if (!alreadyStarted) {
        if (!user.activeChallenges) user.activeChallenges = [];
        user.activeChallenges.push({
            challengeId,
            startedAt: new Date(),
            status: 'active'
        });
        await user.save();
    }

    res.json({ success: true, message: "Challenge started!" });
});

/**
 * @desc    Leave a challenge
 * @route   POST /api/stats/challenge/leave
 * @access  Private
 */
export const leaveChallenge = asyncHandler(async (req, res, next) => {
    const { challengeId } = req.body;
    const User = (await import("../models/User.js")).default;
    const user = await User.findById(req.user._id);

    if (user.activeChallenges) {
        user.activeChallenges = user.activeChallenges.filter(c => c.challengeId !== challengeId);
        await user.save();
    }

    res.json({ success: true, message: "Challenge left successfully" });
});
