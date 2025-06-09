import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import type { CSSProperties } from "react";
import Header from "./components/Header";
import Timer from "./components/Timer";
import DistractionLogger from "./components/DistractionLogger";
import Stats from "./components/Stats";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Settings from "./pages/Settings";
import Community from "./pages/Community";
import Resources from "./pages/Resources";
import Statistics from "./pages/Statistics";
import FocusTimer from "./pages/FocusTimer";
import HelpSupport from "./pages/HelpSupport";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactUs from "./pages/ContactUs";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import Guides from "./pages/Guides";
import Support from "./pages/Support";
import Careers from "./pages/Careers";
import Cookies from "./pages/Cookies";
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
import Profile from "./pages/Profile";
import LandingPage from "./LandingPage/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

interface Distraction {
    id: string;
    timestamp: string;
    note: string;
    type: string;
    time: string;
}

function Dashboard() {
    const [distractions, setDistractions] = useState<Distraction[]>(() => {
        const saved = localStorage.getItem("distractions");
        return saved ? JSON.parse(saved) : [];
    });
    const [isLoggerOpen, setIsLoggerOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        localStorage.setItem("distractions", JSON.stringify(distractions));
    }, [distractions]);

    const handleLogDistraction = (newDistraction: Omit<Distraction, "id">) => {
        const distraction: Distraction = {
            ...newDistraction,
            id: crypto.randomUUID(),
        };
        setDistractions((prev) => [...prev, distraction]);
    };

    const containerStyle: CSSProperties = {
        maxWidth: "76rem",
        margin: "0 auto",
        padding: "2rem",
    };

    const welcomeSectionStyle: CSSProperties = {
        background:
            "linear-gradient(to right, var(--color-primary-500), var(--color-cyan-400))",
        borderRadius: "1rem",
        padding: "2rem",
        marginBottom: "2rem",
        color: "var(--color-white)",
        boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    };

    const welcomeTitleStyle: CSSProperties = {
        fontSize: "2rem",
        fontWeight: 700,
        marginBottom: "0.5rem",
    };

    const welcomeSubtitleStyle: CSSProperties = {
        fontSize: "1.125rem",
        opacity: 0.9,
        marginBottom: "1.5rem",
    };

    const actionButtonsStyle: CSSProperties = {
        display: "flex",
        gap: "1rem",
    };

    const buttonStyle: CSSProperties = {
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

    const primaryButtonStyle: CSSProperties = {
        ...buttonStyle,
        background: "var(--color-white)",
        color: "var(--color-primary-600)",
        border: "none",
    };

    const secondaryButtonStyle: CSSProperties = {
        ...buttonStyle,
        background: "rgba(255, 255, 255, 0.1)",
        color: "var(--color-white)",
        border: "2px solid var(--color-white)",
    };

    const tabsStyle: CSSProperties = {
        display: "flex",
        gap: "1rem",
        marginBottom: "2rem",
        borderBottom: "2px solid var(--color-gray-200)",
        paddingBottom: "0.5rem",
    };

    const tabStyle: CSSProperties = {
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
        fontWeight: 500,
        color: "var(--color-gray-600)",
        cursor: "pointer",
        borderRadius: "0.5rem",
        transition: "all 0.2s ease-in-out",
    };

    const activeTabStyle: CSSProperties = {
        ...tabStyle,
        background: "var(--color-primary-50)",
        color: "var(--color-primary-700)",
    };

    const quickStatsGridStyle: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2rem",
    };

    const statCardStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    };

    const statIconStyle: CSSProperties = {
        width: "2rem",
        height: "2rem",
        color: "var(--color-primary-600)",
        marginBottom: "1rem",
    };

    const statTitleStyle: CSSProperties = {
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "var(--color-gray-600)",
        marginBottom: "0.5rem",
    };

    const statValueStyle: CSSProperties = {
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "0.25rem",
    };

    const statChangeStyle: CSSProperties = {
        fontSize: "0.875rem",
        color: "var(--color-green-600)",
    };

    const mainContentGridStyle: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "2rem",
        marginBottom: "2rem",
    };

    const sectionStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    };

    const sectionHeaderStyle: CSSProperties = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.5rem",
    };

    const sectionTitleStyle: CSSProperties = {
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    };

    const recentActivityStyle: CSSProperties = {
        ...sectionStyle,
        marginBottom: "2rem",
    };

    const activityListStyle: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    };

    const activityItemStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        background: "var(--color-gray-50)",
        borderRadius: "0.5rem",
    };

    const activityIconStyle: CSSProperties = {
        width: "2rem",
        height: "2rem",
        color: "var(--color-primary-600)",
        background: "var(--color-primary-50)",
        borderRadius: "0.5rem",
        padding: "0.5rem",
    };

    const activityContentStyle: CSSProperties = {
        flex: 1,
    };

    const activityTextStyle: CSSProperties = {
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "var(--color-gray-900)",
        marginBottom: "0.25rem",
    };

    const activityTimeStyle: CSSProperties = {
        fontSize: "0.75rem",
        color: "var(--color-gray-500)",
    };

    const tipsSectionStyle: CSSProperties = {
        ...sectionStyle,
    };

    const tipsGridStyle: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem",
    };

    const tipCardStyle: CSSProperties = {
        padding: "1.5rem",
        borderRadius: "0.5rem",
        background: "var(--color-gray-50)",
    };

    const tipCardPrimaryStyle: CSSProperties = {
        ...tipCardStyle,
        borderLeft: "4px solid var(--color-primary-500)",
    };

    const tipCardSecondaryStyle: CSSProperties = {
        ...tipCardStyle,
        borderLeft: "4px solid var(--color-cyan-500)",
    };

    const tipCardCyanStyle: CSSProperties = {
        ...tipCardStyle,
        borderLeft: "4px solid var(--color-cyan-400)",
    };

    const tipHeadingStyle: CSSProperties = {
        fontSize: "1rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const tipParagraphStyle: CSSProperties = {
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
        lineHeight: "1.5",
    };

    // Add new styles for the additional sections
    const upcomingTasksStyle: CSSProperties = {
        ...sectionStyle,
        marginBottom: "2rem",
    };

    const taskListStyle: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    };

    const taskItemStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        background: "var(--color-gray-50)",
        borderRadius: "0.5rem",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
    };

    const taskItemHoverStyle: CSSProperties = {
        background: "var(--color-primary-50)",
        transform: "translateX(0.5rem)",
    };

    const taskCheckboxStyle: CSSProperties = {
        width: "1.25rem",
        height: "1.25rem",
        borderRadius: "0.25rem",
        border: "2px solid var(--color-primary-500)",
        cursor: "pointer",
    };

    const taskContentStyle: CSSProperties = {
        flex: 1,
    };

    const taskTitleStyle: CSSProperties = {
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "var(--color-gray-900)",
        marginBottom: "0.25rem",
    };

    const taskTimeStyle: CSSProperties = {
        fontSize: "0.75rem",
        color: "var(--color-gray-500)",
    };

    const achievementsSectionStyle: CSSProperties = {
        ...sectionStyle,
        marginBottom: "2rem",
    };

    const achievementsGridStyle: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
    };

    const achievementCardStyle: CSSProperties = {
        background: "var(--color-gray-50)",
        borderRadius: "0.5rem",
        padding: "1rem",
        textAlign: "center",
        transition: "all 0.2s ease-in-out",
    };

    const achievementCardHoverStyle: CSSProperties = {
        transform: "translateY(-0.25rem)",
        boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    };

    const achievementIconStyle: CSSProperties = {
        width: "2.5rem",
        height: "2.5rem",
        color: "var(--color-primary-600)",
        margin: "0 auto 0.75rem",
    };

    const achievementTitleStyle: CSSProperties = {
        fontSize: "0.875rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "0.25rem",
    };

    const achievementDescriptionStyle: CSSProperties = {
        fontSize: "0.75rem",
        color: "var(--color-gray-600)",
    };

    const calendarSectionStyle: CSSProperties = {
        ...sectionStyle,
        marginBottom: "2rem",
    };

    const calendarHeaderStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1rem",
    };

    const calendarNavigationStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
    };

    const calendarButtonStyle: CSSProperties = {
        padding: "0.5rem",
        borderRadius: "0.375rem",
        background: "var(--color-gray-100)",
        color: "var(--color-gray-600)",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
    };

    const calendarGridStyle: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "0.5rem",
    };

    const calendarDayStyle: CSSProperties = {
        aspectRatio: "1",
        padding: "0.5rem",
        background: "var(--color-gray-50)",
        borderRadius: "0.375rem",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
    };

    const calendarDayHoverStyle: CSSProperties = {
        background: "var(--color-primary-50)",
        color: "var(--color-primary-700)",
    };

    const calendarDayActiveStyle: CSSProperties = {
        background: "var(--color-primary-500)",
        color: "var(--color-white)",
    };

    const calendarDayNumberStyle: CSSProperties = {
        fontSize: "0.875rem",
        fontWeight: 500,
        marginBottom: "0.25rem",
    };

    const calendarDayStatsStyle: CSSProperties = {
        fontSize: "0.75rem",
        color: "var(--color-gray-500)",
    };

    const focusStreakSectionStyle: CSSProperties = {
        ...sectionStyle,
        marginBottom: "2rem",
    };

    const streakCardStyle: CSSProperties = {
        background:
            "linear-gradient(to right, var(--color-primary-500), var(--color-cyan-400))",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        color: "var(--color-white)",
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
    };

    const streakIconStyle: CSSProperties = {
        width: "3rem",
        height: "3rem",
        color: "var(--color-white)",
        opacity: 0.9,
    };

    const streakContentStyle: CSSProperties = {
        flex: 1,
    };

    const streakTitleStyle: CSSProperties = {
        fontSize: "1.25rem",
        fontWeight: 600,
        marginBottom: "0.5rem",
    };

    const streakDescriptionStyle: CSSProperties = {
        fontSize: "0.875rem",
        opacity: 0.9,
    };

    // Mock data for new sections
    const upcomingTasks = [
        { id: 1, title: "Complete project proposal", time: "2:00 PM" },
        { id: 2, title: "Review weekly reports", time: "3:30 PM" },
        { id: 3, title: "Team meeting", time: "4:00 PM" },
    ];

    const achievements = [
        {
            id: 1,
            title: "Focus Master",
            description: "Completed 50 focus sessions",
            icon: <TrophyIcon style={achievementIconStyle} />,
        },
        {
            id: 2,
            title: "Early Bird",
            description: "Started 5 sessions before 9 AM",
            icon: <StarIcon style={achievementIconStyle} />,
        },
        {
            id: 3,
            title: "Consistency King",
            description: "7-day focus streak",
            icon: <FireIcon style={achievementIconStyle} />,
        },
        {
            id: 4,
            title: "Productivity Pro",
            description: "Completed 20 tasks in one day",
            icon: <ArrowTrendingUpIcon style={achievementIconStyle} />,
        },
    ];

    const calendarDays = Array.from({ length: 31 }, (_, i) => ({
        day: i + 1,
        focusTime: Math.floor(Math.random() * 4) + 1,
        tasks: Math.floor(Math.random() * 5) + 1,
    }));

    return (
        <div style={containerStyle}>
            {/* Welcome Section */}
            <div style={welcomeSectionStyle}>
                <h1 style={welcomeTitleStyle}>
                    Welcome back, <span style={{ opacity: 0.9 }}>User</span>
                </h1>
                <p style={welcomeSubtitleStyle}>
                    Ready to boost your productivity today?
                </p>
                <div style={actionButtonsStyle}>
                    <button
                        style={primaryButtonStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.02)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                        }}
                    >
                        <PlayIcon
                            style={{ width: "1.25rem", height: "1.25rem" }}
                        />
                        <span>Start Focus Session</span>
                    </button>
                    <button
                        style={secondaryButtonStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.02)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                        }}
                    >
                        <PlusIcon
                            style={{ width: "1.25rem", height: "1.25rem" }}
                        />
                        <span>Add New Task</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div style={tabsStyle}>
                <button
                    style={activeTab === "overview" ? activeTabStyle : tabStyle}
                    onClick={() => setActiveTab("overview")}
                >
                    Overview
                </button>
                <button
                    style={activeTab === "tasks" ? activeTabStyle : tabStyle}
                    onClick={() => setActiveTab("tasks")}
                >
                    Tasks
                </button>
                <button
                    style={
                        activeTab === "analytics" ? activeTabStyle : tabStyle
                    }
                    onClick={() => setActiveTab("analytics")}
                >
                    Analytics
                </button>
            </div>

            {/* Quick Stats */}
            <div style={quickStatsGridStyle}>
                <div style={statCardStyle}>
                    <ChartBarIcon style={statIconStyle} />
                    <div style={statTitleStyle}>Focus Time</div>
                    <div style={statValueStyle}>2h 30m</div>
                    <div style={statChangeStyle}>+15% from yesterday</div>
                </div>
                <div style={statCardStyle}>
                    <ClockIcon style={statIconStyle} />
                    <div style={statTitleStyle}>Sessions</div>
                    <div style={statValueStyle}>4</div>
                    <div style={statChangeStyle}>2 completed today</div>
                </div>
                <div style={statCardStyle}>
                    <CheckCircleIcon style={statIconStyle} />
                    <div style={statTitleStyle}>Tasks Completed</div>
                    <div style={statValueStyle}>12</div>
                    <div style={statChangeStyle}>80% completion rate</div>
                </div>
            </div>

            {/* Main Content */}
            <div style={mainContentGridStyle}>
                <div style={sectionStyle}>
                    <div style={sectionHeaderStyle}>
                        <h2 style={sectionTitleStyle}>Focus Timer</h2>
                    </div>
                    <Timer onDistraction={() => setIsLoggerOpen(true)} />
                </div>
                <div style={sectionStyle}>
                    <div style={sectionHeaderStyle}>
                        <h2 style={sectionTitleStyle}>Statistics</h2>
                    </div>
                    <Stats distractions={distractions} />
                </div>
            </div>

            {/* Recent Activity */}
            <div style={recentActivityStyle}>
                <div style={sectionHeaderStyle}>
                    <h2 style={sectionTitleStyle}>Recent Activity</h2>
                    <button
                        style={{
                            ...buttonStyle,
                            background: "none",
                            color: "var(--color-primary-600)",
                            padding: "0.5rem 1rem",
                        }}
                    >
                        View All
                    </button>
                </div>
                <div style={activityListStyle}>
                    {distractions.map((distraction, index) => (
                        <div key={index} style={activityItemStyle}>
                            <div style={activityIconStyle}>
                                <BellAlertIcon
                                    style={{ width: "1rem", height: "1rem" }}
                                />
                            </div>
                            <div style={activityContentStyle}>
                                <div style={activityTextStyle}>
                                    {distraction.type} distraction
                                </div>
                                <div style={activityTimeStyle}>
                                    {distraction.time}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tips Section */}
            <div style={tipsSectionStyle}>
                <div style={sectionHeaderStyle}>
                    <h2 style={sectionTitleStyle}>Productivity Tips</h2>
                </div>
                <div style={tipsGridStyle}>
                    <div style={tipCardPrimaryStyle}>
                        <h3 style={tipHeadingStyle}>Take Regular Breaks</h3>
                        <p style={tipParagraphStyle}>
                            Remember to take short breaks between focus sessions
                            to maintain productivity.
                        </p>
                    </div>
                    <div style={tipCardSecondaryStyle}>
                        <h3 style={tipHeadingStyle}>Track Your Distractions</h3>
                        <p style={tipParagraphStyle}>
                            Log your distractions to identify patterns and
                            improve your focus.
                        </p>
                    </div>
                    <div style={tipCardCyanStyle}>
                        <h3 style={tipHeadingStyle}>Set Clear Goals</h3>
                        <p style={tipParagraphStyle}>
                            Define specific goals for each focus session to stay
                            motivated.
                        </p>
                    </div>
                </div>
            </div>

            {/* Focus Streak Section */}
            <div style={focusStreakSectionStyle}>
                <div style={sectionHeaderStyle}>
                    <h2 style={sectionTitleStyle}>Focus Streak</h2>
                </div>
                <div style={streakCardStyle}>
                    <FireIcon style={streakIconStyle} />
                    <div style={streakContentStyle}>
                        <h3 style={streakTitleStyle}>7 Day Focus Streak!</h3>
                        <p style={streakDescriptionStyle}>
                            Keep up the great work! You're on your way to
                            becoming a productivity master.
                        </p>
                    </div>
                </div>
            </div>

            {/* Upcoming Tasks Section */}
            <div style={upcomingTasksStyle}>
                <div style={sectionHeaderStyle}>
                    <h2 style={sectionTitleStyle}>Upcoming Tasks</h2>
                    <button
                        style={{
                            ...buttonStyle,
                            background: "none",
                            color: "var(--color-primary-600)",
                            padding: "0.5rem 1rem",
                        }}
                    >
                        View All
                    </button>
                </div>
                <div style={taskListStyle}>
                    {upcomingTasks.map((task) => (
                        <div
                            key={task.id}
                            style={taskItemStyle}
                            onMouseEnter={(e) => {
                                Object.assign(
                                    e.currentTarget.style,
                                    taskItemHoverStyle
                                );
                            }}
                            onMouseLeave={(e) => {
                                Object.assign(
                                    e.currentTarget.style,
                                    taskItemStyle
                                );
                            }}
                        >
                            <div style={taskCheckboxStyle} />
                            <div style={taskContentStyle}>
                                <div style={taskTitleStyle}>{task.title}</div>
                                <div style={taskTimeStyle}>{task.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Achievements Section */}
            <div style={achievementsSectionStyle}>
                <div style={sectionHeaderStyle}>
                    <h2 style={sectionTitleStyle}>Recent Achievements</h2>
                </div>
                <div style={achievementsGridStyle}>
                    {achievements.map((achievement) => (
                        <div
                            key={achievement.id}
                            style={achievementCardStyle}
                            onMouseEnter={(e) => {
                                Object.assign(
                                    e.currentTarget.style,
                                    achievementCardHoverStyle
                                );
                            }}
                            onMouseLeave={(e) => {
                                Object.assign(
                                    e.currentTarget.style,
                                    achievementCardStyle
                                );
                            }}
                        >
                            {achievement.icon}
                            <h3 style={achievementTitleStyle}>
                                {achievement.title}
                            </h3>
                            <p style={achievementDescriptionStyle}>
                                {achievement.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Productivity Calendar Section */}
            <div style={calendarSectionStyle}>
                <div style={sectionHeaderStyle}>
                    <h2 style={sectionTitleStyle}>Productivity Calendar</h2>
                    <div style={calendarNavigationStyle}>
                        <button style={calendarButtonStyle}>
                            <ChevronLeftIcon
                                style={{ width: "1.25rem", height: "1.25rem" }}
                            />
                        </button>
                        <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                            March 2024
                        </span>
                        <button style={calendarButtonStyle}>
                            <ChevronRightIcon
                                style={{ width: "1.25rem", height: "1.25rem" }}
                            />
                        </button>
                    </div>
                </div>
                <div style={calendarGridStyle}>
                    {calendarDays.map((day) => (
                        <div
                            key={day.day}
                            style={calendarDayStyle}
                            onMouseEnter={(e) => {
                                Object.assign(
                                    e.currentTarget.style,
                                    calendarDayHoverStyle
                                );
                            }}
                            onMouseLeave={(e) => {
                                Object.assign(
                                    e.currentTarget.style,
                                    calendarDayStyle
                                );
                            }}
                        >
                            <div style={calendarDayNumberStyle}>{day.day}</div>
                            <div style={calendarDayStatsStyle}>
                                {day.focusTime}h focus
                                <br />
                                {day.tasks} tasks
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <DistractionLogger
                isOpen={isLoggerOpen}
                onClose={() => setIsLoggerOpen(false)}
                onLog={handleLogDistraction}
            />
        </div>
    );
}

function App() {
    const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/guides" element={<Guides />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/cookies" element={<Cookies />} />

                    {/* Protected Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            // <ProtectedRoute>
                            <div className="app-container">
                                <Header />
                                <div
                                    className={`app-content ${
                                        isNavbarCollapsed
                                            ? "collapsed-navbar"
                                            : "expanded-navbar"
                                    }`}
                                >
                                    <Navbar
                                        isCollapsed={isNavbarCollapsed}
                                        setIsCollapsed={setIsNavbarCollapsed}
                                    />
                                    <Dashboard />
                                </div>
                                <Footer />
                            </div>
                            // </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <ProtectedRoute>
                                <div className="app-container">
                                    <Header />
                                    <div
                                        className={`app-content ${
                                            isNavbarCollapsed
                                                ? "collapsed-navbar"
                                                : "expanded-navbar"
                                        }`}
                                    >
                                        <Navbar
                                            isCollapsed={isNavbarCollapsed}
                                            setIsCollapsed={
                                                setIsNavbarCollapsed
                                            }
                                        />
                                        <Settings />
                                    </div>
                                    <Footer />
                                </div>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/community"
                        element={
                            <ProtectedRoute>
                                <div className="app-container">
                                    <Header />
                                    <div
                                        className={`app-content ${
                                            isNavbarCollapsed
                                                ? "collapsed-navbar"
                                                : "expanded-navbar"
                                        }`}
                                    >
                                        <Navbar
                                            isCollapsed={isNavbarCollapsed}
                                            setIsCollapsed={
                                                setIsNavbarCollapsed
                                            }
                                        />
                                        <Community />
                                    </div>
                                    <Footer />
                                </div>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/resources"
                        element={
                            <ProtectedRoute>
                                <div className="app-container">
                                    <Header />
                                    <div
                                        className={`app-content ${
                                            isNavbarCollapsed
                                                ? "collapsed-navbar"
                                                : "expanded-navbar"
                                        }`}
                                    >
                                        <Navbar
                                            isCollapsed={isNavbarCollapsed}
                                            setIsCollapsed={
                                                setIsNavbarCollapsed
                                            }
                                        />
                                        <Resources />
                                    </div>
                                    <Footer />
                                </div>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/statistics"
                        element={
                            <ProtectedRoute>
                                <div className="app-container">
                                    <Header />
                                    <div
                                        className={`app-content ${
                                            isNavbarCollapsed
                                                ? "collapsed-navbar"
                                                : "expanded-navbar"
                                        }`}
                                    >
                                        <Navbar
                                            isCollapsed={isNavbarCollapsed}
                                            setIsCollapsed={
                                                setIsNavbarCollapsed
                                            }
                                        />
                                        <Statistics />
                                    </div>
                                    <Footer />
                                </div>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/focus-timer"
                        element={
                            <ProtectedRoute>
                                <div className="app-container">
                                    <Header />
                                    <div
                                        className={`app-content ${
                                            isNavbarCollapsed
                                                ? "collapsed-navbar"
                                                : "expanded-navbar"
                                        }`}
                                    >
                                        <Navbar
                                            isCollapsed={isNavbarCollapsed}
                                            setIsCollapsed={
                                                setIsNavbarCollapsed
                                            }
                                        />
                                        <FocusTimer />
                                    </div>
                                    <Footer />
                                </div>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/help-support"
                        element={
                            <ProtectedRoute>
                                <div className="app-container">
                                    <Header />
                                    <div
                                        className={`app-content ${
                                            isNavbarCollapsed
                                                ? "collapsed-navbar"
                                                : "expanded-navbar"
                                        }`}
                                    >
                                        <Navbar
                                            isCollapsed={isNavbarCollapsed}
                                            setIsCollapsed={
                                                setIsNavbarCollapsed
                                            }
                                        />
                                        <HelpSupport />
                                    </div>
                                    <Footer />
                                </div>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <div className="app-container">
                                    <Header />
                                    <div
                                        className={`app-content ${
                                            isNavbarCollapsed
                                                ? "collapsed-navbar"
                                                : "expanded-navbar"
                                        }`}
                                    >
                                        <Navbar
                                            isCollapsed={isNavbarCollapsed}
                                            setIsCollapsed={
                                                setIsNavbarCollapsed
                                            }
                                        />
                                        <Profile />
                                    </div>
                                    <Footer />
                                </div>
                            </ProtectedRoute>
                        }
                    />

                    {/* Redirect any unknown routes to the landing page */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
