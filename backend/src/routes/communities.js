import express from "express";
import { protect, optionalAuth } from "../middleware/auth.js";
import {
    getCommunities,
    getCommunity,
    createCommunity,
    updateCommunity,
    joinCommunity,
    leaveCommunity,
    approveJoinRequest,
    rejectJoinRequest,
    deleteCommunity,
    getMembers,
    assignMemberRole,
    removeMember,
    createCustomRole,
    deleteCustomRole,
} from "../controllers/communityController.js";

const router = express.Router();

// Public routes (optionalAuth allows user identification when logged in)
router.get("/", optionalAuth, getCommunities);
router.get("/:id", optionalAuth, getCommunity);

// Protected routes
router.post("/", protect, createCommunity);
router.put("/:id", protect, updateCommunity);
router.delete("/:id", protect, deleteCommunity);

// Membership routes
router.post("/:id/join", protect, joinCommunity);
router.post("/:id/leave", protect, leaveCommunity);

// Admin routes for join requests
router.post("/:id/join-request/approve", protect, approveJoinRequest);
router.post("/:id/join-request/reject", protect, rejectJoinRequest);

// Member management routes
router.get("/:id/members", getMembers);
router.put("/:id/members/:userId/role", protect, assignMemberRole);
router.delete("/:id/members/:userId", protect, removeMember);

// Custom role routes (Creator only)
router.post("/:id/custom-roles", protect, createCustomRole);
router.delete("/:id/custom-roles/:roleName", protect, deleteCustomRole);

export default router;
