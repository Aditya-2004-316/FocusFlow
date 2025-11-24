# 🚀 Quick Start Guide - Authentication Setup

## Prerequisites
- Node.js 18+ installed
- MongoDB installed and running (local or Atlas)
- npm or yarn package manager

## 📦 Installation (5 minutes)

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

Required packages (already in package.json):
- cookie-parser ✅
- bcryptjs ✅
- jsonwebtoken ✅
- nodemailer ✅
- express-validator ✅
- express-rate-limit ✅

### 2. Create Backend Environment File
```bash
cd backend
cp .env.example .env
```

Edit `.env` and set:
```env
# Minimum required for local development:
MONGODB_URI=mongodb://localhost:27017/focusflow
JWT_SECRET=your-secret-key-minimum-32-characters-long
JWT_REFRESH_SECRET=another-secret-key-also-32-chars-min
FRONTEND_URL=http://localhost:3000
```

**Generate secure secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Start MongoDB
```bash
# If using local MongoDB:
mongod

# Or use MongoDB Atlas (cloud):
# Just set MONGODB_URI to your connection string
```

### 4. Start Backend Server
```bash
cd backend
npm run dev
```

You should see:
```
🚀 FocusFlow API server running on port 5000
📊 Environment: development
🔗 Health check: http://localhost:5000/health
```

### 5. Start Frontend
```bash
cd frontend
npm run dev
```

Visit: `http://localhost:3000`

## ✅ Test Authentication

### 1. Sign Up
1. Navigate to `http://localhost:3000/signup`
2. Fill in the form:
   - Email: `test@example.com`
   - Username: `testuser`
   - Password: `password123`
   - First Name: `Test`
   - Last Name: `User`
3. Click "Create Account"
4. You should be redirected to the dashboard

### 2. Log Out
1. Find the logout button/option
2. Click it
3. You should be redirected to login

### 3. Log In
1. Navigate to `http://localhost:3000/login`
2. Enter your credentials:
   - Email: `test@example.com`
   - Password: `password123`
3. Click "Sign In"
4. You should access the dashboard

## 🔐 Security Notes

### For Development
- Email verification is **optional** in development
- Password reset emails show preview links in console
- HTTP cookies work fine locally

### For Production
- **Must use HTTPS** for secure cookies
- Set up real email service (Gmail/SendGrid)
- Use strong JWT secrets (64+ characters)
- Configure CORS for your domain
- Enable email verification requirement

## 🐛 Common Issues

### Backend won't start
```
Error: JWT_SECRET is not set
```
**Solution:** Create `.env` file and set `JWT_SECRET`

### Can't connect to MongoDB
```
MongooseServerSelectionError
```
**Solution:** 
- Check MongoDB is running: `mongod`
- Or use MongoDB Atlas cloud database

### CORS errors
```
CORS policy: No 'Access-Control-Allow-Origin'
```
**Solution:** Check `CORS_ORIGIN` in backend `.env` includes your frontend URL

### Cookies not working
**Solution:** Ensure `credentials: "include"` in frontend fetch calls (already set)

## 📝 Next Steps

1. **Configure Email (Optional)**
   - Set up Gmail or SendGrid in `.env`
   - Test password reset flow

2. **Add Profile Page**
   - Update user information
   - Change password
   - Upload avatar

3. **Deploy to Production**
   - Follow `AUTH_DOCUMENTATION.md`
   - Set production environment variables
   - Enable HTTPS

## 🎉 You're Done!

Your authentication system is ready to use! Check `AUTH_DOCUMENTATION.md` for complete API documentation and advanced features.

## 📚 Files Created

**Backend:**
- ✅ `backend/src/routes/auth.js` - Enhanced with all endpoints
- ✅ `backend/src/utils/emailService.js` - Email templates
- ✅ `backend/src/middleware/auth.js` - JWT + cookie support
- ✅ `backend/src/index.js` - Cookie-parser added
- ✅ `backend/.env.example` - Environment template

**Frontend:**
- ✅ `frontend/src/pages/Login.jsx` - Beautiful login page
- ✅ `frontend/src/pages/Signup.jsx` - Signup with password strength
- ✅ `frontend/src/context/AuthContext.jsx` - Complete auth logic
- ✅ `frontend/src/components/ProtectedRoute.jsx` - Route protection
- ✅ `frontend/src/App.jsx` - Routes configured

**Documentation:**
- ✅ `AUTH_DOCUMENTATION.md` - Complete guide
- ✅ `QUICK_START_AUTH.md` - This file

## 🆘 Need Help?

- Check `AUTH_DOCUMENTATION.md` for detailed guides
- Review API endpoints and examples
- Check console for error messages
- Verify all environment variables are set

Happy coding! 🚀
