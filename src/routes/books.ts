import { Router } from 'express';
import { 
  getAllBooks, 
  getBookById, 
  createBook, 
  updateBook, 
  deleteBook,
  searchBooks 
} from '../controllers/bookController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getAllBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookById);

// Protected routes (Admin only)
router.post('/', authenticateToken, requireAdmin, createBook);
router.put('/:id', authenticateToken, requireAdmin, updateBook);
router.delete('/:id', authenticateToken, requireAdmin, deleteBook);

export default router;
