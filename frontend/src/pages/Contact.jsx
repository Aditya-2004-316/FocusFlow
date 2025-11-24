import React, { useState } from "react";
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

const styles = {
    page: {
        minHeight: "100vh",
        background: "linear-gradient(188deg, #040915 0%, #101a31 55%, #050b18 100%)",
        color: "#ffffff",
    },
    hero: {
        position: "relative",
        padding: "6rem 2rem 4.4rem",
        overflow: "hidden",
    },
    heroGlow: {
        position: "absolute",
        inset: "-260px auto auto 50%",
        transform: "translateX(-50%)",
        width: "820px",
        height: "820px",
        background: "radial-gradient(circle at center, rgba(56, 189, 248, 0.24), transparent 68%)",
        filter: "blur(18px)",
    },
    container: {
        maxWidth: "1080px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
    },
    heroInner: {
        display: "grid",
        gap: "1.8rem",
        textAlign: "center",
        justifyItems: "center",
    },
    heroBadge: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45rem",
        padding: "0.55rem 1.2rem",
        borderRadius: "9999px",
        border: "1px solid rgba(56, 189, 248, 0.45)",
        background: "rgba(15, 23, 42, 0.72)",
        color: "#38bdf8",
        letterSpacing: "0.14em",
        fontSize: "0.82rem",
        fontWeight: 600,
        textTransform: "uppercase",
    },
    heroTitle: {
        fontSize: "3.05rem",
        fontWeight: 800,
        letterSpacing: "-0.03em",
        margin: 0,
        lineHeight: 1.12,
        background: "linear-gradient(115deg, #38bdf8, #60a5fa, #a855f7)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
    },
    heroLead: {
        maxWidth: "44rem",
        color: "#cbd5f5",
        fontSize: "1.14rem",
        lineHeight: 1.78,
    },
    statRow: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1.15rem",
        width: "100%",
    },
    statCard: {
        padding: "1.5rem",
        borderRadius: "1.15rem",
        background: "rgba(18, 28, 48, 0.82)",
        border: "1px solid rgba(148, 163, 184, 0.25)",
        boxShadow: "0 28px 62px -38px rgba(56, 189, 248, 0.6)",
        display: "grid",
        gap: "0.35rem",
    },
    statValue: {
        fontSize: "1.8rem",
        fontWeight: 700,
        color: "#38bdf8",
    },
    statLabel: {
        color: "#9fb2d6",
        fontSize: "0.94rem",
    },
    main: {
        padding: "4.6rem 2rem 4.2rem",
    },
    section: {
        marginBottom: "4rem",
    },
    sectionHeader: {
        textAlign: "center",
        display: "grid",
        gap: "0.6rem",
        marginBottom: "2.4rem",
        justifyItems: "center",
    },
    eyebrow: {
        fontSize: "0.82rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "rgba(148, 163, 184, 0.88)",
        fontWeight: 600,
    },
    sectionTitle: {
        fontSize: "2.2rem",
        fontWeight: 700,
        color: "#f8fafc",
    },
    sectionLead: {
        maxWidth: "42rem",
        color: "#9fb2d6",
        fontSize: "1.02rem",
        lineHeight: 1.7,
    },
    highlightGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.5rem",
    },
    highlightCard: {
        padding: "1.75rem",
        borderRadius: "1.2rem",
        background: "rgba(17, 26, 44, 0.82)",
        border: "1px solid rgba(56, 189, 248, 0.22)",
        display: "grid",
        gap: "0.75rem",
    },
    highlightIcon: {
        width: "2.7rem",
        height: "2.7rem",
        borderRadius: "0.85rem",
        background: "rgba(56, 189, 248, 0.16)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#38bdf8",
        fontSize: "1.4rem",
    },
    highlightTag: {
        fontSize: "0.78rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#38bdf8",
        fontWeight: 600,
    },
    highlightTitle: {
        fontSize: "1.16rem",
        fontWeight: 600,
        color: "#f1f5f9",
    },
    highlightCopy: {
        color: "#94a3b8",
        fontSize: "0.95rem",
        lineHeight: 1.68,
    },
    tracksGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.6rem",
    },
    trackCard: {
        padding: "1.9rem",
        borderRadius: "1.2rem",
        background: "rgba(12, 20, 36, 0.88)",
        border: "1px solid rgba(129, 140, 248, 0.24)",
        display: "grid",
        gap: "0.85rem",
    },
    trackAction: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45rem",
        color: "#38bdf8",
        fontWeight: 600,
        textDecoration: "none",
        fontSize: "0.95rem",
    },
    splitGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "1.8rem",
        alignItems: "start",
    },
    formCard: {
        padding: "2.1rem",
        borderRadius: "1.3rem",
        background: "rgba(15, 23, 42, 0.8)",
        border: "1px solid rgba(56, 189, 248, 0.24)",
        display: "grid",
        gap: "1.1rem",
    },
    formTitle: {
        fontSize: "1.35rem",
        fontWeight: 700,
        color: "#f1f5f9",
        margin: 0,
    },
    formLead: {
        color: "#94a3b8",
        fontSize: "0.98rem",
        lineHeight: 1.7,
        margin: 0,
    },
    input: {
        width: "100%",
        padding: "0.85rem",
        fontSize: "0.96rem",
        borderRadius: "0.65rem",
        border: "1px solid rgba(56, 189, 248, 0.24)",
        background: "rgba(15, 23, 42, 0.65)",
        color: "#e2e8f0",
        outline: "none",
    },
    textarea: {
        width: "100%",
        padding: "0.85rem",
        fontSize: "0.96rem",
        borderRadius: "0.75rem",
        border: "1px solid rgba(56, 189, 248, 0.24)",
        background: "rgba(15, 23, 42, 0.65)",
        color: "#e2e8f0",
        minHeight: "8rem",
        resize: "vertical",
        outline: "none",
    },
    submitBtn: {
        background: "linear-gradient(110deg, #38bdf8, #818cf8)",
        color: "#0f172a",
        border: "none",
        padding: "0.95rem 2.4rem",
        borderRadius: "9999px",
        fontWeight: 700,
        fontSize: "1.02rem",
        cursor: "pointer",
        boxShadow: "0 28px 60px -36px rgba(56, 189, 248, 0.75)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
    },
    infoPanel: {
        padding: "2.1rem",
        borderRadius: "1.3rem",
        background: "linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(129, 140, 248, 0.24))",
        border: "1px solid rgba(56, 189, 248, 0.28)",
        display: "grid",
        gap: "1.15rem",
    },
    infoList: {
        display: "grid",
        gap: "1rem",
    },
    infoItem: {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "0.9rem",
        alignItems: "center",
    },
    infoIcon: {
        width: "2.4rem",
        height: "2.4rem",
        borderRadius: "0.75rem",
        background: "rgba(15, 23, 42, 0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#38bdf8",
    },
    infoMeta: {
        color: "#cbd5f5",
        margin: 0,
        fontSize: "0.98rem",
    },
    infoLabel: {
        color: "#38bdf8",
        fontSize: "0.8rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        fontWeight: 600,
        marginBottom: "0.25rem",
    },
};

const Contact = () => {
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
