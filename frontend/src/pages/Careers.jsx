import React from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";

const LandingCareers = () => (
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
                Careers at FocusFlow
            </h1>
            <p
                style={{
                    color: "var(--color-primary-900)",
                    fontSize: "1.15rem",
                    maxWidth: 600,
                    margin: "0 auto",
                }}
            >
                Join our mission to help people everywhere achieve their goals.
                We’re always looking for passionate, creative minds to help us
                grow.
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
                    marginBottom: "2rem",
                }}
            >
                <h2
                    style={{
                        color: "var(--color-primary-700)",
                        fontWeight: 700,
                        fontSize: "1.3rem",
                        marginBottom: 12,
                    }}
                >
                    Open Roles
                </h2>
                <p
                    style={{
                        color: "var(--color-gray-800)",
                        fontSize: "1.08rem",
                        lineHeight: 1.7,
                    }}
                >
                    We’re not hiring for specific roles right now, but we love
                    hearing from talented people! If you’re interested in
                    contributing, collaborating, or joining our team in the
                    future, send us your resume or portfolio at{" "}
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
                        fontSize: "1.3rem",
                        marginBottom: 12,
                    }}
                >
                    Why Join Us?
                </h2>
                <ul
                    style={{
                        color: "var(--color-gray-800)",
                        fontSize: "1.08rem",
                        lineHeight: 1.7,
                        paddingLeft: 20,
                    }}
                >
                    <li>Work on a meaningful, student-driven project</li>
                    <li>Flexible, remote-friendly collaboration</li>
                    <li>Opportunities to learn, grow, and make an impact</li>
                    <li>Be part of a supportive, innovative community</li>
                </ul>
            </div>
        </main>
        <LandingFooter />
    </div>
);

export default LandingCareers;
