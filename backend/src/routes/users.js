import express from "express";
import { getRecentActivity } from "../controllers/userController.js";

const router = express.Router();

// Get recent community activity
router.get("/activity", getRecentActivity);

// Placeholder route
router.get("/", (req, res) => {
    res.json({ message: "Users route - coming soon" });
});

export default router;
