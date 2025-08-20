import React, { useState } from "react";
import {
    FaEnvelope,
    FaPaperPlane,
    FaPhone,
    FaMapMarkerAlt,
    FaCheckCircle,
} from "react-icons/fa";

const pageBackgroundStyle = {
    minHeight: "100vh",
    width: "100vw",
    background:
        "linear-gradient(120deg, var(--color-cyan-50) 0%, var(--color-primary-100) 100%)",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: -1,
};

const containerStyle = {
    width: "95%",
    maxWidth: "900px",
    margin: "2.5rem auto",
    padding: "clamp(1.5rem, 4vw, 2.5rem)",
    background: "rgba(255,255,255,0.85)",
    borderRadius: "clamp(1rem, 3vw, 2rem)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
    backdropFilter: "blur(4px)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    padding: "clamp(1.5rem, 4vw, 2.5rem)",
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
    width: "clamp(3.5rem, 6vw, 4.5rem)",
    height: "clamp(3.5rem, 6vw, 4.5rem)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 0.1rem auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "transform 0.18s, filter 0.18s",
};

const iconCircleHoverStyle = {
    transform: "scale(1.08)",
    filter: "brightness(1.12)",
};

const titleStyle = {
    fontSize: "clamp(1.8rem, 4vw, 2.3rem)",
    fontWeight: 900,
    color: "var(--color-primary-900)",
    margin: 0,
    letterSpacing: "-1px",
    textShadow: "0 2px 8px rgba(0,0,0,0.10)",
    textAlign: "center",
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
};

const subtitleStyle = {
    color: "var(--color-cyan-900)",
    fontSize: "clamp(1rem, 2vw, 1.18rem)",
    maxWidth: "600px",
    margin: "1.2rem auto 0 auto",
    fontWeight: 500,
    lineHeight: 1.6,
    textAlign: "center",
    padding: "0 clamp(0.5rem, 2vw, 1rem)",
    boxSizing: "border-box",
};

const mainStyle = {
    width: "100%",
    maxWidth: "700px",
    margin: "-2.5rem auto 2.5rem auto",
    padding: "clamp(1rem, 3vw, 1.5rem)",
    background: "rgba(255,255,255,0.92)",
    borderRadius: "1.5rem",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
};

const contactInfoStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2.5rem",
    width: "100%",
    justifyItems: "center",
};

const infoCardStyle = {
    background:
        "linear-gradient(135deg, rgba(255,255,255,0.96) 60%, var(--color-cyan-50) 100%)",
    borderRadius: "1rem",
    padding: "1.5rem",
    border: "2px solid var(--color-primary-200)",
    transition: "transform 0.18s, box-shadow 0.18s, border 0.18s",
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: "300px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};

const infoCardHoverStyle = {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    border: "2px solid var(--color-primary-400)",
};

const infoIconStyle = {
    fontSize: "1.8rem",
    color: "var(--color-primary-600)",
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "3rem",
    height: "3rem",
    background:
        "linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-cyan-50) 100%)",
    borderRadius: "50%",
    border: "2px solid var(--color-primary-200)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "transform 0.2s ease",
};

const infoTitleStyle = {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "var(--color-primary-700)",
    marginBottom: "0.5rem",
};

const infoTextStyle = {
    fontSize: "1rem",
    color: "var(--color-gray-700)",
    lineHeight: 1.5,
};

const sectionTitleStyle = {
    fontSize: "clamp(1.2rem, 2.5vw, 1.4rem)",
    fontWeight: 700,
    color: "var(--color-primary-700)",
    margin: "0 0 1.5rem 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.7rem",
    textAlign: "center",
    width: "100%",
};

const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    background:
        "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, var(--color-cyan-25) 50%, var(--color-primary-25) 100%)",
    padding: "clamp(1.5rem, 3vw, 2rem)",
    borderRadius: "1.2rem",
    border: "2px solid var(--color-primary-100)",
    boxShadow:
        "0 8px 24px rgba(0,0,0,0.08), inset 0 1px 3px rgba(255,255,255,0.8)",
    position: "relative",
    boxSizing: "border-box",
};

const inputGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    width: "100%",
};

const labelStyle = {
    fontSize: "clamp(0.85rem, 1.8vw, 0.9rem)",
    fontWeight: 700,
    color: "var(--color-primary-800)",
    marginBottom: "0.5rem",
    textAlign: "left",
    letterSpacing: "0.3px",
    textShadow: "0 1px 2px rgba(0,0,0,0.05)",
};

const inputStyle = {
    padding: "clamp(0.8rem, 2vw, 1rem) clamp(1rem, 2.5vw, 1.2rem)",
    borderRadius: "0.75rem",
    border: "2px solid var(--color-primary-150)",
    fontSize: "clamp(0.9rem, 2vw, 1rem)",
    background:
        "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
    color: "var(--color-gray-900)",
    transition: "all 0.2s ease",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.05)",
};

const inputFocusStyle = {
    borderColor: "var(--color-primary-400)",
    boxShadow:
        "0 0 0 3px rgba(59, 130, 246, 0.1), inset 0 2px 4px rgba(0,0,0,0.03), 0 4px 12px rgba(0,0,0,0.08)",
    background:
        "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(251,252,254,1) 100%)",
    transform: "translateY(-1px)",
};

const textareaStyle = {
    ...inputStyle,
    minHeight: "120px",
    resize: "vertical",
    fontFamily: "inherit",
};

const buttonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.7rem",
    background: "var(--color-primary-600)",
    color: "white",
    border: "2px solid var(--color-primary-600)",
    borderRadius: "0.75rem",
    padding: "clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)",
    fontWeight: 700,
    fontSize: "clamp(0.9rem, 2vw, 1rem)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginTop: "0.5rem",
    width: "fit-content",
    alignSelf: "center",
    letterSpacing: "0.3px",
};

const buttonHoverStyle = {
    background: "var(--color-primary-700)",
    borderColor: "var(--color-primary-700)",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
};

const successMessageStyle = {
    background:
        "linear-gradient(135deg, var(--color-primary-50), var(--color-cyan-50))",
    border: "2px solid var(--color-primary-200)",
    borderRadius: "1rem",
    padding: "1.5rem",
    marginTop: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    color: "var(--color-primary-700)",
    fontWeight: 600,
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    width: "100%",
    boxSizing: "border-box",
    textAlign: "center",
    flexDirection: "column",
};

const successMessageContentStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    flexWrap: "wrap",
    justifyContent: "center",
};

