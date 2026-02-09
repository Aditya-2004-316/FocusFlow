import React from "react";
import useResponsive from "../hooks/useResponsive";
import {
    FaBullseye,
    FaChartLine,
    FaUsers,
    FaMagic,
    FaShieldAlt,
    FaClock,
    FaCogs,
    FaRocket,
    FaSlack,
    FaTrello,
    FaGoogle,
    FaBookOpen,
} from "react-icons/fa";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../styles/CardHover.css";

const heroStats = [
    { value: "10,000+", label: "Teams on FocusFlow" },
    { value: "30%", label: "Drop in burnout" },
    { value: "25%", label: "Lift in shipped work" },
];

const featureTiles = [
    {
        icon: <FaBullseye />,
        tag: "Ritual engine",
        title: "Intentional workflows",
        blurb: "Blueprint every sprint with guided focus blocks, standups, and wrap-ups tailored to the outcomes you chase.",
    },
    {
        icon: <FaChartLine />,
        tag: "Live telemetry",
        title: "Actionable pulse",
        blurb: "Storyboards surface streaks, blockers, and energy dips—no spreadsheets, no manual reporting nights.",
    },
    {
        icon: <FaUsers />,
        tag: "Social focus",
        title: "Team rooms",
        blurb: "Run accountability pods, async standups, and shared retros without losing the calm cadence.",
    },
    {
        icon: <FaMagic />,
        tag: "Templates",
        title: "Guided starts",
        blurb: "Drop-in ritual packs launch product squads, agencies, and students in under five minutes.",
    },
];

const flowBeats = [
    {
        step: "01",
        label: "Plot",
        title: "Plan the runway",
        copy: "Drag goals onto an adaptive planner—FocusFlow auto-suggests deep work slots, collaborators, and reminders.",
    },
    {
        step: "02",
        label: "Protect",
        title: "Launch immersive sessions",
        copy: "Distraction logging, ambient soundscapes, and countdown cues keep every focus room locked in.",
    },
    {
        step: "03",
        label: "Pulse",
        title: "Review momentum",
        copy: "Daily pulse cards highlight wins, dips, and the next best action—automatically shared with your crew.",
    },
    {
        step: "04",
        label: "Celebrate",
        title: "Amplify the wins",
        copy: "Push streaks to Slack or email so progress stays collective and celebrated across time zones.",
    },
];

const pillarStacks = [
    {
        icon: <FaShieldAlt />,
        title: "Enterprise-grade security",
        points: ["SOC 2 roadmap, GDPR aligned", "AES-256 + TLS 1.3 encryption", "Role-based permissions for calm governance"],
    },
    {
        icon: <FaClock />,
        title: "Built for async scale",
        points: ["Timezone-aware rituals", "Smart reminders that never nag", "Shared storyboards with version history"],
    },
    {
        icon: <FaCogs />,
        title: "Automation ready",
        points: ["Trigger workflows from focus outcomes", "Send data to your BI stack", "Open API + Zapier connectors"],
    },
];

const integrationWall = [
    { name: "Slack", icon: <FaSlack /> },
    { name: "Notion", icon: <FaBookOpen /> },
    { name: "Google Calendar", icon: <FaGoogle /> },
    { name: "Linear", icon: <FaRocket /> },
    { name: "Trello", icon: <FaTrello /> },
];

const testimonialDeck = [
    {
        quote: "FocusFlow became the rhythm layer for our product org—burnout fell by a third and every retro finally feels useful.",
        author: "Priya Raman · Director of Product, Northwind Collective",
    },
    {
        quote: "We swapped five dashboards for FocusFlow’s storyboard. Leadership and makers stay synced without extra meetings.",
        author: "Aaron Wells · COO, Pioneer Labs",
    },
];

const onboardingSteps = [
    "Spin up a workspace and choose your ritual pack",
    "Invite teammates or start solo—templates included",
    "Book a concierge walkthrough to tailor automations",
];

