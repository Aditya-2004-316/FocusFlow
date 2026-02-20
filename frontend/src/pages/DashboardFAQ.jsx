import React, { useMemo, useState } from "react";
import useResponsive from "../hooks/useResponsive";
import {
    FaQuestionCircle,
    FaLightbulb,
    FaComments,
    FaBookOpen,
    FaCheckCircle,
    FaListUl,
    FaHandsHelping,
    FaRegCompass,
    FaChalkboardTeacher,
    FaArrowLeft,
    FaArrowRight,
} from "react-icons/fa";

const faqs = [
    {
        question: "What is FocusFlow?",
        summary: "FocusFlow is a student project to help you manage your time and stay productive.",
        fullContent: [
            "FocusFlow began as a passion project by a group of students who were tired of bloated, expensive productivity apps that focused more on 'features' than on actual 'focus'. Our mission is to provide a clean, science-backed environment where deep work can flourish.",
            "The app combines three core pillars: structured planning (Task Management), active execution (Focus Timers), and data-driven reflection (Analytics). By bringing these together, we eliminate the need to switch between multiple tools, reducing cognitive friction.",
            "As a student project, we prioritize user experience and transparency. We are constantly iterating based on community feedback, ensuring that every update serves the goal of helping you stay in flow longer and achieve more with less stress.",
            "Whether you're a student preparing for exams, a remote professional managing projects, or a creator building your next big thing, FocusFlow is designed to adapt to your unique rhythm."
        ]
    },
    {
        question: "Is FocusFlow free?",
        summary: "Yes! All core features are free to use.",
        fullContent: [
            "We believe that productivity tools should be accessible to everyone, especially students. That's why every core feature—from unlimited task creation to focus timers and basic analytics—is completely free.",
            "Currently, there are no hidden tiers or 'Pro' locks on our primary workflows. You can sync your data across devices and collaborate with small teams without paying a cent.",
            "In the future, we may introduce premium integrations or advanced enterprise features to help sustain the project's growth, but the 'FocusFlow Essentials' will always remain free for our community of individual users.",
            "Our focus is on building value first. We're supported by the community through feedback, word-of-mouth, and the occasional donation that goes directly into server costs and development resources."
        ]
    },
    {
        question: "How do I use the timer effectively?",
        summary: "Choose a focus session preset or customize your intervals to build momentum.",
        fullContent: [
            "The Focus Timer is most effective when paired with a specific objective. Before you press start, select one task from your dashboard that you intend to work on during that block.",
            "The Pomodoro Method (25 minutes of work followed by a 5-minute break) is our most popular preset. It's designed to prevent mental fatigue by forcing regular resets. However, if you find yourself in a 'flow state', don't be afraid to use our Custom mode to lengthen the work block to 50 or 90 minutes.",
            "During the session, FocusFlow minimizes distractions by simplifying your dashboard. We recommend enabling our browser extension to block distracting websites that might pull you away from your task.",
            "The break is just as important as the work. Use those 5 minutes to stand up, stretch, or grab water. Avoid checking social media during breaks, as this often leads to 'context switching' that makes it harder to refocus when the next session starts."
        ]
    },
    {
        question: "How do I log a distraction?",
        summary: "Hit 'Log Distraction' during a session to capture what pulled you away.",
        fullContent: [
            "Distraction logging is one of FocusFlow's unique features. It's based on the idea that once you acknowledge a distracting thought or interruption, it's easier to set it aside and return to work.",
            "When you get an 'internal' distraction (like remembering you need to buy milk) or an 'external' one (like a Slack notification), just tap the Log button. Choose a category and optionally add a short note.",
            "This process takes less than 3 seconds and keeps the thought from looping in your working memory. At the end of the day or week, visit the Analytics tab to see a breakdown of your most frequent distractions.",
            "By seeing these patterns—for example, that you get most internal interruptions between 2 PM and 4 PM—you can adjust your routine, such as taking a longer walk before that period or moving simpler 'admin' tasks to that time slot."
        ]
    },
    {
        question: "Is my data private?",
        summary: "Yes. Your data remains private to you and is never sold.",
        fullContent: [
            "We take privacy seriously. In an age where digital behavior is often treated as a product, FocusFlow treats your focus data as a private asset that belongs only to you.",
            "All session logs and task details are stored using industry-standard encryption. We do not sell, trade, or share your personal information or productivity patterns with any third parties.",
            "If you use our account-syncing features, your data is stored securely in the cloud to allow for cross-device access. If you prefer to stay local, you can use the core timer features without ever creating an account.",
            "You have full control over your data. At any time, you can export your entire history for your own records or permanently delete your account and all associated data with a single click in your settings."
        ]
    },
];

