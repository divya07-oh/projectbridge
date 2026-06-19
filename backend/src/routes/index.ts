import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { studentsRoutes } from '../modules/students/students.routes';
import { businessRoutes } from '../modules/businesses/business.routes';
import { projectsRoutes } from '../modules/projects/projects.routes';
import { applicationsRoutes } from '../modules/applications/applications.routes';
import { messagesRoutes } from '../modules/messages/messages.routes';
import { notificationsRoutes } from '../modules/notifications/notifications.routes';
import { dashboardRoutes } from '../modules/dashboard/dashboard.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/students', studentsRoutes);
router.use('/business', businessRoutes);
router.use('/projects', projectsRoutes);
router.use('/applications', applicationsRoutes);
router.use('/messages', messagesRoutes);
router.use('/notifications', notificationsRoutes);
router.use('/dashboard', dashboardRoutes);

export const apiRoutes = router;
