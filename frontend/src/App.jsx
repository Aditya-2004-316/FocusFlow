import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Header from "./components/Header.jsx";
import Timer from "./components/Timer.jsx";
import DistractionLogger from "./components/DistractionLogger.jsx";
import Stats from "./components/Stats.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Settings from "./pages/Settings.jsx";
import Community from "./pages/Community.jsx";
import Resources from "./pages/Resources.jsx";
import Statistics from "./pages/Statistics.jsx";
import FocusTimer from "./pages/FocusTimer.jsx";
import HelpSupport from "./pages/HelpSupport.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Features from "./pages/Features.jsx";
import FAQ from "./pages/FAQ.jsx";
import Blog from "./pages/Blog.jsx";
import Guides from "./pages/Guides.jsx";
import Support from "./pages/Support.jsx";
import Careers from "./pages/Careers.jsx";
import Cookies from "./pages/Cookies.jsx";
import Testimonials from "./pages/Testimonials.jsx";
import "./App.css";
import {
    ChartBarIcon,
    ClockIcon,
    CheckCircleIcon,
    PlayIcon,
    PlusIcon,
    BellAlertIcon,
    CalendarIcon,
    TrophyIcon,
    StarIcon,
    FireIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
} from "@heroicons/react/24/outline";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile.jsx";
import LandingPage from "./LandingPage/LandingPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import LandingNavbar from "./LandingPage/LandingNavbar.jsx";
import LandingFooter from "./LandingPage/LandingFooter.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Updates from "./pages/Updates.jsx";
import LandingCareers from "./pages/Careers.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import Security from "./pages/Security.jsx";
import DashboardFeatures from "./pages/DashboardFeatures.jsx";
import DashboardFAQ from "./pages/DashboardFAQ.jsx";
import DashboardAbout from "./pages/DashboardAbout.jsx";
import DashboardCareers from "./pages/DashboardCareers.jsx";
import DashboardContact from "./pages/DashboardContact.jsx";
import DashboardPrivacy from "./pages/DashboardPrivacy.jsx";
import DashboardTerms from "./pages/DashboardTerms.jsx";
import DashboardCookies from "./pages/DashboardCookies.jsx";
import DashboardBlog from "./pages/DashboardBlog.jsx";
import DashboardGuides from "./pages/DashboardGuides.jsx";
import DashboardSupport from "./pages/DashboardSupport.jsx";
import DashboardCommunity from "./pages/DashboardCommunity.jsx";

const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:5000/api";

