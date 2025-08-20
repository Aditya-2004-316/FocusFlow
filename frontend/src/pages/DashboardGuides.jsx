import React, { useState } from "react";
import { FaCompass, FaLightbulb, FaUsers } from "react-icons/fa";

const guides = [
    {
        title: "Getting Started with FocusFlow",
        summary:
            "A step-by-step guide to set up your workspace and start focusing.",
        level: "Beginner",
        icon: (
            <FaCompass
                style={{
                    color: "var(--color-primary-600)",
                    fontSize: "1.7rem",
                    marginRight: "0.7rem",
                }}
            />
        ),
    },
    {
        title: "Advanced Task Management",
        summary:
            "Tips and tricks for organizing complex projects and workflows.",
        level: "Intermediate",
        icon: (
            <FaLightbulb
                style={{
                    color: "var(--color-cyan-700)",
                    fontSize: "1.7rem",
                    marginRight: "0.7rem",
                }}
            />
        ),
    },
    {
        title: "Collaboration Features",
        summary: "How to invite teammates, assign tasks, and work together.",
        level: "All Levels",
        icon: (
            <FaUsers
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
    maxWidth: "1000px", // Add max width for better centering on large screens
    margin: "2.5rem auto", // This centers the container
    padding: "clamp(1.5rem, 4vw, 2.5rem)",
    background: "rgba(255,255,255,0.85)",
    borderRadius: "clamp(1rem, 3vw, 2rem)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
    backdropFilter: "blur(4px)",
    position: "relative",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center all content within container
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
    width: "clamp(3.5rem, 6vw, 4.5rem)", // Responsive size
    height: "clamp(3.5rem, 6vw, 4.5rem)", // Responsive size
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
    padding: "clamp(1.5rem, 4vw, 2.5rem)", // Responsive padding
    width: "100%",
    boxSizing: "border-box",
    marginBottom: "2.5rem",
    boxShadow: "0 4px 32px 0 rgba(0,0,0,0.10)",
    position: "relative",
    textAlign: "center",
};

const titleStyle = {
    fontSize: "clamp(1.8rem, 4vw, 2.3rem)", // Responsive font size
    fontWeight: 900,
    color: "var(--color-primary-900)",
    margin: 0,
    letterSpacing: "-1px",
    textShadow: "0 2px 8px rgba(0,0,0,0.10)",
    textAlign: "center",
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
    padding: "0 clamp(0.5rem, 2vw, 1rem)", // Added responsive padding
};

const subtitleStyle = {
    color: "var(--color-cyan-900)",
    fontSize: "clamp(1rem, 2vw, 1.18rem)", // Responsive font size
    width: "100%", // Changed from maxWidth
    margin: "1.2rem auto 0 auto",
    fontWeight: 500,
    lineHeight: 1.6,
    textAlign: "center",
    padding: "0 clamp(0.5rem, 2vw, 1rem)", // Added responsive padding
    boxSizing: "border-box",
};

const mainStyle = {
    width: "100%",
    maxWidth: "900px", // Set a maximum width for better centering
    margin: "-2.5rem auto 2.5rem auto", // Center the main container
    padding: "clamp(1rem, 3vw, 1.5rem)",
    background: "rgba(255,255,255,0.92)",
    borderRadius: "1.5rem",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically if needed
    gap: "1.5rem",
    boxSizing: "border-box",
};

const cardStyle = {
    background:
        "linear-gradient(135deg, rgba(255,255,255,0.96) 60%, var(--color-cyan-50) 100%)",
    borderRadius: "1.5rem",
    boxShadow: "0 8px 32px rgba(0,0,0,0.16), 0 1.5px 8px rgba(0,0,0,0.08)",
    padding: "clamp(1rem, 3vw, 1.5rem)",
    maxWidth: "750px",
    width: "100%",
    margin: "0 auto", // Center horizontally
    display: "flex",
    gap: "1rem",
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

const iconWrapperStyle = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: "0.2rem",
    flexShrink: 0,
    zIndex: 1,
    padding: "0.5rem",
    width: "3rem", // Fixed width for consistent layout
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const guideContentStyle = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    zIndex: 1,
    padding: "0 0.5rem", // Add some padding
    width: "100%",
};

const guideTitleStyle = {
    fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)", // Responsive font size
    fontWeight: 700,
    color: "var(--color-primary-700)",
    marginBottom: "0.5rem",
    letterSpacing: "-0.3px",
};

const guideLevelStyle = {
    fontSize: "clamp(0.85rem, 1.8vw, 0.95rem)", // Responsive font size
    color: "var(--color-gray-500)",
    marginBottom: "0.75rem",
    fontWeight: 500,
};

const guideSummaryStyle = {
    fontSize: "clamp(0.95rem, 2vw, 1.05rem)", // Responsive font size
    color: "var(--color-gray-700)",
    marginBottom: "0.5rem",
    lineHeight: 1.6,
    fontWeight: 500,
};

// Add new responsive styles for icon
const iconStyle = {
    fontSize: "clamp(1.5rem, 3vw, 1.7rem)", // Responsive icon size
};

const DashboardGuides = () => {
    const [iconHovered, setIconHovered] = useState(false);
    const [cardHovered, setCardHovered] = useState(null);

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
                            <FaCompass
                                style={{
                                    fontSize: "2.5rem",
                                    color: "var(--color-white)",
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
                            Guides
                        </h1>
                    </div>
                    <p style={subtitleStyle}>
                        Explore step-by-step guides to master FocusFlow and
                        unlock your productivity potential.
                    </p>
                </section>
                <main style={mainStyle}>
                    {guides.map((guide, idx) => (
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
                            <div style={iconWrapperStyle}>{guide.icon}</div>
                            <div style={guideContentStyle}>
                                <div style={guideTitleStyle}>{guide.title}</div>
                                <div style={guideLevelStyle}>{guide.level}</div>
                                <div style={guideSummaryStyle}>
                                    {guide.summary}
                                </div>
                            </div>
                        </div>
                    ))}
                </main>
            </div>
        </>
    );
};

export default DashboardGuides;
