import React from "react";
import { SparklesIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";

const FloatingTimerPermissionDialog = ({ onAllow, onDeny }) => {
    const { isDarkMode: isDarkTheme } = useTheme();
    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(8, 15, 26, 0.65)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                zIndex: 10000,
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "420px",
                    borderRadius: "1.5rem",
                    border: isDarkTheme
                        ? "1px solid rgba(148, 163, 184, 0.3)"
                        : "1px solid rgba(226, 232, 240, 0.5)",
                    background: isDarkTheme
                        ? "rgba(30, 41, 59, 0.95)"
                        : "rgba(248, 250, 252, 0.98)",
                    boxShadow: "0 28px 80px -40px rgba(15, 23, 42, 0.68)",
                    display: "flex",
                    flexDirection: "column",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    animation: "slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1.5rem 1.5rem 1rem",
                        borderBottom: isDarkTheme
                            ? "1px solid rgba(148, 163, 184, 0.1)"
                            : "1px solid rgba(226, 232, 240, 0.3)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                        }}
                    >
                        <SparklesIcon
                            style={{
                                width: "1.5rem",
                                height: "1.5rem",
                                color: "rgba(59, 130, 246, 0.8)",
                            }}
                        />
                        <h3
                            style={{
                                margin: 0,
                                fontSize: "1.1rem",
                                fontWeight: 700,
                                color: isDarkTheme ? "#f8fafc" : "#0f172a",
                            }}
                        >
                            Always-On-Top Timer
                        </h3>
                    </div>
                </div>

                {/* Body */}
                <div
                    style={{
                        padding: "1.5rem",
                        display: "grid",
                        gap: "1rem",
                    }}
                >
                    <p
                        style={{
                            margin: 0,
                            fontSize: "0.95rem",
                            color: isDarkTheme
                                ? "rgba(226, 232, 240, 0.8)"
                                : "rgba(30, 41, 59, 0.8)",
                            lineHeight: 1.6,
                        }}
                    >
                        Enable the floating timer to keep your focus session
                        visible while you work on other apps.
                    </p>

                    <div
                        style={{
                            borderRadius: "0.875rem",
                            background: isDarkTheme
                                ? "rgba(56, 189, 248, 0.12)"
                                : "rgba(59, 130, 246, 0.06)",
                            border: isDarkTheme
                                ? "1px solid rgba(59, 130, 246, 0.15)"
                                : "1px solid rgba(59, 130, 246, 0.2)",
                            padding: "1rem",
                        }}
                    >
                        <ul
                            style={{
                                margin: 0,
                                paddingLeft: "1.25rem",
                                fontSize: "0.85rem",
                                color: isDarkTheme
                                    ? "rgba(226, 232, 240, 0.7)"
                                    : "rgba(30, 41, 59, 0.7)",
                                display: "grid",
                                gap: "0.5rem",
                                lineHeight: 1.7,
                            }}
                        >
                            <li>✓ Display on top of other applications</li>
                            <li>✓ Draggable and minimize-able widget</li>
                            <li>✓ Quick pause/resume controls</li>
                            <li>✓ Real-time progress visualization</li>
                        </ul>
                    </div>

                    <p
                        style={{
                            margin: 0,
                            fontSize: "0.8rem",
                            color: isDarkTheme
                                ? "rgba(148, 163, 184, 0.6)"
                                : "rgba(100, 116, 139, 0.6)",
                            fontStyle: "italic",
                        }}
                    >
                        You can disable this anytime in settings.
                    </p>
                </div>

                {/* Footer */}
                <div
                    style={{
                        display: "flex",
                        gap: "0.75rem",
                        padding: "1rem 1.5rem 1.5rem",
                        borderTop: isDarkTheme
                            ? "1px solid rgba(148, 163, 184, 0.1)"
                            : "1px solid rgba(226, 232, 240, 0.3)",
                    }}
                >
                    <button
                        onClick={onDeny}
                        style={{
                            flex: 1,
                            padding: "0.875rem 1rem",
                            borderRadius: "0.875rem",
                            border: isDarkTheme
                                ? "1px solid rgba(148, 163, 184, 0.3)"
                                : "1px solid rgba(226, 232, 240, 0.4)",
                            background: isDarkTheme
                                ? "rgba(148, 163, 184, 0.08)"
                                : "rgba(226, 232, 240, 0.4)",
                            color: isDarkTheme ? "#94a3b8" : "#475569",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDarkTheme
                                ? "rgba(148, 163, 184, 0.12)"
                                : "rgba(226, 232, 240, 0.6)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = isDarkTheme
                                ? "rgba(148, 163, 184, 0.08)"
                                : "rgba(226, 232, 240, 0.4)";
                        }}
                    >
                        Not now
                    </button>
                    <button
                        onClick={onAllow}
                        style={{
                            flex: 1,
                            padding: "0.875rem 1rem",
                            borderRadius: "0.875rem",
                            border: "1px solid rgba(59, 130, 246, 0.4)",
                            background: isDarkTheme
                                ? "linear-gradient(135deg, #38bdf8, #60a5fa)"
                                : "linear-gradient(to right, rgba(59, 130, 246, 0.3), rgba(56, 189, 248, 0.25))",
                            color: isDarkTheme ? "#0f172a" : "rgba(59, 130, 246, 0.9)",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            if (isDarkTheme) {
                                e.currentTarget.style.background = "linear-gradient(135deg, #60a5fa, #38bdf8)";
                                e.currentTarget.style.boxShadow = "0 0 20px rgba(56, 189, 248, 0.4)";
                            } else {
                                e.currentTarget.style.background = "linear-gradient(to right, rgba(59, 130, 246, 0.45), rgba(56, 189, 248, 0.35))";
                                e.currentTarget.style.boxShadow = "0 12px 24px -8px rgba(59, 130, 246, 0.3)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (isDarkTheme) {
                                e.currentTarget.style.background = "linear-gradient(135deg, #38bdf8, #60a5fa)";
                            } else {
                                e.currentTarget.style.background = "linear-gradient(to right, rgba(59, 130, 246, 0.3), rgba(56, 189, 248, 0.25))";
                            }
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        Enable floating timer
                    </button>
                </div>
            </div>

            <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
};

export default FloatingTimerPermissionDialog;
