import React from "react";

const TermsOfService = () => {
    const containerStyle = {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
    };

    const headerStyle = {
        marginBottom: "3rem",
        textAlign: "center",
    };

    const titleStyle = {
        fontSize: "2.25rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const dateStyle = {
        fontSize: "1rem",
        color: "var(--color-gray-500)",
    };

    const sectionStyle = {
        marginBottom: "3rem",
    };

    const sectionTitleStyle = {
        fontSize: "1.5rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "1rem",
    };

    const paragraphStyle = {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.75",
        marginBottom: "1rem",
    };

    const listStyle = {
        listStyle: "none",
        padding: 0,
        margin: "1rem 0",
    };

    const listItemStyle = {
        position: "relative",
        paddingLeft: "1.5rem",
        marginBottom: "0.75rem",
        fontSize: "1rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.5",
    };

    const listItemMarkerStyle = {
        position: "absolute",
        left: 0,
        top: "0.75rem",
        width: "0.5rem",
        height: "0.5rem",
        borderRadius: "50%",
        backgroundColor: "var(--color-primary-600)",
    };

    const warningBoxStyle = {
        background: "var(--color-yellow-50)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        marginBottom: "1.5rem",
        border: "1px solid var(--color-yellow-200)",
    };

    const warningTextStyle = {
        fontSize: "1.125rem",
        color: "var(--color-yellow-700)",
        lineHeight: "1.75",
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Terms of Service</h1>
                <p style={dateStyle}>Last Updated: March 15, 2024</p>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Agreement to Terms</h2>
                <p style={paragraphStyle}>
                    By accessing and using FocusFlow, you agree to be bound by
                    these Terms of Service and all applicable laws and
                    regulations. If you do not agree with any of these terms,
                    you are prohibited from using or accessing this application.
                </p>
                <div style={warningBoxStyle}>
                    <p style={warningTextStyle}>
                        Please read these terms carefully before using our
                        application. Your continued use of FocusFlow constitutes
                        your acceptance of these terms.
                    </p>
                </div>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>User Accounts</h2>
                <p style={paragraphStyle}>
                    When you create an account with us, you must provide
                    accurate and complete information. You are responsible for
                    maintaining the security of your account and password.
                </p>
                <ul style={listStyle}>
                    <li style={listItemStyle}>
                        <div style={listItemMarkerStyle}></div>
                        You must be at least 13 years old to use this
                        application
                    </li>
                    <li style={listItemStyle}>
                        <div style={listItemMarkerStyle}></div>
                        You are responsible for all activities that occur under
                        your account
                    </li>
                    <li style={listItemStyle}>
                        <div style={listItemMarkerStyle}></div>
                        You must notify us immediately of any unauthorized use
                        of your account
                    </li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Intellectual Property</h2>
                <p style={paragraphStyle}>
                    The application and its original content, features, and
                    functionality are owned by FocusFlow and are protected by
                    international copyright, trademark, patent, trade secret,
                    and other intellectual property or proprietary rights laws.
                </p>
                <p style={paragraphStyle}>
                    You may not copy, modify, create derivative works of,
                    publicly display, publicly perform, republish, or transmit
                    any of the material obtained through the application.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Prohibited Uses</h2>
                <p style={paragraphStyle}>
                    You may use our application only for lawful purposes and in
                    accordance with these Terms. You agree not to use the
                    application:
                </p>
                <ul style={listStyle}>
                    <li style={listItemStyle}>
                        <div style={listItemMarkerStyle}></div>
                        In any way that violates any applicable federal, state,
                        local, or international law or regulation
                    </li>
                    <li style={listItemStyle}>
                        <div style={listItemMarkerStyle}></div>
                        To transmit, or procure the sending of, any advertising
                        or promotional material
                    </li>
                    <li style={listItemStyle}>
                        <div style={listItemMarkerStyle}></div>
                        To impersonate or attempt to impersonate the company, a
                        company employee, another user, or any other person or
                        entity
                    </li>
                    <li style={listItemStyle}>
                        <div style={listItemMarkerStyle}></div>
                        To engage in any other conduct that restricts or
                        inhibits anyone's use or enjoyment of the application
                    </li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Limitation of Liability</h2>
                <p style={paragraphStyle}>
                    In no event shall FocusFlow, nor its directors, employees,
                    partners, agents, suppliers, or affiliates, be liable for
                    any indirect, incidental, special, consequential or punitive
                    damages, including without limitation, loss of profits,
                    data, use, goodwill, or other intangible losses.
                </p>
                <p style={paragraphStyle}>
                    Our liability is limited to the maximum extent permitted by
                    law. We do not guarantee that the application will be
                    available at all times.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Changes to Terms</h2>
                <p style={paragraphStyle}>
                    We reserve the right to modify or replace these Terms at any
                    time. If a revision is material, we will provide at least 30
                    days' notice prior to any new terms taking effect.
                </p>
                <p style={paragraphStyle}>
                    By continuing to access or use our application after any
                    revisions become effective, you agree to be bound by the
                    revised terms.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Contact Us</h2>
                <p style={paragraphStyle}>
                    If you have any questions about these Terms, please contact
                    us at:
                </p>
                <ul style={listStyle}>
                    <li style={listItemStyle}>
                        <div style={listItemMarkerStyle}></div>
                        Email: legal@focusflow.com
                    </li>
                    <li style={listItemStyle}>
                        <div style={listItemMarkerStyle}></div>
                        Address: 123 Productivity Street, Tech City, TC 12345
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TermsOfService;
