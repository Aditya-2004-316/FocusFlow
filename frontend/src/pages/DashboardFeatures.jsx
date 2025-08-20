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
    width: "99vw",
    background:
        "linear-gradient(120deg, var(--color-cyan-50) 0%, var(--color-primary-100) 100%)",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
};

// Update containerStyle to be more responsive
const containerStyle = {
    width: "95%", // Changed from maxWidth to width
    margin: "2.5rem auto",
    padding: "2.5rem",
    background: "rgba(255,255,255,0.85)",
    borderRadius: "2rem",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
    backdropFilter: "blur(4px)",
    position: "relative",
};

// Update mainStyle to be more responsive
const mainStyle = {
    width: "95%", // Changed from maxWidth to width
    margin: "-2.5rem auto 2.5rem auto",
    padding: "1.5rem",
    background: "rgba(255,255,255,0.92)",
    borderRadius: "1.5rem",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
};

const accentBarStyle = {
    height: "6px",
    width: "100px",
    background:
        "linear-gradient(90deg, var(--color-primary-400), var(--color-cyan-400))",
    borderRadius: "3px",
    margin: "0 auto 0.8rem auto",
    boxShadow: "0 2px 12px 0 rgba(0,0,0,0.10)",
};

const heroStyle = {
    background:
        "linear-gradient(100deg, var(--color-primary-700) 0%, var(--color-cyan-100) 60%, var(--color-primary-200) 100%)",
    color: "var(--color-primary-800)",
    borderRadius: "1.5rem",
    padding: "2.5rem clamp(1rem, 5vw, 2rem)", // More responsive padding
    marginBottom: "2.5rem",
    boxShadow: "0 4px 32px 0 rgba(0,0,0,0.10)",
    position: "relative",
    textAlign: "center",
    width: "100%", // Add this
    boxSizing: "border-box", // Add this
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
    marginTop: "clamp(1rem, 3vw, 4rem)", // Responsive margin
    padding: "0 1rem", // Add some padding for smaller screens
};

const subtitleStyle = {
    color: "var(--color-cyan-900)",
    fontSize: "clamp(1rem, 2vw, 1.18rem)", // Responsive font size
    maxWidth: 600,
    margin: "1.2rem auto 0 auto",
    fontWeight: 500,
    lineHeight: 1.6,
    textAlign: "center",
    padding: "0 1rem", // Add some padding for smaller screens
    width: "100%", // Changed from maxWidth
    boxSizing: "border-box", // Add this
};

const featuresGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", // Changed from auto-fit to auto-fill and adjusted minmax
    gap: "1.5rem",
    marginTop: "2rem",
    width: "100%",
};

const featureCardStyle = {
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
    width: "100%", // Add this
    minHeight: "200px", // Add this for consistent card heights
    display: "flex", // Add this
    flexDirection: "column", // Add this
    justifyContent: "space-between", // Add this
    boxSizing: "border-box", // Add this
};

const featureCardHoverStyle = {
    transform: "translateY(-6px) scale(1.03)",
    boxShadow: "0 16px 48px rgba(0,0,0,0.22), 0 2px 12px rgba(0,0,0,0.10)",
    border: "2.5px solid var(--color-primary-400)",
};

const featureIconCircleStyle = {
    background:
        "linear-gradient(135deg, var(--color-cyan-100) 0%, var(--color-primary-100) 100%)",
    borderRadius: "50%",
    width: "3.5rem",
    height: "3.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1rem auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "transform 0.18s, filter 0.18s",
};

const featureIconHoverStyle = {
    transform: "scale(1.08)",
    filter: "brightness(1.12)",
};

const featureTitleStyle = {
    fontSize: "1.15rem",
    fontWeight: 700,
    color: "var(--color-primary-700)",
    marginBottom: "0.75rem",
    textAlign: "center",
    letterSpacing: "-0.5px",
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
};

const featureDescStyle = {
    color: "var(--color-gray-800)",
    fontSize: "1.05rem",
    textAlign: "center",
    fontWeight: 500,
    lineHeight: 1.7,
};

const iconStyle = {
    fontSize: "1.8rem",
    color: "var(--color-primary-600)",
    filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.10))",
};

const infoBoxStyle = {
    marginTop: "2.5rem",
    color: "#4b5563",
    fontSize: "1rem",
    background:
        "linear-gradient(90deg, var(--color-primary-50) 60%, var(--color-cyan-50) 100%)",
    borderRadius: "0.75rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    padding: "1.2rem 1.5rem",
    textAlign: "center",
    border: "1px solid var(--color-primary-100)",
    fontWeight: 500,
};

const DashboardFeatures = () => {
    const [cardHovered, setCardHovered] = useState(null);

    return (
        <>
            <div style={pageBackgroundStyle} />
            <div style={containerStyle}>
                <section style={heroStyle}>
                    <div style={accentBarStyle} />
                    <h1 style={{ ...titleStyle, marginTop: "4rem" }}>
                        All Features at Your Fingertips
                    </h1>
                    <p style={subtitleStyle}>
                        Explore the full suite of productivity, analytics, and
                        collaboration tools available in your FocusFlow
                        dashboard.
                    </p>
                </section>
                <main style={mainStyle}>
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
                                    <div
                                        style={
                                            cardHovered === idx
                                                ? {
                                                      ...featureIconCircleStyle,
                                                      ...featureIconHoverStyle,
                                                  }
                                                : featureIconCircleStyle
                                        }
                                    >
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
                    <div style={infoBoxStyle}>
                        Ready to boost your productivity?{" "}
                        <span
                            style={{
                                color: "var(--color-primary-600)",
                                fontWeight: 600,
                            }}
                        >
                            Start using these features in your dashboard today.
                        </span>
                    </div>
                </main>
            </div>
        </>
    );
};

export default DashboardFeatures;
