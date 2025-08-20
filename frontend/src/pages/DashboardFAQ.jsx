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
    width: "99vw",
    background:
        "linear-gradient(120deg, var(--color-cyan-50) 0%, var(--color-primary-100) 100%)",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
};

const containerStyle = {
    width: "95%", // Changed from maxWidth
    margin: "2.5rem auto",
    padding: "clamp(1.5rem, 4vw, 2.5rem)", // Responsive padding
    background: "rgba(255,255,255,0.85)",
    borderRadius: "clamp(1rem, 3vw, 2rem)", // Responsive border radius
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
    backdropFilter: "blur(4px)",
    position: "relative",
    boxSizing: "border-box",
};

const accentBarStyle = {
    height: "6px",
    width: "100px",
    background:
        "linear-gradient(90deg, var(--color-primary-400), var(--color-cyan-400))",
    borderRadius: "3px",
    margin: "0 auto 0.8rem auto",
    boxShadow: "0 2px 12px 0 rgba(0,0,0,0.10)",
};

const heroStyle = {
    background:
        "linear-gradient(100deg, var(--color-primary-700) 0%, var(--color-cyan-100) 60%, var(--color-primary-200) 100%)",
    color: "var(--color-primary-800)",
    borderRadius: "1.5rem",
    padding: "clamp(1.5rem, 4vw, 2.5rem)", // Responsive padding
    width: "100%",
    boxSizing: "border-box",
    marginBottom: "2.5rem",
    boxShadow: "0 4px 32px 0 rgba(0,0,0,0.10)",
    position: "relative",
    textAlign: "center",
};

const iconCircleStyle = {
    background:
        "linear-gradient(135deg, var(--color-cyan-100) 0%, var(--color-primary-100) 100%)",
    borderRadius: "50%",
    width: "clamp(3.5rem, 6vw, 4.5rem)", // Responsive size
    height: "clamp(3.5rem, 6vw, 4.5rem)", // Responsive size
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 0.1 auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "transform 0.18s, filter 0.18s",
};

const iconCircleHoverStyle = {
    transform: "scale(1.08)",
    filter: "brightness(1.12)",
};

const titleStyle = {
    fontSize: "clamp(1.8rem, 4vw, 2.3rem)", // Responsive font size
    fontWeight: 900,
    color: "var(--color-primary-900)",
    margin: 0,
    letterSpacing: "-1px",
    textShadow: "0 2px 8px rgba(0,0,0,0.10)",
    textAlign: "center", // Changed from left to center
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
    padding: "0 clamp(0.5rem, 2vw, 1rem)", // Added responsive padding
};

const subtitleStyle = {
    color: "var(--color-cyan-900)",
    fontSize: "clamp(1rem, 2vw, 1.18rem)", // Responsive font size
    width: "100%", // Changed from maxWidth
    margin: "1.2rem auto 0 auto",
    fontWeight: 500,
    lineHeight: 1.6,
    textAlign: "center",
    padding: "0 clamp(0.5rem, 2vw, 1rem)", // Added responsive padding
    boxSizing: "border-box",
};

const mainStyle = {
    width: "95%", // Changed from maxWidth
    margin: "-2.5rem auto 2.5rem auto",
    padding: "clamp(1rem, 3vw, 1.5rem)", // Responsive padding
    background: "rgba(255,255,255,0.92)",
    borderRadius: "1.5rem",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
    boxSizing: "border-box",
};

const cardStyle = {
    background:
        "linear-gradient(135deg, rgba(255,255,255,0.96) 60%, var(--color-cyan-50) 100%)",
    borderRadius: "1.5rem",
    boxShadow: "0 8px 32px rgba(0,0,0,0.16), 0 1.5px 8px rgba(0,0,0,0.08)",
    padding: "clamp(1rem, 3vw, 1.5rem)", // Responsive padding
    width: "100%",
    boxSizing: "border-box",
    marginBottom: "1.5rem",
    border: "2.5px solid var(--color-primary-200)",
    position: "relative",
    overflow: "hidden",
    transition: "transform 0.18s, box-shadow 0.18s, border 0.18s",
    cursor: "pointer",
};

const cardHoverStyle = {
    transform: "translateY(-6px) scale(1.03)",
    boxShadow: "0 16px 48px rgba(0,0,0,0.22), 0 2px 12px rgba(0,0,0,0.10)",
    border: "2.5px solid var(--color-primary-400)",
};

const questionStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    fontSize: "clamp(1rem, 2vw, 1.15rem)", // Responsive font size
    fontWeight: 700,
    color: "var(--color-primary-700)",
    marginBottom: 0,
    letterSpacing: "-0.5px",
    width: "100%",
    userSelect: "none",
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
    const [iconHovered, setIconHovered] = useState(false);
    const [cardHovered, setCardHovered] = useState(null);

    return (
        <>
            <div style={pageBackgroundStyle} />
            <div style={containerStyle}>
                <section style={heroStyle}>
                    <div style={accentBarStyle} />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginBottom: "1.2rem",
                        }}
                    >
                        <div
                            style={
                                iconHovered
                                    ? {
                                          ...iconCircleStyle,
                                          ...iconCircleHoverStyle,
                                      }
                                    : iconCircleStyle
                            }
                            onMouseEnter={() => setIconHovered(true)}
                            onMouseLeave={() => setIconHovered(false)}
                        >
                            <FaQuestionCircle
                                style={{
                                    fontSize: "2.5rem",
                                    color: "var(--color-white)",
                                }}
                            />
                        </div>
                        <h1
                            style={{
                                ...titleStyle,
                                margin: 0,
                                textAlign: "center",
                                lineHeight: 1.1,
                                display: "block",
                                marginTop: 0,
                            }}
                        >
                            Frequently Asked Questions
                        </h1>
                    </div>
                    <p style={subtitleStyle}>
                        Find answers to common questions about FocusFlow,
                        productivity, and how to get the most out of the
                        dashboard.
                    </p>
                </section>
                <main style={mainStyle}>
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            style={
                                cardHovered === idx
                                    ? { ...cardStyle, ...cardHoverStyle }
                                    : cardStyle
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
                                <span
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.7rem",
                                    }}
                                >
                                    <span
                                        style={{
                                            display: "inline-block",
                                            width: 10,
                                            height: 10,
                                            borderRadius: "50%",
                                            background:
                                                "var(--color-primary-500)",
                                            marginRight: 6,
                                        }}
                                    />
                                    {faq.question}
                                </span>
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
                                    <div style={answerMarkerStyle}>
                                        <FaArrowRight
                                            style={answerPointerStyle}
                                        />
                                    </div>
                                    <div style={answerStyle}>{faq.answer}</div>
                                </div>
                            )}
                        </div>
                    ))}
                    <div style={infoBoxStyle}>
                        Can't find your question?{" "}
                        <span
                            style={{
                                color: "var(--color-primary-600)",
                                fontWeight: 600,
                            }}
                        >
                            Contact support from your dashboard.
                        </span>
                    </div>
                </main>
            </div>
        </>
    );
};

export default DashboardFAQ;
