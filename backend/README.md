# FocusFlow Backend API

A robust Node.js/Express backend API for the FocusFlow productivity application, built with TypeScript, MongoDB, and JWT authentication.

## 🚀 Features

-   **User Authentication**: JWT-based authentication with email verification
-   **Timer Management**: Create, start, pause, and complete focus sessions
-   **Distraction Tracking**: Log and categorize distractions during focus sessions
-   **Statistics & Analytics**: Track productivity metrics and generate insights
-   **User Settings**: Customizable timer settings, notifications, and preferences
-   **Security**: Rate limiting, CORS, helmet, and input validation
-   **Database**: MongoDB with Mongoose ODM
-   **TypeScript**: Full type safety and better development experience

## 📋 Prerequisites

-   Node.js (v18 or higher)
-   MongoDB (local or cloud instance)
-   npm or yarn

## 🛠️ Installation

1. **Clone the repository and navigate to backend:**

    ```bash
    cd backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    ```bash
    cp env.example .env
    ```

    Edit `.env` file with your configuration:

    ```env
    PORT=5000
    NODE_ENV=development
    MONGODB_URI=mongodb://localhost:27017/focusflow
    JWT_SECRET=your-super-secret-jwt-key
    JWT_EXPIRES_IN=7d
    ```

4. **Start MongoDB** (if using local instance):

    ```bash
    # On Windows
    mongod

    # On macOS with Homebrew
    brew services start mongodb-community

    # On Linux
    sudo systemctl start mongod
    ```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

### Testing

```bash
npm test
```

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login User

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Current User

```http
GET /auth/me
Authorization: Bearer <token>
```

#### Forgot Password

```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### Reset Password

```http
POST /auth/reset-password/:token
Content-Type: application/json

{
  "password": "newpassword123"
}
```

### Timer Endpoints

#### Get All Timers

```http
GET /timers
Authorization: Bearer <token>
```

#### Create Timer

```http
POST /timers
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "pomodoro",
  "duration": 25,
  "title": "Work Session",
  "description": "Focus on project tasks"
}
```

### Distraction Endpoints

#### Get All Distractions

```http
GET /distractions
Authorization: Bearer <token>
```

#### Log Distraction

```http
POST /distractions
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "phone",
  "description": "Phone call interruption",
  "severity": "medium",
  "duration": 5
}
```

### Statistics Endpoints

#### Get User Statistics

```http
GET /stats
Authorization: Bearer <token>
```

### Settings Endpoints

#### Get User Settings

```http
GET /settings
Authorization: Bearer <token>
```

#### Update Settings

```http
PUT /settings
Authorization: Bearer <token>
Content-Type: application/json

{
  "timerSettings": {
    "pomodoroDuration": 30,
    "shortBreakDuration": 5,
    "longBreakDuration": 15
  }
}
```

## 🗄️ Database Schema

### User Model

-   `email`: String (unique, required)
-   `username`: String (unique, required)
-   `password`: String (hashed, required)
-   `firstName`: String (optional)
-   `lastName`: String (optional)
-   `avatar`: String (optional)
-   `isEmailVerified`: Boolean (default: false)
-   `lastLogin`: Date (optional)

### Timer Model

-   `userId`: ObjectId (ref: User, required)
-   `type`: String (enum: pomodoro, shortBreak, longBreak, custom)
-   `duration`: Number (minutes, required)
-   `title`: String (optional)
-   `description`: String (optional)
-   `isActive`: Boolean (default: false)
-   `startTime`: Date (optional)
-   `endTime`: Date (optional)
-   `completedAt`: Date (optional)
-   `interruptedAt`: Date (optional)

### Distraction Model

-   `userId`: ObjectId (ref: User, required)
-   `timerSessionId`: ObjectId (ref: TimerSession, optional)
-   `type`: String (enum: phone, social_media, email, noise, interruption, other)
-   `description`: String (required)
-   `duration`: Number (minutes, optional)
-   `timestamp`: Date (required)
-   `severity`: String (enum: low, medium, high)

## 🔧 Configuration

### Environment Variables

| Variable                  | Description               | Default                             |
| ------------------------- | ------------------------- | ----------------------------------- |
| `PORT`                    | Server port               | 5000                                |
| `NODE_ENV`                | Environment               | development                         |
| `MONGODB_URI`             | MongoDB connection string | mongodb://localhost:27017/focusflow |
| `JWT_SECRET`              | JWT secret key            | (required)                          |
| `JWT_EXPIRES_IN`          | JWT expiration time       | 7d                                  |
| `CORS_ORIGIN`             | CORS origin               | http://localhost:3000               |
| `RATE_LIMIT_MAX_REQUESTS` | Rate limit max requests   | 100                                 |
| `RATE_LIMIT_WINDOW_MS`    | Rate limit window         | 900000                              |

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📦 Scripts

-   `npm run dev`: Start development server with hot reload
-   `npm run build`: Build TypeScript to JavaScript
-   `npm start`: Start production server
-   `npm test`: Run tests
-   `npm run lint`: Run ESLint
-   `npm run lint:fix`: Fix ESLint errors

## 🔒 Security Features

-   **JWT Authentication**: Secure token-based authentication
-   **Password Hashing**: bcryptjs for password security
-   **Rate Limiting**: Prevent abuse with express-rate-limit
-   **CORS Protection**: Configured CORS for frontend integration
-   **Input Validation**: express-validator for request validation
-   **Helmet**: Security headers with helmet middleware
-   **Environment Variables**: Secure configuration management

## 🚀 Deployment

### Docker (Recommended)

1. **Build the image:**

    ```bash
    docker build -t focusflow-backend .
    ```

2. **Run the container:**
    ```bash
    docker run -p 5000:5000 --env-file .env focusflow-backend
    ```

### Manual Deployment

1. **Build the application:**

    ```bash
    npm run build
    ```

2. **Set production environment variables**

3. **Start the server:**
    ```bash
    npm start
    ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

-   Create an issue in the repository
-   Check the API documentation
-   Review the error logs

## 🔄 API Versioning

The API uses URL versioning. Current version is v1, accessible at `/api/v1/`.

## 📊 Health Check

Check if the API is running:

```http
GET /health
```

Response:

```json
{
    "status": "OK",
    "message": "FocusFlow API is running",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "environment": "development"
}
```
