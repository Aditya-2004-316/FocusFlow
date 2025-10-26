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
        maxWidth: "76rem",
        margin: "0 auto",
        padding: "2rem",
    };

    const headerStyle = {
        background:
            "linear-gradient(to right, var(--color-primary-500), var(--color-cyan-400))",
        borderRadius: "1rem",
        padding: "2rem",
        marginBottom: "2rem",
        color: "var(--color-white)",
        boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    };

    const titleStyle = {
        fontSize: "2rem",
        fontWeight: 700,
        marginBottom: "0.5rem",
    };

    const descriptionStyle = {
        fontSize: "1.125rem",
        opacity: 0.9,
        marginBottom: "1.5rem",
    };

    const metricsGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2rem",
    };

    const metricCardStyle = {
        background: "var(--panel-bg)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        marginBottom: "1.5rem",
        border: "1px solid var(--color-gray-200)",
    };

    const metricHeaderStyle = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1rem",
    };

    const metricIconStyle = {
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "0.5rem",
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2rem",
    };

    const metricTitleStyle = {
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "var(--color-gray-600)",
    };

    const metricValueStyle = {
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const metricChangeStyle = {
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
        fontSize: "0.875rem",
        fontWeight: 500,
    };

    const positiveChangeStyle = {
        color: "var(--color-green-600)",
    };

    const negativeChangeStyle = {
        color: "var(--color-red-600)",
    };

    const timeRangeContainerStyle = {
        display: "flex",
        gap: "1rem",
        marginBottom: "2rem",
        borderBottom: "2px solid var(--color-gray-200)",
        paddingBottom: "0.5rem",
    };

    const timeRangeButtonStyle = {
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
        fontWeight: 500,
        color: "var(--color-primary-700)",
        cursor: "pointer",
        borderRadius: "0.5rem",
        transition: "all 0.2s ease-in-out",
        border: "none",
        background: "var(--color-primary-50)",
    };

    const activeTimeRangeStyle = {
        ...timeRangeButtonStyle,
        background: "var(--color-primary-600)",
        color: "#ffffff",
    };

    const chartContainerStyle = {
        background: "var(--panel-bg)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        marginBottom: "2rem",
        border: "1px solid var(--color-gray-200)",
    };

    const chartHeaderStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1.5rem",
    };

    const chartTitleStyle = {
        fontSize: "1.125rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    };

    const chartContentStyle = {
        height: "300px",
        display: "flex",
        alignItems: "flex-end",
        gap: "1rem",
        padding: "1rem 0",
    };

    const barContainerStyle = {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
    };

    const barStyle = {
        width: "100%",
        backgroundColor: "var(--color-primary-100)",
        borderRadius: "0.25rem",
        position: "relative",
    };

    const focusBarStyle = {
        ...barStyle,
        backgroundColor: "var(--color-primary-500)",
    };

    const breakBarStyle = {
        ...barStyle,
        backgroundColor: "var(--color-yellow-500)",
    };

    const barLabelStyle = {
        fontSize: "0.75rem",
        color: "var(--color-gray-500)",
        textAlign: "center",
    };

    const timeRangeOptions = [
        { value: "day", label: "Today" },
        { value: "week", label: "This Week" },
        { value: "month", label: "This Month" },
        { value: "year", label: "This Year" },
    ];

    const sectionTitleStyle = {
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const sectionSubtitleStyle = {
        color: "var(--color-gray-600)",
        fontSize: "0.95rem",
        marginBottom: "1.5rem",
    };

    const insightsContainerStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2.5rem",
    };

    const insightCardStyle = {
        background: "var(--panel-bg)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        border: "1px solid var(--color-gray-200)",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
    };

    const insightHeaderStyle = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        justifyContent: "space-between",
    };

    const insightIconContainerStyle = {
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "0.75rem",
        background: "var(--color-primary-50)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5rem",
        color: "var(--color-primary-600)",
    };

    const insightTitleStyle = {
        fontSize: "1.05rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "0.25rem",
    };

    const insightHighlightStyle = {
        fontSize: "1.35rem",
        fontWeight: 700,
        color: "var(--color-primary-700)",
    };

    const insightDescriptionStyle = {
        color: "var(--color-gray-600)",
        fontSize: "0.9rem",
        lineHeight: 1.6,
    };

    const insightBadgeBaseStyle = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        padding: "0.25rem 0.75rem",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: 600,
    };

    const goalsSectionStyle = {
        background: "var(--panel-bg)",
        borderRadius: "0.75rem",
        padding: "1.75rem",
        border: "1px solid var(--color-gray-200)",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        marginBottom: "2.5rem",
    };

    const goalListStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
    };

    const goalItemStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "0.65rem",
        background: "var(--color-gray-50)",
        borderRadius: "0.75rem",
        padding: "1rem",
    };

    const goalHeaderStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "0.75rem",
    };

    const goalTitleStyle = {
        fontSize: "1rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    };

    const goalDescriptionStyle = {
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.5,
    };

    const goalProgressTrackStyle = {
        height: "0.5rem",
        background: "var(--color-gray-200)",
        borderRadius: "9999px",
        overflow: "hidden",
    };

    const goalProgressFillStyle = {
        height: "100%",
        background: "linear-gradient(90deg, var(--color-primary-500), var(--color-cyan-400))",
        borderRadius: "9999px",
        transition: "width 0.3s ease-in-out",
    };

    const goalStatusPillBaseStyle = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        padding: "0.25rem 0.75rem",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: 600,
    };

    const tipsSectionStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2rem",
    };

    const tipCardStyle = {
        background: "var(--panel-bg)",
        borderRadius: "0.75rem",
        padding: "1.25rem",
        border: "1px solid var(--color-gray-200)",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
    };

    const tipTitleStyle = {
        fontSize: "1rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    };

    const tipDescriptionStyle = {
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.6,
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
