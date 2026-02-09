import express from "express";
import { protect } from "../middleware/auth.js";
import {
    getComments,
    createComment,
    updateComment,
    deleteComment,
    reactToComment,
} from "../controllers/communityCommentController.js";

const router = express.Router({ mergeParams: true });

// Get comments
router.get("/", getComments);

// Create comment (protected)
router.post("/", protect, createComment);

// Update/Delete comment (protected)
router.put("/:commentId", protect, updateComment);
router.delete("/:commentId", protect, deleteComment);

// Reactions on comments
router.post("/:commentId/react", protect, reactToComment);

export default router;
