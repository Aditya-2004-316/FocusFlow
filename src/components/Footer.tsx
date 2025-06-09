import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";
import FocusFlowLogo from "../assets/focusflowlogo.png";

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
        gap: "1.25rem",
        padding: "1rem",
        borderRadius: "0.5rem",
        transition: "all 0.2s ease-in-out",
    };

    const sectionHoverStyle: CSSProperties = {
        background: "rgba(255, 255, 255, 0.5)",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    };

    const sectionHeadingStyle: CSSProperties = {
        fontSize: "0.875rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        textTransform: "uppercase",
        letterSpacing: "0.025em",
        paddingBottom: "0.5rem",
        borderBottom: "2px solid var(--color-primary-200)",
        marginBottom: "0.5rem",
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
        gap: "0.5rem",
        paddingLeft: "1.5rem",
        listStyle: "none",
    };

    const listItemStyle: CSSProperties = {
        position: "relative",
    };

    const listItemMarker: CSSProperties = {
        position: "absolute",
        left: "-1rem",
        top: "0.75rem",
        width: "0.375rem",
        height: "0.375rem",
        borderRadius: "50%",
        backgroundColor: "var(--color-primary-400)",
        transition: "all 0.2s ease-in-out",
    };

    const listItemHoverMarker: CSSProperties = {
        ...listItemMarker,
        backgroundColor: "var(--color-primary-600)",
        transform: "scale(1.2)",
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
        transition: "all 0.2s ease-in-out",
        fontSize: "0.875rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 0",
        position: "relative",
    };

    const linkHoverStyle: CSSProperties = {
        color: "var(--color-primary-600)",
        transform: "translateX(0.25rem)",
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
        width: "2.5rem",
        height: "2.25rem",
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

    const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const marker = e.currentTarget.previousElementSibling as HTMLDivElement;
        if (marker) {
            Object.assign(e.currentTarget.style, linkHoverStyle);
            Object.assign(marker.style, listItemHoverMarker);
        }
    };

    const handleLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const marker = e.currentTarget.previousElementSibling as HTMLDivElement;
        if (marker) {
            Object.assign(e.currentTarget.style, linkStyle);
            Object.assign(marker.style, listItemMarker);
        }
    };

    const handleSectionHover = (e: React.MouseEvent<HTMLDivElement>) => {
        Object.assign(e.currentTarget.style, sectionHoverStyle);
    };

    const handleSectionLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        Object.assign(e.currentTarget.style, sectionStyle);
    };

    return (
        <>
            <style>{mediaQueryStyle}</style>
            <footer style={containerStyle}>
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
                        <div style={gridStyle} className="footer-grid">
                            {/* Product Section */}
                            <div
                                style={sectionStyle}
                                onMouseEnter={handleSectionHover}
                                onMouseLeave={handleSectionLeave}
                            >
                                <h3 style={sectionHeadingStyle}>Product</h3>
                                <ul style={listStyle}>
                                    <li style={listItemStyle}>
                                        <div style={listItemMarker} />
                                        <a
                                            href="/features"
                                            style={linkStyle}
                                            onMouseEnter={handleLinkHover}
                                            onMouseLeave={handleLinkLeave}
                                        >
                                            Features
                                            <ArrowRightIcon
                                                style={{
                                                    width: "1rem",
                                                    height: "1rem",
                                                    opacity: 0.5,
                                                }}
                                            />
                                        </a>
                                    </li>
                                    <li style={listItemStyle}>
                                        <div style={listItemMarker} />
                                        <a
                                            href="/pricing"
                                            style={linkStyle}
                                            onMouseEnter={handleLinkHover}
                                            onMouseLeave={handleLinkLeave}
                                        >
                                            Pricing
                                            <ArrowRightIcon
                                                style={{
                                                    width: "1rem",
                                                    height: "1rem",
                                                    opacity: 0.5,
                                                }}
                                            />
                                        </a>
                                    </li>
                                    <li style={listItemStyle}>
                                        <div style={listItemMarker} />
                                        <a
                                            href="/faq"
                                            style={linkStyle}
                                            onMouseEnter={handleLinkHover}
                                            onMouseLeave={handleLinkLeave}
                                        >
                                            FAQ
                                            <ArrowRightIcon
                                                style={{
                                                    width: "1rem",
                                                    height: "1rem",
                                                    opacity: 0.5,
                                                }}
                                            />
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Resources Section */}
                            <div
                                style={sectionStyle}
                                onMouseEnter={handleSectionHover}
                                onMouseLeave={handleSectionLeave}
                            >
                                <h3 style={sectionHeadingStyle}>Resources</h3>
                                <ul style={listStyle}>
                                    <li style={listItemStyle}>
                                        <div style={listItemMarker} />
                                        <a
                                            href="/blog"
                                            style={linkStyle}
                                            onMouseEnter={handleLinkHover}
                                            onMouseLeave={handleLinkLeave}
                                        >
                                            Blog
                                            <ArrowRightIcon
                                                style={{
                                                    width: "1rem",
                                                    height: "1rem",
                                                    opacity: 0.5,
                                                }}
                                            />
                                        </a>
                                    </li>
                                    <li style={listItemStyle}>
                                        <div style={listItemMarker} />
                                        <a
                                            href="/guides"
                                            style={linkStyle}
                                            onMouseEnter={handleLinkHover}
                                            onMouseLeave={handleLinkLeave}
                                        >
                                            Guides
                                            <ArrowRightIcon
                                                style={{
                                                    width: "1rem",
                                                    height: "1rem",
                                                    opacity: 0.5,
                                                }}
                                            />
                                        </a>
                                    </li>
                                    <li style={listItemStyle}>
                                        <div style={listItemMarker} />
                                        <a
                                            href="/support"
                                            style={linkStyle}
                                            onMouseEnter={handleLinkHover}
                                            onMouseLeave={handleLinkLeave}
                                        >
                                            Support
                                            <ArrowRightIcon
                                                style={{
                                                    width: "1rem",
                                                    height: "1rem",
                                                    opacity: 0.5,
                                                }}
                                            />
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Company Section */}
                            <div
                                style={sectionStyle}
                                onMouseEnter={handleSectionHover}
                                onMouseLeave={handleSectionLeave}
                            >
                                <h3 style={sectionHeadingStyle}>Company</h3>
                                <ul style={listStyle}>
                                    <li style={listItemStyle}>
                                        <div style={listItemMarker} />
                                        <a
                                            href="/about"
                                            style={linkStyle}
                                            onMouseEnter={handleLinkHover}
                                            onMouseLeave={handleLinkLeave}
                                        >
                                            About
                                            <ArrowRightIcon
                                                style={{
                                                    width: "1rem",
                                                    height: "1rem",
                                                    opacity: 0.5,
                                                }}
                                            />
                                        </a>
                                    </li>
                                    <li style={listItemStyle}>
                                        <div style={listItemMarker} />
                                        <a
                                            href="/careers"
                                            style={linkStyle}
                                            onMouseEnter={handleLinkHover}
                                            onMouseLeave={handleLinkLeave}
                                        >
                                            Careers
                                            <ArrowRightIcon
                                                style={{
                                                    width: "1rem",
                                                    height: "1rem",
                                                    opacity: 0.5,
                                                }}
                                            />
                                        </a>
                                    </li>
                                    <li style={listItemStyle}>
                                        <div style={listItemMarker} />
                                        <a
                                            href="/contact"
                                            style={linkStyle}
                                            onMouseEnter={handleLinkHover}
                                            onMouseLeave={handleLinkLeave}
                                        >
                                            Contact
                                            <ArrowRightIcon
                                                style={{
                                                    width: "1rem",
                                                    height: "1rem",
                                                    opacity: 0.5,
                                                }}
                                            />
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Legal Section */}
                            <div
                                style={sectionStyle}
                                onMouseEnter={handleSectionHover}
                                onMouseLeave={handleSectionLeave}
                            >
                                <h3 style={sectionHeadingStyle}>Legal</h3>
                                <ul style={listStyle}>
                                    <li style={listItemStyle}>
                                        <div style={listItemMarker} />
                                        <a
                                            href="/privacy"
                                            style={linkStyle}
                                            onMouseEnter={handleLinkHover}
                                            onMouseLeave={handleLinkLeave}
                                        >
                                            Privacy
                                            <ArrowRightIcon
                                                style={{
                                                    width: "1rem",
                                                    height: "1rem",
                                                    opacity: 0.5,
                                                }}
                                            />
                                        </a>
                                    </li>
                                    <li style={listItemStyle}>
                                        <div style={listItemMarker} />
                                        <a
                                            href="/terms"
                                            style={linkStyle}
                                            onMouseEnter={handleLinkHover}
                                            onMouseLeave={handleLinkLeave}
                                        >
                                            Terms
                                            <ArrowRightIcon
                                                style={{
                                                    width: "1rem",
                                                    height: "1rem",
                                                    opacity: 0.5,
                                                }}
                                            />
                                        </a>
                                    </li>
                                    <li style={listItemStyle}>
                                        <div style={listItemMarker} />
                                        <a
                                            href="/cookies"
                                            style={linkStyle}
                                            onMouseEnter={handleLinkHover}
                                            onMouseLeave={handleLinkLeave}
                                        >
                                            Cookies
                                            <ArrowRightIcon
                                                style={{
                                                    width: "1rem",
                                                    height: "1rem",
                                                    opacity: 0.5,
                                                }}
                                            />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div style={bottomStyle} className="footer-bottom">
                        <div>© 2025 FocusFlow. All rights reserved.</div>
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
