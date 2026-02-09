import mongoose from "mongoose";

const communityCommentSchema = new mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CommunityPost",
            required: [true, "Post ID is required"],
        },
        communityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Community",
            required: [true, "Community ID is required"],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Author is required"],
        },
        content: {
            type: String,
            required: [true, "Comment content is required"],
            trim: true,
            minlength: [1, "Comment must have content"],
            maxlength: [2000, "Comment cannot exceed 2000 characters"],
        },
        reactionsCount: {
            thumbsUp: {
                type: Number,
                default: 0,
            },
            heart: {
                type: Number,
                default: 0,
            },
        },
        isEdited: {
            type: Boolean,
            default: false,
        },
        editedAt: {
            type: Date,
            default: null,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for performance
communityCommentSchema.index({ postId: 1, createdAt: 1 });
communityCommentSchema.index({ author: 1 });
communityCommentSchema.index({ isDeleted: 1 });

export default mongoose.model("CommunityComment", communityCommentSchema);
