import React, { useState, useEffect } from "react";
import {
    PlayIcon,
    PauseIcon,
    ArrowPathIcon,
    StopIcon,
    MusicalNoteIcon,
    BellIcon,
    ChartBarIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const FocusTimer = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [completedSessions, setCompletedSessions] = useState(0);
    const [currentSession, setCurrentSession] = useState(1);
    const [showSettings, setShowSettings] = useState(false);

    const [settings, setSettings] = useState({
        focusDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        sessionsUntilLongBreak: 4,
    });

    useEffect(() => {
        let interval;

        if (isRunning && timeLeft > 0) {
            interval = window.setInterval(() => {
                setTimeLeft((time) => time - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleTimerComplete();
        }

        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

    const handleTimerComplete = () => {
        if (isBreak) {
            setCompletedSessions((prev) => prev + 1);
            if (currentSession % settings.sessionsUntilLongBreak === 0) {
                setTimeLeft(settings.longBreakDuration * 60);
            } else {
                setTimeLeft(settings.shortBreakDuration * 60);
            }
            setIsBreak(true);
        } else {
            setTimeLeft(settings.focusDuration * 60);
            setIsBreak(false);
            setCurrentSession((prev) => prev + 1);
        }
        setIsRunning(false);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };

    const handleStart = () => {
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft(settings.focusDuration * 60);
        setIsBreak(false);
    };

    const handleStop = () => {
        setIsRunning(false);
        // Only stop the timer, don't reset it
    };

    const containerStyle = {
        maxWidth: "76rem",
        margin: "0 auto",
        padding: "2rem",
    };

    const headerStyle = {
        background:
            "linear-gradient(to right, var(--color-primary-500), var(--color-cyan-400))",
        borderRadius: "1rem",
        padding: "2rem",
        marginBottom: "2rem",
        color: "var(--color-white)",
        boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    };

    const titleStyle = {
        fontSize: "2rem",
        fontWeight: 700,
        marginBottom: "0.5rem",
    };

    const subtitleStyle = {
        fontSize: "1.125rem",
        opacity: 0.9,
        marginBottom: "1.5rem",
    };

    const cardStyle = {
        background: "var(--panel-bg)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        border: "1px solid var(--color-gray-200)",
        marginBottom: "1.5rem",
    };

    const timerControlsStyle = {
        display: "flex",
        justifyContent: "center",
        gap: "1.25rem",
        margin: "2rem 0 1.5rem 0",
        flexWrap: "wrap",
    };

    const timerButtonStyle = {
        padding: "0.75rem 2rem",
        fontSize: "1.125rem",
        fontWeight: 600,
        borderRadius: "0.5rem",
        border: "none",
        cursor: "pointer",
        transition: "background 0.2s, color 0.2s",
        marginBottom: "0.5rem",
    };

    const primaryButtonStyle = {
        ...timerButtonStyle,
        background: "var(--color-primary-600)",
        color: "#fff",
    };
    const secondaryButtonStyle = {
        ...timerButtonStyle,
        background: "var(--color-primary-600)",
        color: "#fff",
    };

    const featuresGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2rem",
    };

    const featureIconStyle = {
        color: "var(--color-primary-600)",
        margin: "0 auto 1rem",
        width: "3.5rem",
        height: "3.5rem",
        display: "block",
    };

    const contentSectionStyle = {
        margin: "2.5rem 0",
    };

    const sectionTitleStyle = {
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const sectionDescriptionStyle = {
        fontSize: "0.95rem",
        color: "var(--color-gray-600)",
        marginBottom: "1.5rem",
        lineHeight: 1.6,
    };

    const presetGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "1.5rem",
    };

    const presetCardStyle = {
        background: "var(--panel-bg)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        border: "1px solid var(--color-gray-200)",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
    };

    const presetIconStyle = {
        width: "2.75rem",
        height: "2.75rem",
        borderRadius: "0.75rem",
        background: "var(--color-primary-50)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5rem",
        color: "var(--color-primary-600)",
    };

    const presetHeadingStyle = {
        fontSize: "1.05rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    };

    const presetMetaStyle = {
        display: "flex",
        gap: "0.75rem",
        flexWrap: "wrap",
        fontSize: "0.85rem",
        fontWeight: 600,
        color: "var(--color-primary-700)",
    };

    const presetDescriptionStyle = {
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.6,
    };

    const ritualListStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.5rem",
        marginTop: "1.5rem",
    };

    const ritualCardStyle = {
        background: "var(--panel-bg)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        border: "1px solid var(--color-gray-200)",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
    };

    const ritualTitleStyle = {
        fontSize: "1rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    };

    const ritualDescriptionStyle = {
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.6,
    };

    const ritualStepListStyle = {
        paddingLeft: "1.25rem",
        color: "var(--color-gray-600)",
        fontSize: "0.85rem",
        lineHeight: 1.6,
        margin: 0,
    };

    const strategyGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.5rem",
        marginTop: "1.5rem",
    };

    const strategyCardStyle = {
        background: "var(--color-gray-50)",
        borderRadius: "0.75rem",
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        border: "1px solid var(--color-gray-200)",
    };

    const strategyTitleStyle = {
        fontSize: "1rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    };

    const strategyDescriptionStyle = {
        fontSize: "0.85rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.6,
    };

    const recommendedPresets = [
        {
            title: "Deep focus 52/17",
            focus: "52 min focus",
            break: "17 min break",
            description:
                "Ideal for analytical or creative work that benefits from a long runway and a mindful reset.",
            icon: "🎧",
        },
        {
            title: "Momentum sprints",
            focus: "35 min focus",
            break: "7 min break",
            description:
                "Keeps energy high during packed schedules. Use the short reset to log quick notes and hydrate.",
            icon: "⚡",
        },
        {
            title: "Recharge cycles",
            focus: "25 min focus",
            break: "10 min break",
            description:
                "Pair with light stretching or a walk. Perfect for regaining focus after meetings or context switches.",
            icon: "🌿",
        },
        {
            title: "Creative build",
            focus: "90 min focus",
            break: "20 min break",
            description:
                "Block for deep creation sessions. Use the extended break for reflection, sketching, or journaling.",
            icon: "🛠️",
        },
    ];

    const focusRituals = [
        {
            title: "Pre-session checklist",
            description:
                "Prime your environment and brain before you hit start.",
            steps: [
                "Declutter workspace and close unrelated tabs",
                "Write down the one outcome you want from this block",
                "Cue your focus soundtrack or ambient noise",
            ],
        },
        {
            title: "Break reset routine",
            description:
                "Turn breaks into intentional recovery moments.",
            steps: [
                "Stand up and stretch or walk to adjust posture",
                "Scan for distractions to log or batch later",
                "Take three deep breaths before resuming",
            ],
        },
        {
            title: "Session debrief",
            description:
                "End strong by capturing momentum and clearing your head.",
            steps: [
                "Note what moved forward and what’s blocked",
                "Queue the next action or resource you need",
                "Celebrate the win with a quick gratitude jot",
            ],
        },
    ];

    const recoveryStrategies = [
        {
            title: "Energy guardrails",
            description:
                "Match your toughest work to natural energy peaks and avoid heavy tasks during dips.",
        },
        {
            title: "Context batching",
            description:
                "Group similar tasks into the same session preset to reduce ramp-up costs and mental load.",
        },
        {
            title: "Movement anchors",
            description:
                "Attach a quick mobility routine to every second break to keep blood flowing and focus sharp.",
        },
        {
            title: "Evening shutdown",
            description:
                "Schedule a final 10-minute review to park ideas and transition out of work mode with less friction.",
        },
    ];

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Focus Timer</h1>
                <p style={subtitleStyle}>
                    Stay focused and boost your productivity with our Pomodoro
                    timer
                </p>
            </div>

            <div className="timer-display">
                <span className="timer-time">{formatTime(timeLeft)}</span>
            </div>

            <div className="timer-controls" style={timerControlsStyle}>
                {isRunning ? (
                    <button style={primaryButtonStyle} onClick={handlePause}>
                        <PauseIcon className="h-5 w-5" /> Pause
                    </button>
                ) : (
                    <button style={primaryButtonStyle} onClick={handleStart}>
                        <PlayIcon className="h-5 w-5" /> Start
                    </button>
                )}
                <button style={primaryButtonStyle} onClick={handleStop}>
                    <StopIcon className="h-5 w-5" /> Stop
                </button>
                <button style={primaryButtonStyle} onClick={handleReset}>
                    <ArrowPathIcon className="h-5 w-5" /> Reset
                </button>
            </div>

            <div
                className="session-info"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "2rem",
                    marginBottom: "2rem",
                }}
            >
                <div className="session-item" style={{ textAlign: "center" }}>
                    <div
                        className="session-label"
                        style={{
                            fontSize: "0.875rem",
                            color: "var(--color-gray-600)",
                            marginBottom: "0.25rem",
                        }}
                    >
                        Current Session
                    </div>
                    <div
                        className="session-value"
                        style={{
                            fontSize: "1.25rem",
                            fontWeight: 600,
                            color: "var(--color-gray-900)",
                        }}
                    >
                        {currentSession}
                    </div>
                </div>
                <div className="session-item" style={{ textAlign: "center" }}>
                    <div
                        className="session-label"
                        style={{
                            fontSize: "0.875rem",
                            color: "var(--color-gray-600)",
                            marginBottom: "0.25rem",
                        }}
                    >
                        Completed Sessions
                    </div>
                    <div
                        className="session-value"
                        style={{
                            fontSize: "1.25rem",
                            fontWeight: 600,
                            color: "var(--color-gray-900)",
                        }}
                    >
                        {completedSessions}
                    </div>
                </div>
                <div className="session-item" style={{ textAlign: "center" }}>
                    <div
                        className="session-label"
                        style={{
                            fontSize: "0.875rem",
                            color: "var(--color-gray-600)",
                            marginBottom: "0.25rem",
                        }}
                    >
                        Mode
                    </div>
                    <div
                        className="session-value"
                        style={{
                            fontSize: "1.25rem",
                            fontWeight: 600,
                            color: "var(--color-gray-900)",
                        }}
                    >
                        {isBreak ? "Break" : "Focus"}
                    </div>
                </div>
            </div>

            <div className="features-grid" style={featuresGridStyle}>
                <div className="feature-card" style={cardStyle}>
                    <MusicalNoteIcon style={featureIconStyle} />
                    <div
                        className="feature-title"
                        style={{
                            fontSize: "1rem",
                            fontWeight: 600,
                            color: "var(--color-gray-900)",
                            marginBottom: "0.5rem",
                        }}
                    >
                        Focus Music
                    </div>
                    <div
                        className="feature-description"
                        style={{
                            fontSize: "0.875rem",
                            color: "var(--color-gray-600)",
                        }}
                    >
                        Play ambient sounds to enhance your focus
                    </div>
                </div>
                <div className="feature-card" style={cardStyle}>
                    <BellIcon style={featureIconStyle} />
                    <div
                        className="feature-title"
                        style={{
                            fontSize: "1rem",
                            fontWeight: 600,
                            color: "var(--color-gray-900)",
                            marginBottom: "0.5rem",
                        }}
                    >
                        Notifications
                    </div>
                    <div
                        className="feature-description"
                        style={{
                            fontSize: "0.875rem",
                            color: "var(--color-gray-600)",
                        }}
                    >
                        Get notified when your session ends
                    </div>
                </div>
                <div className="feature-card" style={cardStyle}>
                    <ChartBarIcon style={featureIconStyle} />
                    <div
                        className="feature-title"
                        style={{
                            fontSize: "1rem",
                            fontWeight: 600,
                            color: "var(--color-gray-900)",
                            marginBottom: "0.5rem",
                        }}
                    >
                        Statistics
                    </div>
                    <div
                        className="feature-description"
                        style={{
                            fontSize: "0.875rem",
                            color: "var(--color-gray-600)",
                        }}
                    >
                        Track your productivity over time
                    </div>
                </div>
                <div
                    className="feature-card"
                    style={cardStyle}
                    onClick={() => setShowSettings(!showSettings)}
                >
                    <Cog6ToothIcon style={featureIconStyle} />
                    <div
                        className="feature-title"
                        style={{
                            fontSize: "1rem",
                            fontWeight: 600,
                            color: "var(--color-gray-900)",
                            marginBottom: "0.5rem",
                        }}
                    >
                        Settings
                    </div>
                    <div
                        className="feature-description"
                        style={{
                            fontSize: "0.875rem",
                            color: "var(--color-gray-600)",
                        }}
                    >
                        Customize your timer preferences
                    </div>
                </div>
            </div>

            <section style={contentSectionStyle}>
                <h2 style={sectionTitleStyle}>Recommended session presets</h2>
                <p style={sectionDescriptionStyle}>
                    Match your work style with Pomodoro-inspired presets designed for deep focus,
                    momentum, or creative sprints. Save your favorite combinations to jump in faster.
                </p>
                <div style={presetGridStyle}>
                    {recommendedPresets.map((preset, idx) => (
                        <div key={idx} style={presetCardStyle}>
                            <div style={presetIconStyle}>{preset.icon}</div>
                            <div style={presetHeadingStyle}>{preset.title}</div>
                            <div style={presetMetaStyle}>
                                <span>{preset.focus}</span>
                                <span>{preset.break}</span>
                            </div>
                            <p style={presetDescriptionStyle}>{preset.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section style={contentSectionStyle}>
                <h2 style={sectionTitleStyle}>Focus rituals</h2>
                <p style={sectionDescriptionStyle}>
                    Build a repeatable rhythm around every session—from the moment you hit start to
                    the way you close out. Rituals reduce ramp-up time and keep your brain in focus mode.
                </p>
                <div style={ritualListStyle}>
                    {focusRituals.map((ritual, idx) => (
                        <div key={idx} style={ritualCardStyle}>
                            <div style={ritualTitleStyle}>{ritual.title}</div>
                            <p style={ritualDescriptionStyle}>{ritual.description}</p>
                            <ul style={ritualStepListStyle}>
                                {ritual.steps.map((step, stepIdx) => (
                                    <li key={stepIdx}>{step}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section style={contentSectionStyle}>
                <h2 style={sectionTitleStyle}>Recovery strategies</h2>
                <p style={sectionDescriptionStyle}>
                    Sustain focus by steering your energy, batching similar work, and weaving movement
                    into your day. Try one new strategy each week and observe the impact.
                </p>
                <div style={strategyGridStyle}>
                    {recoveryStrategies.map((strategy, idx) => (
                        <div key={idx} style={strategyCardStyle}>
                            <div style={strategyTitleStyle}>{strategy.title}</div>
                            <p style={strategyDescriptionStyle}>{strategy.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default FocusTimer;
