import { Request, Response, NextFunction } from 'express';
import { dashboardService } from './dashboard.service';
import { apiResponse } from '../../utils/apiResponse';

export const getStudentDashboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = (req as any).user?.id || 'mock_student_id';
    const data = await dashboardService.getStudentDashboard(studentId);
    return apiResponse.success(res, 200, 'Student dashboard fetched successfully', data);
  } catch (error) {
    next(error);
  }
};

export const getBusinessDashboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const businessId = (req as any).user?.id || 'mock_business_id';
    const data = await dashboardService.getBusinessDashboard(businessId);
    return apiResponse.success(res, 200, 'Business dashboard fetched successfully', data);
  } catch (error) {
    next(error);
  }
};
