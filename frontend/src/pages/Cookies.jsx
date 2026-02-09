import React from "react";
import useResponsive from "../hooks/useResponsive";
import {
    FaCookieBite,
    FaShieldAlt,
    FaSlidersH,
    FaInfoCircle,
    FaCheckCircle,
    FaClipboardCheck,
    FaLock,
    FaSyncAlt,
} from "react-icons/fa";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";

const heroStats = [
    { label: "Types", value: "3 Categories", meta: "Essentials to Custom" },
    { label: "Privacy", value: "Opt-in only", meta: "For non-essential data" },
    { label: "Lifespan", value: "30 days max", meta: "For most analytics" },
];

const cookieSections = [
    {
        badge: "Essential",
        title: "Strictly Necessary Cookies",
        summary: "Keep FocusFlow secure and your sessions active.",
        detail: "These are required for basic site functionality like signing in, security, and remembering your authentication state.",
        meta: "Always active",
        icon: <FaShieldAlt />,
        examples: ["Session tokens", "CSRF protection", "Load balancing"],
    },
    {
        badge: "Analytics",
        title: "Performance & Insights",
        summary: "Help us understand how users interact with our tools.",
        detail: "We use these to measure which features are most popular and track site performance. Data is anonymized.",
        meta: "Opt-in / Opt-out",
        icon: <FaInfoCircle />,
        examples: ["Feature usage", "Page load speeds", "Error logs"],
    },
    {
        badge: "Custom",
        title: "Preference Cookies",
        summary: "Remember choices you make like your theme, language, and custom timers.",
        detail: "These provide a personal touch. If disabled, your dashboard will revert to defaults every time you refresh.",
        meta: "User preference driven",
        icon: <FaSlidersH />,
        examples: ["Dark mode toggle", "Study presets", "Sidebar state"],
    },
];

const checklist = [
    "Manage your preferences in the Shield settings",
    "Clear cookies via your browser anytime",
    "Essential cookies cannot be disabled",
    "Data is never sold to 3rd party advertisers",
];

