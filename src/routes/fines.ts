import { Router } from 'express';
import { getFines, payFine, waiveFine, getMyFines } from '../controllers/fineController';
import { authenticateToken, requireAdmin, requireUserOrAdmin } from '../middleware/auth';

const router = Router();

// Protected routes
router.get('/my-fines', authenticateToken, getMyFines);
router.get('/', authenticateToken, requireAdmin, getFines);
router.post('/pay/:id', authenticateToken, payFine);
router.post('/waive/:id', authenticateToken, requireAdmin, waiveFine);

export default router;
