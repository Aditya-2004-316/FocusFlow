import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ActionRow, ActionButton } from "./shared/ActivityActions.jsx";
import {
    ArrowPathIcon,
    SpeakerWaveIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../../context/ThemeContext";
import useResponsive from "../../hooks/useResponsive";

const AffirmationsRelaxation = ({ isOpen, onClose, onSkipToFocus }) => {
    const { isDarkMode } = useTheme();
    const { width } = useResponsive();
    const [timeLeft, setTimeLeft] = useState(180);
    const [sessionComplete, setSessionComplete] = useState(false);
    const [currentAffirmation, setCurrentAffirmation] = useState(0);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [favorites, setFavorites] = useState([]);

    const affirmations = [
        "I am capable of achieving great things through focused effort.",
        "My mind is clear, calm, and ready to tackle any challenge.",
        "I embrace deep work and find joy in concentrated effort.",
        "Every moment of focus brings me closer to my goals.",
        "I trust in my ability to maintain attention and complete important work.",
        "Distractions are temporary, but my determination is lasting.",
        "I choose to invest my energy in what truly matters.",
        "My focus is a superpower that I strengthen each day.",
        "I am in control of my attention and how I spend my time.",
        "Creative solutions flow to me when I give myself space to think deeply.",
        "I deserve focused time to do meaningful work.",
        "Each deep work session builds my skills and confidence.",
        "I release perfectionism and embrace progress.",
        "My best work emerges when I give it my full attention.",
        "I am building sustainable habits that serve my highest good.",
        "Focused work energizes and fulfills me.",
        "I honor my need for both concentration and rest.",
        "My productivity comes from alignment, not pressure.",
        "I approach my work with curiosity and calm.",
        "Today, I choose presence over distraction.",
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

    // Lock/unlock body scroll when modal opens/closes
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
        if (sessionComplete) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [sessionComplete, onClose, isOpen]);

    // Early return after all hooks are defined
    if (!isOpen) {
        return null;
    }

    const getRandomAffirmation = () => {
        const newIndex = Math.floor(Math.random() * affirmations.length);
        setCurrentAffirmation(newIndex);
        stopSpeech();
    };

    const speakAffirmation = () => {
        if ("speechSynthesis" in window) {
            stopSpeech();

            const utterance = new SpeechSynthesisUtterance(
                affirmations[currentAffirmation]
            );
            utterance.rate = 0.8;
            utterance.pitch = 1;
            utterance.volume = 1;

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            window.speechSynthesis.speak(utterance);
        }
    };

    const stopSpeech = () => {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    const toggleFavorite = () => {
        if (favorites.includes(currentAffirmation)) {
            setFavorites(favorites.filter((f) => f !== currentAffirmation));
        } else {
            setFavorites([...favorites, currentAffirmation]);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const styles = {
        // Backdrop layer - covers entire viewport, blurs everything
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
            padding: "2rem",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            alignItems: "center",
            animation: "slideUp 0.3s ease-out",
            maxHeight: "90vh",
            overflowY: "auto",
            scrollbarColor: "var(--color-primary-400) var(--color-gray-200)",
            zIndex: 9999,
            pointerEvents: "auto",
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
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
            marginRight: "2rem",
        },
        affirmationDisplay: {
            textAlign: "center",
            padding: "3rem 2rem",
            background:
                "linear-gradient(135deg, rgba(56,189,248,0.1), rgba(129,140,248,0.1))",
            borderRadius: "1.5rem",
            border: "2px solid var(--color-primary-200)",
            minHeight: width < 500 ? "360px" : "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
        },
        affirmationText: {
            fontSize: "1.8rem",
            fontWeight: 600,
            color: "var(--color-gray-900)",
            lineHeight: 1.6,
            maxWidth: "600px",
        },
        controls: {
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
        },
        button: {
            padding: "0.75rem 1.5rem",
            borderRadius: "0.75rem",
            border: "none",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "all 0.2s ease",
        },
        primaryButton: {
            background: "linear-gradient(110deg, #38bdf8, #60a5fa)",
            color: "#0f172a",
            boxShadow: "0 4px 12px rgba(56,189,248,0.3)",
        },
        secondaryButton: {
            background: "var(--color-gray-200)",
            color: "var(--color-gray-700)",
        },
        favoriteButton: {
            background: "var(--color-pink-100)",
            color: "var(--color-pink-700)",
        },
        favoriteButtonActive: {
            background: "var(--color-pink-500)",
            color: "white",
        },
        counter: {
            fontSize: "0.9rem",
            color: "var(--color-gray-600)",
            textAlign: "center",
        },
        completeMessage: {
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "var(--color-green-600)",
            textAlign: "center",
        },
        description: {
            color: "var(--color-gray-600)",
            fontSize: "1rem",
            lineHeight: 1.6,
            textAlign: "center",
        },
        favoritesSection: {
            width: "100%",
            padding: "1.5rem",
            background: "var(--color-white)",
            borderRadius: "1rem",
            border: "1px solid var(--input-border)",
        },
        favoritesTitle: {
            fontSize: "1rem",
            fontWeight: 600,
            color: "var(--color-gray-700)",
            marginBottom: "0.75rem",
        },
        favoritesList: {
            fontSize: "0.9rem",
            color: "var(--color-gray-600)",
            lineHeight: 1.6,
        },
        skipButton: {
            padding: "0.7rem 1.5rem",
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
        },
    };

    if (sessionComplete) {
        return createPortal(
            <>
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
                    style={styles.backdrop}
                    onClick={onClose}
                    role="presentation"
                >
                    <div
                        style={styles.card}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h1 style={styles.completeMessage}>
                            ✨ Session Complete
                        </h1>
                        <p style={styles.description}>
                            Carry these positive intentions into your focus
                            session.
                        </p>
                        <p style={styles.description}>
                            Returning to Dashboard...
                        </p>
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
                                e.currentTarget.style.transform =
                                    "translateY(0)";
                            }}
                        >
                            Skip to Focus Session
                        </button>
                    </div>
                </div>
            </>,
            document.body
        );
    }

    return createPortal(
        <>
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
            <div style={styles.backdrop} onClick={onClose} role="presentation">
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
                            e.currentTarget.style.background =
                                "var(--panel-bg)";
                            e.currentTarget.style.transform = "scale(1)";
                        }}
                    >
                        <XMarkIcon style={{ width: "24px", height: "24px" }} />
                    </button>
                    <div style={styles.header}>
                        <h1 style={styles.title}>💬 Daily Affirmations</h1>
                        <div style={styles.timer}>{formatTime(timeLeft)}</div>
                    </div>

                    <p style={styles.description}>
                        Read these affirmations slowly. Let each word sink in.
                        Believe in your capacity for focused, meaningful work.
                    </p>

                    <div style={styles.affirmationDisplay}>
                        <p style={styles.affirmationText}>
                            {affirmations[currentAffirmation]}
                        </p>
                    </div>

                    <p style={styles.counter}>
                        Affirmation {currentAffirmation + 1} of{" "}
                        {affirmations.length}
                    </p>

                    <ActionRow style={styles.controls}>
                        <ActionButton
                            onClick={getRandomAffirmation}
                            style={{
                                ...styles.button,
                                ...styles.primaryButton,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-2px)";
                                e.currentTarget.style.boxShadow =
                                    "0 6px 16px rgba(56,189,248,0.4)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                    "0 4px 12px rgba(56,189,248,0.3)";
                            }}
                        >
                            <ArrowPathIcon
                                style={{ width: "20px", height: "20px" }}
                            />
                            Next Affirmation
                        </ActionButton>

                        <ActionButton
                            onClick={speakAffirmation}
                            disabled={isSpeaking}
                            style={{
                                ...styles.button,
                                ...styles.secondaryButton,
                                opacity: isSpeaking ? 0.6 : 1,
                            }}
                            onMouseEnter={(e) => {
                                if (!isSpeaking) {
                                    e.currentTarget.style.background =
                                        "var(--color-gray-300)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    "var(--color-gray-200)";
                            }}
                        >
                            <SpeakerWaveIcon
                                style={{ width: "20px", height: "20px" }}
                            />
                            {isSpeaking ? "Speaking..." : "Listen"}
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
            </div>
        </>,
        document.body
    );
};

export default AffirmationsRelaxation;
