import React from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../styles/CardHover.css";

const Terms = () => (
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
                Terms of Service
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
                Please read these terms carefully before using FocusFlow. By
                accessing or using our service, you agree to these terms.
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
                    Use of Service
                </h2>
                <p
                    style={{
                        color: "#94a3b8",
                        fontSize: "1.08rem",
                        lineHeight: 1.7,
                    }}
                >
                    FocusFlow is provided as-is for your personal use. You agree
                    not to misuse the service or attempt to disrupt its
                    operation.
                </p>
                <h2
                    style={{
                        color: "#a78bfa",
                        fontWeight: 600,
                        fontSize: "1.15rem",
                        margin: "2rem 0 12px 0",
                    }}
                >
                    User Content
                </h2>
                <p
                    style={{
                        color: "#94a3b8",
                        fontSize: "1.08rem",
                        lineHeight: 1.7,
                    }}
                >
                    You are responsible for any content you submit. Do not
                    upload harmful, illegal, or offensive material.
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
                    If you have any questions about these terms, email us at{" "}
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

export default Terms;
