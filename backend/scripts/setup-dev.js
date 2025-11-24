#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("🚀 Setting up FocusFlow Backend Development Environment...\n");

// Check if .env file exists
const envPath = path.join(__dirname, "..", ".env");
if (!fs.existsSync(envPath)) {
    console.log("📝 Creating .env file...");

    const envContent = `# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/focusflow

# JWT Configuration
JWT_SECRET=focusflow-dev-secret-key-change-in-production
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security
BCRYPT_ROUNDS=12
`;

    fs.writeFileSync(envPath, envContent);
    console.log("✅ .env file created successfully!");
} else {
    console.log("✅ .env file already exists");
}

// Check if MongoDB is running
console.log("\n📦 Checking MongoDB connection...");
const { MongoClient } = require("mongodb");

async function checkMongoDB() {
    try {
        const client = new MongoClient("mongodb://localhost:27017");
        await client.connect();
        console.log("✅ MongoDB is running and accessible");
        await client.close();
    } catch (error) {
        console.log("❌ MongoDB is not running or not accessible");
        console.log("💡 Please start MongoDB or use Docker Compose:");
        console.log("   docker-compose up -d mongodb");
    }
}

checkMongoDB();

console.log("\n📋 Development Setup Complete!");
console.log("\n🎯 Next Steps:");
console.log("1. Start MongoDB (if not using Docker): mongod");
console.log("2. Install dependencies: npm install");
console.log("3. Start development server: npm run dev");
console.log("4. Or use Docker Compose: docker-compose up");
console.log("\n🔗 API will be available at: http://localhost:5000");
console.log("📚 API Documentation: http://localhost:5000/api");
console.log("🏥 Health Check: http://localhost:5000/health");
