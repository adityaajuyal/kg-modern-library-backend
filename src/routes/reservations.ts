import { Router } from 'express';
import { 
  createReservation, 
  getReservations, 
  cancelReservation,
  getMyReservations 
} from '../controllers/reservationController';
import { authenticateToken, requireAdmin, requireUserOrAdmin } from '../middleware/auth';
import { adminAuth } from '../middleware/adminAuth';

const router = Router();

// Protected routes
router.get('/my-reservations', authenticateToken, getMyReservations);
router.post('/', authenticateToken, createReservation);
router.get('/', authenticateToken, requireAdmin, getReservations);
router.delete('/:id', authenticateToken, cancelReservation);

export default router;
