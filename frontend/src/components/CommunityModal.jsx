import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useToast } from "../context/ToastContext";

const CommunityModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
    const toast = useToast();
    const [formData, setFormData] = useState(
        initialData || {
            name: "",
            description: "",
            goal: "Deep Work",
            commitment: "Beginner",
            tags: "",
            visibility: "Public",
            rules: "",
        }
    );
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const modalOverlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        animation: "fadeIn 0.2s ease-out",
    };

    const modalStyle = {
        background: "var(--panel-bg)",
        borderRadius: "1.25rem",
        padding: "2rem",
        maxWidth: "500px",
        width: "90vw",
        maxHeight: "90vh",
        overflow: "auto",
        border: "1px solid var(--input-border)",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
    };

    const headerStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.5rem",
    };

    const titleStyle = {
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "var(--color-gray-900)",
        margin: 0,
    };

    const closeButtonStyle = {
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-gray-600)",
        transition: "color 0.2s ease",
    };

    const formGroupStyle = {
        marginBottom: "1.5rem",
    };

    const labelStyle = {
        display: "block",
        fontSize: "0.9rem",
        fontWeight: 600,
        color: "var(--color-gray-900)",
        marginBottom: "0.5rem",
    };

    const inputStyle = {
        width: "100%",
        padding: "0.75rem",
        borderRadius: "0.75rem",
        border: "1px solid var(--input-border)",
        background: "var(--input-bg)",
        color: "var(--color-gray-900)",
        fontSize: "0.95rem",
        boxSizing: "border-box",
        transition: "border-color 0.2s ease",
        fontFamily: "inherit",
    };

    const textareaStyle = {
        ...inputStyle,
        minHeight: "100px",
        resize: "vertical",
        fontFamily: "inherit",
    };

    const selectStyle = {
        ...inputStyle,
        cursor: "pointer",
    };

    const helperTextStyle = {
        fontSize: "0.8rem",
        color: "var(--color-gray-600)",
        marginTop: "0.3rem",
    };

    const buttonContainerStyle = {
        display: "flex",
        gap: "1rem",
        marginTop: "2rem",
    };

    const buttonStyle = {
        flex: 1,
        padding: "0.9rem",
        borderRadius: "0.75rem",
        border: "none",
        fontSize: "0.95rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s ease",
    };

    const submitButtonStyle = {
        ...buttonStyle,
        background: "linear-gradient(to right, #38bdf8, #60a5fa)",
        color: "#0f172a",
        boxShadow: "0 8px 16px -4px rgba(56, 189, 248, 0.4)",
    };

    const cancelButtonStyle = {
        ...buttonStyle,
        background: "rgba(148, 163, 184, 0.1)",
        color: "var(--color-gray-600)",
        border: "1px solid var(--input-border)",
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.description.trim()) {
            toast.warning("Name and description are required");
            return;
        }

        setLoading(true);
        try {
            const tagArray = formData.tags
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t);

            await onSubmit({
                name: formData.name.trim(),
                description: formData.description.trim(),
                goal: formData.goal,
                commitment: formData.commitment?.toString().trim(),
                tags: tagArray,
                visibility: formData.visibility,
                rules: formData.rules.trim(),
            });

            onClose();
        } catch (err) {
            toast.error(err.message || "Failed to create community");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={modalOverlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <div style={headerStyle}>
                    <h2 style={titleStyle}>
                        {initialData ? "Edit Community" : "Create Community"}
                    </h2>
                    <button
                        style={closeButtonStyle}
                        onClick={onClose}
                        type="button"
                    >
                        <XMarkIcon
                            style={{ width: "1.5rem", height: "1.5rem" }}
                        />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Community Name</label>
                        <input
                            style={inputStyle}
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., Deep Work Warriors"
                        />
                        <div style={helperTextStyle}>
                            Keep it clear and descriptive (3-100 characters)
                        </div>
                    </div>

                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Description</label>
                        <textarea
                            style={textareaStyle}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="What is this community about?"
                        />
                        <div style={helperTextStyle}>
                            Help others understand your community's focus
                        </div>
                    </div>

                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Focus Goal</label>
                        <select
                            style={selectStyle}
                            name="goal"
                            value={formData.goal}
                            onChange={handleChange}
                        >
                            <option value="Deep Work">Deep Work</option>
                            <option value="ADHD Management">
                                ADHD Management
                            </option>
                            <option value="Study Discipline">
                                Study Discipline
                            </option>
                            <option value="Startup Productivity">
                                Startup Productivity
                            </option>
                            <option value="Meditation Consistency">
                                Meditation Consistency
                            </option>
                            <option value="Custom">Custom</option>
                        </select>
                    </div>

                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Commitment Level</label>
                        <select
                            style={selectStyle}
                            name="commitment"
                            value={formData.commitment}
                            onChange={handleChange}
                        >
                            <option value="Beginner">
                                Beginner - Just starting out
                            </option>
                            <option value="Intermediate">
                                Intermediate - Some experience
                            </option>
                            <option value="Advanced">
                                Advanced - Highly experienced
                            </option>
                        </select>
                        <div style={helperTextStyle}>
                            Select the difficulty level of your community
                        </div>
                    </div>

                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Tags</label>
                        <input
                            style={inputStyle}
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="e.g., deepwork, productivity, focus (comma-separated)"
                        />
                        <div style={helperTextStyle}>
                            Separate tags with commas
                        </div>
                    </div>

                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Visibility</label>
                        <select
                            style={selectStyle}
                            name="visibility"
                            value={formData.visibility}
                            onChange={handleChange}
                        >
                            <option value="Public">
                                Public - Anyone can join
                            </option>
                            <option value="Request-to-Join">
                                Request-to-Join - Moderator approval needed
                            </option>
                        </select>
                    </div>

                    <div style={formGroupStyle}>
                        <label style={labelStyle}>
                            Community Rules (Optional)
                        </label>
                        <textarea
                            style={textareaStyle}
                            name="rules"
                            value={formData.rules}
                            onChange={handleChange}
                            placeholder="Set guidelines for respectful participation..."
                        />
                    </div>

                    <div style={buttonContainerStyle}>
                        <button
                            style={cancelButtonStyle}
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            style={submitButtonStyle}
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? (initialData ? "Updating..." : "Creating...")
                                : (initialData ? "Update Community" : "Create Community")
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CommunityModal;
