import React from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../styles/CardHover.css";

const LandingCareers = () => (
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
                Careers at FocusFlow
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
                className="hover-card"
                style={{
                    background: "rgba(30, 41, 59, 0.5)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "1rem",
                    border: "1px solid #334155",
                    padding: "2rem",
                    marginBottom: "2rem",
                    transition: "all 0.3s ease",
                }}
            >
                <h2
                    style={{
                        color: "#a78bfa",
                        fontWeight: 600,
                        fontSize: "1.3rem",
                        marginBottom: 12,
                    }}
                >
                    Open Roles
                </h2>
                <p
                    style={{
                        color: "#94a3b8",
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
                            color: "#a78bfa",
                            textDecoration: "underline",
                        }}
                    >
                        focusflow@studentproject.com
                    </a>
                    .
                </p>
            </div>
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
                        fontSize: "1.3rem",
                        marginBottom: 12,
                    }}
                >
                    Why Join Us?
                </h2>
                <ul
                    style={{
                        color: "#94a3b8",
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
