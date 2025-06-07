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

    const footerContentStyle: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "4rem",
        alignItems: "start",
    };

    const gridStyle: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "2rem",
        marginTop: "2rem",
        marginLeft: "2rem",
    };

    const sectionStyle: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    };

    const sectionHeadingStyle: CSSProperties = {
        fontSize: "0.875rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        textTransform: "uppercase",
        letterSpacing: "0.025em",
    };

    const contactHeadingStyle: CSSProperties = {
        fontSize: "0.875rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        textTransform: "uppercase",
        letterSpacing: "0.025em",
        marginBottom: "1rem",
    };

    const listStyle: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        paddingLeft: "2rem",
        listStyle: "none",
    };

    const listItemStyle: CSSProperties = {
        position: "relative",
    };

    const listItemMarker: CSSProperties = {
        position: "absolute",
        left: "-1rem",
        top: "0.5rem",
        width: "0.5rem",
        height: "0.5rem",
        borderRadius: "50%",
        backgroundColor: "var(--color-primary-400)",
    };

    const contactListStyle: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        listStyle: "none",
        padding: 0,
        margin: 0,
    };

    const linkStyle: CSSProperties = {
        color: "var(--color-gray-700)",
        textDecoration: "none",
        transition: "color 0.15s ease-in-out",
        fontSize: "0.875rem",
        display: "block",
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

    const logoContainerStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginLeft: "-1rem",
    };

    const logoStyle: CSSProperties = {
        width: "2rem",
        height: "2rem",
    };

    const logoTextStyle: CSSProperties = {
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "var(--color-primary-600)",
    };

    // Add media query styles using CSS
    const mediaQueryStyle = `
        @media (max-width: 1024px) {
            .footer-content {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            .footer-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        @media (max-width: 768px) {
            .footer-bottom {
                flex-direction: column;
                gap: 1rem;
            }
            .footer-links {
                flex-direction: column;
                align-items: center;
            }
        }
        @media (max-width: 480px) {
            .footer-grid {
                grid-template-columns: 1fr;
            }
        }
    `;

    return (
        <>
            <style>{mediaQueryStyle}</style>
            <footer style={containerStyle}>
                <div style={contentWrapperStyle}>
                    <div style={footerContentStyle} className="footer-content">
                        <div style={logoContainerStyle}>
                            <img
                                src="/logo.svg"
                                alt="FocusFlow Logo"
                                style={logoStyle}
                            />
                            <span style={logoTextStyle}>FocusFlow</span>
                        </div>
                        <div style={gridStyle} className="footer-grid">
                            {/* Product Section */}
                            <div style={sectionStyle}>
                                <h3 style={sectionHeadingStyle}>Product</h3>
                                <ul style={listStyle}>
                                    <li style={listItemStyle}>
                                        <div style={listItemMarker} />
                                        <a href="#" style={linkStyle}>
                                            Features
                                        </a>
                                    </li>
                                    <li style={listItemStyle}>
                                        <div style={listItemMarker} />
                                        <a href="#" style={linkStyle}>
                                            Pricing
                                        </a>
                                    </li>
                                    <li style={listItemStyle}>
                                        <div style={listItemMarker} />
                                        <a href="#" style={linkStyle}>
                                            FAQ
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Resources Section */}
                            <div style={sectionStyle}>
                                <h3 style={sectionHeadingStyle}>Resources</h3>
                                <ul style={listStyle}>
                                    <li style={listItemStyle}>
                                        <div style={listItemMarker} />
                                        <a href="#" style={linkStyle}>
                                            Blog
                                        </a>
                                    </li>
                                    <li style={listItemStyle}>
                                        <div style={listItemMarker} />
                                        <a href="#" style={linkStyle}>
                                            Guides
                                        </a>
                                    </li>
                                    <li style={listItemStyle}>
                                        <div style={listItemMarker} />
                                        <a href="#" style={linkStyle}>
                                            Support
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Company Section */}
                            <div style={sectionStyle}>
                                <h3 style={sectionHeadingStyle}>Company</h3>
                                <ul style={listStyle}>
                                    <li style={listItemStyle}>
                                        <div style={listItemMarker} />
                                        <a href="#" style={linkStyle}>
                                            About
                                        </a>
                                    </li>
                                    <li style={listItemStyle}>
                                        <div style={listItemMarker} />
                                        <a href="#" style={linkStyle}>
                                            Careers
                                        </a>
                                    </li>
                                    <li style={listItemStyle}>
                                        <div style={listItemMarker} />
                                        <a href="#" style={linkStyle}>
                                            Contact
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Contact Section */}
                            <div>
                                <h3 style={contactHeadingStyle}>Contact Us</h3>
                                <ul style={contactListStyle}>
                                    <li>
                                        <a
                                            href="mailto:contact@focusflow.com"
                                            style={linkStyle}
                                        >
                                            <div style={contactItemStyle}>
                                                <EnvelopeIcon
                                                    style={{
                                                        height: "1rem",
                                                        width: "1rem",
                                                        color: "var(--color-primary-500)",
                                                    }}
                                                />
                                                <span style={contactTextStyle}>
                                                    contact@focusflow.com
                                                </span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="tel:+1234567890"
                                            style={linkStyle}
                                        >
                                            <div style={contactItemStyle}>
                                                <PhoneIcon
                                                    style={{
                                                        height: "1rem",
                                                        width: "1rem",
                                                        color: "var(--color-primary-500)",
                                                    }}
                                                />
                                                <span style={contactTextStyle}>
                                                    +1 (234) 567-890
                                                </span>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
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
