import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
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
import { API_BASE_URL as API_BASE } from "./config/api";
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
    MusicalNoteIcon,
    Cog6ToothIcon,
    LightBulbIcon,
    SparklesIcon,
    PencilSquareIcon,
    PaintBrushIcon,
    UserIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import useResponsive from "./hooks/useResponsive";
import Signup from "./pages/Signup.jsx";
import LandingPage from "./LandingPage/LandingPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { ConfirmProvider } from "./components/ConfirmModal.jsx";
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
import MusicRelaxation from "./components/relaxation/MusicRelaxation.jsx";
import MeditationRelaxation from "./components/relaxation/MeditationRelaxation.jsx";
import ThoughtDumpRelaxation from "./components/relaxation/ThoughtDumpRelaxation.jsx";
import CalmingGameRelaxation from "./components/relaxation/CalmingGameRelaxation.jsx";
import DoodlePadRelaxation from "./components/relaxation/DoodlePadRelaxation.jsx";
import AffirmationsRelaxation from "./components/relaxation/AffirmationsRelaxation.jsx";



function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { isMobile, isTablet, width } = useResponsive();
    const isDarkTheme =
        typeof document !== "undefined" &&
        document.documentElement.classList.contains("dark");
    const [distractions, setDistractions] = useState(() => {
        const saved = localStorage.getItem("distractions");
        return saved ? JSON.parse(saved) : [];
    });
    useEffect(() => {
        const ENABLE_SEED = true; // flip to false to disable seeding
        if (!ENABLE_SEED) return;
        try {
            const seededKey = "ff.seededData.v1";
            const alreadySeeded = localStorage.getItem(seededKey) === "true";
            const existing = localStorage.getItem("distractions");
            const existingList = existing ? JSON.parse(existing) : [];
            if (
                !alreadySeeded &&
                (!existingList || existingList.length === 0)
            ) {
                const now = Date.now();
                const seed = [
                    {
                        id: crypto.randomUUID(),
                        timestamp: now - 1000 * 60 * 10,
                        note: "Phone call during session",
                        type: "phone",
                        severity: "high",
                    },
                    {
                        id: crypto.randomUUID(),
                        timestamp: now - 1000 * 60 * 45,
                        note: "Slack ping",
                        type: "chat",
                        severity: "medium",
                    },
                    {
                        id: crypto.randomUUID(),
                        timestamp: now - 1000 * 60 * 90,
                        note: "Email check drifted",
                        type: "email",
                        severity: "low",
                    },
                    {
                        id: crypto.randomUUID(),
                        timestamp: now - 1000 * 60 * 150,
                        note: "Stretch break",
                        type: "break",
                        severity: "low",
                    },
                ];
                localStorage.setItem("distractions", JSON.stringify(seed));
                localStorage.setItem(seededKey, "true");
                setDistractions(seed);
            }
        } catch { }
    }, []);
    const [isLoggerOpen, setIsLoggerOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [filterText, setFilterText] = useState("");
    const [isSyncing, setIsSyncing] = useState(false);
    const [activeRelaxationModal, setActiveRelaxationModal] = useState(null);
    const [relaxationUsage, setRelaxationUsage] = useState(() => {
        const saved = localStorage.getItem("relaxationUsage");
        return saved
            ? JSON.parse(saved)
            : { activities: [], lastReset: Date.now() };
    });
    const [cooldownActive, setCooldownActive] = useState(false);
    const [notification, setNotification] = useState(null);
    const [showWeeklyPlanner, setShowWeeklyPlanner] = useState(false);
    const [editingBufferBlock, setEditingBufferBlock] = useState(null);
    const [editingBufferText, setEditingBufferText] = useState("");
    const [dailyFocusPlanItems, setDailyFocusPlanItems] = useState(() => {
        const saved = localStorage.getItem("dailyFocusPlan");
        return saved
            ? JSON.parse(saved)
            : [
                {
                    time: "08:30",
                    title: "Morning planning sprint",
                    description:
                        "Review today's priorities and map one deep-work block before lunch.",
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
    });

    const [summaryStats, setSummaryStats] = useState({
        todayFocusMinutes: 0,
        completedSessionsCount: 0,
        productivityScore: 0,
        currentStreak: 0
    });

    const [activityFeed, setActivityFeed] = useState([]);
    const [isLoadingStats, setIsLoadingStats] = useState(true);

    const fetchSummaryStats = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = { "Content-Type": "application/json" };
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            // Fetch summary stats
            const statsRes = await fetch(`${API_BASE}/stats/summary`, {
                credentials: "include",
                headers,
            });
            const statsJson = await statsRes.json();
            if (statsJson?.success) {
                setSummaryStats(statsJson.data.summary);
            }

            // Fetch activity feed from users endpoint (includes logins, sessions, community joins)
            const activityRes = await fetch(`${API_BASE}/users/activity`, {
                credentials: "include",
                headers,
            });
            const activityJson = await activityRes.json();
            if (activityJson?.success && Array.isArray(activityJson.data)) {
                // Map the activity data to the format expected by the UI
                const mappedFeed = activityJson.data.map(act => {
                    // Choose icon based on activity type
                    let icon = CheckCircleIcon;
                    if (act.type === 'login') {
                        icon = UserIcon;
                    } else if (act.type === 'join') {
                        icon = UserGroupIcon;
                    } else if (act.type === 'session') {
                        icon = ClockIcon;
                    }

                    return {
                        ...act,
                        icon,
                        description: `${act.user?.username || 'User'} ${act.content}`,
                        time: new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    };
                });
                setActivityFeed(mappedFeed);
            }
        } catch (e) {
            console.error("Stats fetch failed:", e.message);
        } finally {
            setIsLoadingStats(false);
        }
    };

    useEffect(() => {
        fetchSummaryStats();
    }, []);
    const [weeklyPlanItems, setWeeklyPlanItems] = useState(() => {
        const saved = localStorage.getItem("weeklyPlan");
        return saved
            ? JSON.parse(saved)
            : [
                {
                    day: "Monday",
                    focus: "Strategic Planning",
                    duration: "3 hours",
                    sessions: 3,
                },
                {
                    day: "Tuesday",
                    focus: "Deep Development Work",
                    duration: "4 hours",
                    sessions: 4,
                },
                {
                    day: "Wednesday",
                    focus: "Code Review & Collaboration",
                    duration: "2.5 hours",
                    sessions: 2,
                },
                {
                    day: "Thursday",
                    focus: "Problem Solving & Testing",
                    duration: "3.5 hours",
                    sessions: 3,
                },
                {
                    day: "Friday",
                    focus: "Documentation & Planning",
                    duration: "2 hours",
                    sessions: 2,
                },
            ];
    });

    // Save daily focus plan to localStorage
    useEffect(() => {
        localStorage.setItem(
            "dailyFocusPlan",
            JSON.stringify(dailyFocusPlanItems)
        );
    }, [dailyFocusPlanItems]);

    // Save weekly plan to localStorage
    useEffect(() => {
        localStorage.setItem("weeklyPlan", JSON.stringify(weeklyPlanItems));
    }, [weeklyPlanItems]);

    // Check if cooldown is active on component mount
    useEffect(() => {
        const savedCooldown = localStorage.getItem("relaxationCooldown");
        if (savedCooldown) {
            const cooldownData = JSON.parse(savedCooldown);
            const timeLeft = cooldownData.endTime - Date.now();
            if (timeLeft > 0) {
                setCooldownActive(true);
                // Set a timeout to clear cooldown when it expires
                setTimeout(() => {
                    setCooldownActive(false);
                    localStorage.removeItem("relaxationCooldown");
                }, timeLeft);
            } else {
                localStorage.removeItem("relaxationCooldown");
            }
        }
    }, []);

    // Save relaxation usage to localStorage
    useEffect(() => {
        localStorage.setItem(
            "relaxationUsage",
            JSON.stringify(relaxationUsage)
        );
    }, [relaxationUsage]);

    // Body scroll lock for Weekly Planner modal
    useEffect(() => {
        if (showWeeklyPlanner) {
            document.body.style.overflow = "hidden";
            document.body.style.height = "100vh";
        } else {
            document.body.style.overflow = "";
            document.body.style.height = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.body.style.height = "";
        };
    }, [showWeeklyPlanner]);

    // Function to handle skip to focus session
    const handleSkipToFocus = () => {
        navigate("/focus-timer");
    };

    // Function to check if user can use a relaxation activity
    const canUseRelaxationActivity = (activityType) => {
        // Reset usage if it's been more than 24 hours
        const now = Date.now();
        if (now - relaxationUsage.lastReset > 24 * 60 * 60 * 1000) {
            setRelaxationUsage({ activities: [], lastReset: now });
            return true;
        }

        // Check if cooldown is active
        if (cooldownActive) {
            return false;
        }

        // Count how many times this activity has been used
        const activityCount = relaxationUsage.activities.filter(a => a.type === activityType).length;

        // Count total unique activities
        const uniqueActivities = [...new Set(relaxationUsage.activities.map(a => a.type))].length;

        // Allow if:
        // 1. Less than 2 different activities used, OR
        // 2. This activity used less than 2 times
        if (uniqueActivities < 2 || activityCount < 2) {
            return true;
        }

        // Start cooldown
        startCooldown();
        return false;
        // return true;
    };

    // Function to record relaxation activity usage
    const recordRelaxationActivity = (activityType) => {
        const now = Date.now();
        const newUsage = {
            activities: [
                ...relaxationUsage.activities,
                { type: activityType, timestamp: now },
            ],
            lastReset: relaxationUsage.lastReset,
        };
        setRelaxationUsage(newUsage);
    };

    // Function to start 30-minute cooldown
    const startCooldown = () => {
        const endTime = Date.now() + 30 * 60 * 1000; // 30 minutes
        const cooldownData = { endTime };
        localStorage.setItem(
            "relaxationCooldown",
            JSON.stringify(cooldownData)
        );
        setCooldownActive(true);

        // Set timeout to clear cooldown
        setTimeout(() => {
            setCooldownActive(false);
            localStorage.removeItem("relaxationCooldown");
        }, 30 * 60 * 1000);
    };

    // Function to handle opening a relaxation modal
    const handleOpenRelaxationModal = (modalType) => {
        if (canUseRelaxationActivity(modalType)) {
            recordRelaxationActivity(modalType);
            setActiveRelaxationModal(modalType);
        } else {
            // Show notification about cooldown
            setNotification({
                message:
                    "You've reached the limit for relaxation activities. Please wait 30 minutes before using them again.",
                type: "warning",
            });
            // Clear notification after 5 seconds
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        }
    };

    const displayName = user
        ? user.firstName
            ? `${user.firstName}${user.lastName ? " " + user.lastName : ""}`
            : user.username || user.email || "there"
        : "";

    useEffect(() => {
        localStorage.setItem("distractions", JSON.stringify(distractions));
    }, [distractions]);

    // Initial sync from backend (best-effort)
    useEffect(() => {
        const fetchDistractions = async () => {
            try {
                setIsSyncing(true);
                const token = localStorage.getItem("token");
                const headers = { "Content-Type": "application/json" };
                if (token) {
                    headers["Authorization"] = `Bearer ${token}`;
                }
                const res = await fetch(`${API_BASE}/distractions`, {
                    credentials: "include",
                    headers,
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
                console.error("Distraction sync failed:", e.message);
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
            const token = localStorage.getItem("token");
            const headers = { "Content-Type": "application/json" };
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
            const res = await fetch(`${API_BASE}/distractions`, {
                method: "POST",
                headers,
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
        const palette = {
            high: {
                bg: isDarkTheme
                    ? "rgba(239, 68, 68, 0.15)"
                    : "color-mix(in srgb, var(--color-red-50) 75%, var(--panel-bg))",
                fg: isDarkTheme ? "#f87171" : "var(--color-red-600)",
            },
            medium: {
                bg: isDarkTheme
                    ? "rgba(14, 165, 233, 0.15)"
                    : "color-mix(in srgb, var(--color-primary-100) 70%, var(--panel-bg))",
                fg: isDarkTheme ? "var(--color-cyan-400)" : "var(--color-primary-700)",
            },
            low: {
                bg: isDarkTheme
                    ? "rgba(14, 165, 233, 0.1)"
                    : "color-mix(in srgb, var(--color-primary-200) 55%, var(--panel-bg))",
                fg: isDarkTheme ? "var(--color-cyan-500)" : "var(--color-primary-700)",
            },
        };
        return palette[sev] || palette.medium;
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

    const heroGradient = "linear-gradient(to right, #38bdf8, #60a5fa)";
    const heroBorderLight =
        "1px solid color-mix(in srgb, var(--color-primary-200) 65%, transparent)";
    const heroShadowLight = "0 32px 72px -36px rgba(14,165,233,0.65)";
    const heroTextLight = "#f8fafc";
    const heroLeadLight =
        "color-mix(in srgb, #f8fafc 82%, rgba(224,242,254,0.8))";
    const heroChipBgLight =
        "color-mix(in srgb, rgba(255,255,255,0.24) 70%, transparent)";
    const heroChipBorderLight = "1px solid rgba(248,250,252,0.4)";
    const heroChipColorLight = "#f8fafc";
    const heroSecondaryButtonBgLight =
        "color-mix(in srgb, rgba(255,255,255,0.18) 75%, transparent)";
    const heroSecondaryButtonBorderLight = "1px solid rgba(248,250,252,0.55)";
    const heroSecondaryButtonColorLight = "#f8fafc";

    const recentCardBgLight =
        "color-mix(in srgb, rgba(96,165,250,0.12) 55%, var(--panel-bg))";
    const recentCardBorderLight =
        "1px solid color-mix(in srgb, var(--color-primary-200) 40%, var(--input-border))";
    const recentCardShadowLight = "0 26px 56px -40px rgba(96,165,250,0.45)";

    const snapshotCardBgLight =
        "color-mix(in srgb, rgba(56,189,248,0.18) 65%, var(--color-white))";
    const snapshotCardBorderLight =
        "1px solid color-mix(in srgb, var(--color-primary-200) 60%, transparent)";
    const snapshotCardShadowLight = "0 22px 48px -32px rgba(56,189,248,0.45)";

    const momentumCardBgLight =
        "color-mix(in srgb, rgba(59,130,246,0.16) 55%, var(--panel-bg))";
    const momentumCardBorderLight =
        "1px solid color-mix(in srgb, var(--color-primary-200) 55%, transparent)";
    const momentumCardShadowLight = "0 30px 64px -46px rgba(59,130,246,0.5)";

    const dashboardStyles = {
        wrapper: {
            minHeight: "100%",
            padding: isMobile ? "2rem 1rem 3rem" : isTablet ? "2.5rem 1.5rem 3.5rem" : "3.5rem 2rem 4rem",
            background: isDarkTheme
                ? "var(--color-white)"
                : "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #f0fdf4 50%, #fdf4ff 75%, #fff7ed 100%)",
            color: "var(--color-gray-900)",
            position: "relative",
            overflow: "hidden",
        },
        inner: {
            maxWidth: "1120px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "1.75rem" : isTablet ? "2.25rem" : "2.75rem",
        },
        hero: {
            background: isDarkTheme
                ? "var(--panel-bg)"
                : "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #8b5cf6 100%)",
            borderRadius: isMobile ? "1.25rem" : "2rem",
            border: isDarkTheme
                ? "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)"
                : "2px solid rgba(255,255,255,0.2)",
            padding: isMobile ? "1.5rem 1.25rem" : isTablet ? "2rem" : "3rem",
            boxShadow: isDarkTheme
                ? "none"
                : "0 25px 50px -12px rgba(59,130,246,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "1.25rem" : "2rem",
            color: isDarkTheme ? "var(--color-gray-900)" : heroTextLight,
            position: "relative",
            overflow: "hidden",
        },
        heroTitle: {
            fontSize: isMobile ? "1.5rem" : isTablet ? "2rem" : "2.75rem",
            fontWeight: 800,
            lineHeight: 1.15,
            color: isDarkTheme ? "var(--color-gray-900)" : heroTextLight,
            textShadow: isDarkTheme ? "none" : "0 2px 4px rgba(0,0,0,0.1)",
            letterSpacing: "-0.025em",
        },
        heroAccent: {
            background: isDarkTheme
                ? "linear-gradient(to right, #38bdf8, #818cf8)"
                : "linear-gradient(135deg, #fbbf24, #f472b6, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: 900,
        },
        heroLead: {
            color: isDarkTheme ? "var(--color-gray-600)" : heroLeadLight,
            fontSize: isMobile ? "0.9rem" : isTablet ? "1rem" : "1.1rem",
            lineHeight: 1.75,
            maxWidth: "44rem",
        },
        heroActions: {
            display: "flex",
            flexDirection: width < 500 ? "column" : "row",
            gap: width < 500 ? "0.75rem" : "1rem",
            flexWrap: "wrap",
            alignItems: width < 500 ? "center" : "flex-start",
        },
        primaryButton: {
            background: "linear-gradient(to right, #38bdf8, #60a5fa)",
            color: "#0f172a",
            padding: isMobile ? "0.75rem 1.5rem" : "0.85rem 2.2rem",
            borderRadius: "9999px",
            fontWeight: 600,
            fontSize: isMobile ? "0.9rem" : "1rem",
            border: "none",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            cursor: "pointer",
            width: "auto",
        },
        secondaryButton: {
            background:
                "linear-gradient(110deg, rgba(59,130,246,0.22), rgba(14,165,233,0.22))",
            color: "var(--color-primary-700)",
            padding: isMobile ? "0.75rem 1.5rem" : "0.85rem 2rem",
            borderRadius: "9999px",
            fontWeight: 600,
            fontSize: isMobile ? "0.9rem" : "1rem",
            border: "1px solid rgba(56,189,248,0.35)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            cursor: "pointer",
            width: "auto",
            ...(isDarkTheme
                ? {}
                : {
                    background: heroSecondaryButtonBgLight,
                    border: heroSecondaryButtonBorderLight,
                    color: heroSecondaryButtonColorLight,
                }),
        },
        heroBadgeRow: {
            display: "flex",
            gap: isMobile ? "0.5rem" : "0.75rem",
            flexWrap: "wrap",
            justifyContent: isMobile ? "center" : "flex-start",
        },
        actionChip: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: isMobile ? "0.45rem 0.9rem" : "0.6rem 1.2rem",
            borderRadius: "50px",
            fontSize: isMobile ? "0.7rem" : "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            background: "rgba(59,130,246,0.12)",
            color: "var(--color-primary-700)",
            border: "1px solid rgba(56,189,248,0.28)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            ...(isDarkTheme
                ? {}
                : {
                    background: "rgba(255,255,255,0.25)",
                    color: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.3)",
                    boxShadow: "0 8px 32px rgba(59,130,246,0.1)",
                }),
        },
        tabBar: {
            display: width < 460 ? "grid" : "flex",
            // gridTemplateColumns: width < 460 ? "repeat(2, 1fr)" : undefined,
            gridTemplateColumns: width < 460 ? "repeat(2, auto)" : undefined,
            justifyContent: width < 460 ? "center" : undefined,
            justifyItems: width < 460 ? "center" : undefined,
            gap: isMobile ? "0.5rem" : "0.75rem",
            flexWrap: "wrap",
            overflowX: isMobile ? "auto" : "visible",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
        },
        tab: {
            background: "rgba(148,163,184,0.14)",
            color: "var(--color-gray-600)",
            border: "1px solid rgba(148,163,184,0.24)",
            borderRadius: "0.75rem",
            padding: isMobile ? "0.5rem 1rem" : "0.65rem 1.4rem",
            fontWeight: 500,
            fontSize: isMobile ? "0.85rem" : "0.95rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
            whiteSpace: "nowrap",
            textAlign: "center",
            minWidth: width < 460 ? "7.5rem" : undefined,
        },
        tabActive: {
            background: "rgba(59,130,246,0.2)",
            color: "var(--color-primary-700)",
            border: "1px solid rgba(56,189,248,0.4)",
            boxShadow: "0 18px 32px -28px rgba(56,189,248,0.55)",
        },
        section: {
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "1.25rem" : "1.75rem",
        },
        sectionHeader: {
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "0.45rem" : "0.65rem",
            maxWidth: "42rem",
        },
        sectionTitle: {
            fontSize: isMobile ? "1.25rem" : isTablet ? "1.4rem" : "1.6rem",
            fontWeight: 700,
            color: "var(--color-gray-900)",
        },
        sectionLead: {
            color: "var(--color-gray-600)",
            fontSize: isMobile ? "0.88rem" : "1rem",
            lineHeight: 1.7,
        },
        // Distractions styles (list + filters)
        filterRow: {
            display: "flex",
            alignItems: isMobile ? "stretch" : "center",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "0.5rem" : "0.75rem",
            flexWrap: "wrap",
        },
        filterInput: {
            flex: 1,
            minWidth: isMobile ? "100%" : "260px",
            padding: isMobile ? "0.75rem 0.9rem" : "0.85rem 1.05rem",
            borderRadius: "0.85rem",
            border: "1px solid var(--input-border)",
            background: "var(--input-bg)",
            color: "var(--color-gray-900)",
            outline: "none",
            boxShadow: "var(--shadow-soft)",
            fontSize: isMobile ? "0.9rem" : "1rem",
        },
        filterButton: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: isMobile ? "0.75rem 1rem" : "0.85rem 1.2rem",
            minHeight: "44px",
            borderRadius: "0.9rem",
            border: isDarkTheme
                ? "1px solid rgba(14, 165, 233, 0.45)"
                : "1px solid color-mix(in srgb, var(--color-primary-300) 70%, transparent)",
            background: isDarkTheme
                ? "rgba(14, 165, 233, 0.15)"
                : "linear-gradient(120deg, color-mix(in srgb, var(--color-primary-100) 70%, var(--panel-bg)), color-mix(in srgb, var(--color-primary-200) 45%, var(--panel-bg)))",
            color: "var(--color-primary-700)",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: isDarkTheme
                ? "0 8px 24px -10px rgba(14, 165, 233, 0.5)"
                : "var(--shadow-soft)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            width: "fit-content",
            marginLeft: isMobile ? "auto" : undefined,
            fontSize: isMobile ? "0.9rem" : "1rem",
        },
        blankState: {
            padding: isMobile ? "1rem" : "1.25rem",
            borderRadius: "0.9rem",
            background:
                "color-mix(in srgb, var(--panel-bg) 86%, var(--color-white) 14%)",
            border: "1px dashed color-mix(in srgb, var(--input-border) 70%, transparent)",
            color: "var(--color-gray-600)",
            textAlign: "center",
            fontSize: isMobile ? "0.88rem" : "1rem",
        },
        distractionGrid: {
            display: "grid",
            gridTemplateColumns: width >= 1028 ? "repeat(3, 1fr)" : width >= 696 ? "repeat(2, 1fr)" : "1fr",
            gap: isMobile ? "0.85rem" : "1rem",
        },
        distractionCard: {
            borderRadius: isMobile ? "0.85rem" : "1rem",
            border: "1px solid color-mix(in srgb, var(--input-border) 65%, transparent)",
            background:
                "color-mix(in srgb, var(--panel-bg) 88%, var(--color-white) 12%)",
            boxShadow: "none",
            padding: isMobile ? "0.9rem" : "1.05rem",
            display: "grid",
            gap: "0.6rem",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
        },
        distractionMeta: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            flexWrap: isMobile ? "wrap" : "nowrap",
        },
        chip: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            padding: isMobile ? "0.25rem 0.6rem" : "0.3rem 0.7rem",
            borderRadius: "9999px",
            background: isDarkTheme
                ? "rgba(148, 163, 184, 0.12)"
                : "color-mix(in srgb, var(--color-gray-100) 65%, var(--panel-bg))",
            color: isDarkTheme ? "var(--color-gray-400)" : "var(--color-gray-700)",
            fontSize: isMobile ? "0.7rem" : "0.78rem",
            fontWeight: 600,
        },
        cardTimestamp: {
            fontSize: isMobile ? "0.75rem" : "0.8rem",
            color: "var(--color-gray-600)",
        },
        cardBody: {
            color: "var(--color-gray-900)",
            lineHeight: 1.6,
            fontSize: isMobile ? "0.88rem" : "1rem",
        },
        cardActions: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
        },
        deleteButton: {
            padding: isMobile ? "0.5rem 0.85rem" : "0.6rem 1rem",
            minHeight: "44px",
            borderRadius: "0.8rem",
            background: isDarkTheme
                ? "rgba(239, 68, 68, 0.12)"
                : "color-mix(in srgb, var(--color-red-50) 70%, var(--panel-bg))",
            color: isDarkTheme ? "#f87171" : "var(--color-red-600)",
            border: isDarkTheme
                ? "1px solid rgba(239, 68, 68, 0.3)"
                : "1px solid color-mix(in srgb, var(--color-red-500) 65%, transparent)",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "var(--shadow-soft)",
            fontSize: isMobile ? "0.85rem" : "1rem",
        },
        quickStatsGrid: {
            display: "grid",
            gap: isMobile ? "1rem" : "1.5rem",
            gridTemplateColumns: width >= 1240 ? "repeat(4, 1fr)" : width >= 696 ? "repeat(2, 1fr)" : "1fr",
        },
        quickStatCard: {
            background: isDarkTheme
                ? "var(--panel-bg)"
                : "rgba(255,255,255,0.7)",
            border: isDarkTheme
                ? "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)"
                : "1px solid rgba(255,255,255,0.3)",
            borderRadius: isMobile ? "1.15rem" : "1.5rem",
            padding: isMobile ? "1.15rem" : "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.45rem",
            boxShadow: isDarkTheme
                ? "none"
                : "0 20px 25px -5px rgba(59,130,246,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
            backdropFilter: isDarkTheme ? "none" : "blur(20px)",
            WebkitBackdropFilter: isDarkTheme ? "none" : "blur(20px)",
            position: "relative",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
        statHeaderRow: {
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "0.6rem" : "0.75rem",
        },
        statIconWrap: {
            width: isMobile ? "2.1rem" : "2.5rem",
            height: isMobile ? "2.1rem" : "2.5rem",
            borderRadius: "0.75rem",
            background: "rgba(59,130,246,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-primary-600)",
        },
        statLabel: {
            fontSize: isMobile ? "0.78rem" : "0.9rem",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "var(--color-gray-600)",
            fontWeight: 600,
            margin: 0,
        },
        statValue: {
            fontSize: isMobile ? "1.4rem" : "1.75rem",
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
            color: "var(--color-cyan-400)",
        },
        statDeltaNegative: {
            color: "var(--color-red-500)",
        },
        card: {
            background: isDarkTheme
                ? "var(--panel-bg)"
                : "rgba(255,255,255,0.8)",
            borderRadius: isMobile ? "1.15rem" : "1.5rem",
            border: isDarkTheme
                ? "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)"
                : "1px solid rgba(255,255,255,0.4)",
            boxShadow: isDarkTheme
                ? "none"
                : "0 25px 50px -12px rgba(59,130,246,0.15)",
            backdropFilter: isDarkTheme ? "none" : "blur(16px)",
            WebkitBackdropFilter: isDarkTheme ? "none" : "blur(16px)",
            position: "relative",
            overflow: "hidden",
        },
        activityCard: {
            padding: isMobile ? "1.25rem" : "1.75rem",
        },
        activityList: {
            display: "flex",
            flexDirection: "column",
        },
        activityItem: {
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "0.75rem" : "1rem",
            padding: isMobile ? "0.75rem 0" : "1rem 0",
        },
        activityIcon: {
            width: isMobile ? "2.4rem" : "3rem",
            height: isMobile ? "2.4rem" : "3rem",
            borderRadius: isMobile ? "0.75rem" : "1rem",
            background: isDarkTheme
                ? "rgba(59,130,246,0.18)"
                : "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(147,51,234,0.2))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isDarkTheme ? "var(--color-primary-600)" : "#4c1d95",
            boxShadow: isDarkTheme
                ? "none"
                : "0 10px 15px -3px rgba(59,130,246,0.1)",
            flexShrink: 0,
        },
        activityTitle: {
            fontSize: isMobile ? "0.9rem" : "1rem",
            fontWeight: 600,
            color: isDarkTheme ? "var(--color-gray-900)" : heroTextLight,
        },
        activityTime: {
            fontSize: isMobile ? "0.78rem" : "0.85rem",
            color: isDarkTheme
                ? "var(--color-gray-600)"
                : "color-mix(in srgb, #f8fafc 78%, rgba(226,232,240,0.6))",
        },
        focusPlanSection: {
            background: isDarkTheme
                ? "var(--panel-bg)"
                : "rgba(255,255,255,0.7)",
            borderRadius: isMobile ? "1.25rem" : "2rem",
            border: isDarkTheme
                ? "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)"
                : "1px solid rgba(255,255,255,0.4)",
            boxShadow: isDarkTheme
                ? "none"
                : "0 25px 50px -12px rgba(34,197,94,0.15)",
            padding: isMobile ? "1.5rem 1.25rem" : isTablet ? "2rem" : "3rem",
            display: "grid",
            gap: isMobile ? "1.5rem" : "2.5rem",
            backdropFilter: isDarkTheme ? "none" : "blur(16px)",
            WebkitBackdropFilter: isDarkTheme ? "none" : "blur(16px)",
            position: "relative",
        },
        focusPlanHeader: {
            display: "flex",
            justifyContent: "space-between",
            gap: isMobile ? "1rem" : "1.5rem",
            flexWrap: "wrap",
            alignItems: isMobile ? "flex-start" : "center",
            flexDirection: isMobile ? "column" : "row",
        },
        focusPlanGrid: {
            display: "grid",
            gridTemplateColumns: width >= 1028 ? "repeat(3, 1fr)" : width >= 696 ? "repeat(2, 1fr)" : "1fr",
            gap: isMobile ? "1rem" : "1.4rem",
        },
        focusPlanCard: {
            background:
                "linear-gradient(135deg, rgba(14,165,233,0.08), rgba(99,102,241,0.08))",
            border: "1px solid rgba(14,165,233,0.12)",
            borderRadius: isMobile ? "0.85rem" : "1rem",
            padding: isMobile ? "1.1rem" : "1.4rem",
            display: "grid",
            gap: "0.75rem",
        },
        focusPlanTime: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            fontSize: isMobile ? "0.82rem" : "0.9rem",
            fontWeight: 600,
            color: "var(--color-primary-700)",
        },
        focusPlanTitle: {
            fontSize: isMobile ? "0.98rem" : "1.1rem",
            fontWeight: 600,
            color: "var(--color-gray-900)",
        },
        focusPlanDescription: {
            fontSize: isMobile ? "0.85rem" : "0.95rem",
            lineHeight: 1.6,
            color: "var(--color-gray-600)",
        },
        focusPlanStatus: {
            justifySelf: "flex-start",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            borderRadius: "999px",
            padding: isMobile ? "0.3rem 0.65rem" : "0.35rem 0.75rem",
            fontSize: isMobile ? "0.72rem" : "0.8rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
        },
        focusPlanFooter: {
            display: "flex",
            justifyContent: width < 768 ? "center" : "space-between",
            alignItems: width < 768 ? "center" : "flex-end",
            flexDirection: width < 768 ? "column" : "row",
            gap: isMobile ? "1rem" : isTablet ? "1.25rem" : "2rem",
            paddingTop: isMobile ? "1rem" : "1.5rem",
            marginTop: isMobile ? "0.5rem" : "1rem",
            flexWrap: "wrap",
        },
        focusPlanFooterActions: {
            display: "flex",
            justifyContent: width < 768 ? "center" : "flex-end",
            alignItems: "center",
            flexWrap: "wrap",
            gap: isMobile ? "0.75rem" : "1rem",
            paddingTop: isMobile ? "0.5rem" : "1rem",
            width: width < 768 ? "100%" : "auto",
        },
        focusPlanFooterNote: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            fontSize: isMobile ? "0.82rem" : "0.9rem",
            color: "var(--color-gray-600)",
            textAlign: width < 768 ? "center" : "left",
            flexWrap: "wrap",
            justifyContent: width < 768 ? "center" : "flex-start",
        },
        focusPlanFooterAction: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "rgba(59,130,246,0.18)",
            color: "var(--color-primary-700)",
            border: "1px solid rgba(56,189,248,0.35)",
            borderRadius: "999px",
            padding: isMobile ? "0.45rem 0.9rem" : "0.55rem 1.1rem",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: isMobile ? "0.85rem" : "1rem",
            whiteSpace: "nowrap",
        },
        companionSection: {
            background: isDarkTheme
                ? "var(--panel-bg)"
                : "rgba(255,255,255,0.6)",
            borderRadius: isMobile ? "1.25rem" : "2rem",
            border: isDarkTheme
                ? "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)"
                : "1px solid rgba(255,255,255,0.3)",
            boxShadow: isDarkTheme
                ? "none"
                : "0 25px 50px -12px rgba(139,92,246,0.2)",
            padding: isMobile ? "1.5rem 1.25rem" : isTablet ? "2rem" : "3rem",
            display: "grid",
            gap: isMobile ? "1.25rem" : "2rem",
            backdropFilter: isDarkTheme ? "none" : "blur(20px)",
            WebkitBackdropFilter: isDarkTheme ? "none" : "blur(20px)",
            position: "relative",
        },
        companionHeader: {
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "0.4rem" : "0.55rem",
            maxWidth: "40rem",
        },
        companionGrid: {
            display: "grid",
            gridTemplateColumns: width >= 1035 ? "repeat(3, 1fr)" : width >= 580 ? "repeat(2, 1fr)" : "1fr",
            gap: isMobile ? "0.9rem" : "1.3rem",
        },
        companionCard: {
            borderRadius: isMobile ? "0.9rem" : "1.1rem",
            border: "1px solid color-mix(in srgb, rgba(59,130,246,0.12) 95%, black 5%)",
            background:
                "linear-gradient(130deg, rgba(59,130,246,0.12), rgba(14,165,233,0.1))",
            boxShadow: "0 26px 64px -48px rgba(15,23,42,0.45)",
            padding: isMobile ? "1.15rem" : "1.55rem",
            display: "grid",
            gap: isMobile ? "0.75rem" : "0.95rem",
        },
        companionIcon: {
            width: isMobile ? "2.2rem" : "2.6rem",
            height: isMobile ? "2.2rem" : "2.6rem",
            borderRadius: "0.85rem",
            background: "rgba(59,130,246,0.18)",
            color: "var(--color-primary-700)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
        },
        companionHeaderRow: {
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "0.65rem" : "0.85rem",
        },
        companionTitle: {
            fontSize: isMobile ? "0.98rem" : "1.1rem",
            fontWeight: 600,
            color: "var(--color-gray-900)",
            margin: 0,
        },
        companionDescription: {
            fontSize: isMobile ? "0.85rem" : "0.95rem",
            lineHeight: 1.6,
            color: "var(--color-gray-600)",
        },
        companionButton: {
            justifySelf: "center",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            padding: isMobile ? "0.5rem 1rem" : "0.6rem 1.2rem",
            borderRadius: "0.9rem",
            border: "1px solid rgba(59,130,246,0.35)",
            background: "rgba(59,130,246,0.15)",
            color: "var(--color-primary-700)",
            fontWeight: 600,
            cursor: "pointer",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            boxShadow: "0 18px 42px -30px rgba(56,189,248,0.45)",
            fontSize: isMobile ? "0.85rem" : "1rem",
        },
        focusPlanAccent: {
            position: "absolute",
            inset: "auto -16px -16px auto",
            width: isMobile ? "120px" : "180px",
            height: isMobile ? "120px" : "180px",
            background:
                "radial-gradient(circle at center, rgba(59,130,246,0.22), transparent 65%)",
            pointerEvents: "none",
            zIndex: 0,
        },
        momentumGrid: {
            display: "grid",
            gridTemplateColumns: width >= 1040 ? "repeat(3, 1fr)" : width >= 600 ? "repeat(2, 1fr)" : "1fr",
            gap: isMobile ? "1rem" : "1.4rem",
        },
        momentumCard: {
            background: isDarkTheme
                ? "var(--panel-bg)"
                : "rgba(255,255,255,0.75)",
            border: isDarkTheme
                ? "1px solid color-mix(in srgb, var(--panel-bg) 92%, black 8%)"
                : "1px solid rgba(255,255,255,0.35)",
            borderRadius: isMobile ? "1.25rem" : "1.75rem",
            padding: isMobile ? "1.5rem" : "2.25rem",
            display: "grid",
            gap: isMobile ? "1rem" : "1.5rem",
            boxShadow: isDarkTheme
                ? "none"
                : "0 25px 50px -12px rgba(99,102,241,0.15)",
            backdropFilter: isDarkTheme ? "none" : "blur(20px)",
            WebkitBackdropFilter: isDarkTheme ? "none" : "blur(20px)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            overflow: "hidden",
        },
        momentumHeader: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: isMobile ? "wrap" : "nowrap",
            gap: isMobile ? "0.5rem" : "0",
        },
        momentumTitle: {
            fontSize: isMobile ? "0.98rem" : "1.1rem",
            fontWeight: 600,
            color: isDarkTheme ? "var(--color-gray-900)" : "#0f172a",
            margin: 0,
        },
        momentumTitleRow: {
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "0.65rem" : "0.85rem",
        },
        momentumDescription: {
            fontSize: isMobile ? "0.85rem" : "0.95rem",
            lineHeight: 1.7,
            color: isDarkTheme
                ? "var(--color-gray-600)"
                : "color-mix(in srgb, #0f172a 70%, rgba(15,23,42,0.45))",
        },
        momentumTrend: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: isMobile ? "0.8rem" : "0.88rem",
            fontWeight: 600,
        },
        momentumTrendPositive: {
            color: isDarkTheme ? "var(--color-primary-600)" : "#0f172a",
        },
        momentumTrendNegative: {
            color: "#f87171",
        },
        momentumAction: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontWeight: 600,
            fontSize: isMobile ? "0.82rem" : "0.9rem",
            color: "var(--color-primary-600)",
        },
    };

    const dashboardTabs = [
        { key: "overview", label: "Overview" },
        { key: "sessions", label: "Sessions" },
        { key: "achievements", label: "Achievements" },
        { key: "distractions", label: "Distractions" },
    ];

    const quickStatCards = [
        {
            title: "Today's focus time",
            value: summaryStats.todayFocusMinutes > 60
                ? `${Math.floor(summaryStats.todayFocusMinutes / 60)}h ${summaryStats.todayFocusMinutes % 60}m`
                : `${summaryStats.todayFocusMinutes}m`,
            delta: "+15% vs yesterday",
            trend: "up",
            icon: ClockIcon,
        },
        {
            title: "Completed sessions",
            value: summaryStats.completedSessionsCount.toString(),
            delta: "+2 vs yesterday",
            trend: "up",
            icon: CheckCircleIcon,
        },
        {
            title: "Productivity score",
            value: `${summaryStats.productivityScore}%`,
            delta: "+5% vs yesterday",
            trend: "up",
            icon: TrophyIcon,
        },
        {
            title: "Current streak",
            value: `${summaryStats.currentStreak} day${summaryStats.currentStreak !== 1 ? 's' : ''}`,
            delta: summaryStats.currentStreak > 0 ? "Keep it up!" : "Start today!",
            trend: "up",
            icon: FireIcon,
        },
    ];

    const companionTools = [
        {
            title: "Focus music",
            description:
                "Launch curated ambient mixes that keep deep work immersive without hijacking attention.",
            Icon: MusicalNoteIcon,
            cta: "Play mix",
        },
        {
            title: "Smart nudges",
            description:
                "Gentle prompts surface only when a block is ending or a break is overdue.",
            Icon: BellAlertIcon,
            cta: "Enable nudges",
        },
        {
            title: "Session analytics",
            description:
                "Watch streaks, averages, and focus/break balance update in real time.",
            Icon: ChartBarIcon,
            cta: "View dashboard",
        },
        {
            title: "Quick adjustments",
            description:
                "Tweak durations or auto-start behaviour mid-cycle without losing momentum.",
            Icon: Cog6ToothIcon,
            cta: "Open presets",
        },
    ];

    // activityFeed is now dynamic state

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
            status: "completed",
        },
        {
            time: "10:00",
            title: "Deep work block",
            description:
                "90-minute focus session dedicated to the highest-impact objective.",
            status: "in-progress",
        },
        {
            time: "15:45",
            title: "Shutdown ritual",
            description:
                "Document key wins, queue next steps, and clear the workspace.",
            status: "scheduled",
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

    const heroBadges = [
        "Daily focus lab",
        "Community streaks",
        "Offline-ready rituals",
    ];

    const momentumHighlights = [
        {
            title: "Streak momentum",
            description: summaryStats.currentStreak > 0
                ? `You're ${summaryStats.currentStreak} day${summaryStats.currentStreak !== 1 ? 's' : ''} into a focus streak. Protect the streak today!`
                : "No active streak today. Complete a focus session to start one!",
            trend: {
                direction: "up",
                label: summaryStats.currentStreak > 0 ? "+15% consistency" : "New start",
            },
            icon: FireIcon,
        },
        {
            title: "Break quality",
            description: "You're maintaining a healthy balance between focus sessions and recovery breaks today.",
            trend: {
                direction: "up",
                label: "Optimal range",
            },
            icon: ClockIcon,
        },
        {
            title: "Productivity level",
            description: summaryStats.productivityScore > 75
                ? "Your output is peak today! Maintain this rhythm for maximum impact."
                : "Focus on single-tasking to boost your productivity score.",
            trend: {
                direction: summaryStats.productivityScore > 50 ? "up" : "down",
                label: `${summaryStats.productivityScore}% efficiency`,
            },
            icon: BellAlertIcon,
        },
    ];
    // Notification component
    const Notification = ({ message, type }) => {
        if (!message) return null;

        const notificationStyles = {
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "1rem 1.5rem",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 10000,
            maxWidth: "400px",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            background: type === "warning" ? "#fef3c7" : "#dbeafe",
            border: `1px solid ${type === "warning" ? "#f59e0b" : "#3b82f6"}`,
            color: type === "warning" ? "#92400e" : "#1e40af",
            transform: "translateY(0)",
            transition: "transform 0.3s ease, opacity 0.3s ease",
        };

        return (
            <div style={notificationStyles}>
                <div>
                    {type === "warning" ? (
                        <BellAlertIcon
                            style={{ width: "1.5rem", height: "1.5rem" }}
                        />
                    ) : (
                        <ChartBarIcon
                            style={{ width: "1.5rem", height: "1.5rem" }}
                        />
                    )}
                </div>
                <div>{message}</div>
            </div>
        );
    };

    return (
        <div style={dashboardStyles.wrapper}>
            {/* Global Styles - Light Mode Only */}
            {!isDarkTheme && (
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-10px) translateX(-15px); }
            75% { transform: translateY(-30px) translateX(5px); }
          }

          @keyframes shimmer {
            0% { left: -100%; }
            50%, 100% { left: 100%; }
          }

          @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          @keyframes pulse-glow {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
          }

          .floating-orb {
            animation: float 6s ease-in-out infinite;
          }

          .floating-orb:nth-child(2) {
            animation: float 8s ease-in-out infinite reverse;
            animation-delay: -2s;
          }

          .floating-orb:nth-child(3) {
            animation: float 7s ease-in-out infinite;
            animation-delay: -4s;
          }
        `,
                    }}
                />
            )}

            {/* Floating Background Orbs - Light Mode Only */}
            {!isDarkTheme && (
                <>
                    <div
                        className="floating-orb"
                        style={{
                            position: "absolute",
                            top: "10%",
                            left: "5%",
                            width: "300px",
                            height: "300px",
                            background:
                                "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(147,51,234,0.1))",
                            borderRadius: "50%",
                            filter: "blur(40px)",
                            zIndex: 0,
                        }}
                    />
                    <div
                        className="floating-orb"
                        style={{
                            position: "absolute",
                            top: "60%",
                            right: "10%",
                            width: "250px",
                            height: "250px",
                            background:
                                "linear-gradient(135deg, rgba(34,197,94,0.12), rgba(59,130,246,0.1))",
                            borderRadius: "50%",
                            filter: "blur(40px)",
                            zIndex: 0,
                        }}
                    />
                    <div
                        className="floating-orb"
                        style={{
                            position: "absolute",
                            top: "30%",
                            right: "20%",
                            width: "180px",
                            height: "180px",
                            background:
                                "linear-gradient(135deg, rgba(236,72,153,0.1), rgba(59,130,246,0.08))",
                            borderRadius: "50%",
                            filter: "blur(30px)",
                            zIndex: 0,
                        }}
                    />

                    {/* Additional Mesh Gradient Background */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `
                radial-gradient(circle at 25% 25%, rgba(99,102,241,0.05) 0%, transparent 70%),
                radial-gradient(circle at 75% 75%, rgba(34,197,94,0.05) 0%, transparent 70%),
                radial-gradient(circle at 75% 25%, rgba(236,72,153,0.05) 0%, transparent 70%),
                radial-gradient(circle at 25% 75%, rgba(59,130,246,0.05) 0%, transparent 70%)
              `,
                            animation: "gradient-shift 20s ease infinite",
                            backgroundSize: "200% 200%",
                            zIndex: 0,
                        }}
                    />
                </>
            )}
            <Notification
                message={notification?.message}
                type={notification?.type}
            />
            <div
                style={{
                    ...dashboardStyles.inner,
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <section style={dashboardStyles.hero}>
                    {/* Hero Background Pattern - Light Mode Only */}
                    {!isDarkTheme && (
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                opacity: 0.1,
                                background: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%),
                          radial-gradient(circle at 40% 80%, rgba(255,255,255,0.25) 0%, transparent 50%)`,
                                borderRadius: "inherit",
                            }}
                        />
                    )}
                    <div style={{ position: "relative", zIndex: 2 }}>
                        <h1
                            style={{
                                ...dashboardStyles.heroTitle,
                                marginBottom: "1.5rem",
                            }}
                        >
                            {displayName ? (
                                <>
                                    Welcome back,{" "}
                                    <span style={dashboardStyles.heroAccent}>
                                        {displayName}
                                    </span>
                                </>
                            ) : (
                                <>
                                    Welcome back,{" "}
                                    <span style={dashboardStyles.heroAccent}>
                                        your focus lab awaits
                                    </span>
                                </>
                            )}
                        </h1>
                        <p style={dashboardStyles.heroLead}>
                            Shape your day with calibrated sessions, mindful
                            breaks, and community accountability—everything you
                            need to keep momentum compounding.
                        </p>
                    </div>
                    <div style={dashboardStyles.heroActions}>
                        <button
                            style={dashboardStyles.primaryButton}
                            onClick={() => navigate("/focus-timer")}
                        >
                            <PlayIcon
                                style={{ width: "1.2rem", height: "1.2rem" }}
                            />
                            Start focus session
                        </button>
                        <button
                            style={dashboardStyles.secondaryButton}
                            onClick={() => {
                                setActiveTab("distractions");
                                setTimeout(() => {
                                    const tabBar =
                                        document.getElementById(
                                            "dashboard-tab-bar"
                                        );
                                    if (tabBar) {
                                        tabBar.scrollIntoView({
                                            behavior: "smooth",
                                            block: "start",
                                        });
                                    }
                                }, 100);
                            }}
                        >
                            <PlusIcon
                                style={{ width: "1.2rem", height: "1.2rem" }}
                            />
                            Log distraction
                        </button>
                    </div>
                    <div style={dashboardStyles.heroBadgeRow}>
                        {heroBadges.map((badge) => (
                            <span
                                key={badge}
                                style={dashboardStyles.actionChip}
                            >
                                {badge}
                            </span>
                        ))}
                    </div>
                </section>

                {/* <section style={dashboardStyles.companionSection}>
                    <div style={dashboardStyles.companionHeader}>
                        <h2 style={dashboardStyles.sectionTitle}>Companion tools</h2>
                        <p style={dashboardStyles.sectionLead}>
                            Spin up supportive helpers in a tap—from vibe-setting playlists to analytics that keep habits sharp.
                        </p>
                    </div>
                    <div style={dashboardStyles.companionGrid}>
                        {companionTools.map((tool) => {
                            const ToolIcon = tool.Icon;
                            return (
                                <article key={tool.title} style={dashboardStyles.companionCard}>
                                    <div style={dashboardStyles.companionIcon}>
                                        <ToolIcon style={{ width: "1.25rem", height: "1.25rem" }} />
                                    </div>
                                    <h3 style={dashboardStyles.companionTitle}>{tool.title}</h3>
                                    <p style={dashboardStyles.companionDescription}>{tool.description}</p>
                                    <button
                                        type="button"
                                        style={dashboardStyles.companionButton}
                                        onClick={() => setActiveTab("timers")}
                                        onMouseEnter={(event) =>
                                            Object.assign(event.currentTarget.style, {
                                                transform: "translateY(-3px)",
                                                boxShadow: "0 26px 56px -32px rgba(59,130,246,0.5)",
                                            })
                                        }
                                        onMouseLeave={(event) =>
                                            Object.assign(event.currentTarget.style, dashboardStyles.companionButton)
                                        }
                                    >
                                        <ChevronRightIcon style={{ width: "1rem", height: "1rem" }} />
                                        {tool.cta}
                                    </button>
                                </article>
                            );
                        })}
                    </div>
                </section> */}

                <section style={dashboardStyles.companionSection}>
                    <div style={dashboardStyles.companionHeader}>
                        <h2 style={dashboardStyles.sectionTitle}>
                            🕯 Relax Before You Focus
                        </h2>
                        <p style={dashboardStyles.sectionLead}>
                            Take a mindful moment to prepare your mind and body
                            for deep, focused work. Choose an activity that
                            helps you transition into a calm, productive state.
                        </p>
                    </div>
                    <div style={dashboardStyles.companionGrid}>
                        {[
                            {
                                title: "Soundscapes",
                                description:
                                    "Launch curated ambient mixes that keep deep work immersive without hijacking attention.",
                                Icon: MusicalNoteIcon,
                                modal: "music",
                            },
                            {
                                title: "Mini Meditation",
                                description:
                                    "Gentle prompts to center yourself and bring clarity before starting your session.",
                                Icon: SparklesIcon,
                                modal: "meditation",
                            },
                            {
                                title: "Thought Dump",
                                description:
                                    "Clear mental clutter by writing down lingering thoughts and worries.",
                                Icon: PencilSquareIcon,
                                modal: "thoughtDump",
                            },
                            {
                                title: "Calming Game",
                                description:
                                    "Gently engage your mind with soothing interactive experiences.",
                                Icon: Cog6ToothIcon,
                                modal: "calmingGame",
                            },
                            {
                                title: "Doodle Pad",
                                description:
                                    "Express yourself freely on a simple drawing canvas to relax and unwind.",
                                Icon: PaintBrushIcon,
                                modal: "doodlePad",
                            },
                            {
                                title: "Affirmations",
                                description:
                                    "Read positive intentions and affirmations to boost confidence and focus.",
                                Icon: SparklesIcon,
                                modal: "affirmations",
                            },
                        ].map((activity) => {
                            const ActivityIcon = activity.Icon;
                            const routeMap = {
                                music: "/relaxation/music",
                                meditation: "/relaxation/meditation",
                                thoughtDump: "/relaxation/thought-dump",
                                calmingGame: "/relaxation/calming-game",
                                doodlePad: "/relaxation/doodle-pad",
                                affirmations: "/relaxation/affirmations",
                            };
                            return (
                                <article
                                    key={activity.title}
                                    style={{
                                        ...dashboardStyles.companionCard,
                                        ...(isDarkTheme
                                            ? {}
                                            : {
                                                background:
                                                    "rgba(255,255,255,0.7)",
                                                position: "relative",
                                                overflow: "hidden",
                                                transform: "translateY(0)",
                                                transition:
                                                    "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                            }),
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isDarkTheme) {
                                            e.currentTarget.style.transform =
                                                "translateY(-10px) scale(1.03)";
                                            e.currentTarget.style.boxShadow =
                                                "0 35px 70px -15px rgba(139,92,246,0.35)";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isDarkTheme) {
                                            e.currentTarget.style.transform =
                                                "translateY(0) scale(1)";
                                            e.currentTarget.style.boxShadow =
                                                "0 25px 50px -12px rgba(139,92,246,0.2)";
                                        }
                                    }}
                                >
                                    {/* Companion Card Shimmer - Light Mode Only */}
                                    {!isDarkTheme && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: "-100%",
                                                width: "100%",
                                                height: "100%",
                                                background:
                                                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                                                animation:
                                                    "shimmer 4s infinite",
                                                animationDelay: `${Math.random() * 2
                                                    }s`,
                                                zIndex: 1,
                                                borderRadius: "inherit",
                                            }}
                                        />
                                    )}
                                    <div style={dashboardStyles.companionHeaderRow}>
                                        <div style={dashboardStyles.companionIcon}>
                                            <ActivityIcon
                                                style={{
                                                    width: "1.25rem",
                                                    height: "1.25rem",
                                                }}
                                            />
                                        </div>
                                        <h3 style={dashboardStyles.companionTitle}>
                                            {activity.title}
                                        </h3>
                                    </div>
                                    <p
                                        style={
                                            dashboardStyles.companionDescription
                                        }
                                    >
                                        {activity.description}
                                    </p>
                                    <button
                                        type="button"
                                        style={dashboardStyles.companionButton}
                                        onClick={() =>
                                            handleOpenRelaxationModal(
                                                activity.modal
                                            )
                                        }
                                        onMouseEnter={(event) =>
                                            Object.assign(
                                                event.currentTarget.style,
                                                {
                                                    transform:
                                                        "translateY(-3px)",
                                                    boxShadow:
                                                        "0 26px 56px -32px rgba(59,130,246,0.5)",
                                                }
                                            )
                                        }
                                        onMouseLeave={(event) =>
                                            Object.assign(
                                                event.currentTarget.style,
                                                dashboardStyles.companionButton
                                            )
                                        }
                                    >
                                        <ChevronRightIcon
                                            style={{
                                                width: "1rem",
                                                height: "1rem",
                                            }}
                                        />
                                        Try it
                                    </button>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <div style={dashboardStyles.tabBar} id="dashboard-tab-bar">
                    {dashboardTabs.map((tab) => (
                        <button
                            key={tab.key}
                            style={
                                activeTab === tab.key
                                    ? {
                                        ...dashboardStyles.tab,
                                        ...dashboardStyles.tabActive,
                                    }
                                    : dashboardStyles.tab
                            }
                            onClick={() => {
                                setActiveTab(tab.key);
                                // Scroll to top of tab content
                                setTimeout(() => {
                                    const tabBar =
                                        document.getElementById(
                                            "dashboard-tab-bar"
                                        );
                                    if (tabBar) {
                                        tabBar.scrollIntoView({
                                            behavior: "smooth",
                                            block: "start",
                                        });
                                    }
                                }, 50);
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {activeTab === "overview" && (
                    <>
                        <section style={dashboardStyles.section}>
                            {/* Activity Card Pattern - Light Mode Only */}
                            {!isDarkTheme && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "-50%",
                                        right: "-20%",
                                        width: "200px",
                                        height: "200px",
                                        background:
                                            "linear-gradient(135deg, rgba(34,197,94,0.05), rgba(59,130,246,0.03))",
                                        borderRadius: "50%",
                                        filter: "blur(20px)",
                                    }}
                                />
                            )}
                            <header
                                style={{
                                    ...dashboardStyles.sectionHeader,
                                    position: "relative",
                                    zIndex: 2,
                                }}
                            >
                                <h2 style={dashboardStyles.sectionTitle}>
                                    {sectionIntro.snapshot.title}
                                </h2>
                                <p style={dashboardStyles.sectionLead}>
                                    {sectionIntro.snapshot.lead}
                                </p>
                            </header>
                            <div style={dashboardStyles.quickStatsGrid}>
                                {quickStatCards.map((card, index) => {
                                    const Icon = card.icon;
                                    const TrendIcon =
                                        card.trend === "down"
                                            ? ArrowTrendingDownIcon
                                            : ArrowTrendingUpIcon;
                                    const deltaStyle = {
                                        ...dashboardStyles.statDelta,
                                        ...(card.trend === "down"
                                            ? dashboardStyles.statDeltaNegative
                                            : dashboardStyles.statDeltaPositive),
                                    };
                                    return (
                                        <div
                                            key={card.title}
                                            style={{
                                                ...dashboardStyles.quickStatCard,
                                                ...(isDarkTheme
                                                    ? {}
                                                    : {
                                                        background: `linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 100%)`,
                                                        transform:
                                                            "translateY(0)",
                                                        transition:
                                                            "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                                    }),
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isDarkTheme) {
                                                    e.currentTarget.style.transform =
                                                        "translateY(-8px) scale(1.02)";
                                                    e.currentTarget.style.boxShadow =
                                                        "0 32px 64px -12px rgba(59,130,246,0.25)";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isDarkTheme) {
                                                    e.currentTarget.style.transform =
                                                        "translateY(0) scale(1)";
                                                    e.currentTarget.style.boxShadow =
                                                        "0 20px 25px -5px rgba(59,130,246,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)";
                                                }
                                            }}
                                        >
                                            {/* Card Accent - Light Mode Only */}
                                            {!isDarkTheme && (
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        height: "4px",
                                                        background: `linear-gradient(90deg,
                            ${index === 0
                                                                ? "#06b6d4, #3b82f6"
                                                                : index === 1
                                                                    ? "#10b981, #059669"
                                                                    : index === 2
                                                                        ? "#8b5cf6, #7c3aed"
                                                                        : "#f59e0b, #d97706"
                                                            })`,
                                                        borderRadius:
                                                            "1.5rem 1.5rem 0 0",
                                                    }}
                                                />
                                            )}
                                            <div style={dashboardStyles.statHeaderRow}>
                                                <div
                                                    style={
                                                        dashboardStyles.statIconWrap
                                                    }
                                                >
                                                    <Icon
                                                        style={{
                                                            width: "1.4rem",
                                                            height: "1.4rem",
                                                        }}
                                                    />
                                                </div>
                                                <span
                                                    style={
                                                        dashboardStyles.statLabel
                                                    }
                                                >
                                                    {card.title}
                                                </span>
                                            </div>
                                            <span
                                                style={
                                                    dashboardStyles.statValue
                                                }
                                            >
                                                {card.value}
                                            </span>
                                            <span style={deltaStyle}>
                                                <TrendIcon
                                                    style={{
                                                        width: "1rem",
                                                        height: "1rem",
                                                    }}
                                                />
                                                {card.delta}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        <section
                            style={{
                                ...dashboardStyles.section,
                                ...dashboardStyles.card,
                                ...dashboardStyles.activityCard,
                                ...(isDarkTheme
                                    ? {}
                                    : {
                                        background: "rgba(255,255,255,0.85)",
                                        position: "relative",
                                        overflow: "hidden",
                                    }),
                            }}
                        >
                            {/* Activity Section Glow - Light Mode Only */}
                            {!isDarkTheme && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        width: "60%",
                                        height: "60%",
                                        background:
                                            "radial-gradient(ellipse, rgba(34,197,94,0.08) 0%, transparent 70%)",
                                        borderRadius: "50%",
                                        animation:
                                            "pulse-glow 4s ease-in-out infinite",
                                        zIndex: 0,
                                    }}
                                />
                            )}
                            <header
                                style={{
                                    ...dashboardStyles.sectionHeader,
                                    position: "relative",
                                    zIndex: 1,
                                }}
                            >
                                <h2 style={dashboardStyles.sectionTitle}>
                                    {sectionIntro.activity.title}
                                </h2>
                                <p style={dashboardStyles.sectionLead}>
                                    {sectionIntro.activity.lead}
                                </p>
                            </header>
                            <div style={dashboardStyles.activityList}>
                                {activityFeed.length === 0 ? (
                                    <div style={dashboardStyles.blankState}>
                                        No recent activity yet. Complete a focus session or log a distraction to see your activity here.
                                    </div>
                                ) : (
                                    activityFeed.map((activity, idx) => {
                                        const Icon = activity.icon;
                                        return (
                                            <div
                                                key={`${activity.description}-${idx}`}
                                                style={{
                                                    ...dashboardStyles.activityItem,
                                                    borderBottom:
                                                        idx ===
                                                            activityFeed.length - 1
                                                            ? "none"
                                                            : dashboardStyles
                                                                .activityItem
                                                                .borderBottom,
                                                }}
                                            >
                                                <div
                                                    style={
                                                        dashboardStyles.activityIcon
                                                    }
                                                >
                                                    <Icon
                                                        style={{
                                                            width: "1.2rem",
                                                            height: "1.2rem",
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <div
                                                        style={
                                                            dashboardStyles.activityTitle
                                                        }
                                                    >
                                                        {activity.description}
                                                    </div>
                                                    <div
                                                        style={
                                                            dashboardStyles.activityTime
                                                        }
                                                    >
                                                        {activity.time}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </section>

                        <section style={dashboardStyles.focusPlanSection}>
                            <div style={dashboardStyles.focusPlanHeader}>
                                <div style={dashboardStyles.sectionHeader}>
                                    <h2 style={dashboardStyles.sectionTitle}>
                                        {sectionIntro.focusPlan.title}
                                    </h2>
                                    <p style={dashboardStyles.sectionLead}>
                                        {sectionIntro.focusPlan.lead}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    style={dashboardStyles.actionChip}
                                    onClick={() => setShowWeeklyPlanner(true)}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform =
                                            "scale(1.05)";
                                        e.currentTarget.style.cursor =
                                            "pointer";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform =
                                            "scale(1)";
                                    }}
                                >
                                    <CalendarIcon
                                        style={{
                                            width: "1.05rem",
                                            height: "1.05rem",
                                        }}
                                    />
                                    View weekly planner
                                </button>
                            </div>
                            <div style={dashboardStyles.focusPlanGrid}>
                                {dailyFocusPlanItems.map((step, idx) => {
                                    const statusTheme =
                                        planStatusStyles[step.status] ||
                                        planStatusStyles.scheduled;
                                    const isEditingThis =
                                        editingBufferBlock === idx;
                                    const isBufferBlock =
                                        step.title === "Buffer block";
                                    return (
                                        <article
                                            key={step.time}
                                            style={{
                                                ...dashboardStyles.focusPlanCard,
                                                position: "relative",
                                            }}
                                        >
                                            {isBufferBlock && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setDailyFocusPlanItems(
                                                            dailyFocusPlanItems.filter(
                                                                (_, i) =>
                                                                    i !== idx
                                                            )
                                                        );
                                                        setEditingBufferBlock(
                                                            null
                                                        );
                                                    }}
                                                    style={{
                                                        position: "absolute",
                                                        top: "0.5rem",
                                                        right: "0.5rem",
                                                        background:
                                                            "rgba(239, 68, 68, 0.15)",
                                                        border: "1px solid rgba(239, 68, 68, 0.3)",
                                                        color: "#dc2626",
                                                        borderRadius: "0.5rem",
                                                        padding:
                                                            "0.3rem 0.6rem",
                                                        fontSize: "0.75rem",
                                                        fontWeight: 600,
                                                        cursor: "pointer",
                                                        transition:
                                                            "all 0.2s ease",
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.background =
                                                            "rgba(239, 68, 68, 0.25)";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.background =
                                                            "rgba(239, 68, 68, 0.15)";
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                            <span
                                                style={
                                                    dashboardStyles.focusPlanTime
                                                }
                                            >
                                                <ClockIcon
                                                    style={{
                                                        width: "0.95rem",
                                                        height: "0.95rem",
                                                    }}
                                                />
                                                {step.time}
                                            </span>
                                            <h3
                                                style={{
                                                    ...dashboardStyles.focusPlanTitle,
                                                    cursor: isBufferBlock
                                                        ? "pointer"
                                                        : "default",
                                                }}
                                                onClick={() => {
                                                    if (isBufferBlock) {
                                                        if (isEditingThis) {
                                                            // Save changes
                                                            const updated = [
                                                                ...dailyFocusPlanItems,
                                                            ];
                                                            updated[idx].title =
                                                                editingBufferText ||
                                                                "Buffer block";
                                                            setDailyFocusPlanItems(
                                                                updated
                                                            );
                                                            setEditingBufferBlock(
                                                                null
                                                            );
                                                        } else {
                                                            // Start editing
                                                            setEditingBufferBlock(
                                                                idx
                                                            );
                                                            setEditingBufferText(
                                                                step.title
                                                            );
                                                        }
                                                    }
                                                }}
                                            >
                                                {isEditingThis ? (
                                                    <input
                                                        type="text"
                                                        value={
                                                            editingBufferText
                                                        }
                                                        onChange={(e) =>
                                                            setEditingBufferText(
                                                                e.target.value
                                                            )
                                                        }
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                        onKeyDown={(e) => {
                                                            if (
                                                                e.key ===
                                                                "Enter"
                                                            ) {
                                                                const updated =
                                                                    [
                                                                        ...dailyFocusPlanItems,
                                                                    ];
                                                                updated[
                                                                    idx
                                                                ].title =
                                                                    editingBufferText ||
                                                                    "Buffer block";
                                                                setDailyFocusPlanItems(
                                                                    updated
                                                                );
                                                                setEditingBufferBlock(
                                                                    null
                                                                );
                                                            } else if (
                                                                e.key ===
                                                                "Escape"
                                                            ) {
                                                                setEditingBufferBlock(
                                                                    null
                                                                );
                                                            }
                                                        }}
                                                        autoFocus
                                                        style={{
                                                            fontSize: "1.1rem",
                                                            fontWeight: 600,
                                                            color: "var(--color-gray-900)",
                                                            border: "1px solid var(--color-primary-400)",
                                                            borderRadius:
                                                                "0.4rem",
                                                            padding:
                                                                "0.3rem 0.5rem",
                                                            outline: "none",
                                                            background:
                                                                "var(--input-bg)",
                                                            width: "100%",
                                                            boxShadow:
                                                                "0 0 0 2px rgba(56, 189, 248, 0.2)",
                                                        }}
                                                    />
                                                ) : (
                                                    step.title
                                                )}
                                            </h3>
                                            <p
                                                style={{
                                                    ...dashboardStyles.focusPlanDescription,
                                                    cursor: isBufferBlock
                                                        ? "pointer"
                                                        : "default",
                                                }}
                                                onClick={() => {
                                                    if (isBufferBlock) {
                                                        if (isEditingThis) {
                                                            // Save changes
                                                            const updated = [
                                                                ...dailyFocusPlanItems,
                                                            ];
                                                            updated[
                                                                idx
                                                            ].description =
                                                                editingBufferText ||
                                                                "Flexible time for overflow or catch-up.";
                                                            setDailyFocusPlanItems(
                                                                updated
                                                            );
                                                            setEditingBufferBlock(
                                                                null
                                                            );
                                                        } else {
                                                            // Start editing
                                                            setEditingBufferBlock(
                                                                idx
                                                            );
                                                            setEditingBufferText(
                                                                step.description
                                                            );
                                                        }
                                                    }
                                                }}
                                            >
                                                {isEditingThis ? (
                                                    <textarea
                                                        value={
                                                            editingBufferText
                                                        }
                                                        onChange={(e) =>
                                                            setEditingBufferText(
                                                                e.target.value
                                                            )
                                                        }
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                        onKeyDown={(e) => {
                                                            if (
                                                                e.key ===
                                                                "Escape"
                                                            ) {
                                                                setEditingBufferBlock(
                                                                    null
                                                                );
                                                            }
                                                        }}
                                                        autoFocus
                                                        style={{
                                                            fontSize: "0.95rem",
                                                            lineHeight: 1.6,
                                                            color: "var(--color-gray-600)",
                                                            border: "1px solid var(--color-primary-400)",
                                                            borderRadius:
                                                                "0.4rem",
                                                            padding:
                                                                "0.4rem 0.5rem",
                                                            outline: "none",
                                                            background:
                                                                "var(--input-bg)",
                                                            width: "100%",
                                                            minHeight: "60px",
                                                            resize: "vertical",
                                                            fontFamily:
                                                                "inherit",
                                                            boxShadow:
                                                                "0 0 0 2px rgba(56, 189, 248, 0.2)",
                                                        }}
                                                    />
                                                ) : (
                                                    step.description
                                                )}
                                            </p>
                                            <span
                                                style={{
                                                    ...dashboardStyles.focusPlanStatus,
                                                    background:
                                                        statusTheme.background,
                                                    color: statusTheme.color,
                                                }}
                                            >
                                                {statusTheme.label}
                                            </span>
                                        </article>
                                    );
                                })}
                            </div>
                            <div style={dashboardStyles.focusPlanFooter}>
                                <span
                                    style={dashboardStyles.focusPlanFooterNote}
                                >
                                    <ChartBarIcon
                                        style={{
                                            width: "0.95rem",
                                            height: "0.95rem",
                                        }}
                                    />
                                    Auto-syncs with presets and distraction logs
                                </span>
                                <button
                                    type="button"
                                    style={
                                        dashboardStyles.focusPlanFooterAction
                                    }
                                    onClick={() => {
                                        const newBlock = {
                                            time: new Date(
                                                Date.now() + 3600000
                                            ).toLocaleTimeString("en-US", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: false,
                                            }),
                                            title: "Buffer block",
                                            description:
                                                "Flexible time for overflow or catch-up.",
                                            status: "scheduled",
                                        };
                                        setDailyFocusPlanItems([
                                            ...dailyFocusPlanItems,
                                            newBlock,
                                        ]);
                                        // Scroll to show the new content
                                        setTimeout(() => {
                                            const tabBar =
                                                document.getElementById(
                                                    "dashboard-tab-bar"
                                                );
                                            if (tabBar) {
                                                tabBar.scrollIntoView({
                                                    behavior: "smooth",
                                                    block: "start",
                                                });
                                            }
                                        }, 50);
                                    }}
                                >
                                    <PlusIcon
                                        style={{
                                            width: "0.9rem",
                                            height: "0.9rem",
                                        }}
                                    />
                                    Add buffer block
                                </button>
                            </div>
                        </section>

                        <section style={dashboardStyles.section}>
                            <header style={dashboardStyles.sectionHeader}>
                                <h2 style={dashboardStyles.sectionTitle}>
                                    {sectionIntro.momentum.title}
                                </h2>
                                <p style={dashboardStyles.sectionLead}>
                                    {sectionIntro.momentum.lead}
                                </p>
                            </header>
                            <div style={dashboardStyles.momentumGrid}>
                                {momentumHighlights.map((item) => {
                                    const TrendIcon =
                                        item.trend.direction === "down"
                                            ? ArrowTrendingDownIcon
                                            : ArrowTrendingUpIcon;
                                    const trendTone =
                                        item.trend.direction === "down"
                                            ? dashboardStyles.momentumTrendNegative
                                            : dashboardStyles.momentumTrendPositive;
                                    const ItemIcon = item.icon;
                                    return (
                                        <article
                                            key={item.title}
                                            style={{
                                                ...dashboardStyles.momentumCard,
                                                ...(isDarkTheme
                                                    ? {}
                                                    : {
                                                        background:
                                                            "rgba(255,255,255,0.8)",
                                                        position: "relative",
                                                        overflow: "visible",
                                                    }),
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isDarkTheme) {
                                                    e.currentTarget.style.transform =
                                                        "translateY(-6px)";
                                                    e.currentTarget.style.boxShadow =
                                                        "0 35px 60px -12px rgba(99,102,241,0.25)";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isDarkTheme) {
                                                    e.currentTarget.style.transform =
                                                        "translateY(0)";
                                                    e.currentTarget.style.boxShadow =
                                                        "0 25px 50px -12px rgba(99,102,241,0.15)";
                                                }
                                            }}
                                        >
                                            {/* Momentum Card Glow - Light Mode Only */}
                                            {!isDarkTheme && (
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: "-2px",
                                                        left: "-2px",
                                                        right: "-2px",
                                                        bottom: "-2px",
                                                        background:
                                                            "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(147,51,234,0.1), rgba(59,130,246,0.15))",
                                                        borderRadius: "inherit",
                                                        zIndex: -1,
                                                        filter: "blur(8px)",
                                                        opacity: 0.6,
                                                    }}
                                                />
                                            )}
                                            <div
                                                style={
                                                    dashboardStyles.momentumHeader
                                                }
                                            >
                                                <div
                                                    style={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                        width: "2.8rem",
                                                        height: "2.8rem",
                                                        borderRadius: "0.95rem",
                                                        background:
                                                            "rgba(56,189,248,0.16)",
                                                        color: "var(--color-primary-700)",
                                                    }}
                                                >
                                                    <ItemIcon
                                                        style={{
                                                            width: "1.25rem",
                                                            height: "1.25rem",
                                                        }}
                                                    />
                                                </div>
                                                <span
                                                    style={{
                                                        ...dashboardStyles.momentumTrend,
                                                        ...trendTone,
                                                    }}
                                                >
                                                    <TrendIcon
                                                        style={{
                                                            width: "0.95rem",
                                                            height: "0.95rem",
                                                        }}
                                                    />
                                                    {item.trend.label}
                                                </span>
                                            </div>
                                            <div>
                                                <h3
                                                    style={
                                                        dashboardStyles.momentumTitle
                                                    }
                                                >
                                                    {item.title}
                                                </h3>
                                                <p
                                                    style={
                                                        dashboardStyles.momentumDescription
                                                    }
                                                >
                                                    {item.description}
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: "0.45rem",
                                                    fontWeight: 600,
                                                    fontSize: "0.9rem",
                                                    color: "var(--color-primary-600)",
                                                    border: "none",
                                                    background: "transparent",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                    setActiveTab("timers")
                                                }
                                            >
                                                {item.action}
                                            </button>
                                        </article>
                                    );
                                })}
                            </div>
                        </section>
                    </>
                )}
                {activeTab === "sessions" && (
                    <section style={dashboardStyles.section}>
                        <header style={dashboardStyles.sectionHeader}>
                            <h2 style={dashboardStyles.sectionTitle}>
                                Your focus sessions
                            </h2>
                            <p style={dashboardStyles.sectionLead}>
                                Track all your past focus sessions, duration,
                                productivity scores, and insights from each
                                session.
                            </p>
                        </header>
                        <div style={dashboardStyles.momentumGrid}>
                            {[
                                {
                                    date: "Today, 2:45 PM",
                                    duration: "45 minutes",
                                    focus: "Deep Work Block",
                                    productivity: "92%",
                                    icon: FireIcon,
                                },
                                {
                                    date: "Today, 10:15 AM",
                                    duration: "90 minutes",
                                    focus: "Morning Sprint",
                                    productivity: "87%",
                                    icon: CheckCircleIcon,
                                },
                                {
                                    date: "Yesterday, 3:30 PM",
                                    duration: "60 minutes",
                                    focus: "Code Review",
                                    productivity: "79%",
                                    icon: ClockIcon,
                                },
                                {
                                    date: "Yesterday, 9:00 AM",
                                    duration: "120 minutes",
                                    focus: "Strategic Planning",
                                    productivity: "95%",
                                    icon: TrophyIcon,
                                },
                            ].map((session, idx) => {
                                const SessionIcon = session.icon;
                                const productivityNum = parseInt(
                                    session.productivity
                                );
                                return (
                                    <article
                                        key={idx}
                                        style={{
                                            ...dashboardStyles.momentumCard,
                                            ...(isDarkTheme
                                                ? {}
                                                : {
                                                    background:
                                                        "rgba(255,255,255,0.8)",
                                                    position: "relative",
                                                    overflow: "visible",
                                                }),
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isDarkTheme) {
                                                e.currentTarget.style.transform =
                                                    "translateY(-6px)";
                                                e.currentTarget.style.boxShadow =
                                                    "0 35px 60px -12px rgba(99,102,241,0.25)";
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isDarkTheme) {
                                                e.currentTarget.style.transform =
                                                    "translateY(0)";
                                                e.currentTarget.style.boxShadow =
                                                    "0 25px 50px -12px rgba(99,102,241,0.15)";
                                            }
                                        }}
                                    >
                                        <div
                                            style={
                                                dashboardStyles.momentumHeader
                                            }
                                        >
                                            <div style={dashboardStyles.momentumTitleRow}>
                                                <div
                                                    style={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        width: "2.8rem",
                                                        height: "2.8rem",
                                                        borderRadius: "0.95rem",
                                                        background:
                                                            "rgba(56,189,248,0.16)",
                                                        color: "var(--color-primary-700)",
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <SessionIcon
                                                        style={{
                                                            width: "1.25rem",
                                                            height: "1.25rem",
                                                        }}
                                                    />
                                                </div>
                                                <h3
                                                    style={
                                                        dashboardStyles.momentumTitle
                                                    }
                                                >
                                                    {session.focus}
                                                </h3>
                                            </div>
                                        </div>
                                        <div>
                                            <p
                                                style={{
                                                    fontSize: "0.9rem",
                                                    color: "var(--color-gray-600)",
                                                    margin: "0.35rem 0 0",
                                                }}
                                            >
                                                {session.date}
                                            </p>
                                            <p
                                                style={{
                                                    fontSize: "0.95rem",
                                                    fontWeight: 600,
                                                    color: "var(--color-gray-900)",
                                                    margin: "0.5rem 0 0",
                                                }}
                                            >
                                                ⏱ {session.duration}
                                            </p>
                                        </div>
                                        <span
                                            style={{
                                                ...dashboardStyles.momentumTrend,
                                                position: "absolute",
                                                bottom: "2.25rem",
                                                right: "2.25rem",
                                                color: "var(--color-cyan-400)",
                                                fontSize: "0.95rem",
                                                fontWeight: 700,
                                            }}
                                        >
                                            {session.productivity}
                                        </span>
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                )}
                {activeTab === "achievements" && (
                    <section style={dashboardStyles.section}>
                        <header style={dashboardStyles.sectionHeader}>
                            <h2 style={dashboardStyles.sectionTitle}>
                                Your achievements & badges
                            </h2>
                            <p style={dashboardStyles.sectionLead}>
                                Celebrate your milestones and unlock badges as
                                you build better focus habits. Every achievement
                                brings you closer to mastery.
                            </p>
                        </header>
                        <div
                            style={{
                                ...dashboardStyles.momentumGrid,
                                gridTemplateColumns: width >= 910 ? "repeat(3, 1fr)" : width >= 510 ? "repeat(2, 1fr)" : "1fr",
                            }}
                        >
                            {[
                                {
                                    title: "🔥 7-Day Streak",
                                    description:
                                        "Completed 7 consecutive days of focus sessions",
                                    progress: "100%",
                                    icon: FireIcon,
                                    earned: true,
                                },
                                {
                                    title: "⭐ Perfect Week",
                                    description:
                                        "Achieved 90%+ productivity for an entire week",
                                    progress: "85%",
                                    icon: TrophyIcon,
                                    earned: false,
                                },
                                {
                                    title: "💪 Century Club",
                                    description:
                                        "Complete 100 total focus sessions",
                                    progress: "67%",
                                    icon: CheckCircleIcon,
                                    earned: false,
                                },
                                {
                                    title: "🌅 Early Bird",
                                    description:
                                        "Start 5 focus sessions before 8 AM",
                                    progress: "60%",
                                    icon: ClockIcon,
                                    earned: false,
                                },
                                {
                                    title: "🎯 Focus Master",
                                    description:
                                        "Maintain 200+ minutes of focus in a single day",
                                    progress: "40%",
                                    icon: SparklesIcon,
                                    earned: false,
                                },
                                {
                                    title: "🧘 Mindful Breaks",
                                    description:
                                        "Use 10 relaxation activities before focus sessions",
                                    progress: "30%",
                                    icon: BellAlertIcon,
                                    earned: false,
                                },
                                {
                                    title: "🚀 Speed Racer",
                                    description:
                                        "Complete 5 sessions in rapid succession",
                                    progress: "20%",
                                    icon: ArrowTrendingUpIcon,
                                    earned: false,
                                },
                                {
                                    title: "🌟 Consistency King",
                                    description:
                                        "Maintain 95%+ consistency for a month",
                                    progress: "45%",
                                    icon: SparklesIcon,
                                    earned: false,
                                },
                                {
                                    title: "💎 Diamond Status",
                                    description:
                                        "Unlock all other achievements",
                                    progress: "11%",
                                    icon: TrophyIcon,
                                    earned: false,
                                },
                            ].map((badge, idx) => {
                                const BadgeIcon = badge.icon;
                                const progressNum = parseInt(badge.progress);
                                return (
                                    <article
                                        key={idx}
                                        style={{
                                            ...dashboardStyles.momentumCard,
                                            ...(isDarkTheme
                                                ? {}
                                                : {
                                                    background:
                                                        "rgba(255,255,255,0.8)",
                                                    position: "relative",
                                                    overflow: "visible",
                                                    opacity: badge.earned
                                                        ? 1
                                                        : 0.8,
                                                }),
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isDarkTheme) {
                                                e.currentTarget.style.transform =
                                                    "translateY(-6px)";
                                                e.currentTarget.style.boxShadow =
                                                    "0 35px 60px -12px rgba(99,102,241,0.25)";
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isDarkTheme) {
                                                e.currentTarget.style.transform =
                                                    "translateY(0)";
                                                e.currentTarget.style.boxShadow =
                                                    "0 25px 50px -12px rgba(99,102,241,0.15)";
                                            }
                                        }}
                                    >
                                        <div
                                            style={
                                                dashboardStyles.momentumHeader
                                            }
                                        >
                                            <div
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    width: "2.8rem",
                                                    height: "2.8rem",
                                                    borderRadius: "0.95rem",
                                                    background: badge.earned
                                                        ? "rgba(34,197,94,0.16)"
                                                        : "rgba(56,189,248,0.16)",
                                                    color: badge.earned
                                                        ? "var(--color-green-600)"
                                                        : "var(--color-primary-700)",
                                                }}
                                            >
                                                <BadgeIcon
                                                    style={{
                                                        width: "1.25rem",
                                                        height: "1.25rem",
                                                    }}
                                                />
                                            </div>
                                            <span
                                                style={{
                                                    ...dashboardStyles.momentumTrend,
                                                    color: badge.earned
                                                        ? "var(--color-green-600)"
                                                        : "var(--color-gray-600)",
                                                }}
                                            >
                                                {badge.earned
                                                    ? "✓ Earned"
                                                    : badge.progress}
                                            </span>
                                        </div>
                                        <div>
                                            <h3
                                                style={
                                                    dashboardStyles.momentumTitle
                                                }
                                            >
                                                {badge.title}
                                            </h3>
                                            <p
                                                style={{
                                                    fontSize: "0.95rem",
                                                    lineHeight: 1.6,
                                                    color: "var(--color-gray-600)",
                                                    margin: "0.35rem 0 0",
                                                }}
                                            >
                                                {badge.description}
                                            </p>
                                            {!badge.earned && (
                                                <div
                                                    style={{
                                                        marginTop: "0.75rem",
                                                        background:
                                                            "rgba(0,0,0,0.1)",
                                                        borderRadius: "999px",
                                                        height: "6px",
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            height: "100%",
                                                            background:
                                                                "linear-gradient(90deg, #3b82f6, #06b6d4)",
                                                            width: `${progressNum}%`,
                                                            transition:
                                                                "width 0.3s ease",
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                )}
                {activeTab === "distractions" && (
                    <section style={dashboardStyles.section}>
                        <header style={dashboardStyles.sectionHeader}>
                            <h2 style={dashboardStyles.sectionTitle}>
                                {sectionIntro.distractions.title}{" "}
                                {isSyncing && chip("syncing...")}
                            </h2>
                            <p style={dashboardStyles.sectionLead}>
                                {sectionIntro.distractions.lead}
                            </p>
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
                                onFocus={(e) => {
                                    e.currentTarget.style.outline =
                                        "2px solid var(--color-primary-400)";
                                    e.currentTarget.style.outlineOffset = "2px";
                                    e.currentTarget.style.boxShadow =
                                        "0 0 0 4px var(--color-primary-200)";
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.outline = "none";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                                onClick={() => setIsLoggerOpen(true)}
                            >
                                <PlusIcon
                                    style={{
                                        width: "1.2rem",
                                        height: "1.2rem",
                                    }}
                                />
                                Log new distraction
                            </button>
                        </div>

                        {distractions.length === 0 ? (
                            <div style={dashboardStyles.blankState}>
                                No distractions logged yet. Tap "Log new
                                distraction" to capture your first note.
                            </div>
                        ) : (
                            <div style={dashboardStyles.distractionGrid}>
                                {distractions
                                    .filter((d) => {
                                        const t = (
                                            filterText || ""
                                        ).toLowerCase();
                                        if (!t) return true;
                                        return (
                                            (d.note || "")
                                                .toLowerCase()
                                                .includes(t) ||
                                            (d.type || "")
                                                .toLowerCase()
                                                .includes(t)
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
                                                style={
                                                    dashboardStyles.distractionCard
                                                }
                                            >
                                                <div
                                                    style={
                                                        dashboardStyles.distractionMeta
                                                    }
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            gap: "0.45rem",
                                                            flexWrap: "wrap",
                                                        }}
                                                    >
                                                        <span
                                                            style={
                                                                dashboardStyles.chip
                                                            }
                                                        >
                                                            {d.type || "other"}
                                                        </span>
                                                        <span
                                                            style={{
                                                                ...dashboardStyles.chip,
                                                                background:
                                                                    sev.bg,
                                                                color: sev.fg,
                                                            }}
                                                        >
                                                            {d.severity ||
                                                                "medium"}
                                                        </span>
                                                    </div>
                                                    <span
                                                        style={
                                                            dashboardStyles.cardTimestamp
                                                        }
                                                    >
                                                        {new Date(
                                                            d.timestamp
                                                        ).toLocaleString()}
                                                    </span>
                                                </div>
                                                <div
                                                    style={
                                                        dashboardStyles.cardBody
                                                    }
                                                >
                                                    {d.note}
                                                </div>
                                                <div
                                                    style={
                                                        dashboardStyles.cardActions
                                                    }
                                                >
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteDistraction(
                                                                d.id
                                                            )
                                                        }
                                                        style={
                                                            dashboardStyles.deleteButton
                                                        }
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

                <MusicRelaxation
                    isOpen={activeRelaxationModal === "music"}
                    onClose={() => setActiveRelaxationModal(null)}
                    onSkipToFocus={handleSkipToFocus}
                />
                <MeditationRelaxation
                    isOpen={activeRelaxationModal === "meditation"}
                    onClose={() => setActiveRelaxationModal(null)}
                    onSkipToFocus={handleSkipToFocus}
                />
                <ThoughtDumpRelaxation
                    isOpen={activeRelaxationModal === "thoughtDump"}
                    onClose={() => setActiveRelaxationModal(null)}
                    onSkipToFocus={handleSkipToFocus}
                />
                <CalmingGameRelaxation
                    isOpen={activeRelaxationModal === "calmingGame"}
                    onClose={() => setActiveRelaxationModal(null)}
                    onSkipToFocus={handleSkipToFocus}
                />
                <DoodlePadRelaxation
                    isOpen={activeRelaxationModal === "doodlePad"}
                    onClose={() => setActiveRelaxationModal(null)}
                    onSkipToFocus={handleSkipToFocus}
                />
                <AffirmationsRelaxation
                    isOpen={activeRelaxationModal === "affirmations"}
                    onClose={() => setActiveRelaxationModal(null)}
                    onSkipToFocus={handleSkipToFocus}
                />

                {/* Weekly Planner Modal */}
                {showWeeklyPlanner &&
                    createPortal(
                        <div
                            style={{
                                position: "fixed",
                                inset: 0,
                                background: "rgba(0, 0, 0, 0.6)",
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                zIndex: 9998,
                                pointerEvents: "auto",
                            }}
                            onClick={() => setShowWeeklyPlanner(false)}
                            role="presentation"
                        >
                            <div
                                style={{
                                    background: isDarkTheme
                                        ? "var(--panel-bg)"
                                        : "rgba(255, 255, 255, 0.95)",
                                    borderRadius: "1.5rem",
                                    border: isDarkTheme
                                        ? "1px solid var(--input-border)"
                                        : "1px solid rgba(255, 255, 255, 0.4)",
                                    padding: "2.5rem",
                                    maxWidth: "600px",
                                    width: "90%",
                                    maxHeight: "70vh",
                                    overflow: "auto",
                                    boxShadow: isDarkTheme
                                        ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                                        : "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                                    backdropFilter: isDarkTheme
                                        ? "none"
                                        : "blur(16px)",
                                    WebkitBackdropFilter: isDarkTheme
                                        ? "none"
                                        : "blur(16px)",
                                    scrollbarWidth: "thin",
                                    scrollbarColor:
                                        "rgba(59, 130, 246, 0.6) transparent",
                                    zIndex: 9999,
                                    pointerEvents: "auto",
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "2rem",
                                    }}
                                >
                                    <h2
                                        style={{
                                            fontSize: "1.75rem",
                                            fontWeight: 700,
                                            color: "#38bdf8",
                                            margin: 0,
                                        }}
                                    >
                                        Weekly Focus Plan
                                    </h2>
                                    <button
                                        onClick={() =>
                                            setShowWeeklyPlanner(false)
                                        }
                                        style={{
                                            background: "transparent",
                                            border: "none",
                                            fontSize: "1.5rem",
                                            cursor: "pointer",
                                            color: "var(--color-gray-600)",
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>

                                <div style={{ display: "grid", gap: "1.5rem" }}>
                                    {weeklyPlanItems.map((dayPlan, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                padding: "1.25rem",
                                                background: isDarkTheme
                                                    ? "rgba(59, 130, 246, 0.08)"
                                                    : "linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(14, 165, 233, 0.08))",
                                                border: isDarkTheme
                                                    ? "1px solid rgba(59, 130, 246, 0.2)"
                                                    : "1px solid rgba(59, 130, 246, 0.25)",
                                                borderRadius: "1rem",
                                                display: "grid",
                                                gap: "1rem",
                                            }}
                                        >
                                            <div>
                                                <label
                                                    style={{
                                                        fontSize: "0.8rem",
                                                        fontWeight: 600,
                                                        color: "var(--color-gray-600)",
                                                        textTransform:
                                                            "uppercase",
                                                    }}
                                                >
                                                    Focus Area
                                                </label>
                                                <input
                                                    type="text"
                                                    value={dayPlan.focus}
                                                    onChange={(e) => {
                                                        const updated = [
                                                            ...weeklyPlanItems,
                                                        ];
                                                        updated[idx].focus =
                                                            e.target.value;
                                                        setWeeklyPlanItems(
                                                            updated
                                                        );
                                                    }}
                                                    style={{
                                                        width: "100%",
                                                        padding: "0.5rem",
                                                        marginTop: "0.35rem",
                                                        fontSize: "1.05rem",
                                                        fontWeight: 600,
                                                        border: "1px solid var(--input-border)",
                                                        borderRadius: "0.5rem",
                                                        background:
                                                            "var(--input-bg)",
                                                        color: "var(--color-gray-900)",
                                                        boxSizing: "border-box",
                                                    }}
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    display: "grid",
                                                    gridTemplateColumns:
                                                        "1fr 1fr",
                                                    gap: "1rem",
                                                }}
                                            >
                                                <div>
                                                    <label
                                                        style={{
                                                            fontSize: "0.8rem",
                                                            fontWeight: 600,
                                                            color: "var(--color-gray-600)",
                                                            textTransform:
                                                                "uppercase",
                                                        }}
                                                    >
                                                        Duration
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={dayPlan.duration}
                                                        onChange={(e) => {
                                                            const updated = [
                                                                ...weeklyPlanItems,
                                                            ];
                                                            updated[
                                                                idx
                                                            ].duration =
                                                                e.target.value;
                                                            setWeeklyPlanItems(
                                                                updated
                                                            );
                                                        }}
                                                        style={{
                                                            width: "100%",
                                                            padding: "0.5rem",
                                                            marginTop:
                                                                "0.35rem",
                                                            fontSize: "0.85rem",
                                                            fontWeight: 600,
                                                            border: "1px solid var(--input-border)",
                                                            borderRadius:
                                                                "0.5rem",
                                                            background:
                                                                "var(--input-bg)",
                                                            color: "var(--color-gray-900)",
                                                            boxSizing:
                                                                "border-box",
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        style={{
                                                            fontSize: "0.8rem",
                                                            fontWeight: 600,
                                                            color: "var(--color-gray-600)",
                                                            textTransform:
                                                                "uppercase",
                                                        }}
                                                    >
                                                        Sessions
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={dayPlan.sessions}
                                                        onChange={(e) => {
                                                            const updated = [
                                                                ...weeklyPlanItems,
                                                            ];
                                                            updated[
                                                                idx
                                                            ].sessions =
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                ) || 0;
                                                            setWeeklyPlanItems(
                                                                updated
                                                            );
                                                        }}
                                                        style={{
                                                            width: "100%",
                                                            padding: "0.5rem",
                                                            marginTop:
                                                                "0.35rem",
                                                            fontSize: "0.85rem",
                                                            fontWeight: 600,
                                                            border: "1px solid var(--input-border)",
                                                            borderRadius:
                                                                "0.5rem",
                                                            background:
                                                                "var(--input-bg)",
                                                            color: "var(--color-gray-900)",
                                                            boxSizing:
                                                                "border-box",
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div
                                    style={{
                                        marginTop: "2rem",
                                        paddingTop: "1.5rem",
                                        borderTop: isDarkTheme
                                            ? "1px solid var(--input-border)"
                                            : "1px solid rgba(0, 0, 0, 0.1)",
                                    }}
                                >
                                    <p
                                        style={{
                                            fontSize: "0.9rem",
                                            color: "var(--color-gray-600)",
                                            margin: 0,
                                        }}
                                    >
                                        💡 Tip: Edit your weekly plan based on
                                        your focus patterns and energy levels
                                        throughout the week.
                                    </p>
                                </div>

                                <button
                                    onClick={() => setShowWeeklyPlanner(false)}
                                    style={{
                                        width: "100%",
                                        marginTop: "1.5rem",
                                        padding: "0.85rem 1.5rem",
                                        background:
                                            "linear-gradient(to right, #38bdf8, #60a5fa)",
                                        color: "#0f172a",
                                        border: "none",
                                        borderRadius: "0.9rem",
                                        fontWeight: 600,
                                        fontSize: "1rem",
                                        cursor: "pointer",
                                        transition: "transform 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform =
                                            "translateY(-2px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform =
                                            "translateY(0)";
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>,
                        document.body
                    )}
            </div>
        </div>
    );
}

function App() {
    const { isMobile, width } = useResponsive();
    // Initialize sidebar state based on screen width:
    // - Collapsed (true) for screens < 826px
    // - Expanded (false) for screens >= 826px
    // Users can still manually toggle it regardless of screen size
    const [isCollapsed, setIsCollapsed] = useState(() => {
        return window.innerWidth < 826;
    });

    // Track the previous threshold state to detect when we cross 826px
    const [wasSmallScreen, setWasSmallScreen] = useState(window.innerWidth < 826);

    useEffect(() => {
        const isCurrentlySmall = width < 826;

        // Only force the default state if we've crossed the 826px boundary
        if (isCurrentlySmall !== wasSmallScreen) {
            setIsCollapsed(isCurrentlySmall);
            setWasSmallScreen(isCurrentlySmall);
        }
    }, [width, wasSmallScreen]);
    return (
        <AuthProvider>
            <SocketProvider>
                <ToastProvider>
                    <ConfirmProvider>
                        <Router>
                            <div className="App">
                                <Routes>
                                    <Route path="/" element={<LandingPage />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/signup" element={<Signup />} />
                                    <Route
                                        path="/dashboard"
                                        element={
                                            <ProtectedRoute>
                                                <>
                                                    <Header />
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            flexDirection: isMobile ? "column" : "row",
                                                            paddingBottom: isMobile ? "4.5rem" : "0",
                                                        }}
                                                    >
                                                        <Navbar
                                                            isCollapsed={isCollapsed}
                                                            setIsCollapsed={setIsCollapsed}
                                                        />
                                                        <div
                                                            style={{
                                                                flex: 1,
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
                                                            flexDirection: isMobile ? "column" : "row",
                                                            minHeight: isMobile ? "auto" : "calc(100vh - 8rem)",
                                                            paddingBottom: isMobile ? "4.5rem" : "0",
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
                                                            flexDirection: isMobile ? "column" : "row",
                                                            minHeight: isMobile ? "auto" : "calc(100vh - 8rem)",
                                                            paddingBottom: isMobile ? "4.5rem" : "0",
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
                                                            flexDirection: isMobile ? "column" : "row",
                                                            minHeight: isMobile ? "auto" : "calc(100vh - 8rem)",
                                                            paddingBottom: isMobile ? "4.5rem" : "0",
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
                                                            flexDirection: isMobile ? "column" : "row",
                                                            minHeight: isMobile ? "auto" : "calc(100vh - 8rem)",
                                                            paddingBottom: isMobile ? "4.5rem" : "0",
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
                                                            flexDirection: isMobile ? "column" : "row",
                                                            minHeight: isMobile ? "auto" : "calc(100vh - 8rem)",
                                                            paddingBottom: isMobile ? "4.5rem" : "0",
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
                                                            flexDirection: isMobile ? "column" : "row",
                                                            minHeight: isMobile ? "auto" : "calc(100vh - 8rem)",
                                                            paddingBottom: isMobile ? "4.5rem" : "0",
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
                                                            flexDirection: isMobile ? "column" : "row",
                                                            minHeight: isMobile ? "auto" : "calc(100vh - 8rem)",
                                                            paddingBottom: isMobile ? "4.5rem" : "0",
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
                                                            flexDirection: isMobile ? "column" : "row",
                                                            minHeight: isMobile ? "auto" : "calc(100vh - 8rem)",
                                                            paddingBottom: isMobile ? "4.5rem" : "0",
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
                                    <Route path="/cookies" element={<Cookies />} />
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
                                                            flexDirection: isMobile ? "column" : "row",
                                                            minHeight: isMobile ? "auto" : "calc(100vh - 8rem)",
                                                            paddingBottom: isMobile ? "4.5rem" : "0",
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
                                                            flexDirection: isMobile ? "column" : "row",
                                                            minHeight: isMobile ? "auto" : "calc(100vh - 8rem)",
                                                            paddingBottom: isMobile ? "4.5rem" : "0",
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
                                                            flexDirection: isMobile ? "column" : "row",
                                                            minHeight: isMobile ? "auto" : "calc(100vh - 8rem)",
                                                            paddingBottom: isMobile ? "4.5rem" : "0",
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
                                                            flexDirection: isMobile ? "column" : "row",
                                                            minHeight: isMobile ? "auto" : "calc(100vh - 8rem)",
                                                            paddingBottom: isMobile ? "4.5rem" : "0",
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
                                                            flexDirection: isMobile ? "column" : "row",
                                                            minHeight: isMobile ? "auto" : "calc(100vh - 8rem)",
                                                            paddingBottom: isMobile ? "4.5rem" : "0",
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
                                                            flexDirection: isMobile ? "column" : "row",
                                                            minHeight: isMobile ? "auto" : "calc(100vh - 8rem)",
                                                            paddingBottom: isMobile ? "4.5rem" : "0",
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
                                                            flexDirection: isMobile ? "column" : "row",
                                                            minHeight: isMobile ? "auto" : "calc(100vh - 8rem)",
                                                            paddingBottom: isMobile ? "4.5rem" : "0",
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
                                                            flexDirection: isMobile ? "column" : "row",
                                                            minHeight: isMobile ? "auto" : "calc(100vh - 8rem)",
                                                            paddingBottom: isMobile ? "4.5rem" : "0",
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
                                                            flexDirection: isMobile ? "column" : "row",
                                                            minHeight: isMobile ? "auto" : "calc(100vh - 8rem)",
                                                            paddingBottom: isMobile ? "4.5rem" : "0",
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
                                                            flexDirection: isMobile ? "column" : "row",
                                                            minHeight: isMobile ? "auto" : "calc(100vh - 8rem)",
                                                            paddingBottom: isMobile ? "4.5rem" : "0",
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
                    </ConfirmProvider>
                </ToastProvider>
            </SocketProvider>
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
