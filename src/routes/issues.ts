import { Router } from 'express';
import { 
  issueBook, 
  returnBook, 
  getIssueRecords,
  getMyIssues 
} from '../controllers/issueController';
import { authenticateToken, requireAdmin, requireUser } from '../middleware/auth';

const router = Router();

// Protected routes
router.get('/my-issues', authenticateToken, requireUser, getMyIssues);
router.get('/', authenticateToken, requireAdmin, getIssueRecords);
router.post('/issue', authenticateToken, requireAdmin, issueBook);
router.post('/return', authenticateToken, requireAdmin, returnBook);

export default router;
