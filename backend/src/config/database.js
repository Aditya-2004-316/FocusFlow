import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI =
    process.env.MONGODB_URI_PROD ||
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/focusflow";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        });

        console.log(`📦 MongoDB Connected: ${conn.connection.host}`);

        // Handle connection events
        mongoose.connection.on("error", (err) => {
            console.error("❌ MongoDB connection error:", err);
        });

        mongoose.connection.on("disconnected", () => {
            console.log("🔌 MongoDB disconnected");
        });

        // Graceful shutdown
        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            console.log("📦 MongoDB connection closed through app termination");
            process.exit(0);
        });
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
        console.log("💡 To fix this, you can:");
        console.log(
            "   1. Install MongoDB locally: https://docs.mongodb.com/manual/installation/"
        );
        console.log(
            "   2. Use MongoDB Atlas (cloud): https://www.mongodb.com/atlas"
        );
        console.log(
            "   3. Use Docker: docker run -d -p 27017:27017 --name mongodb mongo:latest"
        );
        console.log("   4. Update MONGODB_URI in your environment variables");
        console.log("");
        console.log("🔄 Server will continue without database connection...");
        console.log("⚠️  API endpoints requiring database will return errors");
    }
};

export default connectDB;
