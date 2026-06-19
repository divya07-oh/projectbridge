import { Router } from 'express';
import { getStudentDashboard, getBusinessDashboard } from './dashboard.controller';
import { authenticateJWT } from '../../middlewares/auth.middleware';
import { authorizeRole } from '../../middlewares/role.middleware';

const router = Router();

// Protect all dashboard routes
router.use(authenticateJWT);

router.get('/student', authorizeRole(['student']), getStudentDashboard);
router.get('/business', authorizeRole(['business']), getBusinessDashboard);

export const dashboardRoutes = router;
