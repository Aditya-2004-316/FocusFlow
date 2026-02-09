import React, { useState } from "react";
import useResponsive from "../hooks/useResponsive";
import {
    FaEnvelope,
    FaHeadset,
    FaCalendarAlt,
    FaSlack,
    FaQuestionCircle,
    FaMapMarkerAlt,
    FaClock,
    FaPhoneAlt,
    FaArrowRight,
} from "react-icons/fa";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../styles/CardHover.css";

const heroStats = [
    { value: "< 2 hrs", label: "Average chat response" },
    { value: "24/7", label: "Priority coverage" },
    { value: "40+", label: "Countries served" },
];

const contactHighlights = [
    {
        icon: <FaHeadset />,
        tag: "Priority support",
        title: "Live team on standby",
        copy: "Ping us via in-app chat or Slack Connect and a specialist will join within minutes.",
    },
    {
        icon: <FaEnvelope />,
        tag: "Email",
        title: "Inbox with context",
        copy: "Send details to support@focusflow.com and we’ll route it to the right ritual steward.",
    },
    {
        icon: <FaCalendarAlt />,
        tag: "Concierge",
        title: "Book a walkthrough",
        copy: "Reserve a 30-minute optimization session tailored to your workspace cadence.",
    },
];

const supportTracks = [
    {
        icon: <FaSlack />,
        title: "Slack Connect",
        copy: "Add FocusFlow to your shared Slack channel for escalations and rollout coaching.",
        action: { label: "Request invite", href: "mailto:partners@focusflow.com" },
    },
    {
        icon: <FaQuestionCircle />,
        title: "Help center",
        copy: "Dive into step-by-step playbooks, release notes, and onboarding packs anytime.",
        action: { label: "Browse guides", href: "https://focusflow.help" },
    },
    {
        icon: <FaPhoneAlt />,
        title: "Callback queue",
        copy: "Leave your number and a specialist will schedule a call aligned to your timezone.",
        action: { label: "Schedule call", href: "mailto:hello@focusflow.com" },
    },
];

const officeDetails = [
    { icon: <FaMapMarkerAlt />, label: "HQ", value: "San Francisco · Remote-first" },
    { icon: <FaClock />, label: "Support hours", value: "Global crew · 24/7 priority" },
    { icon: <FaEnvelope />, label: "General", value: "hello@focusflow.com" },
];

