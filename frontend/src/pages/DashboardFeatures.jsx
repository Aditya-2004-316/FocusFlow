import React, { useMemo, useState } from "react";
import useResponsive from "../hooks/useResponsive";
import {
    FaTasks,
    FaClock,
    FaChartBar,
    FaUsers,
    FaBan,
    FaThLarge,
    FaBookOpen,
    FaHeadset,
    FaComments,
    FaLightbulb,
    FaCheckCircle,
    FaArrowLeft,
} from "react-icons/fa";

const features = [
    {
        title: "Advanced Task Management",
        description:
            "Create, organize, and prioritize unlimited tasks with tags, deadlines, and custom views that stay in sync across devices.",
        category: "Planning",
        benefit: "Capture everything in one workspace",
        icon: FaTasks,
        fullDetails: [
            "Our Advanced Task Management system is built on the philosophy that a clear head starts with a clear list. We've moved beyond simple to-dos to provide a comprehensive organizational framework.",
            "Dynamic Prioritization: Use our drag-and-drop interface to reorder tasks based on immediate needs. FocusFlow automatically highlights tasks with upcoming deadlines, ensuring you never miss a milestone.",
            "Intelligent Tagging: Categories are not enough. Our tagging system allows for cross-project visibility. Tag a task with 'Energy Level: High' or 'Context: Office' to filter your list based on your current state.",
            "Subtask Nesting: Break down overwhelming goals into manageable steps. Each subtask can have its own deadline, notes, and priority, allowing for deep project management within a simple interface.",
            "Cloud Sync: Your tasks follow you. Whether you're on your mobile device during a commute or at your desktop for a deep work session, your workspace is always perfectly in sync."
        ]
    },
    {
        title: "Integrated Focus Timer",
        description:
            "Run Pomodoro, deep work, and custom focus intervals that automatically log progress and streaks.",
        category: "Focus",
        benefit: "Protect time for meaningful work",
        icon: FaClock,
        fullDetails: [
            "The Integrated Focus Timer is the heartbeat of FocusFlow. It transforms passive planning into active execution through science-backed timeboxing techniques.",
            "Customizable Intervals: While we love the 25/5 Pomodoro method, we know every brain is different. Set your own work blocks and break durations to match your natural attention span.",
            "Automatic Streak Tracking: Momentum is a powerful motivator. FocusFlow automatically records every successful session, building a visual 'streak' that encourages consistency over long periods.",
            "Soundscapes and Ambiance: Toggle built-in white noise, lo-fi beats, or nature sounds directly from the timer interface. These are designed to mask environmental distractions and trigger a 'flow state' faster.",
            "Focus Mode: When the timer starts, your dashboard simplifies. We hide non-essential tasks and notifications, keeping your eyes on the current objective until the bell rings."
        ]
    },
    {
        title: "Detailed Analytics",
        description:
            "Visualize productivity trends, goal progress, and time allocation through interactive dashboards.",
        category: "Insights",
        benefit: "Understand what moves the needle",
        icon: FaChartBar,
        fullDetails: [
            "You cannot improve what you do not measure. Our Analytics dashboard turns your focus data into actionable insights for personal and professional growth.",
            "Productivity Heatmaps: Identify your 'golden hours'. Our visual heatmaps show exactly when you are most focused during the day and week, helping you schedule your toughest work during peak times.",
            "Time Allocation Breakdown: See exactly where your hours are going. Are you spending too much on 'Admin' and not enough on 'Deep Work'? Our charts provide the clarity needed to rebalance your life.",
            "Goal Tracking: Set daily, weekly, or monthly focus targets. Track your progress toward these goals in real-time and receive meaningful nudges when you're close to a breakthrough.",
            "Historical Comparisons: Compare this week's data to last month. Spot long-term trends in your focus capacity and see how changes in your environment or routine affect your output."
        ]
    },
    {
        title: "Collaboration Tools",
        description:
            "Invite teammates, co-manage projects, leave context-rich comments, and celebrate wins together.",
        category: "Teamwork",
        benefit: "Keep everyone aligned",
        icon: FaUsers,
        fullDetails: [
            "FocusFlow for Teams bridges the gap between individual deep work and group coordination. We've built tools that celebrate clarity over constant communication.",
            "Shared Workspaces: Create dedicated spaces for projects, departments, or entire organizations. Control permissions with granular roles to ensure the right people have the right access.",
            "Async-First Communication: Tasks serve as the center of conversation. Leave comments, attach files, and @mention teammates directly within a task to keep the context where the work is happening.",
            "Team Focus Sync: See which teammates are currently in a focus session. This creates a virtual 'quiet office' environment, signaling to others that now is not the time for an interruption.",
            "Project Milestones: Track team progress toward large objectives. Celebrate collective wins when key phases are completed, fostering a culture of shared achievement."
        ]
    },
    {
        title: "Distraction Logging",
        description:
            "Capture interruptions, discover patterns, and receive personalized nudges to stay in flow longer.",
        category: "Clarity",
        benefit: "Transform distractions into insight",
        icon: FaBan,
        fullDetails: [
            "The first step to beating distractions is acknowledging them. Our unique Distraction Log allows you to capture 'flow-breakers' without losing your place in your current task.",
            "One-Click Logging: When an interruption occurs, hit the Log button, categorize it (e.g., 'Internal Thought', 'Slack Ping', 'Environmental'), and get right back to work.",
            "Distraction Pattern Analysis: After a week of logging, our AI identifies your biggest focus-killers. Is it your smartphone? Unnecessary meetings? We highlight the culprits so you can take action.",
            "Personalized Nudges: Based on your log, FocusFlow suggests improvements. If 'Internal Thoughts' are high, we might suggest a daily journaling ritual or a 'brain dump' before starting your timer.",
            "Focus Guard: Integrate with our browser extension to automatically block known distracting sites during your active focus sessions."
        ]
    },
    {
        title: "Customizable Workspace",
        description:
            "Toggle between list, board, and calendar layouts. Personalize themes, widgets, and automation rules.",
        category: "Workspace",
        benefit: "Design a setup that matches you",
        icon: FaThLarge,
        fullDetails: [
            "FocusFlow isn't a one-size-fits-all solution. We provide the building blocks, but you design the environment that best supports your unique way of thinking.",
            "View Versatility: Switch instantly between a clean List view for daily tasks, an agile Kanban Board for project stages, or a Calendar view for time-blocking your week.",
            "Theming and Aesthetics: Choose from a curated selection of premium themes. From a sleek 'Dark Mode' to a vibrant 'Neon' or a calm 'Minimalist' skin, make your workspace a place you enjoy spending time.",
            "Custom Widgets: Add a 'Daily Quote', a 'Weather Widget', or a 'Momentum Meter' to your sidebar. Keep the information that inspires you front and center.",
            "Automation Engine: Create 'If-This-Then-That' rules for your tasks. For example: 'If a task is tagged #Review, move it to the High Priority column automatically'."
        ]
    },
];

