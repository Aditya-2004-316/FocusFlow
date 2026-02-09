import React, { useState } from "react";
import useResponsive from "../hooks/useResponsive";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../styles/CardHover.css";

const updatesByCategory = {
    "New Features": [
        { date: "2025-01-20", title: "Mobile App Beta Launch", description: "iOS and Android apps are now available for beta testing. Sign up on our website!" },
        { date: "2024-12-20", title: "New Analytics Dashboard", description: "Completely redesigned analytics with beautiful charts and deeper insights into your productivity patterns." },
        { date: "2024-11-15", title: "Team Workspaces", description: "Collaborate with your team using shared workspaces, task assignments, and team analytics." },
    ],
    "Design Updates": [
        { date: "2024-06-01", title: "Improved Landing Footer Design", description: "The landing page footer has been redesigned for better spacing, clarity, and modern aesthetics." },
        { date: "2024-05-28", title: "Feature Cards Grid Update", description: "Features page now displays 4 cards per row for a more consistent and visually appealing layout." },
        { date: "2024-05-20", title: "Community Page Revamp", description: "The Community page now has a modern hero section, action cards, and improved color and spacing." },
    ],
    "Bug Fixes": [
        { date: "2025-01-15", title: "Timer Accuracy Improvements", description: "Fixed issues where timer would drift after long sessions. Now accurate to the millisecond." },
        { date: "2025-01-10", title: "Data Sync Issues Resolved", description: "Resolved synchronization problems that affected some users on slow connections." },
        { date: "2024-12-28", title: "Notification Fixes", description: "Fixed browser notification issues on Safari and Firefox." },
    ],
    "Performance": [
        { date: "2025-01-10", title: "Performance Optimizations", description: "Reduced page load time by 40% and improved overall app responsiveness." },
        { date: "2024-12-15", title: "Mobile-Responsive Design", description: "Optimized all pages for mobile devices with improved touch interactions and layouts." },
        { date: "2024-11-30", title: "Database Query Optimization", description: "Faster data loading and reduced server response times by 50%." },
    ],
    "UX Improvements": [
        { date: "2025-01-15", title: "Dark Mode Improvements", description: "Enhanced dark mode with better contrast ratios and reduced eye strain." },
        { date: "2024-05-10", title: "FAQ and Testimonials Enhancements", description: "FAQ and Testimonials pages now feature improved spacing, color, and modern layouts for better user experience." },
        { date: "2024-10-20", title: "Keyboard Shortcuts", description: "Added keyboard shortcuts for common actions: Space to start/pause, R to reset, and more." },
    ],
};

const allUpdates = Object.values(updatesByCategory).flat().sort((a, b) => new Date(b.date) - new Date(a.date));

