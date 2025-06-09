import React from "react";
import {
    ChatBubbleLeftRightIcon,
    EnvelopeIcon,
    BookOpenIcon,
    VideoCameraIcon,
    PhoneIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";

const Support = () => {
    const containerStyle: CSSProperties = {
        maxWidth: "64rem",
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
        gap: "1.5rem",
        marginBottom: "3rem",
    };

    const cardStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        transition: "transform 0.2s ease-in-out",
        cursor: "pointer",
    };

    const cardHoverStyle: CSSProperties = {
        ...cardStyle,
        ":hover": {
            transform: "translateY(-4px)",
        },
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
        marginBottom: "0.75rem",
    };

    const cardDescriptionStyle: CSSProperties = {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.5",
        marginBottom: "1rem",
    };

    const linkStyle: CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        color: "var(--color-primary-600)",
        fontSize: "0.875rem",
        fontWeight: 500,
        textDecoration: "none",
        marginTop: "auto",
    };

    const sectionStyle: CSSProperties = {
        marginBottom: "3rem",
    };

    const sectionTitleStyle: CSSProperties = {
        fontSize: "1.5rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "1.5rem",
    };

    const faqStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        marginBottom: "1rem",
        boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    };

    const faqQuestionStyle: CSSProperties = {
        fontSize: "1.125rem",
        fontWeight: 500,
        color: "var(--color-gray-900)",
        marginBottom: "0.75rem",
    };

    const faqAnswerStyle: CSSProperties = {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.5",
    };

    const supportOptions = [
        {
            icon: <ChatBubbleLeftRightIcon style={iconStyle} />,
            title: "Live Chat",
            description:
                "Get instant help from our support team through live chat. Available 24/7.",
            link: "Start Chat",
        },
        {
            icon: <EnvelopeIcon style={iconStyle} />,
            title: "Email Support",
            description:
                "Send us an email and we'll get back to you within 24 hours.",
            link: "Send Email",
        },
        {
            icon: <BookOpenIcon style={iconStyle} />,
            title: "Documentation",
            description: "Browse our comprehensive documentation and guides.",
            link: "View Docs",
        },
        {
            icon: <VideoCameraIcon style={iconStyle} />,
            title: "Video Tutorials",
            description:
                "Watch step-by-step video tutorials to learn more about FocusFlow.",
            link: "Watch Videos",
        },
        {
            icon: <PhoneIcon style={iconStyle} />,
            title: "Phone Support",
            description:
                "Speak directly with our support team during business hours.",
            link: "Call Us",
        },
    ];

    const faqs = [
        {
            question: "How do I reset my password?",
            answer: "You can reset your password by clicking the 'Forgot Password' link on the login page. We'll send you an email with instructions to create a new password.",
        },
        {
            question: "What are the system requirements?",
            answer: "FocusFlow works on any modern web browser. We recommend using the latest version of Chrome, Firefox, Safari, or Edge for the best experience.",
        },
        {
            question: "How do I export my data?",
            answer: "You can export your data by going to Settings > Data Management > Export Data. This will download a JSON file containing all your FocusFlow data.",
        },
        {
            question: "Is my data secure?",
            answer: "Yes, we take data security very seriously. All data is encrypted in transit and at rest. We use industry-standard security practices to protect your information.",
        },
    ];

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Support Center</h1>
                <p style={subtitleStyle}>
                    We're here to help you get the most out of FocusFlow. Choose
                    the support option that works best for you.
                </p>
            </div>

            <div style={gridStyle}>
                {supportOptions.map((option, index) => (
                    <div key={index} style={cardHoverStyle}>
                        {option.icon}
                        <h3 style={cardTitleStyle}>{option.title}</h3>
                        <p style={cardDescriptionStyle}>{option.description}</p>
                        <a href="#" style={linkStyle}>
                            {option.link}
                            <ArrowRightIcon
                                style={{ width: "1rem", height: "1rem" }}
                            />
                        </a>
                    </div>
                ))}
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Frequently Asked Questions</h2>
                {faqs.map((faq, index) => (
                    <div key={index} style={faqStyle}>
                        <h3 style={faqQuestionStyle}>{faq.question}</h3>
                        <p style={faqAnswerStyle}>{faq.answer}</p>
                    </div>
                ))}
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Still Need Help?</h2>
                <div style={cardStyle}>
                    <p style={cardDescriptionStyle}>
                        If you couldn't find what you're looking for, our
                        support team is always ready to help. Contact us through
                        any of the channels above, and we'll get back to you as
                        soon as possible.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Support;
