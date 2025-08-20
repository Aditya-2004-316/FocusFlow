import React from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../LandingPage/LandingPage.css";

const Features = () => {
    const features = [
        {
            icon: "⏰",
            title: "Focus Timer",
            description:
                "Customizable Pomodoro timer with focus and break sessions. Track your productivity and maintain a healthy work-life balance.",
        },
        {
            icon: "📊",
            title: "Productivity Analytics",
            description:
                "Detailed insights into your work patterns, focus sessions, and productivity trends. Make data-driven decisions to improve your workflow.",
        },
        {
            icon: "👥",
            title: "Community Features",
            description:
                "Connect with like-minded individuals, share your progress, and participate in productivity challenges with our growing community.",
        },
        {
            icon: "📚",
            title: "Resource Library",
            description:
                "Access a curated collection of productivity tips, articles, and guides to help you optimize your workflow and achieve your goals.",
        },
        {
            icon: "🔔",
            title: "Smart Notifications",
            description:
                "Customizable reminders and notifications to keep you on track and maintain your focus throughout the day.",
        },
        {
            icon: "⚙️",
            title: "Customizable Settings",
            description:
                "Personalize your experience with adjustable timer settings, themes, and preferences to match your workflow.",
        },
        {
            icon: "📈",
            title: "Progress Tracking",
            description:
                "Monitor your daily, weekly, and monthly progress with detailed statistics and visual representations of your achievements.",
        },
        {
            icon: "🎯",
            title: "Goal Setting",
            description:
                "Set and track your productivity goals, celebrate milestones, and continuously improve your focus and efficiency.",
        },
    ];

    return (
        <div className="landing-page">
            <LandingNavbar />
            <main className="features-section">
                <div className="features-container">
                    <h1
                        className="features-title"
                        style={{ color: "var(--color-primary-900)" }}
                    >
                        Features
                    </h1>
                    <p
                        className="hero-subtitle"
                        style={{
                            textAlign: "center",
                            maxWidth: "36rem",
                            margin: "0 auto 3rem",
                            color: "var(--color-primary-900)",
                        }}
                    >
                        Discover the powerful tools and features designed to
                        help you stay focused, track your progress, and achieve
                        your productivity goals.
                    </p>
                    <div
                        className="features-grid"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: "2rem",
                            marginTop: "3rem",
                        }}
                    >
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div
                                    style={{
                                        fontSize: "2.5rem",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    {feature.icon}
                                </div>
                                <h3 className="feature-title">
                                    {feature.title}
                                </h3>
                                <p className="feature-description">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <LandingFooter />
        </div>
    );
};

export default Features;
