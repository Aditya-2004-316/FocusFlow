import React, { useMemo, useState } from "react";

const styles = {
    page: {
        minHeight: "100vh",
        background: "var(--color-white)",
        color: "var(--color-gray-900)",
        transition: "background 0.3s ease, color 0.3s ease",
        padding: "4.6rem 1.75rem 5rem",
    },
    container: {
        maxWidth: "1100px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "2.75rem",
    },
    hero: {
        borderRadius: "1.5rem",
        padding: "2.9rem",
        background: "linear-gradient(138deg, rgba(56,189,248,0.16), rgba(129,140,248,0.2))",
        border: "1px solid rgba(56,189,248,0.28)",
        boxShadow: "0 34px 86px -52px rgba(56,189,248,0.6)",
        display: "grid",
        gap: "1.6rem",
    },
    heroTitle: {
        fontSize: "2.4rem",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
        margin: 0,
        background: "linear-gradient(110deg, #38bdf8, #6d28d9)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
    },
    heroLead: {
        fontSize: "1.08rem",
        lineHeight: 1.75,
        color: "var(--color-gray-600)",
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
        gap: "0.35rem",
        padding: "0.45rem 0.85rem",
        borderRadius: "9999px",
        background: "rgba(15,23,42,0.15)",
        color: "var(--color-primary-700)",
        fontSize: "0.82rem",
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
    },
    section: {
        borderRadius: "1.25rem",
        border: "1px solid var(--input-border)",
        background: "var(--panel-bg)",
        boxShadow: "var(--shadow-lg)",
        padding: "2.4rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.6rem",
    },
    sectionHeader: {
        display: "grid",
        gap: "0.45rem",
    },
    sectionTitle: {
        fontSize: "1.6rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
    },
    sectionLead: {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.68,
        maxWidth: "46rem",
    },
    metricGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.5rem",
    },
    metricCard: {
        display: "grid",
        gap: "0.75rem",
        padding: "1.8rem",
        borderRadius: "1.1rem",
        border: "1px solid var(--input-border)",
        background: "var(--panel-bg)",
        boxShadow: "var(--shadow-md)",
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
        background: "var(--color-primary-100)",
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
        fontSize: "1.9rem",
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
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1.25rem",
        padding: "1.4rem 1.85rem",
        borderRadius: "1.1rem",
        border: "1px solid var(--input-border)",
        background: "var(--panel-bg)",
        boxShadow: "var(--shadow-md)",
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
        gap: "0.65rem",
        flexWrap: "wrap",
    },
    rangeButton: {
        padding: "0.55rem 1.4rem",
        borderRadius: "0.75rem",
        fontWeight: 600,
        fontSize: "0.95rem",
        border: "1px solid var(--color-gray-200)",
        background: "var(--color-gray-100)",
        color: "var(--color-gray-600)",
        cursor: "pointer",
        transition: "all 0.2s ease",
    },
    rangeButtonActive: {
        background: "var(--color-primary-100)",
        color: "var(--color-primary-700)",
        border: "1px solid var(--color-primary-300)",
        boxShadow: "var(--shadow-md)",
    },
    chart: {
        borderRadius: "1.2rem",
        border: "1px solid var(--input-border)",
        background: "var(--panel-bg)",
        boxShadow: "var(--shadow-md)",
        padding: "2rem",
    },
    chartInner: {
        height: "280px",
        display: "flex",
        alignItems: "flex-end",
        gap: "1.1rem",
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
        background: "linear-gradient(180deg, rgba(56,189,248,0.85), rgba(37,99,235,0.65))",
    },
    breakBar: {
        width: "100%",
        borderRadius: "0.6rem",
        background: "linear-gradient(180deg, rgba(251,191,36,0.9), rgba(217,119,6,0.7))",
    },
    chartLabel: {
        fontSize: "0.8rem",
        fontWeight: 600,
        color: "var(--color-gray-600)",
    },
    insightGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.5rem",
    },
    insightCard: {
        borderRadius: "1.1rem",
        border: "1px solid var(--input-border)",
        background: "var(--panel-bg)",
        boxShadow: "var(--shadow-md)",
        padding: "1.8rem",
        display: "grid",
        gap: "0.85rem",
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
        background: "var(--color-primary-100)",
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
        color: "#38bdf8",
    },
    deepSection: {
        borderRadius: "1.2rem",
        border: "1px solid rgba(56,189,248,0.25)",
        background: "linear-gradient(135deg, rgba(15,23,42,0.75), rgba(17,24,39,0.85))",
        boxShadow: "0 34px 80px -48px rgba(8,47,73,0.7)",
        padding: "2.2rem",
        color: "#e2e8f0",
        display: "grid",
        gap: "1.6rem",
    },
    goalList: {
        display: "grid",
        gap: "1.35rem",
    },
    goalCard: {
        display: "grid",
        gap: "0.85rem",
        padding: "1.6rem",
        borderRadius: "1rem",
        border: "1px solid rgba(148,163,184,0.22)",
        background: "rgba(15,23,42,0.65)",
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
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "1.4rem",
    },
    suggestionCard: {
        borderRadius: "1.05rem",
        border: "1px solid rgba(148,163,184,0.22)",
        background: "rgba(17,24,39,0.72)",
        boxShadow: "0 28px 60px -46px rgba(15,23,42,0.7)",
        padding: "1.6rem",
        display: "grid",
        gap: "0.75rem",
        minHeight: "100%",
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
    { id: "focus", title: "Total focus time", value: "32h 45m", change: "+12.5%", icon: "⏰", trend: "up" },
    { id: "score", title: "Productivity score", value: "87%", change: "+5.2%", icon: "📊", trend: "up" },
    { id: "streak", title: "Focus streak", value: "7 days", change: "-2 days", icon: "🔥", trend: "down" },
    { id: "sessions", title: "Completed sessions", value: "24", change: "+8.3%", icon: "✅", trend: "up" },
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
        description: "Late mornings consistently deliver your best flow score. Keep this block protected for deep work.",
        icon: "⏰",
        badge: { text: "Prime time", bg: "var(--color-primary-50)", color: "var(--color-primary-700)" },
    },
    {
        title: "Distraction trend",
        highlight: "-18% week-over-week",
        description: "Movement breaks are lowering context switches. Stay consistent to cement the habit.",
        icon: "📉",
        badge: { text: "Improving", bg: "#dcfce7", color: "#166534" },
    },
    {
        title: "Session consistency",
        highlight: "5-day streak",
        description: "Quick evening check-ins helped you avoid zero-focus days. Add a weekend buffer to extend the streak.",
        icon: "🔥",
        badge: { text: "On track", bg: "#fee2e2", color: "#b91c1c" },
    },
];

