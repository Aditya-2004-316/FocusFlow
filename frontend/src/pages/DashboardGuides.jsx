import React, { useMemo, useState } from "react";
import useResponsive from "../hooks/useResponsive";
import { FaCompass, FaLightbulb, FaUsers, FaCheckCircle, FaBookOpen, FaArrowLeft } from "react-icons/fa";

const guides = [
    {
        title: "Getting Started with FocusFlow",
        summary: "A step-by-step guide to set up your workspace and start focusing.",
        level: "Beginner",
        icon: <FaCompass />,
        content: [
            "Welcome to FocusFlow! This guide will help you set up your ideal focus environment in less than five minutes. Our goal is to reduce the friction between deciding to work and actually getting started.",
            "Step 1: Define Your Workspace. Whether you work at a desk, a kitchen table, or a library, consistency is key. Set up your FocusFlow dashboard to reflect your primary work hours. You can adjust these in the Settings tab to ensure your analytics accurately reflect your intentions.",
            "Step 2: Create Your First Task. Don't aim for a finished product yet. Just capture one concrete, actionable item. Use our 'Quick Add' feature to drop it into your Inbox. Add a 'Focus' tag and set a priority level so the app knows what to surface during your sessions.",
            "Step 3: Start Your First Session. Navigate to the Timer. We recommend the 25/5 Pomodoro preset for your first day. Press start, and let FocusFlow handle the notifications. If you get distracted, use the 'Log Distraction' button—this data is gold for your weekly review.",
            "Step 4: Review Your Momentum. After your session, check the Analytics tab. You'll see your 'Focus Score' and a breakdown of your most productive periods. Over time, these patterns will help you schedule your most demanding tasks during your natural peak energy hours.",
            "Remember: the best system is the one you actually use. Start small, be consistent, and let FocusFlow grow with your focus capacity."
        ]
    },
    {
        title: "Advanced Task Management",
        summary: "Tips and tricks for organizing complex projects and workflows.",
        level: "Intermediate",
        icon: <FaLightbulb />,
        content: [
            "Once you've mastered the basics, it's time to leverage FocusFlow's advanced organization features. Intermediate users often find that their lists grow too large to manage—this guide solves that through intelligent filtering and project nesting.",
            "Utilize Project Nesting. Instead of a flat list of 50 tasks, create a Master Project. Inside, use Task Grouping to separate 'Planning', 'Execution', and 'Review' phases. This keeps your interface clean and reduces the cognitive load of seeing everything at once.",
            "Master the Tagging System. Tags are more than just labels; they are cross-project filters. Use tags for 'Context' (e.g., @computer, @calls, @errands) and 'Energy Required' (e.g., #deepwork, #admin, #outsource). When you have a natural energy dip at 3 PM, filter for #admin and clear out the low-stakes items.",
            "Set Smart Deadlines. FocusFlow distinguishes between 'Due Dates' (the hard deadline) and 'Start Dates' (when the task should appear in your 'Next' list). Setting start dates prevents your 'Focus' view from becoming cluttered with tasks you can't work on yet.",
            "Use Custom Views. Did you know you can save your favorite filter combinations? If you always check for High Priority + Deep Work tasks in the morning, save that as a 'Morning Focus' view for one-click access.",
            "By organizing your work with these advanced structures, you transform FocusFlow from a simple to-do list into a powerful external brain that tells you exactly what to do based on your current context and energy."
        ]
    },
    {
        title: "Collaboration Features",
        summary: "How to invite teammates, assign tasks, and work together.",
        level: "All Levels",
        icon: <FaUsers />,
        content: [
            "FocusFlow isn't just for solo productive work; it's designed to keep teams in sync without the noise of traditional messaging apps. This guide covers the essential tools for collaborative momentum.",
            "Sharing a Workspace. Navigate to the 'Team' tab and invite members via email. You can assign roles: 'Creator' (full control), 'Editor' (manage tasks), or 'Viewer' (track progress only). Shared workspaces allow everyone to see the project's pulse in real-time.",
            "Async Task Handoffs. When you finish a task that someone else needs to review, don't ping them on Slack. Simply reassign the task and add a context-rich comment. They'll receive an at-a-glance notification in their own FocusFlow dashboard when they begin their next session.",
            "Shared Pomodoro Sessions. For remote teams, we offer 'Company Focus Blocks'. You can start a synced timer that shows who else is currently in 'Deep Work' mode. It's a powerful way to build collective accountability without the pressure of a live video call.",
            "Utilizing Comments for Context. Avoid 'status update' meetings by using the task comment thread. Attach files, link to other FocusFlow tasks, and leave 'future-self' notes. This creates a searchable history of exactly how decisions were made.",
            "Collaborating in FocusFlow means less talking about work and more actually doing it. By keeping the context inside the tool, your team spends more time in flow and less time in meetings."
        ]
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
    borderColor: "color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
    borderRadius: "1rem",
    overflow: "hidden",
    boxShadow: "var(--shadow-soft)",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
    transform: "translateY(0)",
};

const guideCardHoverStyle = {
    transform: "translateY(-6px)",
    boxShadow: "0 20px 32px rgba(15, 118, 110, 0.18)",
    borderColor: "var(--color-primary-300)",
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

/* ── Article View Styles ────────────────────── */
const articleViewWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
};

const articleBodyStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
};

