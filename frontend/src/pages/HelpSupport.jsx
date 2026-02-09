import React, { useState } from "react";
import {
    QuestionMarkCircleIcon,
    EnvelopeIcon,
    ChatBubbleLeftRightIcon,
    BookOpenIcon,
    VideoCameraIcon,
    ArrowRightIcon,
    MagnifyingGlassIcon,
    ChevronDownIcon,
    SparklesIcon,
    LifebuoyIcon,
} from "@heroicons/react/24/outline";
import useResponsive from "../hooks/useResponsive";

const HelpSupport = () => {
    const { isMobile, isTablet } = useResponsive();
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [isWrapped, setIsWrapped] = useState(false);
    const tabBarRef = React.useRef(null);
    const isThemeDark = document.documentElement.classList.contains('dark');

    React.useEffect(() => {
        if (!tabBarRef.current) return;
        const observer = new ResizeObserver(() => {
            const container = tabBarRef.current;
            if (!container) return;
            const children = Array.from(container.children);
            if (children.length > 1) {
                const firstRowTop = children[0].offsetTop;
                const lastRowTop = children[children.length - 1].offsetTop;
                const wrapped = lastRowTop > firstRowTop;
                setIsWrapped(prev => (prev !== wrapped ? wrapped : prev));
            }
        });
        observer.observe(tabBarRef.current);
        return () => observer.disconnect();
    }, []);

    const faqs = [
        {
            question: "How do I start using the Focus Timer?",
            answer: "To start using the Focus Timer, simply click the 'Start' button on the timer page. You can customize your focus and break durations in the Settings page.",
            category: "timer",
        },
        {
            question: "Can I customize my notification settings?",
            answer: "Yes, you can customize your notification settings in the Settings page. You can choose to receive notifications for session completion, breaks, and achievements.",
            category: "settings",
        },
        {
            question: "How do I track my productivity?",
            answer: "Your productivity is automatically tracked in the Statistics page. You can view your focus time, completed sessions, and productivity trends over time.",
            category: "statistics",
        },
        {
            question: "What is the Pomodoro Technique?",
            answer: "The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.",
            category: "technique",
        },
        {
            question: "How do I join the community?",
            answer: "You can join the community by visiting the Community page and joining or creating a workspace. This will allow you to participate in discussions and share your focus sessions.",
            category: "community",
        },
        {
            question: "Can I use the app offline?",
            answer: "No, unfortunately the app requires an internet connection to function.",
            category: "general",
        },
    ];

    const filteredFaqs = faqs.filter((faq) => {
        const matchesCategory =
            activeCategory === "all" || faq.category === activeCategory;
        const matchesSearch =
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const styles = {
        pageWrapper: {
            minHeight: "100vh",
            padding: isMobile ? "1.5rem 1rem 5rem" : "6rem 2rem 5rem",
            background: "var(--color-white)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        container: {
            width: "100%",
            maxWidth: "1100px",
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "1.5rem" : "2.5rem",
            background: "var(--panel-bg)",
            padding: isMobile ? "1.5rem" : "4rem",
            borderRadius: isMobile ? "1.5rem" : "3rem",
            border: "1px solid var(--input-border)",
            boxShadow: "var(--shadow-lg)",
            position: "relative",
            overflow: "hidden",
        },
        pageHeader: {
            textAlign: "left",
            width: "100%",
            position: "relative",
            padding: "2rem 0",
        },
        title: {
            fontSize: isMobile ? "1.75rem" : "2.5rem",
            fontWeight: 800,
            color: "var(--color-gray-900)",
            marginBottom: "0.5rem",
            letterSpacing: "-1px",
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "0.5rem" : "0.8rem",
        },
        subtitle: {
            fontSize: "1.1rem",
            color: "var(--color-gray-600)",
            maxWidth: "600px",
            lineHeight: 1.6,
        },
        searchCard: {
            background: "var(--input-bg)",
            borderRadius: "1.5rem",
            border: "1px solid var(--input-border)",
            padding: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            boxShadow: "var(--shadow-md)",
            transition: "all 0.3s ease",
            marginBottom: "1rem",
        },
        searchInput: {
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: "1.1rem",
            color: "var(--color-gray-900)",
            fontWeight: 500,
        },
        tabBar: {
            display: "flex",
            background: isWrapped ? "transparent" : "var(--color-gray-100)",
            padding: "0.5rem",
            borderRadius: "1.25rem",
            gap: "0.5rem",
            alignSelf: "center",
            border: isWrapped ? "1px solid transparent" : "1px solid var(--input-border)",
            marginBottom: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
        },
        tab: (isActive) => ({
            padding: "0.6rem 1.4rem",
            borderRadius: "0.85rem",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
            background: isActive
                ? (isWrapped ? (isThemeDark ? "rgba(14, 165, 233, 0.2)" : "var(--color-primary-50)") : "var(--color-white)")
                : (isWrapped ? (isThemeDark ? "rgba(255, 255, 255, 0.05)" : "var(--color-gray-50)") : "transparent"),
            color: isActive ? (isThemeDark ? "#38bdf8" : "#0ea5e9") : "var(--color-gray-500)",
            boxShadow: isActive ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
            border: isWrapped ? (isActive ? "1.5px solid #0ea5e9" : "1px solid var(--input-border)") : (isActive ? "1px solid var(--input-border)" : "1px solid transparent"),
        }),
        faqGrid: {
            display: "grid",
            gap: "1rem",
        },
        faqItem: (isExpanded) => ({
            background: "var(--input-bg)",
            borderRadius: "1.25rem",
            border: "1px solid var(--input-border)",
            padding: "1.5rem",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: isExpanded ? "var(--shadow-md)" : "none",
            overflow: "hidden",
        }),
        faqQuestionRow: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
        },
        faqQuestionText: {
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--color-gray-900)",
        },
        faqAnswer: (isExpanded) => ({
            marginTop: "1rem",
            color: "var(--color-gray-600)",
            lineHeight: 1.7,
            maxHeight: isExpanded ? "200px" : "0",
            opacity: isExpanded ? 1 : 0,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            fontSize: "1rem",
        }),
        supportGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem",
            marginTop: "2rem",
        },
        supportCard: {
            background: "var(--input-bg)",
            borderRadius: "1.5rem",
            border: "1px solid var(--input-border)",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "1rem",
            transition: "all 0.3s ease",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            textDecoration: "none",
        },
        supportCardIcon: {
            width: "2.5rem",
            height: "2.5rem",
            color: "#0ea5e9",
            background: "rgba(14, 165, 233, 0.1)",
            padding: "0.6rem",
            borderRadius: "0.85rem",
        },
        supportCardTitle: {
            fontSize: "1.2rem",
            fontWeight: 800,
            color: "var(--color-gray-900)",
        },
        supportCardDesc: {
            fontSize: "1rem",
            color: "var(--color-gray-600)",
            lineHeight: 1.7,
        },
        glassAccent: {
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, transparent 70%)",
            pointerEvents: "none",
        }
    };

    const categories = [
        { key: "all", label: "All Topics" },
        { key: "general", label: "General" },
        { key: "timer", label: "Focus Timer" },
        { key: "settings", label: "Settings" },
        { key: "statistics", label: "Statistics" },
        { key: "technique", label: "Techniques" },
        { key: "community", label: "Community" },
    ];

    const supportOptions = [
        {
            icon: EnvelopeIcon,
            title: "Email Support",
            desc: "Response within 24 hours for all technical inquiries.",
            href: "mailto:support@focusflow.com",
            label: "Contact Email"
        },
        {
            icon: ChatBubbleLeftRightIcon,
            title: "Live Help",
            desc: "Real-time support via our specialized community channels.",
            href: "mailto:support@focusflow.com?subject=Live Chat Request",
            label: "Start Chat"
        },
        {
            icon: BookOpenIcon,
            title: "Guides",
            desc: "In-depth tutorials on mastering your productivity setup.",
            href: "/dashboard/guides",
            label: "Explore Docs"
        },
        {
            icon: VideoCameraIcon,
            title: "Video Tutorials",
            desc: "Watch step-by-step videos to optimize your daily focus.",
            href: "/resources",
            label: "Watch Now"
        }
    ];

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.container}>
                <header style={styles.pageHeader}>
                    <div style={{ position: "absolute", top: "-40px", right: "-40px", opacity: 0.08, pointerEvents: "none", transform: "rotate(15deg)" }}>
                        <LifebuoyIcon style={{ width: "320px" }} />
                    </div>
                    <h1 style={styles.title}>
                        <LifebuoyIcon style={{ width: "2.5rem", color: "#0ea5e9" }} />
                        Help & Support
                    </h1>
                    <p style={styles.subtitle}>
                        Need a hand with FocusFlow? Explore our knowledge base or reach out to our dedicated support team.
                    </p>
                </header>

                <div
                    style={styles.searchCard}
                    onFocusCapture={(e) => (e.currentTarget.style.borderColor = "#0ea5e9")}
                    onBlurCapture={(e) => (e.currentTarget.style.borderColor = "var(--input-border)")}
                >
                    <MagnifyingGlassIcon style={{ width: "1.5rem", color: "var(--color-gray-400)" }} />
                    <input
                        type="text"
                        placeholder="Search for quick answers..."
                        style={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <div
                            style={{ color: "var(--color-gray-400)", cursor: "pointer", fontSize: "0.9rem", fontWeight: 700 }}
                            onClick={() => setSearchQuery("")}
                        >
                            CLEAR
                        </div>
                    )}
                </div>

                <nav ref={tabBarRef} style={styles.tabBar}>
                    {categories.map((cat) => (
                        <div
                            key={cat.key}
                            style={styles.tab(activeCategory === cat.key)}
                            onClick={() => setActiveCategory(cat.key)}
                        >
                            {cat.label}
                        </div>
                    ))}
                </nav>

                <div style={styles.faqGrid}>
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, index) => {
                            const isExpanded = expandedFaq === index;
                            return (
                                <div
                                    key={index}
                                    style={styles.faqItem(isExpanded)}
                                    onClick={() => setExpandedFaq(isExpanded ? null : index)}
                                    onMouseEnter={(e) => !isExpanded && (e.currentTarget.style.borderColor = "#0ea5e9")}
                                    onMouseLeave={(e) => !isExpanded && (e.currentTarget.style.borderColor = "var(--input-border)")}
                                >
                                    <div style={styles.faqQuestionRow}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                            <SparklesIcon style={{ width: "1.2rem", color: "#0ea5e9", opacity: 0.6 }} />
                                            <h3 style={styles.faqQuestionText}>{faq.question}</h3>
                                        </div>
                                        <ChevronDownIcon
                                            style={{
                                                width: "1.2rem",
                                                color: "var(--color-gray-400)",
                                                transform: isExpanded ? "rotate(180deg)" : "none",
                                                transition: "transform 0.3s ease"
                                            }}
                                        />
                                    </div>
                                    <div style={styles.faqAnswer(isExpanded)}>
                                        {faq.answer}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div style={{ textAlign: "center", padding: "3rem", color: "var(--color-gray-500)" }}>
                            <QuestionMarkCircleIcon style={{ width: "3rem", margin: "0 auto 1rem", opacity: 0.3 }} />
                            <p>No results found for "{searchQuery}". Try a different term.</p>
                        </div>
                    )}
                </div>

                <div style={{ marginTop: "2rem" }}>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem" }}>Still need help?</h2>
                    <div style={styles.supportGrid}>
                        {supportOptions.map((opt, idx) => (
                            <a
                                key={idx}
                                href={opt.href}
                                style={styles.supportCard}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.borderColor = '#0ea5e9';
                                    e.currentTarget.style.boxShadow = '0 15px 30px -10px rgba(14, 165, 233, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = 'var(--input-border)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={styles.glassAccent} />
                                <opt.icon style={styles.supportCardIcon} />
                                <h3 style={styles.supportCardTitle}>{opt.title}</h3>
                                <p style={styles.supportCardDesc}>{opt.desc}</p>
                                <div style={{
                                    marginTop: "auto",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    color: "#0ea5e9",
                                    fontWeight: 700,
                                    fontSize: "0.9rem"
                                }}>
                                    {opt.label}
                                    <ArrowRightIcon style={{ width: "1rem" }} />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default HelpSupport;
