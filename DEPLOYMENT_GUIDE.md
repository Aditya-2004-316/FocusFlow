# FocusFlow Deployment Guide

This guide provides instructions on how to deploy the FocusFlow application (Frontend and Backend) to production.

## Prerequisites

- [MongoDB Atlas](https://www.mongodb.com/atlas) account for the production database.
- [GitHub](https://github.com/) repository for your code.
- [Render](https://render.com/) account for backend deployment.
- [Vercel](https://vercel.com/) account for frontend deployment.

## Backend Deployment (Render)

1. **Connect Repository**: Create a new Web Service on Render and connect your GitHub repository.
2. **Settings**:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
3. **Environment Variables**:
   - `NODE_ENV`: `production`
   - `PORT`: `5000` (or leave empty for Render default)
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A long, random string for security.
   - `CORS_ORIGIN_PROD`: The URL of your deployed frontend (e.g., `https://focusflow-app.vercel.app`).
   - `FRONTEND_URL`: Same as `CORS_ORIGIN_PROD`.

## Frontend Deployment (Vercel)

1. **Connect Repository**: Create a new project on Vercel and connect your GitHub repository.
2. **Settings**:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. **Environment Variables**:
   - `VITE_API_URL`: The URL of your deployed backend (e.g., `https://focusflow-api.onrender.com`).

## Verification

Run the verification script locally before pushing changes:
```bash
node verify-deployment-ready.js
```

## Maintenance

Ensure you keep your environment variables updated if you change your deployment URLs.
