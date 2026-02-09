import React from "react";
import useResponsive from "../hooks/useResponsive";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import { FaLayerGroup, FaPalette, FaGraduationCap } from "react-icons/fa";
import "../styles/CardHover.css";

const marqueeLogos = [
    { name: "Orbit Labs" },
    { name: "Northwind Collective" },
    { name: "Launchpad Co." },
    { name: "Atlas Solutions" },
    { name: "Delta Ventures" },
];

const testimonialQuotes = [
    {
        quote:
            "FocusFlow is the first platform that blends rituals, timers, and analytics in a way my entire team actually adopts.",
        author: "Sarah Johnson",
        role: "Head of Operations · Orbit Labs",
    },
    {
        quote:
            "We shaved two hours off every sprint planning meeting. Seeing where focus time goes unlocked a new level of transparency.",
        author: "Michael Chen",
        role: "Engineering Manager · Launchpad Co.",
    },
    {
        quote:
            "As a solo creator, the community and weekly retros help me stay accountable. My shipping cadence has tripled.",
        author: "Emily Rodriguez",
        role: "Product Designer · Freelance",
    },
    {
        quote:
            "Students in our lab rely on FocusFlow to structure long study blocks. The habit streaks keep morale high during exam season.",
        author: "Alex Martinez",
        role: "Program Director · Grad Prep Lab",
    },
    {
        quote:
            "FocusFlow’s distraction logging revealed our meeting overload. We rebalanced calendars and boosted output by 25%.",
        author: "David Kim",
        role: "Director of Marketing · Northwind Collective",
    },
    {
        quote:
            "The AI summaries surface patterns I would have missed. It’s like having a coach recapping every week’s momentum shifts.",
        author: "Jessica Lee",
        role: "Lead Analyst · Atlas Solutions",
    },
];

const successStats = [
    {
        label: "Average focus score",
        value: "4.8/5",
        caption: "Based on 1,200 performance reviews across cohorts",
    },
    {
        label: "Hours reclaimed per member",
        value: "+6.5",
        caption: "Median hours regained each month after distraction audits",
    },
    {
        label: "Team adoption",
        value: "93%",
        caption: "Users logging at least three focus blocks per week",
    },
];

const industryPanels = [
    {
        title: "High-performing product teams",
        icon: FaLayerGroup,
        points: [
            "Protect deep work time with calendar sync",
            "Run async stand-ups with ritual templates",
            "Share sprint wins via auto-generated recaps",
        ],
    },
    {
        title: "Creatives & makers",
        icon: FaPalette,
        points: [
            "Blend focus blocks with wellness resets",
            "Log inspiration snippets right from breaks",
            "Showcase progress in a polished portfolio view",
        ],
    },
    {
        title: "Students & educators",
        icon: FaGraduationCap,
        points: [
            "Plan revision cycles with adaptive timers",
            "Track active recall vs. passive study time",
            "Celebrate cohorts with streak spotlights",
        ],
    },
];

