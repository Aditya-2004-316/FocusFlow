import React from "react";
import { FaComments, FaEnvelope, FaGithub, FaUsers } from "react-icons/fa";

const cardStyle = {
    background: "var(--color-white)",
    borderRadius: "1rem",
    boxShadow: "var(--shadow-soft)",
    padding: "2rem 1.5rem",
    margin: "1rem 0",
    display: "flex",
    alignItems: "center",
    gap: "1.25rem",
    transition: "box-shadow 0.2s, transform 0.2s",
};

const iconStyle = {
    fontSize: "2.2rem",
    color: "var(--color-primary-600)",
    flexShrink: 0,
};

const headingStyle = {
    fontSize: "2.5rem",
    fontWeight: 800,
    marginBottom: "1rem",
    color: "var(--color-primary-900)",
    letterSpacing: "-0.02em",
};

const heroSubtitleStyle = {
    fontSize: "1.2rem",
    maxWidth: 600,
    margin: "0 auto",
    lineHeight: 1.6,
    color: "var(--color-primary-900)",
};

const sectionTitleStyle = {
    fontSize: "1.25rem",
    fontWeight: 700,
    marginBottom: 6,
    color: "var(--color-gray-900)",
};

const textStyle = {
    color: "var(--color-gray-800)",
};

const highlightStyle = {
    color: "var(--color-primary-600)",
    fontWeight: 500,
    background: "none",
};

const Community = () => (
    <div style={{ minHeight: "70vh", background: "var(--color-gray-50)" }}>
        {/* Hero Section */}
        <section
            style={{
                background: "var(--color-gray-50)",
                padding: "3rem 1rem 2rem 1rem",
                textAlign: "center",
            }}
        >
            <h1 style={headingStyle}>Join the FocusFlow Community</h1>
            <p style={heroSubtitleStyle}>
                Connect, collaborate, and grow with fellow productivity
                enthusiasts. Share your feedback, join discussions, and help
                shape the future of FocusFlow!
            </p>
        </section>

        {/* Community Actions Section */}
        <section
            style={{
                maxWidth: 800,
                margin: "-3rem auto 0 auto",
                padding: "0 1rem",
            }}
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "2rem",
                    marginTop: "2rem",
                }}
            >
                <div style={cardStyle}>
                    <FaComments style={iconStyle} />
                    <div>
                        <h2 style={sectionTitleStyle}>Discussion Forum</h2>
                        <p style={textStyle}>
                            Join our community forum to ask questions, share
                            tips, and connect with other users. <br />
                            <span style={highlightStyle}>(Coming soon!)</span>
                        </p>
                    </div>
                </div>
                <div style={cardStyle}>
                    <FaEnvelope style={iconStyle} />
                    <div>
                        <h2 style={sectionTitleStyle}>Send Feedback</h2>
                        <p style={textStyle}>
                            We value your ideas! Email us at{" "}
                            <a
                                href="mailto:focusflow@studentproject.com"
                                style={highlightStyle}
                            >
                                focusflow@studentproject.com
                            </a>{" "}
                            to share suggestions or report issues.
                        </p>
                    </div>
                </div>
                <div style={cardStyle}>
                    <FaGithub style={iconStyle} />
                    <div>
                        <h2 style={sectionTitleStyle}>Contribute on GitHub</h2>
                        <p style={textStyle}>
                            Help us improve FocusFlow!{" "}
                            <a
                                href="https://github.com/yourusername/focusflow"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={highlightStyle}
                            >
                                View our GitHub repo
                            </a>{" "}
                            to report bugs, request features, or contribute
                            code.
                        </p>
                    </div>
                </div>
                <div style={cardStyle}>
                    <FaUsers style={iconStyle} />
                    <div>
                        <h2 style={sectionTitleStyle}>Meet the Community</h2>
                        <p style={textStyle}>
                            Connect with students, professionals, and
                            productivity fans from around the world. Stay tuned
                            for upcoming events and community spotlights!
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Call to Action */}
        <section style={{ textAlign: "center", margin: "3rem 0 2rem 0" }}>
            <h2
                style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    marginBottom: 10,
                    color: "var(--color-gray-900)",
                }}
            >
                Ready to get involved?
            </h2>
            <p
                style={{
                    color: "var(--color-gray-800)",
                    fontSize: "1.1rem",
                    marginBottom: 18,
                }}
            >
                Whether you’re a new user or a long-time fan, your voice
                matters. Join us and help make FocusFlow even better!
            </p>
            <a
                href="mailto:focusflow@studentproject.com"
                style={{
                    background: "var(--color-primary-600)",
                    color: "#fff",
                    padding: "0.9rem 2.2rem",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    textDecoration: "none",
                    boxShadow: "var(--shadow-md)",
                    transition: "background 0.2s, transform 0.2s",
                    display: "inline-block",
                }}
            >
                Contact Us
            </a>
        </section>
    </div>
);

export default Community;
