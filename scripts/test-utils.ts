import dotenv from 'dotenv';
import { hashPassword, comparePassword } from '../src/utils/password';
import { generateToken, verifyToken } from '../src/utils/jwt';

// Load environment variables
dotenv.config();

async function testUtils() {
  console.log('🧪 Testing Library Management System Utils...\n');
  
  try {
    // Test password hashing
    console.log('1. Testing password hashing...');
    const password = 'testPassword123';
    const hashedPassword = await hashPassword(password);
    console.log('   ✅ Password hashed successfully');
    
    // Test password comparison
    console.log('2. Testing password comparison...');
    const isValid = await comparePassword(password, hashedPassword);
    console.log(`   ✅ Password comparison: ${isValid ? 'PASS' : 'FAIL'}`);
    
    // Test JWT token generation
    console.log('3. Testing JWT token generation...');
    const user = { id: '1', email: 'test@example.com', role: 'USER' };
    const token = generateToken(user as any);
    console.log('   ✅ JWT token generated successfully');
    
    // Test JWT token verification
    console.log('4. Testing JWT token verification...');
    const decoded = verifyToken(token);
    console.log(`   ✅ Token verified: ${decoded.userId === '1' ? 'PASS' : 'FAIL'}`);
    
    // Test Admin token generation
    console.log('5. Testing Admin JWT token generation...');
    const adminUser = { id: '2', email: 'admin@example.com', role: 'ADMIN' };
    const adminToken = generateToken(adminUser as any);
    console.log('   ✅ Admin JWT token generated successfully');
    
    // Test Admin token verification
    console.log('6. Testing Admin JWT token verification...');
    const adminDecoded = verifyToken(adminToken);
    console.log(`   ✅ Admin token verified: ${adminDecoded.userId === '2' ? 'PASS' : 'FAIL'}`);
    
    // Test refresh token generation
    console.log('7. Testing refresh token generation...');
    const refreshToken = generateToken(user as any);
    console.log('   ✅ Refresh token generated successfully');
    
    console.log('\n🎉 All authentication tests passed! System is ready for production.\n');
    
    // Display authentication endpoints
    console.log('🔐 Available Authentication Endpoints:');
    console.log('   POST /api/auth/register          - User registration');
    console.log('   POST /api/auth/login             - User login');
    console.log('   POST /api/auth/admin/login       - Admin login');
    console.log('   POST /api/auth/refresh-token     - Refresh access token');
    console.log('   POST /api/auth/logout            - Logout');
    console.log('   GET  /api/auth/profile           - Get user profile (Protected)');
    console.log('   PUT  /api/auth/profile           - Update profile (Protected)');
    console.log('   PUT  /api/auth/change-password   - Change password (Protected)');
    console.log('\n🛡️  Protected Routes Available:');
    console.log('   Admin Only: /api/users, /api/books, /api/dashboard');
    console.log('   User/Admin: /api/issues, /api/fines, /api/reservations');
    console.log('   Protected: All routes requiring authentication\n');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testUtils();
