import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = "info", duration = 4000) => {
        const id = Date.now() + Math.random();

        setToasts(prev => [...prev, { id, message, type, duration }]);

        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const success = useCallback((message, duration) =>
        addToast(message, "success", duration), [addToast]);

    const error = useCallback((message, duration) =>
        addToast(message, "error", duration), [addToast]);

    const warning = useCallback((message, duration) =>
        addToast(message, "warning", duration), [addToast]);

    const info = useCallback((message, duration) =>
        addToast(message, "info", duration), [addToast]);

    const value = {
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        info,
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
};

// Toast Container Component
const ToastContainer = ({ toasts, onRemove }) => {
    if (toasts.length === 0) return null;

    return (
        <>
            <style>{`
                @keyframes toastSlideIn {
                    from {
                        transform: translateX(120%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes toastProgress {
                    from { width: 100%; }
                    to { width: 0%; }
                }
                @keyframes toastPulse {
                    0%, 100% { box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.4), 0 0 0 0 rgba(255, 255, 255, 0); }
                    50% { box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.4), 0 0 20px 2px rgba(255, 255, 255, 0.1); }
                }
            `}</style>
            <div style={containerStyle}>
                {toasts.map(toast => (
                    <Toast key={toast.id} toast={toast} onRemove={onRemove} />
                ))}
            </div>
        </>
    );
};

// Individual Toast Component
const Toast = ({ toast, onRemove }) => {
    const { id, message, type, duration } = toast;

    const getTypeStyles = () => {
        const styles = {
            success: {
                background: "linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(22, 163, 74, 0.25))",
                borderColor: "rgba(34, 197, 94, 0.5)",
                glowColor: "rgba(34, 197, 94, 0.3)",
                iconBg: "linear-gradient(135deg, #22c55e, #16a34a)",
                progressColor: "#22c55e",
                icon: "✓",
            },
            error: {
                background: "linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.25))",
                borderColor: "rgba(239, 68, 68, 0.5)",
                glowColor: "rgba(239, 68, 68, 0.3)",
                iconBg: "linear-gradient(135deg, #ef4444, #dc2626)",
                progressColor: "#ef4444",
                icon: "✕",
            },
            warning: {
                background: "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.25))",
                borderColor: "rgba(245, 158, 11, 0.5)",
                glowColor: "rgba(245, 158, 11, 0.3)",
                iconBg: "linear-gradient(135deg, #f59e0b, #d97706)",
                progressColor: "#f59e0b",
                icon: "⚠",
            },
            info: {
                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.25))",
                borderColor: "rgba(59, 130, 246, 0.5)",
                glowColor: "rgba(59, 130, 246, 0.3)",
                iconBg: "linear-gradient(135deg, #3b82f6, #2563eb)",
                progressColor: "#3b82f6",
                icon: "ℹ",
            },
        };
        return styles[type] || styles.info;
    };

    const typeStyles = getTypeStyles();

    return (
        <div
            style={{
                ...toastStyle,
                background: typeStyles.background,
                borderColor: typeStyles.borderColor,
                boxShadow: `0 10px 40px -10px rgba(0, 0, 0, 0.4), 0 0 30px -10px ${typeStyles.glowColor}`,
            }}
        >
            {/* Icon */}
            <span style={{
                ...iconStyle,
                background: typeStyles.iconBg,
            }}>
                {typeStyles.icon}
            </span>

            {/* Message */}
            <span style={messageStyle}>{message}</span>

            {/* Close button */}
            <button
                style={closeButtonStyle}
                onClick={(e) => { e.stopPropagation(); onRemove(id); }}
                onMouseEnter={(e) => e.target.style.background = "rgba(255, 255, 255, 0.3)"}
                onMouseLeave={(e) => e.target.style.background = "rgba(255, 255, 255, 0.15)"}
            >
                ✕
            </button>

            {/* Progress bar */}
            {duration > 0 && (
                <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "0 0 0.875rem 0.875rem",
                    overflow: "hidden",
                }}>
                    <div style={{
                        height: "100%",
                        background: typeStyles.progressColor,
                        animation: `toastProgress ${duration}ms linear forwards`,
                    }} />
                </div>
            )}
        </div>
    );
};

// Styles - Bottom Right positioning with premium glassmorphism
const containerStyle = {
    position: "fixed",
    bottom: "1.5rem",
    right: "1.5rem",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column-reverse",
    gap: "0.75rem",
    maxWidth: "420px",
    width: "calc(100% - 3rem)",
    pointerEvents: "none",
};

const toastStyle = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "0.875rem",
    padding: "1rem 1.25rem",
    paddingBottom: "1.25rem",
    borderRadius: "1rem",
    border: "1px solid",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    cursor: "default",
    animation: "toastSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    pointerEvents: "auto",
    overflow: "hidden",
};

const iconStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2rem",
    height: "2rem",
    borderRadius: "0.5rem",
    fontSize: "0.9rem",
    fontWeight: 700,
    color: "#fff",
    flexShrink: 0,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
};

const messageStyle = {
    flex: 1,
    color: "#f8fafc",
    fontSize: "0.9rem",
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.01em",
};

const closeButtonStyle = {
    background: "rgba(255, 255, 255, 0.15)",
    border: "none",
    borderRadius: "0.375rem",
    color: "rgba(255, 255, 255, 0.8)",
    cursor: "pointer",
    padding: "0.375rem 0.5rem",
    fontSize: "0.75rem",
    fontWeight: 600,
    flexShrink: 0,
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

// Hook to use toast
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

export default ToastContext;