const Cookies = () => {
    const { isMobile, isTablet, width } = useResponsive();

    const getStyles = () => ({
        page: {
            minHeight: "100vh",
            background: "linear-gradient(185deg, #040915 0%, #101a31 55%, #050b18 100%)",
            color: "#ffffff",
            overflowX: "hidden",
        },
        hero: {
            position: "relative",
            padding: isMobile ? "3rem 1rem 2.5rem" : "6.2rem 2rem 4.5rem",
            overflow: "hidden",
        },
        heroGlow: {
            position: "absolute",
            inset: "-260px auto auto 50%",
            transform: "translateX(-50%)",
            width: isMobile ? "500px" : "780px",
            height: isMobile ? "500px" : "780px",
            background: "radial-gradient(circle at center, rgba(56, 189, 248, 0.22), transparent 68%)",
            filter: "blur(18px)",
        },
        container: {
            maxWidth: "1100px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
        },
        heroInner: {
            display: "grid",
            gap: isMobile ? "1.4rem" : "1.8rem",
            textAlign: "center",
            justifyItems: "center",
        },
        heroBadge: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: isMobile ? "0.45rem 1rem" : "0.55rem 1.15rem",
            borderRadius: "9999px",
            border: "1px solid rgba(56, 189, 248, 0.45)",
            background: "rgba(15, 23, 42, 0.7)",
            color: "#38bdf8",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontSize: isMobile ? "0.75rem" : "0.82rem",
            fontWeight: 600,
        },
        heroTitle: {
            fontSize: isMobile ? "1.85rem" : isTablet ? "2.5rem" : "3.15rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            margin: 0,
            background: "linear-gradient(115deg, #38bdf8, #60a5fa, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            padding: isMobile ? "0 0.5rem" : "0",
        },
        heroLead: {
            maxWidth: "46rem",
            color: "#cbd5f5",
            fontSize: isMobile ? "0.95rem" : "1.16rem",
            lineHeight: 1.78,
            padding: isMobile ? "0 0.5rem" : "0",
        },
        statRow: {
            display: "grid",
            gridTemplateColumns: width >= 768 ? "repeat(3, 1fr)" : "1fr",
            gap: isMobile ? "0.9rem" : "1.3rem",
            width: "100%",
        },
        statCard: {
            padding: isMobile ? "1.25rem" : "1.55rem",
            borderRadius: "1.1rem",
            background: "rgba(18, 28, 48, 0.82)",
            border: "1px solid rgba(148, 163, 184, 0.3)",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: "0.45rem",
            boxShadow: "0 28px 55px -34px rgba(56, 189, 248, 0.55)",
        },
        statValue: {
            fontSize: isMobile ? "1.6rem" : "1.92rem",
            fontWeight: 700,
            color: "#38bdf8",
        },
        statLabel: {
            color: "#9fb2d6",
            fontSize: isMobile ? "0.88rem" : "0.96rem",
        },
        statMeta: {
            color: "#38bdf8",
            fontSize: isMobile ? "0.75rem" : "0.82rem",
            fontWeight: 600,
        },
        main: {
            padding: isMobile ? "2.5rem 1rem 3rem" : "4.8rem 2rem 4.2rem",
        },
        section: {
            marginBottom: isMobile ? "3rem" : "4.2rem",
        },
        sectionHeader: {
            marginBottom: isMobile ? "1.75rem" : "2.2rem",
            textAlign: "center",
            display: "grid",
            gap: "0.6rem",
            justifyItems: "center",
        },
        sectionTitle: {
            fontSize: isMobile ? "1.5rem" : isTablet ? "1.8rem" : "2.1rem",
            fontWeight: 700,
            color: "#f8fafc",
            padding: isMobile ? "0 0.5rem" : "0",
        },
        sectionLead: {
            maxWidth: "46rem",
            fontSize: isMobile ? "0.92rem" : "1.02rem",
            lineHeight: 1.72,
            color: "#94a3b8",
            padding: isMobile ? "0 0.5rem" : "0",
        },
        cardGrid: {
            display: "grid",
            gridTemplateColumns: width >= 900 ? "repeat(3, 1fr)" : "1fr",
            gap: isMobile ? "1.1rem" : "1.6rem",
        },
        cookieCard: {
            padding: isMobile ? "1.5rem" : "1.85rem",
            borderRadius: "1.2rem",
            background: "rgba(15, 24, 42, 0.82)",
            border: "1px solid rgba(56, 189, 248, 0.2)",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
        },
        cardIcon: {
            fontSize: "1.5rem",
            color: "#38bdf8",
            marginBottom: "0.5rem",
        },
        cardBadge: {
            display: "inline-block",
            padding: "0.25rem 0.75rem",
            borderRadius: "999px",
            background: "rgba(56, 189, 248, 0.12)",
            color: "#38bdf8",
            fontSize: "0.75rem",
            fontWeight: 600,
            width: "fit-content",
        },
        cardTitle: {
            fontSize: isMobile ? "1.08rem" : "1.2rem",
            fontWeight: 600,
            color: "#f8fafc",
        },
        cardSummary: {
            color: "#9fb2d6",
            fontSize: isMobile ? "0.88rem" : "0.94rem",
            lineHeight: 1.65,
        },
        cardDetail: {
            color: "#94a3b8",
            fontSize: isMobile ? "0.85rem" : "0.92rem",
            lineHeight: 1.65,
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "0.75rem",
            marginTop: "0.5rem",
        },
        checklistGrid: {
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: "1rem",
            marginTop: "2rem",
        },
        checkItem: {
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1rem",
            borderRadius: "0.75rem",
            background: "rgba(18, 28, 48, 0.5)",
            border: "1px solid rgba(56, 189, 248, 0.1)",
        },
    });

    const styles = getStyles();

    return (
        <div style={styles.page}>
            <LandingNavbar />
            <section style={styles.hero}>
                <div style={styles.heroGlow} />
                <div style={styles.container}>
                    <div style={styles.heroInner}>
                        <span style={styles.heroBadge}>FocusFlow transparency</span>
                        <h1 style={styles.heroTitle}>Cookie Policy</h1>
                        <p style={styles.heroLead}>
                            We use cookies to maintain your focus flow—remembering your settings, securing your sessions,
                            and improving your productivity experience.
                        </p>
                        <div style={styles.statRow}>
                            {heroStats.map((stat) => (
                                <div key={stat.label} style={styles.statCard}>
                                    <span style={styles.statValue}>{stat.value}</span>
                                    <span style={styles.statLabel}>{stat.label}</span>
                                    <span style={styles.statMeta}>{stat.meta}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <main style={styles.main}>
                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>Cookie Categories</h2>
                            <p style={styles.sectionLead}>
                                Explore what every category does and how long they stay on your device.
                            </p>
                        </div>
                        <div style={styles.cardGrid}>
                            {cookieSections.map((section) => (
                                <div key={section.title} style={styles.cookieCard}>
                                    <div style={styles.cardIcon}>{section.icon}</div>
                                    <div style={styles.cardBadge}>{section.badge}</div>
                                    <h3 style={styles.cardTitle}>{section.title}</h3>
                                    <p style={styles.cardSummary}>{section.summary}</p>
                                    <div style={styles.cardDetail}>{section.detail}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>Your Control</h2>
                            <p style={styles.sectionLead}>
                                We believe in full transparency. You can adjust your preferences anytime.
                            </p>
                        </div>
                        <div style={styles.checklistGrid}>
                            {checklist.map((item, idx) => (
                                <div key={idx} style={styles.checkItem}>
                                    <FaCheckCircle style={{ color: "#38bdf8" }} />
                                    <span style={{ color: "#cbd5f5", fontSize: "0.95rem" }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <LandingFooter />
        </div>
    );
};

export default Cookies;
