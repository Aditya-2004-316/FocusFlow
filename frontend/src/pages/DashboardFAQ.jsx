import React, { useMemo, useState } from "react";
import useResponsive from "../hooks/useResponsive";
import {
    FaQuestionCircle,
    FaChevronDown,
    FaChevronUp,
    FaLightbulb,
    FaComments,
    FaBookOpen,
    FaCheckCircle,
    FaListUl,
    FaHandsHelping,
    FaRegCompass,
    FaChalkboardTeacher,
} from "react-icons/fa";

const faqs = [
    {
        question: "What is FocusFlow?",
        answer:
            "FocusFlow is a student project to help you manage your time and stay productive by combining timers, analytics, and collaborative tools.",
    },
    {
        question: "Is FocusFlow free?",
        answer:
            "Yes! All features are free to use. You can optionally create an account to sync your data across devices and unlock advanced insights.",
    },
    {
        question: "How do I use the timer?",
        answer:
            "Visit the dashboard, choose a focus session preset or customize your intervals, then press start. FocusFlow will track your streaks automatically.",
    },
    {
        question: "Can I use FocusFlow for studying?",
        answer:
            "Absolutely. Students use FocusFlow to plan study blocks, log distractions, and compare productivity trends over time for each subject.",
    },
    {
        question: "Do I need to create an account?",
        answer:
            "No account is required for core timers and task lists. Creating an account lets you save history, collaborate, and access your data anywhere.",
    },
    {
        question: "How do I log a distraction?",
        answer:
            "During a session, hit “Log Distraction” to capture what pulled you away. Review trends later to adjust routines and stay in flow.",
    },
    {
        question: "Is my data private?",
        answer:
            "Yes. Your data remains private to you. We do not sell or share personal information, and you can export or delete your records anytime.",
    },
    {
        question: "Can I contribute to FocusFlow?",
        answer:
            "We welcome contributors! Suggest features, report bugs, or collaborate on code via our GitHub repo and community channels.",
    },
    {
        question: "Who built FocusFlow?",
        answer:
            "FocusFlow was created by students passionate about deep work. Read the About page to meet the makers and learn about our mission.",
    },
    {
        question: "How can I give feedback?",
        answer:
            "Share feedback from the dashboard, join our community sessions, or email us at focusflow@studentproject.com. We respond within a day.",
    },
];

const faqHighlights = [
    "Quick answers for every workflow",
    "Guides for both individuals and teams",
    "Transparent roadmap and changelog",
    "Support from real students and mentors",
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
};

const heroPrimaryButtonHoverStyle = {
    ...heroPrimaryButtonStyle,
    transform: "scale(1.05)",
    boxShadow: "0 20px 40px rgba(8, 145, 178, 0.4)",
    background: "linear-gradient(135deg, var(--color-primary-400), var(--color-primary-600))",
};

const heroSecondaryButtonHoverStyle = {
    ...heroSecondaryButtonStyle,
    background: "rgba(56, 189, 248, 0.1)",
    borderColor: "var(--color-primary-500)",
};

const heroRightColumnStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
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
    borderRadius: "1rem",
    padding: "1.5rem 1.75rem",
    boxShadow: "var(--shadow-soft)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer",
};

const faqCardHoverStyle = {
    transform: "translateY(-4px)",
    boxShadow: "0 20px 32px rgba(15, 118, 110, 0.18)",
    borderColor: "var(--color-primary-300)",
};

const questionStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "var(--color-gray-900)",
};

const answerContainerStyle = {
    marginTop: "1.1rem",
    borderTop: "1px solid var(--input-border)",
    paddingTop: "0.9rem",
    display: "flex",
    gap: "0.85rem",
};

const answerMarkerStyle = {
    width: "1.75rem",
    height: "1.75rem",
    borderRadius: "0.5rem",
    background: "rgba(56, 189, 248, 0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-primary-600)",
    fontSize: "0.95rem",
    flexShrink: 0,
};

