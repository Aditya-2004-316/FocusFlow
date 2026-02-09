import React from "react";
import useResponsive from "../hooks/useResponsive";
import {
    FaShieldAlt,
    FaUserShield,
    FaDatabase,
    FaChartLine,
    FaBalanceScale,
    FaLock,
    FaTrashAlt,
    FaEnvelope,
} from "react-icons/fa";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../styles/CardHover.css";

const heroStats = [
    { label: "Last updated", value: "Jan 22, 2025", meta: "Version 2.0" },
    { label: "Encryption", value: "AES-256 + TLS", meta: "In transit & at rest" },
    { label: "Deletion window", value: "30 days", meta: "After account removal" },
];

const dataStreams = [
    {
        title: "Account signals",
        caption: "Details you share to create and personalize FocusFlow.",
        bullets: ["Email & display name", "Encrypted password", "Optional avatar"],
    },
    {
        title: "Product activity",
        caption: "Telemetry that powers your stats and streaks—never sold.",
        bullets: ["Session durations", "Focus rituals & tags", "Feedback snippets"],
    },
    {
        title: "Reliability data",
        caption: "Lightweight technical logs that keep services stable.",
        bullets: ["IP & device type", "Browser + OS", "Crash diagnostics"],
    },
];

const usageReasons = [
    {
        icon: <FaChartLine />,
        title: "Improve rituals",
        copy: "Tune focus analytics, recommendations, and pacing based on anonymized usage patterns.",
    },
    {
        icon: <FaUserShield />,
        title: "Protect accounts",
        copy: "Detect suspicious logins, enforce rate limits, and keep your workspace secure.",
    },
    {
        icon: <FaBalanceScale />,
        title: "Stay compliant",
        copy: "Honor legal obligations, respond to data requests, and keep audit trails accurate.",
    },
];

const guardrails = [
    {
        icon: <FaShieldAlt />,
        label: "No resale or ads",
        detail: "We never monetize user data through advertising networks or brokers.",
    },
    {
        icon: <FaLock />,
        label: "Least-privilege access",
        detail: "Only vetted team members with a job need can view limited support logs.",
    },
    {
        icon: <FaDatabase />,
        label: "Regional hosting",
        detail: "Primary data centers reside in privacy-forward jurisdictions (EU & US).",
    },
    {
        icon: <FaTrashAlt />,
        label: "Fast erasure",
        detail: "Delete your account and we scrub personal records within 30 days, backups within 90.",
    },
];

const rightsMatrix = [
    { title: "Access", desc: "Ask for a full export of the data we store about you." },
    { title: "Correction", desc: "Fix profile or workspace details that are outdated." },
    { title: "Deletion", desc: "Close your account and trigger automated purge routines." },
    { title: "Portability", desc: "Receive machine-readable exports for other services." },
    { title: "Opt-out", desc: "Control emails, beta invites, and non-essential communication." },
    { title: "Consent", desc: "Withdraw permissions for integrations or future processing." },
];

const retentionPoints = [
    { label: "Account active", body: "We retain data only to operate the experiences you opt into." },
    { label: "Deletion request", body: "Personal identifiers scrubbed inside 30 days; anonymized analytics retained." },
    { label: "Backups", body: "Encrypted snapshots cycle out within 90 days unless required by law." },
];

const contactChannels = [
    {
        heading: "Privacy desk",
        detail: "privacy@focusflow.com",
        link: "mailto:privacy@focusflow.com",
    },
    {
        heading: "Security hotline",
        detail: "security@focusflow.com",
        link: "mailto:security@focusflow.com",
    },
];

