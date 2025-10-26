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
    background: "var(--color-gray-50)",
};

const containerStyle = {
    maxWidth: "76rem",
    margin: "0 auto",
    padding: "2rem",
};

const headerStyle = {
    background:
        "linear-gradient(to right, var(--color-primary-500), var(--color-cyan-400))",
    borderRadius: "1rem",
    padding: "2rem",
    marginBottom: "2rem",
    color: "var(--color-white)",
    boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
};

const guidesGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
};

const titleStyle = {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "0.5rem",
};

const subtitleStyle = {
    fontSize: "1.125rem",
    opacity: 0.9,
};

const guideCardStyle = {
    background: "var(--panel-bg)",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid var(--color-gray-200)",
    transition: "all 0.2s ease-in-out",
    display: "flex",
    gap: "1rem",
    alignItems: "flex-start",
};

const guideCardHoverStyle = {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const iconContainerStyle = {
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "0.5rem",
    background: "var(--color-primary-50)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
};

const guideContentStyle = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
};

const guideTitleStyle = {
    fontSize: "1.125rem",
    fontWeight: 600,
    color: "var(--color-gray-900)",
    marginBottom: "0.5rem",
};

const guideLevelStyle = {
    fontSize: "0.875rem",
    color: "var(--color-primary-600)",
    marginBottom: "0.5rem",
    fontWeight: 500,
};

const guideSummaryStyle = {
    fontSize: "0.875rem",
    color: "var(--color-gray-600)",
    lineHeight: 1.6,
};

const DashboardGuides = () => {
    const [iconHovered, setIconHovered] = useState(false);
    const [cardHovered, setCardHovered] = useState(null);

    return (
        <>
            <div style={pageBackgroundStyle} />
            <div style={containerStyle}>
                <div style={headerStyle}>
                    <h1 style={titleStyle}>Guides & Tutorials</h1>
                    <p style={subtitleStyle}>
                        Explore step-by-step guides to master FocusFlow and
                        unlock your productivity potential.
                    </p>
                </div>
                <div style={guidesGridStyle}>
                    {guides.map((guide, idx) => (
                        <div
                            key={idx}
                            style={
                                cardHovered === idx
                                    ? { ...guideCardStyle, ...guideCardHoverStyle }
                                    : guideCardStyle
                            }
                            onMouseEnter={() => setCardHovered(idx)}
                            onMouseLeave={() => setCardHovered(null)}
                        >
                            <div style={iconContainerStyle}>{guide.icon}</div>
                            <div style={guideContentStyle}>
                                <div style={guideTitleStyle}>{guide.title}</div>
                                <div style={guideLevelStyle}>{guide.level}</div>
                                <div style={guideSummaryStyle}>
                                    {guide.summary}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DashboardGuides;
