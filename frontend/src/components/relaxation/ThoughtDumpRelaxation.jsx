import React, { useState } from "react";
import { XMarkIcon, PencilSquareIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

const ThoughtDumpRelaxation = ({ isOpen, onClose }) => {
    const [thoughts, setThoughts] = useState("");
    const [saved, setSaved] = useState(false);

    if (!isOpen) return null;

    const handleSave = () => {
        if (thoughts.trim()) {
            setSaved(true);
            setTimeout(() => {
                setSaved(false);
                setThoughts("");
                onClose();
            }, 1500);
        }
    };

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
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.1))",
            borderRadius: "1.5rem",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            padding: "2.5rem",
            maxWidth: "700px",
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
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(52, 211, 153, 0.2))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#10b981",
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
            marginBottom: "1.5rem",
        },
        textarea: {
            width: "100%",
            minHeight: "200px",
            padding: "1.25rem",
            borderRadius: "1rem",
            border: "2px solid rgba(16, 185, 129, 0.3)",
            background: "rgba(255, 255, 255, 0.8)",
            fontSize: "1rem",
            color: "var(--color-gray-900)",
            fontFamily: "inherit",
            resize: "vertical",
            transition: "border-color 0.2s ease",
            outline: "none",
        },
        buttonGroup: {
            display: "flex",
            gap: "1rem",
            marginTop: "1.5rem",
            justifyContent: "flex-end",
        },
        button: {
            padding: "0.75rem 1.75rem",
            borderRadius: "0.75rem",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
            border: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
        },
        saveButton: {
            background: "linear-gradient(110deg, #10b981, #34d399)",
            color: "white",
        },
        clearButton: {
            background: "rgba(148, 163, 184, 0.2)",
            color: "var(--color-gray-700)",
            border: "1px solid rgba(148, 163, 184, 0.3)",
        },
        savedMessage: {
            display: saved ? "flex" : "none",
            alignItems: "center",
            gap: "0.5rem",
            padding: "1rem",
            background: "rgba(16, 185, 129, 0.1)",
            borderRadius: "0.75rem",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#10b981",
            fontWeight: 600,
            marginTop: "1rem",
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
                            <PencilSquareIcon style={{ width: "2rem", height: "2rem" }} />
                        </div>
                        <h2 style={modalStyles.title}>📝 Thought Dump</h2>
                    </div>

                    <p style={modalStyles.content}>
                        Clear your mental clutter by writing down any lingering thoughts, worries, or to-dos. 
                        This helps create mental space for focused work.
                    </p>

                    <textarea
                        style={modalStyles.textarea}
                        placeholder="Write down everything on your mind... worries, tasks, random thoughts..."
                        value={thoughts}
                        onChange={(e) => setThoughts(e.target.value)}
                        onFocus={(e) => e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.5)"}
                        onBlur={(e) => e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.3)"}
                    />

                    <div style={modalStyles.buttonGroup}>
                        <button
                            style={{ ...modalStyles.button, ...modalStyles.clearButton }}
                            onClick={() => setThoughts("")}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(148, 163, 184, 0.3)";
                                e.currentTarget.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(148, 163, 184, 0.2)";
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >
                            Clear
                        </button>
                        <button
                            style={{ ...modalStyles.button, ...modalStyles.saveButton }}
                            onClick={handleSave}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow = "0 10px 20px rgba(16, 185, 129, 0.3)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            <CheckCircleIcon style={{ width: "1.2rem", height: "1.2rem" }} />
                            Archive & Clear
                        </button>
                    </div>

                    <div style={modalStyles.savedMessage}>
                        <CheckCircleIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                        Thoughts archived! Your mind is now clear for focus.
                    </div>
                </div>
            </div>
        </>
    );
};

export default ThoughtDumpRelaxation;
