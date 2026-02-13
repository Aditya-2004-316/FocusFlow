import { createContext, useContext, useState, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";

// Context for confirm modal
const ConfirmContext = createContext(null);

export const ConfirmProvider = ({ children }) => {
    const [confirmState, setConfirmState] = useState({
        isOpen: false,
        title: "",
        message: "",
        confirmText: "Confirm",
        cancelText: "Cancel",
        variant: "danger", // danger, warning, info
        onConfirm: null,
        onCancel: null,
    });

    const confirm = useCallback(({ title, message, confirmText = "Confirm", cancelText = "Cancel", variant = "danger" }) => {
        return new Promise((resolve) => {
            setConfirmState({
                isOpen: true,
                title,
                message,
                confirmText,
                cancelText,
                variant,
                onConfirm: () => {
                    setConfirmState(prev => ({ ...prev, isOpen: false }));
                    resolve(true);
                },
                onCancel: () => {
                    setConfirmState(prev => ({ ...prev, isOpen: false }));
                    resolve(false);
                },
            });
        });
    }, []);

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}
            <ConfirmModal {...confirmState} />
        </ConfirmContext.Provider>
    );
};

export const useConfirm = () => {
    const context = useContext(ConfirmContext);
    if (!context) {
        throw new Error("useConfirm must be used within a ConfirmProvider");
    }
    return context.confirm;
};

// The modal component
const ConfirmModal = ({ isOpen, title, message, confirmText, cancelText, variant, onConfirm, onCancel }) => {
    const { isDarkMode } = useTheme();
    if (!isOpen) return null;

    const getVariantColors = () => {
        const variants = {
            danger: {
                primary: "#ef4444",
                background: isDarkMode ? "rgba(239, 68, 68, 0.1)" : "rgba(239, 68, 68, 0.08)",
                border: isDarkMode ? "rgba(239, 68, 68, 0.3)" : "rgba(239, 68, 68, 0.2)",
                gradient: "linear-gradient(135deg, #ef4444, #dc2626)",
                icon: "⚠️",
            },
            warning: {
                primary: "#f59e0b",
                background: isDarkMode ? "rgba(245, 158, 11, 0.1)" : "rgba(245, 158, 11, 0.08)",
                border: isDarkMode ? "rgba(245, 158, 11, 0.3)" : "rgba(245, 158, 11, 0.2)",
                gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
                icon: "⚡",
            },
            info: {
                primary: "#3b82f6",
                background: isDarkMode ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.08)",
                border: isDarkMode ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.2)",
                gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
                icon: "ℹ️",
            },
        };
        return variants[variant] || variants.danger;
    };

    const colors = getVariantColors();

    return (
        <>
            <style>{`
                @keyframes confirmModalFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes confirmModalSlideIn {
                    from { 
                        opacity: 0;
                        transform: scale(0.9) translateY(-20px);
                    }
                    to { 
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
            `}</style>
            <div style={getOverlayStyle(isDarkMode)} onClick={onCancel}>
                <div style={getModalStyle(isDarkMode)} onClick={(e) => e.stopPropagation()}>
                    {/* Icon */}
                    <div style={{
                        ...iconContainerStyle,
                        background: colors.background,
                        border: `2px solid ${colors.border}`,
                    }}>
                        <span style={{ fontSize: "2rem" }}>{colors.icon}</span>
                    </div>

                    {/* Content */}
                    <h3 style={getTitleStyle(isDarkMode)}>{title}</h3>
                    <p style={getMessageStyle(isDarkMode)}>{message}</p>

                    {/* Buttons */}
                    <div style={buttonContainerStyle}>
                        <button
                            onClick={onCancel}
                            style={getCancelButtonStyle(isDarkMode)}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "var(--color-gray-100)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = isDarkMode ? "rgba(255, 255, 255, 0.05)" : "var(--color-gray-50)";
                            }}
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            style={{
                                ...getConfirmButtonStyle(isDarkMode),
                                background: colors.gradient,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-1px)";
                                e.currentTarget.style.boxShadow = isDarkMode
                                    ? "0 6px 20px rgba(0, 0, 0, 0.4)"
                                    : "0 6px 16px rgba(59, 130, 246, 0.35)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = isDarkMode
                                    ? "0 4px 15px rgba(0, 0, 0, 0.3)"
                                    : "0 4px 12px rgba(59, 130, 246, 0.25)";
                            }}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

// Styles
const getOverlayStyle = (isDarkMode) => ({
    position: "fixed",
    inset: 0,
    backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.75)" : "rgba(15, 23, 42, 0.45)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10000,
    padding: "1rem",
    animation: "confirmModalFadeIn 0.2s ease-out",
});

const getModalStyle = (isDarkMode) => ({
    background: isDarkMode
        ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
        : "var(--color-white)",
    borderRadius: "1.5rem",
    padding: "2rem",
    maxWidth: "420px",
    width: "100%",
    border: isDarkMode
        ? "1px solid rgba(255, 255, 255, 0.1)"
        : "1px solid var(--color-gray-200)",
    boxShadow: isDarkMode
        ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 50px rgba(56, 189, 248, 0.1)"
        : "0 25px 50px -12px rgba(15, 23, 42, 0.15), 0 0 20px rgba(59, 130, 246, 0.05)",
    textAlign: "center",
    animation: "confirmModalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
});

const iconContainerStyle = {
    width: "4.5rem",
    height: "4.5rem",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.25rem",
};

const getTitleStyle = (isDarkMode) => ({
    fontSize: "1.35rem",
    fontWeight: 700,
    color: isDarkMode ? "#f8fafc" : "var(--color-gray-900)",
    margin: 0,
    marginBottom: "0.75rem",
});

const getMessageStyle = (isDarkMode) => ({
    fontSize: "0.95rem",
    color: isDarkMode ? "#94a3b8" : "var(--color-gray-600)",
    lineHeight: 1.6,
    margin: 0,
    marginBottom: "1.75rem",
});

const buttonContainerStyle = {
    display: "flex",
    gap: "0.75rem",
};

const getCancelButtonStyle = (isDarkMode) => ({
    flex: 1,
    padding: "0.875rem 1.5rem",
    borderRadius: "0.75rem",
    border: isDarkMode
        ? "1px solid rgba(255, 255, 255, 0.15)"
        : "1px solid var(--color-gray-200)",
    background: isDarkMode
        ? "rgba(255, 255, 255, 0.05)"
        : "var(--color-gray-50)",
    color: isDarkMode ? "#94a3b8" : "var(--color-gray-700)",
    fontSize: "0.95rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
});

const getConfirmButtonStyle = (isDarkMode) => ({
    flex: 1,
    padding: "0.875rem 1.5rem",
    borderRadius: "0.75rem",
    border: "none",
    color: "#fff",
    fontSize: "0.95rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: isDarkMode
        ? "0 4px 15px rgba(0, 0, 0, 0.3)"
        : "0 4px 12px rgba(59, 130, 246, 0.25)",
});

export default ConfirmModal;
