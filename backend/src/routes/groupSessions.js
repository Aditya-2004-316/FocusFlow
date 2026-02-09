import express from "express";
import { protect } from "../middleware/auth.js";
import {
    createGroupSession,
    getCommunityGroupSessions,
    getGroupSession,
    joinGroupSession,
    leaveGroupSession,
    updateParticipantStatus,
    startSession,
    advanceSession,
    cancelSession,
    updateHeartbeat,
} from "../controllers/groupSessionController.js";

const router = express.Router();

// All routes are protected
router.use(protect);

// Session CRUD
router.post("/", createGroupSession);
router.get("/community/:communityId", getCommunityGroupSessions);
router.get("/:id", getGroupSession);
router.delete("/:id", cancelSession);

// Participant actions
router.post("/:id/join", joinGroupSession);
router.post("/:id/leave", leaveGroupSession);
router.put("/:id/status", updateParticipantStatus);
router.post("/:id/heartbeat", updateHeartbeat);

// Session control (host only)
router.post("/:id/start", startSession);
router.post("/:id/advance", advanceSession);

export default router;