const Updates = () => {
    const { isMobile, isTablet, width } = useResponsive();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const isCompact = width < 500;

    const displayUpdates = selectedCategory === "All"
        ? allUpdates
        : updatesByCategory[selectedCategory];

    return (
        <div style={{ background: "linear-gradient(188deg, #040915 0%, #101a31 55%, #050b18 100%)", minHeight: "100vh", color: "#ffffff" }}>
            <LandingNavbar />
            {/* Hero Section */}
            <section
                style={{
                    padding: isMobile ? "3rem 1rem 2rem" : "5rem 2rem 2rem",
                    textAlign: "center",
                }}
            >
                <h1
                    style={{
                        fontSize: isMobile ? "1.75rem" : isTablet ? "2.1rem" : "2.5rem",
                        fontWeight: 700,
                        marginBottom: "1rem",
                        background: "linear-gradient(to right, #38bdf8, #818cf8)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        padding: isMobile ? "0 0.5rem" : "0",
                    }}
                >
                    Latest Updates
                </h1>
                <p
                    style={{
                        color: "#94a3b8",
                        fontSize: isMobile ? "0.95rem" : "1.2rem",
                        maxWidth: 600,
                        margin: "0 auto",
                        lineHeight: 1.6,
                        padding: isMobile ? "0 0.5rem" : "0",
                    }}
                >
                    Stay up to date with the newest features, improvements, and
                    announcements from FocusFlow.
                </p>
            </section>
            <main
                style={{
                    maxWidth: 1200,
                    margin: isMobile ? "0 auto 2rem auto" : "-1.5rem auto 2rem auto",
                    padding: isMobile ? "0 1rem" : "1rem 2rem",
                }}
            >
                {/* Category Filter */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? "0.5rem" : "0.75rem", marginBottom: isMobile ? "1.5rem" : "2rem", justifyContent: "center" }}>
                    {["All", ...Object.keys(updatesByCategory)].map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            style={{
                                padding: isMobile ? "0.4rem 0.8rem" : "0.5rem 1rem",
                                borderRadius: "9999px",
                                borderTop: selectedCategory === category ? "1px solid #38bdf8" : "1px solid #334155",
                                borderLeft: selectedCategory === category ? "1px solid #38bdf8" : "1px solid #334155",
                                borderRight: selectedCategory === category ? "1px solid #38bdf8" : "1px solid #334155",
                                borderBottom: selectedCategory === category ? "1px solid #38bdf8" : "1px solid #334155",
                                background: selectedCategory === category ? "rgba(56, 189, 248, 0.1)" : "rgba(30, 41, 59, 0.5)",
                                color: selectedCategory === category ? "#38bdf8" : "#94a3b8",
                                cursor: "pointer",
                                fontSize: isMobile ? "0.8rem" : "0.9rem",
                                fontWeight: selectedCategory === category ? 600 : 400,
                                transition: "all 0.2s",
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Timeline View */}
                <div style={{ position: "relative", paddingLeft: isMobile ? "1.5rem" : "2rem" }}>
                    {/* Timeline Line */}
                    <div style={{
                        position: "absolute",
                        left: isMobile ? "0.35rem" : "0.5rem",
                        top: 0,
                        bottom: 0,
                        width: "2px",
                        background: "linear-gradient(to bottom, #38bdf8, #0ea5e9)",
                    }}></div>

                    {displayUpdates.map((update, idx) => (
                        <div key={idx} style={{ position: "relative", marginBottom: isMobile ? "1.5rem" : "2rem" }}>
                            {/* Timeline Dot */}
                            <div style={{
                                position: "absolute",
                                left: isMobile ? "-1.15rem" : "-1.5rem",
                                top: isMobile ? "1.25rem" : "1.5rem",
                                width: isMobile ? "0.85rem" : "1rem",
                                height: isMobile ? "0.85rem" : "1rem",
                                borderRadius: "50%",
                                background: "#38bdf8",
                                border: "3px solid #0f172a",
                            }}></div>

                            <div className="hover-card" style={{
                                background: "rgba(30, 41, 59, 0.5)",
                                backdropFilter: "blur(8px)",
                                borderRadius: "1rem",
                                border: "1px solid #334155",
                                padding: isMobile ? "1.25rem" : "1.5rem 1.5rem 1rem 1.5rem",
                                transition: "all 0.3s ease",
                            }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: isMobile ? "flex-start" : "center",
                                        marginBottom: 8,
                                        flexWrap: "wrap",
                                        flexDirection: isMobile ? "column" : "row",
                                        gap: isMobile ? "0.5rem" : "1rem",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "#38bdf8",
                                            fontWeight: 600,
                                            fontSize: isMobile ? "0.9rem" : "1.05rem",
                                        }}
                                    >
                                        {update.date}
                                    </span>
                                    <span
                                        style={{
                                            fontWeight: 600,
                                            color: "#ffffff",
                                            fontSize: isMobile ? "1rem" : "1.13rem",
                                        }}
                                    >
                                        {update.title}
                                    </span>
                                </div>
                                <div
                                    style={{
                                        color: "#94a3b8",
                                        fontSize: isMobile ? "0.92rem" : "1.05rem",
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {update.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Subscribe to Updates */}
                <div
                    style={{
                        background: "rgba(30, 41, 59, 0.5)",
                        backdropFilter: "blur(8px)",
                        borderRadius: "1rem",
                        border: "1px solid #334155",
                        padding: isMobile ? "1.5rem 1.25rem" : "2rem",
                        textAlign: "center",
                        marginTop: isMobile ? "2rem" : "3rem",
                    }}
                >
                    <h2 style={{ color: "#38bdf8", fontSize: isMobile ? "1.25rem" : "1.5rem", fontWeight: 700, marginBottom: isMobile ? "0.75rem" : "1rem" }}>
                        🔔 Get Notified of Updates
                    </h2>
                    <p style={{ color: "#94a3b8", fontSize: isMobile ? "0.95rem" : "1.1rem", marginBottom: isMobile ? "1.25rem" : "1.5rem" }}>
                        Subscribe to receive email notifications when we ship new features
                    </p>
                    <div style={{ display: "flex", gap: isMobile ? "0.75rem" : "1rem", maxWidth: "500px", margin: "0 auto", flexDirection: isCompact ? "column" : "row" }}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            style={{
                                flex: 1,
                                padding: isMobile ? "0.65rem" : "0.75rem",
                                borderRadius: "0.375rem",
                                border: "1px solid #334155",
                                background: "rgba(15, 23, 42, 0.5)",
                                color: "#ffffff",
                                fontSize: isMobile ? "0.9rem" : "1rem",
                            }}
                        />
                        <button
                            style={{
                                background: "linear-gradient(to right, #38bdf8, #818cf8)",
                                color: "#0f172a",
                                padding: isMobile ? "0.65rem 1.25rem" : "0.75rem 1.5rem",
                                borderRadius: "0.375rem",
                                borderTop: "none",
                                borderLeft: "none",
                                borderRight: "none",
                                borderBottom: "none",
                                cursor: "pointer",
                                fontWeight: 600,
                                fontSize: isMobile ? "0.9rem" : "1rem",
                            }}
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </main>
            <LandingFooter />
        </div>
    );
};

export default Updates;
