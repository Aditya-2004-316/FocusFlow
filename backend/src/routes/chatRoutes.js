import express from "express";
import { protect } from "../middleware/auth.js";
import { getChatMessages, sendMessage } from "../controllers/chatController.js";

const router = express.Router();

router.use(protect);

router.get("/:communityId", getChatMessages);
router.post("/:communityId", sendMessage);

export default router;
