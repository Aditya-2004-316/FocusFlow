import React from "react";
import {
    FaComments,
    FaEnvelope,
    FaGithub,
    FaUsers,
    FaDiscord,
    FaCalendarAlt,
    FaPlayCircle,
    FaArrowRight,
} from "react-icons/fa";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../styles/CardHover.css";

const pageStyles = {
    wrapper: {
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #0b1120, #111c33, #0b1120)",
        color: "#ffffff",
    },
    section: {
        padding: "5rem 2rem",
        position: "relative",
        overflow: "hidden",
    },
    sectionPulse: {
        position: "absolute",
        inset: "-120px -40px auto",
        height: "320px",
        background: "radial-gradient(circle at center, rgba(56, 189, 248, 0.18), transparent 60%)",
        filter: "blur(6px)",
        opacity: 0.8,
        pointerEvents: "none",
    },
    container: {
        maxWidth: "1200px",
        margin: "0 auto",
    },
    heroContent: {
        textAlign: "center",
        maxWidth: "760px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
    },
    heroTitle: {
        fontSize: "3.2rem",
        fontWeight: 800,
        letterSpacing: "-0.035em",
        color: "#ffffff",
        marginBottom: "1rem",
    },
    heroGradient: {
        background: "linear-gradient(to right, #38bdf8, #818cf8)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
    },
    heroLead: {
        fontSize: "1.24rem",
        color: "#cbd5f5",
        lineHeight: 1.75,
    },
    heroActions: {
        marginTop: "2.5rem",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "1rem",
    },
    heroBtnPrimary: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.55rem",
        background: "linear-gradient(to right, #38bdf8, #818cf8)",
        color: "#0f172a",
        padding: "0.95rem 2.4rem",
        borderRadius: "9999px",
        fontWeight: 700,
        fontSize: "1.05rem",
        border: "none",
        cursor: "pointer",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        boxShadow: "0 25px 50px -28px rgba(56, 189, 248, 0.7)",
    },
    heroBtnSecondary: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.55rem",
        background: "rgba(15, 23, 42, 0.75)",
        color: "#38bdf8",
        padding: "0.95rem 2.3rem",
        borderRadius: "9999px",
        fontWeight: 600,
        fontSize: "1.03rem",
        border: "1px solid rgba(56, 189, 248, 0.35)",
        cursor: "pointer",
        transition: "transform 0.25s ease, border-color 0.25s ease",
    },
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1.5rem",
    },
    statCard: {
        background: "rgba(30, 41, 59, 0.55)",
        border: "1px solid rgba(148, 163, 184, 0.2)",
        borderRadius: "1rem",
        padding: "1.75rem",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        boxShadow: "0 18px 45px -15px rgba(8, 47, 73, 0.45)",
    },
    statValue: {
        fontSize: "2.5rem",
        fontWeight: 700,
        color: "#38bdf8",
    },
    statLabel: {
        color: "#cbd5f5",
        fontSize: "0.95rem",
    },
    overviewGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.5rem",
        marginTop: "3rem",
    },
    overviewCard: {
        background: "rgba(30, 41, 59, 0.45)",
        border: "1px solid rgba(99, 102, 241, 0.25)",
        borderRadius: "1.1rem",
        padding: "1.95rem 1.85rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.95rem",
        transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        position: "relative",
        overflow: "hidden",
    },
    overviewGlow: {
        position: "absolute",
        inset: "auto -80px -120px auto",
        width: "220px",
        height: "220px",
        background: "radial-gradient(circle at center, rgba(129, 140, 248, 0.28), transparent)",
        filter: "blur(6px)",
        opacity: 0.5,
    },
    iconBadge: {
        width: "2.75rem",
        height: "2.75rem",
        borderRadius: "0.75rem",
        background: "rgba(56, 189, 248, 0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#38bdf8",
        fontSize: "1.5rem",
    },
    cardTitle: {
        fontSize: "1.2rem",
        fontWeight: 600,
        color: "#e2e8f0",
    },
    cardBody: {
        color: "#94a3b8",
        fontSize: "0.95rem",
        lineHeight: 1.6,
    },
    actionRow: {
        display: "flex",
        gap: "0.75rem",
        flexWrap: "wrap",
    },
    actionPill: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        background: "rgba(56, 189, 248, 0.16)",
        color: "#38bdf8",
        padding: "0.45rem 0.9rem",
        borderRadius: "9999px",
        fontWeight: 600,
        fontSize: "0.85rem",
    },
    spotlightGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.75rem",
        marginTop: "3rem",
    },
    spotlightCard: {
        background: "rgba(17, 24, 39, 0.8)",
        border: "1px solid rgba(56, 189, 248, 0.25)",
        borderRadius: "1.1rem",
        padding: "1.85rem",
        boxShadow: "0 25px 55px -25px rgba(56, 189, 248, 0.4)",
        display: "flex",
        flexDirection: "column",
        gap: "0.85rem",
        transition: "transform 0.25s ease, border-color 0.25s ease",
    },
    spotlightHeader: {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
    },
    spotlightChip: {
        fontSize: "0.75rem",
        fontWeight: 600,
        color: "#38bdf8",
        background: "rgba(56, 189, 248, 0.12)",
        padding: "0.25rem 0.75rem",
        borderRadius: "9999px",
    },
    eventsGrid: {
        display: "grid",
        gap: "1.5rem",
        marginTop: "2rem",
    },
    eventCard: {
        background: "rgba(30, 41, 59, 0.45)",
        border: "1px solid rgba(56, 189, 248, 0.2)",
        borderRadius: "0.9rem",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
    },
    eventMeta: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        color: "#38bdf8",
        fontWeight: 600,
        fontSize: "0.85rem",
    },
    eventCta: {
        alignSelf: "flex-start",
        background: "rgba(56, 189, 248, 0.16)",
        color: "#38bdf8",
        padding: "0.45rem 0.9rem",
        borderRadius: "0.75rem",
        fontWeight: 600,
        fontSize: "0.85rem",
        textDecoration: "none",
    },
    footerCta: {
        textAlign: "center",
        marginTop: "4rem",
        position: "relative",
        zIndex: 1,
    },
    footerButton: {
        background: "linear-gradient(to right, #38bdf8, #818cf8)",
        color: "#0f172a",
        padding: "0.95rem 2.7rem",
        borderRadius: "9999px",
        fontWeight: 700,
        fontSize: "1.07rem",
        border: "none",
        display: "inline-block",
        marginTop: "1.6rem",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        boxShadow: "0 25px 50px -28px rgba(56, 189, 248, 0.7)",
    },
    resourceSection: {
        padding: "5rem 2rem",
        position: "relative",
    },
    resourceGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.75rem",
        marginTop: "2.5rem",
    },
    resourceCard: {
        background: "rgba(15, 23, 42, 0.75)",
        border: "1px solid rgba(56, 189, 248, 0.2)",
        borderRadius: "1.05rem",
        padding: "1.85rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.9rem",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.25s ease, border-color 0.25s ease",
    },
    resourceIconBadge: {
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "0.8rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(56, 189, 248, 0.18)",
        color: "#38bdf8",
        fontSize: "1.4rem",
    },
    resourceLink: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45rem",
        color: "#38bdf8",
        fontWeight: 600,
        fontSize: "0.95rem",
        marginTop: "0.5rem",
        textDecoration: "none",
    },
};

