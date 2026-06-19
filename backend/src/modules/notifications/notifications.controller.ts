import { Request, Response, NextFunction } from 'express';
import { notificationsService } from './notifications.service';
import { apiResponse } from '../../utils/apiResponse';

export const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id || 'mock_student_id';
    const notifications = await notificationsService.getUserNotifications(userId);
    return apiResponse.success(res, 200, 'Notifications fetched successfully', notifications);
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const userId = (req as any).user?.id || 'mock_student_id';
    const notification = await notificationsService.markAsRead(id, userId);
    return apiResponse.success(res, 200, 'Notification marked as read', notification);
  } catch (error) {
    next(error);
  }
};

export const markAllAsRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id || 'mock_student_id';
    const result = await notificationsService.markAllAsRead(userId);
    return apiResponse.success(res, 200, 'All notifications marked as read', result);
  } catch (error) {
    next(error);
  }
};
