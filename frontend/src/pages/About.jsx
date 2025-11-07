import React from "react";
import { FaRocket, FaUsers, FaCode, FaHandshake, FaFire, FaLeaf, FaArrowRight } from "react-icons/fa";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../styles/CardHover.css";

const heroStats = [
    { label: "Community members", value: "12k", delta: "+18% QoQ" },
    { label: "Focus sessions", value: "540k", delta: "All time" },
    { label: "Countries", value: "52", delta: "Worldwide" },
];

const timelineMoments = [
    {
        year: "2023",
        tag: "Campus hackathon",
        summary: "Prototype born from a 48-hour sprint to tame chaotic study blocks.",
    },
    {
        year: "2024",
        tag: "Beta to open source",
        summary: "1k early adopters shaped rituals; codebase opened to community builders.",
    },
    {
        year: "2025",
        tag: "Collective momentum",
        summary: "Global focus circles, contributor guilds, and partner pilots take flight.",
    },
];

const operatingPillars = [
    {
        icon: <FaFire />,
        title: "Human-first rituals",
        copy: "We design for energy beats, not just task lists—habit loops that feel cinematic.",
    },
    {
        icon: <FaHandshake />,
        title: "Co-built with community",
        copy: "Roadmaps stay transparent and votes shape every shipping lane.",
    },
    {
        icon: <FaLeaf />,
        title: "Calm technology",
        copy: "Lightweight experiences, privacy-forward defaults, and zero notification fatigue.",
    },
    {
        icon: <FaCode />,
        title: "Open source roots",
        copy: "Shared playbooks, documented APIs, and a welcoming contributor guild.",
    },
];

const teamMosaic = [
    {
        name: "Ravi Patel",
        role: "Founder · Systems Design",
        focus: "Keeps the sprint clock honest and the data layer clean.",
    },
    {
        name: "Lila Gomez",
        role: "Head of Experience",
        focus: "Crafts the soundscapes and micro-moments inside every ritual.",
    },
    {
        name: "Aisha Rahman",
        role: "Community Steward",
        focus: "Hosts weekly retros and an open office hour for contributors.",
    },
];

const credibilitySignals = [
    { title: "Stack", details: "React · Node.js · MongoDB · Vite" },
    { title: "Security", details: "SOC2-in-progress · End-to-end encryption roadmap" },
    { title: "In the news", details: "Featured in Product Hunt, Forbes, TechCrunch" },
];

