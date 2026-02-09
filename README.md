# FocusFlow - Ultimate Productivity & Focus Companion

FocusFlow is a comprehensive productivity suite designed to help users manage tasks, track focus sessions, and collaborate in real-time. It combines the proven Pomodoro technique with advanced analytics, community features, and multi-platform support (Web, Desktop, and Browser Extension).

## 🚀 Core Features

### ⏱️ Advanced Pomodoro Timer
- Customizable focus and break durations.
- Visual and audio notifications for session transitions.
- Real-time status sync across devices.

### 📊 Productivity Analytics
- **Distraction Logging**: Track what pulls you away from focus.
- **Detailed Insights**: View daily, weekly, and monthly productivity trends.
- **Productivity Score**: Qualitative metrics to measure focus quality.

### 👥 Collaborative Focus
- **Group Sessions**: Join live focus rooms with friends or the community.
- **Real-time Chat**: Stay motivated with integrated community discussions.
- **Leaderboards**: Compete for top focus spots in the community.

### 💻 Multi-Platform Support
- **Web App**: Accessible from any modern browser.
- **Desktop (Electron)**: Dedicated app with floating timer support.
- **Browser Extension**: Log distractions and manage timers directly from your browser.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Socket.io Client, HeroIcons.
- **Backend**: Node.js, Express, MongoDB (Mongoose), Socket.io.
- **Desktop**: Electron.
- **Security**: JWT Authentication, bcryptjs, Helmet, Rate Limiting.
- **Deployment**: Vercel (Frontend), Render (Backend).

---

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### Local Development

1. **Clone and Install**:
   ```bash
   # Install root dependencies (concurrently, etc.)
   npm install

   # Install Backend
   cd backend
   npm install

   # Install Frontend
   cd ../frontend
   npm install
   ```

2. **Environment Setup**:
   - Create `.env` in `backend/` using `.env.example`.
   - Ensure `MONGODB_URI` and `JWT_SECRET` are set.

3. **Run the App**:
   - Backend: `cd backend && npm run dev`
   - Frontend: `cd frontend && npm run dev`

---

## 📦 Deployment Guide

### Backend (Render)
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Env Vars**: `MONGODB_URI`, `JWT_SECRET`, `CORS_ORIGIN_PROD`.

### Frontend (Vercel)
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Env Var**: `VITE_API_URL` (points to your Render URL).

---

## 📄 License
This project is licensed under the MIT License.
