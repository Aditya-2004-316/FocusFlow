import React, { useMemo, useState } from "react";
import useResponsive from "../hooks/useResponsive";
import { FaBriefcase, FaMapMarkerAlt, FaUsers, FaCheckCircle, FaClipboardCheck, FaPaperPlane } from "react-icons/fa";

const roles = [
    {
        title: "Frontend Developer (React)",
        type: "Remote · Part-time",
        desc: "Help us build beautiful, responsive interfaces for FocusFlow.",
        skills: ["React", "JavaScript", "CSS", "UI/UX"],
        icon: <FaBriefcase />,
        team: "Product & Engineering",
    },
    {
        title: "Content Writer",
        type: "Remote · Flexible",
        desc: "Share productivity tips and help grow our knowledge base.",
        skills: ["Writing", "SEO", "Content Strategy", "Research"],
        icon: <FaBriefcase />,
        team: "Marketing & Editorial",
    },
    {
        title: "Community Manager",
        type: "Remote · Volunteer",
        desc: "Engage with users, moderate forums, and foster a positive community.",
        skills: ["Communication", "Social Media", "Community Building", "Moderation"],
        icon: <FaBriefcase />,
        team: "Community",
    },
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

const roleCardStyle = {
    background: "var(--panel-bg)",
    border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
    borderRadius: "1rem",
    overflow: "hidden",
    boxShadow: "var(--shadow-soft)",
    display: "flex",
    flexDirection: "column",
};

const roleHeaderStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.85rem",
    padding: "1.5rem 1.75rem 0.85rem",
};

const roleIconStyle = {
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

const roleTeamTagStyle = {
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

const roleContentStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    padding: "0 1.75rem 1.75rem",
    flex: 1,
};

const roleTitleStyle = {
    fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)",
    fontWeight: 700,
    color: "var(--color-primary-700)",
    margin: 0,
    letterSpacing: "-0.3px",
};

const roleTypeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    fontSize: "0.9rem",
    color: "var(--color-gray-500)",
    fontWeight: 500,
    margin: 0,
};

const roleDescStyle = {
    fontSize: "1rem",
    color: "var(--color-gray-600)",
    lineHeight: 1.6,
    margin: 0,
};

const skillsListStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
};

const skillTagStyle = {
    background: "rgba(56, 189, 248, 0.12)",
    color: "var(--color-primary-600)",
    borderRadius: "0.6rem",
    padding: "0.35rem 0.8rem",
    fontSize: "0.85rem",
    fontWeight: 600,
};

