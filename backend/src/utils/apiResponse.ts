import { Response } from 'express';

export const apiResponse = {
  success: (res: Response, statusCode: number, message: string, data: any = {}) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  },
  
  error: (res: Response, statusCode: number, message: string, errorDetails?: any) => {
    return res.status(statusCode).json({
      success: false,
      message,
      error: errorDetails || undefined
    });
  }
};
