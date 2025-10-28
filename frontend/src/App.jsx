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
import Product from "./pages/Product.jsx";
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

    const dashboardStyles = {
        wrapper: {
            minHeight: "100%",
            padding: "3.5rem 2rem 4rem",
            background: "var(--color-white)",
            color: "var(--color-gray-900)",
        },
        inner: {
            maxWidth: "1120px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "2.75rem",
        },
        hero: {
            background: "var(--panel-bg)",
            borderRadius: "1.5rem",
            border: "1px solid var(--input-border)",
            padding: "2.75rem",
            boxShadow: "var(--shadow-lg)",
            display: "flex",
            flexDirection: "column",
            gap: "1.75rem",
        },
        heroTitle: {
            fontSize: "2.35rem",
            fontWeight: 700,
            lineHeight: 1.2,
            color: "var(--color-gray-900)",
        },
        heroAccent: {
            background: "linear-gradient(to right, #38bdf8, #818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
        },
        heroLead: {
            color: "var(--color-gray-600)",
            fontSize: "1.1rem",
            lineHeight: 1.75,
            maxWidth: "44rem",
        },
        heroActions: {
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
        },
        primaryButton: {
            background: "linear-gradient(to right, #38bdf8, #60a5fa)",
            color: "#0f172a",
            padding: "0.85rem 2.2rem",
            borderRadius: "9999px",
            fontWeight: 600,
            fontSize: "1rem",
            border: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            cursor: "pointer",
        },
        secondaryButton: {
            background: "var(--color-primary-100)",
            color: "var(--color-primary-700)",
            padding: "0.85rem 2rem",
            borderRadius: "9999px",
            fontWeight: 600,
            fontSize: "1rem",
            border: "1px solid var(--color-primary-200)",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            cursor: "pointer",
        },
        heroBadgeRow: {
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
        },
        tabBar: {
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
        },
        tab: {
            background: "var(--color-gray-100)",
            color: "var(--color-gray-600)",
            border: "1px solid var(--color-gray-200)",
            borderRadius: "0.75rem",
            padding: "0.65rem 1.4rem",
            fontWeight: 500,
            fontSize: "0.95rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
        },
        tabActive: {
            background: "var(--color-primary-100)",
            color: "var(--color-primary-700)",
            border: "1px solid var(--color-primary-300)",
            boxShadow: "var(--shadow-md)",
        },
        section: {
            display: "flex",
            flexDirection: "column",
            gap: "1.75rem",
        },
        sectionHeader: {
            display: "flex",
            flexDirection: "column",
            gap: "0.65rem",
            maxWidth: "42rem",
        },
        sectionTitle: {
            fontSize: "1.6rem",
            fontWeight: 700,
            color: "var(--color-gray-900)",
        },
        sectionLead: {
            color: "var(--color-gray-600)",
            fontSize: "1rem",
            lineHeight: 1.7,
        },
        quickStatsGrid: {
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        },
        quickStatCard: {
            background: "var(--panel-bg)",
            border: "1px solid var(--input-border)",
            borderRadius: "1.05rem",
            padding: "1.6rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            boxShadow: "var(--shadow-md)",
        },
        statIconWrap: {
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "0.75rem",
            background: "var(--color-primary-100)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-primary-600)",
        },
        statLabel: {
            fontSize: "0.9rem",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "var(--color-gray-600)",
            fontWeight: 600,
        },
        statValue: {
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--color-gray-900)",
        },
        statDelta: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.85rem",
            fontWeight: 600,
        },
        statDeltaPositive: {
            color: "#22d3ee",
        },
        statDeltaNegative: {
            color: "#f87171",
        },
        card: {
            background: "var(--panel-bg)",
            borderRadius: "1.05rem",
            border: "1px solid var(--input-border)",
            boxShadow: "var(--shadow-md)",
        },
        activityCard: {
            padding: "1.75rem",
        },
        activityList: {
            display: "flex",
            flexDirection: "column",
        },
        activityItem: {
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "1rem 0",
            borderBottom: "1px solid var(--color-gray-200)",
        },
        activityIcon: {
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "0.75rem",
            background: "var(--color-primary-100)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-primary-600)",
        },
        activityTitle: {
            fontSize: "1rem",
            fontWeight: 600,
            color: "var(--color-gray-900)",
        },
        activityTime: {
            fontSize: "0.85rem",
            color: "var(--color-gray-600)",
        },
        focusPlanSection: {
            padding: "2rem",
            background: "var(--panel-bg)",
            borderRadius: "1.2rem",
            border: "1px solid var(--input-border)",
            boxShadow: "var(--shadow-md)",
            display: "flex",
            flexDirection: "column",
            gap: "1.75rem",
        },
        focusPlanHeader: {
            display: "flex",
            justifyContent: "space-between",
            gap: "1.25rem",
            flexWrap: "wrap",
        },
        focusPlanList: {
            right: "2.25rem",
            zIndex: 1000,
        },
    };

    const dashboardTabs = [
        { key: "overview", label: "Overview" },
        { key: "timers", label: "Timers" },
        { key: "stats", label: "Statistics" },
        { key: "distractions", label: "Distractions" },
    ];

    const quickStatCards = [
        {
            title: "Today's focus time",
            value: "2h 15m",
            delta: "+15% vs yesterday",
            trend: "up",
            icon: ClockIcon,
        },
        {
            title: "Completed sessions",
            value: "5",
            delta: "+2 vs yesterday",
            trend: "up",
            icon: CheckCircleIcon,
        },
        {
            title: "Productivity score",
            value: "85%",
            delta: "+5% vs yesterday",
            trend: "up",
            icon: TrophyIcon,
        },
        {
            title: "Current streak",
            value: "7 days",
            delta: "New record!",
            trend: "up",
            icon: FireIcon,
        },
    ];

    const activityFeed = [
        {
            icon: CheckCircleIcon,
            description: "Completed 25-minute focus session",
            time: "2 minutes ago",
        },
        {
            icon: ClockIcon,
            description: "Started new focus session",
            time: "15 minutes ago",
        },
        {
            icon: BellAlertIcon,
            description: "Logged distraction: Phone call",
            time: "1 hour ago",
        },
    ];

    const sectionIntro = {
        snapshot: {
            title: "Snapshot of today",
            lead: "Keep a pulse on your focus rhythm with real-time stats and trend signals across sessions, streaks, and productivity scores.",
        },
        activity: {
            title: "Recent activity",
            lead: "A running log of what you shipped, started, and noted so your coaching loops always have fresh context.",
        },
        focusPlan: {
            title: "Today's focus plan",
            lead: "Align deep work, strategic reviews, and wind-down rituals so energy peaks sync with the work that matters most.",
        },
        momentum: {
            title: "Momentum highlights",
            lead: "Signals and nudges drawn from your week to reinforce winning habits and course-correct early.",
        },
        distractions: {
            title: "Distraction log",
            lead: "Tag, review, and clear blockers in minutes. Every insight rolls back into smarter presets and rituals.",
        },
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

    const heroBadges = ["Daily focus lab", "Community streaks", "Offline-ready rituals"];

    const momentumHighlights = [
        {
            title: "Streak momentum",
            description:
                "You’re seven days into a focus streak. Protect the weekend with a 30-minute maintenance block.",
            trend: {
                direction: "up",
                label: "+12% consistency",
            },
            icon: FireIcon,
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
            icon: ClockIcon,
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
            icon: BellAlertIcon,
            action: "Create admin block",
        },
    ];
    return (
        <div style={dashboardStyles.wrapper}>
            <div style={dashboardStyles.inner}>
                <section style={dashboardStyles.hero}>
                    <div>
                        <h1 style={dashboardStyles.heroTitle}>
                            Welcome back, <span style={dashboardStyles.heroAccent}>your focus lab awaits</span>
                        </h1>
                        <p style={dashboardStyles.heroLead}>
                            Shape your day with calibrated sessions, mindful breaks, and community accountability—everything you need to keep momentum compounding.
                        </p>
                    </div>
                    <div style={dashboardStyles.heroActions}>
                        <button
                            style={dashboardStyles.primaryButton}
                            onClick={() => setActiveTab("timers")}
                        >
                            <PlayIcon style={{ width: "1.2rem", height: "1.2rem" }} />
                            Start focus session
                        </button>
                        <button
                            style={dashboardStyles.secondaryButton}
                            onClick={() => setIsLoggerOpen(true)}
                        >
                            <PlusIcon style={{ width: "1.2rem", height: "1.2rem" }} />
                            Log distraction
                        </button>
                    </div>
                    <div style={dashboardStyles.heroBadgeRow}>
                        {heroBadges.map((badge) => (
                            <span key={badge} style={dashboardStyles.actionChip}>
                                {badge}
                            </span>
                        ))}
                    </div>
                </section>

                <div style={dashboardStyles.tabBar}>
                    {dashboardTabs.map((tab) => (
                        <button
                            key={tab.key}
                            style={
                                activeTab === tab.key
                                    ? { ...dashboardStyles.tab, ...dashboardStyles.tabActive }
                                    : dashboardStyles.tab
                            }
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {activeTab === "overview" && (
                    <>
                        <section style={dashboardStyles.section}>
                            <header style={dashboardStyles.sectionHeader}>
                                <h2 style={dashboardStyles.sectionTitle}>{sectionIntro.snapshot.title}</h2>
                                <p style={dashboardStyles.sectionLead}>{sectionIntro.snapshot.lead}</p>
                            </header>
                            <div style={dashboardStyles.quickStatsGrid}>
                                {quickStatCards.map((card) => {
                                    const Icon = card.icon;
                                    const TrendIcon =
                                        card.trend === "down" ? ArrowTrendingDownIcon : ArrowTrendingUpIcon;
                                    const deltaStyle = {
                                        ...dashboardStyles.statDelta,
                                        ...(card.trend === "down"
                                            ? dashboardStyles.statDeltaNegative
                                            : dashboardStyles.statDeltaPositive),
                                    };
                                    return (
                                        <div key={card.title} style={dashboardStyles.quickStatCard}>
                                            <div style={dashboardStyles.statIconWrap}>
                                                <Icon style={{ width: "1.4rem", height: "1.4rem" }} />
                                            </div>
                                            <span style={dashboardStyles.statLabel}>{card.title}</span>
                                            <span style={dashboardStyles.statValue}>{card.value}</span>
                                            <span style={deltaStyle}>
                                                <TrendIcon style={{ width: "1rem", height: "1rem" }} />
                                                {card.delta}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        <section style={{ ...dashboardStyles.section, ...dashboardStyles.card, ...dashboardStyles.activityCard }}>
                            <header style={dashboardStyles.sectionHeader}>
                                <h2 style={dashboardStyles.sectionTitle}>{sectionIntro.activity.title}</h2>
                                <p style={dashboardStyles.sectionLead}>{sectionIntro.activity.lead}</p>
                            </header>
                            <div style={dashboardStyles.activityList}>
                                {activityFeed.map((activity, idx) => {
                                    const Icon = activity.icon;
                                    return (
                                        <div
                                            key={`${activity.description}-${idx}`}
                                            style={{
                                                ...dashboardStyles.activityItem,
                                                borderBottom:
                                                    idx === activityFeed.length - 1
                                                        ? "none"
                                                        : dashboardStyles.activityItem.borderBottom,
                                            }}
                                        >
                                            <div style={dashboardStyles.activityIcon}>
                                                <Icon style={{ width: "1.2rem", height: "1.2rem" }} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={dashboardStyles.activityTitle}>{activity.description}</div>
                                                <div style={dashboardStyles.activityTime}>{activity.time}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        <section style={dashboardStyles.focusPlanSection}>
                            <div style={dashboardStyles.focusPlanHeader}>
                                <div style={dashboardStyles.sectionHeader}>
                                    <h2 style={dashboardStyles.sectionTitle}>{sectionIntro.focusPlan.title}</h2>
                                    <p style={dashboardStyles.sectionLead}>{sectionIntro.focusPlan.lead}</p>
                                </div>
                                <span style={dashboardStyles.actionChip}>
                                    <CalendarIcon style={{ width: "1.05rem", height: "1.05rem" }} />
                                    View weekly planner
                                </span>
                            </div>
                            <div style={dashboardStyles.focusPlanList}>
                                {dailyFocusPlan.map((block, idx) => {
                                    const statusStyle =
                                        planStatusStyles[block.status] || planStatusStyles["scheduled"];
                                    return (
                                        <div key={`${block.title}-${idx}`} style={dashboardStyles.focusPlanEntry}>
                                            <div style={dashboardStyles.focusPlanMeta}>
                                                <span style={dashboardStyles.focusPlanTime}>{block.time}</span>
                                                <span
                                                    style={{
                                                        ...dashboardStyles.focusPlanBadge,
                                                        background: statusStyle.background,
                                                        color: statusStyle.color,
                                                    }}
                                                >
                                                    {statusStyle.label}
                                                </span>
                                            </div>
                                            <div style={dashboardStyles.focusPlanTitle}>{block.title}</div>
                                            <p style={dashboardStyles.focusPlanDescription}>{block.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        <section style={dashboardStyles.section}>
                            <header style={dashboardStyles.sectionHeader}>
                                <h2 style={dashboardStyles.sectionTitle}>{sectionIntro.momentum.title}</h2>
                                <p style={dashboardStyles.sectionLead}>{sectionIntro.momentum.lead}</p>
                            </header>
                            <div style={dashboardStyles.momentumGrid}>
                                {momentumHighlights.map((item, idx) => {
                                    const Icon = item.icon;
                                    const TrendIcon =
                                        item.trend.direction === "down"
                                            ? ArrowTrendingDownIcon
                                            : ArrowTrendingUpIcon;
                                    const trendTint =
                                        item.trend.direction === "down"
                                            ? dashboardStyles.momentumTrendNegative
                                            : dashboardStyles.momentumTrendPositive;
                                    return (
                                        <div key={`${item.title}-${idx}`} style={dashboardStyles.momentumCard}>
                                            <div style={dashboardStyles.momentumHeader}>
                                                <Icon style={{ width: "1.4rem", height: "1.4rem" }} />
                                                <div style={dashboardStyles.momentumTitle}>{item.title}</div>
                                            </div>
                                            <p style={dashboardStyles.momentumDescription}>{item.description}</p>
                                            <span style={{ ...dashboardStyles.momentumTrend, ...trendTint }}>
                                                <TrendIcon style={{ width: "1rem", height: "1rem" }} />
                                                {item.trend.label}
                                            </span>
                                            <span style={dashboardStyles.momentumAction}>
                                                {item.action}
                                                <ChevronRightIcon style={{ width: "1rem", height: "1rem" }} />
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
                    <section style={dashboardStyles.section}>
                        <header style={dashboardStyles.sectionHeader}>
                            <h2 style={dashboardStyles.sectionTitle}>
                                {sectionIntro.distractions.title} {isSyncing && chip("syncing...")}
                            </h2>
                            <p style={dashboardStyles.sectionLead}>{sectionIntro.distractions.lead}</p>
                        </header>

                        <div style={dashboardStyles.filterRow}>
                            <input
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                                placeholder="Filter by text/type..."
                                style={dashboardStyles.filterInput}
                            />
                            <button
                                style={dashboardStyles.filterButton}
                                onClick={() => setIsLoggerOpen(true)}
                            >
                                <PlusIcon style={{ width: "1.2rem", height: "1.2rem" }} />
                                Log new distraction
                            </button>
                        </div>

                        {distractions.length === 0 ? (
                            <div style={dashboardStyles.blankState}>
                                No distractions logged yet. Tap "Log new distraction" to capture your first note.
                            </div>
                        ) : (
                            <div style={dashboardStyles.distractionGrid}>
                                {distractions
                                    .filter((d) => {
                                        const t = (filterText || "").toLowerCase();
                                        if (!t) return true;
                                        return (
                                            (d.note || "").toLowerCase().includes(t) ||
                                            (d.type || "").toLowerCase().includes(t)
                                        );
                                    })
                                    .slice()
                                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                                    .map((d) => {
                                        const sev = severityColor(d.severity);
                                        return (
                                            <div key={d.id} style={dashboardStyles.distractionCard}>
                                                <div style={dashboardStyles.distractionMeta}>
                                                    <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
                                                        <span style={dashboardStyles.chip}>{d.type || "other"}</span>
                                                        <span
                                                            style={{
                                                                ...dashboardStyles.chip,
                                                                background: sev.bg,
                                                                color: sev.fg,
                                                            }}
                                                        >
                                                            {d.severity || "medium"}
                                                        </span>
                                                    </div>
                                                    <span style={dashboardStyles.cardTimestamp}>
                                                        {new Date(d.timestamp).toLocaleString()}
                                                    </span>
                                                </div>
                                                <div style={dashboardStyles.cardBody}>{d.note}</div>
                                                <div style={dashboardStyles.cardActions}>
                                                    <button
                                                        onClick={() => handleDeleteDistraction(d.id)}
                                                        style={dashboardStyles.deleteButton}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        )}
                    </section>
                )}

                {isLoggerOpen && (
                    <div style={dashboardStyles.floatingLogger}>
                        <DistractionLogger
                            isOpen={isLoggerOpen}
                            onClose={() => setIsLoggerOpen(false)}
                            onLog={handleLogDistraction}
                        />
                    </div>
                )}
            </div>
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
                        <Route path="/product" element={<Product />} />
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
