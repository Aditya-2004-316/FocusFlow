import React from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../styles/CardHover.css";

const Security = () => (
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
                    color: "#ffffff",
                    marginBottom: "1rem",
                }}
            >
                Security
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
                Learn how FocusFlow keeps your data safe and secure.
            </p>
        </section>
        <main
            style={{
                maxWidth: 700,
                margin: "-2.5rem auto 2rem auto",
                padding: "1rem",
            }}
        >
            <div
                className="hover-card"
                style={{
                    background: "rgba(30, 41, 59, 0.5)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "1rem",
                    border: "1px solid #334155",
                    padding: "2rem",
                    transition: "all 0.3s ease",
                }}
            >
                <h2
                    style={{
                        color: "#a78bfa",
                        fontWeight: 600,
                        fontSize: "1.15rem",
                        marginBottom: 12,
                    }}
                >
                    Data Protection
                </h2>
                <p
                    style={{
                        color: "#94a3b8",
                        fontSize: "1.08rem",
                        lineHeight: 1.7,
                    }}
                >
                    We use industry-standard encryption and security practices
                    to protect your data at all times.
                </p>
                <h2
                    style={{
                        color: "#a78bfa",
                        fontWeight: 600,
                        fontSize: "1.15rem",
                        margin: "2rem 0 12px 0",
                    }}
                >
                    Your Responsibility
                </h2>
                <p
                    style={{
                        color: "#94a3b8",
                        fontSize: "1.08rem",
                        lineHeight: 1.7,
                    }}
                >
                    Please use a strong password and never share your login
                    details. If you suspect any security issues, contact us
                    immediately.
                </p>
                <h2
                    style={{
                        color: "#a78bfa",
                        fontWeight: 600,
                        fontSize: "1.15rem",
                        margin: "2rem 0 12px 0",
                    }}
                >
                    Contact
                </h2>
                <p
                    style={{
                        color: "#94a3b8",
                        fontSize: "1.08rem",
                        lineHeight: 1.7,
                    }}
                >
                    For security concerns, email us at{" "}
                    <a
                        href="mailto:focusflow@studentproject.com"
                        style={{
                            color: "#a78bfa",
                            textDecoration: "underline",
                        }}
                    >
                        focusflow@studentproject.com
                    </a>
                    .
                </p>
            </div>
        </main>
        <LandingFooter />
    </div>
);

export default Security;
