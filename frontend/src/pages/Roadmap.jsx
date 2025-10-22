import React, { useState } from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../styles/CardHover.css";

const Roadmap = () => {
    const [votes, setVotes] = useState({
        browserExtension: 1234,
        notionIntegration: 987,
        offlineMode: 856,
        customThemes: 743,
        slackIntegration: 621,
    });

    const handleVote = (featureKey) => {
        setVotes(prev => ({
            ...prev,
            [featureKey]: prev[featureKey] + 1
        }));
    };

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
                    🗺️ Product Roadmap
                </h1>
                <p
                    style={{
                        color: "#94a3b8",
                        fontSize: "1.2rem",
                        maxWidth: 700,
                        margin: "0 auto",
                        lineHeight: 1.6,
                    }}
                >
                    See what we're building next and help shape the future of FocusFlow.
                    Your feedback drives our roadmap!
                </p>
            </section>

            <main
                style={{
                    maxWidth: 1200,
                    margin: "-2rem auto 2rem auto",
                    padding: "1rem",
                }}
            >
                {/* Now / Next / Later Format */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
                    {/* Now */}
                    <div
                        className="hover-card"
                        style={{
                            background: "rgba(30, 41, 59, 0.5)",
                            backdropFilter: "blur(8px)",
                            borderRadius: "1rem",
                            border: "1px solid #334155",
                            padding: "2rem",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <h2 style={{ color: "#38bdf8", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
                            🚀 Now (In Development)
                        </h2>
                        <ul style={{ listStyle: "none", padding: 0, color: "#94a3b8", fontSize: "1.05rem", lineHeight: 2 }}>
                            <li>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                                    <span>✓ Mobile App (iOS & Android)</span>
                                    <span style={{ color: "#38bdf8", fontSize: "0.9rem" }}>80%</span>
                                </div>
                                <div style={{ width: "100%", height: "6px", background: "#334155", borderRadius: "3px", overflow: "hidden" }}>
                                    <div style={{ width: "80%", height: "100%", background: "linear-gradient(to right, #0ea5e9, #38bdf8)" }}></div>
                                </div>
                            </li>
                            <li style={{ marginTop: "1rem" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                                    <span>✓ Calendar Integration</span>
                                    <span style={{ color: "#38bdf8", fontSize: "0.9rem" }}>60%</span>
                                </div>
                                <div style={{ width: "100%", height: "6px", background: "#334155", borderRadius: "3px", overflow: "hidden" }}>
                                    <div style={{ width: "60%", height: "100%", background: "linear-gradient(to right, #0ea5e9, #38bdf8)" }}></div>
                                </div>
                            </li>
                            <li style={{ marginTop: "1rem" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                                    <span>✓ Team Workspaces</span>
                                    <span style={{ color: "#38bdf8", fontSize: "0.9rem" }}>40%</span>
                                </div>
                                <div style={{ width: "100%", height: "6px", background: "#334155", borderRadius: "3px", overflow: "hidden" }}>
                                    <div style={{ width: "40%", height: "100%", background: "linear-gradient(to right, #0ea5e9, #38bdf8)" }}></div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Next */}
                    <div
                        className="hover-card"
                        style={{
                            background: "rgba(30, 41, 59, 0.5)",
                            backdropFilter: "blur(8px)",
                            borderRadius: "1rem",
                            border: "1px solid #334155",
                            padding: "2rem",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <h2 style={{ color: "#38bdf8", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
                            ⏭️ Next (Next 3 Months)
                        </h2>
                        <ul style={{ listStyle: "none", padding: 0, color: "#94a3b8", fontSize: "1.05rem", lineHeight: 2 }}>
                            <li>○ AI-Powered Insights</li>
                            <li>○ Habit Tracking</li>
                            <li>○ Advanced Reporting</li>
                            <li>○ Custom Themes</li>
                            <li>○ Pomodoro Variations</li>
                        </ul>
                    </div>

                    {/* Later */}
                    <div
                        className="hover-card"
                        style={{
                            background: "rgba(30, 41, 59, 0.5)",
                            backdropFilter: "blur(8px)",
                            borderRadius: "1rem",
                            border: "1px solid #334155",
                            padding: "2rem",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <h2 style={{ color: "#38bdf8", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
                            🔮 Later (Future)
                        </h2>
                        <ul style={{ listStyle: "none", padding: 0, color: "#94a3b8", fontSize: "1.05rem", lineHeight: 2 }}>
                            <li>○ API for Developers</li>
                            <li>○ Browser Extension</li>
                            <li>○ Desktop App</li>
                            <li>○ Integrations (Notion, Slack, etc.)</li>
                            <li>○ White-label Options</li>
                        </ul>
                    </div>
                </div>

                {/* Quarterly Roadmap */}
                <div
                    className="hover-card"
                    style={{
                        background: "rgba(30, 41, 59, 0.5)",
                        backdropFilter: "blur(8px)",
                        borderRadius: "1rem",
                        border: "1px solid #334155",
                        padding: "2rem",
                        marginBottom: "3rem",
                        transition: "all 0.3s ease",
                    }}
                >
                    <h2 style={{ color: "#38bdf8", fontSize: "1.8rem", fontWeight: 700, marginBottom: "2rem" }}>
                        📅 Quarterly Roadmap
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
                        {[
                            { quarter: "Q1 2025 (Jan-Mar)", items: ["Mobile App Launch", "Calendar Sync", "Team Features Beta"] },
                            { quarter: "Q2 2025 (Apr-Jun)", items: ["AI Insights", "Habit Tracking", "Advanced Analytics"] },
                            { quarter: "Q3 2025 (Jul-Sep)", items: ["API Release", "Browser Extension", "Desktop App Beta"] },
                            { quarter: "Q4 2025 (Oct-Dec)", items: ["Enterprise Features", "White-label Options", "Advanced Integrations"] },
                        ].map((q, idx) => (
                            <div key={idx}>
                                <h3 style={{ color: "#ffffff", fontSize: "1.1rem", fontWeight: 600, marginBottom: "1rem" }}>
                                    {q.quarter}
                                </h3>
                                <ul style={{ listStyle: "none", padding: 0, color: "#94a3b8", fontSize: "1rem", lineHeight: 1.8 }}>
                                    {q.items.map((item, i) => (
                                        <li key={i}>├─ {item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Feature Voting */}
                <div
                    className="hover-card"
                    style={{
                        background: "rgba(30, 41, 59, 0.5)",
                        backdropFilter: "blur(8px)",
                        borderRadius: "1rem",
                        border: "1px solid #334155",
                        padding: "2rem",
                        marginBottom: "3rem",
                        transition: "all 0.3s ease",
                    }}
                >
                    <h2 style={{ color: "#38bdf8", fontSize: "1.8rem", fontWeight: 700, marginBottom: "1rem" }}>
                        🗳️ Vote on What's Next
                    </h2>
                    <p style={{ color: "#94a3b8", fontSize: "1.1rem", marginBottom: "2rem" }}>
                        Help us prioritize! Vote for features you want most:
                    </p>
                    <div style={{ display: "grid", gap: "1rem" }}>
                        {[
                            { key: "browserExtension", name: "Browser Extension (Chrome, Firefox)", votes: votes.browserExtension },
                            { key: "notionIntegration", name: "Notion Integration", votes: votes.notionIntegration },
                            { key: "offlineMode", name: "Offline Mode", votes: votes.offlineMode },
                            { key: "customThemes", name: "Custom Themes", votes: votes.customThemes },
                            { key: "slackIntegration", name: "Slack Integration", votes: votes.slackIntegration },
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "1rem",
                                    background: "rgba(15, 23, 42, 0.5)",
                                    borderRadius: "0.5rem",
                                    border: "1px solid #334155",
                                }}
                            >
                                <span style={{ color: "#ffffff", fontSize: "1.05rem" }}>
                                    {idx + 1}. {feature.name}
                                </span>
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                    <span style={{ color: "#94a3b8", fontSize: "1rem" }}>
                                        {feature.votes} votes
                                    </span>
                                    <button
                                        onClick={() => handleVote(feature.key)}
                                        style={{
                                            background: "linear-gradient(to right, #0ea5e9, #0ea5e9)",
                                            color: "#ffffff",
                                            padding: "0.5rem 1rem",
                                            borderRadius: "0.375rem",
                                            border: "none",
                                            cursor: "pointer",
                                            fontWeight: 600,
                                            fontSize: "0.9rem",
                                        }}
                                    >
                                        Vote
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recently Shipped */}
                <div
                    className="hover-card"
                    style={{
                        background: "rgba(30, 41, 59, 0.5)",
                        backdropFilter: "blur(8px)",
                        borderRadius: "1rem",
                        border: "1px solid #334155",
                        padding: "2rem",
                        marginBottom: "3rem",
                        transition: "all 0.3s ease",
                    }}
                >
                    <h2 style={{ color: "#38bdf8", fontSize: "1.8rem", fontWeight: 700, marginBottom: "1rem" }}>
                        ✅ Recently Shipped
                    </h2>
                    <ul style={{ listStyle: "none", padding: 0, color: "#94a3b8", fontSize: "1.05rem", lineHeight: 2 }}>
                        <li>• Dark Mode Improvements (Jan 15, 2025)</li>
                        <li>• Performance Optimizations (Jan 10, 2025)</li>
                        <li>• New Analytics Dashboard (Dec 20, 2024)</li>
                        <li>• Mobile-Responsive Design (Dec 15, 2024)</li>
                    </ul>
                    <a
                        href="/updates"
                        style={{
                            color: "#38bdf8",
                            fontSize: "1rem",
                            fontWeight: 600,
                            textDecoration: "underline",
                            marginTop: "1rem",
                            display: "inline-block",
                        }}
                    >
                        View All Updates →
                    </a>
                </div>

                {/* Development Stats */}
                <div
                    className="hover-card"
                    style={{
                        background: "rgba(30, 41, 59, 0.5)",
                        backdropFilter: "blur(8px)",
                        borderRadius: "1rem",
                        border: "1px solid #334155",
                        padding: "2rem",
                        marginBottom: "3rem",
                        transition: "all 0.3s ease",
                        textAlign: "center",
                    }}
                >
                    <h2 style={{ color: "#38bdf8", fontSize: "1.8rem", fontWeight: 700, marginBottom: "2rem" }}>
                        📊 Development Transparency
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
                        {[
                            { number: "45", label: "Features in Backlog" },
                            { number: "8", label: "In Development" },
                            { number: "127", label: "Features Shipped" },
                            { number: "2,341", label: "Community Votes" },
                        ].map((stat, idx) => (
                            <div key={idx}>
                                <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#38bdf8", marginBottom: "0.5rem" }}>
                                    {stat.number}
                                </div>
                                <div style={{ fontSize: "1rem", color: "#94a3b8" }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Subscribe Section */}
                <div
                    style={{
                        background: "rgba(30, 41, 59, 0.5)",
                        backdropFilter: "blur(8px)",
                        borderRadius: "1rem",
                        border: "1px solid #334155",
                        padding: "2rem",
                        textAlign: "center",
                    }}
                >
                    <h2 style={{ color: "#38bdf8", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
                        🔔 Stay Updated
                    </h2>
                    <p style={{ color: "#94a3b8", fontSize: "1.1rem", marginBottom: "1.5rem" }}>
                        Get notified when features you voted for ship
                    </p>
                    <div style={{ display: "flex", gap: "1rem", maxWidth: "500px", margin: "0 auto", marginBottom: "1.5rem" }}>
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
                    <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
                        Or follow our progress on{" "}
                        <a href="https://github.com" style={{ color: "#38bdf8", textDecoration: "underline" }}>GitHub</a>
                        {" • "}
                        <a href="https://twitter.com" style={{ color: "#38bdf8", textDecoration: "underline" }}>Twitter</a>
                        {" • "}
                        <a href="https://discord.com" style={{ color: "#38bdf8", textDecoration: "underline" }}>Discord</a>
                    </p>
                </div>
            </main>
            <LandingFooter />
        </div>
    );
};

export default Roadmap;
