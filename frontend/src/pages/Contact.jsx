import React, { useState } from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";

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
        background: "var(--color-white)",
        borderRadius: "1rem",
        boxShadow: "var(--shadow-soft)",
        padding: "2rem",
        marginBottom: "2rem",
        textAlign: "center",
    };

    const inputStyle = {
        width: "100%",
        padding: "0.75rem",
        fontSize: "1rem",
        border: "1px solid var(--color-gray-300)",
        borderRadius: "0.375rem",
        color: "var(--color-gray-900)",
        backgroundColor: "var(--color-white)",
        marginBottom: "1.2rem",
    };

    const textareaStyle = {
        ...inputStyle,
        minHeight: "8rem",
        resize: "vertical",
    };

    const buttonStyle = {
        background: "var(--color-primary-600)",
        color: "var(--color-white)",
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
        <div style={{ background: "var(--color-gray-50)", minHeight: "100vh" }}>
            <LandingNavbar />
            <section
                style={{
                    background:
                        "linear-gradient(90deg, var(--color-primary-400) 0%, var(--color-cyan-300) 100%)",
                    padding: "3rem 1rem 2rem 1rem",
                    textAlign: "center",
                }}
            >
                <h1
                    style={{
                        fontSize: "2.2rem",
                        fontWeight: 800,
                        color: "var(--color-primary-900)",
                        marginBottom: "0.7rem",
                    }}
                >
                    Contact Us
                </h1>
                <p
                    style={{
                        color: "var(--color-primary-900)",
                        fontSize: "1.15rem",
                        maxWidth: 600,
                        margin: "0 auto",
                    }}
                >
                    Have a question, suggestion, or just want to say hello? We’d
                    love to hear from you!
                </p>
            </section>
            <main
                style={{
                    maxWidth: 700,
                    margin: "-2.5rem auto 2rem auto",
                    padding: "1rem",
                }}
            >
                <div style={cardStyle}>
                    <h2
                        style={{
                            color: "var(--color-primary-700)",
                            fontWeight: 700,
                            fontSize: "1.15rem",
                            marginBottom: 12,
                        }}
                    >
                        Send us a Message
                    </h2>
                    {submitted ? (
                        <div
                            style={{
                                color: "var(--color-primary-700)",
                                fontWeight: 600,
                                fontSize: "1.1rem",
                                padding: "2rem 0",
                            }}
                        >
                            Thank you for reaching out! We'll get back to you
                            soon.
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            style={{ maxWidth: 500, margin: "0 auto" }}
                        >
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
                                <option value="General Inquiry">
                                    General Inquiry
                                </option>
                                <option value="Technical Support">
                                    Technical Support
                                </option>
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
                            <button type="submit" style={buttonStyle}>
                                Send Message
                            </button>
                        </form>
                    )}
                </div>
                <div style={cardStyle}>
                    <h2
                        style={{
                            color: "var(--color-primary-700)",
                            fontWeight: 700,
                            fontSize: "1.15rem",
                            marginBottom: 12,
                        }}
                    >
                        Email
                    </h2>
                    <a
                        href="mailto:focusflow@studentproject.com"
                        style={{
                            color: "var(--color-primary-600)",
                            fontSize: "1.1rem",
                            textDecoration: "underline",
                        }}
                    >
                        focusflow@studentproject.com
                    </a>
                    <p
                        style={{
                            color: "var(--color-gray-700)",
                            fontSize: "1.05rem",
                            marginTop: 18,
                        }}
                    >
                        We aim to respond to all messages within 2 business
                        days.
                    </p>
                </div>
            </main>
            <LandingFooter />
        </div>
    );
};

export default Contact;
