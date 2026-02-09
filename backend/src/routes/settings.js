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
        body("profileSettings.bio")
            .optional()
            .isString()
            .trim()
            .isLength({ max: 500 }),
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
        body("themeSettings.glassIntensity")
            .optional()
            .isIn(["low", "medium", "high"])
            .trim(),
        body("notificationSettings.notifications")
            .optional()
            .isBoolean()
            .toBoolean(),
        body("notificationSettings.soundEnabled")
            .optional()
            .isBoolean()
            .toBoolean(),
        body("notificationSettings.desktopNotifications")
            .optional()
            .isBoolean()
            .toBoolean(),
        body("productivitySettings.autoStartBreaks")
            .optional()
            .isBoolean()
            .toBoolean(),
        body("productivitySettings.autoStartWork")
            .optional()
            .isBoolean()
            .toBoolean(),
        body("communitySettings.statusVisibility")
            .optional()
            .isBoolean()
            .toBoolean(),
        body("communitySettings.leaderboardOptIn")
            .optional()
            .isBoolean()
            .toBoolean(),
        body("privacySettings.dataSharing")
            .optional()
            .isBoolean()
            .toBoolean(),
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
        if (updates.productivitySettings) {
            settings.productivitySettings = {
                ...(settings.productivitySettings.toObject?.() ||
                    settings.productivitySettings),
                ...updates.productivitySettings,
            };
        }
        if (updates.communitySettings) {
            settings.communitySettings = {
                ...(settings.communitySettings.toObject?.() ||
                    settings.communitySettings),
                ...updates.communitySettings,
            };
        }
        if (updates.privacySettings) {
            settings.privacySettings = {
                ...(settings.privacySettings.toObject?.() ||
                    settings.privacySettings),
                ...updates.privacySettings,
            };
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