const adoptionSignals = [
    "6 workspace layouts for planning",
    "Real-time collaboration with comments",
    "Automated streak tracking across devices",
    "Privacy-first approach to usage analytics",
];

const guideResources = [
    "Onboarding playbook for new teammates",
    "Deep work templates for study groups",
    "Weekly review checklist for solo makers",
    "Automation recipes to reclaim time",
];

const supportPaths = [
    "Chat with our student support crew",
    "Join a live walkthrough every Friday",
    "Browse the feature change log",
    "Share feedback that shapes the roadmap",
];

const quickStart = [
    "Spin up a shared workspace in minutes",
    "Sync tasks from your existing tools",
    "Automate handoffs with recurring workflows",
    "Export insights for weekly retros",
];

const heroLeftColumnStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.85rem",
};

const heroRightColumnStyle = {
    display: "flex",
    flexDirection: "column",
};

const heroContentStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
};

const heroBadgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.85rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--color-primary-600)",
    background: "linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(14, 165, 233, 0.06))",
    padding: "0.35rem 0.85rem",
    borderRadius: "999px",
    width: "fit-content",
};

const heroSubtitleStyle = {
    fontSize: "1.05rem",
    color: "var(--color-gray-600)",
    lineHeight: 1.7,
    maxWidth: "34rem",
};

const heroActionsStyle = {
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
};

const heroPrimaryButtonStyle = {
    background: "linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))",
    color: "#0f172a",
    padding: "0.85rem 1.9rem",
    borderRadius: "999px",
    fontWeight: 600,
    fontSize: "0.95rem",
    border: "none",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.6rem",
    boxShadow: "0 16px 32px rgba(8, 145, 178, 0.28)",
    cursor: "pointer",
};

const heroSecondaryButtonStyle = {
    background: "transparent",
    color: "var(--color-primary-600)",
    padding: "0.85rem 1.75rem",
    borderRadius: "999px",
    fontWeight: 600,
    fontSize: "0.95rem",
    border: "1px solid var(--color-primary-300)",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
};

