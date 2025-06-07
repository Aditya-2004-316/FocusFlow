import { useState, useEffect } from "react";
import { PlayIcon, PauseIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import "./Timer.css"; // Import the new Timer.css file

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

    return (
        <div className="timer-container">
            <div className="timer-circle-wrapper">
                {/* Circular Progress Background */}
                <div className="timer-circle-bg"></div>

                {/* Circular Progress Indicator */}
                <div
                    className="timer-circle-progress"
                    style={{
                        borderTopColor: isBreak
                            ? "var(--color-secondary-500)"
                            : "var(--color-primary-500)",
                        borderRightColor: isBreak
                            ? "var(--color-secondary-500)"
                            : "var(--color-primary-500)",
                        transform: `rotate(${progress * 3.6}deg)`,
                        transition: "transform 1s linear",
                    }}
                ></div>

                {/* Timer Display */}
                <div className="timer-display-wrapper">
                    <div
                        className={`timer-status ${
                            isBreak ? "break-time" : "focus-time"
                        }`}
                    >
                        {isBreak ? "Break Time" : "Focus Time"}
                    </div>
                    <div
                        className={`timer-time ${
                            isBreak ? "break-time" : "focus-time"
                        }`}
                    >
                        {formatTime(timeLeft)}
                    </div>
                </div>
            </div>

            <div className="timer-buttons-wrapper">
                <button
                    onClick={toggleTimer}
                    className={`timer-button ${
                        isBreak ? "secondary" : "primary"
                    }`}
                >
                    {isRunning ? (
                        <>
                            <PauseIcon />
                            <span>Pause Timer</span>
                        </>
                    ) : (
                        <>
                            <PlayIcon />
                            <span>Start Timer</span>
                        </>
                    )}
                </button>
                <button onClick={resetTimer} className="timer-button reset">
                    <ArrowPathIcon />
                    <span>Reset Timer</span>
                </button>
                <button
                    onClick={onDistraction}
                    className="timer-button distraction"
                >
                    <span>Log Distraction</span>
                </button>
            </div>
        </div>
    );
};

export default Timer;
