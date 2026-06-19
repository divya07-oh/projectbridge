import { Request, Response, NextFunction } from 'express';
import { messagesService } from './messages.service';
import { apiResponse } from '../../utils/apiResponse';

export const getConversations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id || 'mock_student_id';
    const conversations = await messagesService.getConversations(userId);
    return apiResponse.success(res, 200, 'Conversations fetched successfully', conversations);
  } catch (error) {
    next(error);
  }
};

export const getConversationMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const conversationId = req.params.conversationId as string;
    const userId = (req as any).user?.id || 'mock_student_id';
    const messages = await messagesService.getConversationMessages(conversationId, userId);
    return apiResponse.success(res, 200, 'Messages fetched successfully', messages);
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { conversationId, text } = req.body;
    const senderId = (req as any).user?.id || 'mock_student_id';
    const message = await messagesService.sendMessage(conversationId, senderId, text);
    
    // TODO: Integrate Socket.IO emitting here in the future
    // req.app.get('io').to(conversationId).emit('message', message);
    
    return apiResponse.success(res, 201, 'Message sent', message);
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { conversationId } = req.body;
    const userId = (req as any).user?.id || 'mock_student_id';
    const conversation = await messagesService.markAsRead(conversationId, userId);
    return apiResponse.success(res, 200, 'Conversation marked as read', conversation);
  } catch (error) {
    next(error);
  }
};
