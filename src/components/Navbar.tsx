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
import "./Navbar.css"; // Import the new Navbar.css file

const Navbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { icon: HomeIcon, label: "Dashboard", href: "/" },
        { icon: ClockIcon, label: "Focus Timer", href: "/timer" },
        { icon: ChartBarIcon, label: "Statistics", href: "/stats" },
        { icon: BookOpenIcon, label: "Resources", href: "/resources" },
        { icon: UserGroupIcon, label: "Community", href: "/community" },
        { icon: CogIcon, label: "Settings", href: "/settings" },
    ];

    return (
        <aside
            className={`navbar-container ${
                isCollapsed ? "collapsed" : "expanded"
            }`}
        >
            {/* Collapse Button */}
            <div className="collapse-button-wrapper">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="collapse-button"
                    aria-label={
                        isCollapsed ? "Expand sidebar" : "Collapse sidebar"
                    }
                >
                    {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="navbar-nav">
                {menuItems.map((item) => (
                    <a key={item.label} href={item.href} className="nav-item">
                        <span className="nav-item-indicator"></span>
                        <item.icon />
                        {!isCollapsed && (
                            <span className="nav-item-label">{item.label}</span>
                        )}
                    </a>
                ))}
            </nav>

            {/* Help Section */}
            <div className="help-section">
                <a href="/help" className="help-link">
                    <QuestionMarkCircleIcon />
                    {!isCollapsed && (
                        <span className="help-link-label">Help & Support</span>
                    )}
                </a>
            </div>
        </aside>
    );
};

export default Navbar;