const Contact = () => {
    const { isMobile, isTablet, width } = useResponsive();
    const isCompact = width < 600;

    const getStyles = () => ({
        page: {
            minHeight: "100vh",
            background: "linear-gradient(188deg, #040915 0%, #101a31 55%, #050b18 100%)",
            color: "#ffffff",
            overflowX: "hidden",
        },
        hero: {
            position: "relative",
            padding: isMobile ? "3rem 1rem 2.5rem" : "6rem 2rem 4.4rem",
            overflow: "hidden",
        },
        heroGlow: {
            position: "absolute",
            inset: "-260px auto auto 50%",
            transform: "translateX(-50%)",
            width: isMobile ? "500px" : "760px",
            height: isMobile ? "500px" : "760px",
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
            gap: isMobile ? "1.4rem" : "1.85rem",
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
            lineHeight: 1.12,
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
            gap: isMobile ? "0.85rem" : "1.35rem",
            width: "100%",
        },
        statCard: {
            padding: isMobile ? "1.25rem" : "1.55rem",
            borderRadius: "1.1rem",
            background: "rgba(18, 28, 48, 0.82)",
            border: "1px solid rgba(148, 163, 184, 0.28)",
            boxShadow: "0 28px 55px -34px rgba(56, 189, 248, 0.55)",
            textAlign: "left",
            display: "grid",
            gap: "0.4rem",
        },
        statValue: {
            fontSize: isMobile ? "1.6rem" : "1.95rem",
            fontWeight: 700,
            color: "#38bdf8",
        },
        statLabel: {
            color: "#9fb2d6",
            fontSize: isMobile ? "0.88rem" : "0.96rem",
        },
        statBadge: {
            color: "#38bdf8",
            fontSize: isMobile ? "0.75rem" : "0.82rem",
            fontWeight: 600,
        },
        main: {
            padding: isMobile ? "2.5rem 1rem 3rem" : "4.8rem 2rem 4.5rem",
        },
        section: {
            marginBottom: isMobile ? "3rem" : "4.8rem",
        },
        sectionHeader: {
            marginBottom: isMobile ? "1.85rem" : "2.4rem",
            display: "grid",
            gap: "0.6rem",
            textAlign: "center",
            justifyItems: "center",
        },
        sectionTitle: {
            fontSize: isMobile ? "1.5rem" : isTablet ? "1.8rem" : "2.1rem",
            fontWeight: 700,
            color: "#f8fafc",
            padding: isMobile ? "0 0.5rem" : "0",
        },
        sectionLead: {
            maxWidth: "48rem",
            color: "#9fb2d6",
            fontSize: isMobile ? "0.92rem" : "1.02rem",
            lineHeight: 1.72,
            padding: isMobile ? "0 0.5rem" : "0",
        },
        highlightGrid: {
            display: "grid",
            gridTemplateColumns: width >= 900 ? "repeat(3, 1fr)" : "1fr",
            gap: "1.5rem",
        },
        highlightCard: {
            padding: isMobile ? "1.5rem 1.35rem" : "1.85rem",
            borderRadius: "1.2rem",
            background: "rgba(17, 25, 43, 0.88)",
            border: "1px solid rgba(56, 189, 248, 0.2)",
            boxShadow: "0 24px 52px -36px rgba(56, 189, 248, 0.55)",
            display: "grid",
            gap: "0.7rem",
        },
        iconBadge: {
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
        highlightTitle: {
            fontSize: isMobile ? "1.08rem" : "1.18rem",
            fontWeight: 600,
            color: "#f1f5f9",
        },
        highlightCopy: {
            color: "#94a3b8",
            fontSize: isMobile ? "0.88rem" : "0.95rem",
            lineHeight: 1.65,
        },
        tracksGrid: {
            marginTop: isMobile ? "1.8rem" : "2.4rem",
            display: "grid",
            gridTemplateColumns: width >= 1028 ? "repeat(4, 1fr)" : width >= 696 ? "repeat(2, 1fr)" : "1fr",
            gap: isMobile ? "1rem" : "1.25rem",
        },
        trackCard: {
            padding: isMobile ? "1.35rem 1.25rem" : "1.65rem 1.4rem",
            borderRadius: "1rem",
            background: "rgba(12, 20, 36, 0.9)",
            border: "1px solid rgba(129, 140, 248, 0.24)",
            boxShadow: "0 24px 52px -32px rgba(129, 140, 248, 0.35)",
            display: "grid",
            gap: "0.55rem",
        },
        trackTitle: {
            color: "#e2e8f0",
            fontWeight: 600,
            fontSize: isMobile ? "1.02rem" : "1.08rem",
        },
        trackCopy: {
            color: "#94a3b8",
            fontSize: isMobile ? "0.85rem" : "0.92rem",
        },
        splitGrid: {
            display: "grid",
            gridTemplateColumns: width >= 800 ? "1fr 1fr" : "1fr",
            gap: "1.8rem",
            alignItems: "start",
        },
        formCard: {
            padding: isMobile ? "1.5rem 1.25rem" : "2rem",
            borderRadius: "1.35rem",
            background: "rgba(15, 23, 42, 0.88)",
            border: "1px solid rgba(56, 189, 248, 0.28)",
            boxShadow: "0 32px 68px -38px rgba(56, 189, 248, 0.5)",
            display: "grid",
            gap: isMobile ? "1rem" : "1.3rem",
        },
        inputGroup: {
            display: "grid",
            gap: "0.45rem",
        },
        label: {
            color: "#e2e8f0",
            fontWeight: 500,
            fontSize: isMobile ? "0.88rem" : "0.92rem",
        },
        input: {
            padding: isMobile ? "0.75rem 0.85rem" : "0.85rem 1rem",
            borderRadius: "0.65rem",
            background: "rgba(12, 20, 36, 0.65)",
            border: "1px solid rgba(56, 189, 248, 0.24)",
            color: "#f8fafc",
            fontSize: isMobile ? "0.9rem" : "0.95rem",
            outline: "none",
            transition: "border-color 0.3s ease",
        },
        textarea: {
            padding: isMobile ? "0.75rem 0.85rem" : "0.85rem 1rem",
            borderRadius: "0.65rem",
            background: "rgba(12, 20, 36, 0.65)",
            border: "1px solid rgba(56, 189, 248, 0.24)",
            color: "#f8fafc",
            fontSize: isMobile ? "0.9rem" : "0.95rem",
            minHeight: "140px",
            resize: "vertical",
            outline: "none",
        },
        primaryBtn: {
            marginTop: "0.6rem",
            padding: isMobile ? "0.85rem" : "1rem",
            borderRadius: "9999px",
            background: "linear-gradient(110deg, #38bdf8, #818cf8)",
            color: "#0f172a",
            fontWeight: 700,
            fontSize: isMobile ? "0.95rem" : "1.02rem",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderBottom: "none",
            cursor: "pointer",
            boxShadow: "0 30px 60px -34px rgba(56, 189, 248, 0.7)",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
        },
        successMessage: {
            textAlign: "center",
            color: "#38bdf8",
            fontWeight: 600,
            fontSize: isMobile ? "1rem" : "1.08rem",
        },
        infoPanel: {
            padding: isMobile ? "1.5rem 1.25rem" : "2rem",
            borderRadius: "1.35rem",
            background: "linear-gradient(145deg, rgba(56, 189, 248, 0.13), rgba(129, 140, 248, 0.15))",
            border: "1px solid rgba(56, 189, 248, 0.28)",
            display: "grid",
            gap: isMobile ? "1.4rem" : "1.7rem",
        },
        infoTitle: {
            fontSize: isMobile ? "1.25rem" : "1.4rem",
            fontWeight: 700,
            color: "#f8fafc",
        },
        infoList: {
            display: "grid",
            gap: isMobile ? "1rem" : "1.2rem",
        },
        infoItem: {
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: isMobile ? "0.65rem" : "0.85rem",
            alignItems: "start",
        },
        infoIcon: {
            width: isMobile ? "1.8rem" : "2.1rem",
            height: isMobile ? "1.8rem" : "2.1rem",
            borderRadius: "0.55rem",
            background: "rgba(56, 189, 248, 0.22)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#38bdf8",
            fontSize: isMobile ? "0.88rem" : "1rem",
        },
        infoContent: {
            display: "grid",
            gap: "0.25rem",
        },
        infoLabel: {
            color: "#38bdf8",
            fontSize: isMobile ? "0.78rem" : "0.82rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
        },
        infoValue: {
            color: "#e2e8f0",
            fontSize: isMobile ? "0.92rem" : "0.98rem",
        },
    });

    const styles = getStyles();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
    };

    return (
        <div style={styles.page}>
            <LandingNavbar />
            <section style={styles.hero}>
                <div style={styles.heroGlow} />
                <div style={styles.container}>
                    <div style={styles.heroInner}>
                        <span style={styles.heroBadge}>We’re here to help</span>
                        <h1 style={styles.heroTitle}>Talk to the FocusFlow crew</h1>
                        <p style={styles.heroLead}>
                            Reach our support specialists, partnership guides, and onboarding pros. Choose the channel that matches
                            your workflow and we’ll keep your momentum smooth.
                        </p>
                        <div style={styles.statRow}>
                            {heroStats.map((stat) => (
                                <div key={stat.label} style={styles.statCard}>
                                    <span style={styles.statValue}>{stat.value}</span>
                                    <span style={styles.statLabel}>{stat.label}</span>
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
                            <span style={styles.eyebrow}>Fastest routes</span>
                            <h2 style={styles.sectionTitle}>Choose how you want to connect</h2>
                            <p style={styles.sectionLead}>
                                Three guided paths make sure the right teammate picks up your request with full context and urgency.
                            </p>
                        </div>
                        <div style={styles.highlightGrid}>
                            {contactHighlights.map((item) => (
                                <div key={item.title} style={styles.highlightCard}>
                                    <span style={styles.highlightIcon}>{item.icon}</span>
                                    <span style={styles.highlightTag}>{item.tag}</span>
                                    <span style={styles.highlightTitle}>{item.title}</span>
                                    <p style={styles.highlightCopy}>{item.copy}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <span style={styles.eyebrow}>Support suite</span>
                            <h2 style={styles.sectionTitle}>Everything your workspace needs to stay in flow</h2>
                            <p style={styles.sectionLead}>
                                Lean on our hybrid support stack—async resources, human callbacks, and real-time chat.
                            </p>
                        </div>
                        <div style={styles.tracksGrid}>
                            {supportTracks.map((track) => (
                                <div key={track.title} style={styles.trackCard}>
                                    <span style={styles.highlightIcon}>{track.icon}</span>
                                    <span style={styles.highlightTitle}>{track.title}</span>
                                    <p style={styles.highlightCopy}>{track.copy}</p>
                                    <a href={track.action.href} style={styles.trackAction}>
                                        {track.action.label}
                                        <FaArrowRight />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.splitGrid}>
                            <div style={styles.formCard}>
                                <div>
                                    <h2 style={styles.formTitle}>Drop us a note</h2>
                                    <p style={styles.formLead}>
                                        Share a bit about what you need. We’ll reply with next steps, resources, or a friendly human on a
                                        call.
                                    </p>
                                </div>
                                {submitted ? (
                                    <div style={{
                                        padding: "1.5rem",
                                        borderRadius: "1rem",
                                        background: "rgba(56, 189, 248, 0.15)",
                                        border: "1px solid rgba(56, 189, 248, 0.32)",
                                        color: "#e0f2fe",
                                        fontWeight: 600,
                                        textAlign: "center",
                                    }}>
                                        Thank you! A FocusFlow specialist will be in touch shortly.
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Full name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            style={styles.input}
                                            required
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Work email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            style={styles.input}
                                            required
                                        />
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            style={{ ...styles.input, appearance: "none", cursor: "pointer" }}
                                            required
                                        >
                                            <option value="">Select a topic</option>
                                            <option value="Product tour">Product tour</option>
                                            <option value="Billing question">Billing question</option>
                                            <option value="Feature request">Feature request</option>
                                            <option value="Report an issue">Report an issue</option>
                                        </select>
                                        <textarea
                                            name="message"
                                            placeholder="How can we help?"
                                            value={formData.message}
                                            onChange={handleChange}
                                            style={styles.textarea}
                                            required
                                        />
                                        <button
                                            type="submit"
                                            style={styles.submitBtn}
                                            onMouseEnter={(event) => {
                                                event.currentTarget.style.transform = "translateY(-3px)";
                                                event.currentTarget.style.boxShadow = "0 34px 72px -36px rgba(56, 189, 248, 0.82)";
                                            }}
                                            onMouseLeave={(event) => {
                                                event.currentTarget.style.transform = "translateY(0px)";
                                                event.currentTarget.style.boxShadow = styles.submitBtn.boxShadow;
                                            }}
                                        >
                                            Send message
                                        </button>
                                    </form>
                                )}
                            </div>

                            <div style={styles.infoPanel}>
                                <h2 style={{ fontSize: "1.4rem", fontWeight: 700, margin: 0 }}>Prefer a human hand-off?</h2>
                                <p style={{ color: "#e0f2fe", fontSize: "0.98rem", lineHeight: 1.7, margin: 0 }}>
                                    Share your focus goals, rollout timeline, or tricky blockers. We’ll match you with the best teammate
                                    across product, support, or partnerships.
                                </p>
                                <div style={styles.infoList}>
                                    {officeDetails.map((detail) => (
                                        <div key={detail.label} style={styles.infoItem}>
                                            <span style={styles.infoIcon}>{detail.icon}</span>
                                            <div>
                                                <div style={styles.infoLabel}>{detail.label}</div>
                                                <p style={styles.infoMeta}>{detail.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <LandingFooter />
        </div>
    );
};

export default Contact;
