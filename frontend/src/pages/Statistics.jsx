import React, { useMemo, useState, useEffect } from "react";
import { sharedFocusShell } from "./FocusTimer.jsx";
import useResponsive from "../hooks/useResponsive";
import { API_BASE_URL as API_BASE } from "../config/api";

const getStyles = (isMobile, range) => {
    const sharedStyles = sharedFocusShell(isMobile);
    const styles = {
        ...sharedStyles,
        page: {
            ...sharedStyles.page,
            padding: isMobile ? "1.5rem 1rem 5rem" : "3.5rem 2rem 5rem",
            overflowX: "hidden",
        },
        container: {
            ...sharedStyles.container,
            maxWidth: "1120px",
            gap: isMobile ? "1.5rem" : "2.75rem",
        },
        hero: {
            ...sharedStyles.sectionCard,
            padding: isMobile ? "1.5rem" : "3rem",
            display: "grid",
            gap: "1.6rem",
            background: "var(--panel-bg)",
            border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
        },
        heroTitle: {
            fontSize: isMobile ? "1.8rem" : "2.4rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            margin: 0,
            background: "linear-gradient(110deg, #38bdf8, #818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
        },
        heroLead: {
            fontSize: "1.05rem",
            lineHeight: 1.75,
            color: "var(--color-gray-300)",
            maxWidth: "48rem",
        },
        heroBadges: {
            display: "flex",
            flexWrap: "wrap",
            gap: "0.6rem",
        },
        heroBadge: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: isMobile ? "0.45rem 0.85rem" : "0.6rem 1.2rem",
            borderRadius: "50px",
            fontSize: isMobile ? "0.72rem" : "0.82rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            background: "rgba(59,130,246,0.12)",
            color: "var(--color-primary-700)",
            border: "1px solid rgba(56,189,248,0.28)",
            backdropFilter: "blur(12px)",
        },
        section: {
            ...sharedStyles.section,
            padding: isMobile ? "1.5rem" : "2.4rem",
            gap: "1.6rem",
        },
        sectionHeader: {
            display: "grid",
            gap: "0.45rem",
        },
        sectionTitle: {
            ...sharedStyles.sectionHeading,
            fontSize: isMobile ? "1.6rem" : "1.8rem",
        },
        sectionLead: {
            ...sharedStyles.sectionLead,
            maxWidth: "46rem",
            fontSize: isMobile ? "0.95rem" : "1rem",
        },
        metricGrid: {
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.4rem",
        },
        metricCard: {
            ...sharedStyles.sectionCard,
            background: "var(--panel-bg)",
            border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
            padding: isMobile ? "1.5rem" : "1.8rem",
            display: "grid",
            gap: "0.75rem",
        },
        metricCard1: {
            ...sharedStyles.sectionCard,
            background: "rgba(56, 189, 248, 0.08)",
            border: "1px solid rgba(56,189,248,0.25)",
            padding: isMobile ? "1.5rem" : "1.8rem",
            display: "grid",
            gap: "0.75rem",
        },
        metricCard2: {
            ...sharedStyles.sectionCard,
            background: "rgba(56, 189, 248, 0.08)",
            border: "1px solid rgba(56,189,248,0.25)",
            padding: isMobile ? "1.5rem" : "1.8rem",
            display: "grid",
            gap: "0.75rem",
        },
        metricCard3: {
            ...sharedStyles.sectionCard,
            background: "rgba(56, 189, 248, 0.08)",
            border: "1px solid rgba(56,189,248,0.25)",
            padding: isMobile ? "1.5rem" : "1.8rem",
            display: "grid",
            gap: "0.75rem",
        },
        metricCard4: {
            ...sharedStyles.sectionCard,
            background: "rgba(56, 189, 248, 0.08)",
            border: "1px solid rgba(56,189,248,0.25)",
            padding: isMobile ? "1.5rem" : "1.8rem",
            display: "grid",
            gap: "0.75rem",
        },
        metricHeader: {
            display: "flex",
            alignItems: "center",
            gap: "0.85rem",
        },
        metricIcon: {
            width: "2.6rem",
            height: "2.6rem",
            borderRadius: "0.85rem",
            background: "rgba(56,189,248,0.16)",
            color: "var(--color-primary-600)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.4rem",
        },
        metricLabel: {
            fontSize: "0.82rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--color-gray-600)",
        },
        metricValue: {
            fontSize: isMobile ? "1.6rem" : "1.9rem",
            fontWeight: 700,
            color: "var(--color-gray-900)",
        },
        metricTrend: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.85rem",
            fontWeight: 600,
        },
        toolbar: {
            ...sharedStyles.sectionCard,
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: "1.25rem",
            padding: isMobile ? "1.2rem" : "1.3rem 1.6rem",
            background: "var(--panel-bg)",
            border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
        },
        toolbarLabel: {
            fontSize: "0.95rem",
            color: "var(--color-gray-600)",
            display: "flex",
            gap: "0.45rem",
            alignItems: "center",
        },
        rangeButtons: {
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            width: isMobile ? "100%" : "auto",
        },
        rangeButton: {
            padding: isMobile ? "0.45rem 0.8rem" : "0.55rem 1.4rem",
            borderRadius: "0.75rem",
            fontWeight: 600,
            fontSize: "0.9rem",
            border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
            background: "var(--color-white)",
            color: "var(--color-gray-700)",
            cursor: "pointer",
            transition: "all 0.2s ease",
            flex: isMobile ? 1 : "initial",
            textAlign: "center",
        },
        rangeButtonActive: {
            background: "rgba(56,189,248,0.15)",
            color: "var(--color-primary-700)",
            border: "1px solid rgba(56,189,248,0.35)",
            boxShadow: "var(--shadow-soft)",
        },
        chart: {
            ...sharedStyles.sectionCard,
            padding: isMobile ? "1.25rem" : "2rem",
            background: "var(--panel-bg)",
            border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
        },
        chartInner: {
            height: isMobile ? "220px" : "280px",
            display: "flex",
            alignItems: "flex-end",
            gap: range === "day" ? (isMobile ? "0.22rem" : "0.5rem") : (isMobile ? "0.6rem" : "1.1rem"),
            padding: "0.5rem 0",
        },
        chartGroup: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.6rem",
        },
        chartBars: {
            width: "100%",
            display: "grid",
            gap: "0.45rem",
        },
        focusBar: {
            width: "100%",
            borderRadius: "0.6rem",
            background:
                "linear-gradient(180deg, rgba(56,189,248,0.85), rgba(37,99,235,0.65))",
        },
        breakBar: {
            width: "100%",
            borderRadius: "0.6rem",
            background:
                "linear-gradient(180deg, rgba(251,191,36,0.9), rgba(217,119,6,0.7))",
        },
        chartLabel: {
            fontSize: range === "day" ? (isMobile ? "0.58rem" : "0.68rem") : (isMobile ? "0.7rem" : "0.8rem"),
            fontWeight: 600,
            color: "rgba(226,232,240,0.75)",
            whiteSpace: "nowrap",
            textAlign: "center",
            width: "100%",
        },
        insightGrid: {
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
        },
        insightCard: {
            ...sharedStyles.sectionCard,
            padding: isMobile ? "1.5rem" : "1.8rem",
            gap: "0.85rem",
            background: "rgba(56, 189, 248, 0.08)",
            border: "1px solid rgba(56,189,248,0.25)",
        },
        insightHeader: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.85rem",
        },
        insightIcon: {
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "0.85rem",
            background: "rgba(56,189,248,0.16)",
            color: "var(--color-primary-600)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.3rem",
        },
        accentBadge: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            borderRadius: "9999px",
            padding: "0.3rem 0.85rem",
            fontSize: "0.78rem",
            fontWeight: 600,
        },
        insightHighlight: {
            fontSize: "1.35rem",
            fontWeight: 700,
            color: "var(--color-primary-600)",
        },
        deepSection: {
            ...sharedStyles.sectionCard,
            border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
            background: "var(--panel-bg)",
            color: "var(--color-gray-900)",
            gap: "1.6rem",
            padding: isMobile ? "1.5rem" : "2rem",
        },
        goalList: {
            display: "grid",
            gap: "1.35rem",
        },
        goalCard: {
            ...sharedStyles.sectionCard,
            background: "rgba(56, 189, 248, 0.08)",
            border: "1px solid rgba(56,189,248,0.25)",
            gap: "0.85rem",
            padding: isMobile ? "1.2rem" : "1.6rem",
        },
        goalHeader: {
            display: "flex",
            justifyContent: "space-between",
            gap: "0.75rem",
            flexWrap: "wrap",
        },
        goalProgress: {
            height: "0.55rem",
            borderRadius: "9999px",
            background: "rgba(148,163,184,0.35)",
            overflow: "hidden",
        },
        goalProgressFill: {
            height: "100%",
            borderRadius: "9999px",
            background: "linear-gradient(90deg, #38bdf8, #818cf8)",
            transition: "width 0.35s ease",
        },
        suggestionGrid: {
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
            gap: "1.4rem",
        },
        suggestionCard: {
            ...sharedStyles.sectionCard,
            background: "rgba(56, 189, 248, 0.08)",
            border: "1px solid rgba(56,189,248,0.25)",
            gap: "0.85rem",
            minHeight: "100%",
            padding: isMobile ? "1.2rem" : "1.8rem",
        },
        suggestionHeaderRow: {
            display: "flex",
            alignItems: "center",
            gap: "0.85rem",
        },
        pill: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            padding: "0.3rem 0.85rem",
            borderRadius: "9999px",
            fontSize: "0.78rem",
            fontWeight: 600,
        },
    };

    const heroHighlights = ["Trend snapshots", "Goal tracking", "Energy insights"];

    const metricCards = [
        {
            id: "focus",
            title: "Total focus time",
            value: "32h 45m",
            change: "+12.5%",
            icon: "⏰",
            trend: "up",
        },
        {
            id: "score",
            title: "Productivity score",
            value: "87%",
            change: "+5.2%",
            icon: "📊",
            trend: "up",
        },
        {
            id: "streak",
            title: "Focus streak",
            value: "7 days",
            change: "-2 days",
            icon: "🔥",
            trend: "down",
        },
        {
            id: "sessions",
            title: "Completed sessions",
            value: "24",
            change: "+8.3%",
            icon: "✅",
            trend: "up",
        },
    ];

    const timeRangeOptions = [
        { label: "Today", value: "day" },
        { label: "This week", value: "week" },
        { label: "This month", value: "month" },
        { label: "This year", value: "year" },
    ];

    const focusBlocks = [
        { day: "Mon", focus: 4.5, break: 1.2 },
        { day: "Tue", focus: 5.2, break: 1.5 },
        { day: "Wed", focus: 3.8, break: 1.0 },
        { day: "Thu", focus: 6.1, break: 1.8 },
        { day: "Fri", focus: 4.9, break: 1.3 },
        { day: "Sat", focus: 3.2, break: 1.1 },
        { day: "Sun", focus: 2.8, break: 0.9 },
    ];

    const insights = [
        {
            title: "Peak focus window",
            highlight: "10 AM – 1 PM",
            description:
                "Late mornings consistently deliver your best flow score. Keep this block protected for deep work.",
            icon: "⏰",
            badge: {
                text: "Prime time",
                bg: "var(--color-primary-50)",
                color: "var(--color-primary-700)",
            },
        },
        {
            title: "Distraction trend",
            highlight: "-18% week-over-week",
            description:
                "Movement breaks are lowering context switches. Stay consistent to cement the habit.",
            icon: "📉",
            badge: { text: "Improving", bg: "#dcfce7", color: "#166534" },
        },
        {
            title: "Session consistency",
            highlight: "5-day streak",
            description:
                "Quick evening check-ins helped you avoid zero-focus days. Add a weekend buffer to extend the streak.",
            icon: "🔥",
            badge: { text: "On track", bg: "#fee2e2", color: "#b91c1c" },
        },
    ];

    const goalBlueprints = [
        {
            title: "Log every distraction",
            description:
                "Capture trigger + category for 90% of interruptions across the week.",
            progress: 72,
            status: {
                text: "On track",
                bg: "rgba(16, 185, 129, 0.18)",
                color: "#34d399",
            },
        },
        {
            title: "Add deep-work block",
            description:
                "Schedule one 90-minute uninterrupted sprint three times this week.",
            progress: 45,
            status: {
                text: "Needs attention",
                bg: "rgba(250, 204, 21, 0.18)",
                color: "#f59e0b",
            },
        },
        {
            title: "Balance focus & breaks",
            description:
                "Maintain a 3:1 ratio across all timer presets for steady energy.",
            progress: 88,
            status: {
                text: "Ahead of goal",
                bg: "rgba(96, 165, 250, 0.22)",
                color: "#60a5fa",
            },
        },
    ];

    const suggestions = [
        {
            icon: "⚙️",
            title: "Automate session prep",
            description:
                "Tie your go-to preset to the next block so focus lengths and sound cues load instantly.",
        },
        {
            icon: "🎯",
            title: "Anchor a single win",
            description:
                "Commit to completing one high-leverage task before noon and log it in the evening recap.",
        },
        {
            icon: "📅",
            title: "Review weekly patterns",
            description:
                "Compare two recent weeks to spot drift in break length or rising distraction categories.",
        },
        {
            icon: "🌀",
            title: "Batch context shifts",
            description:
                "Group similar tasks under one preset block to reduce cognitive ramp-up between sessions.",
        },
    ];

    return {
        styles,
        heroHighlights,
        metricCards,
        timeRangeOptions,
        focusBlocks,
        insights,
        goalBlueprints,
        suggestions,
    };
};