const Privacy = () => {
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
        streamGrid: {
            display: "grid",
            gridTemplateColumns: width >= 900 ? "repeat(3, 1fr)" : "1fr",
            gap: isMobile ? "1.1rem" : "1.6rem",
        },
        streamCard: {
            padding: isMobile ? "1.5rem" : "1.85rem",
            borderRadius: "1.2rem",
            background: "rgba(15, 24, 42, 0.82)",
            border: "1px solid rgba(56, 189, 248, 0.2)",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
        },
        streamTitle: {
            fontSize: isMobile ? "1.08rem" : "1.2rem",
            fontWeight: 600,
            color: "#f8fafc",
        },
        streamCaption: {
            color: "#9fb2d6",
            fontSize: isMobile ? "0.88rem" : "0.94rem",
            lineHeight: 1.65,
        },
        bulletList: {
            margin: 0,
            paddingLeft: "1.15rem",
            color: "#94a3b8",
            fontSize: isMobile ? "0.85rem" : "0.92rem",
            lineHeight: 1.65,
        },
        usageGrid: {
            display: "grid",
            gridTemplateColumns: width >= 900 ? "repeat(3, 1fr)" : "1fr",
            gap: isMobile ? "1.1rem" : "1.6rem",
        },
        usageCard: {
            padding: isMobile ? "1.5rem" : "1.75rem",
            borderRadius: "1.1rem",
            background: "rgba(12, 20, 36, 0.9)",
            border: "1px solid rgba(129, 140, 248, 0.22)",
            display: "grid",
            gap: "0.7rem",
        },
        usageIcon: {
            width: isMobile ? "2.3rem" : "2.6rem",
            height: isMobile ? "2.3rem" : "2.6rem",
            borderRadius: "0.85rem",
            background: "rgba(56, 189, 248, 0.16)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#38bdf8",
            fontSize: isMobile ? "1.1rem" : "1.3rem",
        },
        usageTitle: {
            fontSize: isMobile ? "1.05rem" : "1.15rem",
            fontWeight: 600,
            color: "#f8fafc",
        },
        usageCopy: {
            color: "#94a3b8",
            fontSize: isMobile ? "0.88rem" : "0.95rem",
            lineHeight: 1.65,
        },
        guardrailGrid: {
            display: "grid",
            gridTemplateColumns: width >= 1028 ? "repeat(4, 1fr)" : width >= 696 ? "repeat(2, 1fr)" : "1fr",
            gap: isMobile ? "1rem" : "1.5rem",
        },
        guardrailCard: {
            padding: isMobile ? "1.35rem" : "1.6rem",
            borderRadius: "1.1rem",
            background: "rgba(17, 26, 44, 0.78)",
            border: "1px solid rgba(56, 189, 248, 0.18)",
            display: "grid",
            gap: "0.6rem",
        },
        guardrailLabel: {
            fontSize: isMobile ? "1rem" : "1.08rem",
            fontWeight: 600,
            color: "#f1f5f9",
        },
        guardrailDetail: {
            color: "#9fb2d6",
            fontSize: isMobile ? "0.85rem" : "0.94rem",
            lineHeight: 1.6,
        },
        rightsGrid: {
            display: "grid",
            gridTemplateColumns: width >= 900 ? "repeat(3, 1fr)" : width >= 600 ? "repeat(2, 1fr)" : "1fr",
            gap: isMobile ? "1rem" : "1.4rem",
        },
        rightCard: {
            padding: isMobile ? "1.35rem" : "1.6rem",
            borderRadius: "1.05rem",
            background: "rgba(15, 23, 42, 0.82)",
            border: "1px solid rgba(129, 140, 248, 0.24)",
            display: "grid",
            gap: "0.5rem",
        },
        rightTitle: {
            fontSize: isMobile ? "1rem" : "1.08rem",
            fontWeight: 600,
            color: "#f8fafc",
        },
        rightCopy: {
            color: "#9fb2d6",
            fontSize: isMobile ? "0.85rem" : "0.94rem",
            lineHeight: 1.6,
        },
        retentionList: {
            display: "grid",
            gap: isMobile ? "1rem" : "1.2rem",
            marginTop: isMobile ? "1.5rem" : "1.8rem",
        },
        retentionItem: {
            padding: isMobile ? "1.35rem" : "1.6rem",
            borderRadius: "1.1rem",
            border: "1px solid rgba(56, 189, 248, 0.18)",
            background: "rgba(12, 20, 36, 0.88)",
            display: "grid",
            gap: "0.4rem",
        },
        retentionLabel: {
            color: "#38bdf8",
            fontWeight: 600,
            fontSize: isMobile ? "0.9rem" : "0.98rem",
        },
        retentionBody: {
            color: "#94a3b8",
            fontSize: isMobile ? "0.88rem" : "0.95rem",
            lineHeight: 1.65,
        },
        contactGrid: {
            display: "grid",
            gridTemplateColumns: width >= 600 ? "repeat(2, 1fr)" : "1fr",
            gap: isMobile ? "1rem" : "1.4rem",
            marginTop: isMobile ? "1.5rem" : "1.8rem",
        },
        contactCard: {
            padding: isMobile ? "1.5rem" : "1.75rem",
            borderRadius: "1.15rem",
            background: "linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(129, 140, 248, 0.22))",
            border: "1px solid rgba(56, 189, 248, 0.28)",
            display: "grid",
            gap: "0.5rem",
            color: "#e0f2fe",
        },
        contactLink: {
            color: "#0f172a",
            fontWeight: 600,
            background: "rgba(255, 255, 255, 0.92)",
            borderRadius: "9999px",
            padding: isMobile ? "0.4rem 0.8rem" : "0.45rem 0.9rem",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            width: "fit-content",
            fontSize: isMobile ? "0.88rem" : "0.95rem",
        },
        helpBanner: {
            marginTop: isMobile ? "2rem" : "2.8rem",
            padding: isMobile ? "1.25rem" : "2.2rem",
            textAlign: "center",
            borderRadius: "1.4rem",
            background: "rgba(15, 23, 42, 0.78)",
            border: "1px solid rgba(56, 189, 248, 0.24)",
            color: "#9fb2d6",
            lineHeight: 1.7,
            fontSize: isMobile ? "0.92rem" : "1rem",
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
                        <span style={styles.heroBadge}>FocusFlow privacy center</span>
                        <h1 style={styles.heroTitle}>Privacy Policy</h1>
                        <p style={styles.heroLead}>
                            We keep your rituals private, your analytics encrypted, and your controls transparent. This
                            summary distills how FocusFlow collects, safeguards, and respects your data.
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
                            <h2 style={styles.sectionTitle}>What we collect & why</h2>
                            <p style={styles.sectionLead}>
                                We only gather the signals needed to keep your workspace running smoothly. Here’s the full
                                inventory, grouped by purpose.
                            </p>
                        </div>
                        <div style={styles.streamGrid}>
                            {dataStreams.map((stream) => (
                                <div key={stream.title} style={styles.streamCard}>
                                    <span style={styles.streamTitle}>{stream.title}</span>
                                    <p style={styles.streamCaption}>{stream.caption}</p>
                                    <ul style={styles.bulletList}>
                                        {stream.bullets.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>How the data powers FocusFlow</h2>
                            <p style={styles.sectionLead}>
                                No surprise processing. Every data point we track feeds directly into a better, safer focus ritual.
                            </p>
                        </div>
                        <div style={styles.usageGrid}>
                            {usageReasons.map((reason) => (
                                <div key={reason.title} style={styles.usageCard}>
                                    <span style={styles.usageIcon}>{reason.icon}</span>
                                    <span style={styles.usageTitle}>{reason.title}</span>
                                    <p style={styles.usageCopy}>{reason.copy}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>Guardrails that never change</h2>
                            <p style={styles.sectionLead}>
                                We operate with strict privacy defaults. These policies apply to every user, every region, every
                                plan.
                            </p>
                        </div>
                        <div style={styles.guardrailGrid}>
                            {guardrails.map((item) => (
                                <div key={item.label} style={styles.guardrailCard}>
                                    <span style={styles.usageIcon}>{item.icon}</span>
                                    <span style={styles.guardrailLabel}>{item.label}</span>
                                    <p style={styles.guardrailDetail}>{item.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>Your controls & legal rights</h2>
                            <p style={styles.sectionLead}>
                                GDPR, CCPA, and global privacy frameworks give you powerful controls. FocusFlow honors every request
                                promptly—just reach out.
                            </p>
                        </div>
                        <div style={styles.rightsGrid}>
                            {rightsMatrix.map((right) => (
                                <div key={right.title} style={styles.rightCard}>
                                    <span style={styles.rightTitle}>{right.title}</span>
                                    <p style={styles.rightCopy}>{right.desc}</p>
                                </div>
                            ))}
                        </div>
                        <p style={{ color: "#9fb2d6", textAlign: "center", marginTop: "2.2rem", fontSize: "0.98rem" }}>
                            Email <a href="mailto:privacy@focusflow.com" style={{ color: "#38bdf8", fontWeight: 600 }}>privacy@focusflow.com</a> to
                            exercise any right or request clarification.
                        </p>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>Retention cadence</h2>
                            <p style={styles.sectionLead}>
                                Data sticks around only while it provides value. Below is the lifecycle applied to every account and
                                workspace.
                            </p>
                        </div>
                        <div style={styles.retentionList}>
                            {retentionPoints.map((point) => (
                                <div key={point.label} style={styles.retentionItem}>
                                    <span style={styles.retentionLabel}>{point.label}</span>
                                    <span style={styles.retentionBody}>{point.body}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>Reach the privacy crew</h2>
                            <p style={styles.sectionLead}>
                                Transparent communication is part of the pact. Drop a note to the dedicated inbox that matches your
                                question.
                            </p>
                        </div>
                        <div style={styles.contactGrid}>
                            {contactChannels.map((channel) => (
                                <div key={channel.heading} style={styles.contactCard}>
                                    <span style={{ fontSize: "1.12rem", fontWeight: 600 }}>{channel.heading}</span>
                                    <span style={{ fontSize: "0.96rem" }}>{channel.detail}</span>
                                    <a href={channel.link} style={styles.contactLink}>
                                        <FaEnvelope /> Write email
                                    </a>
                                </div>
                            ))}
                        </div>
                        <div style={styles.helpBanner}>
                            Prefer a conversation? Join our <a href="/community" style={{ color: "#38bdf8", fontWeight: 600 }}>Community hub</a> or
                            schedule a privacy briefing via <a href="mailto:focusflow@studentproject.com" style={{ color: "#38bdf8", fontWeight: 600 }}>focusflow@studentproject.com</a>.
                        </div>
                    </div>
                </section>
            </main>

            <LandingFooter />
        </div>
    );
};

export default Privacy;
