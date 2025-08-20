import React from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";

const About = () => (
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
                About FocusFlow
            </h1>
            <p
                style={{
                    color: "var(--color-primary-900)",
                    fontSize: "1.15rem",
                    maxWidth: 600,
                    margin: "0 auto",
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
                    Our Story
                </h2>
                <p
                    style={{
                        color: "var(--color-gray-800)",
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
                    Our Mission
                </h2>
                <p
                    style={{
                        color: "var(--color-gray-800)",
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
