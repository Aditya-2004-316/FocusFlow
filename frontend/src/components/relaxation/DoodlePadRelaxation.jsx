import React, { useRef, useEffect, useState } from "react";
import { XMarkIcon, PaintBrushIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

const DoodlePadRelaxation = ({ isOpen, onClose }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState("#38bdf8");

    useEffect(() => {
        if (!isOpen || !canvasRef.current) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        
        // Set canvas size
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        // Fill with light background
        ctx.fillStyle = "#f8fafc";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, [isOpen]);

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ctx = canvas.getContext("2d");
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#f8fafc";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

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
            background: "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(219, 39, 119, 0.1))",
            borderRadius: "1.5rem",
            border: "1px solid rgba(236, 72, 153, 0.3)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            padding: "2.5rem",
            maxWidth: "800px",
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
            zIndex: 10,
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
            background: "linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(219, 39, 119, 0.2))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ec4899",
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
        canvas: {
            width: "100%",
            height: "400px",
            borderRadius: "1rem",
            border: "2px solid rgba(236, 72, 153, 0.3)",
            cursor: "crosshair",
            background: "#f8fafc",
            marginBottom: "1.5rem",
        },
        controls: {
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
        },
        colorPicker: {
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
        },
        colorButton: {
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "50%",
            border: "2px solid transparent",
            cursor: "pointer",
            transition: "transform 0.2s ease",
        },
        clearButton: {
            padding: "0.75rem 1.5rem",
            borderRadius: "0.75rem",
            background: "rgba(148, 163, 184, 0.2)",
            border: "1px solid rgba(148, 163, 184, 0.3)",
            color: "var(--color-gray-700)",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
        },
    };

    const colors = ["#38bdf8", "#ec4899", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#1f2937"];

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
                            <PaintBrushIcon style={{ width: "2rem", height: "2rem" }} />
                        </div>
                        <h2 style={modalStyles.title}>🎨 Doodle Pad</h2>
                    </div>

                    <p style={modalStyles.content}>
                        Express yourself freely on the canvas. Let your creativity flow and relax your mind 
                        through visual expression before starting your focus session.
                    </p>

                    <canvas
                        ref={canvasRef}
                        style={modalStyles.canvas}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                    />

                    <div style={modalStyles.controls}>
                        <div style={modalStyles.colorPicker}>
                            {colors.map((c) => (
                                <button
                                    key={c}
                                    style={{
                                        ...modalStyles.colorButton,
                                        background: c,
                                        borderColor: color === c ? "#1f2937" : "transparent",
                                        transform: color === c ? "scale(1.1)" : "scale(1)",
                                    }}
                                    onClick={() => setColor(c)}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.15)"}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = color === c ? "scale(1.1)" : "scale(1)";
                                    }}
                                />
                            ))}
                        </div>
                        <button
                            style={modalStyles.clearButton}
                            onClick={clearCanvas}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(148, 163, 184, 0.3)";
                                e.currentTarget.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(148, 163, 184, 0.2)";
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >
                            <ArrowPathIcon style={{ width: "1.2rem", height: "1.2rem" }} />
                            Clear Canvas
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoodlePadRelaxation;
