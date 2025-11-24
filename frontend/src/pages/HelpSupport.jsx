import React, { useState } from "react";
import {
    QuestionMarkCircleIcon,
    EnvelopeIcon,
    ChatBubbleLeftRightIcon,
    BookOpenIcon,
    VideoCameraIcon,
    DocumentTextIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline";

const HelpSupport = () => {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

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
            category: "general",
        },
        {
            question: "How do I join the community?",
            answer: "You can join the community by visiting the Community page and creating an account. This will allow you to participate in discussions and share your progress.",
            category: "community",
        },
        {
            question: "Can I use the app offline?",
            answer: "Yes, most features of the app work offline. However, some features like community interactions and cloud sync require an internet connection.",
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

    const pageWrapperStyle = {
        minHeight: "100vh",
        padding: "4.5rem 1.75rem 5rem",
        background: "var(--color-white)",
        color: "var(--color-gray-900)",
    };

    const innerStyle = {
        maxWidth: "1120px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
    };

    const heroPanelStyle = {
        background: "var(--panel-bg)",
        borderRadius: "1.5rem",
        border: "1px solid var(--input-border)",
        padding: "2.75rem",
        boxShadow: "var(--shadow-lg)",
        display: "flex",
        flexDirection: "column",
        gap: "0.8rem",
    };

    const heroTitleStyle = {
        fontSize: "2.3rem",
        fontWeight: 700,
        lineHeight: 1.2,
        background: "linear-gradient(to right, #38bdf8, #818cf8)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        margin: 0,
    };

    const heroLeadStyle = {
        fontSize: "1.05rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.7,
        maxWidth: "44rem",
    };

    const searchContainerStyle = {
        marginBottom: "2rem",
    };

    const searchInputStyle = {
        width: "100%",
        padding: "0.85rem 1.15rem",
        borderRadius: "0.75rem",
        border: "1px solid var(--input-border)",
        fontSize: "1rem",
        color: "var(--color-gray-900)",
        backgroundColor: "var(--input-bg)",
        outline: "none",
    };

    const categoriesContainerStyle = {
        display: "flex",
        gap: "0.75rem",
        marginBottom: "1rem",
        flexWrap: "wrap",
    };

    const categoryButtonStyle = {
        padding: "0.65rem 1.4rem",
        fontSize: "0.95rem",
        fontWeight: 600,
        color: "var(--color-gray-600)",
        cursor: "pointer",
        borderRadius: "0.75rem",
        border: "1px solid var(--color-gray-200)",
        background: "var(--color-gray-100)",
        transition: "all 0.2s ease",
    };

    const activeCategoryButtonStyle = {
        ...categoryButtonStyle,
        background: "var(--color-primary-100)",
        color: "var(--color-primary-700)",
        border: "1px solid var(--color-primary-300)",
        boxShadow: "var(--shadow-md)",
    };

    const faqContainerStyle = {
        marginBottom: "3rem",
    };

    const faqItemStyle = {
        background: "var(--panel-bg)",
        borderRadius: "1.05rem",
        padding: "1.6rem",
        marginBottom: "1.2rem",
        border: "1px solid var(--input-border)",
        boxShadow: "var(--shadow-md)",
    };

    const questionStyle = {
        fontSize: "1.125rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "0.75rem",
    };

    const answerStyle = {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.6",
    };

    const supportOptionsContainerStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1.5rem",
        marginBottom: "3rem",
    };

    const supportCardStyle = {
        background: "var(--panel-bg)",
        borderRadius: "1.05rem",
        padding: "1.6rem",
        boxShadow: "var(--shadow-md)",
        border: "1px solid var(--input-border)",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        marginBottom: "1.2rem",
    };

    const supportCardHoverStyle = {
        transform: "translateY(-2px)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    };

    const supportIconStyle = {
        width: "2rem",
        height: "2rem",
        color: "var(--color-primary-500)",
        margin: "0 auto 1rem",
    };

    const supportTitleStyle = {
        fontSize: "1.125rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const supportDescriptionStyle = {
        fontSize: "0.9rem",
        color: "var(--color-gray-600)",
        marginBottom: "1rem",
    };

    const supportLinkStyle = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        color: "var(--color-primary-600)",
        fontSize: "0.9rem",
        fontWeight: 600,
        textDecoration: "none",
    };

    return (
        <div style={pageWrapperStyle}>
            <div style={innerStyle}>
                <section style={heroPanelStyle}>
                    <h1 style={heroTitleStyle}>Help & Support</h1>
                    <p style={heroLeadStyle}>
                        Find answers to your questions and get the support you need
                    </p>
                </section>

            <div style={searchContainerStyle}>
                <input
                    type="text"
                    placeholder="Search for help..."
                    style={searchInputStyle}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div style={categoriesContainerStyle}>
                {[
                    { key: "all", label: "All" },
                    { key: "timer", label: "Timer" },
                    { key: "settings", label: "Settings" },
                    { key: "statistics", label: "Statistics" },
                    { key: "community", label: "Community" },
                ].map((cat) => (
                    <button
                        key={cat.key}
                        style={
                            activeCategory === cat.key
                                ? activeCategoryButtonStyle
                                : categoryButtonStyle
                        }
                        onClick={() => setActiveCategory(cat.key)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <div style={faqContainerStyle}>
                {filteredFaqs.map((faq, index) => (
                    <div key={index} style={faqItemStyle}>
                        <h3 style={questionStyle}>{faq.question}</h3>
                        <p style={answerStyle}>{faq.answer}</p>
                    </div>
                ))}
            </div>

            <div style={supportOptionsContainerStyle}>
                <div
                    style={supportCardStyle}
                    onMouseEnter={(e) => {
                        Object.assign(
                            e.currentTarget.style,
                            supportCardHoverStyle
                        );
                    }}
                    onMouseLeave={(e) => {
                        Object.assign(e.currentTarget.style, supportCardStyle);
                    }}
                >
                    <EnvelopeIcon style={supportIconStyle} />
                    <h3 style={supportTitleStyle}>Email Support</h3>
                    <p style={supportDescriptionStyle}>
                        Get help from our support team via email
                    </p>
                    <a href="mailto:support@focusflow.com" style={supportLinkStyle}>
                        Contact Us{" "}
                        <ArrowRightIcon
                            style={{ width: "1rem", height: "1rem" }}
                        />
                    </a>
                </div>

                <div
                    style={supportCardStyle}
                    onMouseEnter={(e) => {
                        Object.assign(
                            e.currentTarget.style,
                            supportCardHoverStyle
                        );
                    }}
                    onMouseLeave={(e) => {
                        Object.assign(e.currentTarget.style, supportCardStyle);
                    }}
                >
                    <ChatBubbleLeftRightIcon style={supportIconStyle} />
                    <h3 style={supportTitleStyle}>Live Chat</h3>
                    <p style={supportDescriptionStyle}>
                        Chat with our support team in real-time
                    </p>
                    <a href="mailto:support@focusflow.com?subject=Live Chat Request" style={supportLinkStyle}>
                        Start Chat{" "}
                        <ArrowRightIcon
                            style={{ width: "1rem", height: "1rem" }}
                        />
                    </a>
                </div>

                <div
                    style={supportCardStyle}
                    onMouseEnter={(e) => {
                        Object.assign(
                            e.currentTarget.style,
                            supportCardHoverStyle
                        );
                    }}
                    onMouseLeave={(e) => {
                        Object.assign(e.currentTarget.style, supportCardStyle);
                    }}
                >
                    <BookOpenIcon style={supportIconStyle} />
                    <h3 style={supportTitleStyle}>Documentation</h3>
                    <p style={supportDescriptionStyle}>
                        Browse our detailed user guides and documentation
                    </p>
                    <a href="/dashboard/guides" style={supportLinkStyle}>
                        View Docs{" "}
                        <ArrowRightIcon
                            style={{ width: "1rem", height: "1rem" }}
                        />
                    </a>
                </div>

                <div
                    style={supportCardStyle}
                    onMouseEnter={(e) => {
                        Object.assign(
                            e.currentTarget.style,
                            supportCardHoverStyle
                        );
                    }}
                    onMouseLeave={(e) => {
                        Object.assign(e.currentTarget.style, supportCardStyle);
                    }}
                >
                    <VideoCameraIcon style={supportIconStyle} />
                    <h3 style={supportTitleStyle}>Video Tutorials</h3>
                    <p style={supportDescriptionStyle}>
                        Watch video guides and tutorials to increase focus
                    </p>
                    <a href="/resources" style={supportLinkStyle}>
                        Watch Videos{" "}
                        <ArrowRightIcon
                            style={{ width: "1rem", height: "1rem" }}
                        />
                    </a>
                </div>
            </div>
        </div>
        </div>
    );
};

export default HelpSupport;
