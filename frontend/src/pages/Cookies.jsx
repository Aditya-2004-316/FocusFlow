import React from "react";
import {
    ShieldCheckIcon,
    AdjustmentsHorizontalIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/outline";

const Cookies = () => {
    const containerStyle = {
        maxWidth: "64rem",
        margin: "2rem auto",
        padding: "0 1rem",
    };

    const headerStyle = {
        marginBottom: "3rem",
        textAlign: "center",
    };

    const titleStyle = {
        fontSize: "2.25rem",
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

    const sectionStyle = {
        marginBottom: "3rem",
    };

    const sectionTitleStyle = {
        fontSize: "1.5rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
    };

    const sectionIconStyle = {
        width: "1.75rem",
        height: "1.75rem",
        color: "var(--color-primary-600)",
    };

    const cardStyle = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        marginBottom: "1.5rem",
    };

    const cardTitleStyle = {
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "0.75rem",
    };

    const cardDescriptionStyle = {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.5",
        marginBottom: "1rem",
    };

    const listStyle = {
        listStyle: "none",
        padding: 0,
        margin: 0,
    };

    const listItemStyle = {
        display: "flex",
        alignItems: "flex-start",
        gap: "0.75rem",
        padding: "1rem 0",
        borderBottom: "1px solid var(--color-gray-200)",
    };

    const listItemIconStyle = {
        width: "1.25rem",
        height: "1.25rem",
        color: "var(--color-primary-600)",
        marginTop: "0.25rem",
    };

    const listItemContentStyle = {
        flex: 1,
    };

    const listItemTitleStyle = {
        fontSize: "1rem",
        fontWeight: 500,
        color: "var(--color-gray-900)",
        marginBottom: "0.25rem",
    };

    const listItemDescriptionStyle = {
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.5",
    };

    const cookieTypes = [
        {
            title: "Essential Cookies",
            description:
                "These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas.",
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
            <header style={headerStyle}>
                <h1 style={titleStyle}>Cookie Policy</h1>
                <p style={subtitleStyle}>
                    Learn about how we use cookies and how you can control your
                    preferences.
                </p>
            </header>

            <section style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                    <InformationCircleIcon style={sectionIconStyle} />
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
            </section>

            <section style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                    <ShieldCheckIcon style={sectionIconStyle} />
                    Types of Cookies We Use
                </h2>
                <div>
                    {cookieTypes.map((type, index) => (
                        <div key={index} style={cardStyle}>
                            <h3 style={cardTitleStyle}>{type.title}</h3>
                            <p style={cardDescriptionStyle}>
                                {type.description}
                            </p>
                            <p style={cardDescriptionStyle}>
                                <strong>Examples:</strong>{" "}
                                {type.examples.join(", ")}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section style={sectionStyle}>
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
                        placed. If you do this, however, you may have to
                        manually adjust some preferences every time you visit a
                        site, and some services and functions may not work.
                    </p>
                    <ul style={listStyle}>
                        <li style={listItemStyle}>
                            <InformationCircleIcon style={listItemIconStyle} />
                            <div style={listItemContentStyle}>
                                <h4 style={listItemTitleStyle}>
                                    Browser Settings
                                </h4>
                                <p style={listItemDescriptionStyle}>
                                    Most browsers allow you to control cookies
                                    through their settings preferences. Look for
                                    the "Privacy" or "Security" section in your
                                    browser's settings.
                                </p>
                            </div>
                        </li>
                        <li style={listItemStyle}>
                            <InformationCircleIcon style={listItemIconStyle} />
                            <div style={listItemContentStyle}>
                                <h4 style={listItemTitleStyle}>
                                    Third-Party Tools
                                </h4>
                                <p style={listItemDescriptionStyle}>
                                    You can also use third-party tools to manage
                                    cookies and tracking technologies.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            <section style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                    <InformationCircleIcon style={sectionIconStyle} />
                    Updates to This Policy
                </h2>
                <div style={cardStyle}>
                    <p style={cardDescriptionStyle}>
                        We may update this Cookie Policy from time to time to
                        reflect changes in our practices or for other
                        operational, legal, or regulatory reasons. We will
                        notify you of any material changes by posting the new
                        Cookie Policy on this page.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Cookies;
