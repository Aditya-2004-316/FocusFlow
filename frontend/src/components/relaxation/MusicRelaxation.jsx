import React from "react";
import { XMarkIcon, MusicalNoteIcon, PlayIcon } from "@heroicons/react/24/outline";

const MusicRelaxation = ({ isOpen, onClose }) => {
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
            background: "linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(129, 140, 248, 0.1))",
            borderRadius: "1.5rem",
            border: "1px solid rgba(148, 163, 184, 0.3)",
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
            background: "linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(129, 140, 248, 0.2))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-primary-400)",
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
        comingSoon: {
            background: "linear-gradient(110deg, rgba(56, 189, 248, 0.15), rgba(129, 140, 248, 0.15))",
            borderRadius: "1rem",
            padding: "1.5rem",
            border: "1px solid rgba(56, 189, 248, 0.3)",
            textAlign: "center",
        },
        comingSoonText: {
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "var(--color-primary-700)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
        },
        placeholderList: {
            display: "grid",
            gap: "0.75rem",
            marginTop: "1.5rem",
        },
        placeholderItem: {
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1rem",
            background: "rgba(255, 255, 255, 0.5)",
            borderRadius: "0.75rem",
            border: "1px solid rgba(148, 163, 184, 0.2)",
        },
        itemIcon: {
            width: "2rem",
            height: "2rem",
            borderRadius: "0.5rem",
            background: "var(--color-primary-100)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-primary-600)",
        },
        itemText: {
            fontSize: "0.95rem",
            color: "var(--color-gray-700)",
            fontWeight: 500,
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
                            <MusicalNoteIcon style={{ width: "2rem", height: "2rem" }} />
                        </div>
                        <h2 style={modalStyles.title}>Music & Soundscapes</h2>
                    </div>

                    <p style={modalStyles.content}>
                        Immerse yourself in carefully curated ambient soundscapes and focus-enhancing music. 
                        Set the perfect mood and rhythm for your deep work sessions.
                    </p>

                    <div style={modalStyles.comingSoon}>
                        <p style={modalStyles.comingSoonText}>✨ Coming Soon: In-App Music Player</p>
                    </div>

                    <div style={modalStyles.placeholderList}>
                        {["Ambient Nature Sounds", "Lo-Fi Focus Beats", "Classical Concentration", "White Noise Generator"].map((item, idx) => (
                            <div key={idx} style={modalStyles.placeholderItem}>
                                <div style={modalStyles.itemIcon}>
                                    <PlayIcon style={{ width: "1.2rem", height: "1.2rem" }} />
                                </div>
                                <span style={modalStyles.itemText}>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MusicRelaxation;
