import React, { useState } from "react";

const Statistics = () => {
    const [selectedTimeRange, setSelectedTimeRange] = useState("week");

    const metrics = [
        {
            id: "1",
            title: "Total Focus Time",
            value: "32h 45m",
            change: 12.5,
            icon: "⏰",
            trend: "up",
        },
        {
            id: "2",
            title: "Productivity Score",
            value: "87%",
            change: 5.2,
            icon: "📊",
            trend: "up",
        },
        {
            id: "3",
            title: "Focus Streak",
            value: "7 days",
            change: -2,
            icon: "🔥",
            trend: "down",
        },
        {
            id: "4",
            title: "Completed Sessions",
            value: "24",
            change: 8.3,
            icon: "✅",
            trend: "up",
        },
    ];

    const timeBlocks = [
        { day: "Mon", focusTime: 4.5, breakTime: 1.2 },
        { day: "Tue", focusTime: 5.2, breakTime: 1.5 },
        { day: "Wed", focusTime: 3.8, breakTime: 1.0 },
        { day: "Thu", focusTime: 6.1, breakTime: 1.8 },
        { day: "Fri", focusTime: 4.9, breakTime: 1.3 },
        { day: "Sat", focusTime: 3.2, breakTime: 1.1 },
        { day: "Sun", focusTime: 2.8, breakTime: 0.9 },
    ];

    const containerStyle = {
        minHeight: "100vh",
        padding: "4rem 1.75rem 4rem",
        background: "var(--color-white)",
        color: "var(--color-gray-900)",
    };

    const innerStyle = {
        maxWidth: "1120px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "2.75rem",
    };

    const headerStyle = {
        background: "var(--panel-bg)",
        borderRadius: "1.5rem",
        border: "1px solid var(--input-border)",
        padding: "2.75rem",
        boxShadow: "var(--shadow-lg)",
        display: "flex",
        flexDirection: "column",
        gap: "1.75rem",
    };

    const titleStyle = {
        fontSize: "2.3rem",
        fontWeight: 700,
        lineHeight: 1.2,
        background: "linear-gradient(to right, #38bdf8, #818cf8)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        margin: 0,
    };

    const descriptionStyle = {
        fontSize: "1.08rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.7,
        maxWidth: "44rem",
    };

    const chipRowStyle = {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.65rem",
    };

    const chipStyle = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        background: "var(--color-primary-100)",
        color: "var(--color-primary-700)",
        padding: "0.45rem 0.85rem",
        borderRadius: "9999px",
        fontSize: "0.85rem",
        fontWeight: 600,
    };

    const metricsGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "1.5rem",
    };

    const metricCardStyle = {
        background: "var(--panel-bg)",
        borderRadius: "1.05rem",
        padding: "1.75rem",
        border: "1px solid var(--input-border)",
        boxShadow: "var(--shadow-md)",
        display: "flex",
        flexDirection: "column",
        gap: "0.8rem",
    };

    const metricHeaderStyle = {
        display: "flex",
        alignItems: "center",
        gap: "0.9rem",
    };

    const metricIconStyle = {
        width: "2.6rem",
        height: "2.6rem",
        borderRadius: "0.75rem",
        background: "var(--color-primary-100)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.4rem",
        color: "var(--color-primary-600)",
    };

    const metricTitleStyle = {
        fontSize: "0.85rem",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        color: "var(--color-gray-600)",
        fontWeight: 600,
    };

    const metricValueStyle = {
        fontSize: "1.85rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
    };

    const metricChangeStyle = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        fontSize: "0.85rem",
        fontWeight: 600,
    };

    const positiveChangeStyle = {
        color: "#22d3ee",
    };

    const negativeChangeStyle = {
        color: "#f87171",
    };

    const toolbarCardStyle = {
        background: "var(--panel-bg)",
        borderRadius: "1rem",
        border: "1px solid var(--input-border)",
        padding: "1.35rem 1.75rem",
        boxShadow: "var(--shadow-md)",
        display: "flex",
        flexWrap: "wrap",
        gap: "1.25rem",
        alignItems: "center",
        justifyContent: "space-between",
    };

    const timeRangeContainerStyle = {
        display: "flex",
        gap: "0.75rem",
        flexWrap: "wrap",
    };

    const timeRangeButtonStyle = {
        padding: "0.55rem 1.4rem",
        fontSize: "0.95rem",
        fontWeight: 600,
        color: "var(--color-gray-600)",
        cursor: "pointer",
        borderRadius: "0.75rem",
        border: "1px solid var(--color-gray-200)",
        background: "var(--color-gray-100)",
        transition: "all 0.2s ease",
    };

    const activeTimeRangeStyle = {
        ...timeRangeButtonStyle,
        background: "var(--color-primary-100)",
        color: "var(--color-primary-700)",
        border: "1px solid var(--color-primary-300)",
        boxShadow: "var(--shadow-md)",
    };

    const chartContainerStyle = {
        background: "var(--panel-bg)",
        borderRadius: "1.1rem",
        padding: "2rem",
        border: "1px solid var(--input-border)",
        boxShadow: "var(--shadow-md)",
    };

    const chartHeaderStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1.5rem",
    };

    const chartTitleStyle = {
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    };

    const chartContentStyle = {
        height: "320px",
        display: "flex",
        alignItems: "flex-end",
        gap: "1.1rem",
        padding: "0.5rem 0 0",
    };

    const barContainerStyle = {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.6rem",
    };

    const barStyle = {
        width: "100%",
        borderRadius: "0.5rem",
        position: "relative",
        overflow: "hidden",
        background: "rgba(59, 130, 246, 0.2)",
    };

    const focusBarStyle = {
        ...barStyle,
        background: "linear-gradient(180deg, rgba(56, 189, 248, 0.85), rgba(37, 99, 235, 0.65))",
    };

    const breakBarStyle = {
        ...barStyle,
        background: "linear-gradient(180deg, rgba(250, 204, 21, 0.85), rgba(234, 179, 8, 0.65))",
    };

    const barLabelStyle = {
        fontSize: "0.78rem",
        color: "var(--color-gray-600)",
        textAlign: "center",
        fontWeight: 600,
    };

    const timeRangeOptions = [
        { value: "day", label: "Today" },
        { value: "week", label: "This Week" },
        { value: "month", label: "This Month" },
        { value: "year", label: "This Year" },
    ];

    const sectionTitleStyle = {
        fontSize: "1.55rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "0.45rem",
    };

    const sectionSubtitleStyle = {
        color: "var(--color-gray-600)",
        fontSize: "0.98rem",
        marginBottom: "1.4rem",
        lineHeight: 1.7,
    };

    const insightsContainerStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.5rem",
    };

    const insightCardStyle = {
        background: "var(--panel-bg)",
        borderRadius: "1rem",
        padding: "1.75rem",
        border: "1px solid var(--input-border)",
        boxShadow: "var(--shadow-md)",
        display: "flex",
        flexDirection: "column",
        gap: "0.9rem",
    };

    const insightHeaderStyle = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        justifyContent: "space-between",
    };

    const insightIconContainerStyle = {
        width: "2.6rem",
        height: "2.6rem",
        borderRadius: "0.8rem",
        background: "var(--color-primary-100)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.4rem",
        color: "var(--color-primary-600)",
    };

    const insightTitleStyle = {
        fontSize: "1.1rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "0.3rem",
    };

    const insightHighlightStyle = {
        fontSize: "1.4rem",
        fontWeight: 700,
        color: "#38bdf8",
    };

    const insightDescriptionStyle = {
        color: "#cbd5f5",
        fontSize: "0.92rem",
        lineHeight: 1.7,
    };

    const insightBadgeBaseStyle = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        padding: "0.28rem 0.85rem",
        borderRadius: "9999px",
        fontSize: "0.78rem",
        fontWeight: 600,
    };

    const goalsSectionStyle = {
        background: "rgba(17, 24, 39, 0.7)",
        borderRadius: "1rem",
        padding: "1.9rem",
        border: "1px solid rgba(56, 189, 248, 0.18)",
        boxShadow: "0 28px 60px -36px rgba(8, 47, 73, 0.7)",
    };

    const goalListStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
    };

    const goalItemStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        background: "rgba(15, 23, 42, 0.6)",
        borderRadius: "0.9rem",
        padding: "1.2rem 1.35rem",
        border: "1px solid rgba(148, 163, 184, 0.18)",
    };

    const goalHeaderStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "0.75rem",
        flexWrap: "wrap",
    };

    const goalTitleStyle = {
        fontSize: "1.05rem",
        fontWeight: 600,
        color: "#f8fafc",
    };

    const goalDescriptionStyle = {
        fontSize: "0.92rem",
        color: "#cbd5f5",
        lineHeight: 1.7,
    };

    const goalProgressTrackStyle = {
        height: "0.55rem",
        background: "rgba(148, 163, 184, 0.22)",
        borderRadius: "9999px",
        overflow: "hidden",
    };

    const goalProgressFillStyle = {
        height: "100%",
        background: "linear-gradient(90deg, #38bdf8, #818cf8)",
        borderRadius: "9999px",
        transition: "width 0.35s ease",
    };

    const goalStatusPillBaseStyle = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        padding: "0.28rem 0.85rem",
        borderRadius: "9999px",
        fontSize: "0.78rem",
        fontWeight: 600,
    };

    const tipsSectionStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.5rem",
    };

    const tipCardStyle = {
        background: "rgba(17, 24, 39, 0.7)",
        borderRadius: "0.95rem",
        padding: "1.6rem",
        border: "1px solid rgba(148, 163, 184, 0.18)",
        boxShadow: "0 26px 55px -34px rgba(8, 47, 73, 0.72)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
    };

    const tipTitleStyle = {
        fontSize: "1.05rem",
        fontWeight: 600,
        color: "#f8fafc",
    };

    const tipDescriptionStyle = {
        fontSize: "0.92rem",
        color: "#cbd5f5",
        lineHeight: 1.65,
    };

    const insights = [
        {
            title: "Peak Focus Hours",
            highlight: "10 AM – 1 PM",
            description:
                "You consistently achieve your highest focus score during late mornings. Protect this window for deep work.",
            icon: "⏰",
            badge: {
                label: "Prime Time",
                bg: "var(--color-primary-50)",
                text: "var(--color-primary-700)",
            },
        },
        {
            title: "Distraction Trend",
            highlight: "-18% week-over-week",
            description:
                "Distractions dropped notably after adding 5-minute movement breaks. Keep the habit going to maintain momentum.",
            icon: "📉",
            badge: {
                label: "Improving",
                bg: "#dcfce7",
                text: "#166534",
            },
        },
        {
            title: "Session Consistency",
            highlight: "5-day streak",
            description:
                "Short evening check-ins helped you avoid zero-focus days. Try extending the streak with a weekend plan.",
            icon: "🔥",
            badge: {
                label: "On Track",
                bg: "#fee2e2",
                text: "#b91c1c",
            },
        },
    ];

    const productivityGoals = [
        {
            title: "Log every distraction",
            description:
                "Capture the trigger and category for at least 90% of interruptions this week.",
            progress: 72,
            status: "on-track",
        },
        {
            title: "Add one deep-work block",
            description:
                "Schedule a 90-minute uninterrupted session three times this week.",
            progress: 45,
            status: "needs-attention",
        },
        {
            title: "Balance focus and breaks",
            description:
                "Maintain an average focus-to-break ratio of 3:1 across all sessions.",
            progress: 88,
            status: "exceeding",
        },
    ];

    const improvementTips = [
        {
            title: "Automate session prep",
            description:
                "Use a preset to load your preferred focus/break lengths and start with fewer clicks.",
            icon: "⚙️",
        },
        {
            title: "Introduce anchor tasks",
            description:
                "Plan one high-impact task before noon and reflect on it in the evening to reinforce your streak.",
            icon: "🎯",
        },
        {
            title: "Review weekly patterns",
            description:
                "Compare this week with the previous one in the Statistics tab to spot shifts in productivity early.",
            icon: "📅",
        },
    ];

    const statusColors = {
        "on-track": {
            bg: "#dcfce7",
            text: "#166534",
            label: "On track",
        },
        "needs-attention": {
            bg: "#fef3c7",
            text: "#92400e",
            label: "Needs attention",
        },
        exceeding: {
            bg: "#dbeafe",
            text: "#1d4ed8",
            label: "Ahead of goal",
        },
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Statistics</h1>
                <p style={descriptionStyle}>
                    Track your productivity and focus patterns over time
                </p>
            </div>

            <div style={metricsGridStyle}>
                {metrics.map((metric) => (
                    <div key={metric.id} style={metricCardStyle}>
                        <div style={metricHeaderStyle}>
                            <div style={metricIconStyle}>{metric.icon}</div>
                            <span style={metricTitleStyle}>{metric.title}</span>
                        </div>
                        <div style={metricValueStyle}>{metric.value}</div>
                        <div
                            style={{
                                ...metricChangeStyle,
                                ...(metric.trend === "up"
                                    ? positiveChangeStyle
                                    : negativeChangeStyle),
                            }}
                        >
                            <span>{metric.trend === "up" ? "↗" : "↘"}</span>
                            <span>{Math.abs(metric.change)}%</span>
                            <span>from last period</span>
                        </div>
                    </div>
                ))}
            </div>

            <div style={timeRangeContainerStyle}>
                {timeRangeOptions.map((option) => (
                    <button
                        key={option.value}
                        className={
                            selectedTimeRange === option.value
                                ? "btn-primary"
                                : "btn-secondary"
                        }
                        onClick={() => setSelectedTimeRange(option.value)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            <div style={chartContainerStyle}>
                <div style={chartHeaderStyle}>
                    <h2 style={chartTitleStyle}>Focus Time vs Break Time</h2>
                </div>
                <div style={chartContentStyle}>
                    {timeBlocks.map((block, index) => (
                        <div key={index} style={barContainerStyle}>
                            <div style={barContainerStyle}>
                                <div
                                    style={{
                                        ...focusBarStyle,
                                        height: `${
                                            (block.focusTime / 8) * 200
                                        }px`,
                                    }}
                                />
                                <div
                                    style={{
                                        ...breakBarStyle,
                                        height: `${
                                            (block.breakTime / 3) * 100
                                        }px`,
                                    }}
                                />
                            </div>
                            <span style={barLabelStyle}>{block.day}</span>
                        </div>
                    ))}
                </div>
            </div>

            <section>
                <h2 style={sectionTitleStyle}>Focus Insights</h2>
                <p style={sectionSubtitleStyle}>
                    Understand where your momentum is building and identify the habits
                    that keep you in a productive flow.
                </p>
                <div style={insightsContainerStyle}>
                    {insights.map((insight, idx) => (
                        <div key={idx} style={insightCardStyle}>
                            <div style={insightHeaderStyle}>
                                <div style={insightIconContainerStyle}>
                                    <span>{insight.icon}</span>
                                </div>
                                <span
                                    style={{
                                        ...insightBadgeBaseStyle,
                                        background: insight.badge.bg,
                                        color: insight.badge.text,
                                    }}
                                >
                                    {insight.badge.label}
                                </span>
                            </div>
                            <div>
                                <div style={insightTitleStyle}>{insight.title}</div>
                                <div style={insightHighlightStyle}>
                                    {insight.highlight}
                                </div>
                            </div>
                            <p style={insightDescriptionStyle}>{insight.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section style={goalsSectionStyle}>
                <h2 style={sectionTitleStyle}>Productivity Goals</h2>
                <p style={sectionSubtitleStyle}>
                    Stay accountable with measurable targets and track your progress in
                    real time.
                </p>
                <div style={goalListStyle}>
                    {productivityGoals.map((goal, idx) => {
                        const status = statusColors[goal.status] || statusColors["on-track"];
                        return (
                            <div key={idx} style={goalItemStyle}>
                                <div style={goalHeaderStyle}>
                                    <span style={goalTitleStyle}>{goal.title}</span>
                                    <span
                                        style={{
                                            ...goalStatusPillBaseStyle,
                                            background: status.bg,
                                            color: status.text,
                                        }}
                                    >
                                        {status.label}
                                    </span>
                                </div>
                                <p style={goalDescriptionStyle}>{goal.description}</p>
                                <div style={goalProgressTrackStyle}>
                                    <div
                                        style={{
                                            ...goalProgressFillStyle,
                                            width: `${goal.progress}%`,
                                        }}
                                    />
                                </div>
                                <span
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                        color: "var(--color-gray-500)",
                                    }}
                                >
                                    {goal.progress}% complete
                                </span>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section>
                <h2 style={sectionTitleStyle}>Personalized Suggestions</h2>
                <p style={sectionSubtitleStyle}>
                    Small adjustments can compound into meaningful gains—try one of
                    these ideas next session.
                </p>
                <div style={tipsSectionStyle}>
                    {improvementTips.map((tip, idx) => (
                        <div key={idx} style={tipCardStyle}>
                            <div
                                style={{
                                    fontSize: "1.5rem",
                                    lineHeight: 1,
                                }}
                            >
                                {tip.icon}
                            </div>
                            <div style={tipTitleStyle}>{tip.title}</div>
                            <p style={tipDescriptionStyle}>{tip.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Statistics;
