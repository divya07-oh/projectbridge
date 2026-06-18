import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { sendSuccess } from '../../utils/response';

export class AuthController {
  static async studentSignup(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.studentSignup(req.body);
      return sendSuccess(res, 'Student signed up successfully', result, 201);
    } catch (error) {
      next(error);
    }
  }

  static async businessSignup(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.businessSignup(req.body);
      return sendSuccess(res, 'Business signed up successfully', result, 201);
    } catch (error) {
      next(error);
    }
  }

  static async studentLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.studentLogin(req.body);
      return sendSuccess(res, 'Student logged in successfully', result);
    } catch (error) {
      next(error);
    }
  }

  static async businessLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.businessLogin(req.body);
      return sendSuccess(res, 'Business logged in successfully', result);
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      // TODO: Database Integration - Invalidate refresh token if stored in DB
      return sendSuccess(res, 'Logged out successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.getMe(req.user.userId, req.user.role);
      return sendSuccess(res, 'Profile fetched successfully', result);
    } catch (error) {
      next(error);
    }
  }
}
