import express from "express";
import { protect } from "../middleware/auth.js";
import { getRecentActivity, updateProfile, updatePassword } from "../controllers/userController.js";

const router = express.Router();

// ── Profile & Security (protected) ────────────────────────────────────────────
// Update profile details (firstName, lastName, email, username)
router.put("/profile", protect, updateProfile);

// Update password
router.put("/password", protect, updatePassword);

// ── Activity (public) ─────────────────────────────────────────────────────────
// Get recent community activity
router.get("/activity", getRecentActivity);

// Placeholder
router.get("/", (req, res) => {
    res.json({ message: "Users route" });
});

export default router;
