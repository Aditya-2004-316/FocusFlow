// MongoDB initialization script
// This script runs when the MongoDB container starts for the first time

// Switch to the focusflow database
db = db.getSiblingDB("focusflow");

// Create collections with validation
db.createCollection("users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["email", "username", "password"],
            properties: {
                email: {
                    bsonType: "string",
                    pattern:
                        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                },
                username: {
                    bsonType: "string",
                    minLength: 3,
                    maxLength: 30,
                },
                password: {
                    bsonType: "string",
                    minLength: 6,
                },
            },
        },
    },
});

db.createCollection("timers", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["userId", "type", "duration"],
            properties: {
                userId: {
                    bsonType: "objectId",
                },
                type: {
                    enum: ["pomodoro", "shortBreak", "longBreak", "custom"],
                },
                duration: {
                    bsonType: "int",
                    minimum: 1,
                    maximum: 480,
                },
            },
        },
    },
});

db.createCollection("distractions", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "userId",
                "type",
                "description",
                "timestamp",
                "severity",
            ],
            properties: {
                userId: {
                    bsonType: "objectId",
                },
                type: {
                    enum: [
                        "phone",
                        "social_media",
                        "email",
                        "noise",
                        "interruption",
                        "other",
                    ],
                },
                description: {
                    bsonType: "string",
                    maxLength: 200,
                },
                severity: {
                    enum: ["low", "medium", "high"],
                },
            },
        },
    },
});

db.createCollection("stats", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["userId", "date", "totalFocusTime", "totalSessions"],
            properties: {
                userId: {
                    bsonType: "objectId",
                },
                totalFocusTime: {
                    bsonType: "int",
                    minimum: 0,
                },
                totalSessions: {
                    bsonType: "int",
                    minimum: 0,
                },
            },
        },
    },
});

db.createCollection("settings", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["userId"],
            properties: {
                userId: {
                    bsonType: "objectId",
                },
            },
        },
    },
});

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ username: 1 }, { unique: true });

db.timers.createIndex({ userId: 1, createdAt: -1 });
db.timers.createIndex({ userId: 1, isActive: 1 });

db.distractions.createIndex({ userId: 1, timestamp: -1 });
db.distractions.createIndex({ userId: 1, type: 1 });

db.stats.createIndex({ userId: 1, date: 1 }, { unique: true });
db.stats.createIndex({ userId: 1, date: -1 });

db.settings.createIndex({ userId: 1 }, { unique: true });

print("✅ FocusFlow database initialized successfully!");
print("📊 Collections created: users, timers, distractions, stats, settings");
print("🔍 Indexes created for optimal performance");
