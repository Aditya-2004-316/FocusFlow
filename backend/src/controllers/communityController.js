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

        // If user is logged in, enrich community data with membership/contribution info
        let enrichedCommunities = communities.map(c => c.toObject());

        if (req.user) {
            const memberships = await CommunityMember.find({ userId: req.user._id });
            const membershipMap = memberships.reduce((acc, m) => {
                acc[m.communityId.toString()] = m;
                return acc;
            }, {});

            enrichedCommunities = enrichedCommunities.map(c => {
                const membership = membershipMap[c._id.toString()];
                const isCreator = c.creator._id.toString() === req.user._id.toString();

                let contributionScore = 0;
                if (isCreator) {
                    contributionScore = 100;
                } else if (membership) {
                    // Score based on actual engagement activity:
                    // Sessions attended: 15 pts each (max 60 from sessions = 4 sessions)
                    // Chat messages: 1 pt each, capped at 30
                    // Posts made: 5 pts each, capped at 25
                    const sessionScore = Math.min(60, (membership.sessionCount || 0) * 15);
                    const chatScore = Math.min(30, (membership.chatCount || 0) * 1);
                    const postScore = Math.min(25, (membership.postCount || 0) * 5);
                    contributionScore = Math.min(100, sessionScore + chatScore + postScore);
                }

                return {
                    ...c,
                    isMember: !!membership || isCreator,
                    memberRole: isCreator ? "Owner" : (membership?.role || null),
                    contributionScore: Math.round(contributionScore),
                    joinedAt: isCreator ? c.createdAt : (membership?.joinedAt || null)
                };
            });
        }

        res.status(200).json({
            success: true,
            data: enrichedCommunities,
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
        // First check authorization without loading the full document for mutation.
        const community = await Community.findById(req.params.id).select("creator");

        if (!community) {
            return res.status(404).json({
                success: false,
                error: "Community not found",
            });
        }

        if (community.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                error: "Not authorized to update this community",
            });
        }

        const { name, description, goal, commitment, tags, visibility, rules } = req.body;

        // Build update object only for provided fields.
        // Using findOneAndUpdate avoids the read-modify-save pattern that would
        // silently overwrite concurrent field edits from other admins.
        const updateFields = {};
        if (name !== undefined) updateFields.name = name;
        if (description !== undefined) updateFields.description = description;
        if (goal !== undefined) updateFields.goal = goal;
        if (commitment !== undefined) updateFields.commitment = commitment;
        if (tags !== undefined) updateFields.tags = tags;
        if (visibility !== undefined) updateFields.visibility = visibility;
        if (rules !== undefined) updateFields.rules = rules;

        const updated = await Community.findOneAndUpdate(
            { _id: req.params.id, creator: req.user._id },
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ success: false, error: "Community not found" });
        }

        res.status(200).json({
            success: true,
            data: updated,
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
        // Load the community to check visibility and existing requests
        const community = await Community.findById(req.params.id);

        if (!community) {
            return res.status(404).json({
                success: false,
                error: "Community not found",
            });
        }

        // Check CommunityMember (source of truth for membership)
        const existing = await CommunityMember.findOne({
            communityId: community._id,
            userId: req.user._id,
        });

        if (existing) {
            // If membership record exists but not in array, repair the array atomically
            await Community.findByIdAndUpdate(community._id, {
                $addToSet: { members: req.user._id },
            });
            return res.status(400).json({
                success: false,
                error: "Already a member of this community",
            });
        }

        if (community.visibility === "Public") {
            // Atomic: add to members array (no-op if already present) and increment count.
            // $addToSet prevents duplicate IDs even under concurrent requests.
            await Community.findByIdAndUpdate(community._id, {
                $addToSet: { members: req.user._id },
                $inc: { memberCount: 1 },
            });

            // CommunityMember has a unique index on (communityId, userId) — concurrent
            // duplicate inserts will throw a duplicate-key error which we handle below.
            await CommunityMember.create({
                communityId: community._id,
                userId: req.user._id,
                role: "Member",
            });

            const updated = await Community.findById(community._id);
            return res.status(200).json({
                success: true,
                message: "Successfully joined community",
                data: updated,
            });
        } else {
            // Request-to-Join: only add request if none is pending
            const existingRequest = community.joinRequests.find(
                (r) => r.userId.toString() === req.user._id.toString()
            );

            if (existingRequest) {
                return res.status(400).json({
                    success: false,
                    error: "Join request already pending",
                });
            }

            // Atomic push of the join request
            await Community.findByIdAndUpdate(community._id, {
                $push: { joinRequests: { userId: req.user._id, status: "Pending" } },
            });

            return res.status(202).json({
                success: true,
                message: "Join request submitted",
            });
        }
    } catch (error) {
        // Unique index violation on CommunityMember — concurrent duplicate join
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: "Already a member of this community",
            });
        }
        res.status(500).json({
            success: false,
            error: error.message || "An unexpected error occurred while joining the community",
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

        // Don't allow creator to leave (must delete community)
        if (community.creator.toString() === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                error: "Community creator cannot leave. Delete community instead",
            });
        }

        // Verify membership via CommunityMember (source of truth)
        const memberDoc = await CommunityMember.findOne({
            communityId: community._id,
            userId: req.user._id,
        });

        if (!memberDoc) {
            return res.status(400).json({
                success: false,
                error: "You are not a member of this community",
            });
        }

        // Atomic: remove from members array and decrement count in one operation.
        // $pull is idempotent — safe against concurrent leave requests.
        await Community.findByIdAndUpdate(community._id, {
            $pull: { members: req.user._id },
            $inc: { memberCount: -1 },
        });

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

        // Verify the approver is an Admin
        const approverDoc = await CommunityMember.findOne({
            communityId: req.params.id,
            userId: req.user._id,
        });

        if (!approverDoc || approverDoc.role !== "Admin") {
            return res.status(403).json({
                success: false,
                error: "Not authorized to approve join requests",
            });
        }

        // Atomic: mark the specific join request as Approved and add the user to members.
        // The condition on joinRequests element ensures only a pending request is matched;
        // if another admin already approved it, this update returns null and we return a
        // useful error instead of creating a duplicate member.
        const community = await Community.findOneAndUpdate(
            {
                _id: req.params.id,
                "joinRequests.userId": userId,
                "joinRequests.status": "Pending",
            },
            {
                $set: { "joinRequests.$.status": "Approved" },
                $addToSet: { members: userId },
                $inc: { memberCount: 1 },
            },
            { new: true }
        );

        if (!community) {
            return res.status(404).json({
                success: false,
                error: "Join request not found or already processed",
            });
        }

        // CommunityMember has a unique index — concurrent approvals won't create duplicates.
        try {
            await CommunityMember.create({
                communityId: community._id,
                userId,
                role: "Member",
            });
        } catch (dupErr) {
            if (dupErr.code !== 11000) throw dupErr;
            // Duplicate-key: user already has a membership record — no-op, still success.
        }

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

        // Verify the rejector is an Admin
        const approverDoc = await CommunityMember.findOne({
            communityId: req.params.id,
            userId: req.user._id,
        });

        if (!approverDoc || approverDoc.role !== "Admin") {
            return res.status(403).json({
                success: false,
                error: "Not authorized to reject join requests",
            });
        }

        // Atomic: mark only a Pending request as Rejected.
        // If another admin already rejected/approved it, the condition won't
        // match and we return a clean 404 instead of a silent no-op.
        const community = await Community.findOneAndUpdate(
            {
                _id: req.params.id,
                "joinRequests.userId": userId,
                "joinRequests.status": "Pending",
            },
            { $set: { "joinRequests.$.status": "Rejected" } },
            { new: true }
        );

        if (!community) {
            return res.status(404).json({
                success: false,
                error: "Join request not found or already processed",
            });
        }

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
        // Atomic soft-delete: the creator check is embedded in the query filter
        // so no separate read is needed and there's no window for a race.
        const community = await Community.findOneAndUpdate(
            { _id: req.params.id, creator: req.user._id },
            { $set: { isActive: false } },
            { new: true }
        );

        if (!community) {
            // Either not found OR the requester is not the creator
            const exists = await Community.exists({ _id: req.params.id });
            if (!exists) {
                return res.status(404).json({ success: false, error: "Community not found" });
            }
            return res.status(403).json({
                success: false,
                error: "Not authorized to delete this community",
            });
        }

        // Soft-delete all posts in the community (already uses updateMany — atomic)
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

        // Load community for creator info AND custom roles
        const community = await Community.findById(req.params.id).select(
            "creator customRoles"
        );

        const membersWithCreator = members.map((m) => {
            const isMemberCreator = community.creator.toString() === m.userId._id.toString();
            let displayRole;
            if (isMemberCreator) {
                displayRole = "Creator";
            } else if (m.role === "Admin") {
                displayRole = "Administrator";
            } else if (m.role === "Custom" && m.customRole) {
                displayRole = m.customRole;
            } else {
                displayRole = "Member";
            }
            return {
                _id: m._id,
                userId: m.userId,
                role: displayRole,
                dbRole: m.role,
                customRole: m.customRole || null,
                joinedAt: m.joinedAt,
                isCreator: isMemberCreator,
            };
        });

        res.status(200).json({
            success: true,
            data: membersWithCreator,
            customRoles: community.customRoles || [],
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
        const { role } = req.body; // Display name from frontend

        if (!role) {
            return res.status(400).json({ success: false, error: "Role is required" });
        }

        const community = await Community.findById(req.params.id);
        if (!community) {
            return res.status(404).json({ success: false, error: "Community not found" });
        }

        const isOwner = community.creator.toString() === req.user._id.toString();

        const requesterDoc = await CommunityMember.findOne({
            communityId: req.params.id,
            userId: req.user._id,
        });
        const isAdmin = requesterDoc?.role === "Admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ success: false, error: "Not authorized to assign roles" });
        }

        // Cannot reassign the creator's own role
        if (community.creator.toString() === req.params.userId) {
            return res.status(400).json({ success: false, error: "Cannot change the community creator's role" });
        }

        // Resolve the role display name → DB values
        const systemRoles = { "Creator": null, "Administrator": "Admin", "Member": "Member" };
        let dbRole, dbCustomRole = null;

        if (role === "Creator") {
            return res.status(400).json({ success: false, error: "The Creator role cannot be assigned" });
        } else if (role === "Administrator") {
            // Only owner can assign Administrator
            if (!isOwner) {
                return res.status(403).json({ success: false, error: "Only the Creator can assign the Administrator role" });
            }
            dbRole = "Admin";
        } else if (role === "Member") {
            dbRole = "Member";
        } else {
            // Must be a custom role defined by this community
            const customRoleDef = community.customRoles.find(r => r.name === role);
            if (!customRoleDef) {
                return res.status(400).json({
                    success: false,
                    error: `"${role}" is not a valid role for this community`,
                });
            }
            // Only owner can assign custom roles
            if (!isOwner) {
                return res.status(403).json({ success: false, error: "Only the Creator can assign custom roles" });
            }
            dbRole = "Custom";
            dbCustomRole = role;
        }

        const member = await CommunityMember.findOneAndUpdate(
            { communityId: req.params.id, userId: req.params.userId },
            { role: dbRole, customRole: dbCustomRole },
            { new: true }
        ).populate("userId", "username avatar");

        if (!member) {
            return res.status(404).json({ success: false, error: "Member not found" });
        }

        res.status(200).json({
            success: true,
            message: `Member role updated to ${role}`,
            data: member,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * @desc    Create a custom role for a community (creator only)
 * @route   POST /api/communities/:id/custom-roles
 * @access  Protected (Creator only)
 */
export const createCustomRole = async (req, res) => {
    try {
        const { name, priority, color } = req.body;

        if (!name || typeof name !== "string" || !name.trim()) {
            return res.status(400).json({ success: false, error: "Role name is required" });
        }
        if (priority === undefined || isNaN(priority) || priority < 1 || priority > 49) {
            return res.status(400).json({ success: false, error: "Priority must be between 1 and 49" });
        }

        // Prevent naming a custom role the same as system roles
        const systemNames = ["creator", "administrator", "admin", "member"];
        if (systemNames.includes(name.trim().toLowerCase())) {
            return res.status(400).json({ success: false, error: `"${name}" is a reserved system role name` });
        }

        const community = await Community.findOne({ _id: req.params.id, creator: req.user._id });
        if (!community) {
            return res.status(403).json({ success: false, error: "Not authorized or community not found" });
        }

        // Prevent duplicate custom role names (case-insensitive)
        const duplicate = community.customRoles.some(
            r => r.name.toLowerCase() === name.trim().toLowerCase()
        );
        if (duplicate) {
            return res.status(409).json({ success: false, error: "A custom role with this name already exists" });
        }

        if (community.customRoles.length >= 10) {
            return res.status(400).json({ success: false, error: "Maximum 10 custom roles allowed" });
        }

        const newRole = { name: name.trim(), priority: Number(priority), color: color || "#64748b" };
        community.customRoles.push(newRole);
        await community.save();

        res.status(201).json({ success: true, message: "Custom role created", data: community.customRoles });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * @desc    Delete a custom role from a community (creator only)
 * @route   DELETE /api/communities/:id/custom-roles/:roleName
 * @access  Protected (Creator only)
 */
export const deleteCustomRole = async (req, res) => {
    try {
        const roleName = decodeURIComponent(req.params.roleName);

        const community = await Community.findOne({ _id: req.params.id, creator: req.user._id });
        if (!community) {
            return res.status(403).json({ success: false, error: "Not authorized or community not found" });
        }

        const beforeLen = community.customRoles.length;
        community.customRoles = community.customRoles.filter(
            r => r.name.toLowerCase() !== roleName.toLowerCase()
        );

        if (community.customRoles.length === beforeLen) {
            return res.status(404).json({ success: false, error: "Custom role not found" });
        }

        await community.save();

        // Demote all members with this custom role back to Member
        await CommunityMember.updateMany(
            { communityId: req.params.id, role: "Custom", customRole: roleName },
            { $set: { role: "Member", customRole: null } }
        );

        res.status(200).json({ success: true, message: `Custom role "${roleName}" deleted`, data: community.customRoles });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * @desc    Remove a member from a community
 * @route   DELETE /api/communities/:id/members/:userId
 * @access  Protected (Creator only)
 */
export const removeMember = async (req, res) => {
    try {
        // Only fetch fields needed for authorization checks
        const community = await Community.findById(req.params.id).select("creator");
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

        // Atomic: remove from members array and decrement count.
        // $pull is idempotent — safe against duplicate or concurrent calls.
        await Community.findByIdAndUpdate(req.params.id, {
            $pull: { members: req.params.userId },
            $inc: { memberCount: -1 },
        });

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