const articleParagraphStyle = {
    fontSize: "1.05rem",
    color: "var(--color-gray-700)",
    lineHeight: 1.8,
    margin: 0,
};

const DashboardGuides = () => {
    const { isMobile, isTablet, width } = useResponsive();
    const [primaryButtonHovered, setPrimaryButtonHovered] = useState(false);
    const [secondaryButtonHovered, setSecondaryButtonHovered] = useState(false);
    const [readMoreHovered, setReadMoreHovered] = useState({});
    const [cardHovered, setCardHovered] = useState(null);
    const [activeGuide, setActiveGuide] = useState(null);
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

    const guidesGridStyle = {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "2rem",
    };

    const handleViewGuide = (guide) => {
        setActiveGuide(guide);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBack = () => {
        setActiveGuide(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (activeGuide) {
        return (
            <div style={pageWrapperStyle}>
                <div style={containerStyle}>
                    <div style={articleViewWrapperStyle}>
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
                            Back to all guides
                        </button>

                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                                <span style={{
                                    ...levelTagStyle,
                                    background: "rgba(56, 189, 248, 0.12)",
                                    padding: "0.3rem 0.75rem",
                                    borderRadius: "999px",
                                    fontSize: isMobile ? "0.7rem" : "0.75rem",
                                }}>
                                    {activeGuide.level}
                                </span>
                                <div style={{
                                    ...guideIconStyle,
                                    width: "2rem",
                                    height: "2rem",
                                    fontSize: "1rem",
                                    borderRadius: "0.5rem"
                                }}>
                                    {activeGuide.icon}
                                </div>
                            </div>
                            <h1 style={{
                                fontSize: isExtraSmall ? "1.5rem" : isMobile ? "1.75rem" : "2.2rem",
                                fontWeight: 800,
                                margin: 0
                            }}>
                                {activeGuide.title}
                            </h1>
                        </div>

                        <div style={{ ...articleBodyStyle, gap: isMobile ? "1rem" : "1.25rem" }}>
                            {activeGuide.content.map((paragraph, i) => (
                                <p key={i} style={{
                                    ...articleParagraphStyle,
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
                                Ready to master more?
                            </h3>
                            <p style={{
                                fontSize: isMobile ? "0.9rem" : "0.95rem",
                                color: "var(--color-gray-500)",
                                lineHeight: 1.6,
                                margin: 0,
                            }}>
                                Check out our other educational resources and playbooks to further optimize your FocusFlow experience.
                            </p>
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
                                <FaBookOpen style={{ fontSize: "0.9rem" }} />
                                Browse more guides
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
                            <div
                                key={guide.title}
                                style={
                                    cardHovered === guide.title
                                        ? { ...guideCardStyle, ...guideCardHoverStyle }
                                        : guideCardStyle
                                }
                                onMouseEnter={() => setCardHovered(guide.title)}
                                onMouseLeave={() => setCardHovered(null)}
                            >
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
                                        <button
                                            onClick={() => handleViewGuide(guide)}
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
                                            style={
                                                readMoreHovered[guide.title]
                                                    ? { ...readMoreStyle, ...readMoreHoverStyle }
                                                    : readMoreStyle
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
                                                style={{
                                                    transition: "transform 0.2s ease",
                                                    transform: readMoreHovered[guide.title] ? "translateX(4px)" : "translateX(0)"
                                                }}
                                            >
                                                <path d="M5 12h14" />
                                                <path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </button>
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
