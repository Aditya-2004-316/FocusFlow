import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../context/ThemeContext";
import useResponsive from "../../hooks/useResponsive";

const MeditationRelaxation = ({ isOpen, onClose, onSkipToFocus }) => {
    const { isDarkMode } = useTheme();
    const { width } = useResponsive();
    const isCompact = width < 720;
    const [timeLeft, setTimeLeft] = useState(180);
    const [sessionComplete, setSessionComplete] = useState(false);
    const [currentPhase, setCurrentPhase] = useState(0);
    const [breathCycle, setBreathCycle] = useState("inhale");
    const [breathProgress, setBreathProgress] = useState(0);
    const [isPhaseReading, setIsPhaseReading] = useState(false);
    const [isBreathSpeaking, setIsBreathSpeaking] = useState(false);
    const lastBreathCycleRef = useRef(null);
    const currentUtteranceRef = useRef(null);
    const speechAvailable =
        typeof window !== "undefined" && "speechSynthesis" in window;

    const meditationPhases = [
        {
            duration: 60,
            prompt: "Close your eyes and settle into a comfortable position.",
            instruction:
                "Notice the weight of your body and allow yourself to relax.",
        },
        {
            duration: 60,
            prompt: "Begin to focus on your natural breath.",
            instruction: "Feel the gentle rise and fall of your chest.",
        },
        {
            duration: 60,
            prompt: "Let go of any tension you're holding.",
            instruction: "With each exhale, release stress and welcome calm.",
        },
    ];

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

    useEffect(() => {
        if (!isOpen) return;
        const elapsed = 180 - timeLeft;
        const newPhase = Math.min(
            Math.floor(elapsed / 60),
            meditationPhases.length - 1
        );
        if (newPhase !== currentPhase) {
            setCurrentPhase(newPhase);
        }
    }, [timeLeft, isOpen, currentPhase]);

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

    useEffect(() => {
        if (!isOpen) return;
        // Breathing animation cycle: 4s inhale, 4s hold, 4s exhale, 4s hold
        const breathInterval = setInterval(() => {
            setBreathProgress((prev) => {
                const next = (prev + 1) % 160; // 16 seconds total cycle

                if (next < 40) {
                    setBreathCycle("inhale");
                } else if (next < 80) {
                    setBreathCycle("hold");
                } else if (next < 120) {
                    setBreathCycle("exhale");
                } else {
                    setBreathCycle("rest");
                }

                return next;
            });
        }, 100);

        return () => clearInterval(breathInterval);
    }, [isOpen]);

    const speakBreathInstruction = (cycle) => {
        if (!speechAvailable) return;

        const phrases = {
            inhale: "Breathe in slowly and expand your lungs.",
            hold: "Hold the breath gently.",
            exhale: "Slowly breathe out and soften your shoulders.",
            rest: "Rest and prepare for the next breath.",
        };

        const text = phrases[cycle];
        if (!text) return;

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.85;
        utterance.pitch = 1;
        utterance.volume = 0.85;

        utterance.onstart = () => {
            setIsBreathSpeaking(true);
        };
        utterance.onend = () => {
            setIsBreathSpeaking(false);
            currentUtteranceRef.current = null;
        };
        utterance.onerror = () => {
            setIsBreathSpeaking(false);
            currentUtteranceRef.current = null;
        };

        currentUtteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    };

    const handlePhaseNarration = () => {
        if (!speechAvailable) return;

        const phase = meditationPhases[currentPhase];
        const text = `${phase.prompt} ${phase.instruction}`.trim();
        if (!text) return;

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 0.9;

        utterance.onstart = () => {
            setIsPhaseReading(true);
            setIsBreathSpeaking(false);
        };
        const handleSpeechComplete = () => {
            setIsPhaseReading(false);
            currentUtteranceRef.current = null;
            lastBreathCycleRef.current = null;
        };
        utterance.onend = handleSpeechComplete;
        utterance.onerror = handleSpeechComplete;

        currentUtteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        if (!isOpen && speechAvailable) {
            window.speechSynthesis.cancel();
            currentUtteranceRef.current = null;
            setIsPhaseReading(false);
            setIsBreathSpeaking(false);
            lastBreathCycleRef.current = null;
        }
    }, [isOpen, speechAvailable]);

    useEffect(() => {
        if (!isOpen || !speechAvailable) return;
        if (isPhaseReading) return;
        if (breathCycle === lastBreathCycleRef.current) return;

        speakBreathInstruction(breathCycle);
        lastBreathCycleRef.current = breathCycle;
    }, [breathCycle, isOpen, speechAvailable, isPhaseReading]);

    // Early return after all hooks are defined
    if (!isOpen) {
        return null;
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const getBreathScale = () => {
        const position = breathProgress % 40;
        if (breathCycle === "inhale") {
            return 1 + (position / 40) * 0.5;
        } else if (breathCycle === "exhale") {
            return 1.5 - (position / 40) * 0.5;
        }
        return breathCycle === "hold" ? 1.5 : 1;
    };

    const getBreathText = () => {
        switch (breathCycle) {
            case "inhale":
                return "Breathe In";
            case "hold":
                return "Hold";
            case "exhale":
                return "Breathe Out";
            case "rest":
                return "Rest";
            default:
                return "";
        }
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
            gap: "2.5rem",
            alignItems: "center",
            animation: "slideUp 0.3s ease-out",
            maxHeight: "90vh",
            zIndex: 9999,
            pointerEvents: "auto",
            overflowY: "auto",
            scrollbarColor: "var(--color-primary-400) var(--color-gray-200)",
        },
        title: {
            fontSize: "2rem",
            fontWeight: 700,
            color: "var(--color-gray-900)",
            textAlign: "center",
            margin: 0,
        },
        timer: {
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "var(--color-primary-600)",
        },
        breathCircle: {
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background:
                "linear-gradient(135deg, rgba(56,189,248,0.3), rgba(129,140,248,0.3))",
            border: "3px solid var(--color-primary-400)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.1s ease",
            boxShadow: "0 0 30px rgba(56,189,248,0.3)",
        },
        breathText: {
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "var(--color-primary-700)",
            textAlign: "center",
        },
        promptSection: {
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
        },
        prompt: {
            fontSize: "1.3rem",
            fontWeight: 600,
            color: "var(--color-gray-900)",
            lineHeight: 1.5,
        },
        instruction: {
            fontSize: "1rem",
            color: "var(--color-gray-600)",
            lineHeight: 1.7,
            position: "relative",
        },
        speakButton: {
            position: "absolute",
            right: "0",
            top: "50%",
            transform: "translateY(-50%)",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            border: isDarkMode ? "1px solid var(--color-primary-700)" : "1px solid var(--color-primary-300)",
            background: isDarkMode ? "var(--color-gray-800)" : "var(--color-primary-100)",
            color: isDarkMode ? "var(--color-primary-300)" : "var(--color-primary-700)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            transition: "all 0.2s ease",
        },
        phaseIndicators: {
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
        },
        phaseIndicator: {
            width: "40px",
            height: "4px",
            borderRadius: "2px",
            background: "var(--color-gray-300)",
        },
        phaseIndicatorActive: {
            background: "var(--color-primary-500)",
        },
        completeMessage: {
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "var(--color-green-600)",
            textAlign: "center",
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
                    `}
                </style>
                <div style={styles.card} onClick={(e) => e.stopPropagation()}>
                    <h1 style={styles.completeMessage}>✨ Session Complete</h1>
                    <p style={styles.instruction}>
                        Take a moment to appreciate this peaceful state.
                    </p>
                    <p style={styles.instruction}>Returning to Dashboard...</p>
                    <button
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
                `}
            </style>
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
                <h1 style={styles.title}>🧘 Mini Meditation</h1>

                <div style={styles.timer}>{formatTime(timeLeft)}</div>

                <div
                    style={{
                        ...styles.breathCircle,
                        transform: `scale(${getBreathScale()})`,
                    }}
                >
                    <div style={styles.breathText}>{getBreathText()}</div>
                </div>

                <div style={styles.promptSection}>
                    <p style={styles.prompt}>
                        {meditationPhases[currentPhase].prompt}
                    </p>
                    <div style={{ position: "relative", paddingRight: isCompact ? 0 : "3rem" }}>
                        <p style={styles.instruction}>
                            {meditationPhases[currentPhase].instruction}
                        </p>
                        {!isCompact && (
                            <button
                                onClick={handlePhaseNarration}
                                disabled={isPhaseReading}
                                style={{
                                    ...styles.speakButton,
                                    opacity: isPhaseReading ? 0.6 : 1,
                                }}
                                onMouseEnter={(e) => {
                                    if (!isPhaseReading) {
                                        e.currentTarget.style.background =
                                            "var(--color-primary-200)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                        "var(--color-primary-100)";
                                }}
                                title="Read text aloud"
                            >
                                <SpeakerWaveIcon
                                    style={{ width: "18px", height: "18px" }}
                                />
                                <span
                                    style={{
                                        marginLeft: "0.35rem",
                                        fontSize: "0.85rem",
                                        fontWeight: 600,
                                    }}
                                >
                                    Listen
                                </span>
                            </button>
                        )}
                    </div>
                </div>





                {isCompact && (
                    <button
                        onClick={handlePhaseNarration}
                        disabled={isPhaseReading}
                        style={{
                            ...styles.speakButton,
                            position: "static",
                            transform: "none",
                            marginBottom: "1rem",
                            marginTop: "1rem",
                            opacity: isPhaseReading ? 0.6 : 1,
                        }}
                        onMouseEnter={(e) => {
                            if (!isPhaseReading) {
                                e.currentTarget.style.background =
                                    "var(--color-primary-200)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "var(--color-primary-100)";
                        }}
                        title="Read text aloud"
                    >
                        <SpeakerWaveIcon
                            style={{ width: "18px", height: "18px" }}
                        />
                        <span
                            style={{
                                marginLeft: "0.35rem",
                                fontSize: "0.85rem",
                                fontWeight: 600,
                            }}
                        >
                            Listen
                        </span>
                    </button>
                )}

                {!isCompact && <div style={{ height: "1rem" }} />}
                <button
                    onClick={onSkipToFocus}
                    style={styles.skipButton}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                            "var(--color-primary-200)";
                        e.currentTarget.style.transform = "translateY(-2px)";
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
        </div >,
        document.body
    );
};

export default MeditationRelaxation;
