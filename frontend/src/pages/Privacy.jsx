import React from "react";
import LandingNavbar from "../LandingPage/LandingNavbar";
import LandingFooter from "../LandingPage/LandingFooter";
import "../styles/CardHover.css";

const Privacy = () => (
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
                Privacy Policy
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
                Your privacy is important to us. Learn how FocusFlow collects,
                uses, and protects your information.
            </p>
        </section>
        <main
            style={{
                maxWidth: 1200,
                margin: "-2.5rem auto 2rem auto",
                padding: "1rem",
            }}
        >
            {/* Last Updated */}
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
                    Last Updated: January 22, 2025
                </p>
            </div>

            {/* Information We Collect */}
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
                    📋 Information We Collect
                </h2>
                <div style={{ display: "grid", gap: "1.5rem" }}>
                    {[
                        {
                            title: "Account Information",
                            items: ["Email address", "Username", "Password (encrypted)", "Profile picture (optional)"]
                        },
                        {
                            title: "Usage Data",
                            items: ["Focus session duration and timestamps", "Distraction logs", "Productivity statistics", "Feature usage patterns"]
                        },
                        {
                            title: "Technical Data",
                            items: ["IP address", "Browser type and version", "Device information", "Operating system"]
                        },
                        {
                            title: "Cookies & Local Storage",
                            items: ["Authentication tokens", "User preferences", "Session data"]
                        },
                    ].map((section, idx) => (
                        <div key={idx} style={{
                            padding: "1.5rem",
                            background: "rgba(15, 23, 42, 0.5)",
                            borderRadius: "0.75rem",
                            border: "1px solid #334155",
                        }}>
                            <h3 style={{ color: "#ffffff", fontSize: "1.15rem", fontWeight: 600, marginBottom: "1rem" }}>
                                {section.title}
                            </h3>
                            <ul style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.8, margin: 0, paddingLeft: "1.5rem" }}>
                                {section.items.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* How We Use Your Information */}
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
                    🎯 How We Use Your Information
                </h2>
                <ul style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 2, paddingLeft: "1.5rem" }}>
                    <li>To provide and maintain our service</li>
                    <li>To personalize your experience and save your preferences</li>
                    <li>To analyze usage patterns and improve our features</li>
                    <li>To send important updates about the service (you can opt-out)</li>
                    <li>To detect and prevent fraud or abuse</li>
                    <li>To comply with legal obligations</li>
                </ul>
            </div>

            {/* Data Sharing */}
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
                    🔒 Data Sharing & Third Parties
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    <strong style={{ color: "#ffffff" }}>We do NOT sell your personal data.</strong> We only share data in the following limited circumstances:
                </p>
                <div style={{ display: "grid", gap: "1rem" }}>
                    {[
                        { title: "Service Providers", desc: "Cloud hosting, email services, and analytics tools that help us operate FocusFlow" },
                        { title: "Legal Requirements", desc: "When required by law, court order, or to protect our rights" },
                        { title: "Business Transfers", desc: "In the event of a merger or acquisition (you'll be notified)" },
                        { title: "With Your Consent", desc: "Any other sharing will require your explicit permission" },
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

            {/* Your Rights */}
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
                    ⚖️ Your Rights (GDPR & CCPA)
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
                    {[
                        { icon: "👁️", title: "Access", desc: "Request a copy of your data" },
                        { icon: "✏️", title: "Correction", desc: "Update inaccurate information" },
                        { icon: "🗑️", title: "Deletion", desc: "Delete your account and data" },
                        { icon: "🚫", title: "Opt-Out", desc: "Unsubscribe from emails" },
                        { icon: "📥", title: "Export", desc: "Download your data in CSV/JSON" },
                        { icon: "🚪", title: "Portability", desc: "Transfer data to another service" },
                    ].map((right, idx) => (
                        <div key={idx} style={{ textAlign: "center", padding: "1rem" }}>
                            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{right.icon}</div>
                            <h3 style={{ color: "#ffffff", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                                {right.title}
                            </h3>
                            <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
                                {right.desc}
                            </p>
                        </div>
                    ))}
                </div>
                <p style={{ color: "#94a3b8", fontSize: "1.05rem", marginTop: "2rem", textAlign: "center" }}>
                    To exercise any of these rights, email us at{" "}
                    <a href="mailto:privacy@focusflow.com" style={{ color: "#38bdf8", textDecoration: "underline", fontWeight: 600 }}>
                        privacy@focusflow.com
                    </a>
                </p>
            </div>

            {/* Data Security */}
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
                    🔐 Data Security
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    We implement industry-standard security measures to protect your data:
                </p>
                <ul style={{ color: "#94a3b8", fontSize: "1.05rem", lineHeight: 2, paddingLeft: "1.5rem" }}>
                    <li><strong style={{ color: "#ffffff" }}>Encryption:</strong> TLS/SSL for data in transit, AES-256 for data at rest</li>
                    <li><strong style={{ color: "#ffffff" }}>Authentication:</strong> Secure password hashing (bcrypt)</li>
                    <li><strong style={{ color: "#ffffff" }}>Access Control:</strong> Role-based permissions and least-privilege principle</li>
                    <li><strong style={{ color: "#ffffff" }}>Monitoring:</strong> 24/7 security monitoring and logging</li>
                    <li><strong style={{ color: "#ffffff" }}>Backups:</strong> Regular encrypted backups with disaster recovery</li>
                    <li><strong style={{ color: "#ffffff" }}>Audits:</strong> Regular security audits and penetration testing</li>
                </ul>
            </div>

            {/* Data Retention */}
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
                    📅 Data Retention
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 1.7 }}>
                    We retain your data as long as your account is active. When you delete your account:
                </p>
                <ul style={{ color: "#94a3b8", fontSize: "1.05rem", lineHeight: 2, paddingLeft: "1.5rem" }}>
                    <li>Personal data is deleted within 30 days</li>
                    <li>Anonymized analytics may be retained for service improvement</li>
                    <li>Backups are purged within 90 days</li>
                    <li>Legal or regulatory data may be retained longer if required</li>
                </ul>
            </div>

            {/* Children's Privacy */}
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
                    👶 Children's Privacy
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 1.7 }}>
                    FocusFlow is not intended for children under 13. We do not knowingly collect data from children. If you believe we have collected data from a child, please contact us immediately at{" "}
                    <a href="mailto:privacy@focusflow.com" style={{ color: "#38bdf8", textDecoration: "underline" }}>
                        privacy@focusflow.com
                    </a>
                    .
                </p>
            </div>

            {/* Changes to Policy */}
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
                    📢 Changes to This Policy
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 1.7 }}>
                    We may update this Privacy Policy from time to time. We'll notify you of significant changes via email or a prominent notice on our website. Continued use of FocusFlow after changes constitutes acceptance of the updated policy.
                </p>
            </div>

            {/* Contact */}
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
                        fontSize: "1.5rem",
                        marginBottom: "1rem",
                    }}
                >
                    📧 Contact Us
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 1.7 }}>
                    Questions about this Privacy Policy? Contact our privacy team:
                </p>
                <p style={{ color: "#ffffff", fontSize: "1.1rem", marginTop: "1rem" }}>
                    Email: <a href="mailto:privacy@focusflow.com" style={{ color: "#38bdf8", textDecoration: "underline", fontWeight: 600 }}>privacy@focusflow.com</a>
                </p>
            </div>

            {/* Old content - remove this */}
            <div style={{ display: "none" }}>
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
                        color: "#94a3b8",
                        fontSize: "1.08rem",
                        lineHeight: 1.7,
                    }}
                >
                    Your data is used to provide and improve FocusFlow’s
                    services. You are always in control of your information.
                </p>
                <h2
                    style={{
                        color: "#38bdf8",
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
                    If you have any questions about our privacy practices, email
                    us at{" "}
                    <a
                        href="mailto:focusflow@studentproject.com"
                        style={{
                            color: "#38bdf8",
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
