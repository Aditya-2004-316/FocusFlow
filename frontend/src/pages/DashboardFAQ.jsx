import React, { useState } from "react";
import {
    FaChevronDown,
    FaChevronUp,
    FaQuestionCircle,
    FaArrowRight,
} from "react-icons/fa";

const faqs = [
    {
        question: "What is FocusFlow?",
        answer: "FocusFlow is a student project to help you manage your time and stay productive.",
    },
    {
        question: "Is FocusFlow free?",
        answer: "Yes! All features are free to use.",
    },
    {
        question: "How do I use the timer?",
        answer: "Go to the dashboard, set your session, and start focusing!",
    },
    {
        question: "Can I use FocusFlow for studying?",
        answer: "Absolutely! FocusFlow is designed for students and anyone who wants to improve their focus and productivity. Use the timer for study sessions, log distractions, and review your stats to see your progress.",
    },
    {
        question: "Do I need to create an account?",
        answer: "No account is required to use the basic features. However, creating an account lets you save your progress and access your data from any device.",
    },
    {
        question: "How do I log a distraction?",
        answer: "On the dashboard, click 'Log Distraction' and enter what interrupted your focus. This helps you identify patterns and improve over time.",
    },
    {
        question: "Is my data private?",
        answer: "Yes, your data is stored securely and is only accessible to you. This project does not share your data with anyone.",
    },
    {
        question: "Can I contribute to FocusFlow?",
        answer: "Yes! This is an open student project. You can suggest features, report bugs, or contribute code on our GitHub page.",
    },
    {
        question: "Who built FocusFlow?",
        answer: "FocusFlow was created by students as a productivity tool for other students. Check the About page for more info!",
    },
    {
        question: "How can I give feedback?",
        answer: "We welcome your feedback! Visit the Community page or email us at focusflow@studentproject.com.",
    },
];

const pageBackgroundStyle = {
    minHeight: "100vh",
    background: "var(--color-gray-50)",
};

const containerStyle = {
    maxWidth: "76rem",
    margin: "0 auto",
    padding: "2rem",
};

const headerStyle = {
    background:
        "linear-gradient(to right, var(--color-primary-500), var(--color-cyan-400))",
    borderRadius: "1rem",
    padding: "2rem",
    marginBottom: "2rem",
    color: "var(--color-white)",
    boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
};

const faqsContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
};

const titleStyle = {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "0.5rem",
};

const subtitleStyle = {
    fontSize: "1.125rem",
    opacity: 0.9,
};


const faqCardStyle = {
    background: "var(--panel-bg)",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid var(--color-gray-200)",
    transition: "all 0.2s ease-in-out",
    cursor: "pointer",
};

const faqCardHoverStyle = {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const questionStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "1.125rem",
    fontWeight: 600,
    color: "var(--color-gray-900)",
    marginBottom: 0,
};

const answerContainerStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: "1rem",
    marginTop: "1rem",
    paddingLeft: "0.5rem",
};

// Enhanced answer marker with arrow pointer
const answerMarkerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    minWidth: "28px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    marginTop: "4px",
    boxShadow: "0 3px 12px rgba(59, 130, 246, 0.4)",
    transition: "transform 0.2s ease",
    border: "2px solid #ffffff",
};

const answerPointerStyle = {
    color: "#ffffff",
    fontSize: "0.9rem",
    fontWeight: "bold",
    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
};

const answerStyle = {
    color: "var(--color-gray-800)",
    fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)", // Responsive font size
    marginTop: "0",
    lineHeight: 1.7,
    fontWeight: 500,
    flex: 1,
};

const infoBoxStyle = {
    marginTop: "2.5rem",
    color: "#4b5563",
    fontSize: "clamp(0.9rem, 1.8vw, 1rem)", // Responsive font size
    background:
        "linear-gradient(90deg, var(--color-primary-50) 60%, var(--color-cyan-50) 100%)",
    borderRadius: "0.75rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    padding: "clamp(1rem, 2vw, 1.2rem)", // Responsive padding
    textAlign: "center",
    border: "1px solid var(--color-primary-100)",
    fontWeight: 500,
};

const DashboardFAQ = () => {
    const [openIdx, setOpenIdx] = useState(null);
    const [cardHovered, setCardHovered] = useState(null);

    return (
        <>
            <div style={pageBackgroundStyle} />
            <div style={containerStyle}>
                <div style={headerStyle}>
                    <h1 style={titleStyle}>Frequently Asked Questions</h1>
                    <p style={subtitleStyle}>
                        Find answers to common questions about FocusFlow,
                        productivity, and how to get the most out of the
                        dashboard.
                    </p>
                </div>
                <div style={faqsContainerStyle}>
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            style={
                                cardHovered === idx
                                    ? { ...faqCardStyle, ...faqCardHoverStyle }
                                    : faqCardStyle
                            }
                            onMouseEnter={() => setCardHovered(idx)}
                            onMouseLeave={() => setCardHovered(null)}
                        >
                            <div
                                style={questionStyle}
                                onClick={() =>
                                    setOpenIdx(openIdx === idx ? null : idx)
                                }
                            >
                                <span>{faq.question}</span>
                                {openIdx === idx ? (
                                    <FaChevronUp
                                        style={{
                                            color: "var(--color-primary-600)",
                                            fontSize: "1.2rem",
                                        }}
                                    />
                                ) : (
                                    <FaChevronDown
                                        style={{
                                            color: "var(--color-primary-600)",
                                            fontSize: "1.2rem",
                                        }}
                                    />
                                )}
                            </div>
                            {openIdx === idx && (
                                <div style={answerContainerStyle}>
                                    <div style={answerStyle}>{faq.answer}</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DashboardFAQ;
