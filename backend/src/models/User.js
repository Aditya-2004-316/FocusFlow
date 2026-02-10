import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email",
            ],
        },
        username: {
            type: String,
            required: [true, "Username is required"],
            trim: true,
            minlength: [3, "Username must be at least 3 characters long"],
            maxlength: [30, "Username cannot exceed 30 characters"],
            match: [
                /^[a-zA-Z0-9_]+$/,
                "Username can only contain letters, numbers, and underscores",
            ],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
            select: false,
        },
        firstName: {
            type: String,
            trim: true,
            maxlength: [50, "First name cannot exceed 50 characters"],
        },
        lastName: {
            type: String,
            trim: true,
            maxlength: [50, "Last name cannot exceed 50 characters"],
        },
        avatar: {
            type: String,
            default: null,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        emailVerificationToken: {
            type: String,
            select: false,
        },
        emailVerificationExpires: {
            type: Date,
            select: false,
        },
        resetPasswordToken: {
            type: String,
            select: false,
        },
        resetPasswordExpires: {
            type: Date,
            select: false,
        },
        lastLogin: {
            type: Date,
            default: null,
        },
        activeChallenges: [{
            challengeId: { type: String, required: true },
            startedAt: { type: Date, default: Date.now },
            status: { type: String, enum: ['active', 'completed'], default: 'active' }
        }],
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                delete ret.password;
                delete ret.emailVerificationToken;
                delete ret.emailVerificationExpires;
                delete ret.resetPasswordToken;
                delete ret.resetPasswordExpires;
                return ret;
            },
        },
    }
);

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(
            parseInt(process.env.BCRYPT_ROUNDS || "12")
        );
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token method (safe in dev if DISABLE_AUTH=true)
userSchema.methods.generateAuthToken = function () {
    if (process.env.DISABLE_AUTH === "true") {
        return "dev-token";
    }
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not set");
    }
    return jwt.sign(
        { userId: this._id, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );
};

export default mongoose.model("User", userSchema);