const goalBlueprints = [
    {
        title: "Log every distraction",
        description: "Capture trigger + category for 90% of interruptions across the week.",
        progress: 72,
        status: { text: "On track", bg: "rgba(16, 185, 129, 0.18)", color: "#34d399" },
    },
    {
        title: "Add deep-work block",
        description: "Schedule one 90-minute uninterrupted sprint three times this week.",
        progress: 45,
        status: { text: "Needs attention", bg: "rgba(250, 204, 21, 0.18)", color: "#f59e0b" },
    },
    {
        title: "Balance focus & breaks",
        description: "Maintain a 3:1 ratio across all timer presets for steady energy.",
        progress: 88,
        status: { text: "Ahead of goal", bg: "rgba(96, 165, 250, 0.22)", color: "#60a5fa" },
    },
];

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
    {
        icon: "📅",
        title: "Review weekly patterns",
        description: "Compare two recent weeks to spot drift in break length or rising distraction categories.",
    },
    {
        icon: "🌀",
        title: "Batch context shifts",
        description: "Group similar tasks under one preset block to reduce cognitive ramp-up between sessions.",
    },
];

const Statistics = () => {
    const [range, setRange] = useState("week");

    const chartHeights = useMemo(
        () =>
            focusBlocks.map((block) => ({
                day: block.day,
                focusHeight: Math.round((block.focus / 6) * 180),
                breakHeight: Math.round((block.break / 2.5) * 110),
            })),
        []
    );

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <section style={styles.hero}>
                    <h1 style={styles.heroTitle}>Productivity pulse</h1>
                    <p style={styles.heroLead}>
                        Track how your focus rhythm evolves each week, surface quick wins, and spot the early signals that help you course-correct before momentum slips.
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
                            Up-to-the-minute indicators benchmarked against your trailing window so you know exactly where to lean in.
                        </p>
                    </div>
                    <div style={styles.metricGrid}>
                        {metricCards.map((metric) => (
                            <div key={metric.id} style={styles.metricCard}>
                                <div style={styles.metricHeader}>
                                    <div style={styles.metricIcon}>{metric.icon}</div>
                                    <span style={styles.metricLabel}>{metric.title}</span>
                                </div>
                                <span style={styles.metricValue}>{metric.value}</span>
                                <span
                                    style={{
                                        ...styles.metricTrend,
                                        color: metric.trend === "up" ? "#22d3ee" : "#f87171",
                                    }}
                                >
                                    {metric.change}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                <div style={styles.toolbar}>
                    <span style={styles.toolbarLabel}>
                        <span role="img" aria-label="calendar">
                            📅
                        </span>
                        Compare periods
                    </span>
                    <div style={styles.rangeButtons}>
                        {timeRangeOptions.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                style={
                                    range === option.value
                                        ? { ...styles.rangeButton, ...styles.rangeButtonActive }
                                        : styles.rangeButton
                                }
                                onClick={() => setRange(option.value)}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                <section style={styles.chart}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Focus vs. recovery cadence</h2>
                        <p style={styles.sectionLead}>
                            Balance your sprint energy: higher blue bars reflect longer deep-work blocks, while gold keeps breaks restorative.
                        </p>
                    </div>
                    <div style={styles.chartInner}>
                        {chartHeights.map((entry) => (
                            <div key={entry.day} style={styles.chartGroup}>
                                <div style={styles.chartBars}>
                                    <div style={{ ...styles.focusBar, height: `${entry.focusHeight}px` }} />
                                    <div style={{ ...styles.breakBar, height: `${entry.breakHeight}px` }} />
                                </div>
                                <span style={styles.chartLabel}>{entry.day}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Momentum signals</h2>
                        <p style={styles.sectionLead}>
                            These patterns highlight where you should double down—or ease off—so your productivity curve stays smooth.
                        </p>
                    </div>
                    <div style={styles.insightGrid}>
                        {insights.map((insight) => (
                            <div key={insight.title} style={styles.insightCard}>
                                <div style={styles.insightHeader}>
                                    <div style={styles.insightIcon}>{insight.icon}</div>
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
                                    <div style={{ fontSize: "1.12rem", fontWeight: 600 }}>{insight.title}</div>
                                    <div style={styles.insightHighlight}>{insight.highlight}</div>
                                </div>
                                <p style={{ color: "#cbd5f5", fontSize: "0.92rem", lineHeight: 1.7 }}>{insight.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={styles.deepSection}>
                    <div>
                        <h2 style={{ fontSize: "1.55rem", fontWeight: 700, marginBottom: "0.35rem" }}>Productivity goals</h2>
                        <p style={{ fontSize: "0.98rem", lineHeight: 1.7, color: "#cbd5f5" }}>
                            Your accountability stack—each target is measurable, rhythmic, and ready for a weekly retro.
                        </p>
                    </div>
                    <div style={styles.goalList}>
                        {goalBlueprints.map((goal) => (
                            <div key={goal.title} style={styles.goalCard}>
                                <div style={styles.goalHeader}>
                                    <span style={{ fontSize: "1.08rem", fontWeight: 600 }}>{goal.title}</span>
                                    <span style={{ ...styles.pill, background: goal.status.bg, color: goal.status.color }}>
                                        {goal.status.text}
                                    </span>
                                </div>
                                <p style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "#cbd5f5" }}>{goal.description}</p>
                                <div style={styles.goalProgress}>
                                    <div style={{ ...styles.goalProgressFill, width: `${goal.progress}%` }} />
                                </div>
                                <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#94a3b8" }}>{goal.progress}% complete</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Personalised nudges</h2>
                        <p style={styles.sectionLead}>
                            Layer one tweak into the coming week and keep note of what nudges your flow score upward.
                        </p>
                    </div>
                    <div style={styles.suggestionGrid}>
                        {suggestions.map((suggestion) => (
                            <div key={suggestion.title} style={styles.suggestionCard}>
                                <div style={{ fontSize: "1.4rem" }}>{suggestion.icon}</div>
                                <div style={{ fontSize: "1.05rem", fontWeight: 600, color: "#f8fafc" }}>{suggestion.title}</div>
                                <p style={{ fontSize: "0.9rem", lineHeight: 1.65, color: "#cbd5f5" }}>{suggestion.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Statistics;
