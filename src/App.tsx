import { useState, useEffect } from "react";
import Header from "./components/Header";
import Timer from "./components/Timer";
import DistractionLogger from "./components/DistractionLogger";
import Stats from "./components/Stats";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import {
    ChartBarIcon,
    ClockIcon,
    CheckCircleIcon,
    PlayIcon,
    PlusIcon,
    BellAlertIcon,
} from "@heroicons/react/24/outline";

interface Distraction {
    id: string;
    timestamp: string;
    note: string;
    type: string;
    time: string;
}

function App() {
    const [distractions, setDistractions] = useState<Distraction[]>(() => {
        const saved = localStorage.getItem("distractions");
        return saved ? JSON.parse(saved) : [];
    });
    const [isLoggerOpen, setIsLoggerOpen] = useState(false);
    const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);

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

    return (
        <div className="app-container">
            <Header />
            <div
                className={`app-content ${
                    isNavbarCollapsed ? "collapsed-navbar" : "expanded-navbar"
                }`}
            >
                <Navbar
                    isCollapsed={isNavbarCollapsed}
                    setIsCollapsed={setIsNavbarCollapsed}
                />
                <main className="main-content">
                    {/* Welcome Section */}
                    <div className="welcome-section">
                        <div className="welcome-content">
                            <h1 className="welcome-title">
                                Welcome back,{" "}
                                <span className="text-primary-600">User</span>
                            </h1>
                            <p className="welcome-subtitle">
                                Ready to boost your productivity today?
                            </p>
                        </div>
                        <div className="welcome-actions">
                            <button className="btn-primary">
                                <PlayIcon className="h-5 w-5" />
                                <span>Start Focus Session</span>
                            </button>
                            <button className="btn-secondary">
                                <PlusIcon className="h-5 w-5" />
                                <span>Add New Task</span>
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="quick-stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">
                                <ChartBarIcon className="h-4 w-4" />
                            </div>
                            <div className="stat-content">
                                <h3 className="stat-title">Focus Time</h3>
                                <p className="stat-value">2h 30m</p>
                                <p className="stat-change positive">
                                    +15% from yesterday
                                </p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">
                                <ClockIcon className="h-4 w-4" />
                            </div>
                            <div className="stat-content">
                                <h3 className="stat-title">Sessions</h3>
                                <p className="stat-value">4</p>
                                <p className="stat-change">2 completed today</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">
                                <CheckCircleIcon className="h-4 w-4" />
                            </div>
                            <div className="stat-content">
                                <h3 className="stat-title">Tasks Completed</h3>
                                <p className="stat-value">12</p>
                                <p className="stat-change positive">
                                    80% completion rate
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="main-content-grid">
                        <div className="timer-section">
                            <Timer
                                onDistraction={() => setIsLoggerOpen(true)}
                            />
                        </div>
                        <div className="stats-section">
                            <Stats distractions={distractions} />
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="recent-activity">
                        <div className="section-header">
                            <h2 className="section-title">Recent Activity</h2>
                            <button className="btn-text">View All</button>
                        </div>
                        <div className="activity-list">
                            {distractions.map((distraction, index) => (
                                <div key={index} className="activity-item">
                                    <div className="activity-icon">
                                        <BellAlertIcon className="h-4 w-4" />
                                    </div>
                                    <div className="activity-content">
                                        <p className="activity-text">
                                            {distraction.type} distraction
                                        </p>
                                        <p className="activity-time">
                                            {distraction.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tips Section */}
                    <div className="tips-section">
                        <h2 className="tips-heading">Productivity Tips</h2>
                        <div className="tips-grid">
                            <div className="tip-card tip-card-primary-border">
                                <h3 className="tip-card-heading">
                                    Take Regular Breaks
                                </h3>
                                <p className="tip-card-paragraph">
                                    Remember to take short breaks between focus
                                    sessions to maintain productivity.
                                </p>
                            </div>
                            <div className="tip-card tip-card-secondary-border">
                                <h3 className="tip-card-heading">
                                    Track Your Distractions
                                </h3>
                                <p className="tip-card-paragraph">
                                    Log your distractions to identify patterns
                                    and improve your focus.
                                </p>
                            </div>
                            <div className="tip-card tip-card-cyan-border">
                                <h3 className="tip-card-heading">
                                    Set Clear Goals
                                </h3>
                                <p className="tip-card-paragraph">
                                    Define specific goals for each focus session
                                    to stay motivated.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
            <DistractionLogger
                isOpen={isLoggerOpen}
                onClose={() => setIsLoggerOpen(false)}
                onLog={handleLogDistraction}
            />
        </div>
    );
}

export default App;
