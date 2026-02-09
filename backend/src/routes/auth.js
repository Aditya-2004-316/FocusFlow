import express from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import rateLimit from "express-rate-limit";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";
import {
    sendVerificationEmail,
    sendPasswordResetEmail,
} from "../utils/emailService.js";

const router = express.Router();

// Stricter rate limiting for auth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window
    message: "Too many authentication attempts, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});

// Helper function to generate tokens
const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    const refreshToken = jwt.sign(
        { userId },
        process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d" }
    );

    return { accessToken, refreshToken };
};

// Helper function to set token cookies
const setTokenCookies = (res, accessToken, refreshToken) => {
    const isProduction = process.env.NODE_ENV === "production";

    // Access token cookie (7 days by default)
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: isProduction,
        // In production (Render <-> Vercel), we need 'none' for cross-site cookies
        sameSite: isProduction ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Refresh token cookie (30 days by default)
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post(
    "/register",
    [
        body("email")
            .isEmail()
            .withMessage("Please provide a valid email")
            .normalizeEmail(),
        body("username")
            .isLength({ min: 3, max: 30 })
            .withMessage("Username must be between 3 and 30 characters")
            .matches(/^[a-zA-Z0-9_]+$/)
            .withMessage(
                "Username can only contain letters, numbers, and underscores"
            ),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long"),
        body("firstName")
            .optional()
            .isLength({ max: 50 })
            .withMessage("First name cannot exceed 50 characters"),
        body("lastName")
            .optional()
            .isLength({ max: 50 })
            .withMessage("Last name cannot exceed 50 characters"),
    ],
    async (req, res) => {
        try {
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    error: "Validation failed",
                    details: errors.array(),
                });
            }

            const { email, username, password, firstName, lastName } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({
                $or: [{ email }, { username }],
            });

            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    error:
                        existingUser.email === email
                            ? "Email already registered"
                            : "Username already taken",
                });
            }

            // Create user
            const user = await User.create({
                email,
                username,
                password,
                firstName,
                lastName,
                emailVerificationToken: crypto.randomBytes(32).toString("hex"),
                emailVerificationExpires: new Date(
                    Date.now() + 24 * 60 * 60 * 1000
                ), // 24 hours
            });

            // Generate tokens
            const { accessToken, refreshToken } = generateTokens(user._id);

            // Set HTTP-only cookies
            setTokenCookies(res, accessToken, refreshToken);

            // Send verification email (don't wait for it)
            sendVerificationEmail(user, user.emailVerificationToken).catch(
                (err) =>
                    console.error("Failed to send verification email:", err)
            );

            res.status(201).json({
                success: true,
                message:
                    "User registered successfully. Please check your email to verify your account.",
                data: {
                    user: {
                        id: user._id,
                        email: user.email,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        isEmailVerified: user.isEmailVerified,
                    },
                    token: accessToken, // Also return in response for flexibility
                },
            });
        } catch (error) {
            console.error("Registration error:", error);
            res.status(500).json({
                success: false,
                error: "Server error during registration",
            });
        }
    }
);

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post(
    "/login",
    authLimiter,
    [
        body("email")
            .isEmail()
            .withMessage("Please provide a valid email")
            .normalizeEmail(),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    async (req, res) => {
        try {
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    error: "Validation failed",
                    details: errors.array(),
                });
            }

            const { email, password } = req.body;

            // Find user and include password for comparison
            const user = await User.findOne({ email }).select("+password");

            if (!user) {
                return res.status(401).json({
                    success: false,
                    error: "Invalid credentials",
                });
            }

            // Check password
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    error: "Invalid credentials",
                });
            }

            // Update last login
            user.lastLogin = new Date();
            await user.save();

            // Generate tokens
            const { accessToken, refreshToken } = generateTokens(user._id);

            // Set HTTP-only cookies
            setTokenCookies(res, accessToken, refreshToken);

            res.json({
                success: true,
                message: "Login successful",
                data: {
                    user: {
                        id: user._id,
                        email: user.email,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        isEmailVerified: user.isEmailVerified,
                        lastLogin: user.lastLogin,
                    },
                    token: accessToken,
                },
            });
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({
                success: false,
                error: "Server error during login",
            });
        }
    }
);

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
router.get("/me", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        res.json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    avatar: user.avatar,
                    isEmailVerified: user.isEmailVerified,
                    lastLogin: user.lastLogin,
                    createdAt: user.createdAt,
                },
            },
        });
    } catch (error) {
        console.error("Get user error:", error);
        res.status(500).json({
            success: false,
            error: "Server error",
        });
    }
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
router.post("/logout", protect, async (req, res) => {
    try {
        // Clear cookies
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        res.json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({
            success: false,
            error: "Server error during logout",
        });
    }
});

