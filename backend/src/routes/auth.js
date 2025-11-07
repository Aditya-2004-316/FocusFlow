import express from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

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

            // Generate token
            const token = user.generateAuthToken();

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
                    token,
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

            // Generate token
            const token = user.generateAuthToken();

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
                    token,
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

export default router;
