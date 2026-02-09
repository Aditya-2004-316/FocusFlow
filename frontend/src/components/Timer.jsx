import { useState, useEffect } from "react";

import {
    PlayIcon,
    PauseIcon,
    ArrowPathIcon,
    BellAlertIcon,
    ClockIcon,
    StopIcon,
} from "@heroicons/react/24/outline";

export default function Timer({ onDistraction, onTimerUpdate }) {
    const [time, setTime] = useState(15 * 60); // 15 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [sessionDuration, setSessionDuration] = useState(15); // minutes
    const [customTime, setCustomTime] = useState("");

    useEffect(() => {
        let interval;

        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime((prev) => prev - 1);
            }, 1000);
        } else if (time === 0) {
            setIsRunning(false);
            setIsBreak(!isBreak);
            setTime(!isBreak ? sessionDuration * 60 : 5 * 60);
        }

        return () => clearInterval(interval);
    }, [isRunning, time, isBreak, sessionDuration]);

    // Notify parent component of timer state changes
    useEffect(() => {
        if (onTimerUpdate) {
            onTimerUpdate({
                timeLeft: time,
                totalTime: isBreak ? 5 * 60 : sessionDuration * 60,
                isRunning,
                sessionType: isBreak ? "break" : "focus",
            });
        }
    }, [time, isRunning, isBreak, sessionDuration, onTimerUpdate]);

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTime(sessionDuration * 60);
        setIsBreak(false);
    };

    const adjustTime = (minutes) => {
        if (!isRunning) {
            setSessionDuration(minutes);
            setTime(minutes * 60);
            setCustomTime(""); // Clear custom time when selecting preset
        }
    };

    const handleCustomTime = (e) => {
        e.preventDefault();
        const minutes = parseInt(customTime);
        if (minutes > 0 && minutes <= 180) {
            setSessionDuration(minutes);
            setTime(minutes * 60);
            setCustomTime("");
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div className="timer-container">
            <div className="timer-header">
                <h2 className="timer-title">
                    {isBreak ? "Break Time" : "Focus Session"}
                </h2>
                <p className="timer-description">
                    {isBreak
                        ? "Take a short break to recharge"
                        : "Stay focused and track your progress"}
                </p>
            </div>

            {!isBreak && !isRunning && (
                <div className="time-presets">
                    <div className="preset-buttons">
                        <button
                            onClick={() => adjustTime(15)}
                            className="preset-button"
                        >
                            15m
                        </button>
                        <button
                            onClick={() => adjustTime(30)}
                            className="preset-button"
                        >
                            30m
                        </button>
                        <button
                            onClick={() => adjustTime(45)}
                            className="preset-button"
                        >
                            45m
                        </button>
                        <button
                            onClick={() => adjustTime(60)}
                            className="preset-button"
                        >
                            60m
                        </button>
                    </div>
                    <form
                        onSubmit={handleCustomTime}
                        className="custom-time-form"
                    >
                        <input
                            type="number"
                            value={customTime}
                            onChange={(e) => setCustomTime(e.target.value)}
                            placeholder="Enter custom time in minutes (1-180)"
                            min="1"
                            max="180"
                            className="custom-time-input"
                        />
                        <button type="submit" className="set-button">
                            Set
                        </button>
                    </form>
                </div>
            )}

            <div className="timer-display">
                <div className="time-display">{formatTime(time)}</div>
                <div className="timer-label">{isBreak ? "Break" : "Focus"}</div>
            </div>

            <div className="timer-controls">
                <button
                    onClick={toggleTimer}
                    className="control-button primary"
                >
                    {isRunning ? (
                        <>
                            <PauseIcon className="icon" />
                            Pause
                        </>
                    ) : (
                        <>
                            <PlayIcon className="icon" />
                            Start
                        </>
                    )}
                </button>
                <button
                    onClick={resetTimer}
                    className="control-button secondary"
                >
                    <ArrowPathIcon className="icon" />
                    Reset
                </button>
                <button
                    onClick={onDistraction}
                    className="control-button secondary"
                >
                    <BellAlertIcon className="icon" />
                    Log Distraction
                </button>
            </div>

            <div className="timer-progress">
                {/* Progress bar can be added here */}
            </div>
        </div>
    );
}
