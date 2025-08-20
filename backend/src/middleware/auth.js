import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    // Dev bypass: skip JWT and inject a dev user if DISABLE_AUTH=true
    if (process.env.DISABLE_AUTH === "true") {
        try {
            let user = await User.findOne();
            if (!user) {
                user = await User.create({
                    email: "dev@example.com",
                    username: "devuser",
                    password: "password123",
                    isEmailVerified: true,
                });
            }
            req.user = user;
            return next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Dev auth failed",
            });
        }
    }

    let token;

    // Check for token in headers
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    // Check if token exists
    if (!token) {
        res.status(401).json({
            success: false,
            error: "Not authorized to access this route",
        });
        return;
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from token
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            res.status(401).json({
                success: false,
                error: "User not found",
            });
            return;
        }

        // Check if user is email verified (optional - can be made required)
        if (!user.isEmailVerified) {
            res.status(401).json({
                success: false,
                error: "Please verify your email address",
            });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            error: "Not authorized to access this route",
        });
    }
};

// Optional auth middleware - doesn't fail if no token
export const optionalAuth = async (req, res, next) => {
    // Dev bypass: inject dev user if available
    if (process.env.DISABLE_AUTH === "true") {
        try {
            let user = await User.findOne();
            if (!user) {
                user = await User.create({
                    email: "dev@example.com",
                    username: "devuser",
                    password: "password123",
                    isEmailVerified: true,
                });
            }
            req.user = user;
        } catch (error) {
            // ignore dev auth errors in optional flow
        }
        return next();
    }

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId).select(
                "-password"
            );
            if (user) {
                req.user = user;
            }
        } catch (error) {
            // Token is invalid, but we don't fail the request
            console.log("Invalid token in optional auth:", error);
        }
    }

    next();
};

// Admin middleware (for future use)
export const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({
            success: false,
            error: "Access denied. Admin privileges required.",
        });
    }
};
