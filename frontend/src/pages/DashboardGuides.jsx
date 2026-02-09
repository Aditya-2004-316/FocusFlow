import React, { useMemo, useState } from "react";
import useResponsive from "../hooks/useResponsive";
import { FaCompass, FaLightbulb, FaUsers, FaCheckCircle, FaBookOpen } from "react-icons/fa";

const guides = [
    {
        title: "Getting Started with FocusFlow",
        summary: "A step-by-step guide to set up your workspace and start focusing.",
        level: "Beginner",
        icon: <FaCompass />,
    },
    {
        title: "Advanced Task Management",
        summary: "Tips and tricks for organizing complex projects and workflows.",
        level: "Intermediate",
        icon: <FaLightbulb />,
    },
    {
        title: "Collaboration Features",
        summary: "How to invite teammates, assign tasks, and work together.",
        level: "All Levels",
        icon: <FaUsers />,
    },
];

const guideHighlights = [
    "Quick wins for every role",
    "Templates to jump-start focus",
    "Team collaboration workflows",
    "Advanced automation tips",
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

const guideCardStyle = {
    background: "var(--panel-bg)",
    border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
    borderRadius: "1rem",
    overflow: "hidden",
    boxShadow: "var(--shadow-soft)",
    display: "flex",
    flexDirection: "column",
};

const guideHeaderStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.85rem",
    padding: "1.5rem 1.75rem 0.85rem",
};

const guideIconStyle = {
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

const guideContentStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    padding: "0 1.75rem 1.75rem",
    flex: 1,
};

const guideTitleStyle = {
    fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)",
    fontWeight: 700,
    color: "var(--color-primary-700)",
    margin: 0,
    letterSpacing: "-0.3px",
};

const guideSummaryStyle = {
    fontSize: "1rem",
    color: "var(--color-gray-600)",
    lineHeight: 1.6,
    margin: 0,
};

const levelTagStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    fontSize: "0.85rem",
    fontWeight: 500,
    color: "var(--color-primary-600)",
    background: "rgba(56, 189, 248, 0.12)",
    borderRadius: "999px",
    padding: "0.35rem 0.85rem",
    width: "fit-content",
};

const guideFooterStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem",
    marginTop: "1.25rem",
    paddingTop: "1rem",
    borderTop: "1px solid var(--input-border)",
    flexWrap: "wrap",
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

const DashboardGuides = () => {
    const { isMobile, isTablet, width } = useResponsive();
    const [primaryButtonHovered, setPrimaryButtonHovered] = useState(false);
    const [secondaryButtonHovered, setSecondaryButtonHovered] = useState(false);
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

    const guidesGridStyle = {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "2rem",
    };

    return (
        <section style={pageWrapperStyle}>
            <div style={containerStyle}>
                <section style={heroSectionStyle}>
                    <div style={heroLeftColumnStyle}>
                        <div style={heroContentStyle}>
                            <span style={heroBadgeStyle}>
                                <FaCompass style={{ width: "1rem", height: "1rem" }} />
                                Guides & Tutorials
                            </span>
                            <h1 style={heroTitleStyle}>Master FocusFlow Faster</h1>
                            <p style={heroSubtitleStyle}>
                                Guided walkthroughs, expert workflows, and team playbooks to help
                                individuals and teams adopt FocusFlow with confidence and speed.
                                Explore curated learning paths or dive straight into advanced tips.
                            </p>
                        </div>
                        <div style={heroActionsStyle}>
                            <a
                                href="#guides"
                                style={
                                    primaryButtonHovered
                                        ? heroPrimaryButtonHoverStyle
                                        : heroPrimaryButtonStyle
                                }
                                onMouseEnter={() => setPrimaryButtonHovered(true)}
                                onMouseLeave={() => setPrimaryButtonHovered(false)}
                            >
                                Browse Guides
                            </a>
                            <a
                                href="#levels"
                                style={
                                    secondaryButtonHovered
                                        ? heroSecondaryButtonHoverStyle
                                        : heroSecondaryButtonStyle
                                }
                                onMouseEnter={() => setSecondaryButtonHovered(true)}
                                onMouseLeave={() => setSecondaryButtonHovered(false)}
                            >
                                Explore Learning Paths
                            </a>
                        </div>
                    </div>

                    <div style={heroRightColumnStyle}>
                        <div style={highlightPanelStyle}>
                            <div style={sectionHeaderStyle}>
                                <span style={heroBadgeStyle}>
                                    <FaLightbulb style={{ width: "1rem", height: "1rem" }} />
                                    What you get
                                </span>
                                <h2 style={sectionTitleStyle}>Inside each guide</h2>
                            </div>
                            <div style={highlightListStyle}>
                                {guideHighlights.map((item) => (
                                    <div key={item} style={highlightChipStyle}>
                                        <FaCheckCircle style={highlightStatValueStyle} />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section id="guides" style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                    <div style={sectionHeaderStyle}>
                        <span style={heroBadgeStyle}>
                            <FaBookOpen style={{ width: "1rem", height: "1rem" }} />
                            Featured Guides
                        </span>
                        <h2 style={sectionTitleStyle}>Choose your next step</h2>
                    </div>
                    <div style={guidesGridStyle}>
                        {guides.map((guide) => (
                            <div key={guide.title} style={guideCardStyle}>
                                <div style={guideHeaderStyle}>
                                    <div style={guideIconStyle}>{guide.icon}</div>
                                    <div style={levelTagStyle}>{guide.level}</div>
                                </div>
                                <div style={guideContentStyle}>
                                    <h3 style={guideTitleStyle}>{guide.title}</h3>
                                    <p style={guideSummaryStyle}>{guide.summary}</p>
                                    <div style={guideFooterStyle}>
                                        <span style={{ ...levelTagStyle, margin: 0 }}>
                                            Actionable steps included
                                        </span>
                                        <a
                                            href="#"
                                            style={
                                                readMoreHovered[guide.title]
                                                    ? readMoreHoverStyle
                                                    : readMoreStyle
                                            }
                                            onMouseEnter={() =>
                                                setReadMoreHovered({
                                                    ...readMoreHovered,
                                                    [guide.title]: true,
                                                })
                                            }
                                            onMouseLeave={() =>
                                                setReadMoreHovered({
                                                    ...readMoreHovered,
                                                    [guide.title]: false,
                                                })
                                            }
                                        >
                                            View Guide
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
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    );
};

export default DashboardGuides;
