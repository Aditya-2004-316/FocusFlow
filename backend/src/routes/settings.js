import express from "express";
import { body, validationResult } from "express-validator";
import { protect } from "../middleware/auth.js";
import Settings from "../models/Settings.js";

const router = express.Router();

router.use(protect);

const ensureSettings = async (userId) => {
    let settings = await Settings.findOne({ user: userId });
    if (!settings) {
        settings = await Settings.create({ user: userId });
    }
    return settings;
};

// GET /api/settings
router.get("/", async (req, res) => {
    const settings = await ensureSettings(req.user._id);
    res.json({ success: true, data: { settings } });
});

// PUT /api/settings
router.put(
    "/",
    [
        body("profileSettings.displayName")
            .optional()
            .isString()
            .trim()
            .isLength({ max: 100 }),
        body("timerSettings.pomodoroDuration")
            .optional()
            .isInt({ min: 1, max: 60 })
            .toInt(),
        body("timerSettings.shortBreakDuration")
            .optional()
            .isInt({ min: 1, max: 30 })
            .toInt(),
        body("timerSettings.longBreakDuration")
            .optional()
            .isInt({ min: 1, max: 60 })
            .toInt(),
        body("themeSettings.theme").optional().isIn(["light", "dark"]).trim(),
        body("notificationSettings.notifications")
            .optional()
            .isBoolean()
            .toBoolean(),
        body("language")
            .optional()
            .isString()
            .trim()
            .isIn(["en", "es", "fr", "de"]),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({
                    success: false,
                    error: "Validation failed",
                    details: errors.array(),
                });
        }

        const settings = await ensureSettings(req.user._id);

        const updates = req.body || {};
        if (updates.profileSettings) {
            settings.profileSettings = {
                ...(settings.profileSettings.toObject?.() ||
                    settings.profileSettings),
                ...updates.profileSettings,
            };
        }
        if (updates.timerSettings) {
            settings.timerSettings = {
                ...(settings.timerSettings.toObject?.() ||
                    settings.timerSettings),
                ...updates.timerSettings,
            };
        }
        if (updates.themeSettings) {
            settings.themeSettings = {
                ...(settings.themeSettings.toObject?.() ||
                    settings.themeSettings),
                ...updates.themeSettings,
            };
        }
        if (updates.notificationSettings) {
            settings.notificationSettings = {
                ...(settings.notificationSettings.toObject?.() ||
                    settings.notificationSettings),
                ...updates.notificationSettings,
            };
        }
        if (typeof updates.language === "string") {
            settings.language = updates.language;
        }

        await settings.save();
        res.json({
            success: true,
            message: "Settings updated successfully",
            data: { settings },
        });
    }
);

export default router;
