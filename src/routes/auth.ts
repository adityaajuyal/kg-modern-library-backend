import { Router } from 'express';
import { 
  register, 
  login, 
  adminLogin, 
  refreshTokenHandler, 
  logout, 
  getProfile, 
  updateProfile, 
  changePassword 
} from '../controllers/authController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/admin/login', adminLogin);
router.post('/refresh-token', refreshTokenHandler);
router.post('/logout', logout);

// Protected routes (require authentication)
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.put('/change-password', authenticateToken, changePassword);

export default router;
