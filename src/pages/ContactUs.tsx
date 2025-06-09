import React, { useState } from "react";
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted:", formData);
    };

    const containerStyle: CSSProperties = {
        minWidth: "64rem",
        margin: "2rem auto",
        padding: "0 1rem",
    };

    const headerStyle: CSSProperties = {
        marginBottom: "3rem",
        textAlign: "center",
    };

    const titleStyle: CSSProperties = {
        fontSize: "2.25rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "1rem",
    };

    const subtitleStyle: CSSProperties = {
        fontSize: "1.125rem",
        color: "var(--color-gray-600)",
        maxWidth: "36rem",
        margin: "0 auto",
    };

    const gridStyle: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "2rem",
        marginBottom: "3rem",
    };

    const contactCardStyle: CSSProperties = {
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

    const iconStyle: CSSProperties = {
        width: "2.5rem",
        height: "2.5rem",
        color: "var(--color-primary-600)",
        marginBottom: "1rem",
    };

    const cardTitleStyle: CSSProperties = {
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const cardTextStyle: CSSProperties = {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.5",
    };

    const formContainerStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "2rem",
        boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    };

    const formTitleStyle: CSSProperties = {
        fontSize: "1.5rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "1.5rem",
    };

    const formGroupStyle: CSSProperties = {
        marginBottom: "1.5rem",
    };

    const labelStyle: CSSProperties = {
        display: "block",
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "var(--color-gray-700)",
        marginBottom: "0.5rem",
    };

    const inputStyle: CSSProperties = {
        width: "100%",
        padding: "0.75rem",
        fontSize: "1rem",
        border: "1px solid var(--color-gray-300)",
        borderRadius: "0.375rem",
        color: "var(--color-gray-900)",
        backgroundColor: "var(--color-white)",
    };

    const textareaStyle: CSSProperties = {
        ...inputStyle,
        minHeight: "8rem",
        resize: "vertical",
    };

    const buttonStyle: CSSProperties = {
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
                    <EnvelopeIcon style={iconStyle} />
                    <h3 style={cardTitleStyle}>Email Us</h3>
                    <p style={cardTextStyle}>
                        support@focusflow.com
                        <br />
                        We'll respond within 24 hours
                    </p>
                </div>

                <div style={contactCardStyle}>
                    <PhoneIcon style={iconStyle} />
                    <h3 style={cardTitleStyle}>Call Us</h3>
                    <p style={cardTextStyle}>
                        +1 (555) 123-4567
                        <br />
                        Monday - Friday, 9am - 5pm EST
                    </p>
                </div>

                <div style={contactCardStyle}>
                    <MapPinIcon style={iconStyle} />
                    <h3 style={cardTitleStyle}>Visit Us</h3>
                    <p style={cardTextStyle}>
                        123 Productivity Street
                        <br />
                        Tech City, TC 12345
                    </p>
                </div>
            </div>

            <div style={formContainerStyle}>
                <h2 style={formTitleStyle}>Send us a Message</h2>
                <form onSubmit={handleSubmit}>
                    <div style={gridStyle}>
                        <div style={formGroupStyle}>
                            <label htmlFor="name" style={labelStyle}>
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                style={inputStyle}
                                required
                            />
                        </div>

                        <div style={formGroupStyle}>
                            <label htmlFor="email" style={labelStyle}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                style={inputStyle}
                                required
                            />
                        </div>
                    </div>

                    <div style={formGroupStyle}>
                        <label htmlFor="subject" style={labelStyle}>
                            Subject
                        </label>
                        <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            style={inputStyle}
                            required
                        >
                            <option value="">Select a subject</option>
                            <option value="general">General Inquiry</option>
                            <option value="support">Technical Support</option>
                            <option value="billing">Billing Question</option>
                            <option value="feedback">Feedback</option>
                        </select>
                    </div>

                    <div style={formGroupStyle}>
                        <label htmlFor="message" style={labelStyle}>
                            Message
                        </label>
                        <textarea
                            id="message"
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

            <div style={{ marginTop: "3rem", textAlign: "center" }}>
                <ChatBubbleLeftRightIcon
                    style={{ ...iconStyle, marginBottom: "1rem" }}
                />
                <h3 style={cardTitleStyle}>Live Chat Support</h3>
                <p style={cardTextStyle}>
                    Available Monday - Friday, 9am - 5pm EST
                    <br />
                    Click the chat icon in the bottom right corner to start a
                    conversation
                </p>
            </div>
        </div>
    );
};

export default ContactUs;
