import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["waiting", "ready", "active", "paused", "disconnected", "left", "completed"],
        default: "waiting",
    },
    joinedAt: {
        type: Date,
        default: Date.now,
    },
    readyAt: {
        type: Date,
        default: null,
    },
    lastSeen: {
        type: Date,
        default: Date.now,
    },
    focusTimeCompleted: {
        type: Number, // in seconds
        default: 0,
    },
}, { _id: false });

const groupSessionSchema = new mongoose.Schema({
    communityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
        required: [true, "Community ID is required"],
    },
    hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Host ID is required"],
    },
    title: {
        type: String,
        required: [true, "Session title is required"],
        trim: true,
        maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, "Description cannot exceed 500 characters"],
        default: "",
    },
    scheduledAt: {
        type: Date,
        default: null, // null means start immediately when ready
    },
    status: {
        type: String,
        enum: ["lobby", "relaxation", "focus", "break", "paused", "completed", "cancelled"],
        default: "lobby",
    },
    settings: {
        focusDuration: {
            type: Number, // in minutes
            default: 25,
            min: [5, "Focus duration must be at least 5 minutes"],
            max: [120, "Focus duration cannot exceed 120 minutes"],
        },
        breakDuration: {
            type: Number, // in minutes
            default: 5,
            min: [1, "Break duration must be at least 1 minute"],
            max: [30, "Break duration cannot exceed 30 minutes"],
        },
        relaxationActivity: {
            type: String,
            enum: ["music", "meditation", "thoughtDump", "calmingGame", "doodlePad", "affirmations", null],
            default: null,
        },
        relaxationDuration: {
            type: Number, // in minutes
            default: 3,
            min: [1, "Relaxation duration must be at least 1 minute"],
            max: [15, "Relaxation duration cannot exceed 15 minutes"],
        },
        allowLateJoin: {
            type: Boolean,
            default: true,
        },
        // How many minutes into the focus phase late-joins are still allowed.
        // 0 = no time-based cutoff (allow for the full session).
        // Defaults to half the focusDuration, enforced at join time.
        lateJoinCutoffMinutes: {
            type: Number,
            default: 0, // 0 means "use half of focusDuration" at join-time
            min: 0,
            max: 120,
        },
        autoStartOnReady: {
            type: Boolean,
            default: false, // If true, starts when all participants are ready
        },
        minParticipants: {
            type: Number,
            default: 1, // 1 means host can start alone
            min: [1, "Minimum participants must be at least 1"],
            max: [50, "Maximum participants cannot exceed 50"],
        },
        maxParticipants: {
            type: Number,
            default: 10,
            min: [2, "Maximum participants must be at least 2"],
            max: [50, "Maximum participants cannot exceed 50"],
        },
    },
    participants: [participantSchema],
    timeline: {
        lobbyStartedAt: {
            type: Date,
            default: Date.now,
        },
        relaxationStartedAt: {
            type: Date,
            default: null,
        },
        focusStartedAt: {
            type: Date,
            default: null,
        },
        focusEndsAt: {
            type: Date,
            default: null,
        },
        breakStartedAt: {
            type: Date,
            default: null,
        },
        breakEndsAt: {
            type: Date,
            default: null,
        },
        completedAt: {
            type: Date,
            default: null,
        },
    },
    stats: {
        totalFocusMinutes: {
            type: Number,
            default: 0,
        },
        participantCount: {
            type: Number,
            default: 0,
        },
        completionRate: {
            type: Number, // percentage of participants who completed
            default: 0,
        },
    },
}, {
    timestamps: true,
});

// Index for efficient queries
groupSessionSchema.index({ communityId: 1, status: 1 });
groupSessionSchema.index({ hostId: 1 });
groupSessionSchema.index({ scheduledAt: 1 });
groupSessionSchema.index({ "participants.userId": 1 });

// Virtual for checking if session is joinable
groupSessionSchema.virtual("isJoinable").get(function () {
    if (this.status === "lobby") return true;
    if (this.status === "relaxation" && this.settings.allowLateJoin) return true;
    if (this.status === "focus" && this.settings.allowLateJoin) return true;
    return false;
});

// Virtual for participant count
groupSessionSchema.virtual("currentParticipantCount").get(function () {
    return this.participants.filter(p =>
        ["waiting", "ready", "active", "paused"].includes(p.status)
    ).length;
});

// Method to check if user is participant
groupSessionSchema.methods.isParticipant = function (userId) {
    return this.participants.some(p =>
        p.userId.toString() === userId.toString() &&
        !["left", "disconnected"].includes(p.status)
    );
};

// Method to get participant by userId
groupSessionSchema.methods.getParticipant = function (userId) {
    return this.participants.find(p =>
        p.userId.toString() === userId.toString()
    );
};

// Method to check if all active participants are ready
groupSessionSchema.methods.allParticipantsReady = function () {
    const activeParticipants = this.participants.filter(p =>
        ["waiting", "ready"].includes(p.status)
    );
    return activeParticipants.length > 0 &&
        activeParticipants.every(p => p.status === "ready");
};

// Pre-save hook to update participant count
groupSessionSchema.pre("save", function (next) {
    this.stats.participantCount = this.participants.filter(p =>
        !["left", "disconnected"].includes(p.status)
    ).length;
    next();
});

const GroupSession = mongoose.model("GroupSession", groupSessionSchema);

export default GroupSession;
