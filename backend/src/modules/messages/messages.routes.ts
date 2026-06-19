import { Router } from 'express';
import { 
  getConversations, 
  getConversationMessages, 
  sendMessage, 
  markAsRead 
} from './messages.controller';
import { authenticateJWT } from '../../middlewares/auth.middleware';

const router = Router();

// Apply auth middleware to all messaging routes
router.use(authenticateJWT);

router.get('/conversations', getConversations);
router.get('/:conversationId', getConversationMessages);
router.post('/send', sendMessage);
router.post('/read', markAsRead);

export const messagesRoutes = router;
