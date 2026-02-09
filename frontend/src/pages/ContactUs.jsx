import React, { useState } from "react";
import useResponsive from "../hooks/useResponsive";

const ContactUs = () => {
    const { isMobile } = useResponsive();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted:", formData);
    };

    const containerStyle = {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: isMobile ? "1rem" : "2rem",
    };

    const headerStyle = {
        marginBottom: isMobile ? "1.5rem" : "3rem",
        textAlign: "center",
    };

    const titleStyle = {
        fontSize: isMobile ? "1.75rem" : "2.25rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "1rem",
    };

    const subtitleStyle = {
        fontSize: "1.125rem",
        color: "var(--color-gray-600)",
        maxWidth: "36rem",
        margin: "0 auto",
    };

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))",
        gap: isMobile ? "1rem" : "2rem",
        marginBottom: isMobile ? "1.5rem" : "3rem",
    };

    const contactCardStyle = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "2rem",
        boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
    };

    const iconStyle = {
        width: "2.5rem",
        height: "2.5rem",
        color: "var(--color-primary-600)",
        marginBottom: "1rem",
        fontSize: "2.5rem",
    };

    const cardTitleStyle = {
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const cardTextStyle = {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.5",
    };

    const formContainerStyle = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: isMobile ? "1.5rem" : "2rem",
        boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        marginBottom: "2rem",
    };

    const formTitleStyle = {
        fontSize: "1.5rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "1.5rem",
    };

    const formGroupStyle = {
        marginBottom: "1.5rem",
    };

    const labelStyle = {
        display: "block",
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "var(--color-gray-700)",
        marginBottom: "0.5rem",
    };

    const inputStyle = {
        width: "100%",
        padding: "0.75rem",
        fontSize: "1rem",
        border: "1px solid var(--color-gray-300)",
        borderRadius: "0.375rem",
        color: "var(--color-gray-900)",
        backgroundColor: "var(--color-white)",
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
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Contact Us</h1>
                <p style={subtitleStyle}>
                    Have questions or feedback? We'd love to hear from you.
                    Choose the most convenient way to reach out to our team.
                </p>
            </div>

            <div style={gridStyle}>
                <div style={contactCardStyle}>
                    <div style={iconStyle}>📧</div>
                    <h3 style={cardTitleStyle}>Email Us</h3>
                    <p style={cardTextStyle}>support@focusflow.com</p>
                    <p style={cardTextStyle}>We'll respond within 24 hours</p>
                </div>

                <div style={contactCardStyle}>
                    <div style={iconStyle}>📞</div>
                    <h3 style={cardTitleStyle}>Call Us</h3>
                    <p style={cardTextStyle}>+1 (555) 123-4567</p>
                    <p style={cardTextStyle}>Monday - Friday, 9am - 5pm EST</p>
                </div>

                <div style={contactCardStyle}>
                    <div style={iconStyle}>📍</div>
                    <h3 style={cardTitleStyle}>Visit Us</h3>
                    <p style={cardTextStyle}>123 Productivity Street</p>
                    <p style={cardTextStyle}>Tech City, TC 12345</p>
                </div>
            </div>

            <div style={formContainerStyle}>
                <h2 style={formTitleStyle}>Send us a Message</h2>
                <form onSubmit={handleSubmit}>
                    <div style={gridStyle}>
                        <div style={formGroupStyle}>
                            <label style={labelStyle}>Your Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                style={inputStyle}
                                required
                            />
                        </div>

                        <div style={formGroupStyle}>
                            <label style={labelStyle}>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                style={inputStyle}
                                required
                            />
                        </div>
                    </div>

                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Subject</label>
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
                            <option value="Billing Question">
                                Billing Question
                            </option>
                            <option value="Feedback">Feedback</option>
                        </select>
                    </div>

                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            style={textareaStyle}
                            required
                        />
                    </div>

                    <button type="submit" style={buttonStyle}>
                        Send Message
                    </button>
                </form>
            </div>

            <div style={contactCardStyle}>
                <div style={iconStyle}>💬</div>
                <h3 style={cardTitleStyle}>Live Chat Support</h3>
                <p style={cardTextStyle}>
                    Available Monday - Friday, 9am - 5pm EST
                </p>
                <p style={cardTextStyle}>
                    Click the chat icon in the bottom right corner to start a
                    conversation
                </p>
            </div>
        </div>
    );
};

export default ContactUs;
