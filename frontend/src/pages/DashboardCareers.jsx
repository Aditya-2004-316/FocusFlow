import React, { useState } from "react";
import {
    FaBriefcase,
    FaArrowRight,
    FaMapMarkerAlt,
    FaClock,
} from "react-icons/fa";

const roles = [
    {
        title: "Frontend Developer (React)",
        type: "Remote / Part-time",
        desc: "Help us build beautiful, responsive interfaces for FocusFlow.",
        skills: ["React", "JavaScript", "CSS", "UI/UX"],
        icon: (
            <FaBriefcase
                style={{
                    color: "var(--color-primary-600)",
                    fontSize: "1.7rem",
                    marginRight: "0.7rem",
                }}
            />
        ),
    },
    {
        title: "Content Writer",
        type: "Remote / Flexible",
        desc: "Share productivity tips and help grow our knowledge base.",
        skills: ["Writing", "SEO", "Content Strategy", "Research"],
        icon: (
            <FaBriefcase
                style={{
                    color: "var(--color-cyan-700)",
                    fontSize: "1.7rem",
                    marginRight: "0.7rem",
                }}
            />
        ),
    },
    {
        title: "Community Manager",
        type: "Remote / Volunteer",
        desc: "Engage with users, moderate forums, and foster a positive community.",
        skills: [
            "Communication",
            "Social Media",
            "Community Building",
            "Moderation",
        ],
        icon: (
            <FaBriefcase
                style={{
                    color: "var(--color-primary-400)",
                    fontSize: "1.7rem",
                    marginRight: "0.7rem",
                }}
            />
        ),
    },
];

const pageBackgroundStyle = {
    minHeight: "100vh",
    width: "99vw",
    background:
        "linear-gradient(120deg, var(--color-cyan-50) 0%, var(--color-primary-100) 100%)",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
};

const containerStyle = {
    width: "95%",
    maxWidth: "1000px",
    margin: "2.5rem auto",
    padding: "clamp(1.5rem, 4vw, 2.5rem)",
    background: "rgba(255,255,255,0.85)",
    borderRadius: "clamp(1rem, 3vw, 2rem)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
    backdropFilter: "blur(4px)",
    position: "relative",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};

const heroAccentBarStyle = {
    height: "6px",
    width: "100px",
    background:
        "linear-gradient(90deg, var(--color-primary-400), var(--color-cyan-400))",
    borderRadius: "3px",
    margin: "0 auto 0.8rem auto",
    boxShadow: "0 2px 12px 0 rgba(0,0,0,0.10)",
};

const heroIconCircleStyle = {
    background:
        "linear-gradient(135deg, var(--color-cyan-100) 0%, var(--color-primary-100) 100%)",
    borderRadius: "50%",
    width: "clamp(3.5rem, 6vw, 4.5rem)",
    height: "clamp(3.5rem, 6vw, 4.5rem)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 0.1rem auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "transform 0.18s, filter 0.18s",
};

const heroIconHoverStyle = {
    transform: "scale(1.08)",
    filter: "brightness(1.12)",
};

const heroStyle = {
    background:
        "linear-gradient(100deg, var(--color-primary-700) 0%, var(--color-cyan-100) 60%, var(--color-primary-200) 100%)",
    color: "var(--color-primary-800)",
    borderRadius: "1.5rem",
    padding: "clamp(1.5rem, 4vw, 2.5rem)",
    width: "100%",
    boxSizing: "border-box",
    marginBottom: "2.5rem",
    boxShadow: "0 4px 32px 0 rgba(0,0,0,0.10)",
    position: "relative",
    textAlign: "center",
};

const titleStyle = {
    fontSize: "clamp(1.8rem, 4vw, 2.3rem)",
    fontWeight: 900,
    color: "var(--color-primary-900)",
    margin: 0,
    letterSpacing: "-1px",
    textShadow: "0 2px 8px rgba(0,0,0,0.10)",
    textAlign: "center",
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
    padding: "0 clamp(0.5rem, 2vw, 1rem)",
};

const subtitleStyle = {
    color: "var(--color-cyan-900)",
    fontSize: "clamp(1rem, 2vw, 1.18rem)",
    width: "100%",
    margin: "1.2rem auto 0 auto",
    fontWeight: 500,
    lineHeight: 1.6,
    textAlign: "center",
    padding: "0 clamp(0.5rem, 2vw, 1rem)",
    boxSizing: "border-box",
};