const highlightPanelStyle = {
    background: "var(--panel-bg)",
    border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
    borderRadius: "1.25rem",
    padding: "1.75rem",
    boxShadow: "var(--shadow-soft)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
};

const highlightChipStyle = {
    background: "var(--color-white)",
    border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
    borderRadius: "1rem",
    padding: "0.75rem 1rem",
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "var(--color-gray-700)",
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    boxShadow: "var(--shadow-soft)",
};

const highlightStatValueStyle = {
    width: "1rem",
    height: "1rem",
    color: "var(--color-primary-600)",
    flexShrink: 0,
};

const sectionWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.75rem",
};

const sectionHeaderStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
};

const sectionTitleStyle = {
    fontSize: "1.65rem",
    fontWeight: 700,
    color: "var(--color-gray-900)",
};

const featureCardStyle = {
    background: "var(--panel-bg)",
    border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
    borderColor: "color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
    borderRadius: "1rem",
    overflow: "hidden",
    boxShadow: "var(--shadow-soft)",
    display: "flex",
    flexDirection: "column",
    textDecoration: "none",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
    transform: "translateY(0)",
    cursor: "pointer",
};

const featureCardHoverStyle = {
    transform: "translateY(-6px)",
    boxShadow: "0 20px 32px rgba(15, 118, 110, 0.18)",
    borderColor: "var(--color-primary-300)",
};

const cardHeaderStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.85rem",
    padding: "1.5rem 1.75rem 0.75rem",
};

const cardIconWrapperStyle = {
    width: "2.6rem",
    height: "2.6rem",
    minWidth: "2.6rem",
    minHeight: "2.6rem",
    borderRadius: "0.85rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(56, 189, 248, 0.12)",
    color: "var(--color-primary-600)",
    fontSize: "1.4rem",
    flexShrink: 0,
};

const cardBadgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    fontSize: "0.85rem",
    fontWeight: 500,
    color: "var(--color-primary-600)",
    background: "rgba(56, 189, 248, 0.12)",
    borderRadius: "999px",
    padding: "0.35rem 0.85rem",
};

const cardContentStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.9rem",
    padding: "0 1.75rem 1.75rem",
    flex: 1,
};

const cardTitleStyle = {
    fontSize: "clamp(1.15rem, 2.5vw, 1.3rem)",
    fontWeight: 700,
    color: "var(--color-primary-700)",
    margin: 0,
    letterSpacing: "-0.3px",
};

const cardDescriptionStyle = {
    fontSize: "1rem",
    color: "var(--color-gray-600)",
    lineHeight: 1.6,
    margin: 0,
};

const cardFooterStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem",
    marginTop: "1.25rem",
    paddingTop: "1rem",
    borderTop: "1px solid var(--input-border)",
    flexWrap: "wrap",
};

const cardBenefitStyle = {
    fontSize: "0.85rem",
    color: "var(--color-gray-500)",
    fontWeight: 500,
};

const readMoreStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "var(--color-primary-600)",
    fontSize: "0.875rem",
    fontWeight: 600,
    textDecoration: "none",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    transition: "color 0.2s ease, transform 0.2s ease",
};

const readMoreHoverStyle = {
    color: "var(--color-primary-700)",
};

const backButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "var(--color-primary-600)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    textDecoration: "none",
    transition: "color 0.2s ease, transform 0.2s ease",
};

const heroPrimaryButtonHoverStyle = {
    ...heroPrimaryButtonStyle,
    transform: "scale(1.02)",
    background: "linear-gradient(135deg, var(--color-primary-400), var(--color-primary-600))",
};

const heroSecondaryButtonHoverStyle = {
    ...heroSecondaryButtonStyle,
    background: "rgba(56, 189, 248, 0.05)",
};

/* ── Detail View Styles ────────────────────── */
const detailViewWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
};

const detailBodyStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
};

const detailParagraphStyle = {
    fontSize: "1.05rem",
    color: "var(--color-gray-700)",
    lineHeight: 1.8,
    margin: 0,
};

