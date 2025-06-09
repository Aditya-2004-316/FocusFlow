import React, { useState } from "react";
import {
    ChartBarIcon,
    ClockIcon,
    FireIcon,
    CalendarIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    CalendarDaysIcon,
    ChartPieIcon,
} from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";

interface Metric {
    id: string;
    title: string;
    value: string;
    change: number;
    icon: React.ReactElement;
    trend: "up" | "down";
}

interface TimeBlock {
    day: string;
    focusTime: number;
    breakTime: number;
}

const Statistics = () => {
    const [timeRange, setTimeRange] = useState("week");

    const metrics: Metric[] = [
        {
            id: "1",
            title: "Total Focus Time",
            value: "32h 45m",
            change: 12.5,
            icon: <ClockIcon style={{ width: "1.5rem", height: "1.5rem" }} />,
            trend: "up",
        },
        {
            id: "2",
            title: "Productivity Score",
            value: "87%",
            change: 5.2,
            icon: (
                <ChartBarIcon style={{ width: "1.5rem", height: "1.5rem" }} />
            ),
            trend: "up",
        },
        {
            id: "3",
            title: "Focus Streak",
            value: "7 days",
            change: -2,
            icon: <FireIcon style={{ width: "1.5rem", height: "1.5rem" }} />,
            trend: "down",
        },
        {
            id: "4",
            title: "Completed Sessions",
            value: "24",
            change: 8.3,
            icon: (
                <CalendarIcon style={{ width: "1.5rem", height: "1.5rem" }} />
            ),
            trend: "up",
        },
    ];

    const timeBlocks: TimeBlock[] = [
        { day: "Mon", focusTime: 4.5, breakTime: 1.2 },
        { day: "Tue", focusTime: 5.2, breakTime: 1.5 },
        { day: "Wed", focusTime: 3.8, breakTime: 1.0 },
        { day: "Thu", focusTime: 6.1, breakTime: 1.8 },
        { day: "Fri", focusTime: 4.9, breakTime: 1.3 },
        { day: "Sat", focusTime: 3.2, breakTime: 1.1 },
        { day: "Sun", focusTime: 2.8, breakTime: 0.9 },
    ];

    const containerStyle: CSSProperties = {
        minWidth: "64rem",
        margin: "2rem auto",
        padding: "0 1rem",
    };

    const headerStyle: CSSProperties = {
        marginBottom: "2rem",
    };

    const titleStyle: CSSProperties = {
        fontSize: "1.875rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const descriptionStyle: CSSProperties = {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
    };

    const metricsGridStyle: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2rem",
    };

    const metricCardStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    };

    const metricHeaderStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1rem",
    };

    const metricIconStyle: CSSProperties = {
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "0.5rem",
        backgroundColor: "var(--color-primary-50)",
        color: "var(--color-primary-600)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const metricTitleStyle: CSSProperties = {
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "var(--color-gray-600)",
    };

    const metricValueStyle: CSSProperties = {
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const metricChangeStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
        fontSize: "0.875rem",
        fontWeight: 500,
    };

    const positiveChangeStyle: CSSProperties = {
        color: "var(--color-green-600)",
    };

    const negativeChangeStyle: CSSProperties = {
        color: "var(--color-red-600)",
    };

    const timeRangeContainerStyle: CSSProperties = {
        display: "flex",
        gap: "1rem",
        marginBottom: "2rem",
    };

    const timeRangeButtonStyle: CSSProperties = {
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "var(--color-gray-600)",
        backgroundColor: "var(--color-gray-100)",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
    };

    const activeTimeRangeStyle: CSSProperties = {
        ...timeRangeButtonStyle,
        backgroundColor: "var(--color-primary-50)",
        color: "var(--color-primary-700)",
    };

    const chartContainerStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        marginBottom: "2rem",
    };

    const chartHeaderStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1.5rem",
    };

    const chartTitleStyle: CSSProperties = {
        fontSize: "1.125rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    };

    const chartContentStyle: CSSProperties = {
        height: "300px",
        display: "flex",
        alignItems: "flex-end",
        gap: "1rem",
        padding: "1rem 0",
    };

    const barContainerStyle: CSSProperties = {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
    };

    const barStyle: CSSProperties = {
        width: "100%",
        backgroundColor: "var(--color-primary-100)",
        borderRadius: "0.25rem",
        position: "relative",
    };

    const focusBarStyle: CSSProperties = {
        ...barStyle,
        backgroundColor: "var(--color-primary-500)",
    };

    const breakBarStyle: CSSProperties = {
        ...barStyle,
        backgroundColor: "var(--color-gray-300)",
    };

    const barLabelStyle: CSSProperties = {
        fontSize: "0.75rem",
        color: "var(--color-gray-600)",
    };

    const insightsContainerStyle: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem",
    };

    const insightCardStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    };

    const insightHeaderStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1rem",
    };

    const insightIconStyle: CSSProperties = {
        width: "2rem",
        height: "2rem",
        color: "var(--color-primary-600)",
    };

    const insightTitleStyle: CSSProperties = {
        fontSize: "1rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    };

    const insightContentStyle: CSSProperties = {
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.5",
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
                            <div style={metricTitleStyle}>{metric.title}</div>
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
                            {metric.trend === "up" ? (
                                <ArrowTrendingUpIcon
                                    style={{ width: "1rem", height: "1rem" }}
                                />
                            ) : (
                                <ArrowTrendingDownIcon
                                    style={{ width: "1rem", height: "1rem" }}
                                />
                            )}
                            <span>{Math.abs(metric.change)}%</span>
                        </div>
                    </div>
                ))}
            </div>

            <div style={timeRangeContainerStyle}>
                <button
                    style={
                        timeRange === "week"
                            ? activeTimeRangeStyle
                            : timeRangeButtonStyle
                    }
                    onClick={() => setTimeRange("week")}
                >
                    <CalendarDaysIcon
                        style={{
                            width: "1rem",
                            height: "1rem",
                            marginRight: "0.5rem",
                        }}
                    />
                    This Week
                </button>
                <button
                    style={
                        timeRange === "month"
                            ? activeTimeRangeStyle
                            : timeRangeButtonStyle
                    }
                    onClick={() => setTimeRange("month")}
                >
                    <CalendarDaysIcon
                        style={{
                            width: "1rem",
                            height: "1rem",
                            marginRight: "0.5rem",
                        }}
                    />
                    This Month
                </button>
            </div>

            <div style={chartContainerStyle}>
                <div style={chartHeaderStyle}>
                    <div style={chartTitleStyle}>Focus vs Break Time</div>
                    <ChartPieIcon
                        style={{
                            width: "1.5rem",
                            height: "1.5rem",
                            color: "var(--color-gray-400)",
                        }}
                    />
                </div>
                <div style={chartContentStyle}>
                    {timeBlocks.map((block) => (
                        <div key={block.day} style={barContainerStyle}>
                            <div
                                style={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-end",
                                    gap: "0.25rem",
                                }}
                            >
                                <div
                                    style={{
                                        ...focusBarStyle,
                                        height: `${
                                            (block.focusTime / 8) * 100
                                        }%`,
                                    }}
                                />
                                <div
                                    style={{
                                        ...breakBarStyle,
                                        height: `${
                                            (block.breakTime / 8) * 100
                                        }%`,
                                    }}
                                />
                            </div>
                            <div style={barLabelStyle}>{block.day}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={insightsContainerStyle}>
                <div style={insightCardStyle}>
                    <div style={insightHeaderStyle}>
                        <ChartBarIcon style={insightIconStyle} />
                        <div style={insightTitleStyle}>
                            Peak Productivity Hours
                        </div>
                    </div>
                    <div style={insightContentStyle}>
                        Your most productive hours are between 9 AM and 11 AM.
                        Try to schedule your most important tasks during this
                        time.
                    </div>
                </div>
                <div style={insightCardStyle}>
                    <div style={insightHeaderStyle}>
                        <ClockIcon style={insightIconStyle} />
                        <div style={insightTitleStyle}>Focus Duration</div>
                    </div>
                    <div style={insightContentStyle}>
                        You maintain optimal focus for about 45 minutes before
                        needing a break. Consider adjusting your Pomodoro
                        sessions accordingly.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
