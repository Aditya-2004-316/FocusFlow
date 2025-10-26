import React from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
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
        points: [
            "Protect deep work time with calendar sync",
            "Run async stand-ups with ritual templates",
            "Share sprint wins via auto-generated recaps",
        ],
    },
    {
        title: "Creatives & makers",
        points: [
            "Blend focus blocks with wellness resets",
            "Log inspiration snippets right from breaks",
            "Showcase progress in a polished portfolio view",
        ],
    },
    {
        title: "Students & educators",
        points: [
            "Plan revision cycles with adaptive timers",
            "Track active recall vs. passive study time",
            "Celebrate cohorts with streak spotlights",
        ],
    },
];

const Testimonials = () => {
    const styles = {
        landingPage: {
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, #0f172a, #1e293b, #0f172a)',
            color: '#ffffff',
        },
        page: {
            minHeight: "100vh",
            background: "linear-gradient(to bottom, #0b1120, #121b2f, #0b1120)",
            color: "#ffffff",
        },
        hero: {
            padding: "6rem 2rem 4rem",
            textAlign: "center",
        },
        heroInner: {
            maxWidth: "780px",
            margin: "0 auto",
        },
        heroTitle: {
            fontSize: "3rem",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginBottom: "1.25rem",
            color: "#ffffff",
        },
        heroHighlight: {
            background: "linear-gradient(to right, #38bdf8, #60a5fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
        },
        heroSubtitle: {
            fontSize: "1.18rem",
            lineHeight: 1.8,
            color: "#94a3b8",
        },
        marquee: {
            marginTop: "3rem",
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
            color: "#64748b",
            fontSize: "0.95rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
        },
        section: {
            padding: "5rem 2rem",
        },
        container: {
            maxWidth: "1200px",
            margin: "0 auto",
        },
        statGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
        },
        statCard: {
            background: "rgba(30, 41, 59, 0.45)",
            border: "1px solid rgba(148, 163, 184, 0.2)",
            borderRadius: "1rem",
            padding: "1.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            boxShadow: "0 20px 45px -20px rgba(14, 165, 233, 0.3)",
        },
        statValue: {
            fontSize: "2.4rem",
            fontWeight: 700,
            color: "#38bdf8",
        },
        statLabel: {
            fontSize: "1rem",
            color: "#e2e8f0",
            fontWeight: 600,
        },
        statCaption: {
            fontSize: "0.9rem",
            color: "#94a3b8",
            lineHeight: 1.6,
        },
        quoteGrid: {
            marginTop: "3rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.75rem",
        },
        quoteCard: {
            background: "rgba(17, 24, 39, 0.75)",
            border: "1px solid rgba(56, 189, 248, 0.25)",
            borderRadius: "1.1rem",
            padding: "2.25rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            boxShadow: "0 25px 60px -30px rgba(56, 189, 248, 0.45)",
        },
        quoteMark: {
            fontSize: "2.5rem",
            color: "rgba(56, 189, 248, 0.65)",
        },
        quoteText: {
            fontSize: "1.1rem",
            lineHeight: 1.8,
            color: "#cbd5f5",
        },
        quoteAuthor: {
            fontWeight: 700,
            color: "#e2e8f0",
        },
        quoteRole: {
            color: "#94a3b8",
            fontSize: "0.92rem",
        },
        panelSection: {
            background: "rgba(10, 15, 26, 0.85)",
            borderRadius: "1.25rem",
            border: "1px solid rgba(148, 163, 184, 0.18)",
            padding: "3rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2rem",
        },
        panelCard: {
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
        },
        panelTitle: {
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "#e2e8f0",
        },
        panelList: {
            margin: 0,
            paddingLeft: "1.25rem",
            color: "#94a3b8",
            fontSize: "0.95rem",
            lineHeight: 1.6,
        },
        ctaBlock: {
            textAlign: "center",
            marginTop: "4rem",
        },
        ctaTitle: {
            fontSize: "2.15rem",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "1rem",
        },
        ctaDescription: {
            color: "#94a3b8",
            maxWidth: "560px",
            margin: "0 auto 2rem",
            lineHeight: 1.7,
        },
        ctaButton: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            background: "linear-gradient(to right, #38bdf8, #60a5fa)",
            color: "#0f172a",
            padding: "1rem 2.75rem",
            borderRadius: "9999px",
            fontWeight: 700,
            fontSize: "1.05rem",
            textDecoration: "none",
            border: "none",
        },
    };

    return (
        <div style={styles.page}>
            <LandingNavbar />
            <section style={styles.hero}>
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

            {/* Quotes */}
            <section style={styles.section}>
                <div style={styles.container}>
                    <div style={styles.quoteGrid}>
                        {testimonialQuotes.map((item, idx) => (
                            <div key={idx} className="hover-card" style={styles.quoteCard}>
                                <div style={styles.quoteMark}>“</div>
                                <p style={styles.quoteText}>{item.quote}</p>
                                <div>
                                    <div style={styles.quoteAuthor}>{item.author}</div>
                                    <div style={styles.quoteRole}>{item.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industry Panels */}
            <section style={styles.section}>
                <div style={styles.container}>
                    <div style={styles.panelSection}>
                        {industryPanels.map((panel) => (
                            <div key={panel.title} style={styles.panelCard}>
                                <div style={styles.panelTitle}>{panel.title}</div>
                                <ul style={styles.panelList}>
                                    {panel.points.map((point) => (
                                        <li key={point}>{point}</li>
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
        </div>
    );
};

export default Testimonials;
