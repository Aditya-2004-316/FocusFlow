# 🔐 FocusFlow Authentication System Documentation

## Overview

FocusFlow now features a complete, production-ready authentication system with secure user registration, login, session management, password reset, and email verification.

## 🎯 Features Implemented

### ✅ Backend Features
- **User Registration** with email validation and password hashing
- **Secure Login** with JWT tokens (access & refresh tokens)
- **HTTP-Only Cookies** for enhanced security
- **Password Reset** via email with time-limited tokens
- **Email Verification** for new accounts
- **Rate Limiting** on sensitive endpoints (5 attempts per 15 min)
- **CSRF Protection** and input sanitization
- **Refresh Token** mechanism for persistent sessions
- **Secure Logout** with token cleanup

### ✅ Frontend Features
- **Beautiful Login Page** with modern UI/UX
- **Signup Page** with password strength meter
- **Protected Routes** with loading states
- **Global Auth State** via React Context
- **Persistent Sessions** across page reloads
- **Error Handling** with user-friendly messages
- **Loading States** for better UX

## 📁 File Structure

### Backend
```
backend/
├── src/
│   ├── models/
│   │   └── User.js                    # User model with hashing
│   ├── routes/
│   │   └── auth.js                    # Auth endpoints
│   ├── middleware/
│   │   └── auth.js                    # JWT verification
│   ├── utils/
│   │   └── emailService.js            # Email templates
│   └── index.js                       # Cookie-parser setup
├── .env.example                       # Environment variables
└── package.json                       # Dependencies
```

### Frontend
```
frontend/
├── src/
│   ├── pages/
│   │   ├── Login.jsx                  # Login page
│   │   └── Signup.jsx                 # Signup page
│   ├── context/
│   │   └── AuthContext.jsx            # Auth state management
│   ├── components/
│   │   └── ProtectedRoute.jsx         # Route protection
│   └── App.jsx                        # Routes configuration
```

## 🔧 Setup Instructions

### 1. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

The following packages are required (already in package.json):
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation
- `cookie-parser` - Cookie handling
- `nodemailer` - Email sending
- `express-validator` - Input validation
- `express-rate-limit` - Rate limiting

#### Environment Variables

Create a `.env` file in the backend directory:

```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/focusflow

# JWT (Generate secure random strings for production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-too
JWT_REFRESH_EXPIRES_IN=7d

# Bcrypt
BCRYPT_ROUNDS=12

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:5173

# Email (Optional - for verification & password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_FROM=noreply@focusflow.app

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

#### Start Backend Server
```bash
npm run dev
```

### 2. Frontend Setup

The frontend is already configured and ready to use. No additional setup required!

#### Start Frontend
```bash
cd frontend
npm run dev
```

## 📡 API Endpoints

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "securepassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "email": "user@example.com",
      "username": "johndoe",
      "firstName": "John",
      "lastName": "Doe",
      "isEmailVerified": false
    },
    "token": "eyJhbGc..."
  }
}
```

#### POST `/api/auth/login`
Login existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "eyJhbGc..."
  }
}
```

**Rate Limited:** 5 attempts per 15 minutes

#### GET `/api/auth/me`
Get current authenticated user.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { ... }
  }
}
```

#### POST `/api/auth/logout`
Logout user and clear cookies.

**Headers:**
```
Authorization: Bearer {token}
```

#### POST `/api/auth/refresh-token`
Refresh access token using refresh token.

**Cookies:** `refreshToken` (HTTP-only)

#### POST `/api/auth/forgot-password`
Request password reset email.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Rate Limited:** 5 attempts per 15 minutes

#### POST `/api/auth/reset-password`
Reset password with token.

**Request Body:**
```json
{
  "token": "reset-token-from-email",
  "password": "newpassword123"
}
```

#### GET `/api/auth/verify-email/:token`
Verify email address.

#### POST `/api/auth/resend-verification`
Resend verification email (requires authentication).

## 🔒 Security Features

### Password Security
- **Bcrypt hashing** with 12 rounds
- **Minimum 6 characters** required
- **Password strength meter** on signup
- Passwords **never stored in plain text**

### Token Security
- **Short-lived access tokens** (15 minutes)
- **Long-lived refresh tokens** (7 days)
- **HTTP-only cookies** prevent XSS attacks
- **Secure flag** enabled in production
- **SameSite=strict** prevents CSRF

### API Security
- **Rate limiting** on login/reset endpoints
- **Input validation** with express-validator
- **CORS configuration** for trusted origins
- **Helmet.js** security headers
- **MongoDB injection** prevention

### Email Security
- **Time-limited tokens** (24h for verification, 1h for reset)
- **Cryptographically secure** token generation
- **No sensitive data** in email links

## 🎨 Frontend Usage

### Using Authentication in Components

```jsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Protecting Routes

Routes are automatically protected using `<ProtectedRoute>`:

```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

### Auth Context API

```javascript
{
  user,              // Current user object or null
  loading,           // Boolean - true while checking auth
  isAuthenticated,   // Boolean - true if logged in
  login,             // Function(email, password)
  register,          // Function(userData)
  logout,            // Function()
  checkAuth,         // Function() - verify token
  refreshToken,      // Function() - get new access token
  updateUser,        // Function(data) - update user state
}
```

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate App-Specific Password
3. Use in `.env`:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
```

### SendGrid Setup
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
```

### Development Mode
In development without email config, verification emails are logged to console with preview links (using Ethereal).

## 🧪 Testing

### Test User Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Protected Endpoint
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🚀 Production Deployment

### Environment Variables (Production)
```env
NODE_ENV=production
JWT_SECRET=<generate-with-crypto.randomBytes(64).toString('hex')>
JWT_REFRESH_SECRET=<generate-another-one>
MONGODB_URI=<your-production-mongodb-uri>
FRONTEND_URL=https://your-domain.com
CORS_ORIGIN_PROD=https://your-domain.com
EMAIL_HOST=<your-email-service>
```

### Security Checklist
- [ ] Use strong, random JWT secrets
- [ ] Enable HTTPS (cookies set to secure)
- [ ] Configure proper CORS origins
- [ ] Set up MongoDB with authentication
- [ ] Configure email service
- [ ] Enable rate limiting
- [ ] Set secure cookie flags
- [ ] Use environment variables (never commit .env)
- [ ] Enable MongoDB Atlas network access rules
- [ ] Set up proper error logging

## 🐛 Troubleshooting

### "CORS blocked" Error
- Check `CORS_ORIGIN` in backend `.env`
- Ensure frontend URL is in allowed origins
- Verify `credentials: "include"` in fetch calls

### Cookies Not Set
- Check backend has `cookie-parser` middleware
- Verify `credentials: "include"` in frontend requests
- In production, ensure HTTPS is enabled

### Email Not Sending
- Check EMAIL_* environment variables
- For Gmail, use App-Specific Password
- Check console for Ethereal preview links (dev mode)

### Token Expired
- Use `/api/auth/refresh-token` endpoint
- Check JWT_EXPIRES_IN settings
- Implement automatic refresh in frontend

## 📚 Additional Resources

- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

## 🎉 Success!

Your FocusFlow app now has enterprise-grade authentication! Users can:
- ✅ Sign up with secure passwords
- ✅ Login with persistent sessions
- ✅ Verify their email
- ✅ Reset forgotten passwords
- ✅ Access protected features
- ✅ Stay logged in across devices

The system is production-ready, secure, and follows modern best practices! 🚀
