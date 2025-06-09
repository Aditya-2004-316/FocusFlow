import { useState, useEffect } from "react";
import {
    PlayIcon,
    PauseIcon,
    ArrowPathIcon,
    BellAlertIcon,
    ClockIcon,
    StopIcon,
} from "@heroicons/react/24/outline";

interface TimerProps {
    onDistraction: () => void;
}

export default function Timer({ onDistraction }: TimerProps) {
    const [time, setTime] = useState(15 * 60); // 15 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [sessionDuration, setSessionDuration] = useState(15); // minutes
    const [customTime, setCustomTime] = useState("");

    useEffect(() => {
        let interval: number;

        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime((prev) => prev - 1);
            }, 1000);
        } else if (time === 0) {
            setIsRunning(false);
            setIsBreak(!isBreak);
            setTime(isBreak ? sessionDuration * 60 : 5 * 60);
        }

        return () => clearInterval(interval);
    }, [isRunning, time, isBreak, sessionDuration]);

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTime(sessionDuration * 60);
        setIsBreak(false);
    };

    const adjustTime = (minutes: number) => {
        if (!isRunning) {
            setSessionDuration(minutes);
            setTime(minutes * 60);
            setCustomTime(""); // Clear custom time when selecting preset
        }
    };

    const handleCustomTime = (e: React.FormEvent) => {
        e.preventDefault();
        const minutes = parseInt(customTime);
        if (minutes > 0 && minutes <= 180 && !isRunning) {
            setSessionDuration(minutes);
            setTime(minutes * 60);
        }
        setCustomTime("");
    };

    const formatTime = (seconds: number) => {
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
                <p className="timer-subtitle">
                    {isBreak
                        ? "Take a short break to recharge"
                        : "Stay focused and track your progress"}
                </p>
            </div>

            {!isBreak && !isRunning && (
                <>
                    <div className="timer-duration-controls">
                        <button
                            className={`timer-duration-btn ${
                                sessionDuration === 15 ? "active" : ""
                            }`}
                            onClick={() => adjustTime(15)}
                        >
                            15m
                        </button>
                        <button
                            className={`timer-duration-btn ${
                                sessionDuration === 30 ? "active" : ""
                            }`}
                            onClick={() => adjustTime(30)}
                        >
                            30m
                        </button>
                        <button
                            className={`timer-duration-btn ${
                                sessionDuration === 45 ? "active" : ""
                            }`}
                            onClick={() => adjustTime(45)}
                        >
                            45m
                        </button>
                        <button
                            className={`timer-duration-btn ${
                                sessionDuration === 60 ? "active" : ""
                            }`}
                            onClick={() => adjustTime(60)}
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
                        <button type="submit" className="custom-time-submit">
                            Set
                        </button>
                    </form>
                </>
            )}

            <div className="timer-display">
                <div className="timer-circle">
                    <div className="timer-time">{formatTime(time)}</div>
                    <div className="timer-label">
                        {isBreak ? "Break" : "Focus"}
                    </div>
                </div>
            </div>

            <div className="timer-controls">
                <button className="timer-button primary" onClick={toggleTimer}>
                    {isRunning ? (
                        <>
                            <PauseIcon className="h-5 w-5" />
                            <span>Pause</span>
                        </>
                    ) : (
                        <>
                            <PlayIcon className="h-5 w-5" />
                            <span>Start</span>
                        </>
                    )}
                </button>
                <button className="timer-button secondary" onClick={resetTimer}>
                    <ArrowPathIcon className="h-5 w-5" />
                    <span>Reset</span>
                </button>
                <button className="timer-button danger" onClick={onDistraction}>
                    <BellAlertIcon className="h-5 w-5" />
                    <span>Log Distraction</span>
                </button>
            </div>

            <div className="timer-progress">
                <div
                    className="timer-progress-bar"
                    style={{
                        width: `${
                            ((isBreak ? 5 * 60 : sessionDuration * 60) - time) /
                            (isBreak ? 5 * 60 : sessionDuration * 60)
                        }%`,
                    }}
                />
            </div>
        </div>
    );
}