const mainStyle = {
    width: "100%",
    maxWidth: "900px",
    margin: "-2.5rem auto 2.5rem auto",
    padding: "clamp(1rem, 3vw, 1.5rem)",
    background: "rgba(255,255,255,0.92)",
    borderRadius: "1.5rem",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem", // Increased gap between cards for better spacing
    boxSizing: "border-box",
};

const cardStyle = {
    background:
        "linear-gradient(135deg, rgba(255,255,255,0.96) 60%, var(--color-cyan-50) 100%)",
    borderRadius: "1.5rem",
    boxShadow: "0 8px 32px rgba(0,0,0,0.16), 0 1.5px 8px rgba(0,0,0,0.08)",
    padding: "clamp(1.2rem, 3vw, 1.8rem)", // Increased padding for better spacing
    maxWidth: "750px",
    width: "100%",
    margin: "0 auto",
    display: "flex",
    gap: "1.2rem", // Increased gap between icon and content
    alignItems: "flex-start",
    transition: "all 0.2s ease-in-out",
    marginBottom: "0",
    boxSizing: "border-box",
};

const cardHoverStyle = {
    transform: "translateY(-6px) scale(1.03)",
    boxShadow: "0 16px 48px rgba(0,0,0,0.22), 0 2px 12px rgba(0,0,0,0.10)",
    border: "2.5px solid var(--color-primary-400)",
};

const cardHeaderStyle = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    gap: "1rem",
};

const iconWrapperStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "0.2rem",
    flexShrink: 0,
    zIndex: 1,
    padding: "0.5rem",
    width: "3rem",
};

const roleContentStyle = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    zIndex: 1,
    padding: "0 0.5rem",
    width: "100%",
};

const roleTitleStyle = {
    fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)",
    fontWeight: 700,
    color: "var(--color-primary-700)",
    marginBottom: "0.5rem",
    letterSpacing: "-0.3px",
};

const roleTypeStyle = {
    fontSize: "clamp(0.85rem, 1.8vw, 0.95rem)",
    color: "var(--color-gray-500)",
    marginBottom: "0.75rem",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
};

const roleDescStyle = {
    fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
    color: "var(--color-gray-700)",
    marginBottom: "1rem",
    lineHeight: 1.6,
    fontWeight: 500,
};

const skillsContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginBottom: "1.2rem", // Increased margin for better spacing
};

const skillTagStyle = {
    background:
        "linear-gradient(135deg, var(--color-primary-50), var(--color-cyan-50))",
    color: "var(--color-primary-700)",
    padding: "0.3rem 0.7rem",
    borderRadius: "0.5rem",
    fontSize: "clamp(0.75rem, 1.5vw, 0.85rem)",
    fontWeight: 600,
    border: "1px solid var(--color-primary-200)",
    transition: "transform 0.2s ease, background 0.2s ease",
};

const skillTagHoverStyle = {
    transform: "scale(1.05)",
    background:
        "linear-gradient(135deg, var(--color-primary-100), var(--color-cyan-100))",
};

// Updated apply button styles with better colors and contrast
const applyButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    background: "var(--color-primary-600)", // Solid background for better visibility
    color: "white",
    padding: "clamp(0.7rem, 1.5vw, 0.9rem) clamp(1.2rem, 2.5vw, 1.6rem)", // Increased padding
    borderRadius: "0.75rem",
    fontSize: "clamp(0.9rem, 1.8vw, 1rem)", // Slightly larger font
    fontWeight: 600,
    border: "2px solid var(--color-primary-600)", // Border for definition
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 3px 12px rgba(0,0,0,0.15)", // Better shadow
    width: "fit-content",
    alignSelf: "flex-start",
    textDecoration: "none",
    letterSpacing: "0.3px", // Better text spacing
};

const applyButtonHoverStyle = {
    background: "var(--color-primary-700)", // Darker on hover
    borderColor: "var(--color-primary-700)",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
    color: "white", // Ensure white text on hover
};

