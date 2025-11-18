import React from "react";
import { XMarkIcon, SparklesIcon } from "@heroicons/react/24/outline";

const CalmingGameRelaxation = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const modalStyles = {
        overlay: {
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.75)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            animation: "fadeIn 0.3s ease",
        },
        modal: {
            background: "linear-gradient(135deg, rgba(251, 146, 60, 0.1), rgba(249, 115, 22, 0.1))",
            borderRadius: "1.5rem",
            border: "1px solid rgba(251, 146, 60, 0.3)",
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
            background: "linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(249, 115, 22, 0.2))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fb923c",
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
        animationBox: {
            width: "100%",
            height: "200px",
            borderRadius: "1rem",
            background: "linear-gradient(135deg, rgba(251, 146, 60, 0.1), rgba(249, 115, 22, 0.1))",
            border: "2px solid rgba(251, 146, 60, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            marginBottom: "2rem",
        },
        floatingCircle: {
            position: "absolute",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(251, 146, 60, 0.6), rgba(249, 115, 22, 0.6))",
            animation: "float 3s ease-in-out infinite",
            boxShadow: "0 0 20px rgba(251, 146, 60, 0.5)",
        },
        comingSoon: {
            background: "linear-gradient(110deg, rgba(251, 146, 60, 0.15), rgba(249, 115, 22, 0.15))",
            borderRadius: "1rem",
            padding: "1.5rem",
            border: "1px solid rgba(251, 146, 60, 0.3)",
            textAlign: "center",
        },
        comingSoonText: {
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "#f97316",
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
                    @keyframes float {
                        0%, 100% { 
                            transform: translate(50%, 50%) scale(1); 
                        }
                        25% { 
                            transform: translate(150%, 20%) scale(1.1); 
                        }
                        50% { 
                            transform: translate(100%, 100%) scale(0.9); 
                        }
                        75% { 
                            transform: translate(20%, 80%) scale(1.05); 
                        }
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
                        <h2 style={modalStyles.title}>🎮 Calming Game</h2>
                    </div>

                    <p style={modalStyles.content}>
                        Gently engage your mind with soothing interactive experiences that help you relax 
                        and prepare for focused work. Perfect for easing into your session.
                    </p>

                    <div style={modalStyles.animationBox}>
                        <div style={modalStyles.floatingCircle}></div>
                        <div style={{ ...modalStyles.floatingCircle, animationDelay: "1s" }}></div>
                        <div style={{ ...modalStyles.floatingCircle, animationDelay: "2s" }}></div>
                    </div>

                    <div style={modalStyles.comingSoon}>
                        <p style={modalStyles.comingSoonText}>✨ Coming Soon: Interactive Calm Games</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CalmingGameRelaxation;
