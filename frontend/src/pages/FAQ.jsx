import React, { useState } from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";
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
        {
            question: "What devices are supported?",
            answer: "FocusFlow works on all modern web browsers (Chrome, Firefox, Safari, Edge) on desktop, tablet, and mobile devices. Mobile apps for iOS and Android are coming soon!",
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
        {
            question: "How do breaks work?",
            answer: "After each focus session, you'll be prompted to take a short break (usually 5 minutes). After 4 sessions, you'll get a longer break (usually 15-30 minutes). This helps prevent burnout and maintains productivity.",
        },
        {
            question: "Can I pause or skip a session?",
            answer: "Yes, you can pause your timer at any time. However, we recommend completing full sessions for maximum effectiveness. Skipping is also available if needed.",
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
        {
            question: "What statistics are tracked?",
            answer: "We track your focus sessions, total time focused, distractions logged, productivity trends, daily/weekly/monthly statistics, and goal progress.",
        },
        {
            question: "How do I view my progress?",
            answer: "Visit the Analytics section of your dashboard to see detailed charts, graphs, and insights about your productivity patterns and progress over time.",
        },
    ],
    "Privacy & Security": [
        {
            question: "Is my data private?",
            answer: "Yes, your data is stored securely and is only accessible to you. This project does not share your data with anyone.",
        },
        {
            question: "Do you sell user data?",
            answer: "Absolutely not! We never sell, rent, or share your personal data with third parties. Your privacy is our top priority.",
        },
        {
            question: "How is my data protected?",
            answer: "We use encryption for data in transit (TLS) and at rest (AES-256), regular security audits, and follow industry best practices for data protection.",
        },
        {
            question: "Can I delete my account?",
            answer: "Yes, you can permanently delete your account and all associated data at any time from your account settings. This action is irreversible.",
        },
    ],
    "Features & Functionality": [
        {
            question: "Can I use FocusFlow for studying?",
            answer: "Absolutely! FocusFlow is designed for students and anyone who wants to improve their focus and productivity. Use the timer for study sessions, log distractions, and review your stats to see your progress.",
        },
        {
            question: "How do I log a distraction?",
            answer: "On the dashboard, click 'Log Distraction' and enter what interrupted your focus. This helps you identify patterns and improve over time.",
        },
        {
            question: "Can I use FocusFlow offline?",
            answer: "Currently, FocusFlow requires an internet connection. Offline mode is on our roadmap and coming soon!",
        },
        {
            question: "Does FocusFlow have a mobile app?",
            answer: "Mobile apps for iOS and Android are currently in development and will be released in Q1 2025. You can use the web version on mobile browsers in the meantime.",
        },
        {
            question: "Can I integrate with other tools?",
            answer: "Integration with Google Calendar, Notion, Slack, and other popular tools is planned for future releases. Check our Roadmap page for updates!",
        },
        {
            question: "Can I customize the timer sounds?",
            answer: "Yes! You can choose from various notification sounds or upload your own custom sounds in the settings.",
        },
        {
            question: "Is there a dark mode?",
            answer: "Yes! FocusFlow has a beautiful dark mode that's enabled by default. You can toggle between light and dark themes in your settings.",
        },
    ],
    "Team & Collaboration": [
        {
            question: "Can I use FocusFlow for team collaboration?",
            answer: "Team workspaces are currently in development (40% complete). This feature will allow you to create shared workspaces, assign tasks, and track team productivity.",
        },
        {
            question: "How do I invite team members?",
            answer: "Once team features are released, you'll be able to invite members via email from your workspace settings. They'll receive an invitation link to join your team.",
        },
        {
            question: "Can I share my progress with others?",
            answer: "You can share your productivity stats and achievements via shareable links. Full social features are coming in future updates.",
        },
    ],
    "Community & Support": [
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
        {
            question: "Where can I report bugs?",
            answer: "You can report bugs on our GitHub Issues page or email us at support@focusflow.com. Please include as much detail as possible.",
        },
        {
            question: "Is there a community forum?",
            answer: "A community forum is coming soon! In the meantime, join our Discord server to connect with other users and the development team.",
        },
    ],
    "Technical": [
        {
            question: "What browsers are supported?",
            answer: "FocusFlow works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. We recommend using the latest version for the best experience.",
        },
        {
            question: "How do I enable notifications?",
            answer: "Click the notification icon in your browser when prompted, or go to your browser settings and allow notifications for FocusFlow.",
        },
        {
            question: "Is there an API for developers?",
            answer: "A public API is planned for Q3 2025. This will allow developers to build integrations and custom tools using FocusFlow data.",
        },
        {
            question: "How do I reset my password?",
            answer: "Click 'Forgot Password' on the login page, enter your email, and you'll receive a password reset link within a few minutes.",
        },
    ],
};