const communityStats = [
    { label: "Active members", value: "12k", trend: "+18% QoQ" },
    { label: "Weekly check-ins", value: "3.8k", trend: "92% participation" },
    { label: "Open discussions", value: "415", trend: "New posts daily" },
    { label: "Open-source merges", value: "276", trend: "Community led" },
];

const involvementTracks = [
    {
        title: "Join live circles",
        icon: <FaUsers />,
        description:
            "Daily focus circles and weekend retros help you keep momentum with peers across time zones.",
        actions: ["Focus circles", "Onboarding buddies", "Accountability pods"],
    },
    {
        title: "Build with the team",
        icon: <FaGithub />,
        description:
            "Tackle issues, ideate features, and ship improvements via our open product roadmap.",
        actions: ["Roadmap votes", "Design crit", "Open PRs"],
    },
    {
        title: "Share your voice",
        icon: <FaComments />,
        description:
            "Host AMAs, publish workflow spotlights, or bring your own rituals to the community newsletter.",
        actions: ["Newsletter guest", "Monthly AMAs", "Workflow spotlights"],
    },
    {
        title: "Partner updates",
        icon: <FaEnvelope />,
        description:
            "Beta invites, integration previews, and occasional swag drops straight to your inbox.",
        actions: ["Beta squad", "Integration pilots", "Ambassador perks"],
    },
];

const circleSpotlights = [
    {
        name: "Focus Sprints Collective",
        lead: "Led by Ravi & Aisha",
        summary:
            "A twice-weekly sprint room pairing solo makers with rapid feedback loops and async accountability.",
        highlights: ["Mon/Wed focus rooms", "Shared sprint log", "Demo Friday capstone"],
    },
    {
        name: "Mindful Makers Guild",
        lead: "Hosted by Lila",
        summary:
            "Combines deep work blocks with micro wellness resets so creative energy stays high across the week.",
        highlights: ["Sound bath breaks", "Creative showcase", "Sunday planning ritual"],
    },
    {
        name: "Grad Prep Lab",
        lead: "Mentored by Sam",
        summary:
            "Structured study pipeline for exam takers: practice tests, reflection loops, and study buddy matching.",
        highlights: ["Weekly mock exams", "Coaching office hours", "Resource vault"],
    },
];

