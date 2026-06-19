import { Router } from 'express';
import { 
  applyToProject, 
  getStudentApplications, 
  getProjectApplicants, 
  acceptApplication, 
  rejectApplication, 
  shortlistApplication 
} from './applications.controller';
import { authenticateJWT } from '../../middlewares/auth.middleware';
import { authorizeRole } from '../../middlewares/role.middleware';
import { validateRequest } from '../../middlewares/validation.middleware';
import { applyToProjectSchema } from './applications.validation';

const router = Router();

// Protect all application routes
router.use(authenticateJWT);

// Student specific routes
router.post('/projects/:id/apply', authorizeRole(['student']), validateRequest(applyToProjectSchema), applyToProject);
router.get('/student', authorizeRole(['student']), getStudentApplications);

// Business specific routes
router.get('/projects/:id/applicants', authorizeRole(['business']), getProjectApplicants);
router.post('/:id/accept', authorizeRole(['business']), acceptApplication);
router.post('/:id/reject', authorizeRole(['business']), rejectApplication);
router.post('/:id/shortlist', authorizeRole(['business']), shortlistApplication);

export const applicationsRoutes = router;
