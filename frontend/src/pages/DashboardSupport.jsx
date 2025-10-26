import React, { useState } from "react";
import { FaEnvelope, FaQuestionCircle, FaUsers } from "react-icons/fa";

const supportOptions = [
    {
        title: "Contact Support",
        description:
            "Reach out to our team for personalized help with your account or features.",
        link: "mailto:support@focusflow.com",
        icon: (
            <FaEnvelope
                style={{
                    color: "var(--color-primary-600)",
                    fontSize: "1.7rem",
                    marginRight: "0.7rem",
                }}
            />
        ),
    },
    {
        title: "Help Center",
        description: "Browse FAQs, guides, and troubleshooting tips.",
        link: "/dashboard/guides",
        icon: (
            <FaQuestionCircle
                style={{
                    color: "var(--color-cyan-700)",
                    fontSize: "1.7rem",
                    marginRight: "0.7rem",
                }}
            />
        ),
    },
    {
        title: "Community Forum",
        description: "Ask questions, share tips, and connect with other users.",
        link: "/dashboard/community",
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

const titleStyle = {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "0.5rem",
};

const subtitleStyle = {
    fontSize: "1.125rem",
    opacity: 0.9,
};

const optionsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
};

const optionCardStyle = {
    background: "var(--panel-bg)",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid var(--color-gray-200)",
    transition: "all 0.2s ease-in-out",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    textDecoration: "none",
};

const optionCardHoverStyle = {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const optionIconContainerStyle = {
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "0.5rem",
    background: "var(--color-primary-50)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
};

const optionTitleStyle = {
    fontSize: "1.125rem",
    fontWeight: 600,
    color: "var(--color-gray-900)",
    marginBottom: "0.5rem",
};

const optionDescStyle = {
    fontSize: "0.875rem",
    color: "var(--color-gray-600)",
    lineHeight: 1.6,
};


// Add new responsive styles for icon
const iconStyle = {
    fontSize: "clamp(1.5rem, 3vw, 1.7rem)", // Responsive icon size
};

const DashboardSupport = () => {
    const [cardHovered, setCardHovered] = useState(null);

    return (
        <>
            <div style={pageBackgroundStyle} />
            <div style={containerStyle}>
                <div style={headerStyle}>
                    <h1 style={titleStyle}>Support & Help</h1>
                    <p style={subtitleStyle}>
                        Need help? Find answers, contact our team, or connect
                        with the FocusFlow community.
                    </p>
                </div>
                <div style={optionsGridStyle}>
                    {supportOptions.map((option, idx) => (
                        <a
                            key={idx}
                            href={option.link}
                            style={
                                cardHovered === idx
                                    ? { ...optionCardStyle, ...optionCardHoverStyle }
                                    : optionCardStyle
                            }
                            onMouseEnter={() => setCardHovered(idx)}
                            onMouseLeave={() => setCardHovered(null)}
                        >
                            <div style={optionIconContainerStyle}>{option.icon}</div>
                            <div style={optionTitleStyle}>{option.title}</div>
                            <div style={optionDescStyle}>{option.description}</div>
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DashboardSupport;
