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
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        marginBottom: "1.5rem",
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
        backgroundColor: "var(--color-primary-50)",
        color: "var(--color-primary-600)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5rem",
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
    };

    const timeRangeButtonStyle = {
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
        fontWeight: 500,
        color: "var(--color-gray-600)",
        cursor: "pointer",
        borderRadius: "0.5rem",
        transition: "all 0.2s ease-in-out",
        border: "none",
        background: "none",
    };

    const activeTimeRangeStyle = {
        ...timeRangeButtonStyle,
        background: "var(--color-primary-50)",
        color: "var(--color-primary-700)",
    };

    const chartContainerStyle = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        marginBottom: "2rem",
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
                        style={
                            selectedTimeRange === option.value
                                ? activeTimeRangeStyle
                                : timeRangeButtonStyle
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
        </div>
    );
};

export default Statistics;
