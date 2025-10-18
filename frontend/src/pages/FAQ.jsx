import React, { useState } from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";
import "../styles/CardHover.css";

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

const glassCardStyle = {
    background: "rgba(30, 41, 59, 0.5)",
    backdropFilter: "blur(8px)",
    borderRadius: "1rem",
    border: "1px solid #334155",
    padding: "1.5rem 1.5rem 1rem 1.5rem",
    marginBottom: "1.5rem",
    transition: "all 0.3s ease",
    color: "#ffffff"
};

const questionStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    fontSize: "1.15rem",
    fontWeight: 700,
    color: "#a78bfa",
    marginBottom: 0,
};

const answerStyle = {
    color: "#94a3b8",
    fontSize: "1.05rem",
    marginTop: "0.75rem",
    lineHeight: 1.6,
};

const FAQ = () => {
    const [openIdx, setOpenIdx] = useState(null);
    return (
        <div style={{ background: "#0f172a", minHeight: "100vh", color: "#ffffff" }}>
            <LandingNavbar />
            {/* Hero Section */}
            <section
                style={{
                    background: "none",
                    padding: "3.5rem 1rem 2.5rem 1rem",
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1rem",
                        marginBottom: "1.2rem",
                    }}
                >
                    <FaQuestionCircle
                        style={{
                            fontSize: "2.5rem",
                            color: "#a78bfa",
                        }}
                    />
                    <h1
                        style={{
                            fontSize: "2.2rem",
                            fontWeight: 800,
                            margin: 0,
                            textShadow: "0 4px 16px rgba(130,87,247,0.11)",
                            background: 'linear-gradient(90deg, #a78bfa 40%, #60a5fa 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        Frequently Asked Questions
                    </h1>
                </div>
                <p
                    style={{
                        color: "#94a3b8",
                        fontSize: "1.15rem",
                        maxWidth: 600,
                        margin: "0 auto",
                        marginBottom: "2.2rem",
                    }}
                >
                    Find answers to common questions about FocusFlow,
                    productivity, and how to get the most out of the platform.
                </p>
            </section>
            <main
                style={{
                    maxWidth: 700,
                    margin: "-2.5rem auto 2.5rem auto",
                    padding: "1rem",
                }}
            >
                {faqs.map((faq, idx) => (
                    <div key={idx} className="hover-card" style={glassCardStyle}>
                        <div
                            style={questionStyle}
                            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                        >
                            <span>{faq.question}</span>
                            {openIdx === idx ? (
                                <FaChevronUp
                                    style={{ color: "#a78bfa", fontSize: "1.2rem" }}
                                />
                            ) : (
                                <FaChevronDown
                                    style={{ color: "#60a5fa", fontSize: "1.2rem" }}
                                />
                            )}
                        </div>
                        {openIdx === idx && (
                            <div style={answerStyle}>{faq.answer}</div>
                        )}
                    </div>
                ))}
                <div
                    style={{
                        marginTop: "2.5rem",
                        color: "#94a3b8",
                        fontSize: "1rem",
                        background: "rgba(30, 41, 59, 0.5)",
                        backdropFilter: "blur(8px)",
                        borderRadius: "0.75rem",
                        border: "1px solid #334155",
                        padding: "1.2rem 1.5rem",
                        textAlign: "center",
                    }}
                >
                    Can't find your question?{" "}
                    <a
                        href="/community"
                        style={{
                            color: "#a78bfa",
                            fontWeight: 600,
                            textDecoration: "underline"
                        }}
                    >
                        Visit the Community page
                    </a>{" "}
                    or email us at{" "}
                    <a
                        href="mailto:focusflow@studentproject.com"
                        style={{
                            color: "#60a5fa",
                            fontWeight: 600,
                        }}
                    >
                        focusflow@studentproject.com
                    </a>.
                </div>
            </main>
            <LandingFooter />
        </div>
    );
};

export default FAQ;