const upcomingEvents = [
    {
        title: "Community showcase",
        date: "Nov 12 · 4 PM GMT",
        description:
            "Lightning talks on habit experiments, dashboards, and streak wins from the past month.",
        cta: "Save a seat",
    },
    {
        title: "Integration lab drop",
        date: "Nov 19 · 6 PM GMT",
        description:
            "Live walk-through of our Slack + Calendar sync with behind-the-scenes Q&A with the builders.",
        cta: "Request invite",
    },
    {
        title: "Focus sprint kickoff",
        date: "Nov 26 · 7 AM GMT",
        description:
            "Global 10-day sprint with tiered goals, matched accountability partners, and weekend retros.",
        cta: "Join the sprint",
    },
];

const Community = () => (
    <div style={pageStyles.wrapper}>
        <LandingNavbar />

        {/* Hero Section */}
        <section style={{ ...pageStyles.section, paddingTop: "6rem" }}>
            <div style={pageStyles.sectionPulse} />
            <div style={pageStyles.heroContent}>
                <h1 style={pageStyles.heroTitle}>
                    Where <span style={pageStyles.heroGradient}>focus-led builders</span> connect
                </h1>
                <p style={pageStyles.heroLead}>
                    Tap into accountability circles, open product builds, and wellness rituals led by thousands of
                    productivity natives. Your next streak starts with the community cheering alongside you.
                </p>
                <div style={pageStyles.heroActions}>
                    <button
                        style={pageStyles.heroBtnPrimary}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.boxShadow = "0 35px 70px -32px rgba(56, 189, 248, 0.75)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0px)";
                            e.currentTarget.style.boxShadow = pageStyles.heroBtnPrimary.boxShadow;
                        }}
                    >
                        <FaUsers /> Jump into a live circle
                    </button>
                    <button
                        style={pageStyles.heroBtnSecondary}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.55)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0px)";
                            e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.35)";
                        }}
                    >
                        <FaPlayCircle /> Watch onboarding tour
                    </button>
                </div>
            </div>
        </section>

        {/* Metrics Section */}
        <section style={{ ...pageStyles.section, paddingTop: "0" }}>
            <div style={pageStyles.container}>
                <div style={pageStyles.statsGrid}>
                    {communityStats.map((stat) => (
                        <div key={stat.label} style={pageStyles.statCard}>
                            <div style={pageStyles.statValue}>{stat.value}</div>
                            <div style={pageStyles.statLabel}>{stat.label}</div>
                            <div style={{ color: "#38bdf8", fontSize: "0.85rem", fontWeight: 600 }}>{stat.trend}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Involvement Tracks */}
        <section style={pageStyles.section}>
            <div style={pageStyles.container}>
                <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto" }}>
                    <h2 style={{ fontSize: "2.25rem", fontWeight: 700, color: "#ffffff", marginBottom: "1rem" }}>
                        Choose how you plug in
                    </h2>
                    <p style={{ color: "#94a3b8", lineHeight: 1.7 }}>
                        Pick the lane that fits your goals today, switch tomorrow. Every track keeps you surrounded by
                        peers who nudge you forward.
                    </p>
                </div>
                <div style={pageStyles.overviewGrid}>
                    {involvementTracks.map((track, idx) => (
                        <div key={idx} className="hover-card" style={pageStyles.overviewCard}>
                            <div style={pageStyles.overviewGlow} />
                            <div style={pageStyles.iconBadge}>{track.icon}</div>
                            <div style={pageStyles.cardTitle}>{track.title}</div>
                            <p style={pageStyles.cardBody}>{track.description}</p>
                            <div style={pageStyles.actionRow}>
                                {track.actions.map((action) => (
                                    <span key={action} style={pageStyles.actionPill}>
                                        {action}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Spotlight Circles */}
        <section style={pageStyles.section}>
            <div style={pageStyles.container}>
                <div style={{ textAlign: "center", maxWidth: "620px", margin: "0 auto" }}>
                    <h2 style={{ fontSize: "2.15rem", fontWeight: 700, color: "#ffffff", marginBottom: "1rem" }}>
                        Spotlight circles
                    </h2>
                    <p style={{ color: "#94a3b8", lineHeight: 1.7 }}>
                        Featured communities hosting regular co-working, habit experiments, and show-and-tells.
                    </p>
                </div>
                <div style={pageStyles.spotlightGrid}>
                    {circleSpotlights.map((circle) => (
                        <div key={circle.name} style={pageStyles.spotlightCard}>
                            <div style={pageStyles.spotlightHeader}>
                                <span style={pageStyles.spotlightChip}>Circle</span>
                                <div style={{ color: "#e7e9ff", fontWeight: 600 }}>{circle.name}</div>
                            </div>
                            <div style={{ color: "#818cf8", fontSize: "0.85rem", fontWeight: 600 }}>{circle.lead}</div>
                            <p style={{ color: "#cbd5f5", lineHeight: 1.6 }}>{circle.summary}</p>
                            <div style={pageStyles.actionRow}>
                                {circle.highlights.map((item) => (
                                    <span key={item} style={pageStyles.actionPill}>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Upcoming Events */}
        <section style={pageStyles.section}>
            <div style={pageStyles.sectionPulse} />
            <div style={pageStyles.container}>
                <div style={{ textAlign: "center", maxWidth: "620px", margin: "0 auto" }}>
                    <h2 style={{ fontSize: "2.1rem", fontWeight: 700, color: "#ffffff", marginBottom: "1rem" }}>
                        Upcoming events & activations
                    </h2>
                    <p style={{ color: "#94a3b8", lineHeight: 1.7 }}>
                        Reserve your spot and meet the builders, mentors, and peers pushing the FocusFlow platform
                        forward.
                    </p>
                </div>
                <div style={pageStyles.eventsGrid}>
                    {upcomingEvents.map((event) => (
                        <div key={event.title} style={pageStyles.eventCard}>
                            <span style={pageStyles.eventMeta}>
                                <FaCalendarAlt /> {event.date}
                            </span>
                            <div style={{ fontSize: "1.2rem", fontWeight: 600, color: "#e2e8f0" }}>{event.title}</div>
                            <p style={{ color: "#94a3b8", lineHeight: 1.6 }}>{event.description}</p>
                            <a href="mailto:focusflow@studentproject.com" style={pageStyles.eventCta}>
                                {event.cta}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Resource Section */}
        <section style={pageStyles.resourceSection}>
            <div style={pageStyles.sectionPulse} />
            <div style={pageStyles.container}>
                <div style={{ textAlign: "center", maxWidth: "650px", margin: "0 auto" }}>
                    <h2 style={{ fontSize: "2.15rem", fontWeight: 700, color: "#ffffff", marginBottom: "1rem" }}>
                        Resources to kickstart your streak
                    </h2>
                    <p style={{ color: "#94a3b8", lineHeight: 1.7 }}>
                        Workshops, asset kits, and office hours recordings curated by the community so you can plug in immediately.
                    </p>
                </div>
                <div style={pageStyles.resourceGrid}>
                    {[
                        {
                            title: "Starter rituals vault",
                            description: "Download community templates for morning focus, study sprints, and team retros.",
                            href: "/resources",
                        },
                        {
                            title: "Mentor office hours",
                            description: "Watch replays from product leads and study coaches answering workflow questions.",
                            href: "mailto:focusflow@studentproject.com?subject=Mentor%20office%20hours",
                        },
                        {
                            title: "Integration cookbook",
                            description: "See how makers automate FocusFlow with Notion, Slack, and custom webhooks.",
                            href: "mailto:focusflow@studentproject.com?subject=Integration%20cookbook",
                        },
                    ].map((resource) => (
                        <a
                            key={resource.title}
                            href={resource.href}
                            style={{ ...pageStyles.resourceCard, textDecoration: "none" }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-4px)";
                                e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.4)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0px)";
                                e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.2)";
                            }}
                        >
                            <div style={pageStyles.resourceIconBadge}>
                                <FaPlayCircle />
                            </div>
                            <div style={{ fontSize: "1.2rem", fontWeight: 600, color: "#e2e8f0" }}>{resource.title}</div>
                            <p style={{ color: "#94a3b8", lineHeight: 1.65 }}>{resource.description}</p>
                            <span style={pageStyles.resourceLink}>
                                Access resource <FaArrowRight />
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>

        {/* CTA */}
        <section style={{ ...pageStyles.section, paddingBottom: "4rem" }}>
            <div style={pageStyles.sectionPulse} />
            <div style={pageStyles.footerCta}>
                <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#e2e8f0" }}>
                    Start your community streak today
                </div>
                <p style={{ color: "#94a3b8", maxWidth: "540px", margin: "1rem auto", lineHeight: 1.6 }}>
                    Whether you need mentorship, co-working, or a playground to ship features, there’s a seat waiting
                    for you.
                </p>
                <a href="mailto:focusflow@studentproject.com" style={pageStyles.footerButton}>
                    Say hello to the crew
                </a>
            </div>
        </section>

        <LandingFooter />
    </div>
);

export default Community;
