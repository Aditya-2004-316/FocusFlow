# FocusFlow Backend Setup Guide

## Quick Setup

### Option 1: MongoDB Atlas (Recommended - Cloud Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Create a `.env` file in the backend folder with:
    ```
    MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/focusflow
    JWT_SECRET=your-secret-key
    ```

### Option 2: Local MongoDB Installation

1. Download MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Install and start MongoDB service
3. Create a `.env` file in the backend folder with:
    ```
    MONGODB_URI=mongodb://localhost:27017/focusflow
    JWT_SECRET=your-secret-key
    ```

### Option 3: Docker (if you have Docker installed)

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Environment Variables

Create a `.env` file in the backend folder:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/focusflow
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/focusflow

# JWT Configuration
JWT_SECRET=focusflow-dev-secret-key-change-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=focusflow-dev-refresh-secret-change-in-production
JWT_REFRESH_EXPIRES_IN=30d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
CORS_ORIGIN_PROD=https://yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security
BCRYPT_ROUNDS=12
SESSION_SECRET=focusflow-dev-session-secret

# Logging
LOG_LEVEL=info
```

## Running the Backend

1. Install dependencies:

    ```bash
    cd backend
    npm install
    ```

2. Start the development server:

    ```bash
    npm run dev
    ```

3. The server will start on http://localhost:5000

## API Endpoints

-   Health Check: `GET /health`
-   API Documentation: `GET /api`
-   Authentication: `POST /api/auth/register`, `POST /api/auth/login`
-   Users: `GET /api/users`, `PUT /api/users/:id`
-   Timers: `GET /api/timers`, `POST /api/timers`
-   Distractions: `GET /api/distractions`, `POST /api/distractions`
-   Stats: `GET /api/stats`
-   Settings: `GET /api/settings`, `PUT /api/settings`

## Troubleshooting

### MongoDB Connection Issues

-   Ensure MongoDB is running
-   Check your connection string in `.env`
-   Verify network connectivity
-   Check MongoDB logs for errors

### Port Already in Use

-   Change the PORT in `.env` file
-   Or kill the process using the port

### JWT Errors

-   Ensure JWT_SECRET is set in `.env`
-   Use a strong, unique secret key
