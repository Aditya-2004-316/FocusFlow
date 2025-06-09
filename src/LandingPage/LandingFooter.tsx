import React from "react";

const LandingFooter: React.FC = () => {
    return (
        <footer
            style={{
                backgroundColor: "#1f2937",
                color: "#f3f4f6",
                padding: "4rem 5%",
                marginTop: "4rem",
            }}
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "2rem",
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
                <div>
                    <h3
                        style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            marginBottom: "1rem",
                            color: "#ffffff",
                        }}
                    >
                        FocusFlow
                    </h3>
                    <p
                        style={{
                            color: "#9ca3af",
                            lineHeight: "1.5",
                        }}
                    >
                        Your ultimate productivity companion for managing tasks,
                        tracking time, and achieving your goals.
                    </p>
                </div>

                <div
                    style={{
                        marginLeft: "10rem",
                    }}
                >
                    <h4
                        style={{
                            fontSize: "1rem",
                            fontWeight: "bold",
                            marginBottom: "1rem",
                            color: "#ffffff",
                        }}
                    >
                        Product
                    </h4>
                    <ul
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                        }}
                    >
                        <li style={{ marginBottom: "0.5rem" }}>
                            <a
                                href="#features"
                                style={{
                                    color: "#9ca3af",
                                    textDecoration: "none",
                                }}
                            >
                                Features
                            </a>
                        </li>
                        <li style={{ marginBottom: "0.5rem" }}>
                            <a
                                href="#pricing"
                                style={{
                                    color: "#9ca3af",
                                    textDecoration: "none",
                                }}
                            >
                                Pricing
                            </a>
                        </li>
                        <li style={{ marginBottom: "0.5rem" }}>
                            <a
                                href="#updates"
                                style={{
                                    color: "#9ca3af",
                                    textDecoration: "none",
                                }}
                            >
                                Updates
                            </a>
                        </li>
                    </ul>
                </div>

                <div
                    style={{
                        marginLeft: "10rem",
                    }}
                >
                    <h4
                        style={{
                            fontSize: "1rem",
                            fontWeight: "bold",
                            marginBottom: "1rem",
                            color: "#ffffff",
                        }}
                    >
                        Company
                    </h4>
                    <ul
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                        }}
                    >
                        <li style={{ marginBottom: "0.5rem" }}>
                            <a
                                href="#about"
                                style={{
                                    color: "#9ca3af",
                                    textDecoration: "none",
                                }}
                            >
                                About
                            </a>
                        </li>
                        <li style={{ marginBottom: "0.5rem" }}>
                            <a
                                href="#careers"
                                style={{
                                    color: "#9ca3af",
                                    textDecoration: "none",
                                }}
                            >
                                Careers
                            </a>
                        </li>
                        <li style={{ marginBottom: "0.5rem" }}>
                            <a
                                href="#contact"
                                style={{
                                    color: "#9ca3af",
                                    textDecoration: "none",
                                }}
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                <div
                    style={{
                        marginLeft: "10rem",
                    }}
                >
                    <h4
                        style={{
                            fontSize: "1rem",
                            fontWeight: "bold",
                            marginBottom: "1rem",
                            color: "#ffffff",
                        }}
                    >
                        Legal
                    </h4>
                    <ul
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                        }}
                    >
                        <li style={{ marginBottom: "0.5rem" }}>
                            <a
                                href="#privacy"
                                style={{
                                    color: "#9ca3af",
                                    textDecoration: "none",
                                }}
                            >
                                Privacy
                            </a>
                        </li>
                        <li style={{ marginBottom: "0.5rem" }}>
                            <a
                                href="#terms"
                                style={{
                                    color: "#9ca3af",
                                    textDecoration: "none",
                                }}
                            >
                                Terms
                            </a>
                        </li>
                        <li style={{ marginBottom: "0.5rem" }}>
                            <a
                                href="#security"
                                style={{
                                    color: "#9ca3af",
                                    textDecoration: "none",
                                }}
                            >
                                Security
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div
                style={{
                    borderTop: "1px solid #374151",
                    marginTop: "3rem",
                    paddingTop: "2rem",
                    textAlign: "center",
                    color: "#9ca3af",
                }}
            >
                <p>© 2024 FocusFlow. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default LandingFooter;
