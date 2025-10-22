import React from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../styles/CardHover.css";

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

    const styles = {
        landingPage: {
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, #0f172a, #1e293b, #0f172a)',
            color: '#ffffff',
        },
        featuresSection: {
            padding: '5rem 2rem',
            background: 'rgba(15, 23, 42, 0.5)',
        },
        featuresContainer: {
            maxWidth: '1200px',
            margin: '0 auto',
        },
        featuresTitle: {
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '3rem',
        },
        featuresGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            marginTop: '3rem',
        },
        featureCard: {
            background: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(8px)',
            padding: '2rem',
            borderRadius: '1rem',
            transition: 'all 0.3s ease',
            border: '1px solid #334155',
        },
        featureCardHover: {
            transform: 'translateY(-4px)',
            borderColor: 'rgba(167, 139, 250, 0.5)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        },
        featureTitle: {
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#38bdf8',
            marginBottom: '1rem',
        },
        featureDescription: {
            color: '#94a3b8',
            lineHeight: '1.6',
        },
    };

    return (
        <div style={styles.landingPage}>
            <LandingNavbar />
            <main style={styles.featuresSection}>
                <div style={styles.featuresContainer}>
                    <h1 style={styles.featuresTitle}>
                        Features
                    </h1>
                    <p
                        style={{
                            textAlign: "center",
                            maxWidth: "36rem",
                            margin: "0 auto 3rem",
                            color: "#94a3b8",
                            fontSize: "1.25rem",
                            lineHeight: "1.6",
                        }}
                    >
                        Discover the powerful tools and features designed to
                        help you stay focused, track your progress, and achieve
                        your productivity goals.
                    </p>
                    <div style={styles.featuresGrid}>
                        {features.map((feature, index) => (
                            <div 
                                key={index} 
                                className="hover-card"
                                style={styles.featureCard}
                            >
                                <div
                                    style={{
                                        fontSize: "2.5rem",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    {feature.icon}
                                </div>
                                <h3 style={styles.featureTitle}>
                                    {feature.title}
                                </h3>
                                <p style={styles.featureDescription}>
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
