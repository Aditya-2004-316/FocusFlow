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

        // Check if user is email verified (only enforced in production)
        const requireVerifiedEmail = process.env.NODE_ENV === "production";

        if (requireVerifiedEmail && !user.isEmailVerified) {
            res.status(401).json({
                success: false,
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
            console.log("Token expired at:", error.expiredAt);
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
