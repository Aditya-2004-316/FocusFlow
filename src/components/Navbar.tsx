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
        height: "calc(100vh - 4rem)", // Subtract header height
        background:
            "linear-gradient(to bottom, var(--color-primary-50), var(--color-primary-100))",
        borderRight: "4px solid var(--color-primary-200)",
        padding: "1.5rem 0.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        overflowY: "auto",
        position: "sticky",
        top: "4rem", // Header height
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

    const navStyle: CSSProperties = {
        flex: "1 1 0%",
        padding: "1rem 0.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
    };

    const navItemStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.5rem 0.75rem",
        borderRadius: "0.5rem",
        transition: "all 150ms ease-in-out",
        color: "var(--color-primary-700)",
        fontWeight: 600,
        position: "relative",
        textDecoration: "none",
        cursor: "pointer",
    };

    const navItemLabelStyle: CSSProperties = {
        fontSize: "0.875rem",
    };

    const helpSectionStyle: CSSProperties = {
        padding: "1rem",
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
            <nav style={navStyle}>
                {menuItems.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        style={navItemStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                                "var(--color-primary-200)";
                            e.currentTarget.style.color =
                                "var(--color-primary-800)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "";
                            e.currentTarget.style.color =
                                "var(--color-primary-700)";
                        }}
                    >
                        <item.icon
                            style={{
                                height: "1rem",
                                width: "1rem",
                                color: "var(--color-primary-400)",
                            }}
                        />
                        {!isCollapsed && (
                            <span style={navItemLabelStyle}>{item.label}</span>
                        )}
                    </a>
                ))}
            </nav>

            {/* Help Section */}
            <div style={helpSectionStyle}>
                <a
                    href="/help"
                    style={helpLinkStyle}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                            "var(--color-primary-200)";
                        e.currentTarget.style.color =
                            "var(--color-primary-800)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "";
                        e.currentTarget.style.color =
                            "var(--color-primary-700)";
                    }}
                >
                    <QuestionMarkCircleIcon
                        style={{
                            height: "1rem",
                            width: "1rem",
                            color: "var(--color-primary-400)",
                        }}
                    />
                    {!isCollapsed && (
                        <span style={helpLinkLabelStyle}>Help & Support</span>
                    )}
                </a>
            </div>
        </aside>
    );
};

export default Navbar;
