import React, { useState } from "react";
import {
    QuestionMarkCircleIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const containerStyle: CSSProperties = {
        minWidth: "64rem",
        margin: "2rem auto",
        padding: "0 1rem",
    };

    const headerStyle: CSSProperties = {
        marginBottom: "3rem",
        textAlign: "center",
    };

    const titleStyle: CSSProperties = {
        fontSize: "2.25rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "1rem",
    };

    const subtitleStyle: CSSProperties = {
        fontSize: "1.125rem",
        color: "var(--color-gray-600)",
        maxWidth: "36rem",
        margin: "0 auto",
    };

    const faqContainerStyle: CSSProperties = {
        maxWidth: "48rem",
        margin: "0 auto",
    };

    const faqItemStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        marginBottom: "1rem",
        boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    };

    const questionButtonStyle: CSSProperties = {
        width: "100%",
        padding: "1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "none",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
    };

    const questionTextStyle: CSSProperties = {
        fontSize: "1.125rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
    };

    const answerStyle: CSSProperties = {
        padding: "0 1.5rem 1.5rem",
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.5",
    };

    const faqs = [
        {
            question: "What is FocusFlow?",
            answer: "FocusFlow is a productivity application designed to help you stay focused and track your work sessions. It combines the Pomodoro technique with advanced analytics and community features to help you achieve your productivity goals.",
        },
        {
            question: "How does the focus timer work?",
            answer: "The focus timer uses the Pomodoro technique, which involves working for a set period (typically 25 minutes) followed by a short break. You can customize these intervals in the settings. The timer will automatically track your sessions and provide insights into your productivity patterns.",
        },
        {
            question: "Is FocusFlow free to use?",
            answer: "Yes, FocusFlow offers a free plan with basic features. We also have Pro and Enterprise plans with additional features like advanced analytics, custom themes, and team collaboration tools. Check our Pricing page for more details.",
        },
        {
            question: "Can I use FocusFlow on multiple devices?",
            answer: "Yes, FocusFlow syncs across all your devices. Simply log in to your account on any device to access your data, settings, and progress.",
        },
        {
            question: "How do I track my productivity?",
            answer: "FocusFlow automatically tracks your focus sessions, breaks, and productivity metrics. You can view detailed statistics and insights in the Statistics page, including daily, weekly, and monthly reports.",
        },
        {
            question: "What are the system requirements?",
            answer: "FocusFlow is a web-based application that works on any modern browser. For the best experience, we recommend using the latest version of Chrome, Firefox, Safari, or Edge.",
        },
        {
            question: "How can I get support?",
            answer: "We offer multiple support channels: email support, live chat, and a comprehensive help center. Pro and Enterprise users also get priority support. Visit our Contact page for more information.",
        },
        {
            question: "Can I export my data?",
            answer: "Yes, you can export your productivity data in various formats (CSV, JSON) for further analysis. This feature is available in the Pro and Enterprise plans.",
        },
        {
            question: "How do I cancel my subscription?",
            answer: "You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.",
        },
        {
            question: "Is my data secure?",
            answer: "Yes, we take data security seriously. All data is encrypted in transit and at rest. We regularly perform security audits and comply with industry standards for data protection.",
        },
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Frequently Asked Questions</h1>
                <p style={subtitleStyle}>
                    Find answers to common questions about FocusFlow. Can't find
                    what you're looking for? Contact our support team.
                </p>
            </div>

            <div style={faqContainerStyle}>
                {faqs.map((faq, index) => (
                    <div key={index} style={faqItemStyle}>
                        <button
                            style={questionButtonStyle}
                            onClick={() => toggleFAQ(index)}
                        >
                            <span style={questionTextStyle}>
                                <QuestionMarkCircleIcon
                                    style={{
                                        width: "1.5rem",
                                        height: "1.5rem",
                                        color: "var(--color-primary-600)",
                                    }}
                                />
                                {faq.question}
                            </span>
                            {openIndex === index ? (
                                <ChevronUpIcon
                                    style={{
                                        width: "1.5rem",
                                        height: "1.5rem",
                                        color: "var(--color-gray-500)",
                                    }}
                                />
                            ) : (
                                <ChevronDownIcon
                                    style={{
                                        width: "1.5rem",
                                        height: "1.5rem",
                                        color: "var(--color-gray-500)",
                                    }}
                                />
                            )}
                        </button>
                        {openIndex === index && (
                            <div style={answerStyle}>{faq.answer}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
