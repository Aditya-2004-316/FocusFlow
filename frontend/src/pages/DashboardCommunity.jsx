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

    const sectionHeadingStyle = {
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const sectionDescriptionStyle = {
        fontSize: "0.95rem",
        color: "var(--color-gray-600)",
        marginBottom: "1.5rem",
        lineHeight: 1.6,
    };

    const mentorshipSectionStyle = {
        margin: "2.5rem 0",
    };

    const mentorshipGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.5rem",
    };

    const mentorshipCardStyle = {
        background: "var(--panel-bg)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        border: "1px solid var(--color-gray-200)",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
    };

    const mentorshipHeaderStyle = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
    };

    const mentorshipAvatarStyle = {
        width: "3rem",
        height: "3rem",
        borderRadius: "50%",
        background: "var(--color-primary-100)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-primary-700)",
        fontWeight: 700,
        fontSize: "1rem",
    };

    const mentorshipMetaStyle = {
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
        fontSize: "0.85rem",
        fontWeight: 600,
        color: "var(--color-primary-700)",
    };

    const mentorshipTagStyle = {
        padding: "0.25rem 0.75rem",
        borderRadius: "9999px",
        background: "var(--color-primary-50)",
    };

    const mentorshipBioStyle = {
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.6,
    };

    const mentorshipActionStyle = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        fontSize: "0.85rem",
        fontWeight: 600,
        color: "var(--color-primary-600)",
    };

    const spotlightSectionStyle = {
        margin: "2.5rem 0",
    };

    const spotlightGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.5rem",
    };

    const spotlightCardStyle = {
        background: "var(--color-gray-50)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        border: "1px solid var(--color-gray-200)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
    };

    const spotlightTitleStyle = {
        fontSize: "1rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    };

    const spotlightDescriptionStyle = {
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.6,
    };

    const spotlightTagListStyle = {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        fontSize: "0.75rem",
        fontWeight: 600,
        color: "var(--color-primary-700)",
    };

    const spotlightTagStyle = {
        padding: "0.25rem 0.75rem",
        borderRadius: "9999px",
        background: "var(--color-primary-50)",
    };

    const eventSectionStyle = {
        margin: "2.5rem 0",
    };

    const eventTimelineStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.5rem",
    };

    const eventCardStyle = {
        background: "var(--panel-bg)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        border: "1px solid var(--color-gray-200)",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
    };

    const eventMetaStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "0.75rem",
        flexWrap: "wrap",
        fontSize: "0.85rem",
        fontWeight: 600,
        color: "var(--color-primary-700)",
    };

    const eventDescriptionStyle = {
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.6,
    };

    const eventActionStyle = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        fontSize: "0.85rem",
        fontWeight: 600,
        color: "var(--color-primary-600)",
    };

    const communityMentors = [
        {
            initials: "JD",
            name: "Jasmine Deep",
            expertise: ["Deep Work", "Focus Rituals"],
            bio: "Helped 50+ students design distraction-proof routines and maintain streaks over exam season.",
            nextAvailability: "Mentor hours · Fri 5 PM",
        },
        {
            initials: "RT",
            name: "Ravi Thakur",
            expertise: ["Career Switch", "Systems"],
            bio: "Transitioned from sales to product design using FocusFlow habit loops—now mentors weekly sessions.",
            nextAvailability: "Demo day host · Thu",
        },
        {
            initials: "AM",
            name: "Aisha Mendes",
            expertise: ["Accountability", "Wellness"],
            bio: "Runs the 6 AM accountability circle and shares recovery frameworks for sustainable focus.",
            nextAvailability: "Morning circle · Sun",
        },
    ];

    const communitySpotlights = [
        {
            title: "FocusLab Builders",
            description:
                "A cross-disciplinary crew shipping side projects together using weekly build logs and peer reviews.",
            tags: ["Side projects", "Feedback loops"],
        },
        {
            title: "Grad Prep Collective",
            description:
                "Study group coordinating GRE prep with shared decks, sprint pairings, and weekend mock sessions.",
            tags: ["Study group", "Exam prep"],
        },
        {
            title: "Mindful Makers",
            description:
                "Combines focus blocks with mindfulness and art breaks to protect energy while staying prolific.",
            tags: ["Mindfulness", "Creative"],
        },
    ];

    const communityEvents = [
        {
            title: "Feature jam & AMA",
            date: "Nov 2 · 6 PM GMT",
            description:
                "Bring feature ideas, vote live, and chat with the product team about the roadmap.",
            action: "Save your seat",
        },
        {
            title: "Sprint challenge kickoff",
            date: "Nov 6 · 8 AM GMT",
            description:
                "Two-week focus sprint with leaderboard, daily check-ins, and curated playlists.",
            action: "Join the challenge",
        },
        {
            title: "Community showcase",
            date: "Nov 12 · 4 PM GMT",
            description:
                "Spotlight on member wins and lightning talks on the best habit experiments from October.",
            action: "Submit a talk",
        },
    ];

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
                    className={
                        activeTab === "overview" ? "btn-primary" : "btn-secondary"
                    }
                    onClick={() => setActiveTab("overview")}
                >
                    Overview
                </button>
                <button
                    className={
                        activeTab === "groups" ? "btn-primary" : "btn-secondary"
                    }
                    onClick={() => setActiveTab("groups")}
                >
                    Study Groups
                </button>
                <button
                    className={
                        activeTab === "achievements"
                            ? "btn-primary"
                            : "btn-secondary"
                    }
                    onClick={() => setActiveTab("achievements")}
                >
                    Achievements
                </button>
                <button
                    className={
                        activeTab === "challenges"
                            ? "btn-primary"
                            : "btn-secondary"
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

                    <section style={mentorshipSectionStyle}>
                        <h2 style={sectionHeadingStyle}>Mentor office hours</h2>
                        <p style={sectionDescriptionStyle}>
                            Learn from community leaders who share their focus frameworks, review session plans,
                            and keep you accountable through live Q&amp;A blocks.
                        </p>
                        <div style={mentorshipGridStyle}>
                            {communityMentors.map((mentor, idx) => (
                                <div key={idx} style={mentorshipCardStyle}>
                                    <div style={mentorshipHeaderStyle}>
                                        <div style={mentorshipAvatarStyle}>{mentor.initials}</div>
                                        <div>
                                            <div
                                                style={{
                                                    fontSize: "1.05rem",
                                                    fontWeight: 600,
                                                    color: "var(--color-gray-900)",
                                                }}
                                            >
                                                {mentor.name}
                                            </div>
                                            <div style={mentorshipMetaStyle}>
                                                {mentor.expertise.map((area) => (
                                                    <span key={area} style={mentorshipTagStyle}>
                                                        {area}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p style={mentorshipBioStyle}>{mentor.bio}</p>
                                    <span style={mentorshipActionStyle}>{mentor.nextAvailability}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={spotlightSectionStyle}>
                        <h2 style={sectionHeadingStyle}>Spotlight circles</h2>
                        <p style={sectionDescriptionStyle}>
                            Tap into specialised cohorts that keep momentum high with shared rituals, retros, and
                            progress posts.
                        </p>
                        <div style={spotlightGridStyle}>
                            {communitySpotlights.map((item, idx) => (
                                <div key={idx} style={spotlightCardStyle}>
                                    <div style={spotlightTitleStyle}>{item.title}</div>
                                    <p style={spotlightDescriptionStyle}>{item.description}</p>
                                    <div style={spotlightTagListStyle}>
                                        {item.tags.map((tag) => (
                                            <span key={tag} style={spotlightTagStyle}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={eventSectionStyle}>
                        <h2 style={sectionHeadingStyle}>Upcoming community events</h2>
                        <p style={sectionDescriptionStyle}>
                            Reserve your spot in live sessions that blend accountability, product previews, and
                            celebrations of member wins.
                        </p>
                        <div style={eventTimelineStyle}>
                            {communityEvents.map((event, idx) => (
                                <div key={idx} style={eventCardStyle}>
                                    <div style={eventMetaStyle}>
                                        <span>{event.date}</span>
                                        <span
                                            style={{
                                                padding: "0.25rem 0.75rem",
                                                borderRadius: "9999px",
                                                background: "var(--color-primary-50)",
                                                color: "var(--color-primary-700)",
                                                fontSize: "0.75rem",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Live session
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "1.05rem",
                                            fontWeight: 600,
                                            color: "var(--color-gray-900)",
                                        }}
                                    >
                                        {event.title}
                                    </div>
                                    <p style={eventDescriptionStyle}>{event.description}</p>
                                    <span style={eventActionStyle}>{event.action}</span>
                                </div>
                            ))}
                        </div>
                    </section>
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
