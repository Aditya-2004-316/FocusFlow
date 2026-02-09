import React from "react";
import useResponsive from "../hooks/useResponsive";
import {
    FaShieldAlt,
    FaLock,
    FaFingerprint,
    FaServer,
    FaCodeBranch,
    FaTools,
    FaEye,
    FaBolt,
    FaClipboardCheck,
    FaUserShield,
    FaEnvelope,
    FaArrowRight,
} from "react-icons/fa";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../styles/CardHover.css";

const heroStats = [
    { value: "AES-256 + TLS 1.3", label: "Encryption standard" },
    { value: "99.95%", label: "SLO uptime" },
    { value: "< 1 hour", label: "Critical response window" },
];

const defenseHighlights = [
    {
        icon: <FaShieldAlt />,
        tag: "Zero trust",
        title: "Layered perimeter",
        copy: "Multi-region firewalls, strict VPC isolation, and traffic inspection keep threats outside your workspace.",
    },
    {
        icon: <FaLock />,
        tag: "Encryption",
        title: "Keys stay locked",
        copy: "AES-256 at rest, TLS 1.3 in transit, hardware-backed key rotation, and scoped secrets management.",
    },
    {
        icon: <FaFingerprint />,
        tag: "Access",
        title: "Least privilege access",
        copy: "Role-based permissions, enforced MFA, and device fingerprinting so only verified teammates get in.",
    },
    {
        icon: <FaUserShield />,
        tag: "People",
        title: "Trained responders",
        copy: "Annual security training, background checks, and on-call rotations for 24/7 human coverage.",
    },
];

const architectureLayers = [
    {
        icon: <FaServer />,
        title: "Segregated infrastructure",
        blurb: "Prod, staging, and analytics live in isolated VPCs with private networking and strict ingress policies.",
    },
    {
        icon: <FaCodeBranch />,
        title: "Immutable delivery",
        blurb: "Signed containers deploy through gated CI/CD with automated security scans on every change.",
    },
    {
        icon: <FaTools />,
        title: "Change governance",
        blurb: "Four-eyes approvals, audit trails, and rollback snapshots keep releases accountable and reversible.",
    },
    {
        icon: <FaLock />,
        title: "Data lifecycle",
        blurb: "Granular retention schedules, anonymized analytics, and secure shredding after deletion windows lapse.",
    },
];

const monitoringPlaybook = [
    {
        icon: <FaEye />,
        label: "Detect",
        copy: "Streaming logs feed a managed SIEM with anomaly detection and threat intel enrichment in real time.",
    },
    {
        icon: <FaBolt />,
        label: "Respond",
        copy: "Pager rotations fire within minutes, with predefined runbooks and cross-functional war rooms on standby.",
    },
    {
        icon: <FaClipboardCheck />,
        label: "Recover",
        copy: "Point-in-time restores, post-incident reviews, and customer-facing summaries within 24 hours of closure.",
    },
];

const complianceBadges = [
    { icon: <FaClipboardCheck />, title: "GDPR & CCPA", desc: "Data subject rights workflows and regional hosting options." },
    { icon: <FaUserShield />, title: "SOC 2 Type II", desc: "Audited controls in progress with quarterly external reviews." },
    { icon: <FaShieldAlt />, title: "OWASP Top 10", desc: "Continuous coverage against the most common web threats." },
    { icon: <FaLock />, title: "SAML & SCIM", desc: "Enterprise identity federation and automated provisioning." },
];

const sharedDuties = [
    "Use unique, 12+ character passwords or SSO with enforced MFA.",
    "Limit access to least privilege roles and review membership quarterly.",
    "Report suspicious logins or phishing immediately to our response desk.",
    "Keep browsers, extensions, and devices patched to the latest version.",
    "Export data securely and delete local files that are no longer required.",
];

