/**
 * Authentication API Test Examples
 * 
 * This file contains example API calls for testing the authentication system.
 * You can use these examples with tools like Postman, curl, or Insomnia.
 */

// Base URL for all API calls
const BASE_URL = 'http://localhost:5000/api/auth';

/**
 * 1. USER REGISTRATION
 * POST /api/auth/register
 */
const registerUser = {
  method: 'POST',
  url: `${BASE_URL}/register`,
  headers: {
    'Content-Type': 'application/json'
  },
  body: {
    email: 'john.doe@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1234567890',
    address: '123 Main St, City, State 12345'
  }
};

/**
 * 2. USER LOGIN
 * POST /api/auth/login
 */
const loginUser = {
  method: 'POST',
  url: `${BASE_URL}/login`,
  headers: {
    'Content-Type': 'application/json'
  },
  body: {
    email: 'john.doe@example.com',
    password: 'password123'
  }
};

/**
 * 3. ADMIN LOGIN
 * POST /api/auth/admin/login
 */
const adminLogin = {
  method: 'POST',
  url: `${BASE_URL}/admin/login`,
  headers: {
    'Content-Type': 'application/json'
  },
  body: {
    email: 'admin@example.com',
    password: 'admin123'
  }
};

/**
 * 4. REFRESH TOKEN
 * POST /api/auth/refresh-token
 */
const refreshToken = {
  method: 'POST',
  url: `${BASE_URL}/refresh-token`,
  headers: {
    'Content-Type': 'application/json'
  },
  body: {
    refreshToken: 'your-refresh-token-here'
  }
};

/**
 * 5. GET USER PROFILE (Protected Route)
 * GET /api/auth/profile
 */
const getProfile = {
  method: 'GET',
  url: `${BASE_URL}/profile`,
  headers: {
    'Authorization': 'Bearer your-access-token-here',
    'Content-Type': 'application/json'
  }
};

/**
 * 6. UPDATE USER PROFILE (Protected Route)
 * PUT /api/auth/profile
 */
const updateProfile = {
  method: 'PUT',
  url: `${BASE_URL}/profile`,
  headers: {
    'Authorization': 'Bearer your-access-token-here',
    'Content-Type': 'application/json'
  },
  body: {
    firstName: 'John Updated',
    lastName: 'Doe Updated',
    phone: '+1234567891',
    address: '456 Updated St, City, State 12345'
  }
};

/**
 * 7. CHANGE PASSWORD (Protected Route)
 * PUT /api/auth/change-password
 */
const changePassword = {
  method: 'PUT',
  url: `${BASE_URL}/change-password`,
  headers: {
    'Authorization': 'Bearer your-access-token-here',
    'Content-Type': 'application/json'
  },
  body: {
    currentPassword: 'password123',
    newPassword: 'newpassword123'
  }
};

/**
 * 8. LOGOUT
 * POST /api/auth/logout
 */
const logout = {
  method: 'POST',
  url: `${BASE_URL}/logout`,
  headers: {
    'Authorization': 'Bearer your-access-token-here',
    'Content-Type': 'application/json'
  }
};

/**
 * CURL EXAMPLES
 */

// Register User
const curlRegister = `
curl -X POST ${BASE_URL}/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "john.doe@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "address": "123 Main St, City, State 12345"
  }'
`;

// Login User
const curlLogin = `
curl -X POST ${BASE_URL}/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
`;

// Admin Login
const curlAdminLogin = `
curl -X POST ${BASE_URL}/admin/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
`;

// Get Profile (Protected)
const curlGetProfile = `
curl -X GET ${BASE_URL}/profile \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \\
  -H "Content-Type: application/json"
`;

// Update Profile (Protected)
const curlUpdateProfile = `
curl -X PUT ${BASE_URL}/profile \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \\
  -H "Content-Type: application/json" \\
  -d '{
    "firstName": "John Updated",
    "lastName": "Doe Updated",
    "phone": "+1234567891"
  }'
`;

// Change Password (Protected)
const curlChangePassword = `
curl -X PUT ${BASE_URL}/change-password \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \\
  -H "Content-Type: application/json" \\
  -d '{
    "currentPassword": "password123",
    "newPassword": "newpassword123"
  }'
`;

/**
 * RESPONSE EXAMPLES
 */

// Successful Registration Response
const registrationResponse = {
  success: true,
  message: 'User registered successfully',
  user: {
    id: 'user-uuid',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'USER',
    phone: '+1234567890',
    address: '123 Main St, City, State 12345',
    createdAt: '2025-01-01T12:00:00.000Z'
  },
  accessToken: 'jwt-access-token',
  refreshToken: 'jwt-refresh-token'
};

// Successful Login Response
const loginResponse = {
  success: true,
  message: 'Login successful',
  user: {
    id: 'user-uuid',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'USER',
    phone: '+1234567890',
    address: '123 Main St, City, State 12345',
    isActive: true,
    createdAt: '2025-01-01T12:00:00.000Z',
    updatedAt: '2025-01-01T12:00:00.000Z'
  },
  accessToken: 'jwt-access-token',
  refreshToken: 'jwt-refresh-token'
};

// Error Response Example
const errorResponse = {
  success: false,
  error: 'User already exists with this email'
};

export {
  registerUser,
  loginUser,
  adminLogin,
  refreshToken,
  getProfile,
  updateProfile,
  changePassword,
  logout,
  curlRegister,
  curlLogin,
  curlAdminLogin,
  curlGetProfile,
  curlUpdateProfile,
  curlChangePassword,
  registrationResponse,
  loginResponse,
  errorResponse
};
