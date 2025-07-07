import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboardController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// Protected routes (Admin only)
router.get('/stats', authenticateToken, requireAdmin, getDashboardStats);

export default router;
