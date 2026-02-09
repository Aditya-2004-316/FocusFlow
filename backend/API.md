# FocusFlow API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message",
  "error": "Error message if success is false"
}
```

---

## Authentication Endpoints

### Register User

**POST** `/auth/register`

Register a new user account.

**Request Body:**

```json
{
    "email": "user@example.com",
    "username": "username",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
}
```

**Response:**

```json
{
    "success": true,
    "message": "User registered successfully. Please check your email to verify your account.",
    "data": {
        "user": {
            "id": "507f1f77bcf86cd799439011",
            "email": "user@example.com",
            "username": "username",
            "firstName": "John",
            "lastName": "Doe",
            "isEmailVerified": false
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
}
```

### Login User

**POST** `/auth/login`

Authenticate user and get access token.

**Request Body:**

```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

**Response:**

```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "user": {
            "id": "507f1f77bcf86cd799439011",
            "email": "user@example.com",
            "username": "username",
            "firstName": "John",
            "lastName": "Doe",
            "isEmailVerified": true,
            "lastLogin": "2024-01-01T12:00:00.000Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
}
```

### Get Current User

**GET** `/auth/me`

Get current authenticated user's profile.

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
    "success": true,
    "data": {
        "user": {
            "id": "507f1f77bcf86cd799439011",
            "email": "user@example.com",
            "username": "username",
            "firstName": "John",
            "lastName": "Doe",
            "avatar": null,
            "isEmailVerified": true,
            "lastLogin": "2024-01-01T12:00:00.000Z",
            "createdAt": "2024-01-01T10:00:00.000Z"
        }
    }
}
```

### Forgot Password

**POST** `/auth/forgot-password`

Send password reset email.

**Request Body:**

```json
{
    "email": "user@example.com"
}
```

**Response:**

```json
{
    "success": true,
    "message": "Password reset email sent"
}
```

### Reset Password

**POST** `/auth/reset-password/:token`

Reset password using token from email.

**Request Body:**

```json
{
    "password": "newpassword123"
}
```

**Response:**

```json
{
    "success": true,
    "message": "Password reset successful"
}
```

### Change Password

**PUT** `/auth/change-password`

Change current user's password.

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
    "currentPassword": "oldpassword123",
    "newPassword": "newpassword123"
}
```

**Response:**

```json
{
    "success": true,
    "message": "Password changed successfully"
}
```

### Logout

**POST** `/auth/logout`

Logout current user.

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
    "success": true,
    "message": "Logged out successfully"
}
```

---

## Timer Endpoints

### Get All Timers

**GET** `/timers`

Get all timers for the authenticated user.

**Headers:**

```
Authorization: Bearer <token>
```

**Query Parameters:**

-   `page` (optional): Page number (default: 1)
-   `limit` (optional): Items per page (default: 10)
-   `type` (optional): Filter by timer type
-   `isActive` (optional): Filter by active status

**Response:**

```json
{
    "success": true,
    "data": {
        "timers": [
            {
                "id": "507f1f77bcf86cd799439011",
                "type": "pomodoro",
                "duration": 25,
                "title": "Work Session",
                "description": "Focus on project tasks",
                "isActive": false,
                "startTime": "2024-01-01T10:00:00.000Z",
                "endTime": "2024-01-01T10:25:00.000Z",
                "completedAt": "2024-01-01T10:25:00.000Z",
                "createdAt": "2024-01-01T09:55:00.000Z"
            }
        ]
    },
    "pagination": {
        "page": 1,
        "limit": 10,
        "total": 1,
        "totalPages": 1
    }
}
```

### Create Timer

**POST** `/timers`

Create a new timer.

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
    "type": "pomodoro",
    "duration": 25,
    "title": "Work Session",
    "description": "Focus on project tasks",
    "tags": ["work", "project"]
}
```

**Response:**

```json
{
    "success": true,
    "message": "Timer created successfully",
    "data": {
        "timer": {
            "id": "507f1f77bcf86cd799439011",
            "type": "pomodoro",
            "duration": 25,
            "title": "Work Session",
            "description": "Focus on project tasks",
            "isActive": false,
            "tags": ["work", "project"],
            "createdAt": "2024-01-01T10:00:00.000Z"
        }
    }
}
```

### Get Timer by ID

**GET** `/timers/:id`

Get a specific timer by ID.

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
    "success": true,
    "data": {
        "timer": {
            "id": "507f1f77bcf86cd799439011",
            "type": "pomodoro",
            "duration": 25,
            "title": "Work Session",
            "description": "Focus on project tasks",
            "isActive": false,
            "startTime": "2024-01-01T10:00:00.000Z",
            "endTime": "2024-01-01T10:25:00.000Z",
            "completedAt": "2024-01-01T10:25:00.000Z",
            "tags": ["work", "project"],
            "createdAt": "2024-01-01T09:55:00.000Z"
        }
    }
}
```

### Start Timer

**PUT** `/timers/:id/start`

Start a timer session.

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
    "success": true,
    "message": "Timer started successfully",
    "data": {
        "timer": {
            "id": "507f1f77bcf86cd799439011",
            "isActive": true,
            "startTime": "2024-01-01T10:00:00.000Z"
        }
    }
}
```

### Pause Timer

**PUT** `/timers/:id/pause`

Pause a running timer.

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
    "success": true,
    "message": "Timer paused successfully",
    "data": {
        "timer": {
            "id": "507f1f77bcf86cd799439011",
            "isActive": false,
            "interruptedAt": "2024-01-01T10:15:00.000Z"
        }
    }
}
```

### Complete Timer

**PUT** `/timers/:id/complete`

Complete a timer session.

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
    "success": true,
    "message": "Timer completed successfully",
    "data": {
        "timer": {
            "id": "507f1f77bcf86cd799439011",
            "isActive": false,
            "endTime": "2024-01-01T10:25:00.000Z",
            "completedAt": "2024-01-01T10:25:00.000Z"
        }
    }
}
```