const DashboardContact = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [iconHovered, setIconHovered] = useState(false);
    const [buttonHovered, setButtonHovered] = useState(false);
    const [cardHovered, setCardHovered] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (form.name && form.email && form.message) {
            setSubmitted(true);
            // Reset form after 3 seconds
            setTimeout(() => {
                setForm({ name: "", email: "", message: "" });
                setSubmitted(false);
            }, 3000);
        }
    };

    const contactInfo = [
        {
            title: "Email",
            text: "support@focusflow.com",
            description: "Send us an email anytime",
        },
        {
            title: "Phone",
            text: "+1 (555) 123-4567",
            description: "Mon-Fri, 9AM-5PM EST",
        },
    ];

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
                            <FaEnvelope
                                style={{
                                    fontSize: "clamp(2rem, 4vw, 2.5rem)",
                                    color: "white",
                                }}
                            />
                        </div>
                        <h1 style={titleStyle}>Contact Us</h1>
                    </div>
                    <p style={subtitleStyle}>
                        Have a question or feedback? Reach out to the FocusFlow
                        team below. We'd love to hear from you!
                    </p>
                </section>

                <main style={mainStyle}>
                    {/* Contact Information Cards */}
                    <div style={contactInfoStyle}>
                        {contactInfo.map((info, idx) => (
                            <div
                                key={idx}
                                style={
                                    cardHovered === idx
                                        ? {
                                              ...infoCardStyle,
                                              ...infoCardHoverStyle,
                                          }
                                        : infoCardStyle
                                }
                                onMouseEnter={() => setCardHovered(idx)}
                                onMouseLeave={() => setCardHovered(null)}
                            >
                                <div style={infoIconStyle}>
                                    {idx === 0 ? <FaEnvelope /> : <FaPhone />}
                                </div>
                                <div style={infoTitleStyle}>{info.title}</div>
                                <div style={infoTextStyle}>
                                    <strong>{info.text}</strong>
                                    <br />
                                    <span
                                        style={{
                                            fontSize:
                                                "clamp(0.85rem, 1.8vw, 0.9rem)",
                                            opacity: 0.8,
                                        }}
                                    >
                                        {info.description}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div
                        style={{
                            ...sectionTitleStyle,
                            marginBottom: "2rem",
                            position: "relative",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "0",
                                right: "0",
                                height: "2px",
                                background:
                                    "linear-gradient(90deg, transparent 0%, var(--color-primary-200) 30%, var(--color-primary-300) 50%, var(--color-primary-200) 70%, transparent 100%)",
                                zIndex: -1,
                                transform: "translateY(-50%)",
                            }}
                        ></div>
                        <div
                            style={{
                                background: "rgba(255,255,255,0.9)",
                                padding: "0 1rem",
                                borderRadius: "0.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.7rem",
                            }}
                        >
                            <FaPaperPlane style={{ fontSize: "1.2rem" }} />
                            Send us a Message
                        </div>
                    </div>

                    <div style={formStyle}>
                        <div style={inputGroupStyle}>
                            <div style={labelStyle}>Your Name</div>
                            <input
                                style={
                                    focusedInput === "name"
                                        ? { ...inputStyle, ...inputFocusStyle }
                                        : inputStyle
                                }
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={form.name}
                                onChange={handleChange}
                                onFocus={() => setFocusedInput("name")}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </div>

                        <div style={inputGroupStyle}>
                            <div style={labelStyle}>Your Email</div>
                            <input
                                style={
                                    focusedInput === "email"
                                        ? { ...inputStyle, ...inputFocusStyle }
                                        : inputStyle
                                }
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                value={form.email}
                                onChange={handleChange}
                                onFocus={() => setFocusedInput("email")}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </div>

                        <div style={inputGroupStyle}>
                            <div style={labelStyle}>Your Message</div>
                            <textarea
                                style={
                                    focusedInput === "message"
                                        ? {
                                              ...textareaStyle,
                                              ...inputFocusStyle,
                                          }
                                        : textareaStyle
                                }
                                name="message"
                                placeholder="Tell us how we can help you..."
                                value={form.message}
                                onChange={handleChange}
                                onFocus={() => setFocusedInput("message")}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </div>

                        <button
                            style={
                                buttonHovered
                                    ? { ...buttonStyle, ...buttonHoverStyle }
                                    : buttonStyle
                            }
                            onMouseEnter={() => setButtonHovered(true)}
                            onMouseLeave={() => setButtonHovered(false)}
                            onClick={handleSubmit}
                        >
                            <FaPaperPlane style={{ fontSize: "0.9rem" }} />
                            Send Message
                        </button>
                    </div>

                    {submitted && (
                        <div style={successMessageStyle}>
                            <div style={successMessageContentStyle}>
                                <FaCheckCircle
                                    style={{
                                        fontSize: "1.5rem",
                                        color: "var(--color-primary-600)",
                                    }}
                                />
                                <div>
                                    <strong>Message sent successfully!</strong>
                                    <br />
                                    Thank you for reaching out. We'll get back
                                    to you within 24 hours.
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
};

export default DashboardContact;
