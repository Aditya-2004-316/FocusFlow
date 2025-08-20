import express from "express";
import { body, query, validationResult } from "express-validator";
import Distraction from "../models/Distraction.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Protect all routes
router.use(protect);

const mapTypeToCategory = (type) => {
    if (!type) return "other";
    const t = String(type).toLowerCase();
    if (t.includes("social")) return "social_media";
    if (t.includes("phone") || t.includes("call") || t.includes("email"))
        return "communication";
    if (t.includes("noise")) return "noise";
    if (t.includes("browse") || t.includes("web") || t.includes("internet"))
        return "browsing";
    if (t.includes("people") || t.includes("person") || t.includes("chat"))
        return "people";
    if (t.includes("thought") || t.includes("mind") || t.includes("daydream"))
        return "thoughts";
    if (t.includes("game") || t.includes("video") || t.includes("entertain"))
        return "entertainment";
    return "other";
};

// GET /api/distractions
router.get(
    "/",
    [
        query("page").optional().isInt({ min: 1 }).toInt(),
        query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
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

        const page = req.query.page || 1;
        const limit = req.query.limit || 20;
        const skip = (page - 1) * limit;

        const filter = { user: req.user._id };

        const [items, total] = await Promise.all([
            Distraction.find(filter)
                .sort({ timestamp: -1, createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Distraction.countDocuments(filter),
        ]);

        return res.json({
            success: true,
            data: { distractions: items },
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    }
);

// POST /api/distractions
router.post(
    "/",
    [
        body("note")
            .optional()
            .isString()
            .trim()
            .isLength({ min: 1, max: 1000 }),
        body("description")
            .optional()
            .isString()
            .trim()
            .isLength({ min: 1, max: 1000 }),
        body("type").optional().isString().trim(),
        body("category").optional().isString().trim(),
        body("timestamp").optional().isISO8601().toDate(),
        body("severity")
            .optional()
            .isIn(["low", "medium", "high"])
            .default("medium"),
        body("duration").optional().isInt({ min: 0, max: 240 }).toInt(),
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

        const {
            note,
            description,
            type,
            category,
            timestamp,
            severity = "medium",
            duration,
        } = req.body;

        const payload = {
            user: req.user._id,
            description: (description || note || type || "Distraction")
                .toString()
                .slice(0, 500),
            category: category || mapTypeToCategory(type || note),
            timestamp: timestamp || new Date(),
            severity,
        };
        if (typeof duration === "number") payload.duration = duration;

        const distraction = await Distraction.create(payload);

        return res.status(201).json({ success: true, data: { distraction } });
    }
);

export default router;
