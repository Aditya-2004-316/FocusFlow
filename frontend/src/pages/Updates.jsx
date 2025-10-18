import React from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../styles/CardHover.css";

const updates = [
    {
        date: "2024-06-01",
        title: "Improved Landing Footer Design",
        description:
            "The landing page footer has been redesigned for better spacing, clarity, and modern aesthetics.",
    },
    {
        date: "2024-05-28",
        title: "Feature Cards Grid Update",
        description:
            "Features page now displays 4 cards per row for a more consistent and visually appealing layout.",
    },
    {
        date: "2024-05-20",
        title: "Community Page Revamp",
        description:
            "The Community page now has a modern hero section, action cards, and improved color and spacing.",
    },
    {
        date: "2024-05-10",
        title: "FAQ and Testimonials Enhancements",
        description:
            "FAQ and Testimonials pages now feature improved spacing, color, and modern layouts for better user experience.",
    },
];

const cardStyle = {
    background: "rgba(30, 41, 59, 0.5)",
    backdropFilter: "blur(8px)",
    borderRadius: "1rem",
    border: "1px solid #334155",
    padding: "1.5rem 1.5rem 1rem 1.5rem",
    marginBottom: "1.5rem",
    transition: "all 0.3s ease",
};

const Updates = () => (
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
                maxWidth: 700,
                margin: "-2.5rem auto 2rem auto",
                padding: "1rem",
            }}
        >
            {updates.map((update, idx) => (
                <div key={idx} className="hover-card" style={cardStyle}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 8,
                        }}
                    >
                        <span
                            style={{
                                color: "#a78bfa",
                                fontWeight: 600,
                                fontSize: "1.05rem",
                                marginRight: 16,
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
            ))}
        </main>
        <LandingFooter />
    </div>
);

export default Updates;
