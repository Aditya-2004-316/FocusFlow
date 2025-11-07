import React from "react";
import { FaBolt, FaCloudMoon, FaCompass, FaGlobe, FaLaptopCode, FaPenNib, FaPeopleCarry, FaUsers } from "react-icons/fa";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../styles/CardHover.css";

const heroSignals = [
    { label: "Contributors", value: "50+", highlight: "Open source core" },
    { label: "Time zones", value: "12", highlight: "Remote-first" },
    { label: "Users served", value: "10k+", highlight: "Global reach" },
];

const culturePillars = [
    {
        icon: <FaCompass />,
        title: "Aligned autonomy",
        copy: "Own outcomes with rituals that keep the squad synced, never micromanaged.",
    },
    {
        icon: <FaCloudMoon />,
        title: "Calm velocity",
        copy: "We ship weekly without heroic sprints—rested brains build better.",
    },
    {
        icon: <FaGlobe />,
        title: "Inclusive circles",
        copy: "Async-first, timezone-aware, and intentional about inviting new voices in.",
    },
    {
        icon: <FaBolt />,
        title: "Learning loops",
        copy: "Post-ship retros, mentorship pods, and budgets for curiosity-led projects.",
    },
];

const openRoles = [
    {
        title: "Product Designer",
        type: "Contract · Remote",
        mission: "Craft cinematic focus rituals across web & mobile surfaces.",
        impact: "Shape the UI kit, soundscapes, and accessibility guidelines.",
        stack: ["Figma", "Design tokens", "WCAG", "Motion"],
        contact: "mailto:careers@focusflow.com?subject=Product%20Designer",
    },
    {
        title: "Full-stack Engineer",
        type: "Contract · Remote",
        mission: "Ship focus analytics, integrations, and multiplayer rituals.",
        impact: "Own API surfaces and cross-platform performance tuning.",
        stack: ["React", "Node.js", "MongoDB", "WebSockets"],
        contact: "mailto:careers@focusflow.com?subject=Full-stack%20Engineer",
    },
    {
        title: "Community Producer",
        type: "Contract · Remote",
        mission: "Host the contributor guild, play-test rituals, and amplify wins.",
        impact: "Ship event cadences, creator spotlights, and contributor onboarding.",
        stack: ["Notion", "Discord", "Storytelling", "Facilitation"],
        contact: "mailto:careers@focusflow.com?subject=Community%20Producer",
    },
];

const internshipStats = [
    { label: "Season", value: "Spring / Summer 2025" },
    { label: "Rhythm", value: "12-week pods" },
    { label: "Mentors", value: "Dedicated craft leads" },
    { label: "Perks", value: "Stipend + hardware grant" },
];

const hiringTimeline = [
    {
        step: "01",
        title: "Signal your interest",
        copy: "Send a short hello with links that showcase your craft. No cover letter needed.",
        eta: "< 10 mins",
    },
    {
        step: "02",
        title: "Async intro",
        copy: "We exchange Looms or short calls to understand your rituals, ambitions, and fit.",
        eta: "25 mins",
    },
    {
        step: "03",
        title: "Craft challenge",
        copy: "Collaborate on a scoped brief that mirrors real FocusFlow work. Co-build, don't audition.",
        eta: "1-2 hrs",
    },
    {
        step: "04",
        title: "Crew round",
        copy: "Meet collaborators across design, engineering, and community for alignment checks.",
        eta: "40 mins",
    },
    {
        step: "05",
        title: "Offer & onboarding",
        copy: "Join a welcome circle, set your ritual cadences, and ship your first win in week one.",
        eta: "48 hrs",
    },
];

const callToAction = {
    headline: "Let’s build the calm productivity frontier together",
    body: "Whether you’re designing rituals, writing code, or stewarding community, FocusFlow is a place to experiment, iterate, and see your craft reach thousands.",
    primary: {
        label: "Share your portfolio",
        link: "mailto:careers@focusflow.com",
    },
    secondary: {
        label: "Meet the team",
        link: "mailto:focusflow@studentproject.com?subject=Coffee%20chat",
    },
};

