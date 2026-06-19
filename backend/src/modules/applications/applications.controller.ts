import { Request, Response, NextFunction } from 'express';
import { applicationsService } from './applications.service';
import { apiResponse } from '../../utils/apiResponse';

export const applyToProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = req.params.id as string;
    const studentId = (req as any).user?.id || 'mock_student_id'; // Fallback for testing
    
    const application = await applicationsService.applyToProject(projectId, studentId, req.body);
    return apiResponse.success(res, 201, 'Application submitted successfully', application);
  } catch (error) {
    next(error);
  }
};

export const getStudentApplications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = (req as any).user?.id || 'mock_student_id';
    const apps = await applicationsService.getStudentApplications(studentId);
    return apiResponse.success(res, 200, 'Applications fetched successfully', apps);
  } catch (error) {
    next(error);
  }
};

export const getProjectApplicants = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = req.params.id as string;
    const businessId = (req as any).user?.id || 'mock_business_id';
    
    const applicants = await applicationsService.getProjectApplicants(projectId, businessId);
    return apiResponse.success(res, 200, 'Applicants fetched successfully', applicants);
  } catch (error) {
    next(error);
  }
};

export const acceptApplication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const businessId = (req as any).user?.id || 'mock_business_id';
    const app = await applicationsService.updateApplicationStatus(id, 'accepted', businessId);
    return apiResponse.success(res, 200, 'Application accepted', app);
  } catch (error) {
    next(error);
  }
};

export const rejectApplication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const businessId = (req as any).user?.id || 'mock_business_id';
    const app = await applicationsService.updateApplicationStatus(id, 'rejected', businessId);
    return apiResponse.success(res, 200, 'Application rejected', app);
  } catch (error) {
    next(error);
  }
};

export const shortlistApplication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const businessId = (req as any).user?.id || 'mock_business_id';
    const app = await applicationsService.updateApplicationStatus(id, 'shortlisted', businessId);
    return apiResponse.success(res, 200, 'Application shortlisted', app);
  } catch (error) {
    next(error);
  }
};