const Security = () => {
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
            padding: isMobile ? "3rem 1rem 2.5rem" : "6.3rem 2rem 4.6rem",
            overflow: "hidden",
        },
        heroGlow: {
            position: "absolute",
            inset: "-280px auto auto 50%",
            transform: "translateX(-50%)",
            width: isMobile ? "520px" : "820px",
            height: isMobile ? "520px" : "820px",
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
            gap: isMobile ? "1.4rem" : "1.85rem",
            textAlign: "center",
            justifyItems: "center",
        },
        heroBadge: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            padding: isMobile ? "0.45rem 1rem" : "0.55rem 1.25rem",
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
            lineHeight: 1.1,
            background: "linear-gradient(115deg, #38bdf8, #60a5fa, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            padding: isMobile ? "0 0.5rem" : "0",
        },
        heroLead: {
            maxWidth: "42rem",
            color: "#cbd5f5",
            fontSize: isMobile ? "0.95rem" : "1.16rem",
            lineHeight: 1.78,
            padding: isMobile ? "0 0.5rem" : "0",
        },
        statRow: {
            display: "grid",
            gridTemplateColumns: width >= 768 ? "repeat(3, 1fr)" : "1fr",
            gap: isMobile ? "0.9rem" : "1.25rem",
            width: "100%",
        },
        statCard: {
            padding: isMobile ? "1.25rem" : "1.55rem",
            borderRadius: "1.15rem",
            background: "rgba(18, 28, 48, 0.82)",
            border: "1px solid rgba(148, 163, 184, 0.25)",
            boxShadow: "0 30px 68px -42px rgba(56, 189, 248, 0.6)",
            display: "grid",
            gap: "0.4rem",
        },
        statValue: {
            fontSize: isMobile ? "1.1rem" : "1.28rem",
            fontWeight: 600,
            color: "#38bdf8",
        },
        statLabel: {
            color: "#9fb2d6",
            fontSize: isMobile ? "0.85rem" : "0.92rem",
            lineHeight: 1.5,
        },
        main: {
            padding: isMobile ? "2.5rem 1rem 3rem" : "4.8rem 2rem 4.4rem",
        },
        section: {
            marginBottom: isMobile ? "3rem" : "4.2rem",
        },
        sectionHeader: {
            textAlign: "center",
            display: "grid",
            gap: "0.6rem",
            marginBottom: isMobile ? "1.75rem" : "2.2rem",
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
            fontSize: isMobile ? "1.5rem" : isTablet ? "1.8rem" : "2.12rem",
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
        cardGrid: {
            display: "grid",
            gridTemplateColumns: width >= 1028 ? "repeat(4, 1fr)" : width >= 696 ? "repeat(2, 1fr)" : "1fr",
            gap: isMobile ? "1.1rem" : "1.6rem",
        },
        card: {
            padding: isMobile ? "1.5rem" : "1.85rem",
            borderRadius: "1.2rem",
            background: "rgba(17, 26, 44, 0.82)",
            border: "1px solid rgba(56, 189, 248, 0.22)",
            display: "grid",
            gap: "0.75rem",
        },
        cardIcon: {
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
        cardTag: {
            fontSize: isMobile ? "0.72rem" : "0.78rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#38bdf8",
            fontWeight: 600,
        },
        cardTitle: {
            fontSize: isMobile ? "1.08rem" : "1.18rem",
            fontWeight: 600,
            color: "#f1f5f9",
        },
        cardCopy: {
            color: "#94a3b8",
            fontSize: isMobile ? "0.88rem" : "0.95rem",
            lineHeight: 1.68,
        },
        architectureGrid: {
            display: "grid",
            gridTemplateColumns: width >= 1028 ? "repeat(4, 1fr)" : width >= 696 ? "repeat(2, 1fr)" : "1fr",
            gap: isMobile ? "1rem" : "1.5rem",
        },
        architectureCard: {
            padding: isMobile ? "1.5rem" : "1.8rem",
            borderRadius: "1.2rem",
            background: "rgba(12, 20, 36, 0.9)",
            border: "1px solid rgba(129, 140, 248, 0.24)",
            display: "grid",
            gap: "0.7rem",
        },
        monitoringGrid: {
            display: "grid",
            gridTemplateColumns: width >= 900 ? "repeat(3, 1fr)" : "1fr",
            gap: isMobile ? "1rem" : "1.5rem",
        },
        monitoringCard: {
            padding: isMobile ? "1.5rem" : "1.75rem",
            borderRadius: "1.15rem",
            background: "rgba(15, 23, 42, 0.82)",
            border: "1px solid rgba(56, 189, 248, 0.2)",
            display: "grid",
            gap: "0.65rem",
            textAlign: "center",
        },
        monitoringLabel: {
            fontSize: isMobile ? "0.82rem" : "0.88rem",
            fontWeight: 600,
            color: "#38bdf8",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
        },
        badgeGrid: {
            display: "grid",
            gridTemplateColumns: width >= 1028 ? "repeat(4, 1fr)" : width >= 696 ? "repeat(2, 1fr)" : "1fr",
            gap: isMobile ? "1rem" : "1.4rem",
        },
        badgeCard: {
            padding: isMobile ? "1.4rem" : "1.65rem",
            borderRadius: "1.1rem",
            background: "rgba(17, 25, 43, 0.88)",
            border: "1px solid rgba(56, 189, 248, 0.2)",
            display: "grid",
            gap: "0.6rem",
            textAlign: "center",
        },
        dutyList: {
            margin: 0,
            paddingLeft: "1.15rem",
            color: "#9fb2d6",
            fontSize: isMobile ? "0.88rem" : "0.95rem",
            lineHeight: 1.7,
        },
        contactCard: {
            padding: isMobile ? "1.5rem 1.25rem" : "2.2rem",
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
            gap: "0.5rem",
            padding: isMobile ? "0.8rem 1.8rem" : "0.9rem 2.3rem",
            borderRadius: "9999px",
            background: "rgba(15, 23, 42, 0.82)",
            border: "1px solid rgba(56, 189, 248, 0.35)",
            color: "#38bdf8",
            fontWeight: 600,
            textDecoration: "none",
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
                        <span style={styles.heroBadge}>Security center</span>
                        <h1 style={styles.heroTitle}>Calm, continuous protection</h1>
                        <p style={styles.heroLead}>
                            FocusFlow is engineered for privacy-first teams who ship fast. Every layer—from code to human response—is
                            hardened so your rituals stay productive and protected.
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
                            <span style={styles.eyebrow}>Defense in depth</span>
                            <h2 style={styles.sectionTitle}>Security is a shared ritual, not a checklist</h2>
                            <p style={styles.sectionLead}>
                                Our layered controls keep the perimeter tight, the data encrypted, and access continuously verified—so
                                your team can focus on work, not worry.
                            </p>
                        </div>
                        <div style={styles.cardGrid}>
                            {defenseHighlights.map((card) => (
                                <div key={card.title} style={styles.card}>
                                    <span style={styles.cardIcon}>{card.icon}</span>
                                    <span style={styles.cardTag}>{card.tag}</span>
                                    <span style={styles.cardTitle}>{card.title}</span>
                                    <p style={styles.cardCopy}>{card.copy}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <span style={styles.eyebrow}>Architecture blueprint</span>
                            <h2 style={styles.sectionTitle}>Infrastructure designed for resilience</h2>
                            <p style={styles.sectionLead}>
                                From code commit to data archive, we engineer for isolation, observability, and rapid recovery.
                            </p>
                        </div>
                        <div style={styles.architectureGrid}>
                            {architectureLayers.map((layer) => (
                                <div key={layer.title} style={styles.architectureCard}>
                                    <span style={styles.cardIcon}>{layer.icon}</span>
                                    <span style={styles.cardTitle}>{layer.title}</span>
                                    <p style={styles.cardCopy}>{layer.blurb}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <span style={styles.eyebrow}>Monitoring & response</span>
                            <h2 style={styles.sectionTitle}>Always-on coverage with human expertise</h2>
                            <p style={styles.sectionLead}>
                                Automation catches the noise, responders handle the nuance—ensuring transparency from detection to
                                resolution.
                            </p>
                        </div>
                        <div style={styles.monitoringGrid}>
                            {monitoringPlaybook.map((item) => (
                                <div key={item.label} style={styles.monitoringCard}>
                                    <span style={styles.cardIcon}>{item.icon}</span>
                                    <span style={styles.monitoringLabel}>{item.label}</span>
                                    <p style={styles.cardCopy}>{item.copy}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <span style={styles.eyebrow}>Compliance & trust</span>
                            <h2 style={styles.sectionTitle}>Standards today, certifications tomorrow</h2>
                            <p style={styles.sectionLead}>
                                FocusFlow aligns with global data protection frameworks and is actively expanding third-party
                                attestations.
                            </p>
                        </div>
                        <div style={styles.badgeGrid}>
                            {complianceBadges.map((badge) => (
                                <div key={badge.title} style={styles.badgeCard}>
                                    <span style={styles.cardIcon}>{badge.icon}</span>
                                    <span style={styles.cardTitle}>{badge.title}</span>
                                    <p style={styles.cardCopy}>{badge.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.sectionHeader}>
                            <span style={styles.eyebrow}>Shared responsibilities</span>
                            <h2 style={styles.sectionTitle}>Security is stronger when we partner</h2>
                            <p style={styles.sectionLead}>
                                We handle the platform; you keep your workspace hygiene sharp. Follow these best practices to lock things
                                down.
                            </p>
                        </div>
                        <ul style={styles.dutyList}>
                            {sharedDuties.map((duty) => (
                                <li key={duty}>{duty}</li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.container}>
                        <div style={styles.contactCard}>
                            <h2 style={{ fontSize: "2rem", fontWeight: 700, margin: 0 }}>Need to flag a concern?</h2>
                            <p style={{ color: "#cbd5f5", fontSize: "1rem", lineHeight: 1.7, margin: 0 }}>
                                Report potential issues or request copies of our latest security reports. We respond within one business
                                day.
                            </p>
                            <a
                                href="mailto:security@focusflow.com"
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
                                <FaEnvelope /> security@focusflow.com <FaArrowRight />
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <LandingFooter />
        </div>
    );
};

export default Security;
