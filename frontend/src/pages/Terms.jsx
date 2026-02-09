import React from "react";
import useResponsive from "../hooks/useResponsive";
import {
    FaHandshake,
    FaShieldAlt,
    FaUserCheck,
    FaLock,
    FaBalanceScale,
    FaExclamationTriangle,
    FaGavel,
    FaEnvelope,
    FaArrowRight,
} from "react-icons/fa";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../styles/CardHover.css";

const heroStats = [
    { label: "Last updated", value: "Jan 23, 2025", meta: "Version 2.1" },
    { label: "Coverage", value: "Global", meta: "All plans" },
    { label: "Refund window", value: "14 days", meta: "Premium tiers" },
];

const commitments = [
    {
        icon: <FaHandshake />,
        title: "Mutual respect",
        copy: "FocusFlow operates as a trust pact—clear expectations, clear accountability, shared wins.",
    },
    {
        icon: <FaShieldAlt />,
        title: "Safe workspace",
        copy: "We maintain uptime, protect your data, and reserve rights to intervene when policy is breached.",
    },
    {
        icon: <FaUserCheck />,
        title: "Transparent changes",
        copy: "Major updates come with advanced notice so you can review the new pact before it applies.",
    },
];

const usageMatrix = {
    allowed: [
        "Create and manage personal or team workspaces",
        "Customize rituals, notifications, and integrations",
        "Export your data or share insights with collaborators",
        "Access FocusFlow across multiple devices",
    ],
    restricted: [
        "Reverse engineer or probe FocusFlow infrastructure",
        "Automate usage with bots that bypass rate limits",
        "Share credentials or resell the service",
        "Upload harmful, unlawful, or infringing content",
        "Violate any jurisdiction’s applicable laws while using FocusFlow",
    ],
};

const accountDuties = [
    "Provide accurate, up-to-date registration details",
    "Maintain the confidentiality of passwords and API keys",
    "Notify FocusFlow immediately if you suspect unauthorized access",
    "Only maintain one free account per individual or organization",
    "Avoid automated signups or scripted account creation",
];

const billingHighlights = [
    {
        title: "Free tier",
        detail: "Core focus rituals remain free forever—no credit card required.",
    },
    {
        title: "Premium plans",
        detail: "Billed monthly or annually; pricing changes arrive with 30 days notice.",
    },
    {
        title: "Refund policy",
        detail: "If FocusFlow isn’t the right fit, request a refund within 14 days of purchase.",
    },
    {
        title: "Cancellation",
        detail: "Downgrade anytime—premium access continues through the current billing cycle.",
    },
];

const enforcementSteps = [
    {
        label: "Warnings",
        copy: "We’ll reach out about violations and give you a chance to resolve the issue quickly.",
    },
    {
        label: "Suspension",
        copy: "If problems persist, temporary account suspension protects the rest of the community.",
    },
    {
        label: "Termination",
        copy: "Serious or repeated violations can trigger account closure and data removal per policy.",
    },
];

const legalSafeguards = [
    {
        icon: <FaLock />,
        title: "Service ownership",
        body: "FocusFlow’s platform, brand, and codebase remain intellectual property of FocusFlow.",
    },
    {
        icon: <FaExclamationTriangle />,
        title: "Warranty disclaimer",
        body: "FocusFlow ships “as is” without guarantees of uninterrupted or error-free operation.",
    },
    {
        icon: <FaBalanceScale />,
        title: "Liability limits",
        body: "Indirect, incidental, or consequential damages fall outside our obligations under the law.",
    },
    {
        icon: <FaGavel />,
        title: "Governing law",
        body: "Disputes are handled under applicable jurisdictional law via arbitration or local courts.",
    },
];

