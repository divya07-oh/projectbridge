import { Request, Response, NextFunction } from 'express';
import { StudentsService } from './students.service';
import { sendSuccess, sendError } from '../../utils/response';

export class StudentsController {
  static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await StudentsService.getProfile(req.user.userId);
      return sendSuccess(res, 'Profile fetched successfully', result);
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await StudentsService.updateProfile(req.user.userId, req.body);
      return sendSuccess(res, 'Profile updated successfully', result);
    } catch (error) {
      next(error);
    }
  }

  static async uploadAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        return sendError(res, 'No image provided', null, 400);
      }
      const result = await StudentsService.uploadAvatar(req.user.userId, req.file);
      return sendSuccess(res, 'Avatar uploaded successfully', result);
    } catch (error) {
      next(error);
    }
  }

  static async uploadCover(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        return sendError(res, 'No image provided', null, 400);
      }
      const result = await StudentsService.uploadCover(req.user.userId, req.file);
      return sendSuccess(res, 'Cover uploaded successfully', result);
    } catch (error) {
      next(error);
    }
  }
}
