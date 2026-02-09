import express from "express";
import { protect } from "../middleware/auth.js";
import {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    reactToPost,
    removeReactionFromPost,
} from "../controllers/communityPostController.js";

const router = express.Router({ mergeParams: true });

// Get posts
router.get("/", getPosts);
router.get("/:postId", getPost);

// Create post (protected)
router.post("/", protect, createPost);

// Update/Delete post (protected)
router.put("/:postId", protect, updatePost);
router.delete("/:postId", protect, deletePost);

// Reactions
router.post("/:postId/react", protect, reactToPost);
router.delete("/:postId/react/:reactionType", protect, removeReactionFromPost);

export default router;
