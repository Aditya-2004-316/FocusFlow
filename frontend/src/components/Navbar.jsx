import { useState } from "react";

import { Link, useLocation } from "react-router-dom";

import {
    HomeIcon,
    ChartBarIcon,
    ClockIcon,
    CogIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    BookOpenIcon,
    UserGroupIcon,
    QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

const Navbar = ({ isCollapsed, setIsCollapsed }) => {
    const location = useLocation();

    const menuItems = [
        { icon: HomeIcon, label: "Dashboard", href: "/dashboard" },
        { icon: ClockIcon, label: "Focus Timer", href: "/focus-timer" },
        { icon: ChartBarIcon, label: "Statistics", href: "/statistics" },
        { icon: BookOpenIcon, label: "Resources", href: "/resources" },
        { icon: UserGroupIcon, label: "Community", href: "/community" },
        { icon: CogIcon, label: "Settings", href: "/settings" },
    ];

    const containerStyle = {
        height: "calc(100vh - 4rem)",
        background: "var(--sidebar-bg)",
        borderRight: isCollapsed
            ? "none"
            : "4px solid var(--color-primary-200)",
        borderBottom: isCollapsed
            ? "none"
            : "4px solid var(--color-primary-200)",
        borderRadius: "0.5rem",
        padding: isCollapsed ? "1rem 0.25rem" : "1rem 0.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        overflow: "hidden",
        position: "sticky",
        top: "4.5rem",
        width: isCollapsed ? "5rem" : "16rem",
        transition: "width 0.3s ease-in-out, padding 0.3s ease-in-out",
        marginBottom: "2rem", // Add bottom margin for gap
    };

    const collapseButtonWrapperStyle = {
        display: "flex",
        justifyContent: "flex-end",
        padding: "0.5rem",
        borderBottom: "1px solid var(--color-primary-200)",
    };

    const collapseButtonStyle = {
        padding: "0.375rem",
        borderRadius: "0.5rem",
        transition: "background-color 150ms ease-in-out",
        border: "none",
        background: "none",
        cursor: "pointer",
    };

    const navItemsStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        marginTop: "-0.5rem",
        flex: 1,
        alignItems: isCollapsed ? "center" : "flex-start",
    };

    const linkStyle = {
        display: "flex",
        alignItems: "center",
        gap: isCollapsed ? 0 : "1rem",
        padding: "0.75rem",
        borderRadius: "0.5rem",
        textDecoration: "none",
        color: "var(--color-gray-700)",
        transition: "all 0.2s ease-in-out",
        width: "100%",
        justifyContent: isCollapsed ? "center" : "flex-start",
        position: "relative",
    };

    const activeLinkStyle = {
        ...linkStyle,
        backgroundColor: "var(--color-primary-200)",
        color: "var(--color-primary-700)",
    };

    const iconStyle = {
        height: isCollapsed ? "1.5rem" : "1.25rem",
        width: isCollapsed ? "1.5rem" : "1.25rem",
        color: "var(--color-primary-600)",
        flexShrink: 0,
        opacity: 1,
    };

    const textStyle = {
        fontSize: "0.9375rem",
        fontWeight: 500,
        color: "var(--color-gray-700)",
        whiteSpace: "nowrap",
        display: isCollapsed ? "none" : "inline",
        transition: "display 0.2s ease-in-out",
    };

    const helpSectionStyle = {
        marginTop: "auto",
        paddingTop: "1rem",
        borderTop: "1px solid var(--color-primary-200)",
        display: isCollapsed ? "flex" : "block",
        justifyContent: isCollapsed ? "center" : "flex-start",
    };

    const helpLinkStyle = {
        display: "flex",
        alignItems: "center",
        gap: isCollapsed ? 0 : "1rem",
        padding: "0.75rem",
        borderRadius: "0.5rem",
        transition: "all 0.2s ease-in-out",
        color: "var(--color-gray-700)",
        textDecoration: "none",
        cursor: "pointer",
        width: "100%",
        justifyContent: isCollapsed ? "center" : "flex-start",
        position: "relative",
    };

    const helpLinkLabelStyle = {
        fontSize: "0.9375rem",
        fontWeight: 500,
        color: "var(--color-gray-700)",
        whiteSpace: "nowrap",
        display: isCollapsed ? "none" : "inline",
        transition: "display 0.2s ease-in-out",
    };

    return (
        <nav style={containerStyle}>
            {/* Collapse Button */}
            <div style={collapseButtonWrapperStyle}>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    style={collapseButtonStyle}
                    aria-label={
                        isCollapsed ? "Expand sidebar" : "Collapse sidebar"
                    }
                >
                    {isCollapsed ? (
                        <ChevronRightIcon
                            style={{ width: "1.25rem", height: "1.25rem" }}
                        />
                    ) : (
                        <ChevronLeftIcon
                            style={{ width: "1.25rem", height: "1.25rem" }}
                        />
                    )}
                </button>
            </div>

            {/* Navigation Links */}
            <div style={navItemsStyle}>
                {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = location.pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            style={isActive ? activeLinkStyle : linkStyle}
                            onMouseEnter={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor =
                                        "var(--color-primary-200)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor =
                                        "transparent";
                                }
                            }}
                        >
                            <IconComponent style={iconStyle} />
                            <span style={textStyle}>{item.label}</span>
                        </Link>
                    );
                })}
            </div>

            {/* Help Section */}
            <div style={helpSectionStyle}>
                <Link
                    to="/help-support"
                    style={
                        location.pathname === "/help-support"
                            ? activeLinkStyle
                            : linkStyle
                    }
                    onMouseEnter={(e) => {
                        if (location.pathname !== "/help-support") {
                            e.currentTarget.style.backgroundColor =
                                "var(--color-primary-200)";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (location.pathname !== "/help-support") {
                            e.currentTarget.style.backgroundColor =
                                "transparent";
                        }
                    }}
                >
                    <QuestionMarkCircleIcon style={iconStyle} />
                    <span style={textStyle}>Help & Support</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
