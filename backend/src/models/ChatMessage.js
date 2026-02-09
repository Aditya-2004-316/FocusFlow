import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
    {
        communityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Community",
            required: true,
            index: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: [true, "Message content is required"],
            trim: true,
            maxlength: [1000, "Message cannot exceed 1000 characters"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// TTL index to automatically delete messages older than 14 days
// 14 days = 14 * 24 * 60 * 60 = 1,209,600 seconds
chatMessageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1209600 });

export default mongoose.model("ChatMessage", chatMessageSchema);
