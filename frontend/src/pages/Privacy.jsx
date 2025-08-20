import React from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";

const Privacy = () => (
    <div style={{ background: "var(--color-gray-50)", minHeight: "100vh" }}>
        <LandingNavbar />
        <section
            style={{
                background:
                    "linear-gradient(90deg, var(--color-primary-400) 0%, var(--color-cyan-300) 100%)",
                padding: "3rem 1rem 2rem 1rem",
                textAlign: "center",
            }}
        >
            <h1
                style={{
                    fontSize: "2.2rem",
                    fontWeight: 800,
                    color: "var(--color-primary-900)",
                    marginBottom: "0.7rem",
                }}
            >
                Privacy Policy
            </h1>
            <p
                style={{
                    color: "var(--color-primary-900)",
                    fontSize: "1.15rem",
                    maxWidth: 600,
                    margin: "0 auto",
                }}
            >
                Your privacy is important to us. Learn how FocusFlow collects,
                uses, and protects your information.
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
                style={{
                    background: "var(--color-white)",
                    borderRadius: "1rem",
                    boxShadow: "var(--shadow-soft)",
                    padding: "2rem",
                }}
            >
                <h2
                    style={{
                        color: "var(--color-primary-700)",
                        fontWeight: 700,
                        fontSize: "1.15rem",
                        marginBottom: 12,
                    }}
                >
                    What We Collect
                </h2>
                <p
                    style={{
                        color: "var(--color-gray-800)",
                        fontSize: "1.08rem",
                        lineHeight: 1.7,
                    }}
                >
                    We collect only the information you provide directly to us,
                    such as your email address when you sign up. We do not sell
                    or share your data with third parties.
                </p>
                <h2
                    style={{
                        color: "var(--color-primary-700)",
                        fontWeight: 700,
                        fontSize: "1.15rem",
                        margin: "2rem 0 12px 0",
                    }}
                >
                    How We Use Your Data
                </h2>
                <p
                    style={{
                        color: "var(--color-gray-800)",
                        fontSize: "1.08rem",
                        lineHeight: 1.7,
                    }}
                >
                    Your data is used to provide and improve FocusFlow’s
                    services. You are always in control of your information.
                </p>
                <h2
                    style={{
                        color: "var(--color-primary-700)",
                        fontWeight: 700,
                        fontSize: "1.15rem",
                        margin: "2rem 0 12px 0",
                    }}
                >
                    Contact
                </h2>
                <p
                    style={{
                        color: "var(--color-gray-800)",
                        fontSize: "1.08rem",
                        lineHeight: 1.7,
                    }}
                >
                    If you have any questions about our privacy practices, email
                    us at{" "}
                    <a
                        href="mailto:focusflow@studentproject.com"
                        style={{
                            color: "var(--color-primary-600)",
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

export default Privacy;
