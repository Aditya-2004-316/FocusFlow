import React from "react";
import {
    ShieldCheckIcon,
    AdjustmentsHorizontalIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";

const Cookies = () => {
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

    const sectionStyle: CSSProperties = {
        marginBottom: "3rem",
    };

    const sectionTitleStyle: CSSProperties = {
        fontSize: "1.5rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
    };

    const sectionIconStyle: CSSProperties = {
        width: "1.75rem",
        height: "1.75rem",
        color: "var(--color-primary-600)",
    };

    const cardStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        marginBottom: "1.5rem",
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

    const listStyle: CSSProperties = {
        listStyle: "none",
        padding: 0,
        margin: 0,
    };

    const listItemStyle: CSSProperties = {
        display: "flex",
        alignItems: "flex-start",
        gap: "0.75rem",
        padding: "1rem 0",
        borderBottom: "1px solid var(--color-gray-200)",
    };

    const listItemIconStyle: CSSProperties = {
        width: "1.25rem",
        height: "1.25rem",
        color: "var(--color-primary-600)",
        marginTop: "0.25rem",
    };

    const listItemContentStyle: CSSProperties = {
        flex: 1,
    };

    const listItemTitleStyle: CSSProperties = {
        fontSize: "1rem",
        fontWeight: 500,
        color: "var(--color-gray-900)",
        marginBottom: "0.25rem",
    };

    const listItemDescriptionStyle: CSSProperties = {
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.5",
    };

    const cookieTypes = [
        {
            title: "Essential Cookies",
            description:
                "These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.",
            examples: [
                "Session management",
                "Security features",
                "Basic functionality",
            ],
        },
        {
            title: "Analytics Cookies",
            description:
                "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
            examples: ["Page views", "User behavior", "Performance metrics"],
        },
        {
            title: "Preference Cookies",
            description:
                "These cookies enable the website to remember information that changes the way the website behaves or looks, like your preferred language or region.",
            examples: [
                "Language settings",
                "Theme preferences",
                "Custom settings",
            ],
        },
        {
            title: "Marketing Cookies",
            description:
                "These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.",
            examples: [
                "Ad targeting",
                "Social media integration",
                "Marketing campaigns",
            ],
        },
    ];

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Cookie Policy</h1>
                <p style={subtitleStyle}>
                    Learn about how we use cookies and how you can control your
                    preferences.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                    <ShieldCheckIcon style={sectionIconStyle} />
                    What Are Cookies?
                </h2>
                <div style={cardStyle}>
                    <p style={cardDescriptionStyle}>
                        Cookies are small text files that are stored on your
                        computer or mobile device when you visit our website.
                        They help us make your experience better by remembering
                        your preferences and providing essential functionality.
                    </p>
                </div>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                    <ShieldCheckIcon style={sectionIconStyle} />
                    Types of Cookies We Use
                </h2>
                <ul style={listStyle}>
                    {cookieTypes.map((type, index) => (
                        <li key={index} style={listItemStyle}>
                            <InformationCircleIcon style={listItemIconStyle} />
                            <div style={listItemContentStyle}>
                                <h3 style={listItemTitleStyle}>{type.title}</h3>
                                <p style={listItemDescriptionStyle}>
                                    {type.description}
                                </p>
                                <p style={listItemDescriptionStyle}>
                                    <strong>Examples:</strong>{" "}
                                    {type.examples.join(", ")}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                    <AdjustmentsHorizontalIcon style={sectionIconStyle} />
                    Managing Your Cookie Preferences
                </h2>
                <div style={cardStyle}>
                    <h3 style={cardTitleStyle}>How to Control Cookies</h3>
                    <p style={cardDescriptionStyle}>
                        You can control and/or delete cookies as you wish. You
                        can delete all cookies that are already on your computer
                        and you can set most browsers to prevent them from being
                        placed. However, if you do this, you may have to
                        manually adjust some preferences every time you visit
                        our website and some services and functionalities may
                        not work.
                    </p>
                </div>
                <div style={cardStyle}>
                    <h3 style={cardTitleStyle}>Browser Settings</h3>
                    <p style={cardDescriptionStyle}>
                        Most web browsers allow you to control cookies through
                        their settings preferences. To learn more about cookies
                        and how to manage them, visit www.internetcookies.org.
                        Please note that if you disable cookies, some features
                        of our website may not function properly.
                    </p>
                </div>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                    <ShieldCheckIcon style={sectionIconStyle} />
                    Updates to This Policy
                </h2>
                <div style={cardStyle}>
                    <p style={cardDescriptionStyle}>
                        We may update this Cookie Policy from time to time to
                        reflect changes in our practices or for other
                        operational, legal, or regulatory reasons. The date at
                        the top of this policy indicates when it was last
                        updated.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Cookies;
