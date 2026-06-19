// This file is deprecated. Use apiResponse.ts instead.
// Keeping it to not break existing auth controllers until they are refactored (though we were told not to rebuild existing modules, so I will alias it to apiResponse).
import { Response } from 'express';
import { apiResponse } from './apiResponse';

export const sendSuccess = (res: Response, message: string, data: any = {}, statusCode = 200) => {
  return apiResponse.success(res, statusCode, message, data);
};

export const sendError = (res: Response, message: string, error: any = null, statusCode = 500) => {
  return apiResponse.error(res, statusCode, message, error);
};
