import { Router } from 'express';
import { ProjectsController } from './projects.controller';
import { authenticateJWT } from '../../middlewares/auth.middleware';
import { authorizeRole } from '../../middlewares/role.middleware';
import { validateRequest } from '../../middlewares/validation.middleware';
import { createProjectSchema, updateProjectSchema } from './projects.validation';

const router = Router();

// Public routes
router.get('/', ProjectsController.getProjects);
router.get('/:id', ProjectsController.getProjectById);

// Protected routes (Business only)
router.post('/', authenticateJWT, authorizeRole(['BUSINESS']), validateRequest(createProjectSchema), ProjectsController.createProject);
router.put('/:id', authenticateJWT, authorizeRole(['BUSINESS']), validateRequest(updateProjectSchema), ProjectsController.updateProject);
router.delete('/:id', authenticateJWT, authorizeRole(['BUSINESS']), ProjectsController.deleteProject);

export const projectsRoutes = router;
