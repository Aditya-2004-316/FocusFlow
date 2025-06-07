import { useState, useEffect } from "react";
import { PlayIcon, PauseIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import type { CSSProperties } from "react";

interface TimerProps {
    onDistraction: () => void;
}

const Timer: React.FC<TimerProps> = ({ onDistraction }) => {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const totalTime = isBreak ? 5 * 60 : 25 * 60;
    const progress = ((totalTime - timeLeft) / totalTime) * 100;

    useEffect(() => {
        let interval: number | undefined;

        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((time) => time - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            setIsBreak(!isBreak);
            setTimeLeft(isBreak ? 25 * 60 : 5 * 60);
        }

        return () => clearInterval(interval);
    }, [isRunning, timeLeft, isBreak]);

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    const containerStyle: CSSProperties = {
        backgroundColor: "var(--color-white)",
        borderRadius: "1rem",
        boxShadow: "var(--shadow-soft)",
        padding: "2rem",
        borderLeft: "4px solid var(--color-primary-400)",
        transform:
            "translate(0, 0) rotate(0deg) skewX(0deg) skewY(0deg) scaleX(1) scaleY(1)",
        transition: "all 300ms ease-in-out",
    };

    const circleWrapperStyle: CSSProperties = {
        position: "relative",
        width: "16rem",
        height: "16rem",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "2rem",
    };

    const circleBgStyle: CSSProperties = {
        position: "absolute",
        inset: 0,
        borderRadius: "9999px",
        border: "8px solid var(--color-gray-100)",
    };

    const circleProgressStyle: CSSProperties = {
        position: "absolute",
        inset: 0,
        borderRadius: "9999px",
        border: "8px solid transparent",
        borderTopColor: isBreak
            ? "var(--color-secondary-500)"
            : "var(--color-primary-500)",
        borderRightColor: isBreak
            ? "var(--color-secondary-500)"
            : "var(--color-primary-500)",
        transform: `rotate(${progress * 3.6}deg)`,
        transition: "transform 1s linear",
    };

    const displayWrapperStyle: CSSProperties = {
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    };

    const statusStyle: CSSProperties = {
        fontSize: "1.25rem",
        fontWeight: 600,
        transition: "colors 300ms ease-in-out",
        color: isBreak
            ? "var(--color-secondary-600)"
            : "var(--color-primary-600)",
    };

    const timeStyle: CSSProperties = {
        fontSize: "3rem",
        fontFamily: "monospace",
        fontWeight: 700,
        transition: "colors 300ms ease-in-out",
        color: isBreak
            ? "var(--color-secondary-500)"
            : "var(--color-primary-500)",
    };

    const buttonsWrapperStyle: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        maxWidth: "20rem",
        marginLeft: "auto",
        marginRight: "auto",
    };

    const getButtonStyle = (
        type: "primary" | "secondary" | "reset" | "distraction"
    ): CSSProperties => ({
        padding: "1rem",
        borderRadius: "0.75rem",
        color: "var(--color-white)",
        transition: "all 300ms ease-in-out",
        boxShadow: "var(--shadow-lg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        transform:
            "translate(0, 0) rotate(0deg) skewX(0deg) skewY(0deg) scaleX(1) scaleY(1)",
        backgroundColor:
            type === "primary"
                ? "var(--color-primary-500)"
                : type === "secondary"
                ? "var(--color-secondary-500)"
                : type === "reset"
                ? "var(--color-gray-100)"
                : "var(--color-red-500)",
        cursor: "pointer",
        border: "none",
    });

    return (
        <div style={containerStyle}>
            <div style={circleWrapperStyle}>
                <div style={circleBgStyle}></div>
                <div style={circleProgressStyle}></div>
                <div style={displayWrapperStyle}>
                    <div style={statusStyle}>
                        {isBreak ? "Break Time" : "Focus Time"}
                    </div>
                    <div style={timeStyle}>{formatTime(timeLeft)}</div>
                </div>
            </div>

            <div style={buttonsWrapperStyle}>
                <button
                    onClick={toggleTimer}
                    style={getButtonStyle(isBreak ? "secondary" : "primary")}
                >
                    {isRunning ? (
                        <>
                            <PauseIcon
                                style={{ height: "1.25rem", width: "1.25rem" }}
                            />
                            <span style={{ fontWeight: 500 }}>Pause Timer</span>
                        </>
                    ) : (
                        <>
                            <PlayIcon
                                style={{ height: "1.25rem", width: "1.25rem" }}
                            />
                            <span style={{ fontWeight: 500 }}>Start Timer</span>
                        </>
                    )}
                </button>
                <button onClick={resetTimer} style={getButtonStyle("reset")}>
                    <ArrowPathIcon
                        style={{ height: "1.25rem", width: "1.25rem" }}
                    />
                    <span
                        style={{
                            fontWeight: 500,
                            color: "var(--color-gray-600)",
                        }}
                    >
                        Reset Timer
                    </span>
                </button>
                <button
                    onClick={onDistraction}
                    style={getButtonStyle("distraction")}
                >
                    <span style={{ fontWeight: 500 }}>Log Distraction</span>
                </button>
            </div>
        </div>
    );
};

export default Timer;
