import React, { useMemo, useState } from "react";
import useResponsive from "../hooks/useResponsive";
import { FaEnvelope, FaPaperPlane, FaPhone, FaMapMarkerAlt, FaHeadset, FaCheckCircle, FaUsers } from "react-icons/fa";

const contactChannels = [
    {
        title: "Email our team",
        description: "support@focusflow.com",
        detail: "We typically respond within 12 hours",
        link: "mailto:support@focusflow.com",
        icon: <FaEnvelope />,
        type: "Direct support",
    },
    {
        title: "Schedule a call",
        description: "+1 (555) 123-4567",
        detail: "Mon–Fri · 9AM – 5PM EST",
        link: "tel:+15551234567",
        icon: <FaPhone />,
        type: "Live conversation",
    },
    {
        title: "Visit our workspace",
        description: "FocusFlow HQ · Remote-first",
        detail: "Join our quarterly community meetups",
        link: "https://maps.google.com",
        icon: <FaMapMarkerAlt />,
        type: "Community",
    },
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

const channelCardStyle = {
    background: "var(--panel-bg)",
    border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
    borderColor: "color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
    borderRadius: "1rem",
    overflow: "hidden",
    boxShadow: "var(--shadow-soft)",
    display: "flex",
    flexDirection: "column",
    textDecoration: "none",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
    transform: "translateY(0)",
};

const channelCardHoverStyle = {
    transform: "translateY(-6px)",
    boxShadow: "0 20px 32px rgba(15, 118, 110, 0.18)",
    borderColor: "var(--color-primary-300)",
};

const channelHeaderStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.85rem",
    padding: "1.5rem 1.75rem 0.85rem",
};

const channelIconStyle = {
    width: "2.6rem",
    height: "2.6rem",
    borderRadius: "0.85rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(56, 189, 248, 0.12)",
    color: "var(--color-primary-600)",
    fontSize: "1.4rem",
};

const channelTypeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    fontSize: "0.85rem",
    fontWeight: 500,
    color: "var(--color-primary-600)",
    background: "rgba(56, 189, 248, 0.12)",
    borderRadius: "999px",
    padding: "0.35rem 0.85rem",
    width: "fit-content",
};

const channelContentStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    padding: "0 1.75rem 1.75rem",
    flex: 1,
};

const channelTitleStyle = {
    fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)",
    fontWeight: 700,
    color: "var(--color-primary-700)",
    margin: 0,
    letterSpacing: "-0.3px",
};

const channelDescriptionStyle = {
    fontSize: "1rem",
    color: "var(--color-gray-600)",
    lineHeight: 1.6,
    margin: 0,
};

const channelFooterStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem",
    marginTop: "1.25rem",
    paddingTop: "1rem",
    borderTop: "1px solid var(--input-border)",
    flexWrap: "wrap",
};

const readMoreStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "var(--color-primary-600)",
    fontSize: "0.875rem",
    fontWeight: 500,
    textDecoration: "none",
};

const readMoreHoverStyle = {
    ...readMoreStyle,
    textDecoration: "underline",
    color: "var(--color-primary-700)",
};

const inputGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
};

const labelStyle = {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "var(--color-gray-600)",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
};

const inputStyle = {
    padding: "0.85rem 1rem",
    borderRadius: "0.85rem",
    border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
    fontSize: "0.95rem",
    background: "var(--color-white)",
    color: "var(--color-gray-900)",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    outline: "none",
};

const inputFocusStyle = {
    borderColor: "var(--color-primary-400)",
    boxShadow: "0 0 0 4px rgba(56, 189, 248, 0.15)",
};

const textareaStyle = {
    ...inputStyle,
    minHeight: "140px",
    resize: "vertical",
};

const heroPrimaryButtonCompactStyle = {
    ...heroPrimaryButtonStyle,
    alignSelf: "flex-start",
};

