import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    // Dev bypass: skip JWT and inject a stable dev user if DISABLE_AUTH=true.
    // Always resolves to a single deterministic user (by email) so that multi-user
    // dev databases do NOT accidentally route all requests to whatever user happens
    // to be first in the collection.
    if (process.env.DISABLE_AUTH === "true") {
        try {
            const devEmail = process.env.DEV_USER_EMAIL || "dev@example.com";
            let user = await User.findOne({ email: devEmail });
            if (!user) {
                user = await User.create({
                    email: devEmail,
                    username: process.env.DEV_USER_USERNAME || "devuser",
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

    // Check for token in cookies (preferred)
    if (req.cookies && req.cookies.accessToken) {
        token = req.cookies.accessToken;
    }
    // Fallback to Authorization header
    else if (
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

        // Check if user is email verified (only enforced if configured)
        const requireVerifiedEmail = process.env.REQUIRE_VERIFIED_EMAIL === "true";

        if (requireVerifiedEmail && !user.isEmailVerified) {
            res.status(401).json({
                success: false,
                isEmailVerificationError: true,
                error: "Please verify your email address",
            });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT verification error:", error.message);

        // Provide more specific error messages for debugging
        let errorMessage = "Not authorized to access this route";
        if (error.name === "TokenExpiredError") {
            errorMessage = "Token expired";
        } else if (error.name === "JsonWebTokenError") {
            errorMessage = "Invalid token";
        }

        res.status(401).json({
            success: false,
            error: errorMessage,
        });
    }
};

// Optional auth middleware - doesn't fail if no token
export const optionalAuth = async (req, res, next) => {
    // Dev bypass: inject stable dev user if DISABLE_AUTH=true.
    // Uses the same deterministic email lookup as protect() so all routes
    // resolve to the same user in local development.
    if (process.env.DISABLE_AUTH === "true") {
        try {
            const devEmail = process.env.DEV_USER_EMAIL || "dev@example.com";
            let user = await User.findOne({ email: devEmail });
            if (!user) {
                user = await User.create({
                    email: devEmail,
                    username: process.env.DEV_USER_USERNAME || "devuser",
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

    // Check cookies first
    if (req.cookies && req.cookies.accessToken) {
        token = req.cookies.accessToken;
    }
    // Then check header
    else if (
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
            // Token is invalid, but we don't fail the request (optional auth)
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
