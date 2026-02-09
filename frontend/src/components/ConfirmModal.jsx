import { createContext, useContext, useState, useCallback } from "react";

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
    if (!isOpen) return null;

    const getVariantColors = () => {
        const variants = {
            danger: {
                primary: "#ef4444",
                background: "rgba(239, 68, 68, 0.1)",
                border: "rgba(239, 68, 68, 0.3)",
                gradient: "linear-gradient(135deg, #ef4444, #dc2626)",
                icon: "⚠️",
            },
            warning: {
                primary: "#f59e0b",
                background: "rgba(245, 158, 11, 0.1)",
                border: "rgba(245, 158, 11, 0.3)",
                gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
                icon: "⚡",
            },
            info: {
                primary: "#3b82f6",
                background: "rgba(59, 130, 246, 0.1)",
                border: "rgba(59, 130, 246, 0.3)",
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
            <div style={overlayStyle} onClick={onCancel}>
                <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                    {/* Icon */}
                    <div style={{
                        ...iconContainerStyle,
                        background: colors.background,
                        border: `2px solid ${colors.border}`,
                    }}>
                        <span style={{ fontSize: "2rem" }}>{colors.icon}</span>
                    </div>

                    {/* Content */}
                    <h3 style={titleStyle}>{title}</h3>
                    <p style={messageStyle}>{message}</p>

                    {/* Buttons */}
                    <div style={buttonContainerStyle}>
                        <button
                            onClick={onCancel}
                            style={cancelButtonStyle}
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            style={{
                                ...confirmButtonStyle,
                                background: colors.gradient,
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
const overlayStyle = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10000,
    padding: "1rem",
    animation: "confirmModalFadeIn 0.2s ease-out",
};

const modalStyle = {
    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    borderRadius: "1.5rem",
    padding: "2rem",
    maxWidth: "420px",
    width: "100%",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 50px rgba(56, 189, 248, 0.1)",
    textAlign: "center",
    animation: "confirmModalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
};

const iconContainerStyle = {
    width: "4.5rem",
    height: "4.5rem",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.25rem",
};

const titleStyle = {
    fontSize: "1.35rem",
    fontWeight: 700,
    color: "#f8fafc",
    margin: 0,
    marginBottom: "0.75rem",
};

const messageStyle = {
    fontSize: "0.95rem",
    color: "#94a3b8",
    lineHeight: 1.6,
    margin: 0,
    marginBottom: "1.75rem",
};

const buttonContainerStyle = {
    display: "flex",
    gap: "0.75rem",
};

const cancelButtonStyle = {
    flex: 1,
    padding: "0.875rem 1.5rem",
    borderRadius: "0.75rem",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    background: "rgba(255, 255, 255, 0.05)",
    color: "#94a3b8",
    fontSize: "0.95rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
};

const confirmButtonStyle = {
    flex: 1,
    padding: "0.875rem 1.5rem",
    borderRadius: "0.75rem",
    border: "none",
    color: "#fff",
    fontSize: "0.95rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
};

export default ConfirmModal;
