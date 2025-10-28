import React, { useState } from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import {
    FaChevronDown,
    FaChevronUp,
    FaSearch,
    FaHeadset,
    FaQuestionCircle,
    FaStopwatch,
    FaChartLine,
    FaShieldAlt,
} from "react-icons/fa";
import "../styles/CardHover.css";

const quickGlances = [
    {
        label: "Timer basics",
        icon: <FaStopwatch />,
        summary: "Customize sessions, breaks, and reminders in under a minute.",
        target: "getting-started",
    },
    {
        label: "Analytics exports",
        icon: <FaChartLine />,
        summary: "Download focus history in CSV or JSON straight from settings.",
        target: "data-analytics",
    },
    {
        label: "Privacy controls",
        icon: <FaShieldAlt />,
        summary: "Delete data anytime—your focus logs stay yours.",
        target: "privacy-security",
    },
];

const faqSections = [
    {
        key: "getting-started",
        title: "Getting started",
        hint: "Launch FocusFlow in minutes",
        items: [
            {
                question: "What is FocusFlow?",
                answer: "FocusFlow is a platform to help you manage your time and stay productive.",
            },
            {
                question: "Is FocusFlow free?",
                answer: "Yes! All features are free to use.",
            },
            {
                question: "Do I need to create an account?",
                answer:
                    "No account is required for the basics. Creating one lets you save progress and access sessions from any device.",
            },
        ],
    },
    {
        key: "timer",
        title: "Using the timer",
        hint: "Dial-in your deep work rhythm",
        items: [
            {
                question: "How do I use the timer?",
                answer: "Head to the dashboard, set your session, and start focusing—no extra setup required.",
            },
            {
                question: "Can I customize timer durations?",
                answer:
                    "Yes. Tune your focus length, short breaks, and long resets from the timer settings panel.",
            },
            {
                question: "What is the Pomodoro technique?",
                answer:
                    "It’s a time management method using focused intervals separated by breaks. FocusFlow implements it with customizable pacing.",
            },
        ],
    },
    {
        key: "data-analytics",
        title: "Data & analytics",
        hint: "Understand your momentum",
        items: [
            {
                question: "How is my data stored?",
                answer:
                    "Your data lives in encrypted databases with regular backups and industry-standard security practices.",
            },
            {
                question: "Can I export my data?",
                answer:
                    "Yes. Export focus history, streaks, and analytics as CSV or JSON right from account settings.",
            },
        ],
    },
    {
        key: "privacy-security",
        title: "Privacy & security",
        hint: "Your rituals, your data",
        items: [
            {
                question: "Is my data private?",
                answer:
                    "Absolutely. Only you can access your logs, and we never share or sell data—ever.",
            },
            {
                question: "Can I delete my account?",
                answer:
                    "Yes. Delete your account and all associated data at any time from settings. The action is instant and irreversible.",
            },
        ],
    },
    {
        key: "features",
        title: "Features & functionality",
        hint: "Make FocusFlow yours",
        items: [
            {
                question: "Can I use FocusFlow for studying?",
                answer:
                    "Absolutely. FocusFlow is designed for students, teams, and anyone building a sustainable focus habit.",
            },
            {
                question: "Does FocusFlow have a mobile app?",
                answer:
                    "Native apps are in development. For now, the web experience runs smoothly in mobile browsers.",
            },
            {
                question: "Is there a dark mode?",
                answer:
                    "Yes. Dark mode is enabled by default, and you can toggle themes in settings whenever you like.",
            },
        ],
    },
    {
        key: "community-support",
        title: "Community & support",
        hint: "Plug into the collective",
        items: [
            {
                question: "Can I contribute to FocusFlow?",
                answer:
                    "Yes. Suggest features, triage bugs, or ship PRs through our open GitHub roadmap.",
            },
            {
                question: "How can I give feedback?",
                answer:
                    "Drop a note on the Community page or email focusflow@studentproject.com—we read every message.",
            },
            {
                question: "Where can I report bugs?",
                answer:
                    "File GitHub issues or email support@focusflow.com. Include steps to reproduce so we can jump on it fast.",
            },
        ],
    },
];

const supportHighlights = [
    {
        title: "Live office hours",
        copy: "Join weekly sessions with the team for walk-throughs and workflow audits.",
        link: "mailto:focusflow@studentproject.com?subject=Office%20Hours",
        cta: "Reserve a seat",
    },
    {
        title: "Documentation library",
        copy: "Explore in-depth guides and playbooks covering rituals, analytics, and integrations.",
        link: "/resources",
        cta: "Browse guides",
    },
];

