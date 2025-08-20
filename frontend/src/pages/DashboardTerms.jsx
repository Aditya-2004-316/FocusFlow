import React, { useState } from "react";
import { FaFileContract } from "react-icons/fa";

const pageBackgroundStyle = {
    minHeight: "100vh",
    width: "99vw",
    background:
        "linear-gradient(120deg, var(--color-cyan-50) 0%, var(--color-primary-100) 100%)",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
};

const containerStyle = {
    maxWidth: 900,
    margin: "2.5rem auto",
    padding: "2.5rem",
    background: "rgba(255,255,255,0.85)",
    borderRadius: "2rem",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
    backdropFilter: "blur(4px)",
    position: "relative",
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
    padding: "2.5rem 2rem 2rem 2rem",
    marginBottom: "2.5rem",
    boxShadow: "0 4px 32px 0 rgba(0,0,0,0.10)",
    position: "relative",
    textAlign: "center",
};

const iconCircleStyle = {
    background:
        "linear-gradient(135deg, var(--color-cyan-100) 0%, var(--color-primary-100) 100%)",
    borderRadius: "50%",
    width: "4.5rem",
    height: "4.5rem",
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
    fontSize: "2.3rem",
    fontWeight: 900,
    color: "var(--color-primary-900)",
    margin: 0,
    letterSpacing: "-1px",
    textShadow: "0 2px 8px rgba(0,0,0,0.10)",
    textAlign: "center",
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
    lineHeight: 1.1,
    marginTop: 0,
};

const subtitleStyle = {
    color: "var(--color-cyan-900)",
    fontSize: "1.18rem",
    maxWidth: 600,
    margin: "1.2rem auto 0 auto",
    fontWeight: 500,
    lineHeight: 1.6,
    textAlign: "center",
};

const mainStyle = {
    maxWidth: 700,
    margin: "-2.5rem auto 2.5rem auto",
    padding: "1.5rem",
    background: "rgba(255,255,255,0.92)",
    borderRadius: "1.5rem",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
};

const sectionCardStyle = {
    background:
        "linear-gradient(135deg, rgba(255,255,255,0.96) 60%, var(--color-cyan-50) 100%)",
    borderRadius: "1.5rem",
    boxShadow: "0 8px 32px rgba(0,0,0,0.16), 0 1.5px 8px rgba(0,0,0,0.08)",
    padding: "2rem 1.5rem",
    marginBottom: "1.5rem",
    border: "2.5px solid var(--color-primary-200)",
    position: "relative",
    overflow: "hidden",
    transition: "transform 0.18s, box-shadow 0.18s, border 0.18s",
};

const sectionCardHoverStyle = {
    transform: "translateY(-3px) scale(1.01)",
    boxShadow: "0 16px 48px rgba(0,0,0,0.22), 0 2px 12px rgba(0,0,0,0.10)",
    border: "2.5px solid var(--color-primary-400)",
};

const sectionTitleStyle = {
    fontSize: "1.35rem",
    fontWeight: 700,
    color: "var(--color-primary-700)",
    margin: "0 0 1rem 0",
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    letterSpacing: "-0.5px",
};

const sectionIconStyle = {
    display: "inline-block",
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "var(--color-primary-500)",
    marginRight: 6,
};

const textStyle = {
    fontSize: "1.05rem",
    color: "var(--color-gray-800)",
    marginBottom: 0,
    lineHeight: 1.7,
    fontWeight: 500,
};

const infoBoxStyle = {
    marginTop: "2.5rem",
    color: "#4b5563",
    fontSize: "1rem",
    background:
        "linear-gradient(90deg, var(--color-primary-50) 60%, var(--color-cyan-50) 100%)",
    borderRadius: "0.75rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    padding: "1.2rem 1.5rem",
    textAlign: "center",
    border: "1px solid var(--color-primary-100)",
    fontWeight: 500,
};

const DashboardTerms = () => {
    const [iconHovered, setIconHovered] = useState(false);
    const [cardHovered, setCardHovered] = useState(null);

    const termsSections = [
        {
            title: "Use of Service",
            content:
                "FocusFlow is provided as-is for your productivity needs. Please use the platform responsibly and respectfully. You must be at least 13 years old to use our service. By accessing FocusFlow, you agree to comply with all applicable laws and regulations.",
        },
        {
            title: "User Content",
            content:
                "You are responsible for all content you create, upload, or share through FocusFlow. Do not upload anything illegal, harmful, or that violates others' rights. We reserve the right to remove content that violates these terms without prior notice.",
        },
        {
            title: "Account Responsibilities",
            content:
                "You are responsible for maintaining the security of your account and password. Notify us immediately of any unauthorized use of your account. You may not share your account credentials or allow others to access your account.",
        },
        {
            title: "Service Availability",
            content:
                "While we strive to maintain 99% uptime, FocusFlow is provided without guarantees of availability. We may perform maintenance, updates, or temporarily suspend service as needed. We are not liable for any loss resulting from service interruptions.",
        },
        {
            title: "Changes to Terms",
            content:
                "We may update these terms from time to time to reflect changes in our service or legal requirements. We will notify users of significant changes via email or dashboard notification. Continued use of FocusFlow after changes means you accept the updated terms.",
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
                            <FaFileContract
                                style={{
                                    fontSize: "2.5rem",
                                    color: "var(--color-white)",
                                }}
                            />
                        </div>
                        <h1 style={titleStyle}>Terms of Service</h1>
                    </div>
                    <p style={subtitleStyle}>
                        Please read our terms carefully. By using FocusFlow, you
                        agree to these terms and conditions.
                    </p>
                </section>
                <main style={mainStyle}>
                    {termsSections.map((section, idx) => (
                        <div
                            key={idx}
                            style={
                                cardHovered === idx
                                    ? {
                                          ...sectionCardStyle,
                                          ...sectionCardHoverStyle,
                                      }
                                    : sectionCardStyle
                            }
                            onMouseEnter={() => setCardHovered(idx)}
                            onMouseLeave={() => setCardHovered(null)}
                        >
                            <div style={sectionTitleStyle}>
                                <span style={sectionIconStyle} />
                                <FaFileContract
                                    style={{ marginRight: "0.3rem" }}
                                />
                                {section.title}
                            </div>
                            <div style={textStyle}>{section.content}</div>
                        </div>
                    ))}
                    <div style={infoBoxStyle}>
                        Questions about our terms of service?{" "}
                        <span
                            style={{
                                color: "var(--color-primary-600)",
                                fontWeight: 600,
                            }}
                        >
                            Contact our legal team from your dashboard.
                        </span>
                    </div>
                </main>
            </div>
        </>
    );
};

export default DashboardTerms;