const styles = {
    page: {
        minHeight: "100vh",
        background: "linear-gradient(188deg, #040915 0%, #101a31 55%, #050b18 100%)",
        color: "#ffffff",
    },
    hero: {
        position: "relative",
        padding: "6.2rem 2rem 4.6rem",
        overflow: "hidden",
    },
    heroGlow: {
        position: "absolute",
        inset: "-260px auto auto 50%",
        transform: "translateX(-50%)",
        width: "760px",
        height: "760px",
        background: "radial-gradient(circle at center, rgba(56, 189, 248, 0.22), transparent 68%)",
        filter: "blur(18px)",
    },
    container: {
        maxWidth: "1120px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
    },
    heroInner: {
        display: "grid",
        gap: "1.8rem",
        textAlign: "center",
        alignItems: "center",
        justifyItems: "center",
    },
    heroBadge: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.55rem 1.2rem",
        borderRadius: "9999px",
        border: "1px solid rgba(56, 189, 248, 0.45)",
        background: "rgba(15, 23, 42, 0.7)",
        color: "#38bdf8",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        fontSize: "0.82rem",
        fontWeight: 600,
    },
    heroTitle: {
        fontSize: "3.15rem",
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
        maxWidth: "46rem",
        color: "#cbd5f5",
        fontSize: "1.15rem",
        lineHeight: 1.76,
    },
    heroStats: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1.35rem",
        width: "100%",
    },
    heroStatCard: {
        padding: "1.55rem",
        borderRadius: "1.1rem",
        background: "rgba(18, 28, 48, 0.82)",
        border: "1px solid rgba(148, 163, 184, 0.25)",
        boxShadow: "0 28px 55px -34px rgba(56, 189, 248, 0.55)",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        gap: "0.45rem",
    },
    heroStatValue: {
        fontSize: "1.95rem",
        fontWeight: 700,
        color: "#38bdf8",
    },
    heroStatLabel: {
        color: "#9fb2d6",
        fontSize: "0.96rem",
    },
    heroStatHighlight: {
        color: "#38bdf8",
        fontSize: "0.82rem",
        fontWeight: 600,
    },
    main: {
        padding: "4.8rem 2rem 4.6rem",
    },
    section: {
        marginBottom: "4.4rem",
    },
    sectionHeader: {
        marginBottom: "2.4rem",
        display: "grid",
        gap: "0.6rem",
        textAlign: "center",
        justifyItems: "center",
    },
    sectionTitle: {
        fontSize: "2.1rem",
        fontWeight: 700,
        color: "#f8fafc",
    },
    sectionLead: {
        maxWidth: "46rem",
        fontSize: "1.02rem",
        lineHeight: 1.74,
        color: "#94a3b8",
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
        fontSize: "1.18rem",
        fontWeight: 600,
        color: "#f1f5f9",
    },
    pillarCopy: {
        color: "#94a3b8",
        fontSize: "0.95rem",
        lineHeight: 1.65,
    },
    roleGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.6rem",
    },
    roleCard: {
        padding: "2rem 1.8rem",
        borderRadius: "1.2rem",
        background: "rgba(15, 23, 42, 0.82)",
        border: "1px solid rgba(56, 189, 248, 0.24)",
        display: "flex",
        flexDirection: "column",
        gap: "0.85rem",
        boxShadow: "0 28px 64px -38px rgba(56, 189, 248, 0.4)",
    },
    roleHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "0.6rem",
        flexWrap: "wrap",
    },
    roleTitle: {
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "#f8fafc",
    },
    roleType: {
        color: "#38bdf8",
        fontSize: "0.9rem",
        fontWeight: 600,
    },
    roleMission: {
        color: "#9fb2d6",
        fontSize: "0.97rem",
        lineHeight: 1.65,
    },
    tagRow: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.45rem",
    },
    tag: {
        padding: "0.28rem 0.7rem",
        borderRadius: "9999px",
        background: "rgba(56, 189, 248, 0.12)",
        border: "1px solid rgba(56, 189, 248, 0.32)",
        color: "#38bdf8",
        fontSize: "0.85rem",
        fontWeight: 600,
    },
    roleLink: {
        alignSelf: "flex-start",
        marginTop: "0.4rem",
        color: "#38bdf8",
        fontWeight: 600,
        textDecoration: "underline",
    },
    internshipWrap: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.4rem",
        marginTop: "2.2rem",
    },
    internshipCard: {
        padding: "1.55rem",
        borderRadius: "1rem",
        background: "rgba(12, 20, 36, 0.9)",
        border: "1px solid rgba(129, 140, 248, 0.24)",
        textAlign: "center",
    },
    internshipLabel: {
        color: "#9fb2d6",
        fontSize: "0.9rem",
    },
    internshipValue: {
        color: "#38bdf8",
        fontSize: "1.08rem",
        fontWeight: 700,
        marginTop: "0.35rem",
    },
    timeline: {
        marginTop: "2.6rem",
        display: "grid",
        gap: "1.35rem",
    },
    timelineItem: {
        display: "flex",
        gap: "1.4rem",
        alignItems: "flex-start",
        background: "rgba(17, 26, 44, 0.78)",
        border: "1px solid rgba(56, 189, 248, 0.2)",
        borderRadius: "1.1rem",
        padding: "1.6rem",
    },
    timelineStep: {
        width: "3.1rem",
        height: "3.1rem",
        borderRadius: "0.9rem",
        background: "linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(129, 140, 248, 0.46))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#e2e8f0",
        fontWeight: 700,
        fontSize: "1.05rem",
    },
    timelineContent: {
        flex: 1,
        display: "grid",
        gap: "0.4rem",
    },
    timelineTitle: {
        fontSize: "1.15rem",
        fontWeight: 600,
        color: "#f8fafc",
    },
    timelineMeta: {
        color: "#38bdf8",
        fontSize: "0.85rem",
        fontWeight: 600,
    },
    timelineCopy: {
        color: "#94a3b8",
        fontSize: "0.96rem",
        lineHeight: 1.62,
    },
    ctaSection: {
        padding: "4.8rem 2rem 4.2rem",
    },
    ctaCard: {
        maxWidth: "780px",
        margin: "0 auto",
        padding: "3.1rem",
        borderRadius: "1.65rem",
        background: "linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(129, 140, 248, 0.24))",
        border: "1px solid rgba(56, 189, 248, 0.3)",
        textAlign: "center",
        display: "grid",
        gap: "1.35rem",
        boxShadow: "0 40px 78px -40px rgba(56, 189, 248, 0.6)",
    },
    ctaTitle: {
        fontSize: "2.15rem",
        fontWeight: 700,
        color: "#eef6ff",
    },
    ctaCopy: {
        color: "#cbd5f5",
        fontSize: "1.02rem",
        lineHeight: 1.74,
    },
    ctaActions: {
        display: "flex",
        justifyContent: "center",
        gap: "0.9rem",
        flexWrap: "wrap",
    },
    primaryBtn: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.95rem 2.5rem",
        borderRadius: "9999px",
        background: "linear-gradient(110deg, #38bdf8, #818cf8)",
        color: "#0f172a",
        fontWeight: 700,
        fontSize: "1.02rem",
        border: "none",
        cursor: "pointer",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        boxShadow: "0 30px 60px -34px rgba(56, 189, 248, 0.7)",
    },
    secondaryBtn: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
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
};