const Terms = () => {
    const { isMobile, isTablet, width } = useResponsive();

    const getStyles = () => ({
        page: {
            minHeight: "100vh",
            background: "linear-gradient(188deg, #040915 0%, #101a31 55%, #050b18 100%)",
            color: "#ffffff",
            overflowX: "hidden",
        },
        hero: {
            position: "relative",
            padding: isMobile ? "3rem 1rem 2.5rem" : "6.2rem 2rem 4.6rem",
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
            padding: isMobile ? "0.45rem 1rem" : "0.55rem 1.2rem",
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
            fontSize: isMobile ? "0.95rem" : "1.15rem",
            lineHeight: 1.78,
            padding: isMobile ? "0 0.5rem" : "0",
        },
        statRow: {
            display: "grid",
            gridTemplateColumns: width >= 768 ? "repeat(3, 1fr)" : "1fr",
            gap: isMobile ? "0.9rem" : "1.35rem",
            width: "100%",
        },
        statCard: {
            padding: isMobile ? "1.25rem" : "1.55rem",
            borderRadius: "1.1rem",
            background: "rgba(18, 28, 48, 0.82)",
            border: "1px solid rgba(148, 163, 184, 0.25)",
            boxShadow: "0 28px 55px -34px rgba(56, 189, 248, 0.55)",
            display: "flex",
            flexDirection: "column",
            gap: "0.45rem",
            textAlign: "left",
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
            padding: isMobile ? "2.5rem 1rem 3rem" : "4.8rem 2rem 4.4rem",
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
        cardGrid: {
            display: "grid",
            gridTemplateColumns: width >= 900 ? "repeat(3, 1fr)" : "1fr",
            gap: isMobile ? "1.1rem" : "1.55rem",
        },
        commitmentCard: {
            padding: isMobile ? "1.5rem" : "1.8rem",
            borderRadius: "1.15rem",
            background: "rgba(12, 20, 36, 0.9)",
            border: "1px solid rgba(129, 140, 248, 0.22)",
            display: "grid",
            gap: "0.7rem",
        },
        iconBadge: {
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
        commitmentTitle: {
            fontSize: isMobile ? "1.08rem" : "1.18rem",
            fontWeight: 600,
            color: "#f1f5f9",
        },
        commitmentCopy: {
            color: "#9fb2d6",
            fontSize: isMobile ? "0.88rem" : "0.95rem",
            lineHeight: 1.65,
        },
        usageWrap: {
            display: "grid",
            gap: isMobile ? "1rem" : "1.4rem",
        },
        usagePanel: {
            padding: isMobile ? "1.35rem" : "1.6rem",
            borderRadius: "1.1rem",
            background: "rgba(15, 24, 42, 0.84)",
            border: "1px solid rgba(56, 189, 248, 0.22)",
        },
        usageHeading: {
            fontSize: isMobile ? "1.05rem" : "1.15rem",
            fontWeight: 600,
            color: "#38bdf8",
            marginBottom: isMobile ? "0.75rem" : "0.9rem",
        },
        bulletList: {
            margin: 0,
            paddingLeft: "1.2rem",
            color: "#94a3b8",
            fontSize: isMobile ? "0.88rem" : "0.95rem",
            lineHeight: 1.7,
        },
        dutiesList: {
            margin: 0,
            paddingLeft: "1.2rem",
            color: "#9fb2d6",
            fontSize: isMobile ? "0.88rem" : "0.96rem",
            lineHeight: 1.74,
        },
        billingGrid: {
            display: "grid",
            gridTemplateColumns: width >= 1028 ? "repeat(4, 1fr)" : width >= 696 ? "repeat(2, 1fr)" : "1fr",
            gap: isMobile ? "1rem" : "1.5rem",
        },
        billingCard: {
            padding: isMobile ? "1.35rem" : "1.6rem",
            borderRadius: "1.1rem",
            background: "rgba(17, 26, 44, 0.78)",
            border: "1px solid rgba(56, 189, 248, 0.2)",
            display: "grid",
            gap: "0.5rem",
        },
        billingTitle: {
            fontSize: isMobile ? "0.98rem" : "1.05rem",
            fontWeight: 600,
            color: "#f1f5f9",
        },
        billingDetail: {
            color: "#9fb2d6",
            fontSize: isMobile ? "0.85rem" : "0.94rem",
            lineHeight: 1.6,
        },
        enforcementList: {
            display: "grid",
            gap: isMobile ? "1rem" : "1.2rem",
            marginTop: isMobile ? "1.3rem" : "1.6rem",
        },
        enforcementCard: {
            padding: isMobile ? "1.35rem" : "1.6rem",
            borderRadius: "1.1rem",
            background: "rgba(12, 20, 36, 0.88)",
            border: "1px solid rgba(129, 140, 248, 0.22)",
            display: "grid",
            gap: "0.45rem",
        },
        enforcementLabel: {
            fontSize: isMobile ? "0.9rem" : "0.98rem",
            fontWeight: 600,
            color: "#38bdf8",
        },
        enforcementCopy: {
            color: "#9fb2d6",
            fontSize: isMobile ? "0.85rem" : "0.94rem",
            lineHeight: 1.6,
        },
        legalGrid: {
            display: "grid",
            gridTemplateColumns: width >= 1028 ? "repeat(4, 1fr)" : width >= 696 ? "repeat(2, 1fr)" : "1fr",
            gap: isMobile ? "1rem" : "1.5rem",
        },
        legalCard: {
            padding: isMobile ? "1.45rem" : "1.7rem",
            borderRadius: "1.15rem",
            background: "rgba(12, 20, 36, 0.88)",
            border: "1px solid rgba(56, 189, 248, 0.22)",
            display: "grid",
            gap: "0.6rem",
        },
        legalTitle: {
            fontSize: isMobile ? "1rem" : "1.1rem",
            fontWeight: 600,
            color: "#f8fafc",
        },
        legalBody: {
            color: "#9fb2d6",
            fontSize: isMobile ? "0.88rem" : "0.95rem",
            lineHeight: 1.65,
        },
        contactCard: {
            padding: isMobile ? "1.5rem 1.25rem" : "2.1rem",
            borderRadius: "1.4rem",
            background: "linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(129, 140, 248, 0.24))",
            border: "1px solid rgba(56, 189, 248, 0.28)",
            textAlign: "center",
            display: "grid",
            gap: "1rem",
            color: "#e0f2fe",
        },
        contactBtn: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobile ? "0.8rem 1.8rem" : "0.9rem 2.3rem",
            borderRadius: "9999px",
            background: "rgba(15, 23, 42, 0.82)",
            border: "1px solid rgba(56, 189, 248, 0.35)",
            color: "#38bdf8",
            fontWeight: 600,
            textDecoration: "none",
            gap: "0.5rem",
            fontSize: isMobile ? "0.92rem" : "1rem",
            transition: "transform 0.25s ease, border-color 0.25s ease",
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
                        <span style={styles.heroBadge}>FocusFlow usage agreement</span>
                        <h1 style={styles.heroTitle}>Terms of Service</h1>
                        <p style={styles.heroLead}>
                            Using FocusFlow means joining a community built on calm productivity. These terms explain the mutual
                            expectations that keep every workspace respectful, resilient, and secure.
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
                            <h2 style={styles.sectionTitle}>The pact in plain language</h2>
                            <p style={styles.sectionLead}>
                                We built FocusFlow around reciprocity: we deliver reliable tools and transparent updates, you use
                                them responsibly. Here’s the snapshot of how that plays out.
                            </p>
                        </div>
                        <div style={styles.cardGrid}>
                            {commitments.map((item) => (
                                <div key={item.title} style={styles.commitmentCard}>
                                    <span style={styles.iconBadge}>{item.icon}</span>
                                    <span style={styles.commitmentTitle}>{item.title}</span>
                                    <p style={styles.commitmentCopy}>{item.copy}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>How you can—and can’t—use FocusFlow</h2>
                            <p style={styles.sectionLead}>
                                Stick to the playbook below to keep your account in good standing and the community healthy.
                            </p>
                        </div>
                        <div style={styles.usageWrap}>
                            <div style={styles.usagePanel}>
                                <span style={styles.usageHeading}>Permitted use</span>
                                <ul style={styles.bulletList}>
                                    {usageMatrix.allowed.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div style={styles.usagePanel}>
                                <span style={styles.usageHeading}>Restricted activities</span>
                                <ul style={styles.bulletList}>
                                    {usageMatrix.restricted.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>Account responsibilities</h2>
                            <p style={styles.sectionLead}>
                                We protect your accounts with modern security, but the first layer is still you. Keep these guidelines
                                close.
                            </p>
                        </div>
                        <ul style={styles.dutiesList}>
                            {accountDuties.map((duty) => (
                                <li key={duty}>{duty}</li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>Billing & subscriptions</h2>
                            <p style={styles.sectionLead}>
                                Fair pricing and flexible exits keep FocusFlow aligned with your needs. The essentials are below—dive
                                into full details in your billing settings anytime.
                            </p>
                        </div>
                        <div style={styles.billingGrid}>
                            {billingHighlights.map((highlight) => (
                                <div key={highlight.title} style={styles.billingCard}>
                                    <span style={styles.billingTitle}>{highlight.title}</span>
                                    <p style={styles.billingDetail}>{highlight.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>Enforcement sequence</h2>
                            <p style={styles.sectionLead}>
                                We aim to resolve issues collaboratively. If boundaries continue to be crossed, this is the escalation
                                playbook we follow.
                            </p>
                        </div>
                        <div style={styles.enforcementList}>
                            {enforcementSteps.map((step) => (
                                <div key={step.label} style={styles.enforcementCard}>
                                    <span style={styles.enforcementLabel}>{step.label}</span>
                                    <span style={styles.enforcementCopy}>{step.copy}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>Legal safety net</h2>
                            <p style={styles.sectionLead}>
                                These clauses clarify ownership, liability, and dispute handling. They mirror best practices across
                                modern SaaS pacts.
                            </p>
                        </div>
                        <div style={styles.legalGrid}>
                            {legalSafeguards.map((item) => (
                                <div key={item.title} style={styles.legalCard}>
                                    <span style={styles.iconBadge}>{item.icon}</span>
                                    <span style={styles.legalTitle}>{item.title}</span>
                                    <p style={styles.legalBody}>{item.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.contactCard}>
                            <h2 style={{ fontSize: "2rem", fontWeight: 700, margin: 0 }}>Questions about these terms?</h2>
                            <p style={{ color: "#cbd5f5", fontSize: "1rem", lineHeight: 1.7, margin: 0 }}>
                                Our legal desk answers within two business days. Include links or context so we can help faster.
                            </p>
                            <a
                                href="mailto:legal@focusflow.com"
                                style={styles.contactBtn}
                                onMouseEnter={(event) => {
                                    event.currentTarget.style.transform = "translateY(-3px)";
                                    event.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.55)";
                                }}
                                onMouseLeave={(event) => {
                                    event.currentTarget.style.transform = "translateY(0px)";
                                    event.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.35)";
                                }}
                            >
                                <FaEnvelope /> legal@focusflow.com <FaArrowRight />
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <LandingFooter />
        </div>
    );
};

export default Terms;
