import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ActionRow, ActionButton } from "./shared/ActivityActions.jsx";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../context/ThemeContext";

const DoodlePadRelaxation = ({ isOpen, onClose, onSkipToFocus }) => {
    const { isDarkMode } = useTheme();
    const [timeLeft, setTimeLeft] = useState(180);
    const [sessionComplete, setSessionComplete] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState("#38bdf8");
    const [brushSize, setBrushSize] = useState(3);
    const [tool, setTool] = useState("brush");
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const colors = [
        "#38bdf8", // Sky blue
        "#818cf8", // Purple
        "#f472b6", // Pink
        "#fb923c", // Orange
        "#facc15", // Yellow
        "#4ade80", // Green
        "#1f2937", // Dark gray
        "#ffffff", // White
    ];

    useEffect(() => {
        if (!isOpen) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const ctx = canvas.getContext("2d");
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctxRef.current = ctx;
    }, [isOpen]);

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

    const startDrawing = (e) => {
        const ctx = ctxRef.current;
        if (!ctx) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;

        const ctx = ctxRef.current;
        if (!ctx) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (tool === "brush") {
            ctx.strokeStyle = color;
            ctx.lineWidth = brushSize;
            ctx.globalCompositeOperation = "source-over";
        } else {
            ctx.globalCompositeOperation = "destination-out";
            ctx.lineWidth = brushSize * 3;
        }

        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        if (isDrawing) {
            const ctx = ctxRef.current;
            if (ctx) {
                ctx.closePath();
            }
            setIsDrawing(false);
        }
    };

    const clearCanvas = () => {
        const ctx = ctxRef.current;
        const canvas = canvasRef.current;
        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        toolbar: {
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            padding: "1rem",
            background: "var(--color-white)",
            borderRadius: "1rem",
            border: "1px solid var(--input-border)",
        },
        toolSection: {
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
        },
        toolLabel: {
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "var(--color-gray-600)",
            textTransform: "uppercase",
        },
        colorPalette: {
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
        },
        colorButton: {
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "2px solid transparent",
            cursor: "pointer",
            transition: "transform 0.2s ease",
        },
        colorButtonActive: {
            border: "2px solid var(--color-gray-900)",
            transform: "scale(1.1)",
        },
        toolButtons: {
            display: "flex",
            gap: "0.5rem",
        },
        toolButton: {
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            border: isDarkMode ? "1px solid transparent" : "1px solid var(--input-border)",
            background: isDarkMode ? "transparent" : "var(--color-white)",
            color: isDarkMode ? "#ffffff" : "var(--color-gray-700)",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
        },
        toolButtonActive: {
            background: isDarkMode ? "var(--color-primary-900)" : "var(--color-primary-100)",
            color: isDarkMode ? "var(--color-primary-300)" : "var(--color-primary-700)",
            border: isDarkMode ? "1px solid var(--color-primary-500)" : "1px solid var(--color-primary-300)",
        },
        slider: {
            width: "150px",
            height: "6px",
            borderRadius: "3px",
            outline: "none",
            cursor: "pointer",
        },
        canvas: {
            width: "100%",
            height: "400px",
            border: "2px solid var(--input-border)",
            borderRadius: "1rem",
            background: "#ffffff",
            cursor: "crosshair",
            touchAction: "none",
        },
        actionButtons: {
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems: "center",
        },
        button: {
            padding: "0.65rem 1.25rem",
            borderRadius: "0.75rem",
            border: "none",
            fontWeight: 600,
            fontSize: "0.95rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "all 0.2s ease",
        },
        clearButton: {
            background: "var(--color-red-100)",
            color: "var(--color-red-700)",
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
                        Your creative expression has cleared your mind.
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
                <div style={styles.header}>
                    <h1 style={styles.title}>🎨 Doodle Pad</h1>
                    <div style={styles.timer}>{formatTime(timeLeft)}</div>
                </div>

                <div style={styles.toolbar}>
                    <div style={styles.toolSection}>
                        <span style={styles.toolLabel}>Colors</span>
                        <div style={styles.colorPalette}>
                            {colors.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => {
                                        setColor(c);
                                        setTool("brush");
                                    }}
                                    style={{
                                        ...styles.colorButton,
                                        background: c,
                                        ...(color === c && tool === "brush"
                                            ? styles.colorButtonActive
                                            : {}),
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform =
                                            "scale(1.15)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform =
                                            color === c && tool === "brush"
                                                ? "scale(1.1)"
                                                : "scale(1)";
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div style={styles.toolSection}>
                        <span style={styles.toolLabel}>Tool</span>
                        <div style={styles.toolButtons}>
                            <button
                                onClick={() => setTool("brush")}
                                style={{
                                    ...styles.toolButton,
                                    ...(tool === "brush"
                                        ? styles.toolButtonActive
                                        : {}),
                                }}
                            >
                                Brush
                            </button>
                            <button
                                onClick={() => setTool("eraser")}
                                style={{
                                    ...styles.toolButton,
                                    ...(tool === "eraser"
                                        ? styles.toolButtonActive
                                        : {}),
                                }}
                            >
                                Eraser
                            </button>
                        </div>
                    </div>

                    <div style={styles.toolSection}>
                        <span style={styles.toolLabel}>
                            Size: {brushSize}px
                        </span>
                        <input
                            type="range"
                            min="1"
                            max="20"
                            value={brushSize}
                            onChange={(e) =>
                                setBrushSize(parseInt(e.target.value))
                            }
                            style={styles.slider}
                        />
                    </div>
                </div>

                <canvas
                    ref={canvasRef}
                    style={styles.canvas}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                />

                <ActionRow style={styles.actionButtons}>
                    <ActionButton
                        onClick={clearCanvas}
                        style={{ ...styles.clearButton }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                                "var(--color-red-200)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                                "var(--color-red-100)";
                        }}
                    >
                        <TrashIcon style={{ width: "20px", height: "20px" }} />
                        Clear Canvas
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

export default DoodlePadRelaxation;
