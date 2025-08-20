import React from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";

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
    background: "var(--color-white)",
    borderRadius: "1rem",
    boxShadow: "var(--shadow-soft)",
    padding: "1.5rem 1.5rem 1rem 1.5rem",
    marginBottom: "1.5rem",
    transition: "box-shadow 0.2s, transform 0.2s",
};

const Updates = () => (
    <div style={{ background: "var(--color-gray-50)", minHeight: "100vh" }}>
        <LandingNavbar />
        {/* Hero Section */}
        <section
            style={{
                background:
                    "linear-gradient(90deg, var(--color-primary-400) 0%, var(--color-cyan-300) 100%)",
                padding: "3rem 1rem 2rem 1rem",
                textAlign: "center",
            }}
        >
            <h1
                style={{
                    fontSize: "2.2rem",
                    fontWeight: 800,
                    color: "var(--color-primary-900)",
                    marginBottom: "0.7rem",
                }}
            >
                Latest Updates
            </h1>
            <p
                style={{
                    color: "var(--color-primary-900)",
                    fontSize: "1.15rem",
                    maxWidth: 600,
                    margin: "0 auto",
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
                <div key={idx} style={cardStyle}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 8,
                        }}
                    >
                        <span
                            style={{
                                color: "var(--color-primary-600)",
                                fontWeight: 700,
                                fontSize: "1.05rem",
                                marginRight: 16,
                            }}
                        >
                            {update.date}
                        </span>
                        <span
                            style={{
                                fontWeight: 700,
                                color: "var(--color-primary-900)",
                                fontSize: "1.13rem",
                            }}
                        >
                            {update.title}
                        </span>
                    </div>
                    <div
                        style={{
                            color: "var(--color-gray-700)",
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