const answerStyle = {
    color: "var(--color-gray-700)",
    fontSize: "0.98rem",
    lineHeight: 1.7,
};

const valuePanelTitleStyle = {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "var(--color-gray-900)",
    margin: 0,
};

const valueListStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
};

const valueItemStyle = {
    display: "flex",
    gap: "0.6rem",
    alignItems: "flex-start",
    color: "var(--color-gray-600)",
    lineHeight: 1.5,
    fontSize: "0.95rem",
};

const DashboardFAQ = () => {
    const { isMobile, isTablet, width } = useResponsive();
    const [openIdx, setOpenIdx] = useState(null);
    const [cardHovered, setCardHovered] = useState(null);

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

    const heroTitleStyle = {
        fontSize: isExtraSmall ? "1.75rem" : isMobile ? "1.85rem" : "clamp(2rem, 4vw, 2.6rem)",
        fontWeight: 800,
        letterSpacing: "-0.04em",
        lineHeight: 1.15,
        color: "var(--color-gray-900)",
    };

    const highlightListStyle = {
        display: "grid",
        gridTemplateColumns: isExtraSmall ? "1fr" : "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "0.85rem",
    };

    const faqGridStyle = {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))",
        gap: isMobile ? "1rem" : "1.5rem",
    };

    const valuePanelsGridStyle = {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.5rem",
    };

    const quickLinks = useMemo(
        () => [
            "Start with our onboarding guide",
            "Attend a live Q&A session",
            "Browse community templates",
            "Check status and release notes",
        ],
        []
    );

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
                            <h1 style={heroTitleStyle}>Answers when you need them</h1>
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
                            <a
                                href="#resources"
                                style={
                                    cardHovered === "resources"
                                        ? heroSecondaryButtonHoverStyle
                                        : heroSecondaryButtonStyle
                                }
                                onMouseEnter={() => setCardHovered("resources")}
                                onMouseLeave={() => setCardHovered(null)}
                            >
                                Explore resources
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
                                <h2 style={sectionTitleStyle}>Why this hub exists</h2>
                            </div>
                            <div style={highlightListStyle}>
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
                            Most asked
                        </span>
                        <h2 style={sectionTitleStyle}>Quick answers for your workflows</h2>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {faqs.map((faq, idx) => (
                            <div
                                key={faq.question}
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
                                        <span style={answerMarkerStyle}>
                                            <FaBookOpen style={{ fontSize: "0.85rem" }} />
                                        </span>
                                        <p style={answerStyle}>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section id="resources" style={sectionWrapperStyle}>
                    <div style={sectionHeaderStyle}>
                        <span style={heroBadgeStyle}>
                            <FaHandsHelping style={{ width: "1rem", height: "1rem" }} />
                            Need more help?
                        </span>
                        <h2 style={sectionTitleStyle}>Resources and conversations beyond the FAQ</h2>
                    </div>
                    <div style={valuePanelsGridStyle}>
                        <div style={highlightPanelStyle}>
                            <span style={heroBadgeStyle}>
                                <FaRegCompass style={{ width: "1rem", height: "1rem" }} />
                                Reach out
                            </span>
                            <h3 style={valuePanelTitleStyle}>Talk to real people</h3>
                            <div style={valueListStyle}>
                                {quickLinks.map((item) => (
                                    <div key={item} style={valueItemStyle}>
                                        <FaCheckCircle style={highlightStatValueStyle} />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={highlightPanelStyle}>
                            <span style={heroBadgeStyle}>
                                <FaChalkboardTeacher style={{ width: "1rem", height: "1rem" }} />
                                Learn deeper
                            </span>
                            <h3 style={valuePanelTitleStyle}>Guides & playbooks</h3>
                            <div style={valueListStyle}>
                                {engagementTips.map((tip) => (
                                    <div key={tip} style={valueItemStyle}>
                                        <FaCheckCircle style={highlightStatValueStyle} />
                                        <span>{tip}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default DashboardFAQ;
