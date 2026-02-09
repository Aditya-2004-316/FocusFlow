import { useState } from "react";
import { XMarkIcon, ClockIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { useToast } from "../context/ToastContext";

const CreateGroupSessionModal = ({ isOpen, onClose, onSubmit, communityId, communityName }) => {
    const toast = useToast();
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
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
    };

    const modalStyle = {
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        borderRadius: "1.5rem",
        width: "100%",
        maxWidth: "560px",
        maxHeight: "90vh",
        overflow: "auto",
        border: "1px solid rgba(56, 189, 248, 0.2)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    };

    const headerStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.5rem 2rem",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
    };

    const bodyStyle = {
        padding: "1.5rem 2rem",
    };

    const inputStyle = {
        width: "100%",
        padding: "0.875rem 1rem",
        borderRadius: "0.75rem",
        border: "1px solid rgba(255,255,255,0.15)",
        background: "rgba(255,255,255,0.05)",
        color: "#f8fafc",
        fontSize: "1rem",
        outline: "none",
        transition: "all 0.2s",
    };

    const labelStyle = {
        display: "block",
        marginBottom: "0.5rem",
        fontSize: "0.9rem",
        fontWeight: 600,
        color: "#94a3b8",
    };

    const sectionStyle = {
        marginBottom: "1.5rem",
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
                        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>
                            Create Focus Session
                        </h2>
                        <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "0.25rem" }}>
                            for {communityName}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: "rgba(255,255,255,0.1)",
                            border: "none",
                            borderRadius: "0.5rem",
                            padding: "0.5rem",
                            cursor: "pointer",
                            color: "#94a3b8",
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
                            <span style={{ fontWeight: 600, color: "#f8fafc" }}>Timer Settings</span>
                        </div>
                        <div style={rowStyle}>
                            <div>
                                <label style={labelStyle}>Focus Duration (min)</label>
                                <select
                                    name="focusDuration"
                                    value={formData.focusDuration}
                                    onChange={handleChange}
                                    style={inputStyle}
                                >
                                    <option value={15}>15 minutes</option>
                                    <option value={25}>25 minutes</option>
                                    <option value={30}>30 minutes</option>
                                    <option value={45}>45 minutes</option>
                                    <option value={60}>60 minutes</option>
                                    <option value={90}>90 minutes</option>
                                    <option value={120}>120 minutes</option>
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Break Duration (min)</label>
                                <select
                                    name="breakDuration"
                                    value={formData.breakDuration}
                                    onChange={handleChange}
                                    style={inputStyle}
                                >
                                    <option value={0}>No break</option>
                                    <option value={5}>5 minutes</option>
                                    <option value={10}>10 minutes</option>
                                    <option value={15}>15 minutes</option>
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
                            style={inputStyle}
                        >
                            {relaxationOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        {formData.relaxationActivity && (
                            <div style={{ marginTop: "1rem" }}>
                                <label style={labelStyle}>Relaxation Duration (min)</label>
                                <select
                                    name="relaxationDuration"
                                    value={formData.relaxationDuration}
                                    onChange={handleChange}
                                    style={inputStyle}
                                >
                                    <option value={2}>2 minutes</option>
                                    <option value={3}>3 minutes</option>
                                    <option value={5}>5 minutes</option>
                                    <option value={10}>10 minutes</option>
                                </select>
                            </div>
                        )}
                    </div>

                    {/* Participant Settings */}
                    <div style={sectionStyle}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                            <UserGroupIcon style={{ width: "1.25rem", height: "1.25rem", color: "#38bdf8" }} />
                            <span style={{ fontWeight: 600, color: "#f8fafc" }}>Participant Settings</span>
                        </div>
                        <div style={rowStyle}>
                            <div>
                                <label style={labelStyle}>Max Participants</label>
                                <select
                                    name="maxParticipants"
                                    value={formData.maxParticipants}
                                    onChange={handleChange}
                                    style={inputStyle}
                                >
                                    <option value={5}>5 people</option>
                                    <option value={10}>10 people</option>
                                    <option value={15}>15 people</option>
                                    <option value={20}>20 people</option>
                                    <option value={50}>50 people</option>
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
                                <label htmlFor="allowLateJoin" style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
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
                                background: "rgba(255,255,255,0.1)",
                                color: "#94a3b8",
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
