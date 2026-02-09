import Community from "../models/Community.js";
import CommunityMember from "../models/CommunityMember.js";
import CommunityPost from "../models/CommunityPost.js";

/**
 * @desc    Get all public communities with pagination
 * @route   GET /api/communities
 * @access  Public
 */
export const getCommunities = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const communities = await Community.find({ isActive: true })
            .select(
                "name description goal commitment tags memberCount createdAt creator members joinRequests visibility"
            )
            .populate("creator", "username avatar _id")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Community.countDocuments({ isActive: true });

        res.status(200).json({
            success: true,
            data: communities,
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
 * @desc    Get single community with members and recent posts
 * @route   GET /api/communities/:id
 * @access  Public
 */
export const getCommunity = async (req, res) => {
    try {
        const community = await Community.findById(req.params.id)
            .populate("creator", "username avatar")
            .populate("members", "username avatar");

        if (!community) {
            return res.status(404).json({
                success: false,
                error: "Community not found",
            });
        }

        // Get recent posts
        const posts = await CommunityPost.find({
            communityId: req.params.id,
            isDeleted: false,
        })
            .populate("author", "username avatar")
            .sort({ createdAt: -1 })
            .limit(5);

        // Check if current user is member or creator
        let isMember = false;
        let memberRole = null;
        if (req.user) {
            const userId = req.user._id.toString();

            // Query membership record directly for reliable check
            const memberDoc = await CommunityMember.findOne({
                communityId: req.params.id,
                userId: req.user._id,
            });

            if (memberDoc) {
                isMember = true;
                memberRole = memberDoc.role || "Member";
            }

            // Check if user is the creator (always a member)
            const creatorId = community.creator._id?.toString() || community.creator.toString();
            if (creatorId === userId) {
                isMember = true;
                memberRole = "Owner";
            }

            console.log(`isMember verification for user ${userId}: result=${isMember}, role=${memberRole}`);
        }

        res.status(200).json({
            success: true,
            data: {
                ...community.toObject(),
                isMember,
                memberRole,
                recentPosts: posts,
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
 * @desc    Create new community
 * @route   POST /api/communities
 * @access  Protected
 */
export const createCommunity = async (req, res) => {
    try {
        // Debug: log auth info for troubleshooting
        try {
            const authHeader = req.headers.authorization;
            const cookiePresent = !!(req.cookies && req.cookies.accessToken);
            console.debug(
                `createCommunity called - authHeaderPresent=${!!authHeader} cookiePresent=${cookiePresent}`
            );
        } catch (e) { }
        const { name, description, goal, commitment, tags, visibility, rules } =
            req.body;

        // Validation
        if (!name || !description || !goal || !commitment) {
            return res.status(400).json({
                success: false,
                error: "Name, description, goal, and commitment are required",
            });
        }

        // Check if community name already exists (case-insensitive)
        const existingCommunity = await Community.findOne({
            name: { $regex: `^${name}$`, $options: "i" },
        });
        if (existingCommunity) {
            return res.status(409).json({
                success: false,
                error: "Community name already exists",
            });
        }

        const community = await Community.create({
            name,
            description,
            goal,
            commitment,
            tags: tags || [],
            visibility: visibility || "Request-to-Join",
            rules: rules || null,
            creator: req.user._id,
            members: [req.user._id],
            memberCount: 1,
        });

        // Create community member record for creator (as Admin)
        await CommunityMember.create({
            communityId: community._id,
            userId: req.user._id,
            role: "Admin",
        });

        const populatedCommunity = await community.populate(
            "creator",
            "username avatar"
        );

        res.status(201).json({
            success: true,
            data: populatedCommunity,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    Update community (creator/admin only)
 * @route   PUT /api/communities/:id
 * @access  Protected
 */
export const updateCommunity = async (req, res) => {
    try {
        const community = await Community.findById(req.params.id);

        if (!community) {
            return res.status(404).json({
                success: false,
                error: "Community not found",
            });
        }

        // Check if user is creator
        if (community.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                error: "Not authorized to update this community",
            });
        }

        const { name, description, goal, commitment, tags, visibility, rules } =
            req.body;

        // Update fields
        if (name) community.name = name;
        if (description) community.description = description;
        if (goal) community.goal = goal;
        if (commitment) community.commitment = commitment;
        if (tags) community.tags = tags;
        if (visibility) community.visibility = visibility;
        if (rules !== undefined) community.rules = rules;

        await community.save();

        res.status(200).json({
            success: true,
            data: community,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    Join community
 * @route   POST /api/communities/:id/join
 * @access  Protected
 */
export const joinCommunity = async (req, res) => {
    try {
        const community = await Community.findById(req.params.id);

        if (!community) {
            return res.status(404).json({
                success: false,
                error: "Community not found",
            });
        }

        // Check if already a member using both the array and the Member collection for robustness
        const membershipInArray = community.members.some(
            (m) => m.toString() === req.user._id.toString()
        );

        const memberDoc = await CommunityMember.findOne({
            communityId: community._id,
            userId: req.user._id
        });

        if (memberDoc) {
            return res.status(400).json({
                success: false,
                error: "Already a member of this community",
            });
        }

        // Handle case where user is in members array but no Member doc exists (restore inconsistency)
        if (membershipInArray && !memberDoc) {
            console.warn(`Inconsistency found: User ${req.user._id} in members array but no CommunityMember doc for community ${community._id}. Restoring doc...`);
            await CommunityMember.create({
                communityId: community._id,
                userId: req.user._id,
                role: "Member",
            });
            return res.status(200).json({
                success: true,
                message: "Membership restored",
                data: community
            });
        }

        // If public, add directly. If request-to-join, add to join requests
        if (community.visibility === "Public") {
            community.members.push(req.user._id);
            community.memberCount += 1;
            await community.save();

            // Create membership record
            await CommunityMember.create({
                communityId: community._id,
                userId: req.user._id,
                role: "Member",
            });

            res.status(200).json({
                success: true,
                message: "Successfully joined community",
                data: community,
            });
        } else {
            // Request-to-Join: add to join requests
            const existingRequest = community.joinRequests.find(
                (r) => r.userId.toString() === req.user._id.toString()
            );

            if (existingRequest) {
                return res.status(400).json({
                    success: false,
                    error: "Join request already pending",
                });
            }

            community.joinRequests.push({
                userId: req.user._id,
                status: "Pending",
            });
            await community.save();

            res.status(202).json({
                success: true,
                message: "Join request submitted",
                data: community,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    Leave community
 * @route   POST /api/communities/:id/leave
 * @access  Protected
 */
export const leaveCommunity = async (req, res) => {
    try {
        const community = await Community.findById(req.params.id);

        if (!community) {
            return res.status(404).json({
                success: false,
                error: "Community not found",
            });
        }

        // Check if member
        const isMember = community.members.some(
            (m) => m.toString() === req.user._id.toString()
        );

        if (!isMember) {
            return res.status(400).json({
                success: false,
                error: "You are not a member of this community",
            });
        }

        // Don't allow creator to leave (must delete community)
        if (community.creator.toString() === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                error: "Community creator cannot leave. Delete community instead",
            });
        }

        // Remove from members
        community.members = community.members.filter(
            (m) => m.toString() !== req.user._id.toString()
        );
        community.memberCount = Math.max(0, community.memberCount - 1);
        await community.save();

        // Remove membership record
        await CommunityMember.deleteOne({
            communityId: community._id,
            userId: req.user._id,
        });

        res.status(200).json({
            success: true,
            message: "Successfully left community",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    Approve join request (admin only)
 * @route   POST /api/communities/:id/join-request/approve
 * @access  Protected
 */
export const approveJoinRequest = async (req, res) => {
    try {
        const { userId } = req.body;
        const community = await Community.findById(req.params.id);

        if (!community) {
            return res.status(404).json({
                success: false,
                error: "Community not found",
            });
        }

        // Check if user is admin
        const memberDoc = await CommunityMember.findOne({
            communityId: community._id,
            userId: req.user._id,
        });

        if (!memberDoc || memberDoc.role !== "Admin") {
            return res.status(403).json({
                success: false,
                error: "Not authorized to approve join requests",
            });
        }

        // Find and approve request
        const joinRequest = community.joinRequests.find(
            (r) => r.userId.toString() === userId && r.status === "Pending"
        );

        if (!joinRequest) {
            return res.status(404).json({
                success: false,
                error: "Join request not found",
            });
        }

        joinRequest.status = "Approved";
        community.members.push(userId);
        community.memberCount += 1;
        await community.save();

        // Create membership record
        await CommunityMember.create({
            communityId: community._id,
            userId,
            role: "Member",
        });

        res.status(200).json({
            success: true,
            message: "Join request approved",
            data: community,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    Reject join request (admin only)
 * @route   POST /api/communities/:id/join-request/reject
 * @access  Protected
 */
export const rejectJoinRequest = async (req, res) => {
    try {
        const { userId } = req.body;
        const community = await Community.findById(req.params.id);

        if (!community) {
            return res.status(404).json({
                success: false,
                error: "Community not found",
            });
        }

        // Check if user is admin
        const memberDoc = await CommunityMember.findOne({
            communityId: community._id,
            userId: req.user._id,
        });

        if (!memberDoc || memberDoc.role !== "Admin") {
            return res.status(403).json({
                success: false,
                error: "Not authorized to reject join requests",
            });
        }

        // Find and reject request
        const joinRequest = community.joinRequests.find(
            (r) => r.userId.toString() === userId && r.status === "Pending"
        );

        if (!joinRequest) {
            return res.status(404).json({
                success: false,
                error: "Join request not found",
            });
        }

        joinRequest.status = "Rejected";
        await community.save();

        res.status(200).json({
            success: true,
            message: "Join request rejected",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    Delete community (creator only)
 * @route   DELETE /api/communities/:id
 * @access  Protected
 */
export const deleteCommunity = async (req, res) => {
    try {
        const community = await Community.findById(req.params.id);

        if (!community) {
            return res.status(404).json({
                success: false,
                error: "Community not found",
            });
        }

        // Check if user is creator
        if (community.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                error: "Not authorized to delete this community",
            });
        }

        // Soft delete
        community.isActive = false;
        await community.save();

        // Also soft delete all posts
        await CommunityPost.updateMany(
            { communityId: community._id },
            { isDeleted: true }
        );

        res.status(200).json({
            success: true,
            message: "Community deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    Get all members of a community
 * @route   GET /api/communities/:id/members
 * @access  Public
 */
export const getMembers = async (req, res) => {
    try {
        const members = await CommunityMember.find({
            communityId: req.params.id,
        })
            .populate("userId", "username avatar email")
            .sort({ joinedAt: -1 });

        // Add creator info
        const community = await Community.findById(req.params.id).select(
            "creator"
        );

        const membersWithCreator = members.map((m) => ({
            _id: m._id,
            userId: m.userId,
            role: m.role === "Admin" ? "Creator" : m.role, // Map Admin to Creator for display
            joinedAt: m.joinedAt,
            isCreator: community.creator.toString() === m.userId._id.toString(),
        }));

        res.status(200).json({
            success: true,
            data: membersWithCreator,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    Assign a role to a community member
 * @route   PUT /api/communities/:id/members/:userId/role
 * @access  Protected (Creator/Admin only)
 */
export const assignMemberRole = async (req, res) => {
    try {
        const { role } = req.body;

        if (!["Creator", "Moderator", "Member"].includes(role)) {
            return res.status(400).json({
                success: false,
                error: "Invalid role. Must be Creator, Moderator, or Member",
            });
        }

        const community = await Community.findById(req.params.id);
        if (!community) {
            return res.status(404).json({
                success: false,
                error: "Community not found",
            });
        }

        // Check if requester is creator
        if (community.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                error: "Not authorized to assign roles",
            });
        }

        // Can't reassign creator role
        if (role === "Creator") {
            return res.status(400).json({
                success: false,
                error: "Cannot reassign creator role",
            });
        }

        const memberRole = role === "Creator" ? "Admin" : role;
        const member = await CommunityMember.findOneAndUpdate(
            { communityId: req.params.id, userId: req.params.userId },
            { role: memberRole },
            { new: true }
        ).populate("userId", "username avatar");

        if (!member) {
            return res.status(404).json({
                success: false,
                error: "Member not found",
            });
        }

        res.status(200).json({
            success: true,
            message: `Member role updated to ${role}`,
            data: member,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

/**
 * @desc    Remove a member from a community
 * @route   DELETE /api/communities/:id/members/:userId
 * @access  Protected (Creator only)
 */
export const removeMember = async (req, res) => {
    try {
        const community = await Community.findById(req.params.id);
        if (!community) {
            return res.status(404).json({
                success: false,
                error: "Community not found",
            });
        }

        // Check if requester is creator
        if (community.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                error: "Not authorized to remove members",
            });
        }

        // Can't remove creator
        if (community.creator.toString() === req.params.userId) {
            return res.status(400).json({
                success: false,
                error: "Cannot remove community creator",
            });
        }

        // Remove from members array
        community.members = community.members.filter(
            (m) => m.toString() !== req.params.userId
        );
        community.memberCount = community.members.length;
        await community.save();

        // Remove from CommunityMember
        await CommunityMember.deleteOne({
            communityId: req.params.id,
            userId: req.params.userId,
        });

        res.status(200).json({
            success: true,
            message: "Member removed successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