const roleFooterStyle = {
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

const applyButtonStyle = {
    ...heroPrimaryButtonStyle,
    padding: "0.7rem 1.6rem",
    fontSize: "0.9rem",
    boxShadow: "0 10px 24px rgba(8, 145, 178, 0.25)",
};

const applyButtonHoverStyle = {
    ...heroPrimaryButtonHoverStyle,
    padding: "0.7rem 1.6rem",
    fontSize: "0.9rem",
};

const infoPanelStyle = {
    background: "var(--panel-bg)",
    border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
    borderRadius: "1.25rem",
    padding: "1.75rem",
    boxShadow: "var(--shadow-soft)",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    textAlign: "center",
    alignItems: "center",
};

const DashboardCareers = () => {
    const { isMobile, isTablet, width } = useResponsive();
    const [primaryButtonHovered, setPrimaryButtonHovered] = useState(false);
    const [secondaryButtonHovered, setSecondaryButtonHovered] = useState(false);
    const [readMoreHovered, setReadMoreHovered] = useState({});
    const [applyHovered, setApplyHovered] = useState({});

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

    const rolesGridStyle = {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "2rem",
    };

    const teams = useMemo(
        () => Array.from(new Set(roles.map((role) => role.team))),
        []
    );

    return (
        <section style={pageWrapperStyle}>
            <div style={containerStyle}>
                <section style={heroSectionStyle}>
                    <div style={heroLeftColumnStyle}>
                        <div style={heroContentStyle}>
                            <span style={heroBadgeStyle}>
                                <FaBriefcase style={{ width: "1rem", height: "1rem" }} />
                                We're hiring
                            </span>
                            <h1 style={heroTitleStyle}>Build the future of FocusFlow</h1>
                            <p style={heroSubtitleStyle}>
                                Help us design the next generation of productivity tools. Join a
                                remote-first team that values craft, autonomy, and meaningful impact
                                for individuals and teams worldwide.
                            </p>
                        </div>
                        <div style={heroActionsStyle}>
                            <a
                                href="#roles"
                                style={
                                    primaryButtonHovered
                                        ? heroPrimaryButtonHoverStyle
                                        : heroPrimaryButtonStyle
                                }
                                onMouseEnter={() => setPrimaryButtonHovered(true)}
                                onMouseLeave={() => setPrimaryButtonHovered(false)}
                            >
                                View open roles
                            </a>
                            <a
                                href="#teams"
                                style={
                                    secondaryButtonHovered
                                        ? heroSecondaryButtonHoverStyle
                                        : heroSecondaryButtonStyle
                                }
                                onMouseEnter={() => setSecondaryButtonHovered(true)}
                                onMouseLeave={() => setSecondaryButtonHovered(false)}
                            >
                                Meet the teams
                            </a>
                        </div>
                    </div>

                    <div style={heroRightColumnStyle}>
                        <div style={highlightPanelStyle} id="teams">
                            <div style={sectionHeaderStyle}>
                                <span style={heroBadgeStyle}>
                                    <FaUsers style={{ width: "1rem", height: "1rem" }} />
                                    Hiring tracks
                                </span>
                                <h2 style={sectionTitleStyle}>Where you could fit</h2>
                            </div>
                            <div style={highlightListStyle}>
                                {teams.map((team) => (
                                    <div key={team} style={highlightChipStyle}>
                                        <FaCheckCircle style={highlightStatValueStyle} />
                                        <span>{team}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section id="roles" style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                    <div style={sectionHeaderStyle}>
                        <span style={heroBadgeStyle}>
                            <FaClipboardCheck style={{ width: "1rem", height: "1rem" }} />
                            Open positions
                        </span>
                        <h2 style={sectionTitleStyle}>Find your next challenge</h2>
                    </div>
                    <div style={rolesGridStyle}>
                        {roles.map((role) => (
                            <div key={role.title} style={roleCardStyle}>
                                <div style={roleHeaderStyle}>
                                    <div style={roleIconStyle}>{role.icon}</div>
                                    <div style={roleTeamTagStyle}>{role.team}</div>
                                </div>
                                <div style={roleContentStyle}>
                                    <h3 style={roleTitleStyle}>{role.title}</h3>
                                    <p style={roleDescStyle}>{role.desc}</p>
                                    <div style={roleTypeStyle}>
                                        <FaMapMarkerAlt style={{ fontSize: "0.85rem" }} />
                                        {role.type}
                                    </div>
                                    <div style={skillsListStyle}>
                                        {role.skills.map((skill) => (
                                            <span key={skill} style={skillTagStyle}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                    <div style={roleFooterStyle}>
                                        <a
                                            href="#"
                                            style={
                                                readMoreHovered[role.title]
                                                    ? readMoreHoverStyle
                                                    : readMoreStyle
                                            }
                                            onMouseEnter={() =>
                                                setReadMoreHovered({
                                                    ...readMoreHovered,
                                                    [role.title]: true,
                                                })
                                            }
                                            onMouseLeave={() =>
                                                setReadMoreHovered({
                                                    ...readMoreHovered,
                                                    [role.title]: false,
                                                })
                                            }
                                        >
                                            Role details
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
                                        <a
                                            href="#"
                                            style={
                                                applyHovered[role.title]
                                                    ? applyButtonHoverStyle
                                                    : applyButtonStyle
                                            }
                                            onMouseEnter={() =>
                                                setApplyHovered({
                                                    ...applyHovered,
                                                    [role.title]: true,
                                                })
                                            }
                                            onMouseLeave={() =>
                                                setApplyHovered({
                                                    ...applyHovered,
                                                    [role.title]: false,
                                                })
                                            }
                                        >
                                            Apply now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={infoPanelStyle}>
                    <span style={heroBadgeStyle}>
                        <FaPaperPlane style={{ width: "1rem", height: "1rem" }} />
                        Don’t see your role?
                    </span>
                    <h2 style={sectionTitleStyle}>We still want to hear from you</h2>
                    <p style={heroSubtitleStyle}>
                        Send us your resume and a note about what you’d like to work on. We regularly
                        open contractor and full-time positions across the organization.
                    </p>
                    <a
                        href="mailto:careers@focusflow.com"
                        style={
                            primaryButtonHovered
                                ? heroPrimaryButtonHoverStyle
                                : heroPrimaryButtonStyle
                        }
                        onMouseEnter={() => setPrimaryButtonHovered(true)}
                        onMouseLeave={() => setPrimaryButtonHovered(false)}
                    >
                        Email our hiring team
                    </a>
                </section>
            </div>
        </section>
    );
};

export default DashboardCareers;
