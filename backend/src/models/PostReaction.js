import mongoose from "mongoose";

const postReactionSchema = new mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CommunityPost",
            required: [true, "Post ID is required"],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"],
        },
        reactionType: {
            type: String,
            enum: ["thumbsUp", "lightbulb", "heart"],
            required: [true, "Reaction type is required"],
        },
    },
    {
        timestamps: true,
    }
);

// Ensure unique reactions (one reaction per user per post)
postReactionSchema.index(
    { postId: 1, userId: 1, reactionType: 1 },
    { unique: true }
);
postReactionSchema.index({ userId: 1 });

export default mongoose.model("PostReaction", postReactionSchema);
