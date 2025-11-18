import React from "react";
import { XMarkIcon, SparklesIcon } from "@heroicons/react/24/outline";

const MeditationRelaxation = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const modalStyles = {
        overlay: {
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(99, 102, 241, 0.2)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            animation: "fadeIn 0.3s ease",
        },
        modal: {
            background: "linear-gradient(135deg, rgba(167, 139, 250, 0.1), rgba(139, 92, 246, 0.1))",
            borderRadius: "1.5rem",
            border: "1px solid rgba(167, 139, 250, 0.3)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            padding: "2.5rem",
            maxWidth: "600px",
            width: "90%",
            position: "relative",
            animation: "slideUp 0.3s ease",
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
            gap: "1rem",
            marginBottom: "1.5rem",
        },
        icon: {
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "1rem",
            background: "linear-gradient(135deg, rgba(167, 139, 250, 0.2), rgba(139, 92, 246, 0.2))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#a78bfa",
        },
        title: {
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--color-gray-900)",
            margin: 0,
        },
        content: {
            color: "var(--color-gray-600)",
            fontSize: "1.05rem",
            lineHeight: 1.7,
            marginBottom: "2rem",
        },
        breathingCircle: {
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(167, 139, 250, 0.3), rgba(139, 92, 246, 0.3))",
            border: "3px solid rgba(167, 139, 250, 0.5)",
            margin: "2rem auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "breathe 4s ease-in-out infinite",
            boxShadow: "0 0 30px rgba(167, 139, 250, 0.4)",
        },
        breatheText: {
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "#8b5cf6",
            textAlign: "center",
        },
        comingSoon: {
            background: "linear-gradient(110deg, rgba(167, 139, 250, 0.15), rgba(139, 92, 246, 0.15))",
            borderRadius: "1rem",
            padding: "1.5rem",
            border: "1px solid rgba(167, 139, 250, 0.3)",
            textAlign: "center",
        },
        comingSoonText: {
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "#8b5cf6",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
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
                    @keyframes breathe {
                        0%, 100% { transform: scale(1); opacity: 0.8; }
                        50% { transform: scale(1.15); opacity: 1; }
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
                        <h2 style={modalStyles.title}>🧘 Mini Meditation</h2>
                    </div>

                    <p style={modalStyles.content}>
                        Take a mindful moment to center yourself before diving into focus mode. 
                        Clear your mind, breathe deeply, and prepare for productive work.
                    </p>

                    <div style={modalStyles.breathingCircle}>
                        <span style={modalStyles.breatheText}>Breathe...</span>
                    </div>

                    <div style={modalStyles.comingSoon}>
                        <p style={modalStyles.comingSoonText}>✨ Coming Soon: Guided Meditation Sessions</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MeditationRelaxation;
