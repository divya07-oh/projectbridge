import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../utils/apiError';
import { apiResponse } from '../utils/apiResponse';
import { logger } from '../utils/logger';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message || 'Error occurred', err);

  if (err instanceof ApiError) {
    return apiResponse.error(res, err.statusCode, err.message, process.env.NODE_ENV === 'development' ? err.stack : null);
  }

  if (err instanceof ZodError) {
    return apiResponse.error(res, 400, 'Validation Error', (err as any).errors);
  }

  // Fallback for unhandled errors
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  return apiResponse.error(
    res, 
    statusCode, 
    message, 
    process.env.NODE_ENV === 'development' ? err.stack : null
  );
};
