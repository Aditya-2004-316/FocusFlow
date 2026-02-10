import express from "express";
import {
    getSummary,
    getFullStats,
    getCommunityStats,
    getGlobalCommunityStats,
    getGlobalLandingStats,
    getFocusingUsers,
    getLeaderboard,
    getWeeklyChallengeProgress,
    startChallenge,
    leaveChallenge
} from "../controllers/statsController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/summary", protect, getSummary);
router.get("/full", protect, getFullStats);
router.get("/community", protect, getCommunityStats);
router.get("/global-community", getGlobalCommunityStats);
router.get("/global-landing", getGlobalLandingStats);
router.get("/focusing", protect, getFocusingUsers);
router.get("/leaderboard", protect, getLeaderboard);
router.get("/challenge", protect, getWeeklyChallengeProgress);
router.post("/challenge/start", protect, startChallenge);
router.post("/challenge/leave", protect, leaveChallenge);

export default router;
