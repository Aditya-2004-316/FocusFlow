import express from "express";
import { getSummary, getFullStats, getCommunityStats, getGlobalCommunityStats, getGlobalLandingStats } from "../controllers/statsController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/summary", protect, getSummary);
router.get("/full", protect, getFullStats);
router.get("/community", protect, getCommunityStats);
router.get("/global-community", getGlobalCommunityStats);
router.get("/global-landing", getGlobalLandingStats);

export default router;
