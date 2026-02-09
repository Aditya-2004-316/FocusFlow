import express from "express";
import { protect } from "../middleware/auth.js";
import { getEventsForUser } from "../utils/communityEvents.js";

const router = express.Router();

/**
 * @route   GET /api/community-events
 * @desc    Get personalized community events for the current user
 * @access  Private
 */
router.get("/", protect, async (req, res) => {
    try {
        const user = req.user;

        if (!user || !user.createdAt) {
            return res.status(400).json({
                success: false,
                error: "User information not available"
            });
        }

        const events = getEventsForUser(user.createdAt);

        res.json({
            success: true,
            data: {
                events,
                cycleDay: Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24)) % 4 + 1,
                message: "Events personalized based on your account age"
            }
        });
    } catch (error) {
        console.error("Get community events error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch community events"
        });
    }
});

export default router;
