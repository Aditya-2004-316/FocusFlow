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
import type { CSSProperties } from "react";

interface FAQ {
    question: string;
    answer: string;
    category: string;
}

const HelpSupport = () => {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const faqs: FAQ[] = [
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

    const containerStyle: CSSProperties = {
        maxWidth: "64rem",
        margin: "2rem auto",
        padding: "0 1rem",
    };

    const headerStyle: CSSProperties = {
        marginBottom: "2rem",
    };

    const titleStyle: CSSProperties = {
        fontSize: "1.875rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const descriptionStyle: CSSProperties = {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
    };

    const searchContainerStyle: CSSProperties = {
        marginBottom: "2rem",
    };

    const searchInputStyle: CSSProperties = {
        width: "100%",
        padding: "0.75rem 1rem",
        borderRadius: "0.5rem",
        border: "1px solid var(--color-gray-300)",
        fontSize: "1rem",
        color: "var(--color-gray-900)",
        backgroundColor: "var(--color-white)",
    };

    const categoriesContainerStyle: CSSProperties = {
        display: "flex",
        gap: "1rem",
        marginBottom: "2rem",
        flexWrap: "wrap",
    };

    const categoryButtonStyle: CSSProperties = {
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        backgroundColor: "var(--color-gray-100)",
        color: "var(--color-gray-700)",
    };

    const activeCategoryButtonStyle: CSSProperties = {
        ...categoryButtonStyle,
        backgroundColor: "var(--color-primary-600)",
        color: "var(--color-white)",
    };

    const faqContainerStyle: CSSProperties = {
        marginBottom: "3rem",
    };

    const faqItemStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        marginBottom: "1rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    };

    const questionStyle: CSSProperties = {
        fontSize: "1.125rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "0.75rem",
    };

    const answerStyle: CSSProperties = {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.5",
    };

    const supportOptionsContainerStyle: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1.5rem",
        marginBottom: "3rem",
    };

    const supportCardStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
    };

    const supportCardHoverStyle: CSSProperties = {
        transform: "translateY(-2px)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    };

    const supportIconStyle: CSSProperties = {
        width: "2rem",
        height: "2rem",
        color: "var(--color-primary-600)",
        margin: "0 auto 1rem",
    };

    const supportTitleStyle: CSSProperties = {
        fontSize: "1.125rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const supportDescriptionStyle: CSSProperties = {
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
        marginBottom: "1rem",
    };

    const supportLinkStyle: CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        color: "var(--color-primary-600)",
        fontSize: "0.875rem",
        fontWeight: 500,
        textDecoration: "none",
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Help & Support</h1>
                <p style={descriptionStyle}>
                    Find answers to your questions and get the support you need
                </p>
            </div>

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
                <button
                    style={
                        activeCategory === "all"
                            ? activeCategoryButtonStyle
                            : categoryButtonStyle
                    }
                    onClick={() => setActiveCategory("all")}
                >
                    All
                </button>
                <button
                    style={
                        activeCategory === "timer"
                            ? activeCategoryButtonStyle
                            : categoryButtonStyle
                    }
                    onClick={() => setActiveCategory("timer")}
                >
                    Timer
                </button>
                <button
                    style={
                        activeCategory === "settings"
                            ? activeCategoryButtonStyle
                            : categoryButtonStyle
                    }
                    onClick={() => setActiveCategory("settings")}
                >
                    Settings
                </button>
                <button
                    style={
                        activeCategory === "statistics"
                            ? activeCategoryButtonStyle
                            : categoryButtonStyle
                    }
                    onClick={() => setActiveCategory("statistics")}
                >
                    Statistics
                </button>
                <button
                    style={
                        activeCategory === "community"
                            ? activeCategoryButtonStyle
                            : categoryButtonStyle
                    }
                    onClick={() => setActiveCategory("community")}
                >
                    Community
                </button>
            </div>

            <div style={faqContainerStyle}>
                {filteredFaqs.map((faq, index) => (
                    <div key={index} style={faqItemStyle}>
                        <div style={questionStyle}>{faq.question}</div>
                        <div style={answerStyle}>{faq.answer}</div>
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
                    <div style={supportTitleStyle}>Email Support</div>
                    <div style={supportDescriptionStyle}>
                        Get help from our support team via email
                    </div>
                    <a
                        href="mailto:support@focusflow.com"
                        style={supportLinkStyle}
                    >
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
                    <div style={supportTitleStyle}>Live Chat</div>
                    <div style={supportDescriptionStyle}>
                        Chat with our support team in real-time
                    </div>
                    <a href="#" style={supportLinkStyle}>
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
                    <div style={supportTitleStyle}>Documentation</div>
                    <div style={supportDescriptionStyle}>
                        Browse our detailed user guides and documentation
                    </div>
                    <a href="#" style={supportLinkStyle}>
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
                    <div style={supportTitleStyle}>Video Tutorials</div>
                    <div style={supportDescriptionStyle}>
                        Watch video guides and tutorials
                    </div>
                    <a href="#" style={supportLinkStyle}>
                        Watch Videos{" "}
                        <ArrowRightIcon
                            style={{ width: "1rem", height: "1rem" }}
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HelpSupport;
