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
                    marginBottom: "1rem",
                    background: "linear-gradient(to right, #38bdf8, #818cf8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
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
                maxWidth: 1200,
                margin: "-2.5rem auto 2rem auto",
                padding: "1rem",
            }}
        >
            {/* Security Overview */}
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
                    🔒 Our Security Commitment
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 1.7 }}>
                    At FocusFlow, security is not an afterthought—it's built into every layer of our infrastructure. We implement industry-leading security practices to protect your data, ensure privacy, and maintain the trust you place in us.
                </p>
            </div>

            {/* Data Encryption */}
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
                    🔐 Data Encryption
                </h2>
                <div style={{ display: "grid", gap: "1.5rem" }}>
                    {[
                        {
                            title: "Encryption in Transit",
                            icon: "🚀",
                            desc: "All data transmitted between your device and our servers is encrypted using TLS 1.3 (Transport Layer Security), the same technology used by banks and financial institutions."
                        },
                        {
                            title: "Encryption at Rest",
                            icon: "💾",
                            desc: "Your data is encrypted using AES-256 encryption when stored in our databases. This military-grade encryption ensures your data is unreadable even if physical storage is compromised."
                        },
                        {
                            title: "Password Security",
                            icon: "🔑",
                            desc: "Passwords are hashed using bcrypt with salt, making them virtually impossible to reverse-engineer. We never store your password in plain text."
                        },
                    ].map((item, idx) => (
                        <div key={idx} style={{
                            padding: "1.5rem",
                            background: "rgba(15, 23, 42, 0.5)",
                            borderRadius: "0.75rem",
                            border: "1px solid #334155",
                        }}>
                            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{item.icon}</div>
                            <h3 style={{ color: "#ffffff", fontSize: "1.15rem", fontWeight: 600, marginBottom: "0.75rem" }}>
                                {item.title}
                            </h3>
                            <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.7, margin: 0 }}>
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Infrastructure Security */}
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
                    🏛️ Infrastructure Security
                </h2>
                <ul style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 2, paddingLeft: "1.5rem" }}>
                    <li><strong style={{ color: "#ffffff" }}>Cloud Hosting:</strong> Hosted on enterprise-grade cloud infrastructure with 99.9% uptime SLA</li>
                    <li><strong style={{ color: "#ffffff" }}>DDoS Protection:</strong> Advanced protection against distributed denial-of-service attacks</li>
                    <li><strong style={{ color: "#ffffff" }}>Firewall:</strong> Web Application Firewall (WAF) to block malicious traffic</li>
                    <li><strong style={{ color: "#ffffff" }}>Network Isolation:</strong> Database and application servers run in isolated private networks</li>
                    <li><strong style={{ color: "#ffffff" }}>Regular Updates:</strong> All systems are kept up-to-date with the latest security patches</li>
                </ul>
            </div>

            {/* Access Control */}
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
                    🚪 Access Control & Authentication
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1.75rem" }}>
                    {[
                        { icon: "🔐", title: "Multi-Factor Authentication", headline: "Layered sign-in", desc: "Offer optional 2FA via authenticator apps or SMS so high-impact accounts stay protected." },
                        { icon: "🔑", title: "Session Management", headline: "Smart session limits", desc: "Idle sessions expire automatically and can be revoked instantly from the dashboard." },
                        { icon: "🚫", title: "Role-Based Access", headline: "Principle of least privilege", desc: "Granular roles keep administrative abilities scoped only to what teammates need." },
                        { icon: "📱", title: "Device Management", headline: "Visibility across devices", desc: "Review active device fingerprints, terminate logins, and flag anomalies in one place." },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            style={{
                                padding: "1.5rem",
                                background: "rgba(15, 23, 42, 0.6)",
                                borderRadius: "0.9rem",
                                border: "1px solid rgba(56, 189, 248, 0.18)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.65rem",
                                boxShadow: "0 18px 45px -30px rgba(56, 189, 248, 0.35)",
                            }}
                        >
                            <div style={{ fontSize: "2.35rem" }}>{item.icon}</div>
                            <div>
                                <h3 style={{ color: "#e2e8f0", fontSize: "1.15rem", fontWeight: 600, marginBottom: "0.35rem" }}>
                                    {item.title}
                                </h3>
                                <span style={{ color: "#38bdf8", fontSize: "0.9rem", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                                    {item.headline}
                                </span>
                            </div>
                            <p style={{ color: "#94a3b8", fontSize: "0.96rem", lineHeight: 1.6, margin: 0 }}>
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Monitoring & Response */}
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
                    📊 Monitoring & Incident Response
                </h2>
                <div style={{ display: "grid", gap: "1rem" }}>
                    {[
                        { title: "24/7 Monitoring", desc: "Continuous monitoring of all systems for suspicious activity and anomalies" },
                        { title: "Automated Alerts", desc: "Real-time alerts for security events trigger immediate investigation" },
                        { title: "Audit Logs", desc: "Comprehensive logging of all access and changes to your data" },
                        { title: "Incident Response Plan", desc: "Documented procedures to quickly respond to and mitigate security incidents" },
                    ].map((item, idx) => (
                        <div key={idx} style={{
                            padding: "1rem",
                            background: "rgba(15, 23, 42, 0.5)",
                            borderRadius: "0.5rem",
                            border: "1px solid #334155",
                        }}>
                            <h3 style={{ color: "#38bdf8", fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                                {item.title}
                            </h3>
                            <p style={{ color: "#94a3b8", fontSize: "1rem", margin: 0 }}>
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Data Backup & Recovery */}
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
                    💾 Data Backup & Disaster Recovery
                </h2>
                <ul style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 2, paddingLeft: "1.5rem" }}>
                    <li><strong style={{ color: "#ffffff" }}>Automated Backups:</strong> Daily encrypted backups of all user data</li>
                    <li><strong style={{ color: "#ffffff" }}>Geographic Redundancy:</strong> Backups stored in multiple geographic locations</li>
                    <li><strong style={{ color: "#ffffff" }}>Point-in-Time Recovery:</strong> Ability to restore data to specific timestamps</li>
                    <li><strong style={{ color: "#ffffff" }}>Disaster Recovery Plan:</strong> Tested procedures to restore service within 4 hours</li>
                </ul>
            </div>

            {/* Compliance & Certifications */}
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
                    ✅ Compliance & Standards
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
                    {[
                        { title: "GDPR Compliant", desc: "Full compliance with EU data protection regulations" },
                        { title: "CCPA Compliant", desc: "Adherence to California privacy laws" },
                        { title: "SOC 2 Type II", desc: "Working towards certification (in progress)" },
                        { title: "OWASP Top 10", desc: "Protection against common web vulnerabilities" },
                    ].map((item, idx) => (
                        <div key={idx} style={{
                            padding: "1.5rem",
                            background: "rgba(15, 23, 42, 0.5)",
                            borderRadius: "0.75rem",
                            border: "1px solid #334155",
                            textAlign: "center",
                        }}>
                            <h3 style={{ color: "#ffffff", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.75rem" }}>
                                {item.title}
                            </h3>
                            <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Security Testing */}
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
                    🔍 Security Testing & Audits
                </h2>
                <ul style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 2, paddingLeft: "1.5rem" }}>
                    <li><strong style={{ color: "#ffffff" }}>Penetration Testing:</strong> Regular third-party security assessments</li>
                    <li><strong style={{ color: "#ffffff" }}>Vulnerability Scanning:</strong> Automated daily scans for known vulnerabilities</li>
                    <li><strong style={{ color: "#ffffff" }}>Code Reviews:</strong> Security-focused code reviews before deployment</li>
                    <li><strong style={{ color: "#ffffff" }}>Bug Bounty Program:</strong> Rewards for responsible disclosure of security issues</li>
                </ul>
            </div>

            {/* Your Responsibility */}
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
                    👤 Your Security Responsibilities
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    While we implement robust security measures, your cooperation is essential:
                </p>
                <div style={{ display: "grid", gap: "1rem" }}>
                    {[
                        { icon: "🔑", title: "Use Strong Passwords", desc: "Create unique, complex passwords (12+ characters with mixed case, numbers, symbols)" },
                        { icon: "🚫", title: "Never Share Credentials", desc: "Don't share your password or login details with anyone" },
                        { icon: "📱", title: "Enable 2FA", desc: "Turn on two-factor authentication for extra protection" },
                        { icon: "⚠️", title: "Report Suspicious Activity", desc: "Contact us immediately if you notice anything unusual" },
                        { icon: "🔄", title: "Keep Software Updated", desc: "Use the latest version of your browser and operating system" },
                        { icon: "🚪", title: "Log Out on Shared Devices", desc: "Always log out when using public or shared computers" },
                    ].map((item, idx) => (
                        <div key={idx} style={{
                            padding: "1rem",
                            background: "rgba(15, 23, 42, 0.5)",
                            borderRadius: "0.5rem",
                            border: "1px solid #334155",
                            display: "flex",
                            gap: "1rem",
                            alignItems: "start",
                        }}>
                            <div style={{ fontSize: "2rem", flexShrink: 0 }}>{item.icon}</div>
                            <div>
                                <h3 style={{ color: "#ffffff", fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                                    {item.title}
                                </h3>
                                <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Report Security Issue */}
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
                <h2 style={{ color: "#38bdf8", fontWeight: 600, fontSize: "1.5rem", marginBottom: "1rem" }}>
                    🚨 Report a Security Issue
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    Found a security vulnerability? We appreciate responsible disclosure and will respond within 24 hours.
                </p>
                <p style={{ color: "#ffffff", fontSize: "1.1rem" }}>
                    Email: <a href="mailto:security@focusflow.com" style={{ color: "#38bdf8", textDecoration: "underline", fontWeight: 600 }}>security@focusflow.com</a>
                </p>
                <p style={{ color: "#94a3b8", fontSize: "0.95rem", marginTop: "1rem" }}>
                    Please include detailed information about the vulnerability and steps to reproduce it.
                </p>
            </div>
        </main>
        <LandingFooter />
    </div>
);

export default Security;
