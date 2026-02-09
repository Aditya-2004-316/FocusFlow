import { useState } from "react";
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline";

import FocusFlowLogo from "../assets/focusflowlogo.png";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
    const containerStyle = {
        background:
            "linear-gradient(to right, var(--color-primary-500), var(--color-cyan-400))",
        borderTop: "1px solid var(--color-primary-500)",
        boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    };

    const contentWrapperStyle = {
        maxWidth: "84rem",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "3rem 1.5rem 2rem",
    };

    const footerContentStyle = {
        display: "grid",
        gridTemplateColumns: "minmax(200px, 280px) 1fr",
        gap: "3rem",
        alignItems: "start",
    };

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "3rem",
        marginTop: "2.5rem",
    };

    const sectionStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "0",
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
        paddingBottom: "0.75rem",
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
        gap: "0.75rem",
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
        pointerEvents: "none",
    };

    const listItemHoverMarker = {
        ...listItemMarker,
        backgroundColor: "var(--color-primary-600)",
        transform: "scale(1.2)",
    };

    const listItemActiveMarker = {
        ...listItemMarker,
        backgroundColor: "var(--color-white)",
        transform: "scale(1.35)",
        boxShadow: "0 0 0 4px rgba(255, 255, 255, 0.18)",
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
        padding: "0.5rem 0.75rem",
        position: "relative",
    };

    const linkHoverStyle = {
        color: "var(--color-primary-50)",
        transform: "translateX(0.25rem)",
        background: "linear-gradient(135deg, rgba(125, 211, 252, 0.25), rgba(14, 165, 233, 0.12))",
        borderRadius: "0.75rem",
        boxShadow: "0 10px 20px rgba(14, 165, 233, 0.18)",
    };

    const activeLinkStyle = {
        color: "var(--color-primary-50)",
        fontWeight: 600,
        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.32), rgba(56, 189, 248, 0.18))",
        transform: "translateX(0.25rem)",
        borderRadius: "0.75rem",
        boxShadow: "0 14px 28px rgba(56, 189, 248, 0.22)",
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
        marginTop: "3rem",
        paddingTop: "1.75rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "0.875rem",
        color: "var(--color-primary-100)",
    };

    const bottomLinksStyle = {
        display: "flex",
        gap: "1.5rem",
    };

    const logoContainerStyle = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1rem",
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
                grid-template-columns: repeat(3, 1fr);
            }
        }
        @media (max-width: 829px) {
            .footer-content {
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 2.5rem !important;
            }
            .footer-logo-container {
                display: flex !important;
                justify-content: center !important;
                width: 100% !important;
            }
            .footer-grid {
                display: grid !important;
                grid-template-columns: repeat(3, 1fr) !important;
                justify-content: center !important;
                width: auto !important;
                margin-top: 0 !important;
            }
        }
        @media (max-width: 768px) {
            .footer-bottom {
                flex-direction: column;
                gap: 1rem;
            }
            .footer-links {
                flex-direction: row !important;
                align-items: center;
            }
        }
        @media (max-width: 650px) {
            .footer-bottom {
                flex-direction: column-reverse !important;
                align-items: center !important;
                gap: 1.5rem !important;
            }
            .footer-links-wrapper {
                display: flex !important;
                justify-content: center !important;
                width: 100% !important;
            }
            .footer-links {
                display: flex !important;
                flex-direction: row !important;
                justify-content: center !important;
                align-items: center !important;
                gap: 1.5rem !important;
            }
            .footer-copyright-wrapper {
                display: flex !important;
                justify-content: center !important;
                width: 100% !important;
                margin-bottom: 4.5rem !important;
            }
        }
        @media (max-width: 520px) {
            .footer-content {
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 2rem !important;
            }
            .footer-logo-container {
                display: flex !important;
                justify-content: center !important;
                width: 100% !important;
                text-align: center !important;
            }
            .footer-grid {
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                gap: 2rem !important;
                width: 100% !important;
            }
            .footer-grid > div {
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                text-align: center !important;
            }
            .footer-grid ul {
                align-items: flex-start !important;
                width: auto !important;
            }
            .footer-grid ul li {
                justify-content: flex-start !important;
            }
        }
        @media (max-width: 480px) {
            .footer-links {
                flex-direction: row !important;
            }
        }
    `;

    const location = useLocation();
    const [hoveredLink, setHoveredLink] = useState(null);

    const handleMouseEnter = (path) => setHoveredLink(path);
    const handleMouseLeave = () => setHoveredLink(null);

    const isActivePath = (path) =>
        location.pathname === path || location.pathname.startsWith(`${path}/`);

    const getLinkStyles = (path) => {
        const baseStyle = { ...linkStyle };
        if (hoveredLink === path) {
            Object.assign(baseStyle, linkHoverStyle);
        }
        if (isActivePath(path)) {
            Object.assign(baseStyle, activeLinkStyle);
        }
        return baseStyle;
    };

    const getMarkerStyles = (path) => {
        const baseStyle = { ...listItemMarker };
        if (isActivePath(path)) {
            Object.assign(baseStyle, listItemActiveMarker);
        }
        if (hoveredLink === path) {
            Object.assign(baseStyle, listItemHoverMarker);
        }
        return baseStyle;
    };

    const getLinkProps = (path) => ({
        style: getLinkStyles(path),
        onMouseEnter: () => handleMouseEnter(path),
        onMouseLeave: handleMouseLeave,
        onFocus: () => handleMouseEnter(path),
        onBlur: handleMouseLeave,
    });

    return (
        <footer style={containerStyle}>
            <style>{mediaQueryStyle}</style>
            <div style={contentWrapperStyle}>
                <div style={footerContentStyle} className="footer-content">
                    <div style={logoContainerStyle} className="footer-logo-container">
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
                                    <div style={getMarkerStyles("/dashboard/features")}></div>
                                    <Link
                                        to="/dashboard/features"
                                        {...getLinkProps("/dashboard/features")}
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
                                    <div style={getMarkerStyles("/dashboard/faq")}></div>
                                    <Link
                                        to="/dashboard/faq"
                                        {...getLinkProps("/dashboard/faq")}
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
                                <li style={listItemStyle}>
                                    <div style={getMarkerStyles("/dashboard/cookies")}></div>
                                    <Link
                                        to="/dashboard/cookies"
                                        {...getLinkProps("/dashboard/cookies")}
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

                        {/* Resources Section */}
                        <div
                            style={sectionStyle}
                        // onMouseEnter={handleSectionHover}
                        // onMouseLeave={handleSectionLeave}
                        >
                            <h3 style={sectionHeadingStyle}>Resources</h3>
                            <ul style={listStyle}>
                                <li style={listItemStyle}>
                                    <div style={getMarkerStyles("/dashboard/blog")}></div>
                                    <Link
                                        to="/dashboard/blog"
                                        {...getLinkProps("/dashboard/blog")}
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
                                    <div style={getMarkerStyles("/dashboard/guides")}></div>
                                    <Link
                                        to="/dashboard/guides"
                                        {...getLinkProps("/dashboard/guides")}
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
                                    <div style={getMarkerStyles("/dashboard/support")}></div>
                                    <Link
                                        to="/dashboard/support"
                                        {...getLinkProps("/dashboard/support")}
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
                                    <div style={getMarkerStyles("/dashboard/about")}></div>
                                    <Link
                                        to="/dashboard/about"
                                        {...getLinkProps("/dashboard/about")}
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
                                    <div style={getMarkerStyles("/dashboard/careers")}></div>
                                    <Link
                                        to="/dashboard/careers"
                                        {...getLinkProps("/dashboard/careers")}
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
                                    <div style={getMarkerStyles("/dashboard/contact")}></div>
                                    <Link
                                        to="/dashboard/contact"
                                        {...getLinkProps("/dashboard/contact")}
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
                    </div>
                </div>

                <div style={bottomStyle} className="footer-bottom">
                    <div className="footer-copyright-wrapper">
                        <div>© 2025 FocusFlow. All rights reserved.</div>
                    </div>
                    <div className="footer-links-wrapper">
                        <div style={bottomLinksStyle} className="footer-links">
                            <Link
                                to="/dashboard/privacy"
                                {...getLinkProps("/dashboard/privacy")}
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/dashboard/terms"
                                {...getLinkProps("/dashboard/terms")}
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
