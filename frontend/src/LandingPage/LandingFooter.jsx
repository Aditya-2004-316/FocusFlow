import React from "react";
import { FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";
import focusflowLogo from "../assets/focusflowlogo.png";
import { useLocation } from "react-router-dom";

const LandingFooter = () => {
    const location = useLocation();
    const activeFooterLinkStyle = {
        color: "#38bdf8",
        fontWeight: 700,
        textDecoration: "underline",
        textUnderlineOffset: "0.2em",
    };
    return (
        <footer
            style={{
                background: "linear-gradient(to bottom, #0a0f1a 74%, #131826 100%)",
                color: "#e2e8f0",
                padding: "4.5rem 0 2.5rem",
                marginTop: "auto",
                boxShadow: "0 -8px 24px rgba(0,0,0,0.44)",
            }}
        >
            <style>
                {`
                    .footer-main-container {
                        display: flex;
                        gap: 5rem;
                        margin-bottom: 3.5rem;
                        align-items: flex-start;
                    }
                    
                    .footer-logo-section {
                        min-width: 300px;
                        flex: 1;
                    }
                    
                    .footer-links-wrapper {
                        flex: 2;
                    }
                    
                    .footer-links-grid {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        column-gap: 5rem;
                        row-gap: 2.5rem;
                    }
                    
                    @media (max-width: 850px) {
                        .footer-main-container {
                            flex-direction: column;
                            gap: 3rem;
                            align-items: center;
                        }
                        
                        .footer-logo-section {
                            text-align: center;
                            min-width: unset;
                            width: 100%;
                            max-width: 400px;
                        }
                        
                        .footer-logo-section > div:first-child {
                            justify-content: center;
                        }
                        
                        .footer-logo-section > div:last-child {
                            justify-content: center;
                        }
                        
                        .footer-links-wrapper {
                            width: 100%;
                            display: flex;
                            justify-content: center;
                        }
                        
                        .footer-links-grid {
                            column-gap: 3rem;
                            max-width: 900px;
                            justify-items: center;
                        }
                    }
                    
                    @media (max-width: 540px) {
                        .footer-links-grid {
                            grid-template-columns: 1fr;
                            gap: 2.5rem;
                            text-align: center;
                        }
                        
                        .footer-links-grid ul {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        }
                    }
                `}
            </style>
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 1.5rem",
                }}
            >
                <div className="footer-main-container">
                    {/* Logo/Info/Social Section */}
                    <div className="footer-logo-section">
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
                                }}
                            />
                            <h3
                                style={{
                                    background: "linear-gradient(to right, #38bdf8, #60a5fa)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
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
                                color: "#94a3b8",
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
                                    color: "#94a3b8",
                                    fontSize: "1.3rem",
                                    transition: "color 0.2s",
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
                                    color: "#94a3b8",
                                    fontSize: "1.3rem",
                                    transition: "color 0.2s",
                                }}
                                tabIndex={-1}
                            >
                                <FaTwitter />
                            </a>
                            <a
                                href="mailto:focusflow@studentproject.com"
                                style={{
                                    color: "#94a3b8",
                                    fontSize: "1.3rem",
                                    transition: "color 0.2s",
                                }}
                                tabIndex={-1}
                            >
                                <FaEnvelope />
                            </a>
                        </div>
                    </div>
                    {/* Grid Section for Product, Company, Legal */}
                    <div className="footer-links-wrapper">
                        <div className="footer-links-grid">
                            {/* Product */}
                            <div>
                                <h4
                                    style={{
                                        color: "#ffffff",
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
                                                color: "#94a3b8",
                                                textDecoration: "none",
                                                transition:
                                                    "color 0.2s, text-decoration 0.2s",
                                                ...(location.pathname ===
                                                    "/features"
                                                    ? activeFooterLinkStyle
                                                    : {}),
                                            }}
                                            onMouseOver={(e) =>
                                            (e.currentTarget.style.color =
                                                "#38bdf8")
                                            }
                                            onMouseOut={(e) =>
                                            (e.currentTarget.style.color =
                                                location.pathname ===
                                                    "/features"
                                                    ? "#38bdf8"
                                                    : "#94a3b8")
                                            }
                                            tabIndex={-1}
                                        >
                                            Features
                                        </a>
                                    </li>
                                    <li style={{ marginBottom: "0.8rem" }}>
                                        <a
                                            href="/product"
                                            style={{
                                                color: "#94a3b8",
                                                textDecoration: "none",
                                                transition:
                                                    "color 0.2s, text-decoration 0.2s",
                                                ...(location.pathname ===
                                                    "/product"
                                                    ? activeFooterLinkStyle
                                                    : {}),
                                            }}
                                            onMouseOver={(e) =>
                                            (e.currentTarget.style.color =
                                                "#38bdf8")
                                            }
                                            onMouseOut={(e) =>
                                            (e.currentTarget.style.color =
                                                location.pathname ===
                                                    "/product"
                                                    ? "#38bdf8"
                                                    : "#94a3b8")
                                            }
                                            tabIndex={-1}
                                        >
                                            Product Tour
                                        </a>
                                    </li>
                                    <li style={{ marginBottom: "0.8rem" }}>
                                        <a
                                            href="/updates"
                                            style={{
                                                color: "#94a3b8",
                                                textDecoration: "none",
                                                transition:
                                                    "color 0.2s, textDecoration 0.2s",
                                                ...(location.pathname ===
                                                    "/updates"
                                                    ? activeFooterLinkStyle
                                                    : {}),
                                            }}
                                            onMouseOver={(e) =>
                                            (e.currentTarget.style.color =
                                                "#38bdf8")
                                            }
                                            onMouseOut={(e) =>
                                            (e.currentTarget.style.color =
                                                location.pathname ===
                                                    "/updates"
                                                    ? "#38bdf8"
                                                    : "#94a3b8")
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
                                        color: "#ffffff",
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
                                                color: "#94a3b8",
                                                textDecoration: "none",
                                                transition:
                                                    "color 0.2s, textDecoration 0.2s",
                                                ...(location.pathname ===
                                                    "/about"
                                                    ? activeFooterLinkStyle
                                                    : {}),
                                            }}
                                            onMouseOver={(e) =>
                                            (e.currentTarget.style.color =
                                                "#38bdf8")
                                            }
                                            onMouseOut={(e) =>
                                            (e.currentTarget.style.color =
                                                location.pathname ===
                                                    "/about"
                                                    ? "#38bdf8"
                                                    : "#94a3b8")
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
                                                color: "#94a3b8",
                                                textDecoration: "none",
                                                transition:
                                                    "color 0.2s, textDecoration 0.2s",
                                                ...(location.pathname ===
                                                    "/careers"
                                                    ? activeFooterLinkStyle
                                                    : {}),
                                            }}
                                            onMouseOver={(e) =>
                                            (e.currentTarget.style.color =
                                                "#38bdf8")
                                            }
                                            onMouseOut={(e) =>
                                            (e.currentTarget.style.color =
                                                location.pathname ===
                                                    "/careers"
                                                    ? "#38bdf8"
                                                    : "#94a3b8")
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
                                                color: "#94a3b8",
                                                textDecoration: "none",
                                                transition:
                                                    "color 0.2s, textDecoration 0.2s",
                                                ...(location.pathname ===
                                                    "/contact"
                                                    ? activeFooterLinkStyle
                                                    : {}),
                                            }}
                                            onMouseOver={(e) =>
                                            (e.currentTarget.style.color =
                                                "#38bdf8")
                                            }
                                            onMouseOut={(e) =>
                                            (e.currentTarget.style.color =
                                                location.pathname ===
                                                    "/contact"
                                                    ? "#38bdf8"
                                                    : "#94a3b8")
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
                                        color: "#ffffff",
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
                                                color: "#94a3b8",
                                                textDecoration: "none",
                                                transition:
                                                    "color 0.2s, textDecoration 0.2s",
                                                ...(location.pathname ===
                                                    "/privacy"
                                                    ? activeFooterLinkStyle
                                                    : {}),
                                            }}
                                            onMouseOver={(e) =>
                                            (e.currentTarget.style.color =
                                                "#38bdf8")
                                            }
                                            onMouseOut={(e) =>
                                            (e.currentTarget.style.color =
                                                location.pathname ===
                                                    "/privacy"
                                                    ? "#38bdf8"
                                                    : "#94a3b8")
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
                                                color: "#94a3b8",
                                                textDecoration: "none",
                                                transition:
                                                    "color 0.2s, textDecoration 0.2s",
                                                ...(location.pathname ===
                                                    "/terms"
                                                    ? activeFooterLinkStyle
                                                    : {}),
                                            }}
                                            onMouseOver={(e) =>
                                            (e.currentTarget.style.color =
                                                "#38bdf8")
                                            }
                                            onMouseOut={(e) =>
                                            (e.currentTarget.style.color =
                                                location.pathname ===
                                                    "/terms"
                                                    ? "#38bdf8"
                                                    : "#94a3b8")
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
                                                color: "#94a3b8",
                                                textDecoration: "none",
                                                transition:
                                                    "color 0.2s, textDecoration 0.2s",
                                                ...(location.pathname ===
                                                    "/security"
                                                    ? activeFooterLinkStyle
                                                    : {}),
                                            }}
                                            onMouseOver={(e) =>
                                            (e.currentTarget.style.color =
                                                "#38bdf8")
                                            }
                                            onMouseOut={(e) =>
                                            (e.currentTarget.style.color =
                                                location.pathname ===
                                                    "/security"
                                                    ? "#38bdf8"
                                                    : "#94a3b8")
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
                        paddingTop: "2.5rem",
                        textAlign: "center",
                        color: "#94a3b8",
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
