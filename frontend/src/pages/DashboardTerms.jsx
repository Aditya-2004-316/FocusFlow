import React, { useMemo, useState } from "react";
import useResponsive from "../hooks/useResponsive";
import {
    FaFileContract,
    FaHandshake,
    FaBolt,
    FaUserShield,
    FaClock,
    FaLightbulb,
    FaCheckCircle,
    FaClipboardCheck,
    FaHeadset,
    FaComments,
} from "react-icons/fa";

const termsHighlights = [
    "No hidden fees or usage caps",
    "Built for collaborative teams",
    "Respectful conduct is required",
    "Transparent change history",
];

const termsPromises = [
    "Plain-language agreements",
    "Student-friendly policies",
    "Global compliance minded",
    "Feedback welcome",
];

const obligationAreas = [
    {
        badge: "Usage",
        title: "Responsible use of FocusFlow",
        summary:
            "We expect everyone to foster productive, respectful workplaces while using our tools.",
        detail:
            "Maintain a safe, inclusive environment. Keep credentials private and avoid harmful or unlawful activities on the platform.",
        meta: "Applies to every workspace",
        icon: <FaHandshake />,
        linkLabel: "Review usage guidelines",
        link: "#",
    },
    {
        badge: "Content",
        title: "Ownership & submissions",
        summary:
            "You own the content you create. We only use it to run the service you requested.",
        detail:
            "Remove content that violates laws or rights. We may remove content that disrupts FocusFlow or other users.",
        meta: "Creators keep their IP",
        icon: <FaUserShield />,
        linkLabel: "Protect your content",
        link: "#",
    },
    {
        badge: "Availability",
        title: "Service levels & maintenance",
        summary:
            "We target 99% uptime and give you heads-up when rolling out major updates.",
        detail:
            "Some maintenance windows are inevitable. We'll communicate broadly and keep logs of any widespread disruptions.",
        meta: "Operational transparency",
        icon: <FaClock />,
        linkLabel: "View status cadence",
        link: "#",
    },
    {
        badge: "Changes",
        title: "When terms evolve",
        summary:
            "We revise terms when laws shift or new features demand clarity. You'll always hear from us first.",
        detail:
            "Important changes arrive via email and in-app banners. Keep using FocusFlow and you agree to the latest version.",
        meta: "Advance notice given",
        icon: <FaBolt />,
        linkLabel: "Track updates",
        link: "#",
    },
];

const supportChannels = [
    "Dedicated legal inbox with 1-2 day response",
    "Office hours for educators and student leads",
    "Escalation path for urgent compliance",
    "Change-log archive for every revision",
];

const summaryPoints = [
    "Terms apply across web and mobile",
    "Education partners receive tailored addendums",
    "We prioritize mediated resolutions",
    "Policy updates informed by community feedback",
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

const sectionWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.75rem",
};

