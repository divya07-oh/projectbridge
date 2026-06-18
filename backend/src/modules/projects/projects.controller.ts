import { Request, Response, NextFunction } from 'express';
import { ProjectsService } from './projects.service';
import { sendSuccess } from '../../utils/response';

export class ProjectsController {
  static async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ProjectsService.createProject(req.user.userId, req.body);
      return sendSuccess(res, 'Project created successfully', result, 201);
    } catch (error) {
      next(error);
    }
  }

  static async getProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ProjectsService.getProjects(req.query);
      return sendSuccess(res, 'Projects fetched successfully', result);
    } catch (error) {
      next(error);
    }
  }

  static async getProjectById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ProjectsService.getProjectById(req.params.id as string);
      return sendSuccess(res, 'Project fetched successfully', result);
    } catch (error) {
      next(error);
    }
  }

  static async updateProject(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ProjectsService.updateProject(req.params.id as string, req.user.userId, req.body);
      return sendSuccess(res, 'Project updated successfully', result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProject(req: Request, res: Response, next: NextFunction) {
    try {
      await ProjectsService.deleteProject(req.params.id as string, req.user.userId);
      return sendSuccess(res, 'Project deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
