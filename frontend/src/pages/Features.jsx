import React from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../styles/CardHover.css";

const Features = () => {
    const styles = {
        page: {
            minHeight: "100vh",
            background: "linear-gradient(180deg, #060b18 0%, #101b33 55%, #060b18 100%)",
            color: "#ffffff",
        },
        hero: {
            position: "relative",
            padding: "6.5rem 2rem 4.5rem",
            textAlign: "center",
            overflow: "hidden",
        },
        heroGlow: {
            position: "absolute",
            inset: "-220px auto auto 50%",
            transform: "translateX(-50%)",
            width: "620px",
            height: "620px",
            background: "radial-gradient(circle at center, rgba(56, 189, 248, 0.28), transparent 65%)",
            filter: "blur(10px)",
        },
        heroInner: {
            maxWidth: "880px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "1.75rem",
        },
        heroBadge: {
            alignSelf: "center",
            padding: "0.45rem 1.1rem",
            borderRadius: "9999px",
            border: "1px solid rgba(56, 189, 248, 0.35)",
            background: "rgba(15, 23, 42, 0.65)",
            fontSize: "0.85rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#38bdf8",
            fontWeight: 600,
        },
        heroTitle: {
            fontSize: "3.1rem",
            lineHeight: 1.1,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            margin: 0,
            background: "linear-gradient(120deg, #38bdf8, #60a5fa, #94a3ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
        },
        heroSubtitle: {
            margin: "0 auto",
            maxWidth: "46rem",
            color: "#cbd5f5",
            fontSize: "1.15rem",
            lineHeight: 1.8,
        },
        heroMetrics: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1.25rem",
        },
        heroMetric: {
            minWidth: "180px",
            padding: "1.15rem 1.35rem",
            borderRadius: "1.1rem",
            background: "rgba(24, 36, 58, 0.65)",
            border: "1px solid rgba(148, 163, 184, 0.22)",
            boxShadow: "0 22px 50px -32px rgba(56, 189, 248, 0.6)",
            textAlign: "left",
        },
        heroMetricValue: {
            fontSize: "1.8rem",
            fontWeight: 700,
            color: "#38bdf8",
            marginBottom: "0.2rem",
        },
        heroMetricLabel: {
            color: "#8ea0c2",
            fontSize: "0.95rem",
        },
        heroActions: {
            display: "flex",
            justifyContent: "center",
            gap: "0.9rem",
            flexWrap: "wrap",
            marginTop: "0.5rem",
        },
        primaryButton: {
            background: "linear-gradient(110deg, #38bdf8, #818cf8)",
            color: "#0f172a",
            border: "none",
            padding: "0.95rem 2.6rem",
            borderRadius: "9999px",
            fontWeight: 700,
            fontSize: "1.05rem",
            cursor: "pointer",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
            boxShadow: "0 28px 60px -34px rgba(56, 189, 248, 0.75)",
        },
        secondaryButton: {
            background: "rgba(15, 23, 42, 0.82)",
            color: "#38bdf8",
            border: "1px solid rgba(56, 189, 248, 0.35)",
            padding: "0.95rem 2.3rem",
            borderRadius: "9999px",
            fontWeight: 600,
            fontSize: "1.02rem",
            cursor: "pointer",
            transition: "transform 0.25s ease, border-color 0.25s ease",
        },
        section: {
            padding: "5rem 2rem",
        },
        container: {
            maxWidth: "1180px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
        },
        sectionHeading: {
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            alignItems: "center",
            marginBottom: "3rem",
            textAlign: "center",
        },
        sectionTitle: {
            fontSize: "2.4rem",
            fontWeight: 700,
            color: "#f8fafc",
        },
        sectionLead: {
            maxWidth: "40rem",
            color: "#9fb2d6",
            fontSize: "1.05rem",
            lineHeight: 1.7,
        },
        featureGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.75rem",
        },
        featureCard: {
            position: "relative",
            padding: "1.9rem 1.75rem",
            borderRadius: "1.1rem",
            background: "rgba(21, 30, 48, 0.75)",
            border: "1px solid rgba(56, 189, 248, 0.14)",
            boxShadow: "0 22px 50px -34px rgba(56, 189, 248, 0.55)",
            display: "flex",
            flexDirection: "column",
            gap: "0.85rem",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
        },
        featureIconWrap: {
            width: "3rem",
            height: "3rem",
            borderRadius: "0.9rem",
            background: "linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(14, 165, 233, 0.08))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.75rem",
            color: "#38bdf8",
        },
        featureTitle: {
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#f1f5f9",
        },
        featureBlurb: {
            color: "#93a8cc",
            fontSize: "0.98rem",
            lineHeight: 1.6,
        },
        featureTag: {
            alignSelf: "flex-start",
            background: "rgba(56, 189, 248, 0.16)",
            color: "#38bdf8",
            borderRadius: "0.65rem",
            padding: "0.35rem 0.75rem",
            fontSize: "0.78rem",
            letterSpacing: "0.08em",
            fontWeight: 600,
            textTransform: "uppercase",
        },
        flowsSection: {
            padding: "5rem 2rem",
            background: "rgba(7, 13, 26, 0.85)",
        },
        flowGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.6rem",
            marginTop: "2.75rem",
        },
        flowCard: {
            padding: "1.8rem",
            borderRadius: "1.1rem",
            background: "rgba(17, 25, 43, 0.78)",
            border: "1px solid rgba(99, 102, 241, 0.22)",
            display: "flex",
            flexDirection: "column",
            gap: "0.85rem",
            position: "relative",
        },
        flowIndex: {
            position: "absolute",
            top: "-18px",
            left: "1.5rem",
            padding: "0.35rem 0.9rem",
            borderRadius: "999px",
            background: "linear-gradient(135deg, rgba(96, 165, 250, 0.22), rgba(129, 140, 248, 0.22))",
            color: "#c7d2fe",
            fontWeight: 600,
            fontSize: "0.85rem",
            letterSpacing: "0.08em",
        },
        flowTitle: {
            fontSize: "1.18rem",
            fontWeight: 600,
            color: "#ebeefc",
        },
        flowDescription: {
            color: "#8ca4d6",
            fontSize: "0.95rem",
            lineHeight: 1.65,
        },
        integrationSection: {
            padding: "4.5rem 2rem",
        },
        integrationBelt: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "2.5rem",
        },
        integrationTag: {
            padding: "0.75rem 1.1rem",
            borderRadius: "0.85rem",
            background: "rgba(15, 27, 46, 0.78)",
            border: "1px solid rgba(56, 189, 248, 0.18)",
            color: "#9fb2d6",
            fontSize: "0.92rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
        },
        ctaSection: {
            padding: "5.5rem 2rem 4.5rem",
        },
        ctaInner: {
            maxWidth: "760px",
            margin: "0 auto",
            padding: "3.1rem",
            borderRadius: "1.6rem",
            textAlign: "center",
            background: "linear-gradient(135deg, rgba(56, 189, 248, 0.16), rgba(129, 140, 248, 0.18))",
            border: "1px solid rgba(56, 189, 248, 0.22)",
            boxShadow: "0 38px 70px -38px rgba(56, 189, 248, 0.68)",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
        },
        ctaTitle: {
            fontSize: "2.35rem",
            fontWeight: 700,
            color: "#eef6ff",
            lineHeight: 1.25,
        },
        ctaDescription: {
            color: "#cbd5f5",
            fontSize: "1.05rem",
            lineHeight: 1.75,
        },
    };

    const metrics = [
        { value: "10k+", label: "Focus launches every day" },
        { value: "4.8★", label: "Community rating across platforms" },
        { value: "28%", label: "Average lift in deep-work hours" },
    ];

    const featureHighlights = [
        {
            icon: "⏱️",
            title: "Adaptive focus blocks",
            blurb: "Preset rhythms respond to energy peaks and protect intentional downtime.",
            tag: "Timers",
        },
        {
            icon: "📊",
            title: "Momentum telemetry",
            blurb: "Real-time dashboards surface streaks, dips, and nudges to stay on course.",
            tag: "Insights",
        },
        {
            icon: "🤝",
            title: "Squad rituals",
            blurb: "Shared rooms, async check-ins, and highlights keep crews accountable without pressure.",
            tag: "Teams",
        },
        {
            icon: "🪄",
            title: "Automation recipes",
            blurb: "Trigger updates to Slack, Notion, or email the moment a session wraps.",
            tag: "Workflows",
        },
        {
            icon: "🎯",
            title: "Goal lanes",
            blurb: "Translate quarterly objectives into weekly focus themes everyone can see.",
            tag: "Planning",
        },
        {
            icon: "🔐",
            title: "Privacy-first by design",
            blurb: "Own your data with granular controls and export whenever you need context elsewhere.",
            tag: "Security",
        },
    ];

    const flowMoments = [
        {
            title: "Plot your focus runway",
            description: "Drop tasks into adaptive stacks and let FocusFlow suggest ideal slots for deep work.",
        },
        {
            title: "Launch immersive sessions",
            description: "Soundscapes, countdown cues, and distraction logging keep you rooted in the zone.",
        },
        {
            title: "Review momentum in minutes",
            description: "Daily recaps flag wins, blockers, and energy patterns—no spreadsheets required.",
        },
        {
            title: "Celebrate as a crew",
            description: "Ship highlights to your squad and keep streaks alive with lightweight rituals.",
        },
    ];

    const integrations = [
        "Slack pulses",
        "Google Calendar",
        "Notion sync",
        "Linear issues",
        "ClickUp boards",
        "Zapier webhooks",
    ];

    return (
        <div style={styles.page}>
            <LandingNavbar />
            <section style={styles.hero}>
                <div style={styles.heroGlow} />
                <div style={styles.heroInner}>
                    <span style={styles.heroBadge}>FocusFlow feature tour</span>
                    <h1 style={styles.heroTitle}>Less noise, more signal for every focus ritual</h1>
                    <p style={styles.heroSubtitle}>
                        FocusFlow distills deep work, team rituals, and insights into cinematic views your crew actually enjoys opening.
                    </p>
                    <div style={styles.heroMetrics}>
                        {metrics.map((metric) => (
                            <div key={metric.label} style={styles.heroMetric}>
                                <div style={styles.heroMetricValue}>{metric.value}</div>
                                <div style={styles.heroMetricLabel}>{metric.label}</div>
                            </div>
                        ))}
                    </div>
                    <div style={styles.heroActions}>
                        <button
                            style={styles.primaryButton}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-3px)";
                                e.currentTarget.style.boxShadow = "0 36px 70px -36px rgba(56, 189, 248, 0.82)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0px)";
                                e.currentTarget.style.boxShadow = "0 28px 60px -34px rgba(56, 189, 248, 0.75)";
                            }}
                        >
                            Launch free workspace
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
                        >
                            Preview guided demo
                        </button>
                    </div>
                </div>
            </section>

            <section style={styles.section}>
                <div style={styles.container}>
                    <div style={styles.sectionHeading}>
                        <span style={styles.sectionEyebrow}>Feature snapshots</span>
                        <h2 style={styles.sectionTitle}>See what matters in a glance</h2>
                        <p style={styles.sectionLead}>
                            FocusFlow highlights your most powerful rituals with compact cards so teams can align without wading through paragraphs.
                        </p>
                    </div>
                    <div style={styles.featureGrid}>
                        {featureHighlights.map((feature) => (
                            <div key={feature.title} style={styles.featureCard}>
                                <div style={styles.featureIcon}>{feature.icon}</div>
                                <div style={styles.featureTitle}>{feature.title}</div>
                                <p style={styles.featureBlurb}>{feature.blurb}</p>
                                <span style={styles.featureTag}>{feature.tag}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={styles.flowsSection}>
                <div style={styles.container}>
                    <div style={styles.sectionHeading}>
                        <span style={styles.sectionEyebrow}>Workflow arc</span>
                        <h2 style={styles.sectionTitle}>A calmer journey from planning to applause</h2>
                        <p style={styles.sectionLead}>
                            Follow the four rituals that keep momentum compounding—each one framed with just enough context to make the next step obvious.
                        </p>
                    </div>
                    <div style={styles.flowGrid}>
                        {flowMoments.map((moment, idx) => (
                            <div key={moment.title} style={styles.flowCard}>
                                <span style={styles.flowIndex}>{`Step ${idx + 1}`}</span>
                                <div style={styles.flowTitle}>{moment.title}</div>
                                <p style={styles.flowDescription}>{moment.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={styles.integrationSection}>
                <div style={styles.container}>
                    <div style={styles.sectionHeading}>
                        <span style={styles.sectionEyebrow}>Integrations</span>
                        <h2 style={styles.sectionTitle}>Plays nicely with your ecosystem</h2>
                        <p style={styles.sectionLead}>
                            Snap FocusFlow into the tools you already live in—no copy-paste gymnastics or relearning muscle memory.
                        </p>
                    </div>
                    <div style={styles.integrationBelt}>
                        {integrations.map((item) => (
                            <span key={item} style={styles.integrationTag}>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <section style={styles.ctaSection}>
                <div style={styles.ctaInner}>
                    <h2 style={styles.ctaTitle}>Rehearse your highest-impact week in five minutes</h2>
                    <p style={styles.ctaDescription}>
                        Launch a workspace, invite your crew, and decide together what deserves protection. FocusFlow keeps the rhythm steady.
                    </p>
                    <button
                        style={styles.primaryButton}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.boxShadow = "0 36px 70px -36px rgba(56, 189, 248, 0.82)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0px)";
                            e.currentTarget.style.boxShadow = "0 28px 60px -34px rgba(56, 189, 248, 0.75)";
                        }}
                    >
                        Start your focus lab
                    </button>
                </div>
            </section>
            <LandingFooter />
        </div>
    );
};

export default Features;