// Flatten for backward compatibility
const faqs = Object.values(faqCategories).flat();

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
    color: "#38bdf8",
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
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredFaqs = faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                <h1
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: 700,
                        color: "#ffffff",
                        marginBottom: "1rem",
                    }}
                >
                    Frequently Asked Questions
                </h1>
                <p
                    style={{
                        color: "#94a3b8",
                        fontSize: "1.2rem",
                        maxWidth: 600,
                        margin: "0 auto",
                        lineHeight: 1.6,
                    }}
                >
                    Find answers to common questions about FocusFlow,
                    productivity, and how to get the most out of the platform.
                </p>
                {/* Search Bar */}
                <div style={{ maxWidth: 600, margin: "2rem auto 0" }}>
                    <input
                        type="text"
                        placeholder="Search FAQs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "0.875rem 1rem",
                            fontSize: "1rem",
                            borderRadius: "0.5rem",
                            border: "1px solid #334155",
                            background: "rgba(30, 41, 59, 0.5)",
                            color: "#ffffff",
                            outline: "none",
                        }}
                    />
                </div>
            </section>
            <main
                style={{
                    maxWidth: 1200,
                    margin: "-2.5rem auto 2.5rem auto",
                    padding: "1rem",
                }}
            >
                {/* Category Pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2rem", justifyContent: "center" }}>
                    {["All", ...Object.keys(faqCategories)].map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            style={{
                                padding: "0.5rem 1rem",
                                borderRadius: "9999px",
                                border: "1px solid #334155",
                                background: selectedCategory === category ? "rgba(56, 189, 248, 0.15)" : "rgba(30, 41, 59, 0.5)",
                                color: selectedCategory === category ? "#ffffff" : "#94a3b8",
                                cursor: "pointer",
                                fontSize: "0.9rem",
                                fontWeight: selectedCategory === category ? 600 : 400,
                                transition: "all 0.2s",
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Display by Category or Search Results */}
                {searchTerm ? (
                    // Search Results
                    <>
                        <p style={{ color: "#94a3b8", marginBottom: "1.5rem", textAlign: "center" }}>
                            Found {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} for "{searchTerm}"
                        </p>
                        {filteredFaqs.map((faq, idx) => (
                            <div key={idx} className="hover-card" style={glassCardStyle}>
                                <div
                                    style={questionStyle}
                                    onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                                >
                                    <span>{faq.question}</span>
                                    {openIdx === idx ? (
                                        <FaChevronUp
                                            style={{ color: "#38bdf8", fontSize: "1.2rem" }}
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
                    </>
                ) : selectedCategory === "All" ? (
                    // All Categories
                    Object.entries(faqCategories).map(([category, questions]) => (
                        <div key={category} style={{ marginBottom: "3rem" }}>
                            <h3 style={{ color: "#38bdf8", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>
                                {category}
                            </h3>
                            {questions.map((faq, idx) => {
                                const globalIdx = faqs.findIndex(f => f.question === faq.question);
                                return (
                                    <div key={idx} className="hover-card" style={glassCardStyle}>
                                        <div
                                            style={questionStyle}
                                            onClick={() => setOpenIdx(openIdx === globalIdx ? null : globalIdx)}
                                        >
                                            <span>{faq.question}</span>
                                            {openIdx === globalIdx ? (
                                                <FaChevronUp
                                                    style={{ color: "#38bdf8", fontSize: "1.2rem" }}
                                                />
                                            ) : (
                                                <FaChevronDown
                                                    style={{ color: "#60a5fa", fontSize: "1.2rem" }}
                                                />
                                            )}
                                        </div>
                                        {openIdx === globalIdx && (
                                            <div style={answerStyle}>{faq.answer}</div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))
                ) : (
                    // Selected Category
                    <>
                        <h3 style={{ color: "#38bdf8", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>
                            {selectedCategory}
                        </h3>
                        {faqCategories[selectedCategory].map((faq, idx) => {
                            const globalIdx = faqs.findIndex(f => f.question === faq.question);
                            return (
                                <div key={idx} className="hover-card" style={glassCardStyle}>
                                    <div
                                        style={questionStyle}
                                        onClick={() => setOpenIdx(openIdx === globalIdx ? null : globalIdx)}
                                    >
                                        <span>{faq.question}</span>
                                        {openIdx === globalIdx ? (
                                            <FaChevronUp
                                                style={{ color: "#38bdf8", fontSize: "1.2rem" }}
                                            />
                                        ) : (
                                            <FaChevronDown
                                                style={{ color: "#60a5fa", fontSize: "1.2rem" }}
                                            />
                                        )}
                                    </div>
                                    {openIdx === globalIdx && (
                                        <div style={answerStyle}>{faq.answer}</div>
                                    )}
                                </div>
                            );
                        })}
                    </>
                )}

                {/* Old code - remove this */}
                {false && faqs.map((faq, idx) => (
                    <div key={idx} className="hover-card" style={glassCardStyle}>
                        <div
                            style={questionStyle}
                            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                        >
                            <span>{faq.question}</span>
                            {openIdx === idx ? (
                                <FaChevronUp
                                    style={{ color: "#38bdf8", fontSize: "1.2rem" }}
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
                            color: "#38bdf8",
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
