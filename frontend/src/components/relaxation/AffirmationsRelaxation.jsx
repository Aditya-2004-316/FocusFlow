import React, { useState, useEffect } from "react";
import { XMarkIcon, SparklesIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

const AffirmationsRelaxation = ({ isOpen, onClose }) => {
    const [currentAffirmation, setCurrentAffirmation] = useState(0);

    const affirmations = [
        "I am focused and capable of deep work.",
        "My mind is clear and ready to create.",
        "I approach my tasks with calm confidence.",
        "Every moment of focus brings me closer to my goals.",
        "I am in control of my attention and energy.",
        "I release distractions and embrace clarity.",
        "My work matters and I give it my full presence.",
        "I am building momentum with each focused session.",
    ];

    useEffect(() => {
        if (isOpen) {
            setCurrentAffirmation(Math.floor(Math.random() * affirmations.length));
        }
    }, [isOpen]);

    const nextAffirmation = () => {
        setCurrentAffirmation((prev) => (prev + 1) % affirmations.length);
    };

    if (!isOpen) return null;

    const modalStyles = {
        overlay: {
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(79, 70, 229, 0.2)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            animation: "fadeIn 0.3s ease",
        },
        modal: {
            background: "linear-gradient(135deg, rgba(165, 180, 252, 0.2), rgba(129, 140, 248, 0.2))",
            borderRadius: "1.5rem",
            border: "1px solid rgba(165, 180, 252, 0.4)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            padding: "3rem",
            maxWidth: "650px",
            width: "90%",
            position: "relative",
            animation: "slideUp 0.3s ease",
            textAlign: "center",
        },
        closeButton: {
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "50%",
            background: "rgba(148, 163, 184, 0.2)",
            border: "1px solid rgba(148, 163, 184, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
            color: "var(--color-gray-600)",
        },
        header: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "2rem",
        },
        icon: {
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "1rem",
            background: "linear-gradient(135deg, rgba(165, 180, 252, 0.3), rgba(129, 140, 248, 0.3))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#818cf8",
            animation: "pulse 2s ease-in-out infinite",
        },
        title: {
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--color-gray-900)",
            margin: 0,
        },
        affirmationBox: {
            background: "rgba(255, 255, 255, 0.7)",
            borderRadius: "1.25rem",
            padding: "2.5rem 2rem",
            border: "2px solid rgba(165, 180, 252, 0.4)",
            marginBottom: "2rem",
            minHeight: "150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 30px rgba(129, 140, 248, 0.2)",
        },
        affirmationText: {
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "var(--color-gray-900)",
            lineHeight: 1.6,
            animation: "fadeInScale 0.5s ease",
        },
        button: {
            padding: "0.85rem 2rem",
            borderRadius: "0.75rem",
            background: "linear-gradient(110deg, #818cf8, #a5b4fc)",
            border: "none",
            color: "white",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            boxShadow: "0 10px 20px rgba(129, 140, 248, 0.3)",
        },
        hint: {
            fontSize: "0.9rem",
            color: "var(--color-gray-600)",
            marginTop: "1.5rem",
            fontStyle: "italic",
        },
    };

    return (
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
                    @keyframes fadeInScale {
                        from { opacity: 0; transform: scale(0.95); }
                        to { opacity: 1; transform: scale(1); }
                    }
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                    }
                `}
            </style>
            <div style={modalStyles.overlay} onClick={onClose}>
                <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
                    <button
                        style={modalStyles.closeButton}
                        onClick={onClose}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(148, 163, 184, 0.3)";
                            e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(148, 163, 184, 0.2)";
                            e.currentTarget.style.transform = "scale(1)";
                        }}
                    >
                        <XMarkIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                    </button>

                    <div style={modalStyles.header}>
                        <div style={modalStyles.icon}>
                            <SparklesIcon style={{ width: "2rem", height: "2rem" }} />
                        </div>
                        <h2 style={modalStyles.title}>💬 Affirmations</h2>
                    </div>

                    <div style={modalStyles.affirmationBox}>
                        <p key={currentAffirmation} style={modalStyles.affirmationText}>
                            "{affirmations[currentAffirmation]}"
                        </p>
                    </div>

                    <button
                        style={modalStyles.button}
                        onClick={nextAffirmation}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 15px 30px rgba(129, 140, 248, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 10px 20px rgba(129, 140, 248, 0.3)";
                        }}
                    >
                        <ArrowPathIcon style={{ width: "1.2rem", height: "1.2rem" }} />
                        Next Affirmation
                    </button>

                    <p style={modalStyles.hint}>
                        Take a deep breath and let this affirmation sink in before starting your focus session.
                    </p>
                </div>
            </div>
        </>
    );
};

export default AffirmationsRelaxation;
