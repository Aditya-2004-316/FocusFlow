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
} from "react-icons/fa";

const features = [
    {
        title: "Advanced Task Management",
        description:
            "Create, organize, and prioritize unlimited tasks with tags, deadlines, and custom views that stay in sync across devices.",
        category: "Planning",
        benefit: "Capture everything in one workspace",
        icon: FaTasks,
    },
    {
        title: "Integrated Focus Timer",
        description:
            "Run Pomodoro, deep work, and custom focus intervals that automatically log progress and streaks.",
        category: "Focus",
        benefit: "Protect time for meaningful work",
        icon: FaClock,
    },
    {
        title: "Detailed Analytics",
        description:
            "Visualize productivity trends, goal progress, and time allocation through interactive dashboards.",
        category: "Insights",
        benefit: "Understand what moves the needle",
        icon: FaChartBar,
    },
    {
        title: "Collaboration Tools",
        description:
            "Invite teammates, co-manage projects, leave context-rich comments, and celebrate wins together.",
        category: "Teamwork",
        benefit: "Keep everyone aligned",
        icon: FaUsers,
    },
    {
        title: "Distraction Logging",
        description:
            "Capture interruptions, discover patterns, and receive personalized nudges to stay in flow longer.",
        category: "Clarity",
        benefit: "Transform distractions into insight",
        icon: FaBan,
    },
    {
        title: "Customizable Workspace",
        description:
            "Toggle between list, board, and calendar layouts. Personalize themes, widgets, and automation rules.",
        category: "Workspace",
        benefit: "Design a setup that matches you",
        icon: FaThLarge,
    },
    {
        title: "Resource Library",
        description:
            "Browse templates, playbooks, and expert advice curated for students, teams, and creators.",
        category: "Learning",
        benefit: "Level up with proven strategies",
        icon: FaBookOpen,
    },
    {
        title: "Priority Support",
        description:
            "Reach real humans via live chat, async tickets, or office hours. We respond within a day.",
        category: "Support",
        benefit: "Help the moment you need it",
        icon: FaHeadset,
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
};

const heroPrimaryButtonHoverStyle = {
    ...heroPrimaryButtonStyle,
    transform: "scale(1.05)",
    boxShadow: "0 20px 40px rgba(8, 145, 178, 0.4)",
    background: "linear-gradient(135deg, var(--color-primary-400), var(--color-primary-600))",
};

const heroSecondaryButtonHoverStyle = {
    ...heroSecondaryButtonStyle,
    background: "rgba(56, 189, 248, 0.1)",
    borderColor: "var(--color-primary-500)",
};

const heroRightColumnStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
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
    borderRadius: "1rem",
    overflow: "hidden",
    boxShadow: "var(--shadow-soft)",
    display: "flex",
    flexDirection: "column",
    textDecoration: "none",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
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
    borderRadius: "0.85rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(56, 189, 248, 0.12)",
    color: "var(--color-primary-600)",
    fontSize: "1.4rem",
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
    fontWeight: 500,
    textDecoration: "none",
};

const readMoreHoverStyle = {
    ...readMoreStyle,
    textDecoration: "underline",
    color: "var(--color-primary-700)",
};

const valuePanelTitleStyle = {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "var(--color-gray-900)",
    margin: 0,
};

const valueListStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
};

const valueItemStyle = {
    display: "flex",
    gap: "0.6rem",
    alignItems: "flex-start",
    color: "var(--color-gray-600)",
    lineHeight: 1.5,
    fontSize: "0.95rem",
};

const DashboardFeatures = () => {
    const { isMobile, isTablet, width } = useResponsive();
    const [primaryButtonHovered, setPrimaryButtonHovered] = useState(false);
    const [secondaryButtonHovered, setSecondaryButtonHovered] = useState(false);
    const [cardHovered, setCardHovered] = useState(null);
    const [readMoreHovered, setReadMoreHovered] = useState({});

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
        gap: isMobile ? "1rem" : "2rem",
    };

    const valuePanelsGridStyle = {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.5rem",
    };

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
                                <a
                                    key={feature.title}
                                    href="#resources"
                                    style={
                                        isHovered
                                            ? { ...featureCardStyle, ...featureCardHoverStyle }
                                            : featureCardStyle
                                    }
                                    onMouseEnter={() => setCardHovered(feature.title)}
                                    onMouseLeave={() => setCardHovered(null)}
                                    onFocus={() => setCardHovered(feature.title)}
                                    onBlur={() => setCardHovered(null)}
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
                                            <span
                                                style={
                                                    readMoreHovered[feature.title]
                                                        ? readMoreHoverStyle
                                                        : readMoreStyle
                                                }
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
                                            >
                                                Learn more
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M5 12h14" />
                                                    <path d="m12 5 7 7-7 7" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </section>

                <section id="resources" style={sectionWrapperStyle}>
                    <div style={sectionHeaderStyle}>
                        <span style={heroBadgeStyle}>Keep learning</span>
                        <h2 style={sectionTitleStyle}>Resources to unlock every feature</h2>
                    </div>
                    <div style={valuePanelsGridStyle}>
                        <div style={highlightPanelStyle}>
                            <span style={heroBadgeStyle}>Guides</span>
                            <h3 style={valuePanelTitleStyle}>Bring features to life</h3>
                            <div style={valueListStyle}>
                                {guideResources.map((item) => (
                                    <div key={item} style={valueItemStyle}>
                                        <FaBookOpen
                                            style={{
                                                width: "1rem",
                                                height: "1rem",
                                                color: "var(--color-primary-500)",
                                                marginTop: "0.15rem",
                                            }}
                                        />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={highlightPanelStyle}>
                            <span style={heroBadgeStyle}>Support</span>
                            <h3 style={valuePanelTitleStyle}>We're here to help</h3>
                            <div style={valueListStyle}>
                                {supportPaths.map((item) => (
                                    <div key={item} style={valueItemStyle}>
                                        <FaComments
                                            style={{
                                                width: "1rem",
                                                height: "1rem",
                                                color: "var(--color-primary-500)",
                                                marginTop: "0.15rem",
                                            }}
                                        />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={highlightPanelStyle}>
                            <span style={heroBadgeStyle}>Quick start</span>
                            <h3 style={valuePanelTitleStyle}>Launch your workspace</h3>
                            <div style={valueListStyle}>
                                {quickStart.map((item) => (
                                    <div key={item} style={valueItemStyle}>
                                        <FaLightbulb
                                            style={{
                                                width: "1rem",
                                                height: "1rem",
                                                color: "var(--color-primary-500)",
                                                marginTop: "0.15rem",
                                            }}
                                        />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default DashboardFeatures;
