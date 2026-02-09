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
import useResponsive from "../hooks/useResponsive";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const Community = () => {
    const { isMobile, isTablet, width } = useResponsive();
    const isCompact = width < 600;
    const [stats, setStats] = React.useState({
        totalCommunities: 0,
        totalMembers: 0,
        activeDiscussions: 0,
        weeklyCheckins: 0,
        participationRate: "Live"
    });

    React.useEffect(() => {
        const fetchGlobalStats = async () => {
            try {
                const res = await fetch(`${API_BASE}/stats/global-community`);
                const json = await res.json();
                if (json.success) {
                    setStats(json.data);
                }
            } catch (err) {
                console.error("Failed to fetch global community stats:", err);
            }
        };
        fetchGlobalStats();
    }, []);

    const formatValue = (val) => {
        if (typeof val !== 'number') return val;
        if (val >= 1000) {
            return (val / 1000).toFixed(1) + 'k';
        }
        return val;
    };

    const communityStatsData = [
        { label: "Active members", value: formatValue(stats.totalMembers), trend: "Platform total" },
        { label: "Weekly check-ins", value: formatValue(stats.weeklyCheckins), trend: `Last 7 days` },
        { label: "Open discussions", value: formatValue(stats.activeDiscussions), trend: "Community posts" },
        { label: "Active communities", value: formatValue(stats.totalCommunities), trend: "Growth tracking" },
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

    const pageStyles = {
        wrapper: {
            minHeight: "100vh",
            background: "linear-gradient(to bottom, #0b1120, #111c33, #0b1120)",
            color: "#ffffff",
            overflowX: "hidden",
        },
        section: {
            padding: isMobile ? "3rem 1rem" : "5rem 2rem",
            position: "relative",
            overflow: "hidden",
        },
        sectionPulse: {
            position: "absolute",
            inset: "-120px -40px auto",
            height: isMobile ? "200px" : "320px",
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
            fontSize: isMobile ? "2rem" : isTablet ? "2.8rem" : "3.5rem",
            fontWeight: 800,
            letterSpacing: "-0.035em",
            color: "#ffffff",
            marginBottom: "1rem",
            lineHeight: 1.1,
            padding: isMobile ? "0 0.5rem" : "0",
        },
        heroGradient: {
            background: "linear-gradient(to right, #38bdf8, #818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
        },
        heroLead: {
            fontSize: isMobile ? "0.95rem" : "1.24rem",
            color: "#cbd5f5",
            lineHeight: 1.75,
            padding: isMobile ? "0 0.5rem" : "0",
        },
        heroActions: {
            marginTop: isMobile ? "2rem" : "2.5rem",
            display: "flex",
            justifyContent: "center",
            flexDirection: isCompact ? "column" : "row",
            alignItems: "center",
            gap: "1rem",
        },
        heroBtnPrimary: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.55rem",
            background: "linear-gradient(to right, #38bdf8, #818cf8)",
            color: "#0f172a",
            padding: isMobile ? "0.85rem 2rem" : "0.95rem 2.4rem",
            borderRadius: "9999px",
            fontWeight: 700,
            fontSize: isMobile ? "0.95rem" : "1.05rem",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderBottom: "none",
            cursor: "pointer",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
            boxShadow: "0 25px 50px -28px rgba(56, 189, 248, 0.7)",
            justifyContent: "center",
            width: isCompact ? "100%" : "fit-content",
            maxWidth: isCompact ? "280px" : "none",
        },
        heroBtnSecondary: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.55rem",
            background: "linear-gradient(110deg, rgba(59,130,246,0.18), rgba(14,165,233,0.18))",
            color: "#38bdf8",
            padding: isMobile ? "0.85rem 2rem" : "0.95rem 2.3rem",
            borderRadius: "9999px",
            fontWeight: 600,
            fontSize: isMobile ? "0.95rem" : "1.03rem",
            borderTop: "1px solid rgba(56, 189, 248, 0.35)",
            borderLeft: "1px solid rgba(56, 189, 248, 0.35)",
            borderRight: "1px solid rgba(56, 189, 248, 0.35)",
            borderBottom: "1px solid rgba(56, 189, 248, 0.35)",
            cursor: "pointer",
            transition: "transform 0.25s ease, border-color 0.25s ease",
            justifyContent: "center",
            width: isCompact ? "100%" : "fit-content",
            maxWidth: isCompact ? "280px" : "none",
        },
        statsGrid: {
            display: "grid",
            gridTemplateColumns: width >= 900 ? "repeat(4, 1fr)" : width >= 600 ? "repeat(2, 1fr)" : "repeat(2, 1fr)",
            gap: isMobile ? "0.75rem" : "1.5rem",
        },
        statCard: {
            background: "rgba(30, 41, 59, 0.55)",
            border: "1px solid rgba(148, 163, 184, 0.2)",
            borderRadius: "1rem",
            padding: isMobile ? "1rem 0.85rem" : "1.75rem",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            boxShadow: "0 18px 45px -15px rgba(8, 47, 73, 0.45)",
        },
        statValue: {
            fontSize: isMobile ? "1.5rem" : "2.5rem",
            fontWeight: 700,
            color: "#38bdf8",
        },
        statLabel: {
            color: "#cbd5f5",
            fontSize: isMobile ? "0.75rem" : "0.95rem",
        },
        overviewGrid: {
            display: "grid",
            gridTemplateColumns: width >= 1028 ? "repeat(4, 1fr)" : width >= 696 ? "repeat(2, 1fr)" : "1fr",
            gap: "1.5rem",
            marginTop: "3rem",
        },
        overviewCard: {
            background: "rgba(30, 41, 59, 0.45)",
            border: "1px solid rgba(99, 102, 241, 0.25)",
            borderRadius: "1.1rem",
            padding: isMobile ? "1.25rem" : "1.95rem 1.85rem",
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
            width: isMobile ? "2.25rem" : "2.75rem",
            height: isMobile ? "2.25rem" : "2.75rem",
            borderRadius: "0.75rem",
            background: "rgba(59,130,246,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#38bdf8",
            fontSize: isMobile ? "1.2rem" : "1.5rem",
        },
        cardTitle: {
            fontSize: isMobile ? "1.05rem" : "1.2rem",
            fontWeight: 600,
            color: "#e2e8f0",
        },
        cardBody: {
            color: "#94a3b8",
            fontSize: isMobile ? "0.88rem" : "0.95rem",
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
            background: "rgba(59,130,246,0.18)",
            color: "#38bdf8",
            padding: isMobile ? "0.35rem 0.7rem" : "0.45rem 0.9rem",
            borderRadius: "9999px",
            fontWeight: 600,
            fontSize: isMobile ? "0.75rem" : "0.85rem",
        },
        spotlightGrid: {
            display: "grid",
            gridTemplateColumns: width >= 1028 ? "repeat(3, 1fr)" : width >= 696 ? "repeat(2, 1fr)" : "1fr",
            gap: "1.75rem",
            marginTop: "3rem",
        },
        spotlightCard: {
            background: "rgba(17, 24, 39, 0.8)",
            border: "1px solid rgba(56, 189, 248, 0.25)",
            borderRadius: "1.1rem",
            padding: isMobile ? "1.35rem" : "1.85rem",
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
            flexWrap: "wrap",
        },
        spotlightChip: {
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#38bdf8",
            background: "rgba(59,130,246,0.18)",
            padding: "0.25rem 0.75rem",
            borderRadius: "9999px",
        },
        eventsGrid: {
            display: "grid",
            gridTemplateColumns: width >= 1028 ? "repeat(3, 1fr)" : width >= 696 ? "repeat(2, 1fr)" : "1fr",
            gap: "1.5rem",
            marginTop: "2rem",
        },
        eventCard: {
            background: "rgba(30, 41, 59, 0.45)",
            border: "1px solid rgba(56, 189, 248, 0.2)",
            borderRadius: "0.9rem",
            padding: isMobile ? "1.25rem" : "1.5rem",
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
            fontSize: isMobile ? "0.8rem" : "0.85rem",
        },
        eventCta: {
            alignSelf: "flex-start",
            background: "rgba(59,130,246,0.18)",
            color: "#38bdf8",
            padding: isMobile ? "0.4rem 0.8rem" : "0.45rem 0.9rem",
            borderRadius: "0.75rem",
            fontWeight: 600,
            fontSize: isMobile ? "0.8rem" : "0.85rem",
            textDecoration: "none",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderBottom: "none",
            cursor: "pointer",
        },
        resourceSection: {
            padding: isMobile ? "3rem 1rem" : "5rem 2rem",
            position: "relative",
        },
        resourceGrid: {
            display: "grid",
            gridTemplateColumns: width >= 1028 ? "repeat(3, 1fr)" : width >= 696 ? "repeat(2, 1fr)" : "1fr",
            gap: "1.75rem",
            marginTop: "2.5rem",
        },
        resourceCard: {
            background: "rgba(15, 23, 42, 0.75)",
            border: "1px solid rgba(56, 189, 248, 0.2)",
            borderRadius: "1.05rem",
            padding: isMobile ? "1.35rem" : "1.85rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.9rem",
            position: "relative",
            overflow: "hidden",
            transition: "transform 0.25s ease, border-color 0.25s ease",
        },
        resourceIconBadge: {
            width: isMobile ? "2.1rem" : "2.5rem",
            height: isMobile ? "2.1rem" : "2.5rem",
            borderRadius: "0.8rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(59,130,246,0.18)",
            color: "#38bdf8",
            fontSize: isMobile ? "1.1rem" : "1.4rem",
        },
        resourceLink: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            color: "#38bdf8",
            fontWeight: 600,
            fontSize: isMobile ? "0.88rem" : "0.95rem",
            marginTop: "0.5rem",
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
            padding: isMobile ? "0.85rem 2rem" : "0.95rem 2.7rem",
            borderRadius: "9999px",
            fontWeight: 700,
            fontSize: isMobile ? "0.95rem" : "1.07rem",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderBottom: "none",
            display: "inline-block",
            marginTop: "1.6rem",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
            boxShadow: "0 25px 50px -28px rgba(56, 189, 248, 0.7)",
            textDecoration: "none",
        },
    };

    return (
        <div style={pageStyles.wrapper}>
            <LandingNavbar />

            {/* Hero Section */}
            <section style={pageStyles.section}>
                <div style={pageStyles.sectionPulse} />
                <div style={pageStyles.container}>
                    <div style={pageStyles.heroContent}>
                        <h1 style={pageStyles.heroTitle}>
                            Focus together, <br />
                            <span style={pageStyles.heroGradient}>Build everything</span>
                        </h1>
                        <p style={pageStyles.heroLead}>
                            Join 5,000+ creators, students, and developers shipping their best
                            work through deep work rituals and community accountability.
                        </p>
                        <div style={pageStyles.heroActions}>
                            <button style={pageStyles.heroBtnPrimary}>
                                Join a focus circle <FaArrowRight />
                            </button>
                            <button style={pageStyles.heroBtnSecondary}>
                                <FaDiscord /> Join Discord
                            </button>
                        </div>
                    </div>

                    <div style={{ marginTop: isMobile ? "3rem" : "5rem" }}>
                        <div style={pageStyles.statsGrid}>
                            {communityStatsData.map((stat, idx) => (
                                <div key={idx} style={pageStyles.statCard}>
                                    <div style={pageStyles.statValue}>{stat.value}</div>
                                    <div style={pageStyles.statLabel}>{stat.label}</div>
                                    <div style={{ fontSize: "0.75rem", color: "#38bdf8", fontWeight: 600 }}>
                                        {stat.trend}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Tracks Section */}
            <section style={{ ...pageStyles.section, background: "rgba(15, 23, 42, 0.4)" }}>
                <div style={pageStyles.container}>
                    <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                        <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#f8fafc" }}>How we involve</h2>
                        <div style={{ height: "3px", width: "60px", background: "#38bdf8", margin: "1rem auto" }} />
                    </div>

                    <div style={pageStyles.overviewGrid}>
                        {involvementTracks.map((track, i) => (
                            <div key={i} className="card-hover-effect" style={pageStyles.overviewCard}>
                                <div style={pageStyles.overviewGlow} />
                                <div style={pageStyles.iconBadge}>{track.icon}</div>
                                <h3 style={pageStyles.cardTitle}>{track.title}</h3>
                                <p style={pageStyles.cardBody}>{track.description}</p>
                                <div style={pageStyles.actionRow}>
                                    {track.actions.map((act, j) => (
                                        <span key={j} style={pageStyles.actionPill}>
                                            {act}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Circles Section */}
            <section style={pageStyles.section}>
                <div style={pageStyles.container}>
                    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                        <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#f8fafc" }}>Circle Spotlights</h2>
                        <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>Community-led hubs for specific crafts and goals.</p>
                    </div>

                    <div style={pageStyles.spotlightGrid}>
                        {circleSpotlights.map((circle, idx) => (
                            <div key={idx} className="card-hover-effect" style={pageStyles.spotlightCard}>
                                <div style={pageStyles.spotlightHeader}>
                                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#38bdf8" }}>{circle.name}</h3>
                                    <span style={pageStyles.spotlightChip}>Active</span>
                                </div>
                                <div style={{ fontSize: "0.85rem", color: "#60a5fa", fontWeight: 600 }}>{circle.lead}</div>
                                <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.6 }}>{circle.summary}</p>
                                <ul style={{ listStyle: "none", padding: 0, margin: "0.5rem 0 0" }}>
                                    {circle.highlights.map((h, k) => (
                                        <li key={k} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#cbd5f5", fontSize: "0.85rem", marginBottom: "0.4rem" }}>
                                            <div style={{ width: "4px", height: "4px", background: "#38bdf8", borderRadius: "50%" }} /> {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Events Section */}
            <section style={{ ...pageStyles.section, background: "rgba(15, 23, 42, 0.4)" }}>
                <div style={pageStyles.container}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
                        <div>
                            <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#f8fafc" }}>Upcoming Rituals</h2>
                            <p style={{ color: "#94a3b8" }}>Mark your calendar for our collective focus blocks.</p>
                        </div>
                        <button style={{ ...pageStyles.heroBtnSecondary, padding: "0.6rem 1.5rem", fontSize: "0.9rem" }}>View full calendar</button>
                    </div>

                    <div style={pageStyles.eventsGrid}>
                        {upcomingEvents.map((ev, idx) => (
                            <div key={idx} style={pageStyles.eventCard}>
                                <div style={pageStyles.eventMeta}>
                                    <FaCalendarAlt /> {ev.date}
                                </div>
                                <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "#e2e8f0" }}>{ev.title}</h3>
                                <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.5 }}>{ev.description}</p>
                                <button style={pageStyles.eventCta}>{ev.cta}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Resources Section */}
            <section style={pageStyles.resourceSection}>
                <div style={pageStyles.container}>
                    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                        <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#ffffff" }}>Community Vault</h2>
                        <p style={{ color: "#94a3b8" }}>Resources curated by the FocusFlow collective.</p>
                    </div>

                    <div style={pageStyles.resourceGrid}>
                        {[
                            { title: "Deep Work Library", icon: <FaPlayCircle />, description: "Curated playlists and ambient soundscapes optimized for flow state." },
                            { title: "Focus Handbook", icon: <FaComments />, description: "Community-sourced guide on managing burnout and building streaks." },
                            { title: "The Flow Letter", icon: <FaEnvelope />, description: "Monthly recap of the best projects and insights from our members." }
                        ].map((resource, idx) => (
                            <a key={idx} href="#" style={{ ...pageStyles.resourceCard, textDecoration: "none" }} className="card-hover-effect">
                                <div style={pageStyles.resourceIconBadge}>
                                    {resource.icon}
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
};

export default Community;
