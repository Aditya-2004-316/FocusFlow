import React from "react";
import { FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";
import focusflowLogo from "../assets/focusflowlogo.png";
import { useLocation } from "react-router-dom";

const LandingFooter = () => {
    const location = useLocation();
    const activeFooterLinkStyle = {
        color: "var(--color-primary-200)",
        fontWeight: 700,
        textDecoration: "underline",
        textUnderlineOffset: "0.2em",
        outline: "none",
        border: "none",
    };
    return (
        <footer
            style={{
                background:
                    "linear-gradient(90deg, var(--color-primary-900) 0%, var(--color-primary-700) 100%)",
                color: "var(--color-gray-200)",
                padding: "4.5rem 0 2.5rem",
                marginTop: "auto",
                boxShadow: "0 -2px 16px rgba(0,0,0,0.08)",
            }}
        >
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 1.5rem",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        gap: "5rem",
                        marginBottom: "3.5rem",
                        alignItems: "flex-start",
                    }}
                >
                    {/* Logo/Info/Social Section */}
                    <div style={{ minWidth: 300, flex: 1 }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1.5rem",
                                marginBottom: "1.5rem",
                                whiteSpace: "nowrap",
                            }}
                        >
                            <img
                                src={focusflowLogo}
                                alt="FocusFlow Logo"
                                style={{
                                    width: "2.5rem",
                                    height: "2.5rem",
                                    objectFit: "contain",
                                    borderRadius: "0.5rem",
                                    background: "var(--color-white)",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                                    outline: "none",
                                    border: "none",
                                }}
                            />
                            <h3
                                style={{
                                    color: "var(--color-white)",
                                    fontSize: "1.35rem",
                                    fontWeight: "700",
                                    margin: 0,
                                }}
                            >
                                FocusFlow
                            </h3>
                        </div>
                        <p
                            style={{
                                lineHeight: "1.6",
                                marginBottom: "1.5rem",
                                color: "var(--color-gray-200)",
                                fontSize: "1.05rem",
                            }}
                        >
                            Your ultimate productivity companion for managing
                            tasks, tracking time, and achieving your goals.
                        </p>
                        <div
                            style={{
                                display: "flex",
                                gap: "1.5rem",
                                marginTop: "1rem",
                            }}
                        >
                            <a
                                href="https://github.com/yourusername/focusflow"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: "var(--color-gray-200)",
                                    fontSize: "1.3rem",
                                    transition: "color 0.2s",
                                    outline: "none",
                                    border: "none",
                                }}
                                tabIndex={-1}
                            >
                                <FaGithub />
                            </a>
                            <a
                                href="https://twitter.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: "var(--color-gray-200)",
                                    fontSize: "1.3rem",
                                    transition: "color 0.2s",
                                    outline: "none",
                                    border: "none",
                                }}
                                tabIndex={-1}
                            >
                                <FaTwitter />
                            </a>
                            <a
                                href="mailto:focusflow@studentproject.com"
                                style={{
                                    color: "var(--color-gray-200)",
                                    fontSize: "1.3rem",
                                    transition: "color 0.2s",
                                    outline: "none",
                                    border: "none",
                                }}
                                tabIndex={-1}
                            >
                                <FaEnvelope />
                            </a>
                        </div>
                    </div>
                    {/* Grid Section for Product, Company, Legal */}
                    <div style={{ flex: 2 }}>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                columnGap: "5rem",
                                rowGap: "2.5rem",
                            }}
                        >
                            {/* Product */}
                            <div>
                                <h4
                                    style={{
                                        color: "var(--color-white)",
                                        fontSize: "1.08rem",
                                        fontWeight: "600",
                                        marginBottom: "1.3rem",
                                        letterSpacing: "0.01em",
                                    }}
                                >
                                    Product
                                </h4>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    <li style={{ marginBottom: "0.8rem" }}>
                                        <a
                                            href="/features"
                                            style={{
                                                color: "var(--color-gray-200)",
                                                textDecoration: "none",
                                                transition:
                                                    "color 0.2s, text-decoration 0.2s",
                                                outline: "none",
                                                border: "none",
                                                ...(location.pathname ===
                                                "/features"
                                                    ? activeFooterLinkStyle
                                                    : {}),
                                            }}
                                            onMouseOver={(e) =>
                                                (e.currentTarget.style.color =
                                                    "var(--color-primary-200)")
                                            }
                                            onMouseOut={(e) =>
                                                (e.currentTarget.style.color =
                                                    location.pathname ===
                                                    "/features"
                                                        ? "var(--color-primary-200)"
                                                        : "var(--color-gray-200)")
                                            }
                                            tabIndex={-1}
                                        >
                                            Features
                                        </a>
                                    </li>
                                    <li style={{ marginBottom: "0.8rem" }}>
                                        <a
                                            href="/updates"
                                            style={{
                                                color: "var(--color-gray-200)",
                                                textDecoration: "none",
                                                transition:
                                                    "color 0.2s, textDecoration 0.2s",
                                                outline: "none",
                                                border: "none",
                                                ...(location.pathname ===
                                                "/updates"
                                                    ? activeFooterLinkStyle
                                                    : {}),
                                            }}
                                            onMouseOver={(e) =>
                                                (e.currentTarget.style.color =
                                                    "var(--color-primary-200)")
                                            }
                                            onMouseOut={(e) =>
                                                (e.currentTarget.style.color =
                                                    location.pathname ===
                                                    "/updates"
                                                        ? "var(--color-primary-200)"
                                                        : "var(--color-gray-200)")
                                            }
                                            tabIndex={-1}
                                        >
                                            Updates
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {/* Company */}
                            <div>
                                <h4
                                    style={{
                                        color: "var(--color-white)",
                                        fontSize: "1.08rem",
                                        fontWeight: "600",
                                        marginBottom: "1.3rem",
                                        letterSpacing: "0.01em",
                                    }}
                                >
                                    Company
                                </h4>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    <li style={{ marginBottom: "0.8rem" }}>
                                        <a
                                            href="/about"
                                            style={{
                                                color: "var(--color-gray-200)",
                                                textDecoration: "none",
                                                transition:
                                                    "color 0.2s, textDecoration 0.2s",
                                                outline: "none",
                                                border: "none",
                                                ...(location.pathname ===
                                                "/about"
                                                    ? activeFooterLinkStyle
                                                    : {}),
                                            }}
                                            onMouseOver={(e) =>
                                                (e.currentTarget.style.color =
                                                    "var(--color-primary-200)")
                                            }
                                            onMouseOut={(e) =>
                                                (e.currentTarget.style.color =
                                                    location.pathname ===
                                                    "/about"
                                                        ? "var(--color-primary-200)"
                                                        : "var(--color-gray-200)")
                                            }
                                            tabIndex={-1}
                                        >
                                            About
                                        </a>
                                    </li>
                                    <li style={{ marginBottom: "0.8rem" }}>
                                        <a
                                            href="/careers"
                                            style={{
                                                color: "var(--color-gray-200)",
                                                textDecoration: "none",
                                                transition:
                                                    "color 0.2s, textDecoration 0.2s",
                                                outline: "none",
                                                border: "none",
                                                ...(location.pathname ===
                                                "/careers"
                                                    ? activeFooterLinkStyle
                                                    : {}),
                                            }}
                                            onMouseOver={(e) =>
                                                (e.currentTarget.style.color =
                                                    "var(--color-primary-200)")
                                            }
                                            onMouseOut={(e) =>
                                                (e.currentTarget.style.color =
                                                    location.pathname ===
                                                    "/careers"
                                                        ? "var(--color-primary-200)"
                                                        : "var(--color-gray-200)")
                                            }
                                            tabIndex={-1}
                                        >
                                            Careers
                                        </a>
                                    </li>
                                    <li style={{ marginBottom: "0.8rem" }}>
                                        <a
                                            href="/contact"
                                            style={{
                                                color: "var(--color-gray-200)",
                                                textDecoration: "none",
                                                transition:
                                                    "color 0.2s, textDecoration 0.2s",
                                                outline: "none",
                                                border: "none",
                                                ...(location.pathname ===
                                                "/contact"
                                                    ? activeFooterLinkStyle
                                                    : {}),
                                            }}
                                            onMouseOver={(e) =>
                                                (e.currentTarget.style.color =
                                                    "var(--color-primary-200)")
                                            }
                                            onMouseOut={(e) =>
                                                (e.currentTarget.style.color =
                                                    location.pathname ===
                                                    "/contact"
                                                        ? "var(--color-primary-200)"
                                                        : "var(--color-gray-200)")
                                            }
                                            tabIndex={-1}
                                        >
                                            Contact
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {/* Legal */}
                            <div>
                                <h4
                                    style={{
                                        color: "var(--color-white)",
                                        fontSize: "1.08rem",
                                        fontWeight: "600",
                                        marginBottom: "1.3rem",
                                        letterSpacing: "0.01em",
                                    }}
                                >
                                    Legal
                                </h4>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    <li style={{ marginBottom: "0.8rem" }}>
                                        <a
                                            href="/privacy"
                                            style={{
                                                color: "var(--color-gray-200)",
                                                textDecoration: "none",
                                                transition:
                                                    "color 0.2s, textDecoration 0.2s",
                                                outline: "none",
                                                border: "none",
                                                ...(location.pathname ===
                                                "/privacy"
                                                    ? activeFooterLinkStyle
                                                    : {}),
                                            }}
                                            onMouseOver={(e) =>
                                                (e.currentTarget.style.color =
                                                    "var(--color-primary-200)")
                                            }
                                            onMouseOut={(e) =>
                                                (e.currentTarget.style.color =
                                                    location.pathname ===
                                                    "/privacy"
                                                        ? "var(--color-primary-200)"
                                                        : "var(--color-gray-200)")
                                            }
                                            tabIndex={-1}
                                        >
                                            Privacy
                                        </a>
                                    </li>
                                    <li style={{ marginBottom: "0.8rem" }}>
                                        <a
                                            href="/terms"
                                            style={{
                                                color: "var(--color-gray-200)",
                                                textDecoration: "none",
                                                transition:
                                                    "color 0.2s, textDecoration 0.2s",
                                                outline: "none",
                                                border: "none",
                                                ...(location.pathname ===
                                                "/terms"
                                                    ? activeFooterLinkStyle
                                                    : {}),
                                            }}
                                            onMouseOver={(e) =>
                                                (e.currentTarget.style.color =
                                                    "var(--color-primary-200)")
                                            }
                                            onMouseOut={(e) =>
                                                (e.currentTarget.style.color =
                                                    location.pathname ===
                                                    "/terms"
                                                        ? "var(--color-primary-200)"
                                                        : "var(--color-gray-200)")
                                            }
                                            tabIndex={-1}
                                        >
                                            Terms
                                        </a>
                                    </li>
                                    <li style={{ marginBottom: "0.8rem" }}>
                                        <a
                                            href="/security"
                                            style={{
                                                color: "var(--color-gray-200)",
                                                textDecoration: "none",
                                                transition:
                                                    "color 0.2s, textDecoration 0.2s",
                                                outline: "none",
                                                border: "none",
                                                ...(location.pathname ===
                                                "/security"
                                                    ? activeFooterLinkStyle
                                                    : {}),
                                            }}
                                            onMouseOver={(e) =>
                                                (e.currentTarget.style.color =
                                                    "var(--color-primary-200)")
                                            }
                                            onMouseOut={(e) =>
                                                (e.currentTarget.style.color =
                                                    location.pathname ===
                                                    "/security"
                                                        ? "var(--color-primary-200)"
                                                        : "var(--color-gray-200)")
                                            }
                                            tabIndex={-1}
                                        >
                                            Security
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        borderTop: "1px solid var(--color-primary-700)",
                        paddingTop: "2.5rem",
                        textAlign: "center",
                        color: "var(--color-primary-100)",
                        fontSize: "1.08rem",
                        letterSpacing: "0.01em",
                        marginTop: "1.5rem",
                    }}
                >
                    © 2025 FocusFlow. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;