---

## Distraction Endpoints

### Get All Distractions

**GET** `/distractions`

Get all distractions for the authenticated user.

**Headers:**

```
Authorization: Bearer <token>
```

**Query Parameters:**

-   `page` (optional): Page number (default: 1)
-   `limit` (optional): Items per page (default: 10)
-   `type` (optional): Filter by distraction type
-   `severity` (optional): Filter by severity level
-   `startDate` (optional): Filter by start date
-   `endDate` (optional): Filter by end date

**Response:**

```json
{
    "success": true,
    "data": {
        "distractions": [
            {
                "id": "507f1f77bcf86cd799439011",
                "type": "phone",
                "description": "Phone call interruption",
                "duration": 5,
                "timestamp": "2024-01-01T10:15:00.000Z",
                "severity": "medium",
                "tags": ["interruption"],
                "createdAt": "2024-01-01T10:15:00.000Z"
            }
        ]
    },
    "pagination": {
        "page": 1,
        "limit": 10,
        "total": 1,
        "totalPages": 1
    }
}
```

### Log Distraction

**POST** `/distractions`

Log a new distraction.

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
    "type": "phone",
    "description": "Phone call interruption",
    "duration": 5,
    "severity": "medium",
    "tags": ["interruption"],
    "timerSessionId": "507f1f77bcf86cd799439011"
}
```

**Response:**

```json
{
    "success": true,
    "message": "Distraction logged successfully",
    "data": {
        "distraction": {
            "id": "507f1f77bcf86cd799439011",
            "type": "phone",
            "description": "Phone call interruption",
            "duration": 5,
            "timestamp": "2024-01-01T10:15:00.000Z",
            "severity": "medium",
            "tags": ["interruption"],
            "createdAt": "2024-01-01T10:15:00.000Z"
        }
    }
}
```

---

## Statistics Endpoints

### Get User Statistics

**GET** `/stats`

Get user's productivity statistics.

**Headers:**

```
Authorization: Bearer <token>
```

**Query Parameters:**

-   `period` (optional): Time period (today, week, month, year, all)
-   `startDate` (optional): Start date for custom period
-   `endDate` (optional): End date for custom period

**Response:**

```json
{
    "success": true,
    "data": {
        "stats": {
            "totalFocusTime": 120,
            "totalSessions": 5,
            "completedSessions": 4,
            "interruptedSessions": 1,
            "totalDistractions": 3,
            "averageSessionLength": 24,
            "productivityScore": 85,
            "dailyStats": [
                {
                    "date": "2024-01-01",
                    "focusTime": 120,
                    "sessions": 5,
                    "distractions": 3
                }
            ]
        }
    }
}
```

---

## Settings Endpoints

### Get User Settings

**GET** `/settings`

Get user's application settings.

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
    "success": true,
    "data": {
        "settings": {
            "timerSettings": {
                "pomodoroDuration": 25,
                "shortBreakDuration": 5,
                "longBreakDuration": 15,
                "longBreakInterval": 4,
                "autoStartBreaks": false,
                "autoStartPomodoros": false
            },
            "notificationSettings": {
                "soundEnabled": true,
                "desktopNotifications": true,
                "emailNotifications": false,
                "breakReminders": true
            },
            "themeSettings": {
                "theme": "light",
                "accentColor": "#3B82F6"
            },
            "privacySettings": {
                "shareStats": false,
                "shareProgress": false
            }
        }
    }
}
```

### Update Settings

**PUT** `/settings`

Update user's application settings.

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
    "timerSettings": {
        "pomodoroDuration": 30,
        "shortBreakDuration": 5,
        "longBreakDuration": 15
    },
    "notificationSettings": {
        "soundEnabled": false
    }
}
```

**Response:**

```json
{
    "success": true,
    "message": "Settings updated successfully",
    "data": {
        "settings": {
            "timerSettings": {
                "pomodoroDuration": 30,
                "shortBreakDuration": 5,
                "longBreakDuration": 15,
                "longBreakInterval": 4,
                "autoStartBreaks": false,
                "autoStartPomodoros": false
            },
            "notificationSettings": {
                "soundEnabled": false,
                "desktopNotifications": true,
                "emailNotifications": false,
                "breakReminders": true
            }
        }
    }
}
```

---

## Error Responses

### Validation Error (400)

```json
{
    "success": false,
    "error": "Validation failed",
    "details": [
        {
            "field": "email",
            "message": "Please provide a valid email"
        }
    ]
}
```

### Authentication Error (401)

```json
{
    "success": false,
    "error": "Not authorized to access this route"
}
```

### Not Found Error (404)

```json
{
    "success": false,
    "error": "Resource not found"
}
```

### Server Error (500)

```json
{
    "success": false,
    "error": "Server error"
}
```

---

## Rate Limiting

The API implements rate limiting to prevent abuse:

-   **Limit**: 100 requests per 15 minutes per IP address
-   **Headers**: Rate limit information is included in response headers
    -   `X-RateLimit-Limit`: Maximum requests per window
    -   `X-RateLimit-Remaining`: Remaining requests in current window
    -   `X-RateLimit-Reset`: Time when the rate limit resets

---

## Health Check

### Get API Health Status

**GET** `/health`

Check if the API is running and healthy.

**Response:**

```json
{
    "status": "OK",
    "message": "FocusFlow API is running",
    "timestamp": "2024-01-01T12:00:00.000Z",
    "environment": "development"
}
```
