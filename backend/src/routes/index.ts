import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { studentsRoutes } from '../modules/students/students.routes';
import { businessRoutes } from '../modules/businesses/business.routes';
import { projectsRoutes } from '../modules/projects/projects.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/students', studentsRoutes);
router.use('/business', businessRoutes);
router.use('/projects', projectsRoutes);

export const apiRoutes = router;
