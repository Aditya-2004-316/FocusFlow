import { useState } from "react";
import { XMarkIcon, ClockIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { useToast } from "../context/ToastContext";
import { useTheme } from "../context/ThemeContext";

const CreateGroupSessionModal = ({ isOpen, onClose, onSubmit, communityId, communityName }) => {
    const toast = useToast();
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        focusDuration: 25,
        breakDuration: 5,
        relaxationActivity: "",
        relaxationDuration: 3,
        allowLateJoin: true,
        maxParticipants: 10,
    });
    const [loading, setLoading] = useState(false);

    const relaxationOptions = [
        { value: "", label: "No relaxation activity" },
        { value: "music", label: "🎧 Soundscapes" },
        { value: "meditation", label: "🧘 Mini Meditation" },
        { value: "thoughtDump", label: "📝 Thought Dump" },
        { value: "calmingGame", label: "🎮 Calming Game" },
        { value: "doodlePad", label: "🎨 Doodle Pad" },
        { value: "affirmations", label: "💬 Affirmations" },
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await onSubmit({
                communityId,
                title: formData.title,
                description: formData.description,
                settings: {
                    focusDuration: parseInt(formData.focusDuration),
                    breakDuration: parseInt(formData.breakDuration),
                    relaxationActivity: formData.relaxationActivity || null,
                    relaxationDuration: parseInt(formData.relaxationDuration),
                    allowLateJoin: formData.allowLateJoin,
                    maxParticipants: parseInt(formData.maxParticipants),
                },
            });
            toast.success("Focus session created!");
            // Reset form
            setFormData({
                title: "",
                description: "",
                focusDuration: 25,
                breakDuration: 5,
                relaxationActivity: "",
                relaxationDuration: 3,
                allowLateJoin: true,
                maxParticipants: 10,
            });
            onClose();
        } catch (err) {
            toast.error(err.message || "Failed to create session");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    // Styles
    const overlayStyle = {
        position: "fixed",
        inset: 0,
        backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.7)" : "rgba(15, 23, 42, 0.3)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
    };

    const modalStyle = {
        background: isDarkMode ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" : "#ffffff",
        borderRadius: "1.5rem",
        width: "100%",
        maxWidth: "560px",
        maxHeight: "90vh",
        overflow: "auto",
        border: `1px solid ${isDarkMode ? "rgba(56, 189, 248, 0.2)" : "#e2e8f0"}`,
        boxShadow: isDarkMode ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    };

    const headerStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.5rem 2rem",
        borderBottom: `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
    };

    const bodyStyle = {
        padding: "1.5rem 2rem",
    };

    const inputStyle = {
        width: "100%",
        padding: "0.875rem 1rem",
        borderRadius: "0.75rem",
        border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.15)" : "#e2e8f0"}`,
        background: isDarkMode ? "#1e293b" : "#f8fafc",
        color: isDarkMode ? "#f8fafc" : "#0f172a",
        fontSize: "1rem",
        outline: "none",
        transition: "all 0.2s",
    };

    const labelStyle = {
        display: "block",
        marginBottom: "0.5rem",
        fontSize: "0.9rem",
        fontWeight: 600,
        color: isDarkMode ? "#94a3b8" : "#64748b",
    };

    const sectionStyle = {
        marginBottom: "1.5rem",
    };

    const selectStyle = {
        ...inputStyle,
        paddingRight: "2.5rem",
        appearance: "auto",
    };

    const rowStyle = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
    };

    const buttonStyle = {
        width: "100%",
        padding: "1rem",
        borderRadius: "0.75rem",
        border: "none",
        fontWeight: 700,
        fontSize: "1rem",
        cursor: "pointer",
        transition: "all 0.2s",
    };

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div style={headerStyle}>
                    <div>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: isDarkMode ? "#f8fafc" : "#0f172a", margin: 0 }}>
                            Create Focus Session
                        </h2>
                        <p style={{ color: isDarkMode ? "#94a3b8" : "#64748b", fontSize: "0.9rem", marginTop: "0.25rem" }}>
                            for {communityName}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: isDarkMode ? "rgba(255,255,255,0.1)" : "#f1f5f9",
                            border: "none",
                            borderRadius: "0.5rem",
                            padding: "0.5rem",
                            cursor: "pointer",
                            color: isDarkMode ? "#94a3b8" : "#64748b",
                        }}
                    >
                        <XMarkIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} style={bodyStyle}>
                    {/* Title */}
                    <div style={sectionStyle}>
                        <label style={labelStyle}>Session Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Morning Focus Sprint"
                            required
                            style={inputStyle}
                        />
                    </div>

                    {/* Description */}
                    <div style={sectionStyle}>
                        <label style={labelStyle}>Description (optional)</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="What will you be working on?"
                            rows={3}
                            style={{
                                ...inputStyle,
                                resize: "vertical",
                                fontFamily: "inherit",
                            }}
                        />
                    </div>

                    {/* Timer Settings */}
                    <div style={sectionStyle}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                            <ClockIcon style={{ width: "1.25rem", height: "1.25rem", color: "#38bdf8" }} />
                            <span style={{ fontWeight: 600, color: isDarkMode ? "#f8fafc" : "#0f172a" }}>Timer Settings</span>
                        </div>
                        <div style={rowStyle}>
                            <div>
                                <label style={labelStyle}>Focus Duration (min)</label>
                                <select
                                    name="focusDuration"
                                    value={formData.focusDuration}
                                    onChange={handleChange}
                                    style={selectStyle}
                                >
                                    <option value={15} style={{ background: isDarkMode ? "#1e293b" : "#ffffff", color: isDarkMode ? "#f8fafc" : "#0f172a" }}>15 minutes</option>
                                    <option value={25} style={{ background: isDarkMode ? "#1e293b" : "#ffffff", color: isDarkMode ? "#f8fafc" : "#0f172a" }}>25 minutes</option>
                                    <option value={30} style={{ background: isDarkMode ? "#1e293b" : "#ffffff", color: isDarkMode ? "#f8fafc" : "#0f172a" }}>30 minutes</option>
                                    <option value={45} style={{ background: isDarkMode ? "#1e293b" : "#ffffff", color: isDarkMode ? "#f8fafc" : "#0f172a" }}>45 minutes</option>
                                    <option value={60} style={{ background: isDarkMode ? "#1e293b" : "#ffffff", color: isDarkMode ? "#f8fafc" : "#0f172a" }}>60 minutes</option>
                                    <option value={90} style={{ background: isDarkMode ? "#1e293b" : "#ffffff", color: isDarkMode ? "#f8fafc" : "#0f172a" }}>90 minutes</option>
                                    <option value={120} style={{ background: isDarkMode ? "#1e293b" : "#ffffff", color: isDarkMode ? "#f8fafc" : "#0f172a" }}>120 minutes</option>
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Break Duration (min)</label>
                                <select
                                    name="breakDuration"
                                    value={formData.breakDuration}
                                    onChange={handleChange}
                                    style={selectStyle}
                                >
                                    <option value={0} style={{ background: isDarkMode ? "#1e293b" : "#ffffff", color: isDarkMode ? "#f8fafc" : "#0f172a" }}>No break</option>
                                    <option value={5} style={{ background: isDarkMode ? "#1e293b" : "#ffffff", color: isDarkMode ? "#f8fafc" : "#0f172a" }}>5 minutes</option>
                                    <option value={10} style={{ background: isDarkMode ? "#1e293b" : "#ffffff", color: isDarkMode ? "#f8fafc" : "#0f172a" }}>10 minutes</option>
                                    <option value={15} style={{ background: isDarkMode ? "#1e293b" : "#ffffff", color: isDarkMode ? "#f8fafc" : "#0f172a" }}>15 minutes</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Relaxation Settings */}
                    <div style={sectionStyle}>
                        <label style={labelStyle}>Pre-Focus Relaxation</label>
                        <select
                            name="relaxationActivity"
                            value={formData.relaxationActivity}
                            onChange={handleChange}
                            style={selectStyle}
                        >
                            {relaxationOptions.map(opt => (
                                <option key={opt.value} value={opt.value} style={{ background: isDarkMode ? "#1e293b" : "#ffffff", color: isDarkMode ? "#f8fafc" : "#0f172a" }}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        {formData.relaxationActivity && (
                            <div style={{ marginTop: "1rem" }}>
                                <label style={labelStyle}>Relaxation Duration (min)</label>
                                <select
                                    name="relaxationDuration"
                                    value={formData.relaxationDuration}
                                    onChange={handleChange}
                                    style={selectStyle}
                                >
                                    <option value={2} style={{ background: isDarkMode ? "#1e293b" : "#ffffff", color: isDarkMode ? "#f8fafc" : "#0f172a" }}>2 minutes</option>
                                    <option value={3} style={{ background: isDarkMode ? "#1e293b" : "#ffffff", color: isDarkMode ? "#f8fafc" : "#0f172a" }}>3 minutes</option>
                                    <option value={5} style={{ background: isDarkMode ? "#1e293b" : "#ffffff", color: isDarkMode ? "#f8fafc" : "#0f172a" }}>5 minutes</option>
                                    <option value={10} style={{ background: isDarkMode ? "#1e293b" : "#ffffff", color: isDarkMode ? "#f8fafc" : "#0f172a" }}>10 minutes</option>
                                </select>
                            </div>
                        )}
                    </div>

                    {/* Participant Settings */}
                    <div style={sectionStyle}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                            <UserGroupIcon style={{ width: "1.25rem", height: "1.25rem", color: "#38bdf8" }} />
                            <span style={{ fontWeight: 600, color: isDarkMode ? "#f8fafc" : "#0f172a" }}>Participant Settings</span>
                        </div>
                        <div style={rowStyle}>
                            <div>
                                <label style={labelStyle}>Max Participants</label>
                                <select
                                    name="maxParticipants"
                                    value={formData.maxParticipants}
                                    onChange={handleChange}
                                    style={selectStyle}
                                >
                                    <option value={5} style={{ background: isDarkMode ? "#1e293b" : "#ffffff", color: isDarkMode ? "#f8fafc" : "#0f172a" }}>5 people</option>
                                    <option value={10} style={{ background: isDarkMode ? "#1e293b" : "#ffffff", color: isDarkMode ? "#f8fafc" : "#0f172a" }}>10 people</option>
                                    <option value={15} style={{ background: isDarkMode ? "#1e293b" : "#ffffff", color: isDarkMode ? "#f8fafc" : "#0f172a" }}>15 people</option>
                                    <option value={20} style={{ background: isDarkMode ? "#1e293b" : "#ffffff", color: isDarkMode ? "#f8fafc" : "#0f172a" }}>20 people</option>
                                    <option value={50} style={{ background: isDarkMode ? "#1e293b" : "#ffffff", color: isDarkMode ? "#f8fafc" : "#0f172a" }}>50 people</option>
                                </select>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingTop: "1.5rem" }}>
                                <input
                                    type="checkbox"
                                    name="allowLateJoin"
                                    checked={formData.allowLateJoin}
                                    onChange={handleChange}
                                    id="allowLateJoin"
                                    style={{ width: "1.25rem", height: "1.25rem", accentColor: "#38bdf8" }}
                                />
                                <label htmlFor="allowLateJoin" style={{ color: isDarkMode ? "#94a3b8" : "#64748b", fontSize: "0.9rem" }}>
                                    Allow late join
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                ...buttonStyle,
                                background: isDarkMode ? "rgba(255,255,255,0.1)" : "#f1f5f9",
                                color: isDarkMode ? "#94a3b8" : "#64748b",
                                border: isDarkMode ? "none" : "1px solid #e2e8f0"
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !formData.title.trim()}
                            style={{
                                ...buttonStyle,
                                background: "linear-gradient(135deg, #38bdf8, #60a5fa)",
                                color: "#0f172a",
                                opacity: loading || !formData.title.trim() ? 0.6 : 1,
                            }}
                        >
                            {loading ? "Creating..." : "Create Session"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateGroupSessionModal;