const faqHighlights = [
    "Quick answers for every workflow",
    "Guides for individuals & teams",
    "Transparent roadmap & changelog",
    "Support from real students",
];

const engagementTips = [
    "Join weekly focus clinics",
    "Explore curated study plans",
    "Watch onboarding walkthroughs",
    "Share wins with the community",
];

const heroLeftColumnStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.85rem",
};

const heroRightColumnStyle = {
    display: "flex",
    flexDirection: "column",
};

const heroContentStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
};

const heroBadgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.85rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--color-primary-600)",
    background: "linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(14, 165, 233, 0.06))",
    padding: "0.35rem 0.85rem",
    borderRadius: "999px",
    width: "fit-content",
};

const heroSubtitleStyle = {
    fontSize: "1.05rem",
    color: "var(--color-gray-600)",
    lineHeight: 1.7,
    maxWidth: "34rem",
};

const heroActionsStyle = {
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
};

const heroPrimaryButtonStyle = {
    background: "linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))",
    color: "#0f172a",
    padding: "0.85rem 1.9rem",
    borderRadius: "999px",
    fontWeight: 600,
    fontSize: "0.95rem",
    border: "none",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.6rem",
    boxShadow: "0 16px 32px rgba(8, 145, 178, 0.28)",
    cursor: "pointer",
};

const heroSecondaryButtonStyle = {
    background: "transparent",
    color: "var(--color-primary-600)",
    padding: "0.85rem 1.75rem",
    borderRadius: "999px",
    fontWeight: 600,
    fontSize: "0.95rem",
    border: "1px solid var(--color-primary-300)",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
};

const heroPrimaryButtonHoverStyle = {
    ...heroPrimaryButtonStyle,
    transform: "scale(1.02)",
    background: "linear-gradient(135deg, var(--color-primary-400), var(--color-primary-600))",
};

const heroSecondaryButtonHoverStyle = {
    ...heroSecondaryButtonStyle,
    background: "rgba(56, 189, 248, 0.05)",
};

const highlightPanelStyle = {
    background: "var(--panel-bg)",
    border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
    borderRadius: "1.25rem",
    padding: "1.75rem",
    boxShadow: "var(--shadow-soft)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
};

const highlightChipStyle = {
    background: "var(--color-white)",
    border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
    borderRadius: "1rem",
    padding: "0.75rem 1rem",
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "var(--color-gray-700)",
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    boxShadow: "var(--shadow-soft)",
};

const highlightStatValueStyle = {
    width: "1rem",
    height: "1rem",
    color: "var(--color-primary-600)",
    flexShrink: 0,
};

const sectionWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.75rem",
};

const sectionHeaderStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
};

const sectionTitleStyle = {
    fontSize: "1.65rem",
    fontWeight: 700,
    color: "var(--color-gray-900)",
};

const faqCardStyle = {
    background: "var(--panel-bg)",
    border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
    borderColor: "color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
    borderRadius: "1.25rem",
    padding: "1.75rem",
    boxShadow: "var(--shadow-soft)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
};

const faqCardHoverStyle = {
    transform: "translateY(-6px)",
    boxShadow: "0 20px 32px rgba(15, 118, 110, 0.18)",
    borderColor: "var(--color-primary-300)",
};

const questionStyle = {
    fontSize: "1.15rem",
    fontWeight: 700,
    color: "var(--color-primary-700)",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "0.75rem"
};

const summaryStyle = {
    color: "var(--color-gray-600)",
    fontSize: "1rem",
    lineHeight: 1.6,
    margin: 0,
};

const readMoreStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "var(--color-primary-600)",
    fontSize: "0.9rem",
    fontWeight: 600,
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    transition: "color 0.2s ease, transform 0.2s ease",
};

const readMoreHoverStyle = {
    color: "var(--color-primary-700)",
};

const backButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "var(--color-primary-600)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    textDecoration: "none",
    transition: "color 0.2s ease, transform 0.2s ease",
};

/* ── Detail View Styles ────────────────────── */
const detailViewWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
};

const detailBodyStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
};

const detailParagraphStyle = {
    fontSize: "1.05rem",
    color: "var(--color-gray-700)",
    lineHeight: 1.8,
    margin: 0,
};

const DashboardFAQ = () => {
    const { isMobile, isTablet, width } = useResponsive();
    const [cardHovered, setCardHovered] = useState(null);
    const [readMoreHovered, setReadMoreHovered] = useState({});
    const [activeFaq, setActiveFaq] = useState(null);
    const [backHovered, setBackHovered] = useState(false);
    const [detailButtonHovered, setDetailButtonHovered] = useState(false);

    const isExtraSmall = width < 400;

    const pageWrapperStyle = {
        minHeight: "100vh",
        padding: isExtraSmall ? "2rem 0.75rem 5rem" : isMobile ? "2rem 1.25rem 5rem" : "4.5rem 1.75rem 5rem",
        background: "var(--color-white)",
        color: "var(--color-gray-900)",
        overflowX: "hidden",
    };

    const containerStyle = {
        maxWidth: "1120px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? "2rem" : "3rem",
    };

    const heroSectionStyle = {
        display: "grid",
        gridTemplateColumns: isTablet ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
        gap: isMobile ? "2rem" : "2.75rem",
        alignItems: "stretch",
        background: "var(--panel-bg)",
        border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
        borderRadius: "1.5rem",
        padding: isMobile ? "1.75rem" : "2.75rem",
        boxShadow: "var(--shadow-lg)",
    };

    const handleViewFaq = (faq) => {
        setActiveFaq(faq);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBack = () => {
        setActiveFaq(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (activeFaq) {
        return (
            <div style={pageWrapperStyle}>
                <div style={containerStyle}>
                    <div style={detailViewWrapperStyle}>
                        <button
                            onClick={handleBack}
                            onMouseEnter={() => setBackHovered(true)}
                            onMouseLeave={() => setBackHovered(false)}
                            style={backHovered ? { ...backButtonStyle, ...readMoreHoverStyle } : backButtonStyle}
                        >
                            <FaArrowLeft style={{
                                fontSize: "0.85rem",
                                transition: "transform 0.2s ease",
                                transform: backHovered ? "translateX(-4px)" : "translateX(0)"
                            }} />
                            Back to all questions
                        </button>

                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <span style={heroBadgeStyle}>Full Answer</span>
                            <h1 style={{
                                fontSize: isExtraSmall ? "1.5rem" : isMobile ? "1.75rem" : "2.2rem",
                                fontWeight: 800,
                                margin: 0
                            }}>
                                {activeFaq.question}
                            </h1>
                        </div>

                        <div style={detailBodyStyle}>
                            {activeFaq.fullContent.map((paragraph, i) => (
                                <p key={i} style={{
                                    ...detailParagraphStyle,
                                    fontSize: isMobile ? "0.95rem" : "1.05rem",
                                    lineHeight: isMobile ? 1.7 : 1.8
                                }}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        <div style={{
                            borderTop: "1px solid color-mix(in srgb, var(--panel-bg) 88%, black 12%)",
                            paddingTop: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.25rem",
                        }}>
                            <h3 style={{
                                fontSize: isMobile ? "1.05rem" : "1.1rem",
                                fontWeight: 700,
                                color: "var(--color-gray-700)",
                                margin: 0,
                            }}>
                                Still have questions?
                            </h3>
                            <button
                                onClick={handleBack}
                                onMouseEnter={() => setDetailButtonHovered(true)}
                                onMouseLeave={() => setDetailButtonHovered(false)}
                                style={{
                                    ...(detailButtonHovered ? heroPrimaryButtonHoverStyle : heroPrimaryButtonStyle),
                                    alignSelf: "flex-start",
                                    width: isExtraSmall ? "100%" : "auto",
                                    justifyContent: "center",
                                }}
                            >
                                <FaQuestionCircle style={{ fontSize: "0.9rem" }} />
                                Browse FAQ again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section style={pageWrapperStyle}>
            <div style={containerStyle}>
                <section style={heroSectionStyle}>
                    <div style={heroLeftColumnStyle}>
                        <div style={heroContentStyle}>
                            <span style={heroBadgeStyle}>
                                <FaQuestionCircle style={{ width: "1rem", height: "1rem" }} />
                                FAQ
                            </span>
                            <h1 style={{
                                fontSize: isExtraSmall ? "1.75rem" : isMobile ? "1.85rem" : "clamp(2rem, 4vw, 2.6rem)",
                                fontWeight: 800,
                                letterSpacing: "-0.04em",
                                lineHeight: 1.15,
                                color: "var(--color-gray-900)",
                            }}>Answers when you need them</h1>
                            <p style={heroSubtitleStyle}>
                                Explore the questions raised most often by individuals, teams, and educators using FocusFlow. Learn best practices, discover advanced tips, and find the fastest way to support.
                            </p>
                        </div>
                        <div style={heroActionsStyle}>
                            <a
                                href="#faqs"
                                style={
                                    cardHovered === "browse"
                                        ? heroPrimaryButtonHoverStyle
                                        : heroPrimaryButtonStyle
                                }
                                onMouseEnter={() => setCardHovered("browse")}
                                onMouseLeave={() => setCardHovered(null)}
                            >
                                Browse top questions
                            </a>
                        </div>
                    </div>

                    <div style={heroRightColumnStyle}>
                        <div style={highlightPanelStyle}>
                            <div style={sectionHeaderStyle}>
                                <span style={heroBadgeStyle}>
                                    <FaQuestionCircle style={{ width: "1rem", height: "1rem" }} />
                                    FAQ focus
                                </span>
                                <h2 style={sectionTitleStyle}>In-depth clarity</h2>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.75rem" }}>
                                {faqHighlights.map((item) => (
                                    <div key={item} style={highlightChipStyle}>
                                        <FaCheckCircle style={highlightStatValueStyle} />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section id="faqs" style={sectionWrapperStyle}>
                    <div style={sectionHeaderStyle}>
                        <span style={heroBadgeStyle}>
                            <FaListUl style={{ width: "1rem", height: "1rem" }} />
                            Quick Answers
                        </span>
                        <h2 style={sectionTitleStyle}>Frequently asked questions</h2>
                    </div>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                        gap: "1.5rem"
                    }}>
                        {faqs.map((faq, idx) => (
                            <div
                                key={faq.question}
                                onClick={() => handleViewFaq(faq)}
                                style={
                                    cardHovered === idx
                                        ? { ...faqCardStyle, ...faqCardHoverStyle }
                                        : faqCardStyle
                                }
                                onMouseEnter={() => setCardHovered(idx)}
                                onMouseLeave={() => setCardHovered(null)}
                            >
                                <h3 style={questionStyle}>
                                    <FaLightbulb style={{ fontSize: "1rem" }} />
                                    {faq.question}
                                </h3>
                                <p style={summaryStyle}>{faq.summary}</p>
                                <button
                                    onMouseEnter={() => setReadMoreHovered({ ...readMoreHovered, [faq.question]: true })}
                                    onMouseLeave={() => setReadMoreHovered({ ...readMoreHovered, [faq.question]: false })}
                                    style={readMoreHovered[faq.question] ? { ...readMoreStyle, ...readMoreHoverStyle } : readMoreStyle}
                                >
                                    View full answer
                                    <FaArrowRight style={{
                                        fontSize: "0.8rem",
                                        transition: "transform 0.2s ease",
                                        transform: readMoreHovered[faq.question] ? "translateX(4px)" : "translateX(0)"
                                    }} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    );
};

export default DashboardFAQ;
