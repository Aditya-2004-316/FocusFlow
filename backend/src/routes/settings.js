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
            return res.status(400).json({
                success: false,
                error: "Validation failed",
                details: errors.array(),
            });
        }

        const updates = req.body || {};
        const updateFields = {};

        // Helper to handle nested settings blocks
        const nestedSections = [
            "profileSettings",
            "timerSettings",
            "themeSettings",
            "notificationSettings",
            "productivitySettings",
            "communitySettings",
            "privacySettings",
        ];

        nestedSections.forEach((section) => {
            if (updates[section] && typeof updates[section] === "object") {
                Object.keys(updates[section]).forEach((key) => {
                    updateFields[`${section}.${key}`] = updates[section][key];
                });
            }
        });

        // Handle root-level arrays/fields
        if (updates.dailyFocusPlan) {
            updateFields.dailyFocusPlan = updates.dailyFocusPlan;
        }
        if (updates.weeklyPlan) {
            updateFields.weeklyPlan = updates.weeklyPlan;
        }

        try {
            const settings = await Settings.findOneAndUpdate(
                { user: req.user._id },
                { $set: updateFields },
                { new: true, upsert: true, runValidators: true }
            );

            res.json({
                success: true,
                message: "Settings updated successfully",
                data: { settings },
            });
        } catch (error) {
            console.error("Settings update error:", error);
            res.status(500).json({
                success: false,
                error: "Failed to update settings",
                message: error.message,
            });
        }
    }
);

export default router;
