import express from "express";
import { createServer } from "http";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import { initializeSocket } from "./socket/socketServer.js";
import { startHeartbeatMonitor } from "./socket/heartbeatMonitor.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import { checkDBConnection } from "./middleware/dbCheck.js";

// Import routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import timerRoutes from "./routes/timers.js";
import distractionRoutes from "./routes/distractions.js";
import statsRoutes from "./routes/stats.js";
import settingsRoutes from "./routes/settings.js";
import communitiesRoutes from "./routes/communities.js";
import communityPostsRoutes from "./routes/communityPosts.js";
import communityCommentsRoutes from "./routes/communityComments.js";
import groupSessionsRoutes from "./routes/groupSessions.js";
import chatRoutes from "./routes/chatRoutes.js";
import communityEventsRoutes from "./routes/communityEvents.js";

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

// Trust the first proxy so that req.ip resolves correctly behind
// reverse proxies (e.g. Render, Nginx, Cloudflare). Without this,
// everyone behind the same proxy appears to come from the same IP
// and rate-limit counters are shared across all users unintentionally.
app.set("trust proxy", 1);

// Connect to MongoDB
connectDB();

// Initialize Socket.io
const io = initializeSocket(httpServer);

// Start heartbeat monitor for group sessions
startHeartbeatMonitor();

// Security middleware
app.use(helmet());

// CORS configuration
const parseOrigins = (value, fallback = []) => {
    if (!value) {
        return fallback;
    }
    return value
        .split(",")
        .map((origin) => origin.trim().replace(/\/$/, ""))
        .filter(Boolean);
};

const allowedOrigins = [
    ...parseOrigins(process.env.CORS_ORIGIN_PROD),
    ...parseOrigins(process.env.CORS_ORIGIN, [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5000",
    ]),
];

const corsOptions = {
    origin(origin, callback) {
        // Strip trailing slash from incoming origin for comparison
        const normalizedOrigin = origin ? origin.replace(/\/$/, "") : null;
        if (!normalizedOrigin || allowedOrigins.includes(normalizedOrigin)) {
            return callback(null, true);
        }
        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    // Allow Authorization header for bearer tokens from frontend
    allowedHeaders: ["Content-Type", "Authorization"],
    // Expose any headers the client may need (optional)
    exposedHeaders: ["Authorization"],
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Rate limiting — two tiers:
//  1. Global IP-based limiter on all /api/* routes.
//  2. Per-user limiter for authenticated routes (keyed by user ID), so that
//     one user's burst of requests doesn't exhaust the limit for everyone
//     sharing the same office/CDN IP address.
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || (process.env.NODE_ENV === "production" ? "200" : "10000")),
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});
app.use("/api/", limiter);

// Per-user rate limiter applied after auth middleware on protected routes.
// Falls back to IP if user is not yet authenticated (e.g., on login/register).
const userRateLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"),
    max: parseInt(process.env.USER_RATE_LIMIT_MAX_REQUESTS || (process.env.NODE_ENV === "production" ? "500" : "50000")),
    keyGenerator: (req) => {
        // Use user ID as the rate-limit key for authenticated requests so
        // users behind a shared IP (proxy, office, CDN) don't interfere.
        return req.user ? req.user._id.toString() : req.ip;
    },
    message: "Too many requests, please slow down.",
    standardHeaders: true,
    legacyHeaders: false,
});

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Cookie parsing middleware
app.use(cookieParser());

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV !== "test") {
    app.use(morgan("combined"));
}

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "FocusFlow API is running",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
    });
});

// Welcome route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the FocusFlow API",
        documentation: "/api",
        health: "/health"
    });
});

// API routes (with database connection check)
// Public auth routes use only IP-based rate limiting (the global limiter above).
// All other routes also use the per-user limiter so one user cannot consume
// another user's rate-limit quota when they share the same IP.
app.use("/api/auth", checkDBConnection, authRoutes);
app.use("/api/users", checkDBConnection, userRateLimiter, userRoutes);
app.use("/api/timers", checkDBConnection, userRateLimiter, timerRoutes);
app.use("/api/distractions", checkDBConnection, userRateLimiter, distractionRoutes);
app.use("/api/stats", checkDBConnection, userRateLimiter, statsRoutes);
app.use("/api/settings", checkDBConnection, userRateLimiter, settingsRoutes);
app.use("/api/communities", checkDBConnection, userRateLimiter, communitiesRoutes);
app.use("/api/communities/:id/posts", checkDBConnection, userRateLimiter, communityPostsRoutes);
app.use(
    "/api/communities/:id/posts/:postId/comments",
    checkDBConnection,
    userRateLimiter,
    communityCommentsRoutes
);
app.use("/api/group-sessions", checkDBConnection, userRateLimiter, groupSessionsRoutes);
app.use("/api/chat", checkDBConnection, userRateLimiter, (req, res, next) => {
    req.io = io;
    next();
}, chatRoutes);
app.use("/api/community-events", checkDBConnection, userRateLimiter, communityEventsRoutes);

// API documentation endpoint
app.get("/api", (req, res) => {
    res.json({
        message: "FocusFlow API",
        version: "1.0.0",
        endpoints: {
            auth: "/api/auth",
            users: "/api/users",
            timers: "/api/timers",
            distractions: "/api/distractions",
            stats: "/api/stats",
            settings: "/api/settings",
            communities: "/api/communities",
            communityPosts: "/api/communities/:id/posts",
            communityComments: "/api/communities/:id/posts/:postId/comments",
            groupSessions: "/api/group-sessions",
        },
    });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server with Socket.io support
httpServer.listen(PORT);

export default app;
