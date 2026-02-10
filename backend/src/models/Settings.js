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
            bio: {
                type: String,
                trim: true,
                maxlength: 500,
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
            glassIntensity: { type: String, enum: ["low", "medium", "high"], default: "medium" },
        },
        notificationSettings: {
            notifications: { type: Boolean, default: true },
            soundEnabled: { type: Boolean, default: true },
            desktopNotifications: { type: Boolean, default: true },
        },
        productivitySettings: {
            autoStartBreaks: { type: Boolean, default: false },
            autoStartWork: { type: Boolean, default: false },
        },
        communitySettings: {
            statusVisibility: { type: Boolean, default: true },
            leaderboardOptIn: { type: Boolean, default: true },
        },
        privacySettings: {
            dataSharing: { type: Boolean, default: true },
        },
        dailyFocusPlan: [
            {
                time: String,
                title: String,
                description: String,
                status: { type: String, enum: ["in-progress", "scheduled", "completed"], default: "scheduled" }
            }
        ],
        weeklyPlan: [
            {
                day: String,
                focus: String,
                duration: String,
                sessions: Number
            }
        ]
    },
    { timestamps: true }
);

const Settings = mongoose.model("Settings", SettingsSchema);
export default Settings;
