import { Router } from 'express';
import { 
  getNotifications, 
  markAsRead, 
  markAllAsRead 
} from './notifications.controller';
import { authenticateJWT } from '../../middlewares/auth.middleware';

const router = Router();

// Protect all notification routes
router.use(authenticateJWT);

router.get('/', getNotifications);
router.post('/read-all', markAllAsRead);
router.post('/:id/read', markAsRead);

export const notificationsRoutes = router;
