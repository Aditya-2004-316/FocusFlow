import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ActionRow, ActionButton } from "./shared/ActivityActions.jsx";
import {
    TrashIcon,
    PaperAirplaneIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../../context/ThemeContext";

const ThoughtDumpRelaxation = ({ isOpen, onClose, onSkipToFocus }) => {
    const { isDarkMode } = useTheme();
    const [timeLeft, setTimeLeft] = useState(180);
    const [sessionComplete, setSessionComplete] = useState(false);
    const [thoughts, setThoughts] = useState("");
    const [thoughtsSent, setThoughtsSent] = useState(false);
    const [floatingThoughts, setFloatingThoughts] = useState([]);

    useEffect(() => {
        if (!isOpen) return;
        // Reset timer when opening
        setTimeLeft(180);
        setSessionComplete(false);

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setSessionComplete(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        if (sessionComplete) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [sessionComplete, onClose, isOpen]);

    // Body scroll lock when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.body.style.height = "100vh";
        } else {
            document.body.style.overflow = "";
            document.body.style.height = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.body.style.height = "";
        };
    }, [isOpen]);

    // Early return after all hooks are defined
    if (!isOpen) {
        return null;
    }

    const handleClear = () => {
        setThoughts("");
    };

    const handleSendAway = () => {
        if (thoughts.trim()) {
            const words = thoughts.split(" ").filter((w) => w.trim());
            const newFloatingThoughts = words
                .slice(0, 15)
                .map((word, index) => ({
                    id: Date.now() + index,
                    text: word,
                    x: Math.random() * 80 + 10,
                    y: 50,
                }));
            setFloatingThoughts(newFloatingThoughts);
            setThoughtsSent(true);

            setTimeout(() => {
                setThoughts("");
                setFloatingThoughts([]);
                setThoughtsSent(false);
            }, 3000);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const styles = {
        backdrop: {
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            zIndex: 9998,
            animation: "fadeIn 0.3s ease-out",
            overflow: "hidden",
            pointerEvents: "auto",
        },
        closeButton: {
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid var(--input-border)",
            background: "var(--panel-bg)",
            color: "var(--color-gray-700)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            zIndex: 10,
        },
        card: {
            position: "relative",
            maxWidth: "800px",
            width: "100%",
            background: "var(--panel-bg)",
            border: "1px solid var(--input-border)",
            borderRadius: "1.5rem",
            padding: "3rem",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            zIndex: 9999,
            animation: "slideUp 0.3s ease-out",
            maxHeight: "90vh",
            overflowY: "auto",
            pointerEvents: "auto",
            scrollbarColor: "var(--color-primary-400) var(--color-gray-200)",
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
        },
        title: {
            fontSize: "2rem",
            fontWeight: 700,
            color: "var(--color-gray-900)",
            margin: 0,
        },
        timer: {
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "var(--color-primary-600)",
        },
        description: {
            color: "var(--color-gray-600)",
            fontSize: "1rem",
            lineHeight: 1.6,
        },
        textarea: {
            width: "100%",
            minHeight: "200px",
            padding: "1.5rem",
            borderRadius: "1rem",
            border: "2px solid var(--input-border)",
            background: "var(--color-white)",
            color: "var(--color-gray-900)",
            fontSize: "1.1rem",
            lineHeight: 1.8,
            fontFamily: "inherit",
            resize: "vertical",
            outline: "none",
            transition: "border-color 0.2s ease",
        },
        buttonGroup: {
            display: "flex",
            gap: "1rem",
            flexWrap: "nowrap",
            alignItems: "center",
        },
        button: {
            padding: "0.85rem 1.75rem",
            borderRadius: "0.9rem",
            border: "none",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "all 0.2s ease",
            minHeight: "3rem",
        },
        clearButton: {
            background: "var(--color-gray-200)",
            color: "var(--color-gray-700)",
        },
        sendButton: {
            background: "linear-gradient(110deg, #38bdf8, #60a5fa)",
            color: "#0f172a",
            boxShadow: "0 4px 12px rgba(56,189,248,0.3)",
        },
        completeMessage: {
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "var(--color-green-600)",
            textAlign: "center",
        },
        floatingThought: {
            position: "fixed",
            fontSize: "1.2rem",
            fontWeight: 500,
            color: "var(--color-primary-500)",
            opacity: 0.8,
            animation: "floatAway 3s ease-out forwards",
            pointerEvents: "none",
            zIndex: 1000,
        },
        sentMessage: {
            textAlign: "center",
            color: "var(--color-green-600)",
            fontWeight: 600,
            fontSize: "1.1rem",
        },
        skipButton: {
            padding: "0.85rem 1.75rem",
            minHeight: "3rem",
            minWidth: "230px",
            borderRadius: "0.9rem",
            border: isDarkMode ? "1px solid var(--color-primary-700)" : "none",
            background: isDarkMode ? "var(--color-gray-800)" : "var(--color-primary-100)",
            color: isDarkMode ? "var(--color-primary-300)" : "var(--color-primary-700)",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            transition: "all 0.2s ease",
            marginTop: "1rem",
        },
    };

    if (sessionComplete) {
        const stylesWithSkipButton = {
            ...styles,
            skipButton: {
                ...styles.skipButton,
            },
        };

        return createPortal(
            <div
                style={stylesWithSkipButton.backdrop}
                onClick={onClose}
                role="presentation"
            >
                <style>
                    {`
                        @keyframes fadeIn {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }
                        @keyframes slideUp {
                            from { transform: translateY(20px); opacity: 0; }
                            to { transform: translateY(0); opacity: 1; }
                        }
                    `}
                </style>
                <div
                    style={stylesWithSkipButton.card}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        style={stylesWithSkipButton.closeButton}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "var(--color-gray-100)";
                            e.currentTarget.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "var(--panel-bg)";
                            e.currentTarget.style.transform = "scale(1)";
                        }}
                    >
                        <XMarkIcon style={{ width: "24px", height: "24px" }} />
                    </button>
                    <h1 style={stylesWithSkipButton.completeMessage}>
                        ✨ Session Complete
                    </h1>
                    <p style={stylesWithSkipButton.description}>
                        Your mind is now clearer and ready to focus.
                    </p>
                    <p style={stylesWithSkipButton.description}>
                        Returning to Dashboard...
                    </p>
                    <button
                        onClick={onSkipToFocus}
                        style={stylesWithSkipButton.skipButton}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "var(--color-primary-200)";
                            e.currentTarget.style.transform =
                                "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "var(--color-primary-100)";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        Skip to Focus Session
                    </button>
                </div>
            </div>,
            document.body
        );
    }

    return createPortal(
        <div style={styles.backdrop} onClick={onClose} role="presentation">
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes slideUp {
                        from { transform: translateY(20px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    @keyframes floatAway {
                        0% {
                            transform: translateY(0) scale(1);
                            opacity: 0.8;
                        }
                        100% {
                            transform: translateY(-500px) scale(0.5);
                            opacity: 0;
                        }
                    }
                `}
            </style>

            {floatingThoughts.map((thought) => (
                <div
                    key={thought.id}
                    style={{
                        ...styles.floatingThought,
                        left: `${thought.x}%`,
                        top: `${thought.y}%`,
                    }}
                >
                    {thought.text}
                </div>
            ))}

            <div style={styles.card} onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    style={styles.closeButton}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                            "var(--color-gray-100)";
                        e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--panel-bg)";
                        e.currentTarget.style.transform = "scale(1)";
                    }}
                >
                    <XMarkIcon style={{ width: "24px", height: "24px" }} />
                </button>
                <div style={styles.header}>
                    <h1 style={styles.title}>📝 Thought Dump</h1>
                    <div style={styles.timer}>{formatTime(timeLeft)}</div>
                </div>

                <p style={styles.description}>
                    Write down everything on your mind—worries, ideas, to-dos.
                    Let it all out without judgment. When you're ready, send it
                    away and clear your mental space.
                </p>

                <textarea
                    value={thoughts}
                    onChange={(e) => setThoughts(e.target.value)}
                    placeholder="Start writing your thoughts here... Let them flow freely."
                    style={styles.textarea}
                    onFocus={(e) => {
                        e.target.style.borderColor = "var(--color-primary-400)";
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = "var(--input-border)";
                    }}
                />

                {thoughtsSent && (
                    <p style={styles.sentMessage}>
                        ✨ Your thoughts are floating away... Feel the relief.
                    </p>
                )}

                <ActionRow>
                    <ActionButton
                        onClick={handleClear}
                        style={{ ...styles.clearButton }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "var(--color-gray-300)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "var(--color-gray-200)";
                        }}
                    >
                        <TrashIcon style={{ width: "20px", height: "20px" }} />
                        Clear
                    </ActionButton>
                    <ActionButton
                        onClick={handleSendAway}
                        disabled={!thoughts.trim()}
                        style={{
                            ...styles.sendButton,
                            opacity: thoughts.trim() ? 1 : 0.5,
                            cursor: thoughts.trim() ? "pointer" : "not-allowed",
                        }}
                        onMouseEnter={(e) => {
                            if (thoughts.trim()) {
                                e.currentTarget.style.transform =
                                    "translateY(-2px)";
                                e.currentTarget.style.boxShadow =
                                    "0 6px 16px rgba(56,189,248,0.4)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                                "0 4px 12px rgba(56,189,248,0.3)";
                        }}
                    >
                        <PaperAirplaneIcon
                            style={{ width: "20px", height: "20px" }}
                        />
                        Send Away
                    </ActionButton>
                    <ActionButton
                        onClick={onSkipToFocus}
                        style={styles.skipButton}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "var(--color-primary-200)";
                            e.currentTarget.style.transform =
                                "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "var(--color-primary-100)";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        Skip to Focus Session
                    </ActionButton>
                </ActionRow>
            </div>
        </div>,
        document.body
    );
};

export default ThoughtDumpRelaxation;
