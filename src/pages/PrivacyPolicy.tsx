import React from "react";
import {
    ShieldCheckIcon,
    UserIcon,
    DocumentTextIcon,
    LockClosedIcon,
    GlobeAltIcon,
} from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";

const PrivacyPolicy = () => {
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

    const lastUpdatedStyle: CSSProperties = {
        fontSize: "1rem",
        color: "var(--color-gray-500)",
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

    const paragraphStyle: CSSProperties = {
        fontSize: "1.125rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.75",
        marginBottom: "1.5rem",
    };

    const listStyle: CSSProperties = {
        listStyle: "none",
        padding: 0,
        margin: "1.5rem 0",
    };

    const listItemStyle: CSSProperties = {
        fontSize: "1.125rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.75",
        marginBottom: "1rem",
        paddingLeft: "1.5rem",
        position: "relative",
    };

    const listItemMarkerStyle: CSSProperties = {
        position: "absolute",
        left: 0,
        top: "0.75rem",
        width: "0.5rem",
        height: "0.5rem",
        borderRadius: "50%",
        backgroundColor: "var(--color-primary-600)",
    };

    const highlightBoxStyle: CSSProperties = {
        background: "var(--color-primary-50)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        marginBottom: "1.5rem",
    };

    const highlightTextStyle: CSSProperties = {
        fontSize: "1.125rem",
        color: "var(--color-primary-700)",
        lineHeight: "1.75",
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Privacy Policy</h1>
                <p style={lastUpdatedStyle}>Last Updated: March 15, 2024</p>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                    <ShieldCheckIcon style={sectionIconStyle} />
                    Introduction
                </h2>
                <p style={paragraphStyle}>
                    At FocusFlow, we take your privacy seriously. This Privacy
                    Policy explains how we collect, use, disclose, and safeguard
                    your information when you use our productivity application.
                    Please read this privacy policy carefully. If you do not
                    agree with the terms of this privacy policy, please do not
                    access the application.
                </p>
                <div style={highlightBoxStyle}>
                    <p style={highlightTextStyle}>
                        We reserve the right to make changes to this Privacy
                        Policy at any time and for any reason. We will alert you
                        about any changes by updating the "Last Updated" date of
                        this Privacy Policy.
                    </p>
                </div>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                    <UserIcon style={sectionIconStyle} />
                    Information We Collect
                </h2>
                <p style={paragraphStyle}>
                    We may collect information about you in various ways. The
                    information we may collect via the application includes:
                </p>
                <ul style={listStyle}>
                    <li style={listItemStyle}>
                        <div style={listItemMarkerStyle} />
                        Personal Data: Personally identifiable information, such
                        as your name, email address, and usage data that you
                        voluntarily provide to us when you register with the
                        application.
                    </li>
                    <li style={listItemStyle}>
                        <div style={listItemMarkerStyle} />
                        Usage Data: Information on how you use the application,
                        including your focus sessions, productivity metrics, and
                        preferences.
                    </li>
                    <li style={listItemStyle}>
                        <div style={listItemMarkerStyle} />
                        Device Data: Information about your device, such as your
                        IP address, browser type, and operating system.
                    </li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                    <DocumentTextIcon style={sectionIconStyle} />
                    How We Use Your Information
                </h2>
                <p style={paragraphStyle}>
                    We may use the information we collect about you in various
                    ways, including to:
                </p>
                <ul style={listStyle}>
                    <li style={listItemStyle}>
                        <div style={listItemMarkerStyle} />
                        Provide, operate, and maintain our application
                    </li>
                    <li style={listItemStyle}>
                        <div style={listItemMarkerStyle} />
                        Improve, personalize, and expand our application
                    </li>
                    <li style={listItemStyle}>
                        <div style={listItemMarkerStyle} />
                        Understand and analyze how you use our application
                    </li>
                    <li style={listItemStyle}>
                        <div style={listItemMarkerStyle} />
                        Develop new products, services, features, and
                        functionality
                    </li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                    <LockClosedIcon style={sectionIconStyle} />
                    Data Security
                </h2>
                <p style={paragraphStyle}>
                    We have implemented appropriate technical and organizational
                    security measures designed to protect the security of any
                    personal information we process. However, please also
                    remember that we cannot guarantee that the internet itself
                    is 100% secure.
                </p>
                <div style={highlightBoxStyle}>
                    <p style={highlightTextStyle}>
                        While we strive to use commercially acceptable means to
                        protect your personal information, we cannot guarantee
                        its absolute security.
                    </p>
                </div>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                    <GlobeAltIcon style={sectionIconStyle} />
                    International Data Transfers
                </h2>
                <p style={paragraphStyle}>
                    Your information, including personal data, may be
                    transferred to — and maintained on — computers located
                    outside of your state, province, country, or other
                    governmental jurisdiction where the data protection laws may
                    differ from those of your jurisdiction.
                </p>
                <p style={paragraphStyle}>
                    If you are located outside the United States and choose to
                    provide information to us, please note that we transfer the
                    data to the United States and process it there.
                </p>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                    <ShieldCheckIcon style={sectionIconStyle} />
                    Your Data Protection Rights
                </h2>
                <p style={paragraphStyle}>
                    We would like to make sure you are fully aware of all of
                    your data protection rights. Every user is entitled to the
                    following:
                </p>
                <ul style={listStyle}>
                    <li style={listItemStyle}>
                        <div style={listItemMarkerStyle} />
                        The right to access – You have the right to request
                        copies of your personal data.
                    </li>
                    <li style={listItemStyle}>
                        <div style={listItemMarkerStyle} />
                        The right to rectification – You have the right to
                        request that we correct any information you believe is
                        inaccurate.
                    </li>
                    <li style={listItemStyle}>
                        <div style={listItemMarkerStyle} />
                        The right to erasure – You have the right to request
                        that we erase your personal data, under certain
                        conditions.
                    </li>
                    <li style={listItemStyle}>
                        <div style={listItemMarkerStyle} />
                        The right to restrict processing – You have the right to
                        request that we restrict the processing of your personal
                        data, under certain conditions.
                    </li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                    <DocumentTextIcon style={sectionIconStyle} />
                    Contact Us
                </h2>
                <p style={paragraphStyle}>
                    If you have any questions about this Privacy Policy, please
                    contact us at:
                </p>
                <div style={highlightBoxStyle}>
                    <p style={highlightTextStyle}>
                        Email: privacy@focusflow.com
                        <br />
                        Address: 123 Productivity Street, Tech City, TC 12345
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
