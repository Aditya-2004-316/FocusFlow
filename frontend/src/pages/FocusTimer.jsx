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
        minHeight: "100vh",
        padding: "4rem 1.75rem 4rem",
        background: "var(--color-white)",
        color: "var(--color-gray-900)",
    };

    const innerStyle = {
        maxWidth: "1120px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "2.75rem",
    };

    const headerStyle = {
        background: "var(--panel-bg)",
        borderRadius: "1.5rem",
        border: "1px solid var(--input-border)",
        padding: "2.75rem",
        boxShadow: "var(--shadow-lg)",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
    };

    const titleStyle = {
        fontSize: "2.35rem",
        fontWeight: 700,
        lineHeight: 1.2,
        background: "linear-gradient(to right, #38bdf8, #818cf8)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        margin: 0,
    };

    const subtitleStyle = {
        fontSize: "1.08rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.75,
        maxWidth: "44rem",
    };

    const chipRowStyle = {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.65rem",
    };

    const chipStyle = {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        background: "var(--color-primary-100)",
        color: "var(--color-primary-700)",
        padding: "0.45rem 0.85rem",
        borderRadius: "9999px",
        fontSize: "0.85rem",
        fontWeight: 600,
    };

    const cardStyle = {
        background: "var(--panel-bg)",
        borderRadius: "1.1rem",
        padding: "2rem",
        border: "1px solid var(--input-border)",
        boxShadow: "var(--shadow-lg)",
        marginBottom: "1.5rem",
    };

    const timerContainerStyle = {
        display: "grid",
        gap: "2rem",
        justifyItems: "center",
    };

    const timerDisplayStyle = {
        fontSize: "4.5rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        letterSpacing: "0.08em",
        textAlign: "center",
    };

    const timerControlsStyle = {
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
        flexWrap: "wrap",
    };

    const timerButtonStyle = {
        padding: "0.85rem 2.3rem",
        fontSize: "1rem",
        fontWeight: 600,
        borderRadius: "9999px",
        border: "1px solid var(--color-primary-200)",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.6rem",
    };

    const primaryButtonStyle = {
        ...timerButtonStyle,
        background: "linear-gradient(to right, #38bdf8, #60a5fa)",
        border: "none",
        color: "#0f172a",
        boxShadow: "0 18px 35px -20px rgba(56, 189, 248, 0.65)",
    };

    const secondaryButtonStyle = {
        ...timerButtonStyle,
        background: "var(--color-primary-100)",
        color: "var(--color-primary-700)",
    };

    const sessionGridStyle = {
        display: "grid",
        gap: "1.25rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        marginTop: "1.5rem",
    };

    const sessionItemStyle = {
        background: "var(--color-gray-50)",
        borderRadius: "0.85rem",
        padding: "1.25rem 1.35rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.45rem",
        border: "1px solid var(--color-gray-200)",
    };

    const sessionLabelStyle = {
        fontSize: "0.85rem",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        color: "var(--color-gray-600)",
        fontWeight: 600,
    };

    const sessionValueStyle = {
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
    };

    const featuresGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.5rem",
    };

    const featureCardStyle = {
        background: "var(--panel-bg)",
        borderRadius: "0.95rem",
        padding: "1.7rem",
        border: "1px solid var(--input-border)",
        boxShadow: "var(--shadow-md)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "0.85rem",
    };

    const featureIconStyle = {
        color: "var(--color-primary-500)",
        margin: "0 auto",
        width: "3.1rem",
        height: "3.1rem",
    };

    const featureTitleStyle = {
        fontSize: "1.05rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    };

    const featureDescriptionStyle = {
        fontSize: "0.9rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.6,
    };

    const contentSectionStyle = {
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
    };

    const sectionTitleStyle = {
        fontSize: "1.55rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "0.4rem",
    };

    const sectionDescriptionStyle = {
        fontSize: "0.98rem",
        color: "var(--color-gray-600)",
        marginBottom: "1rem",
        lineHeight: 1.7,
    };

    const presetGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.5rem",
    };

    const presetCardStyle = {
        background: "var(--panel-bg)",
        borderRadius: "0.9rem",
        padding: "1.75rem",
        border: "1px solid var(--input-border)",
        boxShadow: "var(--shadow-md)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
    };

    const presetIconStyle = {
        width: "2.8rem",
        height: "2.8rem",
        borderRadius: "0.85rem",
        background: "var(--color-primary-100)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.55rem",
        color: "var(--color-primary-600)",
    };

    const presetHeadingStyle = {
        fontSize: "1.08rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    };

    const presetMetaStyle = {
        display: "flex",
        gap: "0.75rem",
        flexWrap: "wrap",
        fontSize: "0.85rem",
        fontWeight: 600,
        color: "var(--color-primary-600)",
    };

    const presetDescriptionStyle = {
        fontSize: "0.9rem",
        color: "var(--color-gray-600)",
        lineHeight: 1.65,
    };

    const ritualListStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.5rem",
        marginTop: "1.5rem",
    };

    const ritualCardStyle = {
        background: "rgba(17, 24, 39, 0.68)",
        borderRadius: "0.9rem",
        padding: "1.6rem",
        border: "1px solid rgba(148, 163, 184, 0.18)",
        boxShadow: "0 20px 45px -30px rgba(8, 47, 73, 0.6)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
    };

    const ritualTitleStyle = {
        fontSize: "1.05rem",
        fontWeight: 600,
        color: "#f1f5f9",
    };

    const ritualDescriptionStyle = {
        fontSize: "0.9rem",
        color: "#cbd5f5",
        lineHeight: 1.65,
    };

    const ritualStepListStyle = {
        paddingLeft: "1.25rem",
        color: "#9fb6ff",
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
        background: "rgba(56, 189, 248, 0.08)",
        borderRadius: "0.85rem",
        padding: "1.35rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        border: "1px solid rgba(56, 189, 248, 0.25)",
    };

    const strategyTitleStyle = {
        fontSize: "1.02rem",
        fontWeight: 600,
        color: "#f1f5f9",
    };

    const strategyDescriptionStyle = {
        fontSize: "0.9rem",
        color: "#cbd5f5",
        lineHeight: 1.65,
    };

    const heroBadges = [
        "Adaptive presets",
        "Intentional breaks",
        "Ritual-driven focus",
        "Energy-aware planning",
    ];

    const featureCards = [
        {
            title: "Focus music",
            description: "Play ambient soundscapes that reinforce deep work blocks.",
            Icon: MusicalNoteIcon,
        },
        {
            title: "Smart notifications",
            description: "Stay on track with gentle reminders at the right moments.",
            Icon: BellIcon,
        },
        {
            title: "Session analytics",
            description: "Review session-by-session stats without leaving the timer.",
            Icon: ChartBarIcon,
        },
        {
            title: "Quick settings",
            description: "Adjust durations, sounds, and cycles while keeping momentum.",
            Icon: Cog6ToothIcon,
        },
    ];

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
            <div style={innerStyle}>
                <section style={headerStyle}>
                    <div>
                        <h1 style={titleStyle}>Focus Timer</h1>
                        <p style={subtitleStyle}>
                            Build streaks that stick with adaptive focus sessions, intentional breaks,
                            and quick post-block reflections.
                        </p>
                    </div>
                    <div style={chipRowStyle}>
                        {heroBadges.map((badge) => (
                            <span key={badge} style={chipStyle}>
                                {badge}
                            </span>
                        ))}
                    </div>
                </section>

                <section style={cardStyle}>
                    <div style={timerContainerStyle}>
                        <div style={timerDisplayStyle}>{formatTime(timeLeft)}</div>
                        <div style={timerControlsStyle}>
                            {isRunning ? (
                                <button style={primaryButtonStyle} onClick={handlePause}>
                                    <PauseIcon className="h-5 w-5" /> Pause
                                </button>
                            ) : (
                                <button style={primaryButtonStyle} onClick={handleStart}>
                                    <PlayIcon className="h-5 w-5" /> Start
                                </button>
                            )}
                            <button style={secondaryButtonStyle} onClick={handleStop}>
                                <StopIcon className="h-5 w-5" /> Stop
                            </button>
                            <button style={secondaryButtonStyle} onClick={handleReset}>
                                <ArrowPathIcon className="h-5 w-5" /> Reset
                            </button>
                        </div>
                        <div style={sessionGridStyle}>
                            <div style={sessionItemStyle}>
                                <span style={sessionLabelStyle}>Current session</span>
                                <span style={sessionValueStyle}>{currentSession}</span>
                            </div>
                            <div style={sessionItemStyle}>
                                <span style={sessionLabelStyle}>Completed sessions</span>
                                <span style={sessionValueStyle}>{completedSessions}</span>
                            </div>
                            <div style={sessionItemStyle}>
                                <span style={sessionLabelStyle}>Mode</span>
                                <span style={sessionValueStyle}>{isBreak ? "Break" : "Focus"}</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={cardStyle}>
                    <div style={contentSectionStyle}>
                        <h2 style={sectionTitleStyle}>Focus companion tools</h2>
                        <p style={sectionDescriptionStyle}>
                            Layer in exactly what you need mid-session—from immersive soundscapes to
                            quick configuration tweaks—without losing momentum.
                        </p>
                        <div style={featuresGridStyle}>
                            {featureCards.map(({ title, description, Icon }) => (
                                <div key={title} style={featureCardStyle}>
                                    <Icon style={featureIconStyle} />
                                    <div style={featureTitleStyle}>{title}</div>
                                    <p style={featureDescriptionStyle}>{description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={cardStyle}>
                    <div style={contentSectionStyle}>
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
                    </div>
                </section>

                <section style={cardStyle}>
                    <div style={contentSectionStyle}>
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
                    </div>
                </section>

                <section style={cardStyle}>
                    <div style={contentSectionStyle}>
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
                    </div>
                </section>
            </div>
        </div>
    );
};

export default FocusTimer;