const cardStyle = {
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

const cardHoverStyle = {
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

const cardIconStyle = {
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

const cardSummaryStyle = {
    fontSize: "1rem",
    color: "var(--color-gray-600)",
    lineHeight: 1.6,
    margin: 0,
};

const cardDetailStyle = {
    fontSize: "0.95rem",
    color: "var(--color-gray-500)",
    lineHeight: 1.6,
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

const cardMetaStyle = {
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

const DashboardTerms = () => {
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

    const cardsGridStyle = {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))",
        gap: isMobile ? "1.25rem" : "2rem",
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
                                <FaFileContract style={{ width: "1rem", height: "1rem" }} />
                                Terms
                            </span>
                            <h1 style={heroTitleStyle}>The agreement behind FocusFlow</h1>
                            <p style={heroSubtitleStyle}>
                                Our terms set expectations so individuals and teams collaborate smoothly. Understand your responsibilities, the service we promise, and how we evolve FocusFlow with transparency.
                                Shared clarity keeps us aligned.
                            </p>
                        </div>
                        <div style={heroActionsStyle}>
                            <a
                                href="#obligations"
                                style={
                                    primaryButtonHovered
                                        ? heroPrimaryButtonHoverStyle
                                        : heroPrimaryButtonStyle
                                }
                                onMouseEnter={() => setPrimaryButtonHovered(true)}
                                onMouseLeave={() => setPrimaryButtonHovered(false)}
                            >
                                Review core terms
                            </a>
                            <a
                                href="#support"
                                style={
                                    secondaryButtonHovered
                                        ? heroSecondaryButtonHoverStyle
                                        : heroSecondaryButtonStyle
                                }
                                onMouseEnter={() => setSecondaryButtonHovered(true)}
                                onMouseLeave={() => setSecondaryButtonHovered(false)}
                            >
                                Talk with our team
                            </a>
                        </div>
                    </div>

                    <div style={heroRightColumnStyle}>
                        <div style={highlightPanelStyle}>
                            <div style={sectionHeaderStyle}>
                                <span style={heroBadgeStyle}>
                                    <FaHandshake style={{ width: "1rem", height: "1rem" }} />
                                    Our promises
                                </span>
                                <h2 style={sectionTitleStyle}>What you can count on</h2>
                            </div>
                            <div style={highlightListStyle}>
                                {termsPromises.map((item) => (
                                    <div key={item} style={highlightChipStyle}>
                                        <FaCheckCircle style={highlightStatValueStyle} />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section id="obligations" style={sectionWrapperStyle}>
                    <div style={sectionHeaderStyle}>
                        <span style={heroBadgeStyle}>
                            <FaClipboardCheck style={{ width: "1rem", height: "1rem" }} />
                            Core obligations
                        </span>
                        <h2 style={sectionTitleStyle}>How FocusFlow and users work together</h2>
                    </div>
                    <div style={cardsGridStyle}>
                        {obligationAreas.map((area, idx) => (
                            <a
                                key={area.title}
                                href={area.link}
                                style={
                                    cardHovered === idx
                                        ? { ...cardStyle, ...cardHoverStyle }
                                        : cardStyle
                                }
                                onMouseEnter={() => {
                                    setCardHovered(idx);
                                    setReadMoreHovered((prev) => ({
                                        ...prev,
                                        [area.title]: true,
                                    }));
                                }}
                                onMouseLeave={() => {
                                    setCardHovered(null);
                                    setReadMoreHovered((prev) => ({
                                        ...prev,
                                        [area.title]: false,
                                    }));
                                }}
                            >
                                <div style={cardHeaderStyle}>
                                    <div style={cardIconStyle}>{area.icon}</div>
                                    <div style={cardBadgeStyle}>{area.badge}</div>
                                </div>
                                <div style={cardContentStyle}>
                                    <h3 style={cardTitleStyle}>{area.title}</h3>
                                    <p style={cardSummaryStyle}>{area.summary}</p>
                                    <div style={cardDetailStyle}>{area.detail}</div>
                                    <div style={cardFooterStyle}>
                                        <span style={cardMetaStyle}>{area.meta}</span>
                                        <span
                                            style={
                                                readMoreHovered[area.title]
                                                    ? readMoreHoverStyle
                                                    : readMoreStyle
                                            }
                                        >
                                            {area.linkLabel}
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

                <section id="support" style={sectionWrapperStyle}>
                    <div style={sectionHeaderStyle}>
                        <span style={heroBadgeStyle}>
                            <FaHeadset style={{ width: "1rem", height: "1rem" }} />
                            Support & updates
                        </span>
                        <h2 style={sectionTitleStyle}>Stay informed and get help fast</h2>
                    </div>
                    <div style={valuePanelsGridStyle}>
                        <div style={highlightPanelStyle}>
                            <span style={heroBadgeStyle}>
                                <FaComments style={{ width: "1rem", height: "1rem" }} />
                                Communication
                            </span>
                            <h3 style={valuePanelTitleStyle}>How we keep you in the loop</h3>
                            <div style={valueListStyle}>
                                {supportChannels.map((item) => (
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
                        <div style={highlightPanelStyle}>
                            <span style={heroBadgeStyle}>
                                <FaBolt style={{ width: "1rem", height: "1rem" }} />
                                Quick hits
                            </span>
                            <h3 style={valuePanelTitleStyle}>Know before you sign</h3>
                            <div style={valueListStyle}>
                                {summaryPoints.map((item) => (
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

export default DashboardTerms;