const styles = {
    page: {
        minHeight: "100vh",
        background: "linear-gradient(185deg, #040915 0%, #101a31 55%, #040915 100%)",
        color: "#ffffff",
    },
    hero: {
        position: "relative",
        padding: "6rem 2rem 4.6rem",
        overflow: "hidden",
    },
    heroGlow: {
        position: "absolute",
        inset: "-220px auto auto 50%",
        transform: "translateX(-50%)",
        width: "760px",
        height: "760px",
        background: "radial-gradient(circle at center, rgba(56, 189, 248, 0.2), transparent 68%)",
        filter: "blur(16px)",
    },
    container: {
        maxWidth: "1120px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
    },
    heroInner: {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "1.6rem",
        alignItems: "center",
    },
    heroBadge: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45rem",
        padding: "0.5rem 1rem",
        borderRadius: "9999px",
        border: "1px solid rgba(56, 189, 248, 0.45)",
        background: "rgba(15, 23, 42, 0.7)",
        color: "#38bdf8",
        fontSize: "0.85rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        fontWeight: 600,
    },
    heroTitle: {
        fontSize: "3.05rem",
        fontWeight: 800,
        letterSpacing: "-0.03em",
        background: "linear-gradient(120deg, #38bdf8, #60a5fa, #94a3ff)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        margin: 0,
    },
    heroLead: {
        maxWidth: "44rem",
        color: "#cbd5f5",
        fontSize: "1.14rem",
        lineHeight: 1.74,
    },
    searchBar: {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        maxWidth: "620px",
        width: "100%",
        background: "rgba(12, 20, 36, 0.88)",
        borderRadius: "1rem",
        border: "1px solid rgba(56, 189, 248, 0.32)",
        padding: "0.65rem 0.85rem",
        boxShadow: "0 22px 55px -32px rgba(56, 189, 248, 0.55)",
    },
    searchIcon: {
        color: "#38bdf8",
        fontSize: "1.2rem",
    },
    searchInput: {
        flex: 1,
        background: "transparent",
        border: "none",
        color: "#e2e8f0",
        fontSize: "1.02rem",
        outline: "none",
    },
    quickGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.4rem",
        marginTop: "3rem",
    },
    quickCard: {
        padding: "1.45rem",
        borderRadius: "1.1rem",
        background: "rgba(17, 26, 44, 0.78)",
        border: "1px solid rgba(129, 140, 248, 0.25)",
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
        transition: "transform 0.25s ease, border-color 0.25s ease",
        cursor: "pointer",
    },
    quickIcon: {
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "0.8rem",
        background: "rgba(56, 189, 248, 0.16)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#38bdf8",
        fontSize: "1.2rem",
    },
    quickLabel: {
        fontWeight: 600,
        fontSize: "1.05rem",
        color: "#f8fafc",
    },
    quickSummary: {
        color: "#9fb2d6",
        fontSize: "0.92rem",
        lineHeight: 1.6,
    },
    main: {
        padding: "4.6rem 2rem 4.8rem",
    },
    pillRow: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.75rem",
        justifyContent: "center",
        marginBottom: "3rem",
    },
    pillButton: (active) => ({
        padding: "0.6rem 1.25rem",
        borderRadius: "9999px",
        border: `1px solid ${active ? "rgba(56, 189, 248, 0.55)" : "rgba(148, 163, 184, 0.25)"}`,
        background: active ? "rgba(56, 189, 248, 0.2)" : "rgba(13, 20, 36, 0.75)",
        color: active ? "#e2e8f0" : "#94a3b8",
        fontWeight: active ? 600 : 500,
        fontSize: "0.94rem",
        cursor: "pointer",
        transition: "transform 0.22s ease, border-color 0.22s ease",
    }),
    sectionBlock: {
        marginBottom: "3.5rem",
    },
    sectionHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.8rem",
        marginBottom: "1.6rem",
    },
    sectionTitle: {
        fontSize: "1.65rem",
        fontWeight: 700,
        color: "#f1f5f9",
    },
    sectionHint: {
        color: "#94a3b8",
        fontSize: "0.96rem",
    },
    faqCard: {
        padding: "1.7rem 1.85rem",
        borderRadius: "1.15rem",
        background: "rgba(12, 20, 36, 0.88)",
        border: "1px solid rgba(56, 189, 248, 0.22)",
        marginBottom: "1.05rem",
        transition: "transform 0.25s ease, border-color 0.25s ease",
    },
    faqCardActive: {
        borderColor: "rgba(96, 165, 250, 0.55)",
        transform: "translateY(-4px)",
    },
    questionRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        cursor: "pointer",
    },
    questionText: {
        fontSize: "1.12rem",
        fontWeight: 600,
        color: "#e2e8f0",
    },
    answerText: {
        marginTop: "0.9rem",
        color: "#9fb2d6",
        lineHeight: 1.72,
        fontSize: "0.98rem",
    },
    resultsLabel: {
        textAlign: "center",
        color: "#94a3b8",
        marginBottom: "1.8rem",
        fontSize: "0.98rem",
    },
    supportSection: {
        marginTop: "4.2rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.4rem",
    },
    supportCard: {
        padding: "1.9rem",
        borderRadius: "1.2rem",
        background: "linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(129, 140, 248, 0.22))",
        border: "1px solid rgba(56, 189, 248, 0.26)",
        boxShadow: "0 28px 60px -34px rgba(56, 189, 248, 0.55)",
        display: "flex",
        flexDirection: "column",
        gap: "0.9rem",
    },
    supportTitle: {
        fontSize: "1.18rem",
        fontWeight: 700,
        color: "#eef6ff",
    },
    supportCopy: {
        color: "#cbdefc",
        fontSize: "0.96rem",
        lineHeight: 1.65,
    },
    supportLink: {
        alignSelf: "flex-start",
        color: "#0f172a",
        fontWeight: 600,
        padding: "0.55rem 1.2rem",
        borderRadius: "9999px",
        background: "rgba(255, 255, 255, 0.92)",
        textDecoration: "none",
        fontSize: "0.95rem",
    },
    helpBanner: {
        marginTop: "3.6rem",
        padding: "2.4rem",
        borderRadius: "1.4rem",
        background: "rgba(15, 23, 42, 0.75)",
        border: "1px solid rgba(56, 189, 248, 0.26)",
        textAlign: "center",
        lineHeight: 1.7,
        color: "#9fb2d6",
    },
    helpLink: {
        color: "#38bdf8",
        fontWeight: 600,
    },
};

