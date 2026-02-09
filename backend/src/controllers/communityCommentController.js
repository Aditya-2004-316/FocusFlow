import CommunityComment from "../models/CommunityComment.js";
import CommunityPost from "../models/CommunityPost.js";
import CommunityMember from "../models/CommunityMember.js";

/**
 * @desc    Get comments on post with pagination
 * @route   GET /api/communities/:id/posts/:postId/comments
 * @access  Public
 */
export const getComments = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const comments = await CommunityComment.find({
            postId: req.params.postId,
            isDeleted: false,
        })
            .populate("author", "username avatar")
            .sort({ createdAt: 1 })
            .skip(skip)
            .limit(limit);

        const total = await CommunityComment.countDocuments({
            postId: req.params.postId,
            isDeleted: false,
        });

        res.status(200).json({
            success: true,
            data: comments,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
                limit,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    Create comment on post
 * @route   POST /api/communities/:id/posts/:postId/comments
 * @access  Protected
 */
export const createComment = async (req, res) => {
    try {
        const { content } = req.body;
        const { postId, id: communityId } = req.params;

        // Validation
        if (!content || content.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: "Comment content is required",
            });
        }

        // Check if post exists and not deleted
        const post = await CommunityPost.findById(postId);

        if (!post || post.isDeleted) {
            return res.status(404).json({
                success: false,
                error: "Post not found",
            });
        }

        // Check if user is community member
        const memberDoc = await CommunityMember.findOne({
            communityId,
            userId: req.user._id,
        });

        if (!memberDoc) {
            return res.status(403).json({
                success: false,
                error: "Must be a community member to comment",
            });
        }

        if (memberDoc.isMuted) {
            return res.status(403).json({
                success: false,
                error: "You are muted in this community",
            });
        }

        const comment = await CommunityComment.create({
            postId,
            communityId,
            author: req.user._id,
            content,
        });

        // Increment post comment count
        await CommunityPost.updateOne(
            { _id: postId },
            { $inc: { commentCount: 1 } }
        );

        const populatedComment = await comment.populate(
            "author",
            "username avatar"
        );

        res.status(201).json({
            success: true,
            data: populatedComment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    Update comment (author only)
 * @route   PUT /api/communities/:id/posts/:postId/comments/:commentId
 * @access  Protected
 */
export const updateComment = async (req, res) => {
    try {
        const { content } = req.body;
        const { commentId } = req.params;

        const comment = await CommunityComment.findById(commentId);

        if (!comment || comment.isDeleted) {
            return res.status(404).json({
                success: false,
                error: "Comment not found",
            });
        }

        // Check if user is author
        if (comment.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                error: "Not authorized to update this comment",
            });
        }

        if (content) {
            comment.content = content;
            comment.isEdited = true;
            comment.editedAt = new Date();
        }

        await comment.save();

        const populatedComment = await comment.populate(
            "author",
            "username avatar"
        );

        res.status(200).json({
            success: true,
            data: populatedComment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    Delete comment (author or admin only)
 * @route   DELETE /api/communities/:id/posts/:postId/comments/:commentId
 * @access  Protected
 */
export const deleteComment = async (req, res) => {
    try {
        const { commentId, id: communityId } = req.params;

        const comment = await CommunityComment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                error: "Comment not found",
            });
        }

        // Check permissions
        const isAuthor = comment.author.toString() === req.user._id.toString();
        const memberDoc = await CommunityMember.findOne({
            communityId,
            userId: req.user._id,
        });
        const isAdmin = memberDoc?.role === "Admin";

        if (!isAuthor && !isAdmin) {
            return res.status(403).json({
                success: false,
                error: "Not authorized to delete this comment",
            });
        }

        comment.isDeleted = true;
        await comment.save();

        // Decrement post comment count
        await CommunityPost.updateOne(
            { _id: comment.postId },
            { $inc: { commentCount: -1 } }
        );

        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    React to comment (same logic as post reactions)
 * @route   POST /api/communities/:id/posts/:postId/comments/:commentId/react
 * @access  Protected
 */
export const reactToComment = async (req, res) => {
    try {
        const { reactionType } = req.body;
        const { commentId } = req.params;

        if (!["thumbsUp", "heart"].includes(reactionType)) {
            return res.status(400).json({
                success: false,
                error: "Invalid reaction type for comments",
            });
        }

        const comment = await CommunityComment.findById(commentId);

        if (!comment || comment.isDeleted) {
            return res.status(404).json({
                success: false,
                error: "Comment not found",
            });
        }

        // For simplicity, track reaction count directly on comment
        // In production, might want separate CommentReaction collection
        if (!comment.reactionsCount[reactionType]) {
            comment.reactionsCount[reactionType] = 0;
        }

        comment.reactionsCount[reactionType] += 1;
        await comment.save();

        res.status(201).json({
            success: true,
            message: "Reaction added",
            data: comment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
