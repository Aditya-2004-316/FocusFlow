import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
} from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";

const Footer = () => {
    const containerStyle: CSSProperties = {
        background:
            "linear-gradient(to right, var(--color-primary-100), var(--color-cyan-100))",
        borderTop: "4px solid var(--color-primary-400)",
        boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    };

    const contentWrapperStyle: CSSProperties = {
        maxWidth: "84rem",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "2rem 1.5rem",
    };

    const gridStyle: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "2rem",
    };

    const sectionHeadingStyle: CSSProperties = {
        fontSize: "0.875rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "1rem",
        textTransform: "uppercase",
        letterSpacing: "0.025em",
    };

    const listStyle: CSSProperties = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "1rem",
    };

    const linkStyle: CSSProperties = {
        color: "var(--color-gray-700)",
        textDecoration: "none",
        transition: "color 0.15s ease-in-out",
        fontSize: "0.875rem",
    };

    const contactItemStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
    };

    const contactTextStyle: CSSProperties = {
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
    };

    const bottomStyle: CSSProperties = {
        marginTop: "2.5rem",
        paddingTop: "2rem",
        borderTop: "1px solid var(--color-gray-200)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "0.875rem",
        color: "var(--color-gray-500)",
    };

    const bottomLinksStyle: CSSProperties = {
        display: "flex",
        gap: "1rem",
    };

    // Add media query styles using CSS
    const mediaQueryStyle = `
        @media (max-width: 768px) {
            .footer-grid {
                grid-template-columns: 1fr;
            }
            .footer-bottom {
                flex-direction: column;
                gap: 1rem;
            }
            .footer-links {
                flex-direction: column;
                align-items: center;
            }
        }
    `;

    return (
        <>
            <style>{mediaQueryStyle}</style>
            <footer style={containerStyle}>
                <div style={contentWrapperStyle}>
                    <div style={gridStyle} className="footer-grid">
                        {/* Product Section */}
                        <div>
                            <h3 style={sectionHeadingStyle}>Product</h3>
                            <ul style={listStyle}>
                                <li>
                                    <a href="/features" style={linkStyle}>
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="/pricing" style={linkStyle}>
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a href="/updates" style={linkStyle}>
                                        Updates
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* Resources Section */}
                        <div>
                            <h3 style={sectionHeadingStyle}>Resources</h3>
                            <ul style={listStyle}>
                                <li>
                                    <a href="/blog" style={linkStyle}>
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="/guides" style={linkStyle}>
                                        Guides
                                    </a>
                                </li>
                                <li>
                                    <a href="/support" style={linkStyle}>
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* Company Section */}
                        <div>
                            <h3 style={sectionHeadingStyle}>Company</h3>
                            <ul style={listStyle}>
                                <li>
                                    <a href="/about" style={linkStyle}>
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="/careers" style={linkStyle}>
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact" style={linkStyle}>
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* Contact Section */}
                        <div>
                            <h3 style={sectionHeadingStyle}>Contact Us</h3>
                            <ul style={listStyle}>
                                <li style={contactItemStyle}>
                                    <EnvelopeIcon
                                        style={{
                                            height: "1rem",
                                            width: "1rem",
                                            color: "var(--color-gray-600)",
                                        }}
                                    />
                                    <a
                                        href="mailto:support@focusflow.com"
                                        style={linkStyle}
                                    >
                                        support@focusflow.com
                                    </a>
                                </li>
                                <li style={contactItemStyle}>
                                    <PhoneIcon
                                        style={{
                                            height: "1rem",
                                            width: "1rem",
                                            color: "var(--color-gray-600)",
                                        }}
                                    />
                                    <a href="tel:+1234567890" style={linkStyle}>
                                        +1 (234) 567-890
                                    </a>
                                </li>
                                <li style={contactItemStyle}>
                                    <MapPinIcon
                                        style={{
                                            height: "1rem",
                                            width: "1rem",
                                            color: "var(--color-gray-600)",
                                        }}
                                    />
                                    <span style={contactTextStyle}>
                                        123 Focus Street, Productivity City
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div style={bottomStyle} className="footer-bottom">
                        <div>© 2024 FocusFlow. All rights reserved.</div>
                        <div
                            style={bottomLinksStyle}
                            className="footer-bottom-links"
                        >
                            <a href="/privacy" style={linkStyle}>
                                Privacy Policy
                            </a>
                            <a href="/terms" style={linkStyle}>
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