function Dashboard() {
    const [distractions, setDistractions] = useState(() => {
        const saved = localStorage.getItem("distractions");
        return saved ? JSON.parse(saved) : [];
    });
    const [isLoggerOpen, setIsLoggerOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [filterText, setFilterText] = useState("");
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        localStorage.setItem("distractions", JSON.stringify(distractions));
    }, [distractions]);

    // Initial sync from backend (best-effort)
    useEffect(() => {
        const fetchDistractions = async () => {
            try {
                setIsSyncing(true);
                const res = await fetch(`${API_BASE}/distractions`, {
                    credentials: "include",
                });
                const json = await res.json();
                if (json?.success && Array.isArray(json?.data?.distractions)) {
                    // Merge with local keeping uniqueness by timestamp+desc
                    const serverItems = json.data.distractions.map((s) => ({
                        id: s._id || crypto.randomUUID(),
                        timestamp: s.timestamp,
                        note: s.description,
                        type: s.category,
                        time: new Date(s.timestamp).toLocaleTimeString(),
                        severity: s.severity || "medium",
                    }));
                    const merged = [...serverItems, ...distractions].reduce(
                        (acc, item) => {
                            const key = `${item.timestamp}-${item.note}`;
                            if (!acc.map.has(key)) {
                                acc.map.set(key, true);
                                acc.items.push(item);
                            }
                            return acc;
                        },
                        { map: new Map(), items: [] }
                    ).items;
                    setDistractions(merged);
                }
            } catch (e) {
                // ignore; stay offline
            } finally {
                setIsSyncing(false);
            }
        };
        fetchDistractions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const postToBackend = async (payload) => {
        try {
            const res = await fetch(`${API_BASE}/distractions`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                credentials: "include",
            });
            const json = await res.json();
            if (json?.success && json?.data?.distraction) {
                return json.data.distraction;
            }
        } catch (e) {
            // ignore failure; fallback to local only
        }
        return null;
    };

    const severityColor = (sev) => {
        if (sev === "high") return { bg: "#fee2e2", fg: "#b91c1c" };
        if (sev === "low") return { bg: "#dcfce7", fg: "#166534" };
        return { bg: "#e0f2fe", fg: "#075985" };
    };

    const chip = (label, style = {}) => (
        <span
            style={{
                display: "inline-block",
                padding: "0.15rem 0.5rem",
                fontSize: "0.7rem",
                borderRadius: "9999px",
                background: "var(--color-gray-100)",
                color: "var(--color-gray-700)",
                ...style,
            }}
        >
            {label}
        </span>
    );

    const handleLogDistraction = async (newDistraction) => {
        const localItem = {
            ...newDistraction,
            id: crypto.randomUUID(),
            severity: "medium",
        };
        setDistractions((prev) => [localItem, ...prev]);
        // background sync
        postToBackend({
            description: localItem.note,
            type: localItem.type,
            timestamp: localItem.timestamp,
            severity: localItem.severity,
        }).then((created) => {
            if (!created) return;
            // Optionally update with server id
            setDistractions((prev) => {
                const idx = prev.findIndex((p) => p.id === localItem.id);
                if (idx === -1) return prev;
                const copy = [...prev];
                copy[idx] = {
                    ...copy[idx],
                    id: created._id || copy[idx].id,
                    type: created.category || copy[idx].type,
                    note: created.description || copy[idx].note,
                    severity: created.severity || copy[idx].severity,
                };
                return copy;
            });
        });
    };

    const handleDeleteDistraction = (id) => {
        setDistractions((prev) => prev.filter((d) => d.id !== id));
    };

    const containerStyle = {
        maxWidth: "76rem",
        margin: "0 auto",
        padding: "2rem",
    };

    const welcomeSectionStyle = {
        background:
            "linear-gradient(to right, var(--color-primary-500), var(--color-cyan-400))",
        borderRadius: "1rem",
        padding: "2rem",
        marginBottom: "2rem",
        color: "var(--color-white)",
        boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    };

    const welcomeTitleStyle = {
        fontSize: "2rem",
        fontWeight: 700,
        marginBottom: "0.5rem",
    };

    const welcomeSubtitleStyle = {
        fontSize: "1.125rem",
        opacity: 0.9,
        marginBottom: "1.5rem",
    };

    const actionButtonsStyle = {
        display: "flex",
        gap: "1rem",
    };

    const buttonStyle = {
        padding: "0.75rem 1.5rem",
        borderRadius: "0.5rem",
        fontSize: "1rem",
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
    };

    const primaryButtonStyle = {
        ...buttonStyle,
        background: "var(--color-white)",
        color: "var(--color-primary-600)",
        border: "none",
    };

    const secondaryButtonStyle = {
        ...buttonStyle,
        background: "rgba(255, 255, 255, 0.1)",
        color: "var(--color-white)",
        border: "2px solid var(--color-white)",
    };

    const tabsStyle = {
        display: "flex",
        gap: "1rem",
        marginBottom: "2rem",
        borderBottom: "2px solid var(--color-gray-200)",
        paddingBottom: "0.5rem",
    };

    const tabStyle = {
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
        fontWeight: 500,
        color: "var(--color-primary-700)",
        cursor: "pointer",
        borderRadius: "0.5rem",
        transition: "all 0.2s ease-in-out",
        background: "var(--color-primary-50)",
        border: "none",
    };

    const activeTabStyle = {
        ...tabStyle,
        background: "var(--color-primary-600)",
        color: "#ffffff",
    };

    const quickStatsGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2rem",
    };

    const statCardStyle = {
        background: "var(--panel-bg)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        border: "1px solid var(--color-gray-200)",
    };

    const statIconStyle = {
        width: "2rem",
        height: "2rem",
        color: "var(--color-primary-600)",
        marginBottom: "1rem",
    };

    const statTitleStyle = {
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "var(--color-gray-600)",
        marginBottom: "0.5rem",
    };

    const statValueStyle = {
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "0.25rem",
    };

    const statChangeStyle = {
        fontSize: "0.875rem",
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
    };

    const positiveChangeStyle = {
        ...statChangeStyle,
        color: "var(--color-green-600)",
    };

    const negativeChangeStyle = {
        ...statChangeStyle,
        color: "var(--color-red-600)",
    };

    const recentActivityStyle = {
        background: "var(--panel-bg)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        border: "1px solid var(--color-gray-200)",
    };

    const activityItemStyle = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem 0",
        borderBottom: "1px solid var(--color-gray-100)",
    };

    const activityIconStyle = {
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-primary-100)",
        color: "var(--color-primary-600)",
    };

    const activityContentStyle = {
        flex: 1,
    };

    const activityTitleStyle = {
        fontSize: "1rem",
        fontWeight: 500,
        color: "var(--color-gray-900)",
        marginBottom: "0.25rem",
    };

    const activityTimeStyle = {
        fontSize: "0.875rem",
        color: "var(--color-gray-500)",
    };

    const sectionHeadingStyle = {
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const sectionDescriptionStyle = {
        color: "var(--color-gray-600)",
        fontSize: "0.95rem",
        marginBottom: "1.5rem",
        lineHeight: 1.6,
    };

    const focusPlanSectionStyle = {
        background: "var(--panel-bg)",
        borderRadius: "0.75rem",
        padding: "1.75rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        border: "1px solid var(--color-gray-200)",
        margin: "2.5rem 0",
    };

    const focusPlanHeaderStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
        marginBottom: "1.5rem",
    };

    const focusPlanListStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "1.25rem",
    };

    const focusPlanItemStyle = {
        background: "var(--color-gray-50)",
        borderRadius: "0.75rem",
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        minHeight: "180px",
    };

    const focusPlanMetaStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "0.75rem",
    };

    const focusPlanTimeStyle = {
        fontSize: "0.85rem",
        fontWeight: 600,
        color: "var(--color-primary-600)",
    };

    const focusPlanTitleStyle = {
        fontSize: "1.05rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    };

    const focusPlanDescriptionStyle = {
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.5,
    };

    const focusPlanBadgeStyle = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        padding: "0.25rem 0.75rem",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: 600,
    };

    const actionChipStyle = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        padding: "0.45rem 0.9rem",
        borderRadius: "9999px",
        fontSize: "0.85rem",
        fontWeight: 600,
        background: "var(--color-primary-50)",
        color: "var(--color-primary-700)",
    };

    const momentumSectionStyle = {
        margin: "2.5rem 0",
    };

    const momentumGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.5rem",
    };

    const momentumCardStyle = {
        background: "var(--panel-bg)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        border: "1px solid var(--color-gray-200)",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        minHeight: "190px",
    };

    const momentumIconStyle = {
        width: "2.25rem",
        height: "2.25rem",
        color: "var(--color-primary-600)",
    };

    const momentumTitleStyle = {
        fontSize: "1.1rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    };

    const momentumDescriptionStyle = {
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.6,
    };

    const momentumTrendStyle = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        fontSize: "0.85rem",
        fontWeight: 600,
    };

    const momentumTrendPositiveStyle = {
        ...momentumTrendStyle,
        color: "var(--color-green-600)",
    };

    const momentumTrendNegativeStyle = {
        ...momentumTrendStyle,
        color: "var(--color-red-600)",
    };

    const momentumActionStyle = {
        marginTop: "auto",
        fontSize: "0.8rem",
        fontWeight: 600,
        color: "var(--color-primary-600)",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
    };

    const dailyFocusPlan = [
        {
            time: "08:30",
            title: "Morning planning sprint",
            description:
                "Review today’s priorities and map one deep-work block before lunch.",
            status: "in-progress",
        },
        {
            time: "10:00",
            title: "Deep work block",
            description:
                "90-minute focus session dedicated to the highest-impact objective.",
            status: "scheduled",
        },
        {
            time: "14:30",
            title: "Experiment review",
            description:
                "Assess distraction triggers logged this week and adjust presets.",
            status: "scheduled",
        },
        {
            time: "17:45",
            title: "Shutdown ritual",
            description:
                "Document key wins, queue next steps, and clear the workspace.",
            status: "completed",
        },
    ];

    const planStatusStyles = {
        scheduled: {
            background: "#e0f2fe",
            color: "#075985",
            label: "Scheduled",
        },
        "in-progress": {
            background: "#fef3c7",
            color: "#92400e",
            label: "In progress",
        },
        completed: {
            background: "#dcfce7",
            color: "#166534",
            label: "Completed",
        },
    };

    const momentumHighlights = [
        {
            title: "Streak momentum",
            description:
                "You’re seven days into a focus streak. Protect the weekend with a 30-minute maintenance block.",
            trend: {
                direction: "up",
                label: "+12% consistency",
            },
            icon: <FireIcon style={momentumIconStyle} />,
            action: "Schedule weekend check-in",
        },
        {
            title: "Break quality",
            description:
                "Short breaks are averaging 4.5 minutes—right in the sweet spot for recovery without losing focus.",
            trend: {
                direction: "up",
                label: "Optimal range",
            },
            icon: <ClockIcon style={momentumIconStyle} />,
            action: "Lock in preset cadence",
        },
        {
            title: "Evening drift",
            description:
                "Task switching after 6 PM is creeping up again. Consider batching admin work earlier in the afternoon.",
            trend: {
                direction: "down",
                label: "+8% distractions",
            },
            icon: <BellAlertIcon style={momentumIconStyle} />,
            action: "Create admin block",
        },
    ];

    const distractionLoggerStyle = {
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 1000,
    };

    return (
        <div style={containerStyle}>
            {/* Welcome Section */}
            <div style={welcomeSectionStyle}>
                <h1 style={welcomeTitleStyle}>Welcome back!</h1>
                <p style={welcomeSubtitleStyle}>
                    Ready to boost your productivity? Let's get focused.
                </p>
                <div style={actionButtonsStyle}>
                    <button
                        style={primaryButtonStyle}
                        onClick={() => setActiveTab("timers")}
                    >
                        <PlayIcon
                            style={{ width: "1.25rem", height: "1.25rem" }}
                        />
                        Start Focus Session
                    </button>
                    <button
                        style={secondaryButtonStyle}
                        onClick={() => setIsLoggerOpen(true)}
                    >
                        <PlusIcon
                            style={{ width: "1.25rem", height: "1.25rem" }}
                        />
                        Log Distraction
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div style={tabsStyle}>
                <button
                    className={
                        activeTab === "overview"
                            ? "btn-primary"
                            : "btn-secondary"
                    }
                    onClick={() => setActiveTab("overview")}
                >
                    Overview
                </button>
                <button
                    className={
                        activeTab === "timers" ? "btn-primary" : "btn-secondary"
                    }
                    onClick={() => setActiveTab("timers")}
                >
                    Timers
                </button>
                <button
                    className={
                        activeTab === "stats" ? "btn-primary" : "btn-secondary"
                    }
                    onClick={() => setActiveTab("stats")}
                >
                    Statistics
                </button>
                <button
                    className={
                        activeTab === "distractions"
                            ? "btn-primary"
                            : "btn-secondary"
                    }
                    onClick={() => setActiveTab("distractions")}
                >
                    Distractions
                </button>
            </div>

            {/* Content based on active tab */}
            {activeTab === "overview" && (
                <>
                    {/* Quick Stats Grid */}
                    <div style={quickStatsGridStyle}>
                        <div style={statCardStyle}>
                            <ClockIcon style={statIconStyle} />
                            <div style={statTitleStyle}>Today's Focus Time</div>
                            <div style={statValueStyle}>2h 15m</div>
                            <div style={positiveChangeStyle}>
                                <ArrowTrendingUpIcon
                                    style={{ width: "1rem", height: "1rem" }}
                                />
                                +15% from yesterday
                            </div>
                        </div>

                        <div style={statCardStyle}>
                            <CheckCircleIcon style={statIconStyle} />
                            <div style={statTitleStyle}>Completed Sessions</div>
                            <div style={statValueStyle}>5</div>
                            <div style={positiveChangeStyle}>
                                <ArrowTrendingUpIcon
                                    style={{ width: "1rem", height: "1rem" }}
                                />
                                +2 from yesterday
                            </div>
                        </div>

                        <div style={statCardStyle}>
                            <TrophyIcon style={statIconStyle} />
                            <div style={statTitleStyle}>Productivity Score</div>
                            <div style={statValueStyle}>85%</div>
                            <div style={positiveChangeStyle}>
                                <ArrowTrendingUpIcon
                                    style={{ width: "1rem", height: "1rem" }}
                                />
                                +5% from yesterday
                            </div>
                        </div>

                        <div style={statCardStyle}>
                            <FireIcon style={statIconStyle} />
                            <div style={statTitleStyle}>Current Streak</div>
                            <div style={statValueStyle}>7 days</div>
                            <div style={positiveChangeStyle}>
                                <ArrowTrendingUpIcon
                                    style={{ width: "1rem", height: "1rem" }}
                                />
                                New record!
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div style={recentActivityStyle}>
                        <h2
                            style={{
                                marginBottom: "1.5rem",
                                fontSize: "1.25rem",
                                fontWeight: 600,
                            }}
                        >
                            Recent Activity
                        </h2>
                        <div style={activityItemStyle}>
                            <div style={activityIconStyle}>
                                <CheckCircleIcon
                                    style={{
                                        width: "1.25rem",
                                        height: "1.25rem",
                                    }}
                                />
                            </div>
                            <div style={activityContentStyle}>
                                <div style={activityTitleStyle}>
                                    Completed 25-minute focus session
                                </div>
                                <div style={activityTimeStyle}>
                                    2 minutes ago
                                </div>
                            </div>
                        </div>
                        <div style={activityItemStyle}>
                            <div style={activityIconStyle}>
                                <ClockIcon
                                    style={{
                                        width: "1.25rem",
                                        height: "1.25rem",
                                    }}
                                />
                            </div>
                            <div style={activityContentStyle}>
                                <div style={activityTitleStyle}>
                                    Started new focus session
                                </div>
                                <div style={activityTimeStyle}>
                                    15 minutes ago
                                </div>
                            </div>
                        </div>
                        <div style={activityItemStyle}>
                            <div style={activityIconStyle}>
                                <BellAlertIcon
                                    style={{
                                        width: "1.25rem",
                                        height: "1.25rem",
                                    }}
                                />
                            </div>
                            <div style={activityContentStyle}>
                                <div style={activityTitleStyle}>
                                    Logged distraction: Phone call
                                </div>
                                <div style={activityTimeStyle}>1 hour ago</div>
                            </div>
                        </div>
                    </div>

                    <section style={focusPlanSectionStyle}>
                        <div style={focusPlanHeaderStyle}>
                            <div>
                                <h2 style={sectionHeadingStyle}>Today's focus plan</h2>
                                <p style={sectionDescriptionStyle}>
                                    Align deep work, strategic reviews, and wind-down rituals so your
                                    energy peaks line up with the work that matters most.
                                </p>
                            </div>
                            <div style={actionChipStyle}>
                                <CalendarIcon style={{ width: "1.1rem", height: "1.1rem" }} />
                                View weekly planner
                            </div>
                        </div>
                        <div style={focusPlanListStyle}>
                            {dailyFocusPlan.map((block, idx) => {
                                const statusStyle =
                                    planStatusStyles[block.status] || planStatusStyles["scheduled"];
                                return (
                                    <div key={idx} style={focusPlanItemStyle}>
                                        <div style={focusPlanMetaStyle}>
                                            <span style={focusPlanTimeStyle}>{block.time}</span>
                                            <span
                                                style={{
                                                    ...focusPlanBadgeStyle,
                                                    background: statusStyle.background,
                                                    color: statusStyle.color,
                                                }}
                                            >
                                                {statusStyle.label}
                                            </span>
                                        </div>
                                        <div style={focusPlanTitleStyle}>{block.title}</div>
                                        <p style={focusPlanDescriptionStyle}>{block.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section style={momentumSectionStyle}>
                        <h2 style={sectionHeadingStyle}>Momentum highlights</h2>
                        <p style={sectionDescriptionStyle}>
                            Snapshot of the habits powering your streaks, so you can double down on
                            what works and correct drift early.
                        </p>
                        <div style={momentumGridStyle}>
                            {momentumHighlights.map((item, idx) => {
                                const TrendIcon =
                                    item.trend.direction === "down"
                                        ? ArrowTrendingDownIcon
                                        : ArrowTrendingUpIcon;
                                const trendStyle =
                                    item.trend.direction === "down"
                                        ? momentumTrendNegativeStyle
                                        : momentumTrendPositiveStyle;
                                return (
                                    <div key={idx} style={momentumCardStyle}>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.75rem",
                                            }}
                                        >
                                            {item.icon}
                                            <div style={momentumTitleStyle}>{item.title}</div>
                                        </div>
                                        <p style={momentumDescriptionStyle}>{item.description}</p>
                                        <span style={trendStyle}>
                                            <TrendIcon style={{ width: "1rem", height: "1rem" }} />
                                            {item.trend.label}
                                        </span>
                                        <span style={momentumActionStyle}>
                                            {item.action}
                                            <ChevronRightIcon
                                                style={{ width: "1rem", height: "1rem" }}
                                            />
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </>
            )}

            {activeTab === "timers" && <Timer />}
            {activeTab === "stats" && <Stats />}
            {activeTab === "distractions" && (
                <div>
                    <h2
                        style={{
                            marginBottom: "1.5rem",
                            fontSize: "1.5rem",
                            fontWeight: 700,
                        }}
                    >
                        Distraction Log {isSyncing && chip("syncing...")}
                    </h2>

                    <div
                        style={{
                            display: "flex",
                            gap: "0.75rem",
                            alignItems: "center",
                            marginBottom: "1rem",
                        }}
                    >
                        <input
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            placeholder="Filter by text/type..."
                            style={{
                                flex: 1,
                                padding: "0.6rem 0.8rem",
                                borderRadius: "0.5rem",
                                border: "1px solid var(--input-border)",
                                background: "var(--input-bg)",
                                color: "var(--color-gray-900)",
                            }}
                        />
                        <button
                            style={primaryButtonStyle}
                            onClick={() => setIsLoggerOpen(true)}
                        >
                            <PlusIcon
                                style={{ width: "1.25rem", height: "1.25rem" }}
                            />
                            Log New Distraction
                        </button>
                    </div>

                    {distractions.length === 0 ? (
                        <div
                            style={{
                                background: "var(--panel-bg)",
                                borderRadius: "0.75rem",
                                padding: "1.5rem",
                                color: "var(--color-gray-600)",
                                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                                border: "1px solid var(--color-gray-200)",
                            }}
                        >
                            No distractions logged yet. Click "Log New
                            Distraction" to add one.
                        </div>
                    ) : (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(280px, 1fr))",
                                gap: "1rem",
                            }}
                        >
                            {distractions
                                .filter((d) => {
                                    const t = (filterText || "").toLowerCase();
                                    if (!t) return true;
                                    return (
                                        (d.note || "")
                                            .toLowerCase()
                                            .includes(t) ||
                                        (d.type || "").toLowerCase().includes(t)
                                    );
                                })
                                .slice()
                                .sort(
                                    (a, b) =>
                                        new Date(b.timestamp) -
                                        new Date(a.timestamp)
                                )
                                .map((d) => {
                                    const sev = severityColor(d.severity);
                                    return (
                                        <div
                                            key={d.id}
                                            style={{
                                                background:
                                                    "var(--panel-bg)",
                                                borderRadius: "0.75rem",
                                                padding: "1rem",
                                                boxShadow:
                                                    "0 4px 10px rgba(0, 0, 0, 0.08)",
                                                border: "1px solid var(--color-gray-200)",
                                                transition:
                                                    "transform 150ms ease",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    marginBottom: "0.5rem",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        gap: "0.5rem",
                                                        flexWrap: "wrap",
                                                    }}
                                                >
                                                    {chip(d.type || "other")}
                                                    {chip(
                                                        d.severity || "medium",
                                                        {
                                                            background: sev.bg,
                                                            color: sev.fg,
                                                        }
                                                    )}
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: "0.75rem",
                                                        color: "var(--color-gray-500)",
                                                    }}
                                                >
                                                    {new Date(
                                                        d.timestamp
                                                    ).toLocaleString()}
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: "0.95rem",
                                                    color: "var(--color-gray-800)",
                                                    marginBottom: "0.75rem",
                                                }}
                                            >
                                                {d.note}
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                    gap: "0.5rem",
                                                }}
                                            >
                                                <button
                                                    onClick={() =>
                                                        handleDeleteDistraction(
                                                            d.id
                                                        )
                                                    }
                                                    style={{
                                                        background:
                                                            "var(--color-red-50)",
                                                        color: "var(--color-red-700)",
                                                        border: "1px solid #fecaca",
                                                        padding:
                                                            "0.4rem 0.75rem",
                                                        borderRadius: "0.5rem",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </div>
            )}

            {/* Distraction Logger */}
            {isLoggerOpen && (
                <div style={distractionLoggerStyle}>
                    <DistractionLogger
                        isOpen={isLoggerOpen}
                        onClose={() => setIsLoggerOpen(false)}
                        onLog={handleLogDistraction}
                    />
                </div>
            )}
        </div>
    );
}

function App() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Header />
                                        <div
                                            style={{
                                                display: "flex",
                                                minHeight: "calc(100vh - 8rem)",
                                            }}
                                        >
                                            <Navbar
                                                isCollapsed={isCollapsed}
                                                setIsCollapsed={setIsCollapsed}
                                            />
                                            <div
                                                style={{
                                                    flex: 1,
                                                    overflow: "auto",
                                                }}
                                            >
                                                <Dashboard />
                                            </div>
                                        </div>
                                        <Footer />
                                    </>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/focus-timer"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Header />
                                        <div
                                            style={{
                                                display: "flex",
                                                minHeight: "calc(100vh - 8rem)",
                                            }}
                                        >
                                            <Navbar
                                                isCollapsed={isCollapsed}
                                                setIsCollapsed={setIsCollapsed}
                                            />
                                            <div
                                                style={{
                                                    flex: 1,
                                                    overflow: "auto",
                                                }}
                                            >
                                                <FocusTimer />
                                            </div>
                                        </div>
                                        <Footer />
                                    </>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/statistics"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Header />
                                        <div
                                            style={{
                                                display: "flex",
                                                minHeight: "calc(100vh - 8rem)",
                                            }}
                                        >
                                            <Navbar
                                                isCollapsed={isCollapsed}
                                                setIsCollapsed={setIsCollapsed}
                                            />
                                            <div
                                                style={{
                                                    flex: 1,
                                                    overflow: "auto",
                                                }}
                                            >
                                                <Statistics />
                                            </div>
                                        </div>
                                        <Footer />
                                    </>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/settings"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Header />
                                        <div
                                            style={{
                                                display: "flex",
                                                minHeight: "calc(100vh - 8rem)",
                                            }}
                                        >
                                            <Navbar
                                                isCollapsed={isCollapsed}
                                                setIsCollapsed={setIsCollapsed}
                                            />
                                            <div
                                                style={{
                                                    flex: 1,
                                                    overflow: "auto",
                                                }}
                                            >
                                                <Settings />
                                            </div>
                                        </div>
                                        <Footer />
                                    </>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Header />
                                        <div
                                            style={{
                                                display: "flex",
                                                minHeight: "calc(100vh - 8rem)",
                                            }}
                                        >
                                            <Navbar
                                                isCollapsed={isCollapsed}
                                                setIsCollapsed={setIsCollapsed}
                                            />
                                            <div
                                                style={{
                                                    flex: 1,
                                                    overflow: "auto",
                                                }}
                                            >
                                                <Profile />
                                            </div>
                                        </div>
                                        <Footer />
                                    </>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/focusflow-community"
                            element={<Community />}
                        />
                        <Route
                            path="/community"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Header />
                                        <div
                                            style={{
                                                display: "flex",
                                                minHeight: "calc(100vh - 8rem)",
                                            }}
                                        >
                                            <Navbar
                                                isCollapsed={isCollapsed}
                                                setIsCollapsed={setIsCollapsed}
                                            />
                                            <div
                                                style={{
                                                    flex: 1,
                                                    overflow: "auto",
                                                }}
                                            >
                                                <DashboardCommunity />
                                            </div>
                                        </div>
                                        <Footer />
                                    </>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/resources"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Header />
                                        <div
                                            style={{
                                                display: "flex",
                                                minHeight: "calc(100vh - 8rem)",
                                            }}
                                        >
                                            <Navbar
                                                isCollapsed={isCollapsed}
                                                setIsCollapsed={setIsCollapsed}
                                            />
                                            <div
                                                style={{
                                                    flex: 1,
                                                    overflow: "auto",
                                                }}
                                            >
                                                <Resources />
                                            </div>
                                        </div>
                                        <Footer />
                                    </>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/help-support"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Header />
                                        <div
                                            style={{
                                                display: "flex",
                                                minHeight: "calc(100vh - 8rem)",
                                            }}
                                        >
                                            <Navbar
                                                isCollapsed={isCollapsed}
                                                setIsCollapsed={setIsCollapsed}
                                            />
                                            <div
                                                style={{
                                                    flex: 1,
                                                    overflow: "auto",
                                                }}
                                            >
                                                <HelpSupport />
                                            </div>
                                        </div>
                                        <Footer />
                                    </>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/about-us"
                            element={
                                <div>
                                    <Header />
                                    <Navbar
                                        isCollapsed={isCollapsed}
                                        setIsCollapsed={setIsCollapsed}
                                    />
                                    <AboutUs />
                                    <Footer />
                                </div>
                            }
                        />
                        <Route
                            path="/privacy-policy"
                            element={
                                <div>
                                    <Header />
                                    <Navbar
                                        isCollapsed={isCollapsed}
                                        setIsCollapsed={setIsCollapsed}
                                    />
                                    <PrivacyPolicy />
                                    <Footer />
                                </div>
                            }
                        />
                        <Route
                            path="/terms-of-service"
                            element={
                                <div>
                                    <Header />
                                    <Navbar
                                        isCollapsed={isCollapsed}
                                        setIsCollapsed={setIsCollapsed}
                                    />
                                    <TermsOfService />
                                    <Footer />
                                </div>
                            }
                        />
                        <Route
                            path="/contact-us"
                            element={
                                <div>
                                    <Header />
                                    <Navbar
                                        isCollapsed={isCollapsed}
                                        setIsCollapsed={setIsCollapsed}
                                    />
                                    <ContactUs />
                                    <Footer />
                                </div>
                            }
                        />
                        <Route path="/features" element={<Features />} />
                        <Route
                            path="/dashboard/features"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Header />
                                        <div
                                            style={{
                                                display: "flex",
                                                minHeight: "calc(100vh - 8rem)",
                                            }}
                                        >
                                            <Navbar
                                                isCollapsed={isCollapsed}
                                                setIsCollapsed={setIsCollapsed}
                                            />
                                            <div
                                                style={{
                                                    flex: 1,
                                                    overflow: "auto",
                                                }}
                                            >
                                                <DashboardFeatures />
                                            </div>
                                        </div>
                                        <Footer />
                                    </>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/testimonials"
                            element={<Testimonials />}
                        />
                        <Route path="/faq" element={<FAQ />} />
                        <Route
                            path="/blog"
                            element={
                                <div>
                                    <Header />
                                    <Navbar
                                        isCollapsed={isCollapsed}
                                        setIsCollapsed={setIsCollapsed}
                                    />
                                    <Blog />
                                    <Footer />
                                </div>
                            }
                        />
                        <Route
                            path="/guides"
                            element={
                                <div>
                                    <Header />
                                    <Navbar
                                        isCollapsed={isCollapsed}
                                        setIsCollapsed={setIsCollapsed}
                                    />
                                    <Guides />
                                    <Footer />
                                </div>
                            }
                        />
                        <Route
                            path="/support"
                            element={
                                <div>
                                    <Header />
                                    <Navbar
                                        isCollapsed={isCollapsed}
                                        setIsCollapsed={setIsCollapsed}
                                    />
                                    <Support />
                                    <Footer />
                                </div>
                            }
                        />
                        <Route path="/careers" element={<LandingCareers />} />
                        <Route
                            path="/cookies"
                            element={
                                <div>
                                    <Header />
                                    <Navbar
                                        isCollapsed={isCollapsed}
                                        setIsCollapsed={setIsCollapsed}
                                    />
                                    <Cookies />
                                    <Footer />
                                </div>
                            }
                        />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/updates" element={<Updates />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/security" element={<Security />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                        <Route
                            path="/dashboard/faq"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Header />
                                        <div
                                            style={{
                                                display: "flex",
                                                minHeight: "calc(100vh - 8rem)",
                                            }}
                                        >
                                            <Navbar
                                                isCollapsed={isCollapsed}
                                                setIsCollapsed={setIsCollapsed}
                                            />
                                            <div
                                                style={{
                                                    flex: 1,
                                                    overflow: "auto",
                                                }}
                                            >
                                                <DashboardFAQ />
                                            </div>
                                        </div>
                                        <Footer />
                                    </>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard/about"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Header />
                                        <div
                                            style={{
                                                display: "flex",
                                                minHeight: "calc(100vh - 8rem)",
                                            }}
                                        >
                                            <Navbar
                                                isCollapsed={isCollapsed}
                                                setIsCollapsed={setIsCollapsed}
                                            />
                                            <div
                                                style={{
                                                    flex: 1,
                                                    overflow: "auto",
                                                }}
                                            >
                                                <DashboardAbout />
                                            </div>
                                        </div>
                                        <Footer />
                                    </>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard/careers"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Header />
                                        <div
                                            style={{
                                                display: "flex",
                                                minHeight: "calc(100vh - 8rem)",
                                            }}
                                        >
                                            <Navbar
                                                isCollapsed={isCollapsed}
                                                setIsCollapsed={setIsCollapsed}
                                            />
                                            <div
                                                style={{
                                                    flex: 1,
                                                    overflow: "auto",
                                                }}
                                            >
                                                <DashboardCareers />
                                            </div>
                                        </div>
                                        <Footer />
                                    </>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard/contact"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Header />
                                        <div
                                            style={{
                                                display: "flex",
                                                minHeight: "calc(100vh - 8rem)",
                                            }}
                                        >
                                            <Navbar
                                                isCollapsed={isCollapsed}
                                                setIsCollapsed={setIsCollapsed}
                                            />
                                            <div
                                                style={{
                                                    flex: 1,
                                                    overflow: "auto",
                                                }}
                                            >
                                                <DashboardContact />
                                            </div>
                                        </div>
                                        <Footer />
                                    </>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard/privacy"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Header />
                                        <div
                                            style={{
                                                display: "flex",
                                                minHeight: "calc(100vh - 8rem)",
                                            }}
                                        >
                                            <Navbar
                                                isCollapsed={isCollapsed}
                                                setIsCollapsed={setIsCollapsed}
                                            />
                                            <div
                                                style={{
                                                    flex: 1,
                                                    overflow: "auto",
                                                }}
                                            >
                                                <DashboardPrivacy />
                                            </div>
                                        </div>
                                        <Footer />
                                    </>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard/terms"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Header />
                                        <div
                                            style={{
                                                display: "flex",
                                                minHeight: "calc(100vh - 8rem)",
                                            }}
                                        >
                                            <Navbar
                                                isCollapsed={isCollapsed}
                                                setIsCollapsed={setIsCollapsed}
                                            />
                                            <div
                                                style={{
                                                    flex: 1,
                                                    overflow: "auto",
                                                }}
                                            >
                                                <DashboardTerms />
                                            </div>
                                        </div>
                                        <Footer />
                                    </>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard/cookies"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Header />
                                        <div
                                            style={{
                                                display: "flex",
                                                minHeight: "calc(100vh - 8rem)",
                                            }}
                                        >
                                            <Navbar
                                                isCollapsed={isCollapsed}
                                                setIsCollapsed={setIsCollapsed}
                                            />
                                            <div
                                                style={{
                                                    flex: 1,
                                                    overflow: "auto",
                                                }}
                                            >
                                                <DashboardCookies />
                                            </div>
                                        </div>
                                        <Footer />
                                    </>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard/blog"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Header />
                                        <div
                                            style={{
                                                display: "flex",
                                                minHeight: "calc(100vh - 8rem)",
                                            }}
                                        >
                                            <Navbar
                                                isCollapsed={isCollapsed}
                                                setIsCollapsed={setIsCollapsed}
                                            />
                                            <div
                                                style={{
                                                    flex: 1,
                                                    overflow: "auto",
                                                }}
                                            >
                                                <DashboardBlog />
                                            </div>
                                        </div>
                                        <Footer />
                                    </>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard/guides"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Header />
                                        <div
                                            style={{
                                                display: "flex",
                                                minHeight: "calc(100vh - 8rem)",
                                            }}
                                        >
                                            <Navbar
                                                isCollapsed={isCollapsed}
                                                setIsCollapsed={setIsCollapsed}
                                            />
                                            <div
                                                style={{
                                                    flex: 1,
                                                    overflow: "auto",
                                                }}
                                            >
                                                <DashboardGuides />
                                            </div>
                                        </div>
                                        <Footer />
                                    </>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard/support"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Header />
                                        <div
                                            style={{
                                                display: "flex",
                                                minHeight: "calc(100vh - 8rem)",
                                            }}
                                        >
                                            <Navbar
                                                isCollapsed={isCollapsed}
                                                setIsCollapsed={setIsCollapsed}
                                            />
                                            <div
                                                style={{
                                                    flex: 1,
                                                    overflow: "auto",
                                                }}
                                            >
                                                <DashboardSupport />
                                            </div>
                                        </div>
                                        <Footer />
                                    </>
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

function CommunityPageWrapper() {
    const { isAuthenticated } = useAuth();
    return (
        <div>
            {isAuthenticated ? <Header /> : <LandingNavbar />}
            <Community />
            {!isAuthenticated && <LandingFooter />}
        </div>
    );
}

export default App;
