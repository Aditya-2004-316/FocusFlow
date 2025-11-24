import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
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

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());

// CORS configuration
const parseOrigins = (value, fallback = []) => {
    if (!value) {
        return fallback;
    }
    return value
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean);
};

const allowedOrigins =
    process.env.NODE_ENV === "production"
        ? parseOrigins(process.env.CORS_ORIGIN_PROD)
        : parseOrigins(process.env.CORS_ORIGIN, ["http://localhost:3000", "http://localhost:5173"]);

const corsOptions = {
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"), // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});
app.use("/api/", limiter);

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

// API routes (with database connection check)
app.use("/api/auth", checkDBConnection, authRoutes);
app.use("/api/users", checkDBConnection, userRoutes);
app.use("/api/timers", checkDBConnection, timerRoutes);
app.use("/api/distractions", checkDBConnection, distractionRoutes);
app.use("/api/stats", checkDBConnection, statsRoutes);
app.use("/api/settings", checkDBConnection, settingsRoutes);

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
        },
    });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 FocusFlow API server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log(`📚 API docs: http://localhost:${PORT}/api`);
});

export default app;
