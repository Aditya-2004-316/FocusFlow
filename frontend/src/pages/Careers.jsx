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
                    marginBottom: "1rem",
                    background: "linear-gradient(to right, #38bdf8, #818cf8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
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
                maxWidth: 1200,
                margin: "-2.5rem auto 2rem auto",
                padding: "1rem",
            }}
        >
            {/* Open Positions */}
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
                        color: "#38bdf8",
                        fontWeight: 600,
                        fontSize: "1.5rem",
                        marginBottom: "1.5rem",
                    }}
                >
                    💼 Open Positions
                </h2>
                <div style={{ display: "grid", gap: "1.5rem" }}>
                    {[
                        {
                            title: "Frontend Developer",
                            type: "Part-time / Remote",
                            desc: "Help build beautiful, responsive interfaces using React and modern web technologies.",
                            skills: ["React", "JavaScript", "CSS", "UI/UX"]
                        },
                        {
                            title: "Backend Developer",
                            type: "Part-time / Remote",
                            desc: "Build scalable APIs and services using Node.js, Express, and MongoDB.",
                            skills: ["Node.js", "Express", "MongoDB", "REST APIs"]
                        },
                        {
                            title: "UI/UX Designer",
                            type: "Part-time / Remote",
                            desc: "Create intuitive, beautiful user experiences that help people stay focused and productive.",
                            skills: ["Figma", "User Research", "Prototyping", "Design Systems"]
                        },
                        {
                            title: "Community Manager",
                            type: "Part-time / Remote",
                            desc: "Engage with our community, organize events, and help users get the most out of FocusFlow.",
                            skills: ["Communication", "Social Media", "Event Planning", "Content Creation"]
                        },
                    ].map((job, idx) => (
                        <div key={idx} style={{
                            padding: "1.5rem",
                            background: "rgba(15, 23, 42, 0.5)",
                            borderRadius: "0.75rem",
                            border: "1px solid #334155",
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                                <h3 style={{ color: "#ffffff", fontSize: "1.25rem", fontWeight: 600, margin: 0 }}>
                                    {job.title}
                                </h3>
                                <span style={{ color: "#38bdf8", fontSize: "0.9rem", fontWeight: 500 }}>
                                    {job.type}
                                </span>
                            </div>
                            <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                                {job.desc}
                            </p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                {job.skills.map((skill, i) => (
                                    <span key={i} style={{
                                        padding: "0.25rem 0.75rem",
                                        background: "rgba(56, 189, 248, 0.1)",
                                        border: "1px solid rgba(56, 189, 248, 0.3)",
                                        borderRadius: "9999px",
                                        color: "#38bdf8",
                                        fontSize: "0.85rem",
                                    }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <p style={{ color: "#94a3b8", fontSize: "1.05rem", marginTop: "2rem", textAlign: "center" }}>
                    Interested? Send your resume or portfolio to{" "}
                    <a href="mailto:careers@focusflow.com" style={{ color: "#38bdf8", textDecoration: "underline", fontWeight: 600 }}>
                        careers@focusflow.com
                    </a>
                </p>
            </div>

            {/* Internship Program */}
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
                <h2 style={{ color: "#38bdf8", fontWeight: 600, fontSize: "1.5rem", marginBottom: "1rem" }}>
                    🎓 Internship Program
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    Perfect for students looking to gain real-world experience in software development, design, or community management.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
                    {[
                        { title: "Duration", value: "3-6 months" },
                        { title: "Commitment", value: "10-15 hours/week" },
                        { title: "Location", value: "100% Remote" },
                        { title: "Compensation", value: "Stipend + Experience" },
                    ].map((item, idx) => (
                        <div key={idx} style={{ textAlign: "center" }}>
                            <div style={{ color: "#ffffff", fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                                {item.title}
                            </div>
                            <div style={{ color: "#38bdf8", fontSize: "1.1rem", fontWeight: 700 }}>
                                {item.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Why Join Us */}
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
                <h2 style={{ color: "#38bdf8", fontWeight: 600, fontSize: "1.5rem", marginBottom: "1.5rem" }}>
                    ✨ Why Join Us?
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
                    {[
                        { icon: "🚀", title: "Meaningful Impact", desc: "Help 10,000+ users worldwide boost their productivity" },
                        { icon: "🌍", title: "Remote-First", desc: "Work from anywhere with flexible hours" },
                        { icon: "📚", title: "Learn & Grow", desc: "Gain real-world experience with modern tech stack" },
                        { icon: "👥", title: "Great Team", desc: "Collaborate with passionate, talented people" },
                        { icon: "🎯", title: "Ownership", desc: "Take ownership of features and see them through" },
                        { icon: "🆓", title: "Open Source", desc: "Build your portfolio with public contributions" },
                    ].map((benefit, idx) => (
                        <div key={idx} style={{ textAlign: "center", padding: "1rem" }}>
                            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{benefit.icon}</div>
                            <h3 style={{ color: "#ffffff", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                                {benefit.title}
                            </h3>
                            <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.5 }}>
                                {benefit.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Company Culture */}
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
                <h2 style={{ color: "#38bdf8", fontWeight: 600, fontSize: "1.5rem", marginBottom: "1.5rem" }}>
                    🎨 Our Culture
                </h2>
                <div style={{ display: "grid", gap: "1rem" }}>
                    {[
                        { title: "Transparency", desc: "Open communication, open source, open roadmap" },
                        { title: "User-Centric", desc: "Every decision starts with 'How does this help our users?'" },
                        { title: "Continuous Learning", desc: "We encourage experimentation and learning from failures" },
                        { title: "Work-Life Balance", desc: "Flexible hours, no overtime culture, mental health first" },
                        { title: "Diversity & Inclusion", desc: "We welcome people from all backgrounds and experiences" },
                    ].map((value, idx) => (
                        <div key={idx} style={{
                            padding: "1rem",
                            background: "rgba(15, 23, 42, 0.5)",
                            borderRadius: "0.5rem",
                            border: "1px solid #334155",
                        }}>
                            <h3 style={{ color: "#38bdf8", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                                {value.title}
                            </h3>
                            <p style={{ color: "#94a3b8", fontSize: "1rem", margin: 0 }}>
                                {value.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hiring Process */}
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
                <h2 style={{ color: "#38bdf8", fontWeight: 600, fontSize: "1.5rem", marginBottom: "1.5rem" }}>
                    📋 Our Hiring Process
                </h2>
                <div style={{ display: "grid", gap: "1.5rem" }}>
                    {[
                        { step: "1", title: "Apply", desc: "Send us your resume/portfolio", time: "5 min" },
                        { step: "2", title: "Initial Chat", desc: "Casual conversation about you and the role", time: "30 min" },
                        { step: "3", title: "Technical/Skills Assessment", desc: "Show us what you can do (take-home or live)", time: "2-3 hours" },
                        { step: "4", title: "Team Interview", desc: "Meet the team and discuss collaboration", time: "45 min" },
                        { step: "5", title: "Offer", desc: "Welcome to FocusFlow! 🎉", time: "1-2 days" },
                    ].map((stage, idx) => (
                        <div key={idx} style={{ display: "flex", gap: "1.5rem", alignItems: "start" }}>
                            <div style={{
                                width: "3rem",
                                height: "3rem",
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.5rem",
                                fontWeight: 800,
                                color: "#ffffff",
                                flexShrink: 0,
                            }}>
                                {stage.step}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                                    <h3 style={{ color: "#ffffff", fontSize: "1.15rem", fontWeight: 600, margin: 0 }}>
                                        {stage.title}
                                    </h3>
                                    <span style={{ color: "#38bdf8", fontSize: "0.9rem" }}>
                                        {stage.time}
                                    </span>
                                </div>
                                <p style={{ color: "#94a3b8", fontSize: "1rem", margin: 0 }}>
                                    {stage.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
        <LandingFooter />
    </div>
);

export default LandingCareers;
