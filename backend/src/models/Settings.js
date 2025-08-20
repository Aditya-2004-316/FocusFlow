import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true,
        },
        profileSettings: {
            displayName: {
                type: String,
                trim: true,
                maxlength: 100,
                default: "",
            },
        },
        timerSettings: {
            pomodoroDuration: { type: Number, min: 1, max: 60, default: 25 },
            shortBreakDuration: { type: Number, min: 1, max: 30, default: 5 },
            longBreakDuration: { type: Number, min: 1, max: 60, default: 15 },
        },
        themeSettings: {
            theme: { type: String, enum: ["light", "dark"], default: "light" },
        },
        notificationSettings: {
            notifications: { type: Boolean, default: true },
        },
        language: { type: String, default: "en" },
    },
    { timestamps: true }
);

const Settings = mongoose.model("Settings", SettingsSchema);
export default Settings;
