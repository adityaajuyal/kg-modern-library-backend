# Authentication API Documentation

## Overview

This authentication system provides secure JWT-based authentication for both regular users and administrators. It includes user registration, login, token refresh, profile management, and password change functionality.

## Features

- ✅ User Registration & Login
- ✅ Admin Login (separate endpoint)
- ✅ JWT Access & Refresh Tokens
- ✅ Password Hashing with bcrypt
- ✅ Role-based Access Control (USER/ADMIN)
- ✅ Protected Routes Middleware
- ✅ Profile Management
- ✅ Password Change
- ✅ Token Refresh
- ✅ Input Validation with Zod

## Base URL

```
http://localhost:5000/api/auth
```

## Authentication Flow

1. **Register/Login** → Receive access token + refresh token
2. **Use Access Token** → Include in Authorization header for protected routes
3. **Token Expires** → Use refresh token to get new access token
4. **Logout** → Client discards tokens

## API Endpoints

### 1. User Registration

**POST** `/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": "123 Main St, City, State 12345"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER",
    "phone": "+1234567890",
    "address": "123 Main St, City, State 12345",
    "createdAt": "2025-01-01T12:00:00.000Z"
  },
  "accessToken": "jwt-access-token",
  "refreshToken": "jwt-refresh-token"
}
```

### 2. User Login

**POST** `/login`

Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER",
    "phone": "+1234567890",
    "address": "123 Main St, City, State 12345",
    "isActive": true,
    "createdAt": "2025-01-01T12:00:00.000Z",
    "updatedAt": "2025-01-01T12:00:00.000Z"
  },
  "accessToken": "jwt-access-token",
  "refreshToken": "jwt-refresh-token"
}
```

### 3. Admin Login

**POST** `/admin/login`

Login as administrator (requires ADMIN role).

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Admin login successful",
  "user": {
    "id": "uuid",
    "email": "admin@example.com",
    "firstName": "System",
    "lastName": "Administrator",
    "role": "ADMIN",
    "phone": null,
    "address": null,
    "isActive": true,
    "createdAt": "2025-01-01T12:00:00.000Z",
    "updatedAt": "2025-01-01T12:00:00.000Z"
  },
  "accessToken": "jwt-access-token",
  "refreshToken": "jwt-refresh-token"
}
```

### 4. Refresh Token

**POST** `/refresh-token`

Get a new access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "jwt-refresh-token"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "accessToken": "new-jwt-access-token"
}
```

### 5. Get User Profile

**GET** `/profile`

Get current user's profile information.

**Headers:**
```
Authorization: Bearer jwt-access-token
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "address": "123 Main St, City, State 12345",
    "role": "USER",
    "isActive": true,
    "createdAt": "2025-01-01T12:00:00.000Z",
    "updatedAt": "2025-01-01T12:00:00.000Z"
  }
}
```

### 6. Update User Profile

**PUT** `/profile`

Update user profile information.

**Headers:**
```
Authorization: Bearer jwt-access-token
```

**Request Body:**
```json
{
  "firstName": "John Updated",
  "lastName": "Doe Updated",
  "phone": "+1234567891",
  "address": "456 Updated St, City, State 12345"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John Updated",
    "lastName": "Doe Updated",
    "phone": "+1234567891",
    "address": "456 Updated St, City, State 12345",
    "role": "USER",
    "isActive": true,
    "createdAt": "2025-01-01T12:00:00.000Z",
    "updatedAt": "2025-01-01T12:05:00.000Z"
  }
}
```

### 7. Change Password

**PUT** `/change-password`

Change user password.

**Headers:**
```
Authorization: Bearer jwt-access-token
```

**Request Body:**
```json
{
  "currentPassword": "password123",
  "newPassword": "newpassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

### 8. Logout

**POST** `/logout`

Logout user (client should discard tokens).

**Headers:**
```
Authorization: Bearer jwt-access-token
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message description"
}
```

### Common Error Codes

- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Invalid credentials or missing/expired token
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: User not found
- **409 Conflict**: Email already exists
- **500 Internal Server Error**: Server error

## Middleware

### Authentication Middleware

```javascript
// Verify JWT token and add user to request
app.use('/api/protected', authenticateToken);

// Require specific roles
app.use('/api/admin', authenticateToken, requireAdmin);
app.use('/api/user', authenticateToken, requireUser);
app.use('/api/dashboard', authenticateToken, requireUserOrAdmin);
```

### Available Middleware

- `authenticateToken`: Verify JWT token
- `requireAdmin`: Require ADMIN role
- `requireUser`: Require USER role
- `requireUserOrAdmin`: Require USER or ADMIN role
- `optionalAuth`: Optional authentication (doesn't fail if no token)

## JWT Token Structure

### Access Token Payload
```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "role": "USER",
  "iat": 1640995200,
  "exp": 1641081600
}
```

### Token Expiration
- **Access Token**: 7 days
- **Refresh Token**: 30 days

## Security Features

1. **Password Hashing**: bcrypt with salt rounds
2. **JWT Tokens**: Signed with secret keys
3. **Input Validation**: Zod schemas for all inputs
4. **Role-based Access**: Different permissions for USER/ADMIN
5. **Account Status**: Active/inactive user accounts
6. **Token Verification**: Database lookup for each request

## Environment Variables

```env
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-jwt-key
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d
```

## Testing the API

### Using curl

```bash
# Register User
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User",
    "phone": "+1234567890",
    "address": "123 Test St"
  }'

# Login User
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get Profile (replace TOKEN with actual token)
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer TOKEN"
```

### Using PowerShell

```powershell
# Register User
$registerBody = @{
    email = "test@example.com"
    password = "password123"
    firstName = "Test"
    lastName = "User"
    phone = "+1234567890"
    address = "123 Test St"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Body $registerBody -ContentType "application/json"

# Login User
$loginBody = @{
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
```

## Database Schema

The authentication system uses the following user schema:

```sql
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');
```
