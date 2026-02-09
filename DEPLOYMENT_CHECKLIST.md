# FocusFlow Deployment Checklist

Use this checklist to ensure everything is ready for a production deployment.

## 1. Backend Preparation
- [ ] Environment variables are documented in `.env.example`.
- [ ] `MONGODB_URI` for production is ready (MongoDB Atlas).
- [ ] `JWT_SECRET` is strong and unique for production.
- [ ] CORS is configured to only allow your production frontend URL.
- [ ] `npm start` script is working correctly.
- [ ] Port is dynamic (`process.env.PORT`).

## 2. Frontend Preparation
- [ ] `VITE_API_URL` is configured to point to the production backend.
- [ ] Icons and assets are correctly linked.
- [ ] `vercel.json` exists for client-side routing.
- [ ] `npm run build` succeeds locally.

## 3. Deployment
- [ ] Code is pushed to the main branch on GitHub.
- [ ] Backend is deployed to Render/Heroku/Railway.
- [ ] Frontend is deployed to Vercel/Netlify.
- [ ] Environment variables are added to the deployment platforms.

## 4. Post-Deployment
- [ ] Check `/health` endpoint on the backend.
- [ ] Verify frontend connects to backend (check login/signup).
- [ ] Verify Socket.io connection is established.
- [ ] Test a full timer session and statistics saving.
