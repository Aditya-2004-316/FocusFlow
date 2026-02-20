import React, { useMemo, useState } from "react";
import useResponsive from "../hooks/useResponsive";
import {
    FaCookieBite,
    FaShieldAlt,
    FaSyncAlt,
    FaRegClock,
    FaCheckCircle,
    FaLightbulb,
    FaLayerGroup,
    FaSlidersH,
    FaClipboardList,
    FaCogs,
    FaArrowLeft,
    FaArrowRight,
} from "react-icons/fa";

const cookieHighlights = [
    "Essential cookies keep sessions secure",
    "Performance insights stay anonymous",
    "Preferences stay on your device",
    "Transparency across every browser",
];

const cookieSections = [
    {
        badge: "Essentials",
        title: "Cookies that keep FocusFlow running",
        summary: "Authentication, session continuity, and security posture rely on these cookies.",
        icon: <FaShieldAlt />,
        meta: "Required for login",
        fullDetails: [
            "Essential cookies are strictly necessary to provide you with the services available through our Website and to use some of its features, such as access to secure areas.",
            "Authentication: When you log in to FocusFlow, we use cookies to remember who you are. This ensures that your focus sessions, task lists, and team collaborations are private and accessible only to you.",
            "Security: These cookies help us identify and prevent potential security risks. For example, we use them to detect rapid, repetitive failed login attempts or to protect your data from cross-site request forgery.",
            "Session Continuity: If you refresh your browser or accidentally close a tab during a focus timer, essential cookies allow the app to resume exactly where you left off, preventing loss of progress.",
            "Because these cookies are strictly necessary to deliver the Website, you cannot refuse them without impacting how our Website functions."
        ]
    },
    {
        badge: "Performance",
        title: "Cookies that improve focus insights",
        summary: "Optional analytics cookies help us understand which features boost productivity.",
        icon: <FaRegClock />,
        meta: "Opt-in analytics",
        fullDetails: [
            "Performance and analytics cookies allow us to count visits and traffic sources so we can measure and improve the performance of our app.",
            "Feature Optimization: We track which features are used most frequently—like the 'Distraction Log' or 'Team Sync'. This helps us decide where to focus our development efforts to provide the most value to you.",
            "Anonymous Tracking: All information these cookies collect is aggregated and therefore anonymous. We do not track individual users; we track how the app is used as a whole.",
            "Error Reporting: If a feature crashes or lags, these cookies help us identify the technical environment where the issue occurred, allowing us to fix bugs faster for everyone.",
            "Disabling these cookies means we won't know when you've visited our site, and we won't be able to monitor its performance to ensure a smooth experience."
        ]
    },
    {
        badge: "Preferences",
        title: "Cookies that personalize your workspace",
        summary: "Timer defaults, theme preferences, and layout visibility remain consistent.",
        icon: <FaSyncAlt />,
        meta: "For convenience",
        fullDetails: [
            "Functional cookies enable the Website to provide enhanced functionality and personalization for your specific workflow habits.",
            "Workspace Customization: These cookies remember if you prefer the 'List' view or the 'Kanban' view, as well as your custom board layouts and sidebar width.",
            "Theme Persistence: Whether you prefer the sleek 'Dark Mode' or the vibrant 'Glassmorphism' effect, these cookies ensure that FocusFlow looks exactly how you left it every time you return.",
            "Timer Presets: If you've created a custom 50/10 focus interval, we store those settings locally so you don't have to reconfigure your timer for every session.",
            "If you do not allow these cookies, then some or all of these services may not function properly, and you'll return to the default settings on every visit."
        ]
    },
    {
        badge: "Community",
        title: "Cookies that power experiments",
        summary: "Early trials for new focus tools use small cookies to stabilize betas.",
        icon: <FaCheckCircle />,
        meta: "Pilot programs",
        fullDetails: [
            "We are constantly building new ways to help you focus. Community cookies allow us to test early-stage features with small groups of users before a global release.",
            "A/B Testing: We might show two different versions of a new analytics chart to see which one provides clearer insights. These cookies ensure that you have a consistent experience throughout the experiment.",
            "Beta Stability: For users who have opted into our 'FocusFlow Labs' program, these cookies track the reliability of experimental tools so we can identify edge cases.",
            "Feedback Loops: They help us connect your anonymized usage data with any feedback you submit, giving us a clearer picture of how to improve labs features.",
            "Community cookies are entirely optional and are only active for users who have participated in or been selected for specific feature trials."
        ]
    },
];

const controlChecklist = [
    "Manage consent per category in settings",
    "Clear cookies from your browser at any time",
    "Contact us for enterprise processing",
    "Review retention timeline for every type",
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

const heroPrimaryButtonHoverStyle = {
    ...heroPrimaryButtonStyle,
    transform: "scale(1.02)",
    background: "linear-gradient(135deg, var(--color-primary-400), var(--color-primary-600))",
};

const heroSecondaryButtonHoverStyle = {
    ...heroSecondaryButtonStyle,
    background: "rgba(56, 189, 248, 0.05)",
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

const cardStyle = {
    background: "var(--panel-bg)",
    border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
    borderColor: "color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
    borderRadius: "1.25rem",
    padding: "1.75rem",
    boxShadow: "var(--shadow-soft)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
};

const cardHoverStyle = {
    transform: "translateY(-6px)",
    boxShadow: "0 20px 32px rgba(15, 118, 110, 0.18)",
    borderColor: "var(--color-primary-300)",
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
    width: "fit-content"
};

const cardTitleStyle = {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "var(--color-primary-700)",
    margin: 0,
};

const summaryStyle = {
    color: "var(--color-gray-600)",
    fontSize: "1rem",
    lineHeight: 1.6,
    margin: 0,
};

const readMoreStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "var(--color-primary-600)",
    fontSize: "0.9rem",
    fontWeight: 600,
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
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

/* ── Detail View Styles ────────────────────── */
const detailViewWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
};

const detailBodyStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
};

