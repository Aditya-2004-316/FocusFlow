# FocusFlow Backend - Quick Start Guide

Get your FocusFlow backend up and running in minutes! 🚀

## Prerequisites

-   Node.js 18+
-   MongoDB (local or Docker)
-   npm or yarn

## Quick Start (3 Steps)

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup Environment

```bash
npm run setup
```

This will create a `.env` file with development settings.

### 3. Start the Server

```bash
npm run dev
```

🎉 Your API is now running at `http://localhost:5000`!

## Alternative: Docker Setup

If you prefer Docker, use this instead:

```bash
# Start MongoDB and the API
docker-compose up

# Or start just MongoDB
docker-compose up -d mongodb
npm run dev
```

## Verify Installation

1. **Health Check**: http://localhost:5000/health
2. **API Documentation**: http://localhost:5000/api
3. **MongoDB Express** (if using Docker): http://localhost:8081

## API Endpoints

### Authentication

-   `POST /api/auth/register` - Register new user
-   `POST /api/auth/login` - Login user
-   `GET /api/auth/me` - Get current user

### Timers

-   `GET /api/timers` - Get user timers
-   `POST /api/timers` - Create timer
-   `PUT /api/timers/:id/start` - Start timer
-   `PUT /api/timers/:id/pause` - Pause timer
-   `PUT /api/timers/:id/complete` - Complete timer

### Distractions

-   `GET /api/distractions` - Get user distractions
-   `POST /api/distractions` - Log distraction

### Statistics

-   `GET /api/stats` - Get user statistics

### Settings

-   `GET /api/settings` - Get user settings
-   `PUT /api/settings` - Update settings

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server
npm test            # Run tests
npm run lint        # Check code quality
npm run lint:fix    # Fix linting issues
```

## Environment Variables

Key variables in `.env`:

-   `PORT=5000` - Server port
-   `MONGODB_URI=mongodb://localhost:27017/focusflow` - Database URL
-   `JWT_SECRET=your-secret-key` - JWT signing secret
-   `CORS_ORIGIN=http://localhost:3000` - Frontend URL

## Database

The API uses MongoDB with these collections:

-   `users` - User accounts and profiles
-   `timers` - Focus timer sessions
-   `distractions` - User distractions
-   `stats` - User statistics
-   `settings` - User preferences

## Testing

```bash
npm test                    # Run all tests
npm test -- --watch        # Run tests in watch mode
npm test -- --coverage     # Run tests with coverage
```

## Troubleshooting

### MongoDB Connection Issues

-   Ensure MongoDB is running: `mongod`
-   Or use Docker: `docker-compose up -d mongodb`

### Port Already in Use

-   Change `PORT` in `.env` file
-   Or kill process using port 5000

### JWT Issues

-   Ensure `JWT_SECRET` is set in `.env`
-   Use a strong, unique secret in production

## Next Steps

1. **Connect Frontend**: Update your React app to use the API
2. **Add Features**: Implement missing route handlers
3. **Add Tests**: Write comprehensive test coverage
4. **Deploy**: Use Docker or cloud platform

## Support

-   📚 Full API Documentation: See `API.md`
-   🐛 Issues: Create GitHub issue
-   💬 Questions: Check the main README

Happy coding! 🎯
