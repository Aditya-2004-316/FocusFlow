import { useState } from "react";
import { XMarkIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import type { CSSProperties } from "react";

interface Distraction {
    id: string;
    timestamp: string;
    note: string;
}

interface DistractionLoggerProps {
    isOpen: boolean;
    onClose: () => void;
    onLog: (distraction: Omit<Distraction, "id">) => void;
}

const commonDistractions = [
    "Social Media",
    "Phone Call",
    "Email",
    "Noise",
    "Hunger",
    "Fatigue",
    "Other",
];

const DistractionLogger: React.FC<DistractionLoggerProps> = ({
    isOpen,
    onClose,
    onLog,
}) => {
    const [note, setNote] = useState("");
    const [selectedQuickOption, setSelectedQuickOption] = useState<
        string | null
    >(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (note.trim()) {
            setIsSubmitting(true);
            onLog({
                timestamp: new Date().toISOString(),
                note: note.trim(),
            });
            setTimeout(() => {
                setNote("");
                setSelectedQuickOption(null);
                setIsSubmitting(false);
                onClose();
            }, 300);
        }
    };

    const handleQuickSelect = (option: string) => {
        setSelectedQuickOption(option);
        setNote(option === "Other" ? "" : option);
    };

    if (!isOpen) return null;

    const overlayStyle: CSSProperties = {
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(5px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        animation: "fadeIn 0.3s ease-out",
        zIndex: 50,
    };

    const modalStyle: CSSProperties = {
        backgroundColor: "var(--color-white)",
        borderRadius: "1rem",
        padding: "2rem",
        width: "100%",
        maxWidth: "28rem",
        transform:
            "translate(0, 0) rotate(0deg) skewX(0deg) skewY(0deg) scaleX(1) scaleY(1)",
        transition: "all 300ms ease-in-out",
        animation: "scaleIn 0.3s ease-out",
    };

    const headerStyle: CSSProperties = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.5rem",
    };

    const headerLeftStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
    };

    const titleStyle: CSSProperties = {
        fontSize: "1.25rem",
        fontWeight: 700,
        color: "var(--color-gray-800)",
    };

    const closeButtonStyle: CSSProperties = {
        color: "var(--color-gray-500)",
        transition: "colors 300ms ease-in-out",
        padding: "0.5rem",
        borderRadius: "9999px",
        cursor: "pointer",
        border: "none",
        background: "none",
    };

    const formStyle: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
    };

    const labelStyle: CSSProperties = {
        display: "block",
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "var(--color-gray-700)",
        marginBottom: "0.75rem",
    };

    const quickOptionsGridStyle: CSSProperties = {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "0.75rem",
        marginBottom: "1rem",
    };

    const getQuickOptionButtonStyle = (isSelected: boolean): CSSProperties => ({
        padding: "0.75rem",
        borderRadius: "0.75rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        transition: "all 300ms ease-in-out",
        transform:
            "translate(0, 0) rotate(0deg) skewX(0deg) skewY(0deg) scaleX(1) scaleY(1)",
        backgroundColor: isSelected
            ? "var(--color-primary-500)"
            : "var(--color-gray-100)",
        color: isSelected ? "var(--color-white)" : "var(--color-gray-700)",
        border: "none",
        cursor: "pointer",
        boxShadow: isSelected
            ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            : "none",
    });

    const textareaStyle: CSSProperties = {
        width: "100%",
        padding: "1rem",
        border: "1px solid var(--color-gray-300)",
        borderRadius: "0.75rem",
        resize: "none",
        transition: "all 300ms ease-in-out",
    };

    const formActionsStyle: CSSProperties = {
        display: "flex",
        gap: "1rem",
    };

    const getActionButtonStyle = (
        type: "cancel" | "submit",
        isDisabled?: boolean
    ): CSSProperties => ({
        flex: "1 1 0%",
        padding: "0.75rem 1.5rem",
        borderRadius: "0.75rem",
        fontWeight: 500,
        transition: "all 300ms ease-in-out",
        transform:
            "translate(0, 0) rotate(0deg) skewX(0deg) skewY(0deg) scaleX(1) scaleY(1)",
        backgroundColor:
            type === "cancel"
                ? "var(--color-gray-100)"
                : "var(--color-primary-500)",
        color:
            type === "cancel" ? "var(--color-gray-700)" : "var(--color-white)",
        border: "none",
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.5 : 1,
        boxShadow:
            type === "submit" && !isDisabled
                ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                : "none",
    });

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <div style={headerStyle}>
                    <div style={headerLeftStyle}>
                        <ExclamationCircleIcon
                            style={{
                                height: "1.5rem",
                                width: "1.5rem",
                                color: "var(--color-primary-500)",
                            }}
                        />
                        <h3 style={titleStyle}>Log Distraction</h3>
                    </div>
                    <button onClick={onClose} style={closeButtonStyle}>
                        <XMarkIcon
                            style={{ height: "1.25rem", width: "1.25rem" }}
                        />
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={formStyle}>
                    <div>
                        <label style={labelStyle}>What distracted you?</label>
                        <div style={quickOptionsGridStyle}>
                            {commonDistractions.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handleQuickSelect(option)}
                                    style={getQuickOptionButtonStyle(
                                        selectedQuickOption === option
                                    )}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        <textarea
                            value={note}
                            onChange={(e) => {
                                setNote(e.target.value);
                                setSelectedQuickOption(null);
                            }}
                            style={textareaStyle}
                            rows={3}
                            placeholder="Enter details about the distraction..."
                        />
                    </div>
                    <div style={formActionsStyle}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={getActionButtonStyle("cancel")}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!note.trim() || isSubmitting}
                            style={getActionButtonStyle(
                                "submit",
                                !note.trim() || isSubmitting
                            )}
                        >
                            {isSubmitting ? "Logging..." : "Log Distraction"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DistractionLogger;