const detailParagraphStyle = {
    fontSize: "1.05rem",
    color: "var(--color-gray-700)",
    lineHeight: 1.8,
    margin: 0,
};

const DashboardCookies = () => {
    const { isMobile, isTablet, width } = useResponsive();
    const [cardHovered, setCardHovered] = useState(null);
    const [readMoreHovered, setReadMoreHovered] = useState({});
    const [activeSection, setActiveSection] = useState(null);
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

    const handleViewSection = (section) => {
        setActiveSection(section);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBack = () => {
        setActiveSection(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (activeSection) {
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
                            Back to cookie policy
                        </button>

                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <span style={cardBadgeStyle}>{activeSection.badge}</span>
                                <div style={{ color: "var(--color-primary-600)", fontSize: "1.5rem" }}>
                                    {activeSection.icon}
                                </div>
                            </div>
                            <h1 style={{
                                fontSize: isExtraSmall ? "1.5rem" : isMobile ? "1.75rem" : "2.2rem",
                                fontWeight: 800,
                                margin: 0
                            }}>
                                {activeSection.title}
                            </h1>
                        </div>

                        <div style={detailBodyStyle}>
                            {activeSection.fullDetails.map((paragraph, i) => (
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
                                Review other categories
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
                                <FaLayerGroup style={{ fontSize: "0.9rem" }} />
                                View all cookies
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
                <section style={{
                    display: "grid",
                    gridTemplateColumns: isTablet ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: isMobile ? "2rem" : "2.75rem",
                    alignItems: "stretch",
                    background: "var(--panel-bg)",
                    border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
                    borderRadius: "1.5rem",
                    padding: isMobile ? "1.75rem" : "2.75rem",
                    boxShadow: "var(--shadow-lg)",
                }}>
                    <div style={heroLeftColumnStyle}>
                        <div style={heroContentStyle}>
                            <span style={heroBadgeStyle}>
                                <FaCookieBite style={{ width: "1rem", height: "1rem" }} />
                                Cookies
                            </span>
                            <h1 style={{
                                fontSize: isExtraSmall ? "1.75rem" : isMobile ? "1.85rem" : "clamp(2rem, 4vw, 2.6rem)",
                                fontWeight: 800,
                                letterSpacing: "-0.04em",
                                lineHeight: 1.15,
                                color: "var(--color-gray-900)",
                            }}>How FocusFlow uses cookies</h1>
                            <p style={heroSubtitleStyle}>
                                Cookies help us safeguard your sessions, surface productivity insights, and remember the work habits you rely on. Explore what every category does and how to control it.
                            </p>
                        </div>
                        <div style={heroActionsStyle}>
                            <a
                                href="#categories"
                                style={
                                    cardHovered === "categories"
                                        ? heroPrimaryButtonHoverStyle
                                        : heroPrimaryButtonStyle
                                }
                                onMouseEnter={() => setCardHovered("categories")}
                                onMouseLeave={() => setCardHovered(null)}
                            >
                                Review cookie categories
                            </a>
                        </div>
                    </div>

                    <div style={heroRightColumnStyle}>
                        <div style={highlightPanelStyle}>
                            <div style={sectionHeaderStyle}>
                                <span style={heroBadgeStyle}>
                                    <FaCookieBite style={{ width: "1rem", height: "1rem" }} />
                                    Transparency
                                </span>
                                <h2 style={sectionTitleStyle}>Clear-cut privacy</h2>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.75rem" }}>
                                {cookieHighlights.map((item) => (
                                    <div key={item} style={highlightChipStyle}>
                                        <FaCheckCircle style={highlightStatValueStyle} />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section id="categories" style={sectionWrapperStyle}>
                    <div style={sectionHeaderStyle}>
                        <span style={heroBadgeStyle}>Categories</span>
                        <h2 style={sectionTitleStyle}>What each cookie type powers</h2>
                    </div>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: "2rem"
                    }}>
                        {cookieSections.map((section, idx) => (
                            <div
                                key={section.title}
                                onClick={() => handleViewSection(section)}
                                style={
                                    cardHovered === idx
                                        ? { ...cardStyle, ...cardHoverStyle }
                                        : cardStyle
                                }
                                onMouseEnter={() => setCardHovered(idx)}
                                onMouseLeave={() => setCardHovered(null)}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                                    <span style={cardBadgeStyle}>{section.badge}</span>
                                    <div style={{ color: "var(--color-primary-600)", fontSize: "1.25rem" }}>{section.icon}</div>
                                </div>
                                <h3 style={cardTitleStyle}>{section.title}</h3>
                                <p style={summaryStyle}>{section.summary}</p>
                                <button
                                    onMouseEnter={() => setReadMoreHovered({ ...readMoreHovered, [section.title]: true })}
                                    onMouseLeave={() => setReadMoreHovered({ ...readMoreHovered, [section.title]: false })}
                                    style={readMoreHovered[section.title] ? { ...readMoreStyle, ...readMoreHoverStyle } : readMoreStyle}
                                >
                                    Review this policy
                                    <FaArrowRight style={{
                                        fontSize: "0.8rem",
                                        transition: "transform 0.2s ease",
                                        transform: readMoreHovered[section.title] ? "translateX(4px)" : "translateX(0)"
                                    }} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    );
};

export default DashboardCookies;