const searchIndex = faqSections.flatMap((section) =>
    section.items.map((item) => ({ ...item, section: section.title, key: section.key }))
);

const filterOptions = [{ label: "All", key: "all" }, ...faqSections.map((section) => ({ label: section.title, key: section.key }))];

const FAQ = () => {
    const [openQuestion, setOpenQuestion] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");

    const handleToggle = (id) => {
        setOpenQuestion((prev) => (prev === id ? null : id));
    };

    const listToRender = searchTerm
        ? searchIndex.filter((item) => {
              const term = searchTerm.toLowerCase();
              return item.question.toLowerCase().includes(term) || item.answer.toLowerCase().includes(term);
          })
        : faqSections.filter((section) => activeFilter === "all" || section.key === activeFilter);

    return (
        <div style={styles.page}>
            <LandingNavbar />
            <section style={styles.hero}>
                <div style={styles.heroGlow} />
                <div style={styles.container}>
                    <div style={styles.heroInner}>
                        <span style={styles.heroBadge}>
                            <FaQuestionCircle /> Support center
                        </span>
                        <h1 style={styles.heroTitle}>Answers that keep your flow uninterrupted</h1>
                        <p style={styles.heroLead}>
                            Search the playbook, explore most-asked rituals, and get unstuck fast. No tickets required—just
                            signals from the FocusFlow collective.
                        </p>
                        <div style={styles.searchBar}>
                            <FaSearch style={styles.searchIcon} />
                            <input
                                style={styles.searchInput}
                                type="text"
                                placeholder="Search timer setup, exports, privacy, or anything else..."
                                value={searchTerm}
                                onChange={(event) => {
                                    setSearchTerm(event.target.value);
                                    setActiveFilter("all");
                                    setOpenQuestion(null);
                                }}
                            />
                        </div>
                        <div style={styles.quickGrid}>
                            {quickGlances.map((quick) => (
                                <div
                                    key={quick.label}
                                    className="hover-card"
                                    style={styles.quickCard}
                                    onClick={() => {
                                        setActiveFilter(quick.target);
                                        setSearchTerm("");
                                        setOpenQuestion(null);
                                        const targetEl = document.getElementById(`faq-${quick.target}`);
                                        if (targetEl) {
                                            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
                                        }
                                    }}
                                    onMouseEnter={(event) => {
                                        event.currentTarget.style.transform = "translateY(-4px)";
                                        event.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.4)";
                                    }}
                                    onMouseLeave={(event) => {
                                        event.currentTarget.style.transform = "translateY(0px)";
                                        event.currentTarget.style.borderColor = "rgba(129, 140, 248, 0.25)";
                                    }}
                                >
                                    <span style={styles.quickIcon}>{quick.icon}</span>
                                    <span style={styles.quickLabel}>{quick.label}</span>
                                    <p style={styles.quickSummary}>{quick.summary}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <main style={styles.main}>
                <div style={styles.container}>
                    {!searchTerm && (
                        <div style={styles.pillRow}>
                            {filterOptions.map((option) => (
                                <button
                                    key={option.key}
                                    style={styles.pillButton(activeFilter === option.key)}
                                    onClick={() => {
                                        setActiveFilter(option.key);
                                        setSearchTerm("");
                                        setOpenQuestion(null);
                                    }}
                                    onMouseEnter={(event) => {
                                        event.currentTarget.style.transform = "translateY(-3px)";
                                    }}
                                    onMouseLeave={(event) => {
                                        event.currentTarget.style.transform = "translateY(0px)";
                                    }}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {searchTerm ? (
                        <>
                            <p style={styles.resultsLabel}>
                                Found {listToRender.length} result{listToRender.length !== 1 ? "s" : ""} for "{searchTerm}"
                            </p>
                            {listToRender.map((faq, index) => {
                                const id = `${faq.key}-${index}`;
                                const isOpen = openQuestion === id;
                                return (
                                    <div
                                        key={id}
                                        className="hover-card"
                                        style={{
                                            ...styles.faqCard,
                                            ...(isOpen ? styles.faqCardActive : {}),
                                        }}
                                    >
                                        <div style={styles.questionRow} onClick={() => handleToggle(id)}>
                                            <span style={styles.questionText}>{faq.question}</span>
                                            {isOpen ? (
                                                <FaChevronUp style={{ color: "#38bdf8", fontSize: "1.1rem" }} />
                                            ) : (
                                                <FaChevronDown style={{ color: "#60a5fa", fontSize: "1.1rem" }} />
                                            )}
                                        </div>
                                        {isOpen && <div style={styles.answerText}>{faq.answer}</div>}
                                    </div>
                                );
                            })}
                        </>
                    ) : (
                        listToRender.map((section) => (
                            <div id={`faq-${section.key}`} key={section.key} style={styles.sectionBlock}>
                                <div style={styles.sectionHeader}>
                                    <h2 style={styles.sectionTitle}>{section.title}</h2>
                                    <span style={styles.sectionHint}>{section.hint}</span>
                                </div>
                                {section.items.map((faq, index) => {
                                    const id = `${section.key}-${index}`;
                                    const isOpen = openQuestion === id;
                                    return (
                                        <div
                                            key={id}
                                            className="hover-card"
                                            style={{
                                                ...styles.faqCard,
                                                ...(isOpen ? styles.faqCardActive : {}),
                                            }}
                                        >
                                            <div style={styles.questionRow} onClick={() => handleToggle(id)}>
                                                <span style={styles.questionText}>{faq.question}</span>
                                                {isOpen ? (
                                                    <FaChevronUp style={{ color: "#38bdf8", fontSize: "1.1rem" }} />
                                                ) : (
                                                    <FaChevronDown style={{ color: "#60a5fa", fontSize: "1.1rem" }} />
                                                )}
                                            </div>
                                            {isOpen && <div style={styles.answerText}>{faq.answer}</div>}
                                        </div>
                                    );
                                })}
                            </div>
                        ))
                    )}

                    <div style={styles.supportSection}>
                        {supportHighlights.map((support) => (
                            <div key={support.title} style={styles.supportCard}>
                                <div style={styles.supportTitle}>{support.title}</div>
                                <p style={styles.supportCopy}>{support.copy}</p>
                                <a href={support.link} style={styles.supportLink}>
                                    {support.cta}
                                </a>
                            </div>
                        ))}
                    </div>

                    <div style={styles.helpBanner}>
                        <FaHeadset style={{ color: "#38bdf8", fontSize: "1.4rem", marginRight: "0.4rem" }} />
                        Still need a hand? Chat with the crew in our <a href="/community" style={styles.helpLink}>Community hub</a> or email
                        <a href="mailto:focusflow@studentproject.com" style={{ ...styles.helpLink, marginLeft: "0.35rem" }}>
                            focusflow@studentproject.com
                        </a>
                        .
                    </div>
                </div>
            </main>
            <LandingFooter />
        </div>
    );
};

export default FAQ;
