import ChatMessage from "../models/ChatMessage.js";
import CommunityMember from "../models/CommunityMember.js";
import Community from "../models/Community.js";
import asyncHandler from "../middleware/asyncHandler.js";

/**
 * @desc    Get chat messages for a community
 * @route   GET /api/chat/:communityId
 * @access  Protected (Members Only)
 */
export const getChatMessages = asyncHandler(async (req, res) => {
    const { communityId } = req.params;

    // Verify membership
    const isMember = await CommunityMember.findOne({
        communityId,
        userId: req.user._id
    });

    const community = await Community.findById(communityId);
    const isCreator = community && community.creator.toString() === req.user._id.toString();

    if (!isMember && !isCreator) {
        return res.status(403).json({
            success: false,
            error: "You must be a member of this community to view chat messages"
        });
    }

    const messages = await ChatMessage.find({ communityId })
        .populate("sender", "username avatar")
        .sort({ createdAt: 1 })
        .limit(100);

    res.status(200).json({
        success: true,
        data: messages
    });
});

/**
 * @desc    Send a chat message
 * @route   POST /api/chat/:communityId
 * @access  Protected (Members Only)
 */
export const sendMessage = asyncHandler(async (req, res) => {
    const { communityId } = req.params;
    const { content } = req.body;

    if (!content || !content.trim()) {
        return res.status(400).json({
            success: false,
            error: "Message content is required"
        });
    }

    // Verify membership
    const isMember = await CommunityMember.findOne({
        communityId,
        userId: req.user._id
    });

    const community = await Community.findById(communityId);
    const isCreator = community && community.creator.toString() === req.user._id.toString();

    if (!isMember && !isCreator) {
        return res.status(403).json({
            success: false,
            error: "You must be a member of this community to send messages"
        });
    }

    const newMessage = await ChatMessage.create({
        communityId,
        sender: req.user._id,
        content
    });

    // Populate sender info for frontend
    await newMessage.populate("sender", "username avatar");

    // Emit socket event (if io is available in req)
    if (req.io) {
        req.io.to(communityId).emit("chat_message", newMessage);
    }

    // Increment chat count for participation score (fire-and-forget, non-critical)
    CommunityMember.findOneAndUpdate(
        { communityId, userId: req.user._id },
        { $inc: { chatCount: 1 }, $set: { lastActiveAt: new Date() } }
    ).catch(err => console.error("Failed to increment chatCount:", err));

    res.status(201).json({
        success: true,
        data: newMessage
    });
});