const Product = () => {
    const { isMobile, isTablet, width } = useResponsive();
    const isCompact = width < 600;

    const getStyles = () => ({
        page: {
            minHeight: "100vh",
            background: "linear-gradient(188deg, #040915 0%, #101a31 55%, #050b18 100%)",
            color: "#ffffff",
        },
        hero: {
            position: "relative",
            padding: isMobile ? "3rem 1rem 2.5rem" : "6.2rem 2rem 4.8rem",
            overflow: "hidden",
        },
        heroGlow: {
            position: "absolute",
            inset: "-260px auto auto 50%",
            transform: "translateX(-50%)",
            width: isMobile ? "500px" : "820px",
            height: isMobile ? "500px" : "820px",
            background: "radial-gradient(circle at center, rgba(56, 189, 248, 0.24), transparent 68%)",
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
            gap: isMobile ? "1.5rem" : "1.9rem",
            textAlign: "center",
            justifyItems: "center",
        },
        heroBadge: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            padding: isMobile ? "0.45rem 1rem" : "0.55rem 1.2rem",
            borderRadius: "9999px",
            border: "1px solid rgba(56, 189, 248, 0.45)",
            background: "rgba(15, 23, 42, 0.72)",
            color: "#38bdf8",
            letterSpacing: "0.14em",
            fontSize: isMobile ? "0.75rem" : "0.82rem",
            fontWeight: 600,
            textTransform: "uppercase",
        },
        heroTitle: {
            fontSize: isMobile ? "1.85rem" : isTablet ? "2.5rem" : "3.15rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            margin: 0,
            lineHeight: 1.12,
            background: "linear-gradient(115deg, #38bdf8, #60a5fa, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            padding: isMobile ? "0 0.5rem" : "0",
        },
        heroLead: {
            maxWidth: "48rem",
            color: "#cbd5f5",
            fontSize: isMobile ? "0.95rem" : "1.16rem",
            lineHeight: 1.78,
            padding: isMobile ? "0 0.5rem" : "0",
        },
        statRow: {
            display: "grid",
            gridTemplateColumns: width >= 768 ? "repeat(3, 1fr)" : "1fr",
            gap: isMobile ? "0.85rem" : "1.2rem",
            width: "100%",
        },
        statCard: {
            padding: isMobile ? "1.25rem" : "1.6rem",
            borderRadius: "1.15rem",
            background: "rgba(18, 28, 48, 0.82)",
            border: "1px solid rgba(148, 163, 184, 0.25)",
            boxShadow: "0 30px 65px -40px rgba(56, 189, 248, 0.6)",
            display: "grid",
            gap: "0.35rem",
        },
        statValue: {
            fontSize: isMobile ? "1.6rem" : "1.98rem",
            fontWeight: 700,
            color: "#38bdf8",
        },
        statLabel: {
            color: "#9fb2d6",
            fontSize: isMobile ? "0.85rem" : "0.94rem",
        },
        heroActions: {
            display: "flex",
            gap: "0.9rem",
            flexWrap: "wrap",
            justifyContent: "center",
            flexDirection: isCompact ? "column" : "row",
            alignItems: "center",
            width: isCompact ? "100%" : "auto",
            maxWidth: isCompact ? "320px" : "none",
        },
        primaryButton: {
            background: "linear-gradient(110deg, #38bdf8, #818cf8)",
            color: "#0f172a",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderBottom: "none",
            padding: isMobile ? "0.85rem 2rem" : "0.95rem 2.6rem",
            borderRadius: "9999px",
            fontWeight: 700,
            fontSize: isMobile ? "0.95rem" : "1.05rem",
            cursor: "pointer",
            boxShadow: "0 28px 62px -34px rgba(56, 189, 248, 0.75)",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
            width: isCompact ? "100%" : "auto",
        },
        secondaryButton: {
            background: "rgba(15, 23, 42, 0.82)",
            color: "#38bdf8",
            borderTop: "1px solid rgba(56, 189, 248, 0.35)",
            borderLeft: "1px solid rgba(56, 189, 248, 0.35)",
            borderRight: "1px solid rgba(56, 189, 248, 0.35)",
            borderBottom: "1px solid rgba(56, 189, 248, 0.35)",
            padding: isMobile ? "0.85rem 2rem" : "0.95rem 2.35rem",
            borderRadius: "9999px",
            fontWeight: 600,
            fontSize: isMobile ? "0.95rem" : "1.02rem",
            cursor: "pointer",
            transition: "transform 0.25s ease, border-color 0.25s ease",
            width: isCompact ? "100%" : "auto",
        },
        section: {
            padding: isMobile ? "2.5rem 1rem" : "4.8rem 2rem",
        },
        sectionHeader: {
            textAlign: "center",
            display: "grid",
            gap: "0.6rem",
            marginBottom: isMobile ? "2rem" : "2.6rem",
            justifyItems: "center",
        },
        eyebrow: {
            fontSize: isMobile ? "0.75rem" : "0.82rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(148, 163, 184, 0.88)",
            fontWeight: 600,
        },
        sectionTitle: {
            fontSize: isMobile ? "1.55rem" : isTablet ? "1.9rem" : "2.25rem",
            fontWeight: 700,
            color: "#f8fafc",
            padding: isMobile ? "0 0.5rem" : "0",
        },
        sectionLead: {
            maxWidth: "44rem",
            color: "#9fb2d6",
            fontSize: isMobile ? "0.92rem" : "1.02rem",
            lineHeight: 1.72,
            padding: isMobile ? "0 0.5rem" : "0",
        },
        tilesGrid: {
            display: "grid",
            gridTemplateColumns: width >= 1028 ? "repeat(4, 1fr)" : width >= 696 ? "repeat(2, 1fr)" : "1fr",
            gap: isMobile ? "1.1rem" : "1.85rem",
        },
        featureCard: {
            padding: isMobile ? "1.5rem" : "1.85rem",
            borderRadius: "1.2rem",
            background: "rgba(17, 25, 43, 0.88)",
            border: "1px solid rgba(56, 189, 248, 0.2)",
            boxShadow: "0 24px 52px -36px rgba(56, 189, 248, 0.55)",
            display: "grid",
            gap: "0.75rem",
        },
        featureIcon: {
            width: isMobile ? "2.4rem" : "2.8rem",
            height: isMobile ? "2.4rem" : "2.8rem",
            borderRadius: "0.85rem",
            background: "rgba(56, 189, 248, 0.16)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#38bdf8",
            fontSize: isMobile ? "1.2rem" : "1.4rem",
        },
        featureTag: {
            fontSize: isMobile ? "0.72rem" : "0.78rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#38bdf8",
            fontWeight: 600,
        },
        featureTitle: {
            fontSize: isMobile ? "1.08rem" : "1.2rem",
            fontWeight: 600,
            color: "#f1f5f9",
        },
        featureCopy: {
            color: "#94a3b8",
            fontSize: isMobile ? "0.88rem" : "0.95rem",
            lineHeight: 1.68,
        },
        flowsGrid: {
            display: "grid",
            gridTemplateColumns: width >= 1028 ? "repeat(4, 1fr)" : width >= 696 ? "repeat(2, 1fr)" : "1fr",
            gap: isMobile ? "1.5rem" : "1.5rem",
        },
        flowCard: {
            position: "relative",
            padding: isMobile ? "1.5rem" : "1.85rem",
            borderRadius: "1.15rem",
            background: "rgba(12, 20, 36, 0.9)",
            border: "1px solid rgba(129, 140, 248, 0.24)",
            display: "grid",
            gap: "0.7rem",
            marginTop: "1rem",
        },
        flowStep: {
            position: "absolute",
            top: "-18px",
            left: "1.6rem",
            padding: "0.42rem 0.95rem",
            borderRadius: "999px",
            background: "linear-gradient(135deg, rgba(96, 165, 250, 0.32), rgba(129, 140, 248, 0.28))",
            color: "#c7d2fe",
            fontSize: isMobile ? "0.75rem" : "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
        },
        flowLabel: {
            color: "#38bdf8",
            fontSize: isMobile ? "0.8rem" : "0.88rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
        },
        flowTitle: {
            fontSize: isMobile ? "1.05rem" : "1.15rem",
            fontWeight: 600,
            color: "#f8fafc",
        },
        flowCopy: {
            color: "#9fb2d6",
            fontSize: isMobile ? "0.88rem" : "0.94rem",
            lineHeight: 1.68,
        },
        pillarsGrid: {
            display: "grid",
            gridTemplateColumns: width >= 900 ? "repeat(3, 1fr)" : "1fr",
            gap: "1.6rem",
        },
        pillarCard: {
            padding: isMobile ? "1.5rem" : "1.9rem",
            borderRadius: "1.2rem",
            background: "rgba(17, 26, 44, 0.82)",
            border: "1px solid rgba(56, 189, 248, 0.22)",
            display: "grid",
            gap: "0.8rem",
        },
        pillarTitle: {
            fontSize: isMobile ? "1.02rem" : "1.12rem",
            fontWeight: 600,
            color: "#f1f5f9",
        },
        pillarList: {
            margin: 0,
            paddingLeft: "1.15rem",
            color: "#9fb2d6",
            fontSize: isMobile ? "0.88rem" : "0.94rem",
            lineHeight: 1.65,
        },
        integrationsBar: {
            marginTop: isMobile ? "1.8rem" : "2.6rem",
            padding: isMobile ? "1.25rem" : "1.6rem",
            borderRadius: "1.2rem",
            background: "rgba(12, 20, 36, 0.82)",
            border: "1px solid rgba(56, 189, 248, 0.18)",
            display: "flex",
            flexWrap: "wrap",
            gap: isMobile ? "0.85rem" : "1.2rem",
            justifyContent: "center",
        },
        integrationChip: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: isMobile ? "0.55rem 0.9rem" : "0.65rem 1.1rem",
            borderRadius: "999px",
            background: "rgba(56, 189, 248, 0.14)",
            color: "#bae6fd",
            fontWeight: 600,
            fontSize: isMobile ? "0.85rem" : "0.92rem",
        },
        testimonialStack: {
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: width >= 768 ? "repeat(2, 1fr)" : "1fr",
        },
        testimonialCard: {
            padding: isMobile ? "1.5rem" : "1.9rem",
            borderRadius: "1.2rem",
            background: "rgba(12, 20, 36, 0.88)",
            border: "1px solid rgba(129, 140, 248, 0.28)",
            display: "grid",
            gap: "0.85rem",
        },
        testimonialQuote: {
            fontSize: isMobile ? "0.95rem" : "1.02rem",
            color: "#e2e8f0",
            lineHeight: 1.7,
        },
        testimonialAuthor: {
            color: "#94a3b8",
            fontSize: isMobile ? "0.85rem" : "0.92rem",
        },
        onboardingShell: {
            marginTop: isMobile ? "1.5rem" : "2.6rem",
            padding: isMobile ? "1.25rem" : "2.2rem",
            borderRadius: "1.4rem",
            background: "linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(129, 140, 248, 0.24))",
            border: "1px solid rgba(56, 189, 248, 0.28)",
            display: "grid",
            gap: isMobile ? "1.25rem" : "1.6rem",
            justifyItems: "center",
        },
        stepsList: {
            display: "grid",
            gap: isMobile ? "0.85rem" : "1rem",
            width: "100%",
            maxWidth: "520px",
        },
        stepItem: {
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: isMobile ? "0.75rem" : "1rem",
            alignItems: "center",
            padding: isMobile ? "0.85rem 1rem" : "1rem 1.2rem",
            borderRadius: "1rem",
            background: "rgba(15, 23, 42, 0.72)",
            border: "1px solid rgba(56, 189, 248, 0.24)",
        },
        stepIndex: {
            width: isMobile ? "2rem" : "2.4rem",
            height: isMobile ? "2rem" : "2.4rem",
            borderRadius: "0.8rem",
            background: "rgba(56, 189, 248, 0.16)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#38bdf8",
            fontWeight: 700,
            fontSize: isMobile ? "0.85rem" : "1rem",
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
                        <span style={styles.heroBadge}>Product walkthrough</span>
                        <h1 style={styles.heroTitle}>See FocusFlow in action</h1>
                        <p style={styles.heroLead}>
                            Protect time, ship calm, and keep every teammate in rhythm. Explore the rituals, dashboards, and
                            automations powering 10,000+ hybrid teams.
                        </p>
                        <div style={styles.statRow}>
                            {heroStats.map((stat) => (
                                <div key={stat.label} style={styles.statCard}>
                                    <span style={styles.statValue}>{stat.value}</span>
                                    <span style={styles.statLabel}>{stat.label}</span>
                                </div>
                            ))}
                        </div>
                        <div style={styles.heroActions}>
                            <button
                                style={styles.primaryButton}
                                onMouseEnter={(event) => {
                                    event.currentTarget.style.transform = "translateY(-3px)";
                                    event.currentTarget.style.boxShadow = "0 36px 68px -36px rgba(56, 189, 248, 0.82)";
                                }}
                                onMouseLeave={(event) => {
                                    event.currentTarget.style.transform = "translateY(0px)";
                                    event.currentTarget.style.boxShadow = styles.primaryButton.boxShadow;
                                }}
                            >
                                Start free workspace
                            </button>
                            <button
                                style={styles.secondaryButton}
                                onMouseEnter={(event) => {
                                    event.currentTarget.style.transform = "translateY(-3px)";
                                    event.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.55)";
                                }}
                                onMouseLeave={(event) => {
                                    event.currentTarget.style.transform = "translateY(0px)";
                                    event.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.35)";
                                }}
                            >
                                Watch 3‑minute tour
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section style={styles.section}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <span style={styles.eyebrow}>What you get</span>
                        <h2 style={styles.sectionTitle}>Four pillars that make deep focus a daily habit</h2>
                        <p style={styles.sectionLead}>
                            Each module is a ritual in disguise—easy to explain, easier to adopt, impossible to live without once the
                            cadence clicks.
                        </p>
                    </div>
                    <div style={styles.tilesGrid}>
                        {featureTiles.map((tile) => (
                            <div key={tile.title} style={styles.featureCard}>
                                <span style={styles.featureIcon}>{tile.icon}</span>
                                <span style={styles.featureTag}>{tile.tag}</span>
                                <span style={styles.featureTitle}>{tile.title}</span>
                                <p style={styles.featureCopy}>{tile.blurb}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={styles.section}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <span style={styles.eyebrow}>How it flows</span>
                        <h2 style={styles.sectionTitle}>From planning to applause in four guided beats</h2>
                        <p style={styles.sectionLead}>
                            FocusFlow keeps the cadence light so teams glide through setup, protect deep work, and celebrate together
                            without meetings multiplying.
                        </p>
                    </div>
                    <div style={styles.flowsGrid}>
                        {flowBeats.map((beat) => (
                            <div key={beat.step} style={styles.flowCard}>
                                <span style={styles.flowStep}>{beat.step}</span>
                                <span style={styles.flowLabel}>{beat.label}</span>
                                <span style={styles.flowTitle}>{beat.title}</span>
                                <p style={styles.flowCopy}>{beat.copy}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={styles.section}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <span style={styles.eyebrow}>Why teams trust FocusFlow</span>
                        <h2 style={styles.sectionTitle}>Built for scale, security, and serene execution</h2>
                        <p style={styles.sectionLead}>
                            Your focus platform should lower heart rates—not raise them. These guardrails keep fast-moving squads safe,
                            compliant, and automated.
                        </p>
                    </div>
                    <div style={styles.pillarsGrid}>
                        {pillarStacks.map((pillar) => (
                            <div key={pillar.title} style={styles.pillarCard}>
                                <span style={styles.featureIcon}>{pillar.icon}</span>
                                <span style={styles.pillarTitle}>{pillar.title}</span>
                                <ul style={styles.pillarList}>
                                    {pillar.points.map((point) => (
                                        <li key={point}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div style={styles.integrationsBar}>
                        {integrationWall.map((integration) => (
                            <span key={integration.name} style={styles.integrationChip}>
                                {integration.icon}
                                {integration.name}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <section style={styles.section}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <span style={styles.eyebrow}>Proof in the practice</span>
                        <h2 style={styles.sectionTitle}>Teams keep coming back for the calm</h2>
                        <p style={styles.sectionLead}>
                            From venture-backed startups to university labs, FocusFlow becomes the ritual layer that keeps momentum
                            steady.
                        </p>
                    </div>
                    <div style={styles.testimonialStack}>
                        {testimonialDeck.map((card) => (
                            <div key={card.author} style={styles.testimonialCard}>
                                <p style={styles.testimonialQuote}>“{card.quote}”</p>
                                <span style={styles.testimonialAuthor}>{card.author}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={styles.section}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <span style={styles.eyebrow}>Ready to get started?</span>
                        <h2 style={styles.sectionTitle}>Launch your free workspace today</h2>
                    </div>
                    <div style={styles.onboardingShell}>
                        <div style={styles.stepsList}>
                            {onboardingSteps.map((step, index) => (
                                <div key={step} style={styles.stepItem}>
                                    <span style={styles.stepIndex}>{`0${index + 1}`}</span>
                                    <span style={{ color: "#e2e8f0", fontSize: "0.98rem", lineHeight: 1.6 }}>{step}</span>
                                </div>
                            ))}
                        </div>
                        <button
                            style={styles.primaryButton}
                            onMouseEnter={(event) => {
                                event.currentTarget.style.transform = "translateY(-3px)";
                                event.currentTarget.style.boxShadow = "0 38px 72px -34px rgba(56, 189, 248, 0.82)";
                            }}
                            onMouseLeave={(event) => {
                                event.currentTarget.style.transform = "translateY(0px)";
                                event.currentTarget.style.boxShadow = styles.primaryButton.boxShadow;
                            }}
                        >
                            Create your workspace
                        </button>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
};

export default Product;