const DashboardFeatures = () => {
    const { isMobile, isTablet, width } = useResponsive();
    const [primaryButtonHovered, setPrimaryButtonHovered] = useState(false);
    const [secondaryButtonHovered, setSecondaryButtonHovered] = useState(false);
    const [cardHovered, setCardHovered] = useState(null);
    const [readMoreHovered, setReadMoreHovered] = useState({});
    const [activeFeature, setActiveFeature] = useState(null);
    const [backHovered, setBackHovered] = useState(false);
    const [detailButtonHovered, setDetailButtonHovered] = useState(false);

    const isExtraSmall = width < 400;

    const pageWrapperStyle = {
        minHeight: "100vh",
        padding: isExtraSmall ? "2rem 0.75rem 5rem" : isMobile ? "2rem 1.25rem 5rem" : "4.5rem 1.75rem 5rem",
        background: "var(--color-white)",
        color: "var(--color-gray-900)",
        overflowX: "hidden",
    };

    const containerStyle = {
        maxWidth: "1120px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? "2rem" : "3rem",
    };

    const heroSectionStyle = {
        display: "grid",
        gridTemplateColumns: isTablet ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
        gap: isMobile ? "2rem" : "2.75rem",
        alignItems: "stretch",
        background: "var(--panel-bg)",
        border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
        borderRadius: "1.5rem",
        padding: isMobile ? "1.75rem" : "2.75rem",
        boxShadow: "var(--shadow-lg)",
    };

    const heroTitleStyle = {
        fontSize: isExtraSmall ? "1.75rem" : isMobile ? "1.85rem" : "clamp(2rem, 4vw, 2.6rem)",
        fontWeight: 800,
        letterSpacing: "-0.04em",
        lineHeight: 1.15,
        color: "var(--color-gray-900)",
    };

    const highlightListStyle = {
        display: "grid",
        gridTemplateColumns: isExtraSmall ? "1fr" : "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "0.85rem",
    };

    const featuresGridStyle = {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "2rem",
    };

    const handleViewFeature = (feature) => {
        setActiveFeature(feature);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBack = () => {
        setActiveFeature(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (activeFeature) {
        const IconComponent = activeFeature.icon;
        return (
            <div style={pageWrapperStyle}>
                <div style={containerStyle}>
                    <div style={detailViewWrapperStyle}>
                        <button
                            onClick={handleBack}
                            onMouseEnter={() => setBackHovered(true)}
                            onMouseLeave={() => setBackHovered(false)}
                            style={backHovered ? { ...backButtonStyle, ...readMoreHoverStyle } : backButtonStyle}
                        >
                            <FaArrowLeft style={{
                                fontSize: "0.85rem",
                                transition: "transform 0.2s ease",
                                transform: backHovered ? "translateX(-4px)" : "translateX(0)"
                            }} />
                            Back to all features
                        </button>

                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                                <span style={cardBadgeStyle}>{activeFeature.category}</span>
                                <div style={cardIconWrapperStyle}>
                                    <IconComponent />
                                </div>
                            </div>
                            <h1 style={{
                                fontSize: isExtraSmall ? "1.5rem" : isMobile ? "1.75rem" : "2.2rem",
                                fontWeight: 800,
                                margin: 0
                            }}>
                                {activeFeature.title}
                            </h1>
                        </div>

                        <div style={{ ...detailBodyStyle, gap: isMobile ? "1rem" : "1.25rem" }}>
                            {activeFeature.fullDetails.map((paragraph, i) => (
                                <p key={i} style={{
                                    ...detailParagraphStyle,
                                    fontSize: isMobile ? "0.95rem" : "1.05rem",
                                    lineHeight: isMobile ? 1.7 : 1.8
                                }}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        <div style={{
                            borderTop: "1px solid color-mix(in srgb, var(--panel-bg) 88%, black 12%)",
                            paddingTop: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.25rem",
                        }}>
                            <h3 style={{
                                fontSize: isMobile ? "1.05rem" : "1.1rem",
                                fontWeight: 700,
                                color: "var(--color-gray-700)",
                                margin: 0,
                            }}>
                                Explore more capabilities
                            </h3>
                            <button
                                onClick={handleBack}
                                onMouseEnter={() => setDetailButtonHovered(true)}
                                onMouseLeave={() => setDetailButtonHovered(false)}
                                style={{
                                    ...(detailButtonHovered ? heroPrimaryButtonHoverStyle : heroPrimaryButtonStyle),
                                    alignSelf: "flex-start",
                                    width: isExtraSmall ? "100%" : "auto",
                                    justifyContent: "center",
                                }}
                            >
                                <FaLightbulb style={{ fontSize: "0.9rem" }} />
                                View other features
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section style={pageWrapperStyle}>
            <div style={containerStyle}>
                <section style={heroSectionStyle}>
                    <div style={heroLeftColumnStyle}>
                        <div style={heroContentStyle}>
                            <span style={heroBadgeStyle}>
                                <FaTasks style={{ width: "1rem", height: "1rem" }} />
                                Features
                            </span>
                            <h1 style={heroTitleStyle}>Everything you need to stay in flow</h1>
                            <p style={heroSubtitleStyle}>
                                FocusFlow unites planning, focus, collaboration, and reflection so individuals and teams never lose momentum. Discover the features that adapt to your rituals and keep projects moving.
                            </p>
                        </div>
                        <div style={heroActionsStyle}>
                            <a
                                href="#features"
                                style={
                                    primaryButtonHovered
                                        ? heroPrimaryButtonHoverStyle
                                        : heroPrimaryButtonStyle
                                }
                                onMouseEnter={() => setPrimaryButtonHovered(true)}
                                onMouseLeave={() => setPrimaryButtonHovered(false)}
                            >
                                Explore capabilities
                            </a>
                            <a
                                href="#resources"
                                style={
                                    secondaryButtonHovered
                                        ? heroSecondaryButtonHoverStyle
                                        : heroSecondaryButtonStyle
                                }
                                onMouseEnter={() => setSecondaryButtonHovered(true)}
                                onMouseLeave={() => setSecondaryButtonHovered(false)}
                            >
                                See resources
                            </a>
                        </div>
                    </div>

                    <div style={heroRightColumnStyle}>
                        <div style={highlightPanelStyle}>
                            <div style={sectionHeaderStyle}>
                                <span style={heroBadgeStyle}>
                                    <FaChartBar style={{ width: "1rem", height: "1rem" }} />
                                    Feature Focus
                                </span>
                                <h2 style={sectionTitleStyle}>Built for real workflows</h2>
                            </div>
                            <div style={highlightListStyle}>
                                {adoptionSignals.map((item) => (
                                    <div key={item} style={highlightChipStyle}>
                                        <FaCheckCircle style={highlightStatValueStyle} />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" style={sectionWrapperStyle}>
                    <div style={sectionHeaderStyle}>
                        <span style={heroBadgeStyle}>Capabilities</span>
                        <h2 style={sectionTitleStyle}>FocusFlow features that power progress</h2>
                    </div>
                    <div style={featuresGridStyle}>
                        {features.map((feature) => {
                            const IconComponent = feature.icon;
                            const isHovered = cardHovered === feature.title;

                            return (
                                <div
                                    key={feature.title}
                                    onClick={() => handleViewFeature(feature)}
                                    style={
                                        isHovered
                                            ? { ...featureCardStyle, ...featureCardHoverStyle }
                                            : featureCardStyle
                                    }
                                    onMouseEnter={() => setCardHovered(feature.title)}
                                    onMouseLeave={() => setCardHovered(null)}
                                >
                                    <div style={cardHeaderStyle}>
                                        <div style={cardIconWrapperStyle}>
                                            <IconComponent />
                                        </div>
                                        <div style={cardBadgeStyle}>{feature.category}</div>
                                    </div>
                                    <div style={cardContentStyle}>
                                        <h3 style={cardTitleStyle}>{feature.title}</h3>
                                        <p style={cardDescriptionStyle}>{feature.description}</p>
                                        <div style={cardFooterStyle}>
                                            <span style={cardBenefitStyle}>{feature.benefit}</span>
                                            <button
                                                onMouseEnter={() =>
                                                    setReadMoreHovered((prev) => ({
                                                        ...prev,
                                                        [feature.title]: true,
                                                    }))
                                                }
                                                onMouseLeave={() =>
                                                    setReadMoreHovered((prev) => ({
                                                        ...prev,
                                                        [feature.title]: false,
                                                    }))
                                                }
                                                style={
                                                    readMoreHovered[feature.title]
                                                        ? { ...readMoreStyle, ...readMoreHoverStyle }
                                                        : readMoreStyle
                                                }
                                            >
                                                Learn more
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    style={{
                                                        transition: "transform 0.2s ease",
                                                        transform: readMoreHovered[feature.title] ? "translateX(4px)" : "translateX(0)"
                                                    }}
                                                >
                                                    <path d="M5 12h14m-7-7 7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section id="resources" style={sectionWrapperStyle}>
                    {/* Resources section remains same but could be linked if needed */}
                </section>
            </div>
        </section>
    );
};

export default DashboardFeatures;