const heroPrimaryButtonCompactHoverStyle = {
    ...heroPrimaryButtonHoverStyle,
    alignSelf: "flex-start",
};

const successMessageStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    background: "linear-gradient(135deg, rgba(56, 189, 248, 0.12), rgba(14, 165, 233, 0.12))",
    border: "1px solid rgba(14, 165, 233, 0.3)",
    borderRadius: "1rem",
    padding: "1.25rem 1.5rem",
    color: "var(--color-primary-700)",
    fontWeight: 600,
};

const DashboardContact = () => {
    const { isMobile, isTablet, width } = useResponsive();
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [primaryButtonHovered, setPrimaryButtonHovered] = useState(false);
    const [secondaryButtonHovered, setSecondaryButtonHovered] = useState(false);
    const [readMoreHovered, setReadMoreHovered] = useState({});
    const [focusedInput, setFocusedInput] = useState(null);
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

    const channelsGridStyle = {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "2rem",
    };

    const formContainerStyle = {
        background: "var(--panel-bg)",
        border: "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)",
        borderRadius: "1.5rem",
        padding: isMobile ? "1.5rem" : "2.5rem",
        boxShadow: "var(--shadow-lg)",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
    };

    const formGridStyle = {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: "1.5rem",
    };

    const channelTypes = useMemo(
        () => Array.from(new Set(contactChannels.map((channel) => channel.type))),
        []
    );

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = () => {
        if (form.name && form.email && form.message) {
            setSubmitted(true);
            setTimeout(() => {
                setForm({ name: "", email: "", message: "" });
                setSubmitted(false);
            }, 3000);
        }
    };

    return (
        <section style={pageWrapperStyle}>
            <div style={containerStyle}>
                <section style={heroSectionStyle}>
                    <div style={heroLeftColumnStyle}>
                        <div style={heroContentStyle}>
                            <span style={heroBadgeStyle}>
                                <FaEnvelope style={{ width: "1rem", height: "1rem" }} />
                                Contact
                            </span>
                            <h1 style={heroTitleStyle}>We’re here to help you focus</h1>
                            <p style={heroSubtitleStyle}>
                                Reach out for product support, onboarding help, or partnership
                                opportunities. The FocusFlow team loves hearing how we can make your
                                workday smoother.
                            </p>
                        </div>
                        <div style={heroActionsStyle}>
                            <a
                                href="#channels"
                                style={
                                    primaryButtonHovered
                                        ? heroPrimaryButtonHoverStyle
                                        : heroPrimaryButtonStyle
                                }
                                onMouseEnter={() => setPrimaryButtonHovered(true)}
                                onMouseLeave={() => setPrimaryButtonHovered(false)}
                            >
                                Explore contact options
                            </a>
                            <a
                                href="#contact-form"
                                style={
                                    secondaryButtonHovered
                                        ? heroSecondaryButtonHoverStyle
                                        : heroSecondaryButtonStyle
                                }
                                onMouseEnter={() => setSecondaryButtonHovered(true)}
                                onMouseLeave={() => setSecondaryButtonHovered(false)}
                            >
                                Send a message
                            </a>
                        </div>
                    </div>

                    <div style={heroRightColumnStyle}>
                        <div style={highlightPanelStyle}>
                            <div style={sectionHeaderStyle}>
                                <span style={heroBadgeStyle}>
                                    <FaHeadset style={{ width: "1rem", height: "1rem" }} />
                                    Service levels
                                </span>
                                <h2 style={sectionTitleStyle}>Choose the right channel</h2>
                            </div>
                            <div style={highlightListStyle}>
                                {channelTypes.map((type) => (
                                    <div key={type} style={highlightChipStyle}>
                                        <FaCheckCircle style={highlightStatValueStyle} />
                                        <span>{type}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section id="channels" style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                    <div style={sectionHeaderStyle}>
                        <span style={heroBadgeStyle}>
                            <FaUsers style={{ width: "1rem", height: "1rem" }} />
                            Reach us directly
                        </span>
                        <h2 style={sectionTitleStyle}>Pick the best channel for you</h2>
                    </div>
                    <div style={channelsGridStyle}>
                        {contactChannels.map((channel) => (
                            <a
                                key={channel.title}
                                href={channel.link}
                                style={
                                    cardHovered === channel.title
                                        ? { ...channelCardStyle, ...channelCardHoverStyle }
                                        : channelCardStyle
                                }
                                onMouseEnter={() => {
                                    setCardHovered(channel.title);
                                    setReadMoreHovered({
                                        ...readMoreHovered,
                                        [channel.title]: true,
                                    });
                                }}
                                onMouseLeave={() => {
                                    setCardHovered(null);
                                    setReadMoreHovered({
                                        ...readMoreHovered,
                                        [channel.title]: false,
                                    });
                                }}
                            >
                                <div style={channelHeaderStyle}>
                                    <div style={channelIconStyle}>{channel.icon}</div>
                                    <div style={channelTypeStyle}>{channel.type}</div>
                                </div>
                                <div style={channelContentStyle}>
                                    <h3 style={channelTitleStyle}>{channel.title}</h3>
                                    <p style={channelDescriptionStyle}>{channel.description}</p>
                                    <div style={channelFooterStyle}>
                                        <span style={{ fontSize: "0.85rem", color: "var(--color-gray-500)" }}>
                                            {channel.detail}
                                        </span>
                                        <span
                                            style={
                                                readMoreHovered[channel.title]
                                                    ? readMoreHoverStyle
                                                    : readMoreStyle
                                            }
                                        >
                                            Learn more
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M5 12h14" />
                                                <path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

                <section id="contact-form" style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                    <div style={sectionHeaderStyle}>
                        <span style={heroBadgeStyle}>
                            <FaPaperPlane style={{ width: "1rem", height: "1rem" }} />
                            Send a note
                        </span>
                        <h2 style={sectionTitleStyle}>We’ll get back within a day</h2>
                    </div>
                    <div style={formContainerStyle}>
                        <div style={formGridStyle}>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>Your name</label>
                                <input
                                    style={
                                        focusedInput === "name"
                                            ? { ...inputStyle, ...inputFocusStyle }
                                            : inputStyle
                                    }
                                    name="name"
                                    placeholder="Alex Productivity"
                                    value={form.name}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedInput("name")}
                                    onBlur={() => setFocusedInput(null)}
                                />
                            </div>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>Email address</label>
                                <input
                                    style={
                                        focusedInput === "email"
                                            ? { ...inputStyle, ...inputFocusStyle }
                                            : inputStyle
                                    }
                                    name="email"
                                    type="email"
                                    placeholder="alex@company.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedInput("email")}
                                    onBlur={() => setFocusedInput(null)}
                                />
                            </div>
                        </div>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>How can we help?</label>
                            <textarea
                                style={
                                    focusedInput === "message"
                                        ? { ...textareaStyle, ...inputFocusStyle }
                                        : textareaStyle
                                }
                                name="message"
                                placeholder="Tell us about your goals, blockers, or feedback."
                                value={form.message}
                                onChange={handleChange}
                                onFocus={() => setFocusedInput("message")}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </div>
                        <a
                            style={
                                primaryButtonHovered
                                    ? heroPrimaryButtonCompactHoverStyle
                                    : heroPrimaryButtonCompactStyle
                            }
                            onMouseEnter={() => setPrimaryButtonHovered(true)}
                            onMouseLeave={() => setPrimaryButtonHovered(false)}
                            onClick={handleSubmit}
                        >
                            <FaPaperPlane style={{ fontSize: "0.95rem" }} />
                            Send message
                        </a>
                        {submitted && (
                            <div style={successMessageStyle}>
                                <FaCheckCircle style={{ fontSize: "1.1rem" }} />
                                Message received! We’ll get back to you shortly.
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </section>
    );
};

export default DashboardContact;
