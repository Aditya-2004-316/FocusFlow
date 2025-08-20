import React, { useState } from "react";
import {
    UserGroupIcon,
    TrophyIcon,
    ChatBubbleLeftRightIcon,
    UserCircleIcon,
    FireIcon,
    StarIcon,
    CalendarIcon,
    BellIcon,
} from "@heroicons/react/24/outline";

const DashboardCommunity = () => {
    const [activeTab, setActiveTab] = useState("overview");

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

    const subtitleStyle = {
        fontSize: "1.125rem",
        opacity: 0.9,
        marginBottom: "1.5rem",
    };

    const tabsStyle = {
        display: "flex",
        gap: "1rem",
        marginBottom: "2rem",
        borderBottom: "2px solid var(--color-gray-200)",
        paddingBottom: "0.5rem",
    };

    const tabStyle = {
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

    const activeTabStyle = {
        ...tabStyle,
        background: "var(--color-primary-50)",
        color: "var(--color-primary-700)",
    };

    const cardStyle = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        marginBottom: "1.5rem",
    };

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2rem",
    };

    const statCardStyle = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
    };

    const iconStyle = {
        width: "2.5rem",
        height: "2.5rem",
        color: "var(--color-primary-600)",
        flexShrink: 0,
    };

    const buttonStyle = {
        padding: "0.75rem 1.5rem",
        borderRadius: "0.5rem",
        fontSize: "1rem",
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        background: "var(--color-primary-600)",
        color: "var(--color-white)",
        border: "none",
    };

    const userCardStyle = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "1rem",
    };

    const avatarStyle = {
        width: "3rem",
        height: "3rem",
        borderRadius: "50%",
        background: "var(--color-primary-100)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-primary-600)",
        fontWeight: 600,
    };

    return (
        <div style={containerStyle}>
            {/* Header */}
            <div style={headerStyle}>
                <h1 style={titleStyle}>Community Hub</h1>
                <p style={subtitleStyle}>
                    Connect with fellow productivity enthusiasts, join study
                    groups, and track your achievements!
                </p>
            </div>

            {/* Tabs */}
            <div style={tabsStyle}>
                <button
                    style={activeTab === "overview" ? activeTabStyle : tabStyle}
                    onClick={() => setActiveTab("overview")}
                >
                    Overview
                </button>
                <button
                    style={activeTab === "groups" ? activeTabStyle : tabStyle}
                    onClick={() => setActiveTab("groups")}
                >
                    Study Groups
                </button>
                <button
                    style={
                        activeTab === "achievements" ? activeTabStyle : tabStyle
                    }
                    onClick={() => setActiveTab("achievements")}
                >
                    Achievements
                </button>
                <button
                    style={
                        activeTab === "challenges" ? activeTabStyle : tabStyle
                    }
                    onClick={() => setActiveTab("challenges")}
                >
                    Challenges
                </button>
            </div>

            {/* Content based on active tab */}
            {activeTab === "overview" && (
                <div>
                    {/* Stats Grid */}
                    <div style={gridStyle}>
                        <div style={statCardStyle}>
                            <UserGroupIcon style={iconStyle} />
                            <div>
                                <h3
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: 700,
                                        marginBottom: "0.25rem",
                                    }}
                                >
                                    1,247
                                </h3>
                                <p style={{ color: "var(--color-gray-600)" }}>
                                    Active Members
                                </p>
                            </div>
                        </div>
                        <div style={statCardStyle}>
                            <TrophyIcon style={iconStyle} />
                            <div>
                                <h3
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: 700,
                                        marginBottom: "0.25rem",
                                    }}
                                >
                                    89
                                </h3>
                                <p style={{ color: "var(--color-gray-600)" }}>
                                    Achievements Unlocked
                                </p>
                            </div>
                        </div>
                        <div style={statCardStyle}>
                            <FireIcon style={iconStyle} />
                            <div>
                                <h3
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: 700,
                                        marginBottom: "0.25rem",
                                    }}
                                >
                                    156
                                </h3>
                                <p style={{ color: "var(--color-gray-600)" }}>
                                    Focus Sessions Today
                                </p>
                            </div>
                        </div>
                        <div style={statCardStyle}>
                            <StarIcon style={iconStyle} />
                            <div>
                                <h3
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: 700,
                                        marginBottom: "0.25rem",
                                    }}
                                >
                                    23
                                </h3>
                                <p style={{ color: "var(--color-gray-600)" }}>
                                    Active Challenges
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div style={cardStyle}>
                        <h2
                            style={{
                                fontSize: "1.5rem",
                                fontWeight: 600,
                                marginBottom: "1rem",
                            }}
                        >
                            Recent Community Activity
                        </h2>
                        <div style={userCardStyle}>
                            <div style={avatarStyle}>JD</div>
                            <div style={{ flex: 1 }}>
                                <h4
                                    style={{
                                        fontWeight: 600,
                                        marginBottom: "0.25rem",
                                    }}
                                >
                                    John Doe
                                </h4>
                                <p
                                    style={{
                                        color: "var(--color-gray-600)",
                                        fontSize: "0.875rem",
                                    }}
                                >
                                    Completed a 2-hour focus session and earned
                                    the "Deep Focus" badge!
                                </p>
                            </div>
                            <span
                                style={{
                                    color: "var(--color-gray-500)",
                                    fontSize: "0.875rem",
                                }}
                            >
                                2h ago
                            </span>
                        </div>
                        <div style={userCardStyle}>
                            <div style={avatarStyle}>AS</div>
                            <div style={{ flex: 1 }}>
                                <h4
                                    style={{
                                        fontWeight: 600,
                                        marginBottom: "0.25rem",
                                    }}
                                >
                                    Alice Smith
                                </h4>
                                <p
                                    style={{
                                        color: "var(--color-gray-600)",
                                        fontSize: "0.875rem",
                                    }}
                                >
                                    Joined the "Morning Productivity" study
                                    group
                                </p>
                            </div>
                            <span
                                style={{
                                    color: "var(--color-gray-500)",
                                    fontSize: "0.875rem",
                                }}
                            >
                                4h ago
                            </span>
                        </div>
                        <div style={userCardStyle}>
                            <div style={avatarStyle}>MJ</div>
                            <div style={{ flex: 1 }}>
                                <h4
                                    style={{
                                        fontWeight: 600,
                                        marginBottom: "0.25rem",
                                    }}
                                >
                                    Mike Johnson
                                </h4>
                                <p
                                    style={{
                                        color: "var(--color-gray-600)",
                                        fontSize: "0.875rem",
                                    }}
                                >
                                    Won the "Weekly Challenge" with 15 hours of
                                    focused work!
                                </p>
                            </div>
                            <span
                                style={{
                                    color: "var(--color-gray-500)",
                                    fontSize: "0.875rem",
                                }}
                            >
                                1d ago
                            </span>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div style={cardStyle}>
                        <h2
                            style={{
                                fontSize: "1.5rem",
                                fontWeight: 600,
                                marginBottom: "1rem",
                            }}
                        >
                            Quick Actions
                        </h2>
                        <div
                            style={{
                                display: "flex",
                                gap: "1rem",
                                flexWrap: "wrap",
                            }}
                        >
                            <button style={buttonStyle}>
                                <UserGroupIcon
                                    style={{
                                        width: "1.25rem",
                                        height: "1.25rem",
                                    }}
                                />
                                Join Study Group
                            </button>
                            <button style={buttonStyle}>
                                <TrophyIcon
                                    style={{
                                        width: "1.25rem",
                                        height: "1.25rem",
                                    }}
                                />
                                View Achievements
                            </button>
                            <button style={buttonStyle}>
                                <ChatBubbleLeftRightIcon
                                    style={{
                                        width: "1.25rem",
                                        height: "1.25rem",
                                    }}
                                />
                                Start Discussion
                            </button>
                            <button style={buttonStyle}>
                                <CalendarIcon
                                    style={{
                                        width: "1.25rem",
                                        height: "1.25rem",
                                    }}
                                />
                                Schedule Session
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "groups" && (
                <div style={cardStyle}>
                    <h2
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: 600,
                            marginBottom: "1rem",
                        }}
                    >
                        Study Groups
                    </h2>
                    <p
                        style={{
                            color: "var(--color-gray-600)",
                            marginBottom: "2rem",
                        }}
                    >
                        Join study groups to stay motivated and connect with
                        like-minded individuals.
                    </p>
                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            flexWrap: "wrap",
                        }}
                    >
                        <button style={buttonStyle}>
                            <UserGroupIcon
                                style={{ width: "1.25rem", height: "1.25rem" }}
                            />
                            Create New Group
                        </button>
                        <button style={buttonStyle}>
                            <UserGroupIcon
                                style={{ width: "1.25rem", height: "1.25rem" }}
                            />
                            Browse Groups
                        </button>
                    </div>
                </div>
            )}

            {activeTab === "achievements" && (
                <div style={cardStyle}>
                    <h2
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: 600,
                            marginBottom: "1rem",
                        }}
                    >
                        Achievements
                    </h2>
                    <p
                        style={{
                            color: "var(--color-gray-600)",
                            marginBottom: "2rem",
                        }}
                    >
                        Track your progress and unlock badges for your
                        productivity milestones.
                    </p>
                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            flexWrap: "wrap",
                        }}
                    >
                        <button style={buttonStyle}>
                            <TrophyIcon
                                style={{ width: "1.25rem", height: "1.25rem" }}
                            />
                            View All Achievements
                        </button>
                        <button style={buttonStyle}>
                            <StarIcon
                                style={{ width: "1.25rem", height: "1.25rem" }}
                            />
                            Leaderboard
                        </button>
                    </div>
                </div>
            )}

            {activeTab === "challenges" && (
                <div style={cardStyle}>
                    <h2
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: 600,
                            marginBottom: "1rem",
                        }}
                    >
                        Community Challenges
                    </h2>
                    <p
                        style={{
                            color: "var(--color-gray-600)",
                            marginBottom: "2rem",
                        }}
                    >
                        Participate in community challenges to push your
                        productivity to the next level.
                    </p>
                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            flexWrap: "wrap",
                        }}
                    >
                        <button style={buttonStyle}>
                            <FireIcon
                                style={{ width: "1.25rem", height: "1.25rem" }}
                            />
                            Join Challenge
                        </button>
                        <button style={buttonStyle}>
                            <CalendarIcon
                                style={{ width: "1.25rem", height: "1.25rem" }}
                            />
                            View Upcoming
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardCommunity;