const About = () => {
    const styles = {
        page: {
            minHeight: "100vh",
            background: "linear-gradient(185deg, #040915 0%, #101a31 55%, #040915 100%)",
            color: "#ffffff",
        },
        hero: {
            position: "relative",
            padding: "6.2rem 2rem 4.8rem",
            overflow: "hidden",
        },
        heroGlow: {
            position: "absolute",
            inset: "-260px auto auto 50%",
            transform: "translateX(-50%)",
            width: "780px",
            height: "780px",
            background: "radial-gradient(circle at center, rgba(56, 189, 248, 0.22), transparent 68%)",
            filter: "blur(16px)",
        },
        heroInner: {
            maxWidth: "960px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "1.8rem",
        },
        heroBadge: {
            alignSelf: "center",
            padding: "0.45rem 1.1rem",
            borderRadius: "9999px",
            border: "1px solid rgba(56, 189, 248, 0.4)",
            background: "rgba(15, 23, 42, 0.7)",
            fontSize: "0.82rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#38bdf8",
            fontWeight: 600,
        },
        heroTitle: {
            fontSize: "3.1rem",
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
            margin: 0,
            background: "linear-gradient(115deg, #38bdf8, #60a5fa, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
        },
        heroLead: {
            maxWidth: "48rem",
            margin: "0 auto",
            color: "#cbd5f5",
            fontSize: "1.16rem",
            lineHeight: 1.78,
        },
        statsRow: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.35rem",
            marginTop: "0.75rem",
        },
        statCard: {
            padding: "1.45rem",
            borderRadius: "1.1rem",
            background: "rgba(18, 28, 48, 0.82)",
            border: "1px solid rgba(148, 163, 184, 0.28)",
            boxShadow: "0 28px 55px -34px rgba(56, 189, 248, 0.55)",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: "0.45rem",
        },
        statValue: {
            fontSize: "1.95rem",
            fontWeight: 700,
            color: "#38bdf8",
        },
        statLabel: {
            color: "#9fb2d6",
            fontSize: "0.96rem",
        },
        statDelta: {
            color: "#38bdf8",
            fontSize: "0.82rem",
            fontWeight: 600,
        },
        section: {
            padding: "4.9rem 2rem",
            position: "relative",
        },
        container: {
            maxWidth: "1100px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
        },
        sectionHeader: {
            maxWidth: "620px",
            margin: "0 auto 2.4rem",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
        },
        sectionTitle: {
            fontSize: "2.25rem",
            fontWeight: 700,
            color: "#f8fafc",
        },
        sectionLead: {
            color: "#9fb2d6",
            fontSize: "1.02rem",
            lineHeight: 1.72,
        },
        timelineGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
        },
        timelineCard: {
            padding: "1.85rem",
            borderRadius: "1.1rem",
            background: "rgba(17, 25, 43, 0.88)",
            border: "1px solid rgba(56, 189, 248, 0.22)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: "0.7rem",
        },
        timelineYear: {
            fontSize: "1.4rem",
            fontWeight: 700,
            color: "#f1f5f9",
        },
        timelineTag: {
            display: "inline-flex",
            alignItems: "center",
            alignSelf: "flex-start",
            gap: "0.45rem",
            background: "rgba(56, 189, 248, 0.16)",
            color: "#38bdf8",
            borderRadius: "999px",
            padding: "0.35rem 0.8rem",
            fontSize: "0.82rem",
            fontWeight: 600,
        },
        timelineCopy: {
            color: "#a3b5d8",
            fontSize: "0.97rem",
            lineHeight: 1.65,
        },
        pillarGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.55rem",
        },
        pillarCard: {
            padding: "1.85rem",
            borderRadius: "1.1rem",
            background: "rgba(12, 20, 36, 0.9)",
            border: "1px solid rgba(129, 140, 248, 0.22)",
            boxShadow: "0 28px 56px -32px rgba(129, 140, 248, 0.4)",
            display: "flex",
            flexDirection: "column",
            gap: "0.7rem",
        },
        iconBadge: {
            width: "2.8rem",
            height: "2.8rem",
            borderRadius: "0.85rem",
            background: "rgba(56, 189, 248, 0.16)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#38bdf8",
            fontSize: "1.4rem",
        },
        pillarTitle: {
            fontSize: "1.15rem",
            fontWeight: 600,
            color: "#f1f5f9",
        },
        pillarCopy: {
            color: "#94a3b8",
            fontSize: "0.95rem",
            lineHeight: 1.65,
        },
        teamGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.6rem",
        },
        teamCard: {
            padding: "1.9rem",
            borderRadius: "1.2rem",
            background: "rgba(17, 24, 39, 0.82)",
            border: "1px solid rgba(56, 189, 248, 0.25)",
            display: "flex",
            flexDirection: "column",
            gap: "0.85rem",
            textAlign: "center",
        },
        avatarGlow: {
            width: "82px",
            height: "82px",
            borderRadius: "50%",
            margin: "0 auto",
            background: "linear-gradient(140deg, rgba(56, 189, 248, 0.6), rgba(129, 140, 248, 0.6))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0f172a",
            fontWeight: 700,
            fontSize: "1.4rem",
        },
        teamName: {
            color: "#f8fafc",
            fontSize: "1.12rem",
            fontWeight: 600,
        },
        teamRole: {
            color: "#38bdf8",
            fontSize: "0.9rem",
            fontWeight: 600,
        },
        teamFocus: {
            color: "#94a3b8",
            fontSize: "0.94rem",
            lineHeight: 1.6,
        },
        contributorStrip: {
            marginTop: "2.4rem",
            padding: "1.4rem 1.6rem",
            borderRadius: "1rem",
            background: "rgba(56, 189, 248, 0.12)",
            color: "#38bdf8",
            fontWeight: 600,
            display: "flex",
            justifyContent: "center",
            gap: "0.8rem",
            alignItems: "center",
        },
        signalGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
        },
        signalCard: {
            padding: "1.65rem",
            borderRadius: "1rem",
            background: "rgba(12, 19, 32, 0.88)",
            border: "1px solid rgba(56, 189, 248, 0.18)",
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
        },
        signalTitle: {
            color: "#e2e8f0",
            fontWeight: 600,
            fontSize: "1.02rem",
        },
        signalCopy: {
            color: "#94a3b8",
            fontSize: "0.92rem",
            lineHeight: 1.6,
        },
        ctaSection: {
            padding: "5rem 2rem 4.4rem",
        },
        ctaCard: {
            maxWidth: "780px",
            margin: "0 auto",
            padding: "3.1rem",
            borderRadius: "1.65rem",
            textAlign: "center",
            background: "linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(129, 140, 248, 0.24))",
            border: "1px solid rgba(56, 189, 248, 0.3)",
            boxShadow: "0 40px 78px -40px rgba(56, 189, 248, 0.6)",
            display: "flex",
            flexDirection: "column",
            gap: "1.4rem",
        },
        ctaTitle: {
            fontSize: "2.2rem",
            fontWeight: 700,
            color: "#eef6ff",
        },
        ctaLead: {
            color: "#cbd5f5",
            fontSize: "1.04rem",
            lineHeight: 1.76,
        },
        ctaButtons: {
            display: "flex",
            justifyContent: "center",
            gap: "0.9rem",
            flexWrap: "wrap",
        },
        primaryButton: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.55rem",
            background: "linear-gradient(110deg, #38bdf8, #818cf8)",
            color: "#0f172a",
            padding: "0.95rem 2.6rem",
            borderRadius: "9999px",
            fontWeight: 700,
            fontSize: "1.05rem",
            border: "none",
            cursor: "pointer",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
            boxShadow: "0 30px 60px -34px rgba(56, 189, 248, 0.7)",
        },
        secondaryButton: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.95rem 2.3rem",
            borderRadius: "9999px",
            background: "rgba(15, 23, 42, 0.78)",
            border: "1px solid rgba(56, 189, 248, 0.35)",
            color: "#38bdf8",
            fontWeight: 600,
            fontSize: "1.02rem",
            cursor: "pointer",
            transition: "transform 0.25s ease, border-color 0.25s ease",
        },
        pulse: {
            position: "absolute",
            inset: "-120px auto auto -80px",
            width: "280px",
            height: "280px",
            background: "radial-gradient(circle at center, rgba(56, 189, 248, 0.16), transparent 65%)",
            filter: "blur(8px)",
            opacity: 0.7,
            pointerEvents: "none",
        },
    };

    return (
        <div style={styles.page}>
            <LandingNavbar />
            <section style={styles.hero}>
                <div style={styles.heroGlow} />
                <div style={styles.heroInner}>
                    <span style={styles.heroBadge}>From side project to global ritual</span>
                    <h1 style={styles.heroTitle}>Meet the calm operating system powering FocusFlow</h1>
                    <p style={styles.heroLead}>
                        FocusFlow started as a campus experiment to protect deep work. Today, thousands of builders, students,
                        and teams co-create the playbook that keeps momentum steady.
                    </p>
                    <div style={styles.statsRow}>
                        {heroStats.map((stat) => (
                            <div key={stat.label} style={styles.statCard}>
                                <div style={styles.statValue}>{stat.value}</div>
                                <div style={styles.statLabel}>{stat.label}</div>
                                <div style={styles.statDelta}>{stat.delta}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={styles.section}>
                <div style={styles.pulse} />
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>How the story unfolded</h2>
                        <p style={styles.sectionLead}>
                            Three chapters, one mission—keep rituals lightweight, open, and human. We learn in public so the
                            playbook stays accessible to anyone chasing focus.
                        </p>
                    </div>
                    <div className="hover-card" style={{ ...styles.timelineGrid, background: "rgba(10, 17, 30, 0.6)", border: "1px solid rgba(56, 189, 248, 0.16)", borderRadius: "1.25rem", padding: "2.4rem", boxShadow: "0 32px 70px -36px rgba(56, 189, 248, 0.4)" }}>
                        {timelineMoments.map((moment) => (
                            <div key={moment.year} style={styles.timelineCard}>
                                <div style={styles.timelineYear}>{moment.year}</div>
                                <span style={styles.timelineTag}>
                                    <FaRocket /> {moment.tag}
                                </span>
                                <p style={styles.timelineCopy}>{moment.summary}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={styles.section}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Operating principles we won’t compromise</h2>
                        <p style={styles.sectionLead}>
                            Behind every feature is a value system that protects attention, honors wellbeing, and leaves the
                            door open for collaboration.
                        </p>
                    </div>
                    <div style={styles.pillarGrid}>
                        {operatingPillars.map((pillar) => (
                            <div key={pillar.title} style={styles.pillarCard}>
                                <div style={styles.iconBadge}>{pillar.icon}</div>
                                <div style={styles.pillarTitle}>{pillar.title}</div>
                                <p style={styles.pillarCopy}>{pillar.copy}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={styles.section}>
                <div style={styles.pulse} />
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Team & contributor collective</h2>
                        <p style={styles.sectionLead}>
                            A tight founding crew steers the ship, while a global contributor guild keeps improvements rolling
                            in every sprint.
                        </p>
                    </div>
                    <div style={styles.teamGrid}>
                        {teamMosaic.map((member) => (
                            <div key={member.name} style={styles.teamCard}>
                                <div style={styles.avatarGlow}>
                                    {member.name
                                        .split(" ")
                                        .map((part) => part[0])
                                        .join("")}
                                </div>
                                <div style={styles.teamName}>{member.name}</div>
                                <div style={styles.teamRole}>{member.role}</div>
                                <p style={styles.teamFocus}>{member.focus}</p>
                            </div>
                        ))}
                    </div>
                    <div style={styles.contributorStrip}>
                        <FaUsers /> 50+ open-source contributors · Weekly build circles · Async design crits
                    </div>
                </div>
            </section>

            <section style={styles.section}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Proof the system scales with you</h2>
                        <p style={styles.sectionLead}>
                            From security initiatives to press spotlights, FocusFlow keeps credibility in lockstep with the
                            rituals we preach.
                        </p>
                    </div>
                    <div style={styles.signalGrid}>
                        {credibilitySignals.map((signal) => (
                            <div key={signal.title} style={styles.signalCard}>
                                <span style={styles.signalTitle}>{signal.title}</span>
                                <span style={styles.signalCopy}>{signal.details}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={styles.ctaSection}>
                <div style={styles.container}>
                    <div style={styles.ctaCard}>
                        <h2 style={styles.ctaTitle}>Join the next chapter of FocusFlow</h2>
                        <p style={styles.ctaLead}>
                            Bring your rituals, feedback, or pull requests. Whether you’re hosting circles or shipping code,
                            there’s a lane inside the collective for you.
                        </p>
                        <div style={styles.ctaButtons}>
                            <button
                                style={styles.primaryButton}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-3px)";
                                    e.currentTarget.style.boxShadow = "0 38px 78px -38px rgba(56, 189, 248, 0.8)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0px)";
                                    e.currentTarget.style.boxShadow = styles.primaryButton.boxShadow;
                                }}
                                onClick={() => {
                                    window.location.href = "mailto:focusflow@studentproject.com";
                                }}
                            >
                                <FaHandshake /> Partner with us
                            </button>
                            <button
                                style={styles.secondaryButton}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-3px)";
                                    e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.55)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0px)";
                                    e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.35)";
                                }}
                                onClick={() => {
                                    window.location.href = "mailto:focusflow@studentproject.com?subject=Contributor%20Guild";
                                }}
                            >
                                <FaArrowRight /> Join contributor guild
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <LandingFooter />
        </div>
    );
};

export default About;