const Statistics = () => {
    const { isMobile } = useResponsive();
    const [range, setRange] = useState("week");
    const { styles, heroHighlights, metricCards, timeRangeOptions, focusBlocks, insights, goalBlueprints, suggestions } = getStyles(isMobile, range);
    const [statsData, setStatsData] = useState({
        metrics: {
            totalFocusTime: "0h 0m",
            productivityScore: "0%",
            focusStreak: "0 days",
            completedSessions: "0"
        },
        focusBlocks: [],
        insights: []
    });
    const [isLoading, setIsLoading] = useState(true);

    const fetchStats = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("token");
            const headers = { "Content-Type": "application/json" };
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
            const res = await fetch(`${API_BASE}/stats/full?range=${range}`, {
                credentials: "include",
                headers,
            });
            const json = await res.json();
            if (json?.success) {
                setStatsData(json.data);
            }
        } catch (e) {
            console.error("Stats fetch failed:", e.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [range]);

    const chartHeights = useMemo(() => {
        // Define fallback data based on selected range
        let defaultBlocks = [];
        if (range === "day") {
            // Hourly: 6 AM to 11 PM
            defaultBlocks = ["6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM",
                "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"]
                .map(hour => ({ day: hour, focus: 0, break: 0 }));
        } else if (range === "week") {
            // Weekly: Sun-Sat
            defaultBlocks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                .map(day => ({ day, focus: 0, break: 0 }));
        } else if (range === "month") {
            // Monthly: 4 weeks
            defaultBlocks = ["Week 1", "Week 2", "Week 3", "Week 4"]
                .map(week => ({ day: week, focus: 0, break: 0 }));
        } else if (range === "year") {
            // Yearly: 12 months
            defaultBlocks = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                .map(month => ({ day: month, focus: 0, break: 0 }));
        }

        const blocks = statsData.focusBlocks.length > 0 ? statsData.focusBlocks : defaultBlocks;

        // Dynamic scaling factor based on range
        let focusMax = 6;  // hours
        let breakMax = 2.5; // hours

        if (range === "day") { focusMax = 2; breakMax = 1; }
        else if (range === "month") { focusMax = 30; breakMax = 10; }
        else if (range === "year") { focusMax = 150; breakMax = 50; }

        return blocks.map((block) => ({
            day: block.day,
            focusHeight: Math.min(180, Math.round((block.focus / focusMax) * 180)),
            breakHeight: Math.min(110, Math.round((block.break / breakMax) * 110)),
        }));
    }, [statsData.focusBlocks, range]);

    const dynamicMetricCards = [
        {
            id: "focus",
            title: "Total focus time",
            value: statsData.metrics.totalFocusTime,
            change: "+0%",
            icon: "⏰",
            trend: "up",
        },
        {
            id: "score",
            title: "Productivity score",
            value: statsData.metrics.productivityScore,
            change: "+0%",
            icon: "📊",
            trend: "up",
        },
        {
            id: "streak",
            title: "Focus streak",
            value: statsData.metrics.focusStreak,
            change: "Stay sharp!",
            icon: "🔥",
            trend: "up",
        },
        {
            id: "sessions",
            title: "Completed sessions",
            value: statsData.metrics.completedSessions,
            change: "+0%",
            icon: "✅",
            trend: "up",
        },
    ];

    const goalsToDisplay = statsData.goals?.length > 0 ? statsData.goals : goalBlueprints;
    const suggestionsToDisplay = statsData.suggestions?.length > 0 ? statsData.suggestions : suggestions;

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <section style={styles.hero}>
                    <h1 style={styles.heroTitle}>Productivity pulse</h1>
                    <p style={styles.heroLead}>
                        Track how your focus rhythm evolves each week, surface
                        quick wins, and spot the early signals that help you
                        course-correct before momentum slips.
                    </p>
                    <div style={styles.heroBadges}>
                        {heroHighlights.map((badge) => (
                            <span key={badge} style={styles.heroBadge}>
                                {badge}
                            </span>
                        ))}
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Snapshot metrics</h2>
                        <p style={styles.sectionLead}>
                            Up-to-the-minute indicators benchmarked against your
                            trailing window so you know exactly where to lean
                            in.
                        </p>
                    </div>
                    <div style={styles.metricGrid}>
                        {dynamicMetricCards.map((metric, index) => (
                            <div
                                key={metric.id}
                                style={styles[`metricCard${index + 1}`]}
                            >
                                <div style={styles.metricHeader}>
                                    <div style={styles.metricIcon}>
                                        {metric.icon}
                                    </div>
                                    <span style={styles.metricLabel}>
                                        {metric.title}
                                    </span>
                                </div>
                                <span style={styles.metricValue}>
                                    {metric.value}
                                </span>
                                <span
                                    style={{
                                        ...styles.metricTrend,
                                        color:
                                            metric.trend === "up"
                                                ? "#22d3ee"
                                                : "#f87171",
                                    }}
                                >
                                    {metric.change}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>


                <div style={styles.rangeButtons}>
                    {timeRangeOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            style={
                                range === option.value
                                    ? {
                                        ...styles.rangeButton,
                                        ...styles.rangeButtonActive,
                                    }
                                    : styles.rangeButton
                            }
                            onClick={() => setRange(option.value)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>

                <section style={styles.chart}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>
                            Focus vs. recovery cadence
                        </h2>
                        <p style={styles.sectionLead}>
                            Balance your sprint energy: higher blue bars reflect
                            longer deep-work blocks, while gold keeps breaks
                            restorative.
                        </p>
                    </div>
                    <div style={styles.chartInner}>
                        {chartHeights.map((entry) => (
                            <div key={entry.day} style={styles.chartGroup}>
                                <div style={styles.chartBars}>
                                    <div
                                        style={{
                                            ...styles.focusBar,
                                            height: `${entry.focusHeight}px`,
                                        }}
                                    />
                                    <div
                                        style={{
                                            ...styles.breakBar,
                                            height: `${entry.breakHeight}px`,
                                        }}
                                    />
                                </div>
                                <span style={styles.chartLabel}>
                                    {entry.day}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Momentum signals</h2>
                        <p style={styles.sectionLead}>
                            These patterns highlight where you should double
                            down—or ease off—so your productivity curve stays
                            smooth.
                        </p>
                    </div>
                    <div style={styles.insightGrid}>
                        {statsData.insights.map((insight) => (
                            <div key={insight.title} style={styles.insightCard}>
                                <div style={styles.insightHeader}>
                                    <div style={styles.insightIcon}>
                                        {insight.icon}
                                    </div>
                                    <span
                                        style={{
                                            ...styles.accentBadge,
                                            background: insight.badge.bg,
                                            color: insight.badge.color,
                                        }}
                                    >
                                        {insight.badge.text}
                                    </span>
                                </div>
                                <div>
                                    <div
                                        style={{
                                            fontSize: "1.12rem",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {insight.title}
                                    </div>
                                    <div style={styles.insightHighlight}>
                                        {insight.highlight}
                                    </div>
                                </div>
                                <p
                                    style={{
                                        color: "var(--color-gray-600)",
                                        fontSize: "0.92rem",
                                        lineHeight: 1.7,
                                    }}
                                >
                                    {insight.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={styles.deepSection}>
                    <div>
                        <h2
                            style={{
                                fontSize: "1.55rem",
                                fontWeight: 700,
                                marginBottom: "0.35rem",
                                color: "var(--color-gray-900)",
                            }}
                        >
                            Productivity goals
                        </h2>
                        <p
                            style={{
                                fontSize: "0.98rem",
                                lineHeight: 1.7,
                                color: "var(--color-gray-600)",
                            }}
                        >
                            Your accountability stack—each target is measurable,
                            rhythmic, and ready for a weekly retro.
                        </p>
                    </div>
                    <div style={styles.goalList}>
                        {goalsToDisplay.map((goal) => (
                            <div key={goal.title} style={styles.goalCard}>
                                <div style={styles.goalHeader}>
                                    <span
                                        style={{
                                            fontSize: "1.08rem",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {goal.title}
                                    </span>
                                    <span
                                        style={{
                                            ...styles.pill,
                                            background: goal.status.bg,
                                            color: goal.status.color,
                                        }}
                                    >
                                        {goal.status.text}
                                    </span>
                                </div>
                                <p
                                    style={{
                                        fontSize: "0.92rem",
                                        lineHeight: 1.7,
                                        color: "var(--color-gray-600)",
                                    }}
                                >
                                    {goal.description}
                                </p>
                                <div style={styles.goalProgress}>
                                    <div
                                        style={{
                                            ...styles.goalProgressFill,
                                            width: `${goal.progress}%`,
                                        }}
                                    />
                                </div>
                                <span
                                    style={{
                                        fontSize: "0.78rem",
                                        fontWeight: 600,
                                        color: "var(--color-gray-600)",
                                    }}
                                >
                                    {goal.progress}% complete
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Personalised nudges</h2>
                        <p style={styles.sectionLead}>
                            Layer one tweak into the coming week and keep note
                            of what nudges your flow score upward.
                        </p>
                    </div>
                    <div style={styles.suggestionGrid}>
                        {suggestionsToDisplay.map((suggestion) => (
                            <div
                                key={suggestion.title}
                                style={styles.suggestionCard}
                            >
                                <div style={styles.suggestionHeaderRow}>
                                    <div style={{ fontSize: "1.4rem" }}>
                                        {suggestion.icon}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "1.05rem",
                                            fontWeight: 600,
                                            color: "var(--color-gray-900)",
                                        }}
                                    >
                                        {suggestion.title}
                                    </div>
                                </div>
                                <p
                                    style={{
                                        fontSize: "0.9rem",
                                        lineHeight: 1.65,
                                        color: "var(--color-gray-600)",
                                    }}
                                >
                                    {suggestion.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Statistics;
