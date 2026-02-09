import CommunityPost from "../models/CommunityPost.js";
import PostReaction from "../models/PostReaction.js";
import CommunityMember from "../models/CommunityMember.js";
import Community from "../models/Community.js";

/**
 * @desc    Get posts in community with pagination
 * @route   GET /api/communities/:id/posts
 * @access  Public
 */
export const getPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const posts = await CommunityPost.find({
            communityId: req.params.id,
            isDeleted: false,
        })
            .populate("author", "username avatar")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await CommunityPost.countDocuments({
            communityId: req.params.id,
            isDeleted: false,
        });

        // Add user reaction info if authenticated
        let postsWithReactions = posts;
        if (req.user) {
            postsWithReactions = await Promise.all(
                posts.map(async (post) => {
                    const userReaction = await PostReaction.findOne({
                        postId: post._id,
                        userId: req.user._id,
                    });
                    return {
                        ...post.toObject(),
                        userReaction: userReaction?.reactionType || null,
                    };
                })
            );
        }

        res.status(200).json({
            success: true,
            data: postsWithReactions,
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
 * @desc    Get single post with comments
 * @route   GET /api/communities/:id/posts/:postId
 * @access  Public
 */
export const getPost = async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.postId)
            .populate("author", "username avatar")
            .populate("communityId", "name");

        if (!post || post.isDeleted) {
            return res.status(404).json({
                success: false,
                error: "Post not found",
            });
        }

        res.status(200).json({
            success: true,
            data: post,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    Create post in community
 * @route   POST /api/communities/:id/posts
 * @access  Protected
 */
export const createPost = async (req, res) => {
    try {
        const { title, content, type } = req.body;
        const communityId = req.params.id;

        // Validation
        if (!title || !content || !type) {
            return res.status(400).json({
                success: false,
                error: "Title, content, and type are required",
            });
        }

        // Check if user is community member
        const community = await Community.findById(communityId);
        if (!community) {
            return res.status(404).json({
                success: false,
                error: "Community not found",
            });
        }

        const isMember = community.members.some(
            (m) => m.toString() === req.user._id.toString()
        );

        if (!isMember) {
            return res.status(403).json({
                success: false,
                error: "Must be a community member to post",
            });
        }

        // Check if member is muted
        const memberDoc = await CommunityMember.findOne({
            communityId,
            userId: req.user._id,
        });

        if (memberDoc?.isMuted) {
            return res.status(403).json({
                success: false,
                error: "You are muted in this community",
            });
        }

        const post = await CommunityPost.create({
            communityId,
            author: req.user._id,
            title,
            content,
            type,
        });

        // Increment post count
        await CommunityMember.updateOne(
            { communityId, userId: req.user._id },
            { $inc: { postCount: 1 } }
        );

        const populatedPost = await post.populate("author", "username avatar");

        res.status(201).json({
            success: true,
            data: populatedPost,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    Update post (author only)
 * @route   PUT /api/communities/:id/posts/:postId
 * @access  Protected
 */
export const updatePost = async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                error: "Post not found",
            });
        }

        // Check if user is author
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                error: "Not authorized to update this post",
            });
        }

        const { title, content, type } = req.body;

        if (title) post.title = title;
        if (content) post.content = content;
        if (type) post.type = type;

        post.isEdited = true;
        post.editedAt = new Date();

        await post.save();

        const populatedPost = await post.populate("author", "username avatar");

        res.status(200).json({
            success: true,
            data: populatedPost,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    Delete post (author or admin only)
 * @route   DELETE /api/communities/:id/posts/:postId
 * @access  Protected
 */
export const deletePost = async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                error: "Post not found",
            });
        }

        // Check permissions
        const isAuthor = post.author.toString() === req.user._id.toString();
        const memberDoc = await CommunityMember.findOne({
            communityId: post.communityId,
            userId: req.user._id,
        });
        const isAdmin = memberDoc?.role === "Admin";

        if (!isAuthor && !isAdmin) {
            return res.status(403).json({
                success: false,
                error: "Not authorized to delete this post",
            });
        }

        post.isDeleted = true;
        await post.save();

        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    Add reaction to post
 * @route   POST /api/communities/:id/posts/:postId/react
 * @access  Protected
 */
export const reactToPost = async (req, res) => {
    try {
        const { reactionType } = req.body;
        const { postId } = req.params;

        if (!["thumbsUp", "lightbulb", "heart"].includes(reactionType)) {
            return res.status(400).json({
                success: false,
                error: "Invalid reaction type",
            });
        }

        const post = await CommunityPost.findById(postId);

        if (!post || post.isDeleted) {
            return res.status(404).json({
                success: false,
                error: "Post not found",
            });
        }

        // Check if already reacted with this type
        const existingReaction = await PostReaction.findOne({
            postId,
            userId: req.user._id,
            reactionType,
        });

        if (existingReaction) {
            return res.status(400).json({
                success: false,
                error: "Already reacted with this emoji",
            });
        }

        // Create reaction
        const reaction = await PostReaction.create({
            postId,
            userId: req.user._id,
            reactionType,
        });

        // Update post reaction count
        post.reactionsCount[reactionType] += 1;
        await post.save();

        res.status(201).json({
            success: true,
            data: reaction,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    Remove reaction from post
 * @route   DELETE /api/communities/:id/posts/:postId/react/:reactionType
 * @access  Protected
 */
export const removeReactionFromPost = async (req, res) => {
    try {
        const { reactionType } = req.params;
        const { postId } = req.params;

        const reaction = await PostReaction.findOneAndDelete({
            postId,
            userId: req.user._id,
            reactionType,
        });

        if (!reaction) {
            return res.status(404).json({
                success: false,
                error: "Reaction not found",
            });
        }

        // Update post reaction count
        const post = await CommunityPost.findById(postId);
        if (post) {
            post.reactionsCount[reactionType] = Math.max(
                0,
                post.reactionsCount[reactionType] - 1
            );
            await post.save();
        }

        res.status(200).json({
            success: true,
            message: "Reaction removed",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
