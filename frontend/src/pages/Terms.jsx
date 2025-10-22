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
                maxWidth: 1200,
                margin: "-2.5rem auto 2rem auto",
                padding: "1rem",
            }}
        >
            {/* Last Updated */}
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
                    Last Updated: January 23, 2025
                </p>
            </div>

            {/* Acceptance of Terms */}
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
                    📜 Acceptance of Terms
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 1.7 }}>
                    By accessing or using FocusFlow, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.
                </p>
            </div>

            {/* Use of Service */}
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
                    ✅ Permitted Use
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    FocusFlow grants you a limited, non-exclusive, non-transferable license to use the service for personal or commercial productivity purposes.
                </p>
                <div style={{ display: "grid", gap: "1rem" }}>
                    <div style={{ padding: "1rem", background: "rgba(15, 23, 42, 0.5)", borderRadius: "0.5rem", border: "1px solid #334155" }}>
                        <h3 style={{ color: "#ffffff", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>You May:</h3>
                        <ul style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.8, paddingLeft: "1.5rem", margin: 0 }}>
                            <li>Create an account and use FocusFlow for productivity tracking</li>
                            <li>Customize your settings and preferences</li>
                            <li>Share your productivity insights (if you choose)</li>
                            <li>Use the service on multiple devices</li>
                        </ul>
                    </div>
                    <div style={{ padding: "1rem", background: "rgba(15, 23, 42, 0.5)", borderRadius: "0.5rem", border: "1px solid #334155" }}>
                        <h3 style={{ color: "#ffffff", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>You May NOT:</h3>
                        <ul style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.8, paddingLeft: "1.5rem", margin: 0 }}>
                            <li>Attempt to hack, reverse engineer, or disrupt the service</li>
                            <li>Use automated bots or scripts to abuse the service</li>
                            <li>Share your account credentials with others</li>
                            <li>Upload malicious content or spam</li>
                            <li>Violate any applicable laws or regulations</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* User Accounts */}
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
                    👤 User Accounts
                </h2>
                <ul style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 2, paddingLeft: "1.5rem" }}>
                    <li>You must provide accurate and complete information when creating an account</li>
                    <li>You are responsible for maintaining the security of your account and password</li>
                    <li>You must notify us immediately of any unauthorized access</li>
                    <li>One person or entity may not maintain more than one free account</li>
                    <li>Accounts registered by bots or automated methods are not permitted</li>
                </ul>
            </div>

            {/* User Content */}
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
                    📝 User Content & Ownership
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    You retain all rights to the content you create and store in FocusFlow (tasks, notes, session data, etc.). However, you grant us a limited license to:
                </p>
                <ul style={{ color: "#94a3b8", fontSize: "1.05rem", lineHeight: 2, paddingLeft: "1.5rem" }}>
                    <li>Store and display your content within the service</li>
                    <li>Create anonymized analytics to improve FocusFlow</li>
                    <li>Back up your data for disaster recovery</li>
                </ul>
                <p style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 1.7, marginTop: "1.5rem" }}>
                    <strong style={{ color: "#ffffff" }}>You are responsible for:</strong> Ensuring your content does not violate any laws, infringe on intellectual property rights, or contain harmful material.
                </p>
            </div>

            {/* Intellectual Property */}
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
                    ©️ Intellectual Property
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 1.7 }}>
                    The FocusFlow service, including its design, code, features, and branding, is owned by FocusFlow and protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works without our explicit permission.
                </p>
            </div>

            {/* Payment & Subscriptions */}
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
                    💳 Payment & Subscriptions
                </h2>
                <div style={{ display: "grid", gap: "1rem" }}>
                    {[
                        { title: "Free Tier", desc: "FocusFlow offers a free tier with basic features available to all users." },
                        { title: "Premium Plans", desc: "Premium subscriptions are billed monthly or annually. Prices are subject to change with 30 days notice." },
                        { title: "Refunds", desc: "Refunds are available within 14 days of purchase if you're not satisfied with the service." },
                        { title: "Cancellation", desc: "You may cancel your subscription at any time. Access continues until the end of your billing period." },
                    ].map((item, idx) => (
                        <div key={idx} style={{ padding: "1rem", background: "rgba(15, 23, 42, 0.5)", borderRadius: "0.5rem", border: "1px solid #334155" }}>
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

            {/* Termination */}
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
                    🚫 Termination
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 1.7, marginBottom: "1rem" }}>
                    We reserve the right to suspend or terminate your account if you:
                </p>
                <ul style={{ color: "#94a3b8", fontSize: "1.05rem", lineHeight: 2, paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
                    <li>Violate these Terms of Service</li>
                    <li>Engage in fraudulent or illegal activities</li>
                    <li>Abuse or harass other users or our team</li>
                    <li>Fail to pay for premium services</li>
                </ul>
                <p style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 1.7 }}>
                    You may delete your account at any time from your account settings. Upon deletion, your data will be removed according to our Privacy Policy.
                </p>
            </div>

            {/* Disclaimers */}
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
                    ⚠️ Disclaimers & Limitations
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    <strong style={{ color: "#ffffff" }}>"AS IS" Service:</strong> FocusFlow is provided "as is" without warranties of any kind. We do not guarantee uninterrupted or error-free service.
                </p>
                <p style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    <strong style={{ color: "#ffffff" }}>Limitation of Liability:</strong> To the maximum extent permitted by law, FocusFlow shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.
                </p>
                <p style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 1.7 }}>
                    <strong style={{ color: "#ffffff" }}>Data Loss:</strong> While we implement regular backups, we are not responsible for data loss. You should maintain your own backups of important information.
                </p>
            </div>

            {/* Changes to Terms */}
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
                    📢 Changes to Terms
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 1.7 }}>
                    We may update these Terms of Service from time to time. We will notify you of significant changes via email or a prominent notice on our website. Your continued use of FocusFlow after changes constitutes acceptance of the updated terms.
                </p>
            </div>

            {/* Governing Law */}
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
                    ⚖️ Governing Law
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 1.7 }}>
                    These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms or your use of FocusFlow shall be resolved through binding arbitration or in the courts of the applicable jurisdiction.
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
                <h2 style={{ color: "#38bdf8", fontWeight: 600, fontSize: "1.5rem", marginBottom: "1rem" }}>
                    📧 Questions About These Terms?
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "1.08rem", lineHeight: 1.7 }}>
                    If you have any questions about these Terms of Service, please contact us:
                </p>
                <p style={{ color: "#ffffff", fontSize: "1.1rem", marginTop: "1rem" }}>
                    Email: <a href="mailto:legal@focusflow.com" style={{ color: "#38bdf8", textDecoration: "underline", fontWeight: 600 }}>legal@focusflow.com</a>
                </p>
            </div>
        </main>
        <LandingFooter />
    </div>
);

export default Terms;