const Testimonials = () => {
    const { isMobile, isTablet, width } = useResponsive();
    const isCompact = width < 600;

    const getStyles = () => ({
        page: {
            minHeight: "100vh",
            background: "linear-gradient(180deg, #0b1120 0%, #111c33 55%, #0b1120 100%)",
            color: "#ffffff",
        },
        hero: {
            padding: isMobile ? "4rem 1rem 2.5rem" : "5.5rem 2rem 4rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
        },
        heroPulse: {
            position: "absolute",
            inset: "-140px auto auto -80px",
            width: isMobile ? "200px" : "360px",
            height: isMobile ? "200px" : "360px",
            background: "radial-gradient(circle at center, rgba(56, 189, 248, 0.2), transparent 62%)",
            filter: "blur(8px)",
        },
        heroInner: {
            maxWidth: "820px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
        },
        heroTitle: {
            fontSize: isMobile ? "1.7rem" : isTablet ? "2.5rem" : "3.25rem",
            fontWeight: 800,
            letterSpacing: "-0.035em",
            marginBottom: "1rem",
            padding: isMobile ? "0 0.5rem" : "0",
        },
        heroHighlight: {
            background: "linear-gradient(120deg, #38bdf8, #60a5fa, #94a3ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
        },
        heroSubtitle: {
            fontSize: isMobile ? "0.9rem" : "1.22rem",
            lineHeight: 1.72,
            color: "#cbd5f5",
            padding: isMobile ? "0 0.5rem" : "0",
        },
        marquee: {
            marginTop: isMobile ? "2rem" : "2.5rem",
            display: "flex",
            justifyContent: "center",
            gap: isMobile ? "1rem" : "1.75rem",
            flexWrap: "wrap",
            color: "#64748b",
            fontSize: isMobile ? "0.8rem" : "0.95rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
        },
        heroStats: {
            marginTop: isMobile ? "2rem" : "2.75rem",
            display: "grid",
            gridTemplateColumns: width >= 656 ? "repeat(3, 1fr)" : width >= 480 ? "repeat(2, 1fr)" : "1fr",
            gap: isMobile ? "0.9rem" : "1.35rem",
            justifyItems: "center",
            maxWidth: width >= 656 ? "900px" : width >= 480 ? "600px" : "400px",
            margin: "0 auto",
            padding: isMobile ? "0 0.5rem" : "0",
        },
        heroStat: {
            width: "100%",
            maxWidth: "280px",
            padding: isMobile ? "1rem 1.25rem" : "1.35rem 1.65rem",
            background: "rgba(17, 24, 39, 0.7)",
            border: "1px solid rgba(148, 163, 184, 0.22)",
            borderRadius: "1.2rem",
            boxShadow: "0 22px 55px -35px rgba(56, 189, 248, 0.75)",
            textAlign: "center",
        },
        heroStatValue: {
            fontSize: isMobile ? "1.5rem" : "1.85rem",
            fontWeight: 700,
            color: "#38bdf8",
            marginBottom: "0.4rem",
        },
        heroStatLabel: {
            color: "#94a3b8",
            lineHeight: 1.6,
            fontSize: isMobile ? "0.85rem" : "0.95rem",
        },
        section: {
            padding: isMobile ? "2.5rem 1rem" : "5.2rem 2rem",
        },
        container: {
            maxWidth: "1200px",
            margin: "0 auto",
        },
        statGrid: {
            display: "grid",
            gridTemplateColumns: width >= 900 ? "repeat(3, 1fr)" : width >= 600 ? "repeat(2, 1fr)" : "1fr",
            gap: isMobile ? "0.85rem" : "1.75rem",
        },
        statCard: {
            background: "rgba(30, 41, 59, 0.55)",
            border: "1px solid rgba(148, 163, 184, 0.22)",
            borderRadius: "1.1rem",
            padding: isMobile ? "1.35rem" : "1.85rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.85rem",
            boxShadow: "0 25px 55px -32px rgba(14, 165, 233, 0.45)",
        },
        statValue: {
            fontSize: isMobile ? "2rem" : "2.45rem",
            fontWeight: 700,
            color: "#38bdf8",
        },
        statLabel: {
            fontSize: isMobile ? "0.92rem" : "1.02rem",
            color: "#e2e8f0",
            fontWeight: 600,
        },
        statCaption: {
            fontSize: isMobile ? "0.85rem" : "0.92rem",
            color: "#94a3b8",
            lineHeight: 1.6,
        },
        quoteGrid: {
            marginTop: "2.5rem",
            display: "grid",
            gridTemplateColumns: width >= 1028 ? "repeat(3, 1fr)" : width >= 696 ? "repeat(2, 1fr)" : "1fr",
            gap: isMobile ? "1.25rem" : "1.7rem",
        },
        quoteCard: {
            background: "rgba(17, 24, 39, 0.78)",
            border: "1px solid rgba(56, 189, 248, 0.3)",
            borderRadius: "1.2rem",
            padding: isMobile ? "1.75rem 1.5rem" : "2.4rem 2.1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.05rem",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 30px 60px -35px rgba(56, 189, 248, 0.5)",
            transition: "transform 0.25s ease, border-color 0.25s ease",
        },
        quoteGlow: {
            position: "absolute",
            inset: "auto auto -120px -90px",
            width: "240px",
            height: "240px",
            background: "radial-gradient(circle at center, rgba(56, 189, 248, 0.28), transparent)",
            filter: "blur(6px)",
            opacity: 0.6,
        },
        quoteMark: {
            fontSize: isMobile ? "2rem" : "2.6rem",
            color: "rgba(56, 189, 248, 0.7)",
        },
        quoteText: {
            fontSize: isMobile ? "0.98rem" : "1.12rem",
            lineHeight: 1.85,
            color: "#dbeafe",
        },
        quoteAuthor: {
            fontWeight: 700,
            color: "#e2e8f0",
        },
        quoteRole: {
            color: "#94a3b8",
            fontSize: isMobile ? "0.85rem" : "0.92rem",
        },
        panelSection: {
            position: "relative",
            background: "linear-gradient(140deg, rgba(8, 17, 35, 0.92), rgba(13, 25, 46, 0.85))",
            borderRadius: "1.5rem",
            border: "1px solid rgba(56, 189, 248, 0.2)",
            padding: isMobile ? "1.75rem" : "2.9rem",
            display: "grid",
            gridTemplateColumns: width >= 900 ? "repeat(3, 1fr)" : width >= 600 ? "repeat(2, 1fr)" : "1fr",
            gap: isMobile ? "1.25rem" : "2rem",
            boxShadow: "0 40px 90px -45px rgba(15, 118, 110, 0.35)",
            overflow: "hidden",
        },
        panelSectionGlow: {
            position: "absolute",
            inset: "-120px auto auto -160px",
            width: isMobile ? "250px" : "420px",
            height: isMobile ? "250px" : "420px",
            background: "radial-gradient(circle at center, rgba(56, 189, 248, 0.18), transparent 65%)",
            filter: "blur(12px)",
            opacity: 0.9,
        },
        panelCard: {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "1.05rem",
            padding: isMobile ? "1.35rem 1.25rem" : "1.9rem 2rem",
            borderRadius: "1.25rem",
            background: "rgba(7, 14, 28, 0.82)",
            border: "1px solid rgba(148, 163, 184, 0.18)",
            boxShadow: "0 26px 60px -40px rgba(56, 189, 248, 0.55)",
            transition: "transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease",
        },
        panelHeader: {
            display: "flex",
            alignItems: "center",
            gap: "1rem",
        },
        panelBadge: {
            width: isMobile ? "2.5rem" : "3rem",
            height: isMobile ? "2.5rem" : "3rem",
            borderRadius: "0.95rem",
            background: "linear-gradient(135deg, rgba(56, 189, 248, 0.26), rgba(129, 140, 248, 0.24))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#38bdf8",
            fontSize: isMobile ? "1.1rem" : "1.4rem",
        },
        panelTitle: {
            fontSize: isMobile ? "1.05rem" : "1.22rem",
            fontWeight: 700,
            color: "#f8fafc",
        },
        panelList: {
            margin: 0,
            padding: 0,
            listStyle: "none",
            display: "grid",
            gap: "0.65rem",
        },
        panelListItem: {
            display: "flex",
            alignItems: "flex-start",
            gap: "0.7rem",
            color: "#9fb2d6",
            fontSize: isMobile ? "0.88rem" : "0.95rem",
            lineHeight: 1.6,
        },
        panelBullet: {
            width: "0.55rem",
            height: "0.55rem",
            borderRadius: "999px",
            background: "linear-gradient(135deg, #38bdf8, #60a5fa)",
            marginTop: "0.45rem",
            flexShrink: 0,
        },
        ctaBlock: {
            textAlign: "center",
        },
        ctaTitle: {
            fontSize: isMobile ? "1.4rem" : isTablet ? "1.75rem" : "2.15rem",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "0.85rem",
        },
        ctaDescription: {
            color: "#94a3b8",
            maxWidth: "520px",
            margin: "0 auto 1.6rem",
            lineHeight: 1.65,
            fontSize: isMobile ? "0.9rem" : "1rem",
        },
        ctaButton: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem",
            background: "linear-gradient(to right, #38bdf8, #60a5fa)",
            color: "#0f172a",
            padding: isMobile ? "0.85rem 2rem" : "1rem 2.85rem",
            borderRadius: "9999px",
            fontWeight: 700,
            fontSize: isMobile ? "0.95rem" : "1.06rem",
            textDecoration: "none",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderBottom: "none",
            boxShadow: "0 22px 48px -24px rgba(56, 189, 248, 0.65)",
        },
    });

    const styles = getStyles();

    return (
        <div style={styles.page}>
            <LandingNavbar />
            <section style={styles.hero}>
                <div style={styles.heroPulse} />
                <div style={styles.heroInner}>
                    <h1 style={styles.heroTitle}>
                        Voices from leading teams who <span style={styles.heroHighlight}>protect their focus</span>
                    </h1>
                    <p style={styles.heroSubtitle}>
                        FocusFlow powers product orgs, creative studios, and student cohorts around the globe. Here’s
                        how they’re reclaiming time and momentum.
                    </p>
                    <div style={styles.marquee}>
                        {marqueeLogos.map((logo) => (
                            <span key={logo.name}>{logo.name}</span>
                        ))}
                    </div>
                    <div style={styles.heroStats}>
                        {successStats.map((stat) => (
                            <div key={stat.label} style={styles.heroStat}>
                                <div style={styles.heroStatValue}>{stat.value}</div>
                                <div style={styles.heroStatLabel}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section style={styles.section}>
                <div style={styles.container}>
                    <div style={styles.statGrid}>
                        {successStats.map((stat) => (
                            <div key={stat.label} style={styles.statCard}>
                                <div style={styles.statValue}>{stat.value}</div>
                                <div style={styles.statLabel}>{stat.label}</div>
                                <div style={styles.statCaption}>{stat.caption}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industry Panels */}
            <section style={styles.section}>
                <div style={styles.container}>
                    <div style={styles.panelSection}>
                        <span style={styles.panelSectionGlow} aria-hidden="true" />
                        {industryPanels.map((panel) => (
                            <div
                                key={panel.title}
                                style={styles.panelCard}
                                onMouseEnter={(event) => {
                                    event.currentTarget.style.transform = "translateY(-6px)";
                                    event.currentTarget.style.boxShadow = "0 32px 70px -36px rgba(56, 189, 248, 0.65)";
                                    event.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.35)";
                                }}
                                onMouseLeave={(event) => {
                                    event.currentTarget.style.transform = "translateY(0px)";
                                    event.currentTarget.style.boxShadow = "0 26px 60px -40px rgba(56, 189, 248, 0.55)";
                                    event.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.18)";
                                }}
                            >
                                <div style={styles.panelHeader}>
                                    <span style={styles.panelBadge}>
                                        <panel.icon />
                                    </span>
                                    <div style={styles.panelTitle}>{panel.title}</div>
                                </div>
                                <ul style={styles.panelList}>
                                    {panel.points.map((point) => (
                                        <li key={point} style={styles.panelListItem}>
                                            <span style={styles.panelBullet} />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ ...styles.section, paddingBottom: "4rem" }}>
                <div style={styles.ctaBlock}>
                    <div style={styles.ctaTitle}>Ready to add your own headline?</div>
                    <p style={styles.ctaDescription}>
                        We partner with teams rolling out focus culture at scale. Book a walkthrough and we’ll tailor a
                        momentum plan for your crew.
                    </p>
                    <a href="mailto:focusflow@studentproject.com" style={styles.ctaButton}>
                        Share your story
                    </a>
                </div>
            </section>
            <LandingFooter />
        </div >
    );
};

export default Testimonials;
