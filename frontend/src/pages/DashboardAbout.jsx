import React, { useState } from "react";
import { FaInfoCircle, FaUsers, FaBullseye } from "react-icons/fa";

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
    maxWidth: 900,
    margin: "2.5rem auto",
    padding: "2.5rem",
    background: "rgba(255,255,255,0.85)",
    borderRadius: "2rem",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
    backdropFilter: "blur(4px)",
    position: "relative",
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
    width: "4.5rem",
    height: "4.5rem",
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
    padding: "2.5rem 2rem 2rem 2rem",
    marginBottom: "2.5rem",
    boxShadow: "0 4px 32px 0 rgba(0,0,0,0.10)",
    position: "relative",
    textAlign: "center",
};

const titleStyle = {
    fontSize: "2.3rem",
    fontWeight: 900,
    color: "var(--color-primary-900)",
    margin: 0,
    letterSpacing: "-1px",
    textShadow: "0 2px 8px rgba(0,0,0,0.10)",
    textAlign: "left",
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
};

const subtitleStyle = {
    color: "var(--color-cyan-900)",
    fontSize: "1.18rem",
    maxWidth: 600,
    margin: "1.2rem auto 0 auto",
    fontWeight: 500,
    lineHeight: 1.6,
    textAlign: "center",
};

const mainStyle = {
    maxWidth: 700,
    margin: "-2.5rem auto 2.5rem auto",
    padding: "1.5rem",
    background: "rgba(255,255,255,0.92)",
    borderRadius: "1.5rem",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
};

const sectionStyle = {
    background:
        "linear-gradient(135deg, rgba(255,255,255,0.96) 60%, var(--color-cyan-50) 100%)",
    borderRadius: "1.5rem",
    boxShadow: "0 8px 32px rgba(0,0,0,0.16), 0 1.5px 8px rgba(0,0,0,0.08)",
    padding: "1.5rem 1.5rem 1rem 1.5rem",
    marginBottom: "1.5rem",
    border: "2.5px solid var(--color-primary-200)",
    position: "relative",
    overflow: "hidden",
    transition: "transform 0.18s, box-shadow 0.18s, border 0.18s",
    cursor: "pointer",
    display: "flex",
    alignItems: "flex-start",
    gap: "1rem",
};

const sectionHoverStyle = {
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
};

const sectionContentStyle = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    zIndex: 1,
};

const sectionTitleStyle = {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "var(--color-primary-700)",
    marginBottom: "0.5rem",
    letterSpacing: "-0.3px",
};

const textStyle = {
    fontSize: "1.05rem",
    color: "var(--color-gray-700)",
    marginBottom: "0.5rem",
    lineHeight: 1.6,
    fontWeight: 500,
};

const sections = [
    {
        title: "Who We Are",
        icon: (
            <FaUsers
                style={{
                    color: "var(--color-primary-600)",
                    fontSize: "1.7rem",
                    marginRight: "0.7rem",
                }}
            />
        ),
        content:
            "FocusFlow is built by a passionate team of students and productivity enthusiasts. We believe everyone deserves access to powerful, distraction-free tools—without paywalls or hidden fees.",
    },
    {
        title: "Our Mission",
        icon: (
            <FaBullseye
                style={{
                    color: "var(--color-cyan-700)",
                    fontSize: "1.7rem",
                    marginRight: "0.7rem",
                }}
            />
        ),
        content:
            "We want to help you organize your life, track your progress, and collaborate with others, all in one beautiful dashboard. Your privacy and experience are our top priorities.",
    },
    {
        title: "Meet the Team",
        icon: (
            <FaUsers
                style={{
                    color: "var(--color-primary-400)",
                    fontSize: "1.7rem",
                    marginRight: "0.7rem",
                }}
            />
        ),
        content:
            "We're a small, dedicated group who love building tools that make a difference. Thank you for being part of the FocusFlow community!",
    },
];

const DashboardAbout = () => {
    const [iconHovered, setIconHovered] = useState(false);
    const [sectionHovered, setSectionHovered] = useState(null);

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
                            <FaInfoCircle
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
                            About FocusFlow
                        </h1>
                    </div>
                    <p style={subtitleStyle}>
                        Our mission is to empower you to achieve more, stress
                        less, and find your flow every day.
                    </p>
                </section>
                <main style={mainStyle}>
                    {sections.map((section, idx) => (
                        <div
                            key={idx}
                            style={
                                sectionHovered === idx
                                    ? { ...sectionStyle, ...sectionHoverStyle }
                                    : sectionStyle
                            }
                            onMouseEnter={() => setSectionHovered(idx)}
                            onMouseLeave={() => setSectionHovered(null)}
                        >
                            <div style={iconWrapperStyle}>{section.icon}</div>
                            <div style={sectionContentStyle}>
                                <div style={sectionTitleStyle}>
                                    {section.title}
                                </div>
                                <div style={textStyle}>{section.content}</div>
                            </div>
                        </div>
                    ))}
                </main>
            </div>
        </>
    );
};

export default DashboardAbout;
