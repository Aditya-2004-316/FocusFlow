import React, { useState } from "react";
import {
    FaTasks,
    FaClock,
    FaChartBar,
    FaUsers,
    FaBan,
    FaThLarge,
    FaBookOpen,
    FaHeadset,
} from "react-icons/fa";

const features = [
    {
        title: "Advanced Task Management",
        desc: "Create, organize, and prioritize unlimited tasks and projects. Use tags, deadlines, and custom categories for maximum control.",
        icon: FaTasks,
    },
    {
        title: "Integrated Focus Timer",
        desc: "Use Pomodoro, custom intervals, and deep work sessions. Visualize your focus streaks and session history.",
        icon: FaClock,
    },
    {
        title: "Detailed Analytics",
        desc: "Track your productivity trends, time allocation, and goal progress with beautiful charts and insights.",
        icon: FaChartBar,
    },
    {
        title: "Collaboration Tools",
        desc: "Invite teammates, assign tasks, share notes, and comment in real time. Perfect for teams and accountability partners.",
        icon: FaUsers,
    },
    {
        title: "Distraction Logging",
        desc: "Log distractions, analyze patterns, and get actionable tips to improve your focus over time.",
        icon: FaBan,
    },
    {
        title: "Customizable Workspace",
        desc: "Personalize your dashboard with themes, widgets, and layout options to suit your workflow.",
        icon: FaThLarge,
    },
    {
        title: "Resource Library",
        desc: "Access guides, templates, and expert tips to boost your productivity and well-being.",
        icon: FaBookOpen,
    },
    {
        title: "Priority Support",
        desc: "Get fast, friendly help from our support team whenever you need it.",
        icon: FaHeadset,
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

const featuresGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
    marginTop: "2rem",
};

const featureCardStyle = {
    background: "var(--panel-bg)",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid var(--color-gray-200)",
    transition: "all 0.2s ease-in-out",
    textAlign: "center",
};

const featureCardHoverStyle = {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const iconContainerStyle = {
    width: "3rem",
    height: "3rem",
    borderRadius: "0.5rem",
    background: "var(--color-primary-50)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1rem",
};

const iconStyle = {
    fontSize: "1.5rem",
    color: "var(--color-primary-600)",
};

const featureTitleStyle = {
    fontSize: "1.125rem",
    fontWeight: 600,
    color: "var(--color-gray-900)",
    marginBottom: "0.75rem",
};

const featureDescStyle = {
    fontSize: "0.875rem",
    color: "var(--color-gray-600)",
    lineHeight: 1.6,
};

const DashboardFeatures = () => {
    const [cardHovered, setCardHovered] = useState(null);

    return (
        <>
            <div style={pageBackgroundStyle} />
            <div style={containerStyle}>
                <div style={headerStyle}>
                    <h1 style={titleStyle}>
                        All Features at Your Fingertips
                    </h1>
                    <p style={subtitleStyle}>
                        Explore the full suite of productivity, analytics, and
                        collaboration tools available in your FocusFlow
                        dashboard.
                    </p>
                </div>
                <div style={featuresGridStyle}>
                        {features.map((feature, idx) => {
                            const IconComponent = feature.icon;
                            return (
                                <div
                                    key={idx}
                                    style={
                                        cardHovered === idx
                                            ? {
                                                  ...featureCardStyle,
                                                  ...featureCardHoverStyle,
                                              }
                                            : featureCardStyle
                                    }
                                    onMouseEnter={() => setCardHovered(idx)}
                                    onMouseLeave={() => setCardHovered(null)}
                                >
                                    <div style={iconContainerStyle}>
                                        <IconComponent style={iconStyle} />
                                    </div>
                                    <div style={featureTitleStyle}>
                                        {feature.title}
                                    </div>
                                    <div style={featureDescStyle}>
                                        {feature.desc}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
        </>
    );
};

export default DashboardFeatures;
