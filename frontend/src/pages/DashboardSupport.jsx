import React, { useMemo, useState } from "react";
import useResponsive from "../hooks/useResponsive";
import { FaEnvelope, FaQuestionCircle, FaUsers, FaClock, FaCheckCircle, FaHeadset } from "react-icons/fa";

const supportOptions = [
    {
        title: "Contact Support",
        description:
            "Reach out to our team for personalized help with your account or features.",
        link: "mailto:support@focusflow.com",
        icon: <FaEnvelope />,
        responseTime: "Under 12 hours",
    },
    {
        title: "Help Center",
        description: "Browse FAQs, guides, and troubleshooting tips.",
        link: "/dashboard/guides",
        icon: <FaQuestionCircle />,
        responseTime: "Self-serve",
    },
    {
        title: "Community Forum",
        description: "Ask questions, share tips, and connect with other users.",
        link: "/dashboard/community",
        icon: <FaUsers />,
        responseTime: "Real-time peers",
    },
];

const supportHighlights = [
    "Live product walkthroughs",
    "Weekly office hours",
    "Status page updates",
    "Priority response for teams",
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

const supportCardStyle = {
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
};

const supportCardHoverStyle = {
    transform: "translateY(-6px)",
    boxShadow: "0 20px 32px rgba(15, 118, 110, 0.18)",
    borderColor: "var(--color-primary-300)",
};

const supportHeaderStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.85rem",
    padding: "1.5rem 1.75rem 0.85rem",
};

const supportIconStyle = {
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

const supportContentStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    padding: "0 1.75rem 1.75rem",
    flex: 1,
};

const supportTitleStyle = {
    fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)",
    fontWeight: 700,
    color: "var(--color-primary-700)",
    margin: 0,
    letterSpacing: "-0.3px",
};

const supportDescStyle = {
    fontSize: "1rem",
    color: "var(--color-gray-600)",
    lineHeight: 1.6,
    margin: 0,
};

const supportFooterStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem",
    marginTop: "1.25rem",
    paddingTop: "1rem",
    borderTop: "1px solid var(--input-border)",
    flexWrap: "wrap",
};

const responseTagStyle = {
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

const DashboardSupport = () => {
    const { isMobile, isTablet, width } = useResponsive();
    const [primaryButtonHovered, setPrimaryButtonHovered] = useState(false);
    const [secondaryButtonHovered, setSecondaryButtonHovered] = useState(false);
    const [cardHovered, setCardHovered] = useState(null);

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

    const supportGridStyle = {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "2rem",
    };

    const responseLabels = useMemo(
        () => Array.from(new Set(supportOptions.map((item) => item.responseTime))),
        []
    );

    return (
        <section style={pageWrapperStyle}>
            <div style={containerStyle}>
                <section style={heroSectionStyle}>
                    <div style={heroLeftColumnStyle}>
                        <div style={heroContentStyle}>
                            <span style={heroBadgeStyle}>
                                <FaEnvelope style={{ width: "1rem", height: "1rem" }} />
                                Support Resources
                            </span>
                            <h1 style={heroTitleStyle}>Get help in moments</h1>
                            <p style={heroSubtitleStyle}>
                                Find the best way to reach our team, troubleshoot issues, or tap into
                                the FocusFlow community. Whether you prefer guided resources or direct support,
                                we've got you covered with fast, reliable responses.
                            </p>
                        </div>
                        <div style={heroActionsStyle}>
                            <a
                                href="#support"
                                style={
                                    primaryButtonHovered
                                        ? heroPrimaryButtonHoverStyle
                                        : heroPrimaryButtonStyle
                                }
                                onMouseEnter={() => setPrimaryButtonHovered(true)}
                                onMouseLeave={() => setPrimaryButtonHovered(false)}
                            >
                                View Support Options
                            </a>
                            <a
                                href="#highlights"
                                style={
                                    secondaryButtonHovered
                                        ? heroSecondaryButtonHoverStyle
                                        : heroSecondaryButtonStyle
                                }
                                onMouseEnter={() => setSecondaryButtonHovered(true)}
                                onMouseLeave={() => setSecondaryButtonHovered(false)}
                            >
                                Check Service Status
                            </a>
                        </div>
                    </div>

                    <div style={heroRightColumnStyle}>
                        <div style={highlightPanelStyle} id="highlights">
                            <div style={sectionHeaderStyle}>
                                <span style={heroBadgeStyle}>
                                    <FaClock style={{ width: "1rem", height: "1rem" }} />
                                    Response times
                                </span>
                                <h2 style={sectionTitleStyle}>Know what to expect</h2>
                            </div>
                            <div style={highlightListStyle}>
                                {responseLabels.map((label) => (
                                    <div key={label} style={highlightChipStyle}>
                                        <FaCheckCircle style={highlightStatValueStyle} />
                                        <span>{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section id="support" style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                    <div style={sectionHeaderStyle}>
                        <span style={heroBadgeStyle}>
                            <FaHeadset style={{ width: "1rem", height: "1rem" }} />
                            Choose a channel
                        </span>
                        <h2 style={sectionTitleStyle}>Find the right support path</h2>
                    </div>
                    <div style={supportGridStyle}>
                        {supportOptions.map((option, idx) => (
                            <a
                                key={option.title}
                                href={option.link}
                                style={
                                    cardHovered === idx
                                        ? { ...supportCardStyle, ...supportCardHoverStyle }
                                        : supportCardStyle
                                }
                                onMouseEnter={() => setCardHovered(idx)}
                                onMouseLeave={() => setCardHovered(null)}
                            >
                                <div style={supportHeaderStyle}>
                                    <div style={supportIconStyle}>{option.icon}</div>
                                    <div style={responseTagStyle}>{option.responseTime}</div>
                                </div>
                                <div style={supportContentStyle}>
                                    <h3 style={supportTitleStyle}>{option.title}</h3>
                                    <p style={supportDescStyle}>{option.description}</p>
                                    <div style={supportFooterStyle}>
                                        <span style={{ ...responseTagStyle, margin: 0 }}>
                                            {option.responseTime}
                                        </span>
                                        <span style={readMoreStyle}>
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
                        ))}
                    </div>
                </section>
            </div>
        </section>
    );
};

export default DashboardSupport;