// @desc    Refresh access token
// @route   POST /api/auth/refresh-token
// @access  Public
router.post("/refresh-token", async (req, res) => {
    try {
        const { refreshToken: bodyToken } = req.body;
        const cookieToken = req.cookies?.refreshToken;
        const refreshToken = cookieToken || bodyToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                error: "Refresh token required",
            });
        }

        // Verify refresh token
        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
        );

        // Get user
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                error: "User not found",
            });
        }

        // Generate new tokens
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(
            user._id
        );

        // Set new cookies
        setTokenCookies(res, accessToken, newRefreshToken);

        res.json({
            success: true,
            data: {
                token: accessToken,
            },
        });
    } catch (error) {
        console.error("Token refresh error:", error);
        res.status(401).json({
            success: false,
            error: "Invalid or expired refresh token",
        });
    }
});

// @desc    Request password reset
// @route   POST /api/auth/forgot-password
// @access  Public
router.post(
    "/forgot-password",
    authLimiter,
    [
        body("email")
            .isEmail()
            .withMessage("Please provide a valid email")
            .normalizeEmail(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    error: "Validation failed",
                    details: errors.array(),
                });
            }

            const { email } = req.body;

            // Find user
            const user = await User.findOne({ email });

            // Always return success to prevent email enumeration
            if (!user) {
                return res.json({
                    success: true,
                    message:
                        "If an account exists with that email, a password reset link has been sent.",
                });
            }

            // Generate reset token
            const resetToken = crypto.randomBytes(32).toString("hex");
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
            await user.save();

            // Send reset email
            const emailResult = await sendPasswordResetEmail(user, resetToken);

            if (!emailResult.success) {
                console.error("Failed to send reset email:", emailResult.error);
            }

            res.json({
                success: true,
                message:
                    "If an account exists with that email, a password reset link has been sent.",
            });
        } catch (error) {
            console.error("Forgot password error:", error);
            res.status(500).json({
                success: false,
                error: "Server error",
            });
        }
    }
);

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
router.post(
    "/reset-password",
    authLimiter,
    [
        body("token").notEmpty().withMessage("Reset token is required"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long"),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    error: "Validation failed",
                    details: errors.array(),
                });
            }

            const { token, password } = req.body;

            // Find user with valid reset token
            const user = await User.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() },
            }).select("+resetPasswordToken +resetPasswordExpires");

            if (!user) {
                return res.status(400).json({
                    success: false,
                    error: "Invalid or expired reset token",
                });
            }

            // Update password
            user.password = password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();

            res.json({
                success: true,
                message:
                    "Password reset successful. You can now log in with your new password.",
            });
        } catch (error) {
            console.error("Reset password error:", error);
            res.status(500).json({
                success: false,
                error: "Server error",
            });
        }
    }
);

// @desc    Verify email
// @route   GET /api/auth/verify-email/:token
// @access  Public
router.get("/verify-email/:token", async (req, res) => {
    try {
        const { token } = req.params;

        // Find user with valid verification token
        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: Date.now() },
        }).select("+emailVerificationToken +emailVerificationExpires");

        if (!user) {
            return res.status(400).json({
                success: false,
                error: "Invalid or expired verification token",
            });
        }

        // Mark email as verified
        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();

        res.json({
            success: true,
            message: "Email verified successfully",
        });
    } catch (error) {
        console.error("Email verification error:", error);
        res.status(500).json({
            success: false,
            error: "Server error",
        });
    }
});

// @desc    Resend verification email
// @route   POST /api/auth/resend-verification
// @access  Private
router.post("/resend-verification", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select(
            "+emailVerificationToken +emailVerificationExpires"
        );

        if (user.isEmailVerified) {
            return res.status(400).json({
                success: false,
                error: "Email already verified",
            });
        }

        // Generate new verification token
        user.emailVerificationToken = crypto.randomBytes(32).toString("hex");
        user.emailVerificationExpires = new Date(
            Date.now() + 24 * 60 * 60 * 1000
        );
        await user.save();

        // Send verification email
        const emailResult = await sendVerificationEmail(
            user,
            user.emailVerificationToken
        );

        if (!emailResult.success) {
            console.error(
                "Failed to send verification email:",
                emailResult.error
            );
            return res.status(500).json({
                success: false,
                error: "Failed to send verification email",
            });
        }

        res.json({
            success: true,
            message: "Verification email sent successfully",
        });
    } catch (error) {
        console.error("Resend verification error:", error);
        res.status(500).json({
            success: false,
            error: "Server error",
        });
    }
});

export default router;
