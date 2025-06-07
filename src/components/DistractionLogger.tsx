import { useState } from "react";
import { XMarkIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import "./DistractionLogger.css";

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

    return (
        <div className="distraction-logger-overlay">
            <div className="distraction-logger-modal">
                <div className="distraction-logger-header">
                    <div className="distraction-logger-header-left">
                        <ExclamationCircleIcon />
                        <h3 className="distraction-logger-title">
                            Log Distraction
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="distraction-logger-close-button"
                    >
                        <XMarkIcon />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="distraction-logger-form"
                >
                    <div>
                        <label className="form-group-label">
                            What distracted you?
                        </label>
                        <div className="quick-options-grid">
                            {commonDistractions.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handleQuickSelect(option)}
                                    className={`quick-option-button ${
                                        selectedQuickOption === option
                                            ? "selected"
                                            : "not-selected"
                                    }`}
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
                            className="textarea-input"
                            rows={3}
                            placeholder="Enter details about the distraction..."
                        />
                    </div>
                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={onClose}
                            className="action-button cancel"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!note.trim() || isSubmitting}
                            className={`action-button submit ${
                                !note.trim() || isSubmitting ? "disabled" : ""
                            }`}
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
