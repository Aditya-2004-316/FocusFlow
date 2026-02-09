import React, { useState, useRef, useEffect } from "react";
import {
    XMarkIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    PauseIcon,
    PlayIcon,
} from "@heroicons/react/24/outline";

const FloatingTimer = ({
    isVisible,
    timeLeft,
    totalTime,
    isRunning,
    onTogglePause,
    onClose,
    sessionType = "focus",
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [position, setPosition] = useState({ x: 20, y: 20 });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const floatingRef = useRef(null);

    const handleMouseDown = (e) => {
        if (e.target.closest("button") || isMinimized) return;
        setIsDragging(true);
        const rect = floatingRef.current?.getBoundingClientRect();
        if (rect) {
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    useEffect(() => {
        if (!isVisible) return;

        const handleMouseMove = (e) => {
            if (!isDragging || !floatingRef.current) return;

            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;

            // Keep within viewport
            const maxX = window.innerWidth - 280;
            const maxY = window.innerHeight - 120;

            setPosition({
                x: Math.max(0, Math.min(newX, maxX)),
                y: Math.max(0, Math.min(newY, maxY)),
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
            return () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            };
        }
    }, [isDragging, dragOffset, isVisible]);

    const formatTime = (seconds) => {
        if (!seconds || seconds < 0) return "00:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    const progressPercent =
        totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;
    const isDarkTheme =
        typeof document !== "undefined" &&
        document.documentElement.classList.contains("dark");

    const timerColor =
        sessionType === "break"
            ? "rgba(34, 197, 94, 0.8)"
            : "rgba(59, 130, 246, 0.8)";
    const timerBg =
        sessionType === "break"
            ? "rgba(34, 197, 94, 0.1)"
            : "rgba(59, 130, 246, 0.1)";

    return (
        <div
            ref={floatingRef}
            style={{
                position: "fixed",
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: isMinimized ? "120px" : "280px",
                backgroundColor: isDarkTheme
                    ? "rgba(30, 41, 59, 0.95)"
                    : "rgba(248, 250, 252, 0.95)",
                border: `2px solid ${timerColor}`,
                borderRadius: "1rem",
                boxShadow: `0 20px 60px -12px ${timerColor}, 0 0 20px ${timerColor}`,
                padding: isMinimized ? "0.75rem" : "1.2rem",
                zIndex: 9999,
                userSelect: "none",
                cursor: isDragging ? "grabbing" : "grab",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                transition: isDragging ? "none" : "all 0.3s ease",
                display: isVisible ? "block" : "none",
            }}
            onMouseDown={handleMouseDown}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: isMinimized ? 0 : "0.75rem",
                }}
            >
                <span
                    style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: timerColor,
                    }}
                >
                    {sessionType === "break" ? "🌿 Break" : "⏱️ Focus"}
                </span>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            padding: "0.35rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: isDarkTheme
                                ? "rgba(148, 163, 184, 0.7)"
                                : "rgba(100, 116, 139, 0.7)",
                            transition: "color 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = timerColor;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = isDarkTheme
                                ? "rgba(148, 163, 184, 0.7)"
                                : "rgba(100, 116, 139, 0.7)";
                        }}
                    >
                        {isMinimized ? (
                            <ChevronDownIcon
                                style={{ width: "1rem", height: "1rem" }}
                            />
                        ) : (
                            <ChevronUpIcon
                                style={{ width: "1rem", height: "1rem" }}
                            />
                        )}
                    </button>
                    <button
                        onClick={onClose}
                        style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            padding: "0.35rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: isDarkTheme
                                ? "rgba(148, 163, 184, 0.7)"
                                : "rgba(100, 116, 139, 0.7)",
                            transition: "color 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#ef4444";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = isDarkTheme
                                ? "rgba(148, 163, 184, 0.7)"
                                : "rgba(100, 116, 139, 0.7)";
                        }}
                    >
                        <XMarkIcon style={{ width: "1rem", height: "1rem" }} />
                    </button>
                </div>
            </div>

            {!isMinimized && (
                <>
                    {/* Timer Display */}
                    <div
                        style={{
                            position: "relative",
                            marginBottom: "1rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg
                            width="120"
                            height="120"
                            style={{
                                transform: "rotate(-90deg)",
                                position: "absolute",
                            }}
                        >
                            {/* Background circle */}
                            <circle
                                cx="60"
                                cy="60"
                                r="50"
                                fill="none"
                                stroke={
                                    isDarkTheme
                                        ? "rgba(100, 116, 139, 0.2)"
                                        : "rgba(226, 232, 240, 0.4)"
                                }
                                strokeWidth="4"
                            />
                            {/* Progress circle */}
                            <circle
                                cx="60"
                                cy="60"
                                r="50"
                                fill="none"
                                stroke={timerColor}
                                strokeWidth="4"
                                strokeDasharray={`${
                                    (progressPercent / 100) * 314
                                } 314`}
                                style={{
                                    transition: "stroke-dasharray 0.3s linear",
                                }}
                            />
                        </svg>

                        {/* Time Display */}
                        <span
                            style={{
                                fontSize: "2rem",
                                fontWeight: 800,
                                color: timerColor,
                                fontVariantNumeric: "tabular-nums",
                                textShadow: `0 0 10px ${timerColor}`,
                            }}
                        >
                            {formatTime(timeLeft)}
                        </span>
                    </div>

                    {/* Control Button */}
                    <button
                        onClick={onTogglePause}
                        style={{
                            width: "100%",
                            padding: "0.75rem",
                            borderRadius: "0.75rem",
                            border: `1px solid ${timerColor}`,
                            background: timerBg,
                            color: timerColor,
                            fontWeight: 600,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                            transition: "all 0.2s ease",
                            fontSize: "0.9rem",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = timerColor;
                            e.currentTarget.style.color = isDarkTheme
                                ? "#0f172a"
                                : "#fff";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = timerBg;
                            e.currentTarget.style.color = timerColor;
                        }}
                    >
                        {isRunning ? (
                            <>
                                <PauseIcon
                                    style={{ width: "1rem", height: "1rem" }}
                                />
                                Pause
                            </>
                        ) : (
                            <>
                                <PlayIcon
                                    style={{ width: "1rem", height: "1rem" }}
                                />
                                Resume
                            </>
                        )}
                    </button>

                    {/* Status Indicator */}
                    <div
                        style={{
                            marginTop: "0.75rem",
                            textAlign: "center",
                            fontSize: "0.75rem",
                            color: isDarkTheme
                                ? "rgba(148, 163, 184, 0.6)"
                                : "rgba(100, 116, 139, 0.6)",
                        }}
                    >
                        {isRunning ? "⏱️ Running" : "⏸️ Paused"}
                    </div>
                </>
            )}

            {/* Minimized View */}
            {isMinimized && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: timerColor,
                        fontVariantNumeric: "tabular-nums",
                    }}
                >
                    {formatTime(timeLeft)}
                    <span style={{ fontSize: "0.75rem" }}>
                        {isRunning ? "🔴" : "⏸️"}
                    </span>
                </div>
            )}
        </div>
    );
};

export default FloatingTimer;
