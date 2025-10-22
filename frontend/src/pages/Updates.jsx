import React, { useState } from "react";
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

const cardStyle = {
    background: "rgba(30, 41, 59, 0.5)",
    backdropFilter: "blur(8px)",
    borderRadius: "1rem",
    border: "1px solid #334155",
    padding: "1.5rem 1.5rem 1rem 1.5rem",
    marginBottom: "1.5rem",
    transition: "all 0.3s ease",
};

const Updates = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const displayUpdates = selectedCategory === "All" 
        ? allUpdates 
        : updatesByCategory[selectedCategory];

    return (
    <div style={{ background: "#0f172a", minHeight: "100vh", color: "#ffffff" }}>
        <LandingNavbar />
        {/* Hero Section */}
        <section
            style={{
                padding: "5rem 2rem 2rem 2rem",
                textAlign: "center",
            }}
        >
            <h1
                style={{
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "1rem",
                }}
            >
                Latest Updates
            </h1>
            <p
                style={{
                    color: "#94a3b8",
                    fontSize: "1.2rem",
                    maxWidth: 600,
                    margin: "0 auto",
                    lineHeight: 1.6,
                }}
            >
                Stay up to date with the newest features, improvements, and
                announcements from FocusFlow.
            </p>
        </section>
        <main
            style={{
                maxWidth: 900,
                margin: "-2.5rem auto 2rem auto",
                padding: "1rem",
            }}
        >
            {/* Category Filter */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2rem", justifyContent: "center" }}>
                {["All", ...Object.keys(updatesByCategory)].map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        style={{
                            padding: "0.5rem 1rem",
                            borderRadius: "9999px",
                            border: selectedCategory === category ? "1px solid #38bdf8" : "1px solid #334155",
                            background: selectedCategory === category ? "rgba(56, 189, 248, 0.1)" : "rgba(30, 41, 59, 0.5)",
                            color: selectedCategory === category ? "#38bdf8" : "#94a3b8",
                            cursor: "pointer",
                            fontSize: "0.9rem",
                            fontWeight: selectedCategory === category ? 600 : 400,
                            transition: "all 0.2s",
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Timeline View */}
            <div style={{ position: "relative", paddingLeft: "2rem" }}>
                {/* Timeline Line */}
                <div style={{
                    position: "absolute",
                    left: "0.5rem",
                    top: 0,
                    bottom: 0,
                    width: "2px",
                    background: "linear-gradient(to bottom, #38bdf8, #0ea5e9)",
                }}></div>

                {displayUpdates.map((update, idx) => (
                    <div key={idx} style={{ position: "relative", marginBottom: "2rem" }}>
                        {/* Timeline Dot */}
                        <div style={{
                            position: "absolute",
                            left: "-1.5rem",
                            top: "1.5rem",
                            width: "1rem",
                            height: "1rem",
                            borderRadius: "50%",
                            background: "#38bdf8",
                            border: "3px solid #0f172a",
                        }}></div>

                        <div className="hover-card" style={cardStyle}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: 8,
                                    flexWrap: "wrap",
                                    gap: "1rem",
                                }}
                            >
                                <span
                                    style={{
                                        color: "#38bdf8",
                                        fontWeight: 600,
                                        fontSize: "1.05rem",
                                    }}
                                >
                                    {update.date}
                                </span>
                                <span
                                    style={{
                                        fontWeight: 600,
                                        color: "#ffffff",
                                        fontSize: "1.13rem",
                                    }}
                                >
                                    {update.title}
                                </span>
                            </div>
                            <div
                                style={{
                                    color: "#94a3b8",
                                    fontSize: "1.05rem",
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
                    padding: "2rem",
                    textAlign: "center",
                    marginTop: "3rem",
                }}
            >
                <h2 style={{ color: "#38bdf8", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
                    🔔 Get Notified of Updates
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "1.1rem", marginBottom: "1.5rem" }}>
                    Subscribe to receive email notifications when we ship new features
                </p>
                <div style={{ display: "flex", gap: "1rem", maxWidth: "500px", margin: "0 auto" }}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        style={{
                            flex: 1,
                            padding: "0.75rem",
                            borderRadius: "0.375rem",
                            border: "1px solid #334155",
                            background: "rgba(15, 23, 42, 0.5)",
                            color: "#ffffff",
                            fontSize: "1rem",
                        }}
                    />
                    <button
                        style={{
                            background: "linear-gradient(to right, #0ea5e9, #0ea5e9)",
                            color: "#ffffff",
                            padding: "0.75rem 1.5rem",
                            borderRadius: "0.375rem",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: 600,
                            fontSize: "1rem",
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
