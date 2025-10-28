import React, { useState } from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../styles/CardHover.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const cardStyle = {
        background: "rgba(30, 41, 59, 0.5)",
        backdropFilter: "blur(8px)",
        borderRadius: "1rem",
        border: "1px solid #334155",
        padding: "2rem",
        marginBottom: "2rem",
        textAlign: "center",
        transition: "all 0.3s ease",
    };

    const inputStyle = {
        width: "100%",
        padding: "0.75rem",
        fontSize: "1rem",
        border: "1px solid #334155",
        borderRadius: "0.375rem",
        color: "#ffffff",
        backgroundColor: "rgba(30, 41, 59, 0.5)",
        marginBottom: "1.2rem",
    };

    const textareaStyle = {
        ...inputStyle,
        minHeight: "8rem",
        resize: "vertical",
    };

    const buttonStyle = {
        background: "#38bdf8",
        color: "#ffffff",
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
        fontWeight: 500,
        borderRadius: "0.375rem",
        border: "none",
        cursor: "pointer",
        width: "100%",
        marginTop: "0.5rem",
    };

    return (
        <div style={{ background: "#0f172a", minHeight: "100vh", color: "#ffffff" }}>
            <LandingNavbar />
            <section
                style={{
                    padding: "5rem 2rem 2rem 2rem",
                    textAlign: "center",
                }}
            >
                <h1
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: 700,
                        marginBottom: "1rem",
                        background: "linear-gradient(to right, #38bdf8, #818cf8)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    Contact Us
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
                    Have a question, suggestion, or just want to say hello? We’d
                    love to hear from you!
                </p>
            </section>
            <main
                style={{
                    maxWidth: 1200,
                    margin: "-2.5rem auto 2rem auto",
                    padding: "1rem",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gap: "1.5rem",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    }}
                >
                    <div className="hover-card" style={cardStyle}>
                        <h2
                            style={{
                                color: "#38bdf8",
                                fontWeight: 600,
                                fontSize: "1.15rem",
                                marginBottom: 12,
                            }}
                        >
                            Send us a Message
                        </h2>
                        {submitted ? (
                            <div
                                style={{
                                    color: "#38bdf8",
                                    fontWeight: 600,
                                    fontSize: "1.1rem",
                                    padding: "2rem 0",
                                }}
                            >
                                Thank you for reaching out! We'll get back to you soon.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ maxWidth: 520, margin: "0 auto" }}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    required
                                />
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    required
                                >
                                    <option value="">Select a subject</option>
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Technical Support">Technical Support</option>
                                    <option value="Feedback">Feedback</option>
                                </select>
                                <textarea
                                    name="message"
                                    placeholder="Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    style={textareaStyle}
                                    required
                                />
                                <button type="submit" style={buttonStyle}>Send Message</button>
                            </form>
                        )}
                    </div>

                    <div className="hover-card" style={cardStyle}>
                        <h2
                            style={{
                                color: "#38bdf8",
                                fontWeight: 600,
                                fontSize: "1.15rem",
                                marginBottom: 12,
                            }}
                        >
                            Contact Details
                        </h2>
                        <div style={{ color: "#94a3b8", fontSize: "1.05rem", lineHeight: 1.8, textAlign: "left", maxWidth: 520, margin: "0 auto" }}>
                            <p style={{ margin: 0 }}>
                                <strong style={{ color: "#ffffff" }}>General:</strong>
                                {" "}
                                <a href="mailto:hello@focusflow.com" style={{ color: "#38bdf8", textDecoration: "underline" }}>hello@focusflow.com</a>
                            </p>
                            <p style={{ margin: 0 }}>
                                <strong style={{ color: "#ffffff" }}>Support:</strong>
                                {" "}
                                <a href="mailto:support@focusflow.com" style={{ color: "#38bdf8", textDecoration: "underline" }}>support@focusflow.com</a>
                            </p>
                            <p style={{ margin: 0 }}>
                                <strong style={{ color: "#ffffff" }}>Press:</strong>
                                {" "}
                                <a href="mailto:press@focusflow.com" style={{ color: "#38bdf8", textDecoration: "underline" }}>press@focusflow.com</a>
                            </p>
                            <p style={{ margin: 0 }}>
                                <strong style={{ color: "#ffffff" }}>Partnerships:</strong>
                                {" "}
                                <a href="mailto:partners@focusflow.com" style={{ color: "#38bdf8", textDecoration: "underline" }}>partners@focusflow.com</a>
                            </p>

                            <div style={{ height: 12 }} />

                            <p style={{ margin: 0 }}>
                                <strong style={{ color: "#ffffff" }}>Office hours:</strong> Mon–Fri, 9:00–18:00
                            </p>
                            <p style={{ margin: 0 }}>
                                <strong style={{ color: "#ffffff" }}>Response time:</strong> within 2 business days
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <LandingFooter />
        </div>
    );
};

export default Contact;
