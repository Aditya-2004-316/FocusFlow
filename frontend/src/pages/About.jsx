import React from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../styles/CardHover.css";

const About = () => (
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
                About FocusFlow
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
                FocusFlow is a student-built productivity platform designed to
                help you manage your time, stay organized, and achieve your
                goals—whether you’re a student, professional, or lifelong
                learner.
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
                    Our Story
                </h2>
                <p
                    style={{
                        color: "#94a3b8",
                        fontSize: "1.08rem",
                        lineHeight: 1.7,
                    }}
                >
                    FocusFlow was created by a group of students who wanted a
                    simple, effective way to manage their time and boost
                    productivity. We believe that everyone deserves access to
                    powerful tools that help them focus, track progress, and
                    grow—without barriers or distractions.
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
                    Our Mission
                </h2>
                <p
                    style={{
                        color: "#94a3b8",
                        fontSize: "1.08rem",
                        lineHeight: 1.7,
                    }}
                >
                    Our mission is to empower students and professionals to take
                    control of their time, reduce stress, and achieve
                    more—together. We’re committed to building a supportive
                    community and continuously improving FocusFlow based on your
                    feedback.
                </p>
            </div>
        </main>
        <LandingFooter />
    </div>
);

export default About;
