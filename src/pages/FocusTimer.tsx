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
import type { CSSProperties } from "react";

interface TimerSettings {
    focusDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
    sessionsUntilLongBreak: number;
}

const FocusTimer = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [completedSessions, setCompletedSessions] = useState(0);
    const [currentSession, setCurrentSession] = useState(1);
    const [showSettings, setShowSettings] = useState(false);

    const [settings, setSettings] = useState<TimerSettings>({
        focusDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        sessionsUntilLongBreak: 4,
    });

    useEffect(() => {
        let interval: number;

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
        if (!isBreak) {
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

    const formatTime = (seconds: number): string => {
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
        setTimeLeft(settings.focusDuration * 60);
        setIsBreak(false);
        setCurrentSession(1);
        setCompletedSessions(0);
    };

    const containerStyle: CSSProperties = {
        minWidth: "64rem",
        margin: "2rem auto",
        padding: "0 1rem",
    };

    const headerStyle: CSSProperties = {
        marginBottom: "2rem",
        textAlign: "center",
    };

    const titleStyle: CSSProperties = {
        fontSize: "1.875rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const descriptionStyle: CSSProperties = {
        fontSize: "1rem",
        color: "var(--color-gray-600)",
    };

    const timerContainerStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "1rem",
        padding: "2rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        marginBottom: "2rem",
        textAlign: "center",
    };

    const timerDisplayStyle: CSSProperties = {
        fontSize: "6rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        marginBottom: "2rem",
        fontFamily: "monospace",
    };

    const controlsContainerStyle: CSSProperties = {
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
        marginBottom: "2rem",
    };

    const buttonStyle: CSSProperties = {
        padding: "0.75rem 1.5rem",
        borderRadius: "0.5rem",
        fontSize: "1rem",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
    };

    const primaryButtonStyle: CSSProperties = {
        ...buttonStyle,
        backgroundColor: "var(--color-primary-600)",
        color: "var(--color-white)",
    };

    const secondaryButtonStyle: CSSProperties = {
        ...buttonStyle,
        backgroundColor: "var(--color-gray-100)",
        color: "var(--color-gray-700)",
    };

    const sessionInfoStyle: CSSProperties = {
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        marginBottom: "2rem",
    };

    const sessionItemStyle: CSSProperties = {
        textAlign: "center",
    };

    const sessionLabelStyle: CSSProperties = {
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
        marginBottom: "0.25rem",
    };

    const sessionValueStyle: CSSProperties = {
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
    };

    const featuresContainerStyle: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1.5rem",
    };

    const featureCardStyle: CSSProperties = {
        background: "var(--color-white)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
    };

    const featureCardHoverStyle: CSSProperties = {
        transform: "translateY(-2px)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    };

    const featureIconStyle: CSSProperties = {
        width: "2rem",
        height: "2rem",
        color: "var(--color-primary-600)",
        margin: "0 auto 1rem",
    };

    const featureTitleStyle: CSSProperties = {
        fontSize: "1rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const featureDescriptionStyle: CSSProperties = {
        fontSize: "0.875rem",
        color: "var(--color-gray-600)",
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Focus Timer</h1>
                <p style={descriptionStyle}>
                    Stay focused and boost your productivity with our Pomodoro
                    timer
                </p>
            </div>

            <div style={timerContainerStyle}>
                <div style={timerDisplayStyle}>{formatTime(timeLeft)}</div>
                <div style={controlsContainerStyle}>
                    {!isRunning ? (
                        <button
                            style={primaryButtonStyle}
                            onClick={handleStart}
                        >
                            <PlayIcon
                                style={{ width: "1.25rem", height: "1.25rem" }}
                            />
                            Start
                        </button>
                    ) : (
                        <button
                            style={primaryButtonStyle}
                            onClick={handlePause}
                        >
                            <PauseIcon
                                style={{ width: "1.25rem", height: "1.25rem" }}
                            />
                            Pause
                        </button>
                    )}
                    <button style={secondaryButtonStyle} onClick={handleReset}>
                        <ArrowPathIcon
                            style={{ width: "1.25rem", height: "1.25rem" }}
                        />
                        Reset
                    </button>
                    <button style={secondaryButtonStyle} onClick={handleStop}>
                        <StopIcon
                            style={{ width: "1.25rem", height: "1.25rem" }}
                        />
                        Stop
                    </button>
                </div>

                <div style={sessionInfoStyle}>
                    <div style={sessionItemStyle}>
                        <div style={sessionLabelStyle}>Current Session</div>
                        <div style={sessionValueStyle}>{currentSession}</div>
                    </div>
                    <div style={sessionItemStyle}>
                        <div style={sessionLabelStyle}>Completed Sessions</div>
                        <div style={sessionValueStyle}>{completedSessions}</div>
                    </div>
                    <div style={sessionItemStyle}>
                        <div style={sessionLabelStyle}>Mode</div>
                        <div style={sessionValueStyle}>
                            {isBreak ? "Break" : "Focus"}
                        </div>
                    </div>
                </div>
            </div>

            <div style={featuresContainerStyle}>
                <div
                    style={featureCardStyle}
                    onMouseEnter={(e) => {
                        Object.assign(
                            e.currentTarget.style,
                            featureCardHoverStyle
                        );
                    }}
                    onMouseLeave={(e) => {
                        Object.assign(e.currentTarget.style, featureCardStyle);
                    }}
                >
                    <MusicalNoteIcon style={featureIconStyle} />
                    <div style={featureTitleStyle}>Focus Music</div>
                    <div style={featureDescriptionStyle}>
                        Play ambient sounds to enhance your focus
                    </div>
                </div>
                <div
                    style={featureCardStyle}
                    onMouseEnter={(e) => {
                        Object.assign(
                            e.currentTarget.style,
                            featureCardHoverStyle
                        );
                    }}
                    onMouseLeave={(e) => {
                        Object.assign(e.currentTarget.style, featureCardStyle);
                    }}
                >
                    <BellIcon style={featureIconStyle} />
                    <div style={featureTitleStyle}>Notifications</div>
                    <div style={featureDescriptionStyle}>
                        Get notified when your session ends
                    </div>
                </div>
                <div
                    style={featureCardStyle}
                    onMouseEnter={(e) => {
                        Object.assign(
                            e.currentTarget.style,
                            featureCardHoverStyle
                        );
                    }}
                    onMouseLeave={(e) => {
                        Object.assign(e.currentTarget.style, featureCardStyle);
                    }}
                >
                    <ChartBarIcon style={featureIconStyle} />
                    <div style={featureTitleStyle}>Statistics</div>
                    <div style={featureDescriptionStyle}>
                        Track your productivity over time
                    </div>
                </div>
                <div
                    style={featureCardStyle}
                    onMouseEnter={(e) => {
                        Object.assign(
                            e.currentTarget.style,
                            featureCardHoverStyle
                        );
                    }}
                    onMouseLeave={(e) => {
                        Object.assign(e.currentTarget.style, featureCardStyle);
                    }}
                    onClick={() => setShowSettings(!showSettings)}
                >
                    <Cog6ToothIcon style={featureIconStyle} />
                    <div style={featureTitleStyle}>Settings</div>
                    <div style={featureDescriptionStyle}>
                        Customize your timer preferences
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FocusTimer;
