import mongoose from "mongoose";

const communityMemberSchema = new mongoose.Schema(
    {
        communityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Community",
            required: [true, "Community ID is required"],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"],
        },
        role: {
            type: String,
            enum: ["Admin", "Moderator", "Member"],
            default: "Member",
        },
        joinedAt: {
            type: Date,
            default: Date.now,
        },
        isMuted: {
            type: Boolean,
            default: false,
        },
        lastActiveAt: {
            type: Date,
            default: Date.now,
        },
        postCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Ensure unique membership
communityMemberSchema.index({ communityId: 1, userId: 1 }, { unique: true });
communityMemberSchema.index({ userId: 1 });
communityMemberSchema.index({ role: 1 });

export default mongoose.model("CommunityMember", communityMemberSchema);
