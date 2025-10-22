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
                maxWidth: 1200,
                margin: "0 auto",
                padding: "2rem 1rem",
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
                        color: "#38bdf8",
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
                    In 2023, a group of students struggled with staying focused during study sessions. Existing productivity tools were either too expensive, too complex, or filled with distractions. That's when FocusFlow was born.
                    <br/><br/>
                    <strong>Our Journey:</strong>
                    <br/>• 2023: Initial concept and prototype
                    <br/>• Early 2024: Beta launch with 100 users
                    <br/>• Mid 2024: Reached 1,000 active users
                    <br/>• Late 2024: Open-sourced the project
                    <br/>• 2025: 10,000+ users worldwide
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
                        color: "#38bdf8",
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
            
            {/* Core Values Section */}
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
                        fontSize: "1.3rem",
                        marginBottom: 12,
                    }}
                >
                    Our Core Values
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginTop: "1.5rem" }}>
                    {[
                        { icon: "🆓", title: "Always Free", desc: "Productivity tools should be accessible to everyone, regardless of budget." },
                        { icon: "🔒", title: "Privacy First", desc: "Your data belongs to you. We never sell or share your information." },
                        { icon: "🌍", title: "Open Source", desc: "Transparency and collaboration drive innovation." },
                        { icon: "👥", title: "Community Driven", desc: "Built by users, for users. Your feedback shapes our roadmap." },
                        { icon: "🎯", title: "Focus on Simplicity", desc: "Powerful features, simple interface. No bloat, no distractions." },
                    ].map((value, idx) => (
                        <div key={idx} style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{value.icon}</div>
                            <h3 style={{ color: "#38bdf8", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>{value.title}</h3>
                            <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.6 }}>{value.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Key Milestones */}
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
                        fontSize: "1.3rem",
                        marginBottom: 18,
                    }}
                >
                    🏆 Key Milestones
                </h2>
                <ul style={{ listStyle: "none", padding: 0, color: "#94a3b8", fontSize: "1.08rem", lineHeight: 2 }}>
                    <li>✓ 10,000+ Active Users</li>
                    <li>✓ 500,000+ Focus Sessions Completed</li>
                    <li>✓ 50+ Countries Reached</li>
                    <li>✓ 100% Uptime in 2024</li>
                    <li>✓ 4.8/5 Average Rating</li>
                    <li>✓ Featured on Product Hunt</li>
                </ul>
            </div>

            {/* Team Section */}
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
                        fontSize: "1.3rem",
                        marginBottom: 18,
                    }}
                >
                    👥 Meet the Team
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginTop: "1.5rem" }}>
                    {[
                        { name: "John Doe", role: "Founder & Lead Developer", quote: "Passionate about building tools that make a difference" },
                        { name: "Jane Smith", role: "UX/UI Designer", quote: "Design should be beautiful and functional" },
                        { name: "Mike Johnson", role: "Community Manager", quote: "Building communities, one user at a time" },
                    ].map((member, idx) => (
                        <div key={idx} style={{ textAlign: "center", padding: "1rem" }}>
                            <div style={{ 
                                width: "80px", 
                                height: "80px", 
                                borderRadius: "50%", 
                                background: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
                                margin: "0 auto 1rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "2rem",
                                color: "#ffffff"
                            }}>
                                {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <h3 style={{ color: "#ffffff", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.25rem" }}>{member.name}</h3>
                            <p style={{ color: "#38bdf8", fontSize: "0.9rem", marginBottom: "0.5rem" }}>{member.role}</p>
                            <p style={{ color: "#94a3b8", fontSize: "0.9rem", fontStyle: "italic" }}>"{member.quote}"</p>
                        </div>
                    ))}
                </div>
                <p style={{ color: "#94a3b8", fontSize: "1rem", marginTop: "2rem", textAlign: "center" }}>
                    🤝 Special thanks to our 50+ open-source contributors!
                </p>
            </div>

            {/* Technology Stack */}
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
                        fontSize: "1.3rem",
                        marginBottom: 18,
                    }}
                >
                    ⚙️ Built With
                </h2>
                <div style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 2 }}>
                    <p><strong style={{ color: "#ffffff" }}>Frontend:</strong> React, Vite, TailwindCSS</p>
                    <p><strong style={{ color: "#ffffff" }}>Backend:</strong> Node.js, Express</p>
                    <p><strong style={{ color: "#ffffff" }}>Database:</strong> MongoDB</p>
                    <p><strong style={{ color: "#ffffff" }}>Hosting:</strong> Cloud Infrastructure</p>
                    <p><strong style={{ color: "#ffffff" }}>Open Source:</strong> MIT License</p>
                </div>
            </div>

            {/* Press & Media */}
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
                        fontSize: "1.3rem",
                        marginBottom: 18,
                    }}
                >
                    📰 In the News
                </h2>
                <ul style={{ listStyle: "none", padding: 0, color: "#94a3b8", fontSize: "1.05rem", lineHeight: 2 }}>
                    <li>• "FocusFlow: The Free Productivity Tool Students Love" - TechCrunch</li>
                    <li>• "How FocusFlow is Changing Remote Work" - Forbes</li>
                    <li>• "Top 10 Productivity Apps of 2024" - Product Hunt</li>
                </ul>
            </div>

            {/* Contact Section */}
            <div
                className="hover-card"
                style={{
                    background: "rgba(30, 41, 59, 0.5)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "1rem",
                    border: "1px solid #334155",
                    padding: "2rem",
                    transition: "all 0.3s ease",
                    textAlign: "center",
                }}
            >
                <h2
                    style={{
                        color: "#38bdf8",
                        fontWeight: 600,
                        fontSize: "1.3rem",
                        marginBottom: 18,
                    }}
                >
                    📧 Get in Touch
                </h2>
                <div style={{ color: "#94a3b8", fontSize: "1.05rem", lineHeight: 2 }}>
                    <p><strong style={{ color: "#ffffff" }}>General Inquiries:</strong> <a href="mailto:hello@focusflow.com" style={{ color: "#38bdf8" }}>hello@focusflow.com</a></p>
                    <p><strong style={{ color: "#ffffff" }}>Press:</strong> <a href="mailto:press@focusflow.com" style={{ color: "#38bdf8" }}>press@focusflow.com</a></p>
                    <p><strong style={{ color: "#ffffff" }}>Support:</strong> <a href="mailto:support@focusflow.com" style={{ color: "#38bdf8" }}>support@focusflow.com</a></p>
                    <p><strong style={{ color: "#ffffff" }}>Partnerships:</strong> <a href="mailto:partners@focusflow.com" style={{ color: "#38bdf8" }}>partners@focusflow.com</a></p>
                </div>
            </div>
        </main>
        <LandingFooter />
    </div>
);

export default About;
