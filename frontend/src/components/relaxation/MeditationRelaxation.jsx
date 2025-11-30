import React, { useState, useEffect } from "react";
import { XMarkIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";

const MeditationRelaxation = ({ isOpen, onClose, onSkipToFocus }) => {
    const [timeLeft, setTimeLeft] = useState(180);
    const [sessionComplete, setSessionComplete] = useState(false);
    const [currentPhase, setCurrentPhase] = useState(0);
    const [breathCycle, setBreathCycle] = useState("inhale");
    const [breathProgress, setBreathProgress] = useState(0);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [lastSpokenBreath, setLastSpokenBreath] = useState("");

    const meditationPhases = [
        {
            duration: 60,
            prompt: "Close your eyes and settle into a comfortable position.",
            instruction: "Notice the weight of your body and allow yourself to relax.",
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
            // Auto-speak the new phase instruction
            speakInstruction(newPhase);
        }
    }, [timeLeft, isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        // Auto-speak breath instructions
        if (breathCycle !== lastSpokenBreath) {
            speakBreathInstruction(breathCycle);
            setLastSpokenBreath(breathCycle);
        }
    }, [breathCycle, isOpen]);

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

    // Early return after all hooks are defined
    if (!isOpen) {
        return null;
    }

    const speakInstruction = (phaseIndex) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            
            const phase = meditationPhases[phaseIndex];
            const text = `${phase.prompt} ${phase.instruction}`;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.75;
            utterance.pitch = 1;
            utterance.volume = 0.8;
            
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);
            
            window.speechSynthesis.speak(utterance);
        }
    };

    const speakBreathInstruction = (breathCycle) => {
        if ('speechSynthesis' in window) {
            const breathTexts = {
                "inhale": "Breathe in",
                "hold": "Hold",
                "exhale": "Breathe out",
                "rest": "Rest"
            };
            
            const text = breathTexts[breathCycle] || "";
            if (text) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.rate = 0.8;
                utterance.pitch = 1.2;
                utterance.volume = 0.9;
                
                window.speechSynthesis.speak(utterance);
            }
        }
    };

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
        modalOverlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            zIndex: 9999,
            animation: "fadeIn 0.3s ease-out",
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
            background: "linear-gradient(135deg, rgba(56,189,248,0.3), rgba(129,140,248,0.3))",
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
            border: "1px solid var(--color-primary-300)",
            background: "var(--color-primary-100)",
            color: "var(--color-primary-700)",
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
            padding: "0.75rem 1.5rem",
            borderRadius: "0.75rem",
            border: "none",
            background: "var(--color-primary-100)",
            color: "var(--color-primary-700)",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "all 0.2s ease",
            marginTop: "1rem",
        },
    };

    if (sessionComplete) {
        return (
            <div style={styles.modalOverlay} onClick={onClose}>
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
                    <h1 style={styles.completeMessage}>
                        ✨ Session Complete
                    </h1>
                    <p style={styles.instruction}>
                        Take a moment to appreciate this peaceful state.
                    </p>
                    <p style={styles.instruction}>
                        Returning to Dashboard...
                    </p>
                    <button
                        onClick={onSkipToFocus}
                        style={styles.skipButton}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--color-primary-200)";
                            e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "var(--color-primary-100)";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        Skip to Focus Session
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.modalOverlay} onClick={onClose}>
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
                        e.currentTarget.style.background = "var(--color-gray-100)";
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
                    <div style={{ position: "relative", paddingRight: "3rem" }}>
                        <p style={styles.instruction}>
                            {meditationPhases[currentPhase].instruction}
                        </p>
                        <button
                            onClick={() => speakInstruction(currentPhase)}
                            disabled={isSpeaking}
                            style={{
                                ...styles.speakButton,
                                opacity: isSpeaking ? 0.6 : 1,
                            }}
                            onMouseEnter={(e) => {
                                if (!isSpeaking) {
                                    e.currentTarget.style.background = "var(--color-primary-200)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "var(--color-primary-100)";
                            }}
                            title="Listen to instruction"
                        >
                            <SpeakerWaveIcon style={{ width: "18px", height: "18px" }} />
                        </button>
                    </div>
                </div>

                <div style={styles.phaseIndicators}>
                    {meditationPhases.map((_, index) => (
                        <div
                            key={index}
                            style={{
                                ...styles.phaseIndicator,
                                ...(index === currentPhase ? styles.phaseIndicatorActive : {}),
                            }}
                        />
                    ))}
                </div>
                <button
                    onClick={onSkipToFocus}
                    style={styles.skipButton}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--color-primary-200)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--color-primary-100)";
                        e.currentTarget.style.transform = "translateY(0)";
                    }}
                >
                    Skip to Focus Session
                </button>
            </div>
        </div>
    );
};

export default MeditationRelaxation;
