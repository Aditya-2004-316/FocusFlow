import React from "react";
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
import useResponsive from "../hooks/useResponsive";

const Navbar = ({ isCollapsed, setIsCollapsed }) => {
    const location = useLocation();
    const { isMobile } = useResponsive();

    const menuItems = [
        { icon: HomeIcon, label: "Dashboard", href: "/dashboard" },
        { icon: ClockIcon, label: "Focus Timer", href: "/focus-timer" },
        { icon: ChartBarIcon, label: "Statistics", href: "/statistics" },
        { icon: BookOpenIcon, label: "Resources", href: "/resources" },
        { icon: UserGroupIcon, label: "Community", href: "/community" },
    ];

    const containerStyle = isMobile ? {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "4.5rem",
        background: "var(--sidebar-bg)",
        borderTop: "1px solid var(--input-border)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 1000,
        padding: "0 0.5rem",
    } : {
        height: "calc(100vh - 4rem)",
        background: "var(--sidebar-bg)",
        borderRight: isCollapsed
            ? "none"
            : "1px solid var(--sidebar-bg)",
        borderBottom: isCollapsed
            ? "none"
            : "1px solid var(--sidebar-bg)",
        borderRadius: "0.5rem",
        padding: isCollapsed ? "1rem 0.25rem" : "1rem 0.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        overflow: "hidden",
        position: "sticky",
        top: "4.5rem",
        width: isCollapsed ? "5rem" : "16rem",
        minWidth: isCollapsed ? "5rem" : "16rem",
        maxWidth: isCollapsed ? "5rem" : "16rem",
        flexShrink: 0,
        transition: "width 0.3s ease-in-out, padding 0.3s ease-in-out",
        marginBottom: "2rem",
    };

    const collapseButtonWrapperStyle = {
        display: "flex",
        justifyContent: "flex-end",
        padding: "0.5rem",
    };

    const collapseButtonStyle = {
        padding: "0.375rem",
        borderRadius: "0.5rem",
        transition: "all 0.2s ease-in-out",
        border: "1px solid transparent",
        background: "none",
        cursor: "pointer",
        color: "var(--color-primary-500)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const navItemsStyle = {
        display: "flex",
        flexDirection: isMobile ? "row" : "column",
        gap: isMobile ? 0 : "0.5rem",
        marginTop: isMobile ? 0 : "-0.5rem",
        flex: 1,
        alignItems: isCollapsed ? "center" : "flex-start",
        justifyContent: isMobile ? "space-around" : "flex-start",
        width: "100%",
    };

    const linkStyle = {
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        gap: isMobile ? "0.2rem" : (isCollapsed ? 0 : "1rem"),
        padding: isMobile ? "0.5rem" : "0.75rem",
        borderRadius: "0.5rem",
        textDecoration: "none",
        color: "var(--color-gray-700)",
        transition: "all 0.2s ease-in-out",
        width: isMobile ? "auto" : "100%",
        justifyContent: isCollapsed ? "center" : "flex-start",
        position: "relative",
    };

    const activeLinkStyle = {
        ...linkStyle,
        backgroundColor: "var(--color-primary-200)",
        color: "var(--color-primary-700)",
    };

    const iconContainerStyle = {
        width: isCollapsed && !isMobile ? "100%" : "1.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
    };

    const iconStyle = {
        height: "1.5rem",
        width: "1.5rem",
        color: "var(--color-primary-600)",
        transition: "all 0.2s ease-in-out",
    };

    const textStyle = {
        fontSize: isMobile ? "0.7rem" : "0.95rem",
        fontWeight: 500,
        color: "var(--color-gray-700)",
        whiteSpace: "nowrap",
        display: isCollapsed && !isMobile ? "none" : "inline",
        transition: "opacity 0.2s ease-in-out",
        opacity: isCollapsed && !isMobile ? 0 : 1,
    };

    const helpSectionStyle = {
        marginTop: "auto",
        paddingTop: "1rem",
        display: "flex",
        flexDirection: isMobile ? "row" : "column",
        gap: isMobile ? "0" : "0.5rem",
        alignItems: isCollapsed ? "center" : "flex-start",
        width: "100%",
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
        fontSize: isMobile ? "0.7rem" : "0.9375rem",
        fontWeight: 500,
        color: "var(--color-gray-700)",
        whiteSpace: "nowrap",
        display: isCollapsed && !isMobile ? "none" : "inline",
        transition: "display 0.2s ease-in-out",
    };

    return (
        <nav style={containerStyle}>
            {!isMobile && (
                <div style={collapseButtonWrapperStyle}>
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        style={collapseButtonStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "var(--color-primary-200)";
                            e.currentTarget.style.color = "var(--color-primary-700)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "var(--color-primary-500)";
                        }}
                        aria-label={
                            isCollapsed ? "Expand sidebar" : "Collapse sidebar"
                        }
                    >
                        {isCollapsed ? (
                            <ChevronRightIcon
                                style={{ width: "1.5rem", height: "1.5rem" }}
                            />
                        ) : (
                            <ChevronLeftIcon
                                style={{ width: "1.5rem", height: "1.5rem" }}
                            />
                        )}
                    </button>
                </div>
            )}

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
                            <div style={iconContainerStyle}>
                                <IconComponent style={iconStyle} />
                            </div>
                            <span style={textStyle}>{item.label}</span>
                        </Link>
                    );
                })}
            </div>

            {/* Help Section */}
            {!isMobile && (
                <div style={helpSectionStyle}>
                    <Link
                        to="/settings"
                        style={
                            location.pathname === "/settings"
                                ? activeLinkStyle
                                : linkStyle
                        }
                        onMouseEnter={(e) => {
                            if (location.pathname !== "/settings") {
                                e.currentTarget.style.backgroundColor =
                                    "var(--color-primary-200)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (location.pathname !== "/settings") {
                                e.currentTarget.style.backgroundColor =
                                    "transparent";
                            }
                        }}
                    >
                        <div style={iconContainerStyle}>
                            <CogIcon style={iconStyle} />
                        </div>
                        <span style={textStyle}>Settings</span>
                    </Link>
                    <Link
                        to="/help-support"
                        style={{
                            ...(location.pathname === "/help-support"
                                ? activeLinkStyle
                                : linkStyle),
                            marginBottom: "1rem"
                        }}
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
                        <div style={iconContainerStyle}>
                            <QuestionMarkCircleIcon style={iconStyle} />
                        </div>
                        <span style={textStyle}>Help & Support</span>
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
