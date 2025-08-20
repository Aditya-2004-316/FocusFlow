import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline";

import FocusFlowLogo from "../assets/focusflowlogo.png";
import { Link } from "react-router-dom";

const Footer = () => {
    const containerStyle = {
        background:
            "linear-gradient(90deg, var(--color-primary-900) 0%, var(--color-primary-700) 100%)",
        borderTop: "4px solid var(--color-primary-400)",
        boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    };

    const contentWrapperStyle = {
        maxWidth: "84rem",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "2rem 1.5rem",
    };

    const footerContentStyle = {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "4rem",
        alignItems: "start",
    };

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "2rem",
        marginTop: "2rem",
        marginLeft: "2rem",
    };

    const sectionStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        padding: "1rem",
        borderRadius: "0.5rem",
        transition: "all 0.2s ease-in-out",
    };

    const sectionHoverStyle = {
        background: "rgba(255, 255, 255, 0.5)",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    };

    const sectionHeadingStyle = {
        fontSize: "0.875rem",
        fontWeight: 600,
        color: "var(--footer-heading)",
        textTransform: "uppercase",
        letterSpacing: "0.025em",
        paddingBottom: "0.5rem",
        borderBottom: "2px solid var(--color-primary-200)",
        marginBottom: "0.5rem",
    };

    const contactHeadingStyle = {
        fontSize: "0.875rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        textTransform: "uppercase",
        letterSpacing: "0.025em",
        marginBottom: "1rem",
    };

    const listStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        paddingLeft: "1.5rem",
        listStyle: "none",
    };

    const listItemStyle = {
        position: "relative",
    };

    const listItemMarker = {
        position: "absolute",
        left: "-1rem",
        top: "0.75rem",
        width: "0.375rem",
        height: "0.375rem",
        borderRadius: "50%",
        backgroundColor: "var(--color-primary-400)",
        transition: "all 0.2s ease-in-out",
    };

    const listItemHoverMarker = {
        ...listItemMarker,
        backgroundColor: "var(--color-primary-600)",
        transform: "scale(1.2)",
    };

    const contactListStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        listStyle: "none",
        padding: 0,
        margin: 0,
    };

    const linkStyle = {
        color: "var(--footer-link)",
        textDecoration: "none",
        transition: "all 0.2s ease-in-out",
        fontSize: "0.875rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 0",
        position: "relative",
    };

    const linkHoverStyle = {
        color: "var(--color-primary-200)",
        transform: "translateX(0.25rem)",
    };

    const contactItemStyle = {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
    };

    const contactTextStyle = {
        fontSize: "0.875rem",
        color: "var(--footer-link)",
    };

    const bottomStyle = {
        marginTop: "2.5rem",
        paddingTop: "2rem",
        borderTop: "1px solid var(--color-primary-700)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "0.875rem",
        color: "var(--color-primary-100)",
    };

    const bottomLinksStyle = {
        display: "flex",
        gap: "1rem",
    };

    const logoContainerStyle = {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginLeft: "-1rem",
    };

    const logoStyle = {
        width: "2.5rem",
        height: "2.25rem",
    };

    const logoTextStyle = {
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "var(--color-primary-100)",
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

    const handleLinkHover = (e) => {
        const marker = e.currentTarget.previousElementSibling;
        if (marker) {
            Object.assign(e.currentTarget.style, linkHoverStyle);
            Object.assign(marker.style, listItemHoverMarker);
        }
    };

    const handleLinkLeave = (e) => {
        const marker = e.currentTarget.previousElementSibling;
        if (marker) {
            Object.assign(e.currentTarget.style, linkStyle);
            Object.assign(marker.style, listItemMarker);
        }
    };

    // Remove section hover handlers and props
    // const handleSectionHover = (e) => {
    //     Object.assign(e.currentTarget.style, sectionHoverStyle);
    // };

    // const handleSectionLeave = (e) => {
    //     Object.assign(e.currentTarget.style, sectionStyle);
    // };

    return (
        <footer style={containerStyle}>
            <style>{mediaQueryStyle}</style>
            <div style={contentWrapperStyle}>
                <div style={footerContentStyle} className="footer-content">
                    <div style={logoContainerStyle}>
                        <img
                            src={FocusFlowLogo}
                            alt="FocusFlow Logo"
                            style={logoStyle}
                        />
                        <span style={logoTextStyle}>FocusFlow</span>
                    </div>

                    {/* Product Section */}
                    <div style={gridStyle} className="footer-grid">
                        <div
                            style={sectionStyle}
                            // onMouseEnter={handleSectionHover}
                            // onMouseLeave={handleSectionLeave}
                        >
                            <h3 style={sectionHeadingStyle}>Product</h3>
                            <ul style={listStyle}>
                                <li style={listItemStyle}>
                                    <div style={listItemMarker}></div>
                                    <Link
                                        to="/dashboard/features"
                                        style={linkStyle}
                                        onMouseEnter={handleLinkHover}
                                        onMouseLeave={handleLinkLeave}
                                    >
                                        Features
                                        <ArrowRightIcon
                                            style={{
                                                width: "0.875rem",
                                                height: "0.875rem",
                                            }}
                                        />
                                    </Link>
                                </li>
                                <li style={listItemStyle}>
                                    <div style={listItemMarker}></div>
                                    <Link
                                        to="/dashboard/faq"
                                        style={linkStyle}
                                        onMouseEnter={handleLinkHover}
                                        onMouseLeave={handleLinkLeave}
                                    >
                                        FAQ
                                        <ArrowRightIcon
                                            style={{
                                                width: "0.875rem",
                                                height: "0.875rem",
                                            }}
                                        />
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Resources Section */}
                        <div
                            style={sectionStyle}
                            // onMouseEnter={handleSectionHover}
                            // onMouseLeave={handleSectionLeave}
                        >
                            <h3 style={sectionHeadingStyle}>Resources</h3>
                            <ul style={listStyle}>
                                <li style={listItemStyle}>
                                    <div style={listItemMarker}></div>
                                    <Link
                                        to="/dashboard/blog"
                                        style={linkStyle}
                                        onMouseEnter={handleLinkHover}
                                        onMouseLeave={handleLinkLeave}
                                    >
                                        Blog
                                        <ArrowRightIcon
                                            style={{
                                                width: "0.875rem",
                                                height: "0.875rem",
                                            }}
                                        />
                                    </Link>
                                </li>
                                <li style={listItemStyle}>
                                    <div style={listItemMarker}></div>
                                    <Link
                                        to="/dashboard/guides"
                                        style={linkStyle}
                                        onMouseEnter={handleLinkHover}
                                        onMouseLeave={handleLinkLeave}
                                    >
                                        Guides
                                        <ArrowRightIcon
                                            style={{
                                                width: "0.875rem",
                                                height: "0.875rem",
                                            }}
                                        />
                                    </Link>
                                </li>
                                <li style={listItemStyle}>
                                    <div style={listItemMarker}></div>
                                    <Link
                                        to="/dashboard/support"
                                        style={linkStyle}
                                        onMouseEnter={handleLinkHover}
                                        onMouseLeave={handleLinkLeave}
                                    >
                                        Support
                                        <ArrowRightIcon
                                            style={{
                                                width: "0.875rem",
                                                height: "0.875rem",
                                            }}
                                        />
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Company Section */}
                        <div
                            style={sectionStyle}
                            // onMouseEnter={handleSectionHover}
                            // onMouseLeave={handleSectionLeave}
                        >
                            <h3 style={sectionHeadingStyle}>Company</h3>
                            <ul style={listStyle}>
                                <li style={listItemStyle}>
                                    <div style={listItemMarker}></div>
                                    <Link
                                        to="/dashboard/about"
                                        style={linkStyle}
                                        onMouseEnter={handleLinkHover}
                                        onMouseLeave={handleLinkLeave}
                                    >
                                        About
                                        <ArrowRightIcon
                                            style={{
                                                width: "0.875rem",
                                                height: "0.875rem",
                                            }}
                                        />
                                    </Link>
                                </li>
                                <li style={listItemStyle}>
                                    <div style={listItemMarker}></div>
                                    <Link
                                        to="/dashboard/careers"
                                        style={linkStyle}
                                        onMouseEnter={handleLinkHover}
                                        onMouseLeave={handleLinkLeave}
                                    >
                                        Careers
                                        <ArrowRightIcon
                                            style={{
                                                width: "0.875rem",
                                                height: "0.875rem",
                                            }}
                                        />
                                    </Link>
                                </li>
                                <li style={listItemStyle}>
                                    <div style={listItemMarker}></div>
                                    <Link
                                        to="/dashboard/contact"
                                        style={linkStyle}
                                        onMouseEnter={handleLinkHover}
                                        onMouseLeave={handleLinkLeave}
                                    >
                                        Contact
                                        <ArrowRightIcon
                                            style={{
                                                width: "0.875rem",
                                                height: "0.875rem",
                                            }}
                                        />
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Legal Section */}
                        <div
                            style={sectionStyle}
                            // onMouseEnter={handleSectionHover}
                            // onMouseLeave={handleSectionLeave}
                        >
                            <h3 style={sectionHeadingStyle}>Legal</h3>
                            <ul style={listStyle}>
                                <li style={listItemStyle}>
                                    <div style={listItemMarker}></div>
                                    <Link
                                        to="/dashboard/privacy"
                                        style={linkStyle}
                                        onMouseEnter={handleLinkHover}
                                        onMouseLeave={handleLinkLeave}
                                    >
                                        Privacy
                                        <ArrowRightIcon
                                            style={{
                                                width: "0.875rem",
                                                height: "0.875rem",
                                            }}
                                        />
                                    </Link>
                                </li>
                                <li style={listItemStyle}>
                                    <div style={listItemMarker}></div>
                                    <Link
                                        to="/dashboard/terms"
                                        style={linkStyle}
                                        onMouseEnter={handleLinkHover}
                                        onMouseLeave={handleLinkLeave}
                                    >
                                        Terms
                                        <ArrowRightIcon
                                            style={{
                                                width: "0.875rem",
                                                height: "0.875rem",
                                            }}
                                        />
                                    </Link>
                                </li>
                                <li style={listItemStyle}>
                                    <div style={listItemMarker}></div>
                                    <Link
                                        to="/dashboard/cookies"
                                        style={linkStyle}
                                        onMouseEnter={handleLinkHover}
                                        onMouseLeave={handleLinkLeave}
                                    >
                                        Cookies
                                        <ArrowRightIcon
                                            style={{
                                                width: "0.875rem",
                                                height: "0.875rem",
                                            }}
                                        />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div style={bottomStyle} className="footer-bottom">
                    <div>© 2025 FocusFlow. All rights reserved.</div>
                    <div style={bottomLinksStyle} className="footer-links">
                        <Link to="/privacy-policy" style={linkStyle}>
                            Privacy Policy
                        </Link>
                        <Link to="/terms-of-service" style={linkStyle}>
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
