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
        borderTop: "4px solid var(--color-primary-600)",
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

                        {/* Legal Section */}
                        <div
                            style={sectionStyle}
                            // onMouseEnter={handleSectionHover}
                            // onMouseLeave={handleSectionLeave}
                        >
                            <h3 style={sectionHeadingStyle}>Legal</h3>
                            <ul style={listStyle}>
                                <li style={listItemStyle}>
                                    <div style={getMarkerStyles("/dashboard/privacy")}></div>
                                    <Link
                                        to="/dashboard/privacy"
                                        {...getLinkProps("/dashboard/privacy")}
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
                                    <div style={getMarkerStyles("/dashboard/terms")}></div>
                                    <Link
                                        to="/dashboard/terms"
                                        {...getLinkProps("/dashboard/terms")}
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
                    </div>
                </div>

                <div style={bottomStyle} className="footer-bottom">
                    <div>© 2025 FocusFlow. All rights reserved.</div>
                    <div style={bottomLinksStyle} className="footer-links">
                        <Link
                            to="/privacy-policy"
                            {...getLinkProps("/privacy-policy")}
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            to="/terms-of-service"
                            {...getLinkProps("/terms-of-service")}
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