const LandingCareers = () => {
    return (
        <div style={styles.page}>
            <LandingNavbar />
            <section style={styles.hero}>
                <div style={styles.heroGlow} />
                <div style={styles.container}>
                    <div style={styles.heroInner}>
                        <span style={styles.heroBadge}>
                            <FaUsers /> FocusFlow Collective
                        </span>
                        <h1 style={styles.heroTitle}>Careers at FocusFlow</h1>
                        <p style={styles.heroLead}>
                            Join a distributed crew reimagining calm productivity. We co-build rituals, ship open source, and
                            protect focus for thousands of teams and students worldwide.
                        </p>
                        <div style={styles.heroStats}>
                            {heroSignals.map((signal) => (
                                <div key={signal.label} style={styles.heroStatCard}>
                                    <span style={styles.heroStatValue}>{signal.value}</span>
                                    <span style={styles.heroStatLabel}>{signal.label}</span>
                                    <span style={styles.heroStatHighlight}>{signal.highlight}</span>
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
                            <h2 style={styles.sectionTitle}>How we work, together</h2>
                            <p style={styles.sectionLead}>
                                Culture is our operating system. These pillars keep us aligned while leaving plenty of room for
                                experimentation and personal rhythm.
                            </p>
                        </div>
                        <div style={styles.pillarGrid}>
                            {culturePillars.map((pillar) => (
                                <div key={pillar.title} style={styles.pillarCard}>
                                    <span style={styles.iconBadge}>{pillar.icon}</span>
                                    <span style={styles.pillarTitle}>{pillar.title}</span>
                                    <p style={styles.pillarCopy}>{pillar.copy}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>Roles currently in motion</h2>
                            <p style={styles.sectionLead}>
                                We design lean, cross-functional squads. Each role blends craft mastery with community-driven
                                experimentation.
                            </p>
                        </div>
                        <div style={styles.roleGrid}>
                            {openRoles.map((role) => (
                                <div key={role.title} style={styles.roleCard}>
                                    <div style={styles.roleHeader}>
                                        <span style={styles.roleTitle}>{role.title}</span>
                                        <span style={styles.roleType}>{role.type}</span>
                                    </div>
                                    <p style={styles.roleMission}>{role.mission}</p>
                                    <p style={styles.roleMission}>{role.impact}</p>
                                    <div style={styles.tagRow}>
                                        {role.stack.map((tag) => (
                                            <span key={tag} style={styles.tag}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <a href={role.contact} style={styles.roleLink}>
                                        Start the conversation →
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>Creator-in-residence internships</h2>
                            <p style={styles.sectionLead}>
                                A cohort-based path for students and early-career builders to co-create rituals, ship features,
                                and build a public portfolio alongside mentors.
                            </p>
                        </div>
                        <div style={styles.internshipWrap}>
                            {internshipStats.map((stat) => (
                                <div key={stat.label} style={styles.internshipCard}>
                                    <span style={styles.internshipLabel}>{stat.label}</span>
                                    <span style={styles.internshipValue}>{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>Our hiring rhythm</h2>
                            <p style={styles.sectionLead}>
                                Transparent steps, async-first touchpoints, and feedback loops at every milestone. We aim to keep
                                momentum without sacrificing depth.
                            </p>
                        </div>
                        <div style={styles.timeline}>
                            {hiringTimeline.map((stage) => (
                                <div key={stage.step} style={styles.timelineItem}>
                                    <span style={styles.timelineStep}>{stage.step}</span>
                                    <div style={styles.timelineContent}>
                                        <span style={styles.timelineTitle}>{stage.title}</span>
                                        <span style={styles.timelineMeta}>{stage.eta}</span>
                                        <span style={styles.timelineCopy}>{stage.copy}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <section style={styles.ctaSection}>
                <div style={styles.container}>
                    <div style={styles.ctaCard}>
                        <h2 style={styles.ctaTitle}>{callToAction.headline}</h2>
                        <p style={styles.ctaCopy}>{callToAction.body}</p>
                        <div style={styles.ctaActions}>
                            <button
                                style={styles.primaryBtn}
                                onMouseEnter={(event) => {
                                    event.currentTarget.style.transform = "translateY(-3px)";
                                    event.currentTarget.style.boxShadow = "0 38px 78px -38px rgba(56, 189, 248, 0.8)";
                                }}
                                onMouseLeave={(event) => {
                                    event.currentTarget.style.transform = "translateY(0px)";
                                    event.currentTarget.style.boxShadow = styles.primaryBtn.boxShadow;
                                }}
                                onClick={() => {
                                    window.location.href = callToAction.primary.link;
                                }}
                            >
                                {callToAction.primary.label}
                            </button>
                            <button
                                style={styles.secondaryBtn}
                                onMouseEnter={(event) => {
                                    event.currentTarget.style.transform = "translateY(-3px)";
                                    event.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.55)";
                                }}
                                onMouseLeave={(event) => {
                                    event.currentTarget.style.transform = "translateY(0px)";
                                    event.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.35)";
                                }}
                                onClick={() => {
                                    window.location.href = callToAction.secondary.link;
                                }}
                            >
                                {callToAction.secondary.label}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <LandingFooter />
        </div>
    );
};

export default LandingCareers;
