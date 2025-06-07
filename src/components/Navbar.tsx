import { useState } from "react";
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
import type { CSSProperties } from "react";

interface NavbarProps {
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
}

const Navbar = ({ isCollapsed, setIsCollapsed }: NavbarProps) => {
    const menuItems = [
        { icon: HomeIcon, label: "Dashboard", href: "/" },
        { icon: ClockIcon, label: "Focus Timer", href: "/timer" },
        { icon: ChartBarIcon, label: "Statistics", href: "/stats" },
        { icon: BookOpenIcon, label: "Resources", href: "/resources" },
        { icon: UserGroupIcon, label: "Community", href: "/community" },
        { icon: CogIcon, label: "Settings", href: "/settings" },
    ];

    const containerStyle: CSSProperties = {
        height: "calc(100vh - 4rem)",
        background:
            "linear-gradient(to bottom, var(--color-primary-50), var(--color-primary-100))",
        borderRight: "4px solid var(--color-primary-200)",
        borderBottom: "4px solid var(--color-primary-200)",
        borderRadius: "0.5rem",
        padding: "1rem 0.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        overflowY: "auto",
        position: "sticky",
        top: "4.5rem",
        width: isCollapsed ? "5rem" : "16rem",
        transition: "width 0.3s ease-in-out",
    };

    const collapseButtonWrapperStyle: CSSProperties = {
        display: "flex",
        justifyContent: "flex-end",
        padding: "0.5rem",
        borderBottom: "1px solid var(--color-primary-200)",
    };

    const collapseButtonStyle: CSSProperties = {
        padding: "0.375rem",
        borderRadius: "0.5rem",
        transition: "background-color 150ms ease-in-out",
        border: "none",
        background: "none",
        cursor: "pointer",
    };

    const navItemsStyle: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        marginTop: "-0.5rem",
        flex: 1,
    };

    const linkStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "0.75rem",
        borderRadius: "0.5rem",
        textDecoration: "none",
        color: "var(--color-gray-700)",
        transition: "all 0.2s ease-in-out",
        width: "100%",
        justifyContent: isCollapsed ? "center" : "flex-start",
    };

    const iconStyle: CSSProperties = {
        height: isCollapsed ? "1.5rem" : "1.25rem",
        width: isCollapsed ? "1.5rem" : "1.25rem",
        color: "var(--color-primary-600)",
        flexShrink: 0,
        opacity: 1,
    };

    const textStyle: CSSProperties = {
        fontSize: "0.9375rem",
        fontWeight: 500,
        color: "var(--color-gray-700)",
        whiteSpace: "nowrap",
        opacity: isCollapsed ? 0 : 1,
        transition: "opacity 0.2s ease-in-out",
    };

    const navItemLabelStyle: CSSProperties = {
        fontSize: "0.9375rem",
        fontWeight: 500,
        color: "var(--color-gray-700)",
        whiteSpace: "nowrap",
        opacity: isCollapsed ? 0 : 1,
        transition: "opacity 0.2s ease-in-out",
    };

    const helpSectionStyle: CSSProperties = {
        marginTop: "auto",
        paddingTop: "1rem",
        borderTop: "1px solid var(--color-primary-200)",
    };

    const helpLinkStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.625rem",
        borderRadius: "0.5rem",
        transition: "all 150ms ease-in-out",
        color: "var(--color-primary-700)",
        textDecoration: "none",
        cursor: "pointer",
    };

    const helpLinkLabelStyle: CSSProperties = {
        fontSize: "0.875rem",
    };

    return (
        <aside style={containerStyle}>
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
                            style={{
                                height: "1rem",
                                width: "1rem",
                                color: "var(--color-primary-500)",
                            }}
                        />
                    ) : (
                        <ChevronLeftIcon
                            style={{
                                height: "1rem",
                                width: "1rem",
                                color: "var(--color-primary-500)",
                            }}
                        />
                    )}
                </button>
            </div>

            {/* Navigation Links */}
            <div style={navItemsStyle}>
                {menuItems.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        style={linkStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                                "var(--color-primary-100)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                                "transparent";
                        }}
                    >
                        <item.icon style={iconStyle} />
                        {!isCollapsed && (
                            <span style={textStyle}>{item.label}</span>
                        )}
                    </a>
                ))}
            </div>

            {/* Help Section */}
            <div style={helpSectionStyle}>
                <a
                    href="/help"
                    style={helpLinkStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                            "var(--color-primary-100)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                    }}
                >
                    <QuestionMarkCircleIcon style={iconStyle} />
                    {!isCollapsed && (
                        <span style={textStyle}>Help & Support</span>
                    )}
                </a>
            </div>
        </aside>
    );
};

export default Navbar;
