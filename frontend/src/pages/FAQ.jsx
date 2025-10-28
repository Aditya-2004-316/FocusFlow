import React, { useState } from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "../styles/CardHover.css";

const faqCategories = {
    "Getting Started": [
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
            answer: "No account is required to use the basic features. However, creating an account lets you save your progress and access your data from any device.",
        },
    ],
    "Using the Timer": [
        {
            question: "How do I use the timer?",
            answer: "Go to the dashboard, set your session, and start focusing!",
        },
        {
            question: "Can I customize timer durations?",
            answer: "Yes! You can customize your focus session length, short break duration, and long break duration in the settings.",
        },
        {
            question: "What is the Pomodoro technique?",
            answer: "The Pomodoro Technique is a time management method that uses a timer to break work into intervals (traditionally 25 minutes) separated by short breaks. FocusFlow implements this technique with customizable intervals.",
        },
    ],
    "Data & Analytics": [
        {
            question: "How is my data stored?",
            answer: "Your data is securely stored in encrypted databases with regular backups. We use industry-standard security practices to protect your information.",
        },
        {
            question: "Can I export my data?",
            answer: "Yes! You can export your focus session history, statistics, and analytics in CSV or JSON format from your account settings.",
        },
    ],
    "Privacy & Security": [
        {
            question: "Is my data private?",
            answer: "Yes, your data is stored securely and is only accessible to you. This project does not share your data with anyone.",
        },
        {
            question: "Can I delete my account?",
            answer: "Yes, you can permanently delete your account and all associated data at any time from your account settings. This action is irreversible.",
        },
    ],
    "Features & Functionality": [
        {
            question: "Can I use FocusFlow for studying?",
            answer: "Absolutely! FocusFlow is designed for students and anyone who wants to improve their focus and productivity.",
        },
        {
            question: "Does FocusFlow have a mobile app?",
            answer: "Mobile apps for iOS and Android are currently in development. You can use the web version on mobile browsers in the meantime.",
        },
        {
            question: "Is there a dark mode?",
            answer: "Yes! FocusFlow has a beautiful dark mode that's enabled by default. You can toggle between light and dark themes in your settings.",
        },
    ],
    "Community & Support": [
        {
            question: "Can I contribute to FocusFlow?",
            answer: "Yes! This is an open student project. You can suggest features, report bugs, or contribute code on our GitHub page.",
        },
        {
            question: "How can I give feedback?",
            answer: "We welcome your feedback! Visit the Community page or email us at focusflow@studentproject.com.",
        },
        {
            question: "Where can I report bugs?",
            answer: "You can report bugs on our GitHub Issues page or email us at support@focusflow.com. Please include as much detail as possible.",
        },
    ],
};

// Flatten for backward compatibility
const faqs = Object.values(faqCategories).flat();

const styles = {
    page: {
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0b1120 0%, #111c33 55%, #0b1120 100%)",
        color: "#ffffff",
    },
    container: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 1.5rem",
    },
    hero: {
        padding: "6rem 1.5rem 4rem",
        textAlign: "center",
    },
    heroTitle: {
        fontSize: "3.1rem",
        fontWeight: 800,
        letterSpacing: "-0.03em",
        marginBottom: "1rem",
    },
    heroGradient: {
        background: "linear-gradient(120deg, #38bdf8, #60a5fa, #94a3ff)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
    },
    heroLead: {
        fontSize: "1.18rem",
        lineHeight: 1.75,
        color: "#cbd5f5",
        maxWidth: "40rem",
        margin: "0 auto",
    },
    heroStats: {
        marginTop: "3.5rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "1.5rem",
        justifyContent: "center",
    },
    heroStat: {
        minWidth: "220px",
        padding: "1.4rem 1.7rem",
        borderRadius: "1.25rem",
        background: "rgba(30, 41, 59, 0.55)",
        border: "1px solid rgba(148, 163, 184, 0.2)",
        boxShadow: "0 18px 50px -32px rgba(56, 189, 248, 0.65)",
    },
    heroStatValue: {
        fontSize: "1.9rem",
        fontWeight: 700,
        color: "#38bdf8",
        marginBottom: "0.25rem",
    },
    heroStatLabel: {
        color: "#94a3b8",
        fontSize: "0.95rem",
        lineHeight: 1.6,
    },
    searchBar: {
        maxWidth: "620px",
        margin: "3rem auto 0",
        position: "relative",
    },
    searchInput: {
        width: "100%",
        padding: "1rem 1.1rem",
        borderRadius: "0.9rem",
        border: "1px solid rgba(148, 163, 184, 0.25)",
        background: "rgba(15, 23, 42, 0.75)",
        color: "#e2e8f0",
        fontSize: "1rem",
        outline: "none",
        boxShadow: "0 15px 45px -30px rgba(56, 189, 248, 0.6)",
    },
    content: {
        marginTop: "-2.5rem",
        paddingBottom: "5rem",
    },
    filtersRow: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.75rem",
        justifyContent: "center",
        marginBottom: "2.5rem",
    },
    filterButton: (active) => ({
        padding: "0.55rem 1.15rem",
        borderRadius: "9999px",
        border: `1px solid ${active ? "rgba(56, 189, 248, 0.55)" : "rgba(148, 163, 184, 0.25)"}`,
        background: active ? "rgba(56, 189, 248, 0.18)" : "rgba(15, 23, 42, 0.7)",
        color: active ? "#e2e8f0" : "#94a3b8",
        fontWeight: active ? 600 : 500,
        fontSize: "0.92rem",
        cursor: "pointer",
        transition: "transform 0.2s ease, border-color 0.2s ease",
    }),
    sectionBlock: {
        marginBottom: "3.75rem",
    },
    sectionHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1.5rem",
        flexWrap: "wrap",
        gap: "0.75rem",
    },
    sectionTitle: {
        fontSize: "1.6rem",
        fontWeight: 700,
        color: "#e0f2fe",
    },
    sectionHint: {
        color: "#94a3b8",
        fontSize: "0.95rem",
    },
    faqCard: {
        background: "rgba(15, 23, 42, 0.75)",
        borderRadius: "1.1rem",
        border: "1px solid rgba(56, 189, 248, 0.22)",
        padding: "1.6rem 1.75rem",
        marginBottom: "1.2rem",
        transition: "transform 0.25s ease, border-color 0.25s ease",
    },
    faqCardActive: {
        borderColor: "rgba(96, 165, 250, 0.6)",
        transform: "translateY(-4px)",
    },
    questionRow: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
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
        color: "#94a3b8",
        lineHeight: 1.7,
        fontSize: "1rem",
    },
    resultsLabel: {
        textAlign: "center",
        color: "#94a3b8",
        marginBottom: "1.75rem",
    },
    supportCard: {
        marginTop: "3.25rem",
        padding: "1.75rem",
        borderRadius: "1rem",
        textAlign: "center",
        background: "rgba(15, 23, 42, 0.75)",
        border: "1px solid rgba(56, 189, 248, 0.25)",
        color: "#94a3b8",
        lineHeight: 1.7,
    },
    link: {
        color: "#38bdf8",
        fontWeight: 600,
        textDecoration: "underline",
    },
};

