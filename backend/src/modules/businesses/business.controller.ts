import { Request, Response, NextFunction } from 'express';
import { BusinessService } from './business.service';
import { sendSuccess, sendError } from '../../utils/response';

export class BusinessController {
  static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await BusinessService.getProfile(req.user.userId);
      return sendSuccess(res, 'Profile fetched successfully', result);
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await BusinessService.updateProfile(req.user.userId, req.body);
      return sendSuccess(res, 'Profile updated successfully', result);
    } catch (error) {
      next(error);
    }
  }

  static async uploadLogo(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        return sendError(res, 'No image provided', null, 400);
      }
      const result = await BusinessService.uploadLogo(req.user.userId, req.file);
      return sendSuccess(res, 'Logo uploaded successfully', result);
    } catch (error) {
      next(error);
    }
  }
}
