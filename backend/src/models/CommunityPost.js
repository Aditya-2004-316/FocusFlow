import mongoose from "mongoose";

const communityPostSchema = new mongoose.Schema(
    {
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
        title: {
            type: String,
            required: [true, "Post title is required"],
            trim: true,
            minlength: [5, "Title must be at least 5 characters"],
            maxlength: [200, "Title cannot exceed 200 characters"],
        },
        content: {
            type: String,
            required: [true, "Post content is required"],
            trim: true,
            minlength: [10, "Content must be at least 10 characters"],
            maxlength: [5000, "Content cannot exceed 5000 characters"],
        },
        type: {
            type: String,
            enum: ["Experience", "Tip", "Motivation", "Technique", "Question"],
            required: [true, "Post type is required"],
        },
        reactionsCount: {
            thumbsUp: {
                type: Number,
                default: 0,
            },
            lightbulb: {
                type: Number,
                default: 0,
            },
            heart: {
                type: Number,
                default: 0,
            },
        },
        commentCount: {
            type: Number,
            default: 0,
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
communityPostSchema.index({ communityId: 1, createdAt: -1 });
communityPostSchema.index({ author: 1 });
communityPostSchema.index({ isDeleted: 1 });

// Virtual for total reaction count
communityPostSchema.virtual("totalReactions").get(function () {
    return (
        this.reactionsCount.thumbsUp +
        this.reactionsCount.lightbulb +
        this.reactionsCount.heart
    );
});

export default mongoose.model("CommunityPost", communityPostSchema);