const infoBoxStyle = {
    width: "100%",
    maxWidth: "750px",
    margin: "0 auto",
    color: "var(--color-gray-700)",
    fontSize: "clamp(0.95rem, 2vw, 1rem)",
    background:
        "linear-gradient(90deg, var(--color-primary-50) 60%, var(--color-cyan-50) 100%)",
    borderRadius: "1rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    padding: "clamp(1rem, 3vw, 1.5rem)",
    textAlign: "center",
    border: "1px solid var(--color-primary-100)",
    fontWeight: 500,
    lineHeight: 1.6,
    boxSizing: "border-box",
    marginTop: "1rem", // Added top margin to separate from cards
};

const DashboardCareers = () => {
    const [iconHovered, setIconHovered] = useState(false);
    const [cardHovered, setCardHovered] = useState(null);
    const [buttonHovered, setButtonHovered] = useState(null);
    const [skillHovered, setSkillHovered] = useState(null);

    return (
        <>
            <div style={pageBackgroundStyle} />
            <div style={containerStyle}>
                <section style={heroStyle}>
                    <div style={heroAccentBarStyle}></div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginBottom: "1.2rem",
                        }}
                    >
                        <div
                            style={
                                iconHovered
                                    ? {
                                          ...heroIconCircleStyle,
                                          ...heroIconHoverStyle,
                                      }
                                    : heroIconCircleStyle
                            }
                            onMouseEnter={() => setIconHovered(true)}
                            onMouseLeave={() => setIconHovered(false)}
                        >
                            <FaBriefcase
                                style={{
                                    fontSize: "2.5rem",
                                    color: "white",
                                }}
                            />
                        </div>
                        <h1
                            style={{
                                ...titleStyle,
                                margin: 0,
                                textAlign: "center",
                                lineHeight: 1.1,
                                display: "block",
                                marginTop: 0,
                            }}
                        >
                            Careers
                        </h1>
                    </div>
                    <p style={subtitleStyle}>
                        Join our mission to make productivity accessible to
                        everyone. Explore open roles and help shape the future
                        of FocusFlow.
                    </p>
                </section>
                <main style={mainStyle}>
                    {roles.map((role, idx) => (
                        <div
                            key={idx}
                            style={
                                cardHovered === idx
                                    ? { ...cardStyle, ...cardHoverStyle }
                                    : cardStyle
                            }
                            onMouseEnter={() => setCardHovered(idx)}
                            onMouseLeave={() => setCardHovered(null)}
                        >
                            <div style={iconWrapperStyle}>{role.icon}</div>
                            <div style={cardHeaderStyle}>
                                <div style={roleContentStyle}>
                                    <div style={roleTitleStyle}>
                                        {role.title}
                                    </div>
                                    <div style={roleTypeStyle}>
                                        <FaMapMarkerAlt
                                            style={{ fontSize: "0.8rem" }}
                                        />
                                        {role.type}
                                    </div>
                                </div>

                                <div style={roleDescStyle}>{role.desc}</div>

                                <div style={skillsContainerStyle}>
                                    {role.skills.map((skill, skillIdx) => (
                                        <span
                                            key={skillIdx}
                                            style={
                                                skillHovered ===
                                                `${idx}-${skillIdx}`
                                                    ? {
                                                          ...skillTagStyle,
                                                          ...skillTagHoverStyle,
                                                      }
                                                    : skillTagStyle
                                            }
                                            onMouseEnter={() =>
                                                setSkillHovered(
                                                    `${idx}-${skillIdx}`
                                                )
                                            }
                                            onMouseLeave={() =>
                                                setSkillHovered(null)
                                            }
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <button
                                    style={
                                        buttonHovered === idx
                                            ? {
                                                  ...applyButtonStyle,
                                                  ...applyButtonHoverStyle,
                                              }
                                            : applyButtonStyle
                                    }
                                    onMouseEnter={() => setButtonHovered(idx)}
                                    onMouseLeave={() => setButtonHovered(null)}
                                    onClick={() =>
                                        alert(`Apply for ${role.title}`)
                                    }
                                >
                                    Apply Now
                                    <FaArrowRight
                                        style={{ fontSize: "0.8rem" }}
                                    />
                                </button>
                            </div>
                        </div>
                    ))}

                    <div style={infoBoxStyle}>
                        Don't see a perfect fit?{" "}
                        <span
                            style={{
                                color: "var(--color-primary-600)",
                                fontWeight: 600,
                            }}
                        >
                            Send us your resume anyway - we're always looking
                            for talent!
                        </span>
                    </div>
                </main>
            </div>
        </>
    );
};

export default DashboardCareers;
