import React from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../styles/CardHover.css";

const Product = () => {
    const styles = {
        page: {
            minHeight: "100vh",
            background: "linear-gradient(185deg, #040915 0%, #0d1730 55%, #040915 100%)",
            color: "#ffffff",
        },
        hero: {
            position: "relative",
            padding: "6.25rem 2rem 4.75rem",
            textAlign: "center",
            overflow: "hidden",
        },
        heroOrbit: {
            position: "absolute",
            inset: "-230px auto auto 50%",
            transform: "translateX(-50%)",
            width: "680px",
            height: "680px",
            background: "radial-gradient(circle at center, rgba(56, 189, 248, 0.26), transparent 65%)",
            filter: "blur(14px)",
        },
        heroInner: {
            maxWidth: "860px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "1.6rem",
        },
        heroBadge: {
            alignSelf: "center",
            padding: "0.45rem 1.15rem",
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
            fontSize: "3.05rem",
            lineHeight: 1.12,
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
            maxWidth: "48rem",
            color: "#cbd5f5",
            fontSize: "1.12rem",
            lineHeight: 1.75,
        },
        heroMetrics: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1.15rem",
        },
        heroMetric: {
            minWidth: "190px",
            padding: "1.2rem 1.4rem",
            borderRadius: "1.1rem",
            background: "rgba(24, 36, 58, 0.68)",
            border: "1px solid rgba(148, 163, 184, 0.2)",
            boxShadow: "0 22px 52px -33px rgba(56, 189, 248, 0.6)",
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
            gap: "0.85rem",
            flexWrap: "wrap",
            marginTop: "0.6rem",
        },
        primaryButton: {
            background: "linear-gradient(110deg, #38bdf8, #818cf8)",
            color: "#0f172a",
            border: "none",
            padding: "0.95rem 2.55rem",
            borderRadius: "9999px",
            fontWeight: 700,
            fontSize: "1.05rem",
            cursor: "pointer",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
            boxShadow: "0 28px 62px -34px rgba(56, 189, 248, 0.75)",
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
            padding: "4.8rem 2rem",
        },
        container: {
            maxWidth: "1120px",
            margin: "0 auto",
        },
        sectionHeader: {
            display: "flex",
            flexDirection: "column",
            gap: "0.65rem",
            marginBottom: "2.8rem",
            textAlign: "center",
        },
        sectionEyebrow: {
            fontSize: "0.82rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(148, 163, 184, 0.85)",
            fontWeight: 600,
        },
        sectionTitle: {
            fontSize: "2.3rem",
            fontWeight: 700,
            color: "#f8fafc",
        },
        sectionLead: {
            maxWidth: "40rem",
            margin: "0 auto",
            color: "#9fb2d6",
            fontSize: "1.03rem",
            lineHeight: 1.7,
        },
        highlightGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.6rem",
        },
        highlightCard: {
            padding: "1.7rem",
            borderRadius: "1.1rem",
            background: "rgba(17, 25, 43, 0.78)",
            border: "1px solid rgba(56, 189, 248, 0.16)",
            boxShadow: "0 20px 48px -32px rgba(56, 189, 248, 0.55)",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
        },
        highlightIcon: {
            width: "2.8rem",
            height: "2.8rem",
            borderRadius: "0.85rem",
            background: "linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(14, 165, 233, 0.08))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.6rem",
            color: "#38bdf8",
        },
        highlightTitle: {
            fontSize: "1.2rem",
            fontWeight: 600,
            color: "#f1f5f9",
        },
        highlightBlurb: {
            color: "#8fa3c8",
            fontSize: "0.96rem",
            lineHeight: 1.6,
        },
        highlightTag: {
            alignSelf: "flex-start",
            background: "rgba(56, 189, 248, 0.16)",
            color: "#38bdf8",
            borderRadius: "0.65rem",
            padding: "0.3rem 0.65rem",
            fontSize: "0.78rem",
            letterSpacing: "0.08em",
            fontWeight: 600,
        },
        timeline: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.4rem",
        },
        timelineCard: {
            position: "relative",
            padding: "1.65rem",
            borderRadius: "1.05rem",
            background: "rgba(10, 16, 30, 0.9)",
            border: "1px solid rgba(99, 102, 241, 0.22)",
            display: "flex",
            flexDirection: "column",
            gap: "0.7rem",
        },
        timelineStep: {
            position: "absolute",
            top: "-16px",
            left: "1.5rem",
            padding: "0.32rem 0.85rem",
            borderRadius: "999px",
            background: "linear-gradient(135deg, rgba(96, 165, 250, 0.22), rgba(129, 140, 248, 0.24))",
            color: "#c7d2fe",
            fontWeight: 600,
            fontSize: "0.82rem",
            letterSpacing: "0.08em",
        },
        timelineTitle: {
            fontSize: "1.16rem",
            fontWeight: 600,
            color: "#ebeefc",
        },
        timelineCopy: {
            color: "#8ca4d6",
            fontSize: "0.93rem",
            lineHeight: 1.7,
        },
    };

    const productHighlights = [
        {
            icon: "🎯",
            title: "Intentional workflows",
            blurb:
                "Design focus rituals, automate reminders, and keep every sprint aligned with the outcomes you care about.",
            tag: "Ops ready",
        },
        {
            icon: "📊",
            title: "Actionable insights",
            blurb:
                "Understand momentum with pulse dashboards that spotlight streaks, blockers, and emerging trends.",
            tag: "Live telemetry",
        },
        {
            icon: "🤝",
            title: "Built for teams",
            blurb:
                "Create shared rooms, accountability pods, and cross-team rituals that keep everyone shipping in sync.",
            tag: "Social focus",
        },
        {
            icon: "🧭",
            title: "Guided rituals",
            blurb:
                "Preset sequences bring intention to every deep-work block, reflection, and async standup.",
            tag: "Templates",
        },
    ];

    const flowMoments = [
        {
            label: "Plot",
            title: "Set the runway",
            copy: "Drop objectives into FocusFlow's planner and auto-suggest the ideal slots for deep work.",
        },
        {
            label: "Protect",
            title: "Launch immersive sessions",
            copy: "Soundscapes, countdown cues, and distraction logging keep the entire room anchored.",
        },
        {
            label: "Pulse",
            title: "Review momentum",
            copy: "Daily recaps highlight wins, dips, and the next best action—no manual reporting.",
        },
        {
            label: "Celebrate",
            title: "Share the highlights",
            copy: "Push wins and streaks to Slack or email so momentum stays collective.",
        },
    ];

    const testimonials = [
        {
            quote:
                "FocusFlow became the ritual heartbeat of our product org. Standups are faster, blockers surface earlier, and burnouts dropped by 30%.",
            author: "Priya Raman — Director of Product, Northwind Collective",
        },
        {
            quote:
                "We swapped five dashboards for FocusFlow’s storyboard. It keeps leadership and makers aligned without extra meetings.",
            author: "Aaron Wells — COO, Pioneer Labs",
        },
    ];

    return (
        <div style={styles.page}>
            <LandingNavbar />
            <section style={styles.hero}>
                <div style={styles.heroOrbit} />
                <div style={styles.heroInner}>
                    <div style={styles.heroBadge}>New</div>
                    <h1 style={styles.heroTitle}>See FocusFlow in action</h1>
                    <p style={styles.heroSubtitle}>
                        Explore the core rituals, dashboards, and automations that help 10,000+ builders protect time and ship what matters.
                    </p>
                    <div style={styles.heroMetrics}>
                        <div style={styles.heroMetric}>
                            <div style={styles.heroMetricValue}>10,000+</div>
                            <div style={styles.heroMetricLabel}>Teams using FocusFlow</div>
                        </div>
                        <div style={styles.heroMetric}>
                            <div style={styles.heroMetricValue}>30%</div>
                            <div style={styles.heroMetricLabel}>Average reduction in team burnout</div>
                        </div>
                        <div style={styles.heroMetric}>
                            <div style={styles.heroMetricValue}>25%</div>
                            <div style={styles.heroMetricLabel}>Average increase in team productivity</div>
                        </div>
                    </div>
                    <div style={styles.heroActions}>
                        <button
                            style={styles.primaryButton}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-3px)";
                                e.currentTarget.style.boxShadow = "0 35px 70px -34px rgba(56, 189, 248, 0.78)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0px)";
                                e.currentTarget.style.boxShadow = styles.primaryButton.boxShadow;
                            }}
                        >
                            Start free workspace
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
                            Watch 3-minute tour
                        </button>
                    </div>
                </div>
            </section>

            <section style={styles.section}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <div style={styles.sectionEyebrow}>What you get</div>
                        <h2 style={styles.sectionTitle}>Your operating system for deep focus in four tiles</h2>
                        <p style={styles.sectionLead}>
                            Each highlight is a bite-sized ritual—easy to explain, easier to adopt.
                        </p>
                    </div>
                    <div style={styles.highlightGrid}>
                        {productHighlights.map((item) => (
                            <div key={item.title} style={styles.highlightCard}>
                                <div style={styles.highlightIcon}>{item.icon}</div>
                                <div style={styles.highlightTitle}>{item.title}</div>
                                <p style={styles.highlightBlurb}>{item.blurb}</p>
                                <div style={styles.highlightTag}>{item.tag}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={styles.section}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <div style={styles.sectionEyebrow}>How it flows</div>
                        <h2 style={styles.sectionTitle}>From planning to applause in four guided beats</h2>
                        <p style={styles.sectionLead}>
                            FocusFlow keeps the cadence light so teams can glide through setup, protect deep work, and celebrate together.
                        </p>
                    </div>
                    <div style={styles.timeline}>
                        {flowMoments.map((moment) => (
                            <div key={moment.label} style={styles.timelineCard}>
                                <div style={styles.timelineStep}>{moment.label}</div>
                                <div style={styles.timelineTitle}>{moment.title}</div>
                                <p style={styles.timelineCopy}>{moment.copy}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={styles.section}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <div style={styles.sectionEyebrow}>Proof in the practice</div>
                        <h2 style={styles.sectionTitle}>Teams keep coming back for the calm</h2>
                    </div>
                    <div style={styles.testimonialStack}>
                        {testimonials.map((item, idx) => (
                            <div key={idx} style={styles.testimonialCard}>
                                <p style={styles.testimonialQuote}>“{item.quote}”</p>
                                <span style={styles.testimonialAuthor}>{item.author}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={styles.section}>
                <div style={styles.container}>
                    <div style={styles.sectionHeader}>
                        <div style={styles.sectionEyebrow}>Ready to get started?</div>
                        <h2 style={styles.sectionTitle}>Launch your free workspace today</h2>
                    </div>
                    <div style={styles.onboardingCard}>
                        <div style={styles.onboardingSteps}>
                            {[
                                "Spin up a FocusFlow workspace in under a minute",
                                "Invite your crew or start solo—templates included",
                                "Book a walkthrough and get rituals tailored to your team",
                            ].map((step, idx) => (
                                <div key={step} style={styles.onboardingStep}>
                                    <span style={styles.onboardingIndex}>{`0${idx + 1}`}</span>
                                    <p style={styles.onboardingCopy}>{step}</p>
                                </div>
                            ))}
                        </div>
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
