import mongoose from "mongoose";

const communitySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Community name is required"],
            trim: true,
            minlength: [3, "Community name must be at least 3 characters"],
            maxlength: [100, "Community name cannot exceed 100 characters"],
            unique: true,
        },
        description: {
            type: String,
            required: [true, "Community description is required"],
            trim: true,
            minlength: [10, "Description must be at least 10 characters"],
            maxlength: [500, "Description cannot exceed 500 characters"],
        },
        goal: {
            type: String,
            enum: [
                "Deep Work",
                "ADHD Management",
                "Study Discipline",
                "Startup Productivity",
                "Meditation Consistency",
                "Custom",
            ],
            required: [true, "Focus goal is required"],
        },
        commitment: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
            required: [true, "Commitment level is required"],
        },
        tags: {
            type: [String],
            default: [],
            validate: {
                validator: function (v) {
                    return v.length <= 5;
                },
                message: "Maximum 5 tags allowed",
            },
            set: (v) => v.map((tag) => tag.toLowerCase().replace(/\s+/g, "-")),
        },
        visibility: {
            type: String,
            enum: ["Public", "Request-to-Join"],
            default: "Request-to-Join",
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Community creator is required"],
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        memberCount: {
            type: Number,
            default: 0,
        },
        rules: {
            type: String,
            trim: true,
            maxlength: [1000, "Rules cannot exceed 1000 characters"],
            default: null,
        },
        joinRequests: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                status: {
                    type: String,
                    enum: ["Pending", "Approved", "Rejected"],
                    default: "Pending",
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        // Custom roles defined by the community creator
        // Each entry: { name: string, priority: number, color: string }
        // Priority: higher number = higher authority (above Member = 0)
        // Creator = 100 (system), Admin = 50 (system), Member = 0 (system)
        customRoles: {
            type: [
                {
                    name: { type: String, required: true, trim: true, maxlength: 30 },
                    priority: { type: Number, required: true, min: 1, max: 49 },
                    color: { type: String, default: "#64748b" },
                    _id: false,
                },
            ],
            default: [],
            validate: {
                validator: function (v) { return v.length <= 10; },
                message: "Maximum 10 custom roles allowed",
            },
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Index for performance
communitySchema.index({ creator: 1 });
communitySchema.index({ tags: 1 });
communitySchema.index({ visibility: 1 });
communitySchema.index({ createdAt: -1 });

// Pre-save: ensure at least creator in members
communitySchema.pre("save", async function (next) {
    if (this.isNew && !this.members.includes(this.creator)) {
        this.members.push(this.creator);
        this.memberCount = 1;
    }
    next();
});

export default mongoose.model("Community", communitySchema);