const heroStats = [
    {
        value: "180+",
        label: "Daily questions resolved",
    },
    {
        value: "2m",
        label: "Average response time",
    },
    {
        value: "4.9/5",
        label: "Support satisfaction score",
    },
];

const FAQ = () => {
    const [openIdx, setOpenIdx] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredFaqs = faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderFaqCard = (faq, idx) => {
        const isActive = openIdx === idx;
        return (
            <div
                key={idx}
                className="hover-card"
                style={{
                    ...styles.faqCard,
                    ...(isActive ? styles.faqCardActive : {}),
                }}
            >
                <div
                    style={styles.questionRow}
                    onClick={() => setOpenIdx(isActive ? null : idx)}
                >
                    <span style={styles.questionText}>{faq.question}</span>
                    {isActive ? (
                        <FaChevronUp style={{ color: "#38bdf8", fontSize: "1.15rem" }} />
                    ) : (
                        <FaChevronDown style={{ color: "#60a5fa", fontSize: "1.15rem" }} />
                    )}
                </div>
                {isActive && <div style={styles.answerText}>{faq.answer}</div>}
            </div>
        );
    };

    return (
        <div style={styles.page}>
            <LandingNavbar />
            <section style={styles.hero}>
                <div style={styles.container}>
                    <h1 style={styles.heroTitle}>
                        Your FocusFlow <span style={styles.heroGradient}>knowledge base</span>
                    </h1>
                    <p style={styles.heroLead}>
                        Clarity in minutes—not support tickets. Browse answers, learn best practices, and tap into the rituals that keep teams on track.
                    </p>
                    <div style={styles.heroStats}>
                        {heroStats.map((stat) => (
                            <div key={stat.label} style={styles.heroStat}>
                                <div style={styles.heroStatValue}>{stat.value}</div>
                                <div style={styles.heroStatLabel}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                    <div style={styles.searchBar}>
                        <input
                            type="text"
                            placeholder="Search keywords like timer, export, or community..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                </div>
            </section>

            <main style={styles.content}>
                <div style={{ ...styles.container }}>
                    <div style={styles.filtersRow}>
                        {["All", ...Object.keys(faqCategories)].map((category) => (
                            <button
                                key={category}
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setOpenIdx(null);
                                }}
                                style={styles.filterButton(selectedCategory === category)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0px)";
                                }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {searchTerm ? (
                        <>
                            <p style={styles.resultsLabel}>
                                Found {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""} for "{searchTerm}"
                            </p>
                            {filteredFaqs.map((faq, idx) => renderFaqCard(faq, idx))}
                        </>
                    ) : selectedCategory === "All" ? (
                        Object.entries(faqCategories).map(([category, questions]) => (
                            <div key={category} style={styles.sectionBlock}>
                                <div style={styles.sectionHeader}>
                                    <div style={styles.sectionTitle}>{category}</div>
                                    <div style={styles.sectionHint}>{questions.length} questions</div>
                                </div>
                                {questions.map((faq) => {
                                    const idx = faqs.findIndex((item) => item.question === faq.question);
                                    return renderFaqCard(faq, idx);
                                })}
                            </div>
                        ))
                    ) : (
                        <div style={styles.sectionBlock}>
                            <div style={styles.sectionHeader}>
                                <div style={styles.sectionTitle}>{selectedCategory}</div>
                                <div style={styles.sectionHint}>{faqCategories[selectedCategory].length} questions</div>
                            </div>
                            {faqCategories[selectedCategory].map((faq) => {
                                const idx = faqs.findIndex((item) => item.question === faq.question);
                                return renderFaqCard(faq, idx);
                            })}
                        </div>
                    )}

                    <div style={styles.supportCard}>
                        Can't find your question? {" "}
                        <a href="/community" style={styles.link}>
                            Visit the Community page
                        </a>{" "}
                        or email us at {" "}
                        <a href="mailto:focusflow@studentproject.com" style={styles.link}>
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
