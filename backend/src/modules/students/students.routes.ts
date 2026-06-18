import { Router } from 'express';
import { StudentsController } from './students.controller';
import { authenticateJWT } from '../../middlewares/auth.middleware';
import { authorizeRole } from '../../middlewares/role.middleware';
import { validateRequest } from '../../middlewares/validation.middleware';
import { uploadMiddleware } from '../../middlewares/upload.middleware';
import { updateStudentProfileSchema } from './students.validation';

const router = Router();

// Apply auth and role middleware to all student routes
router.use(authenticateJWT, authorizeRole(['STUDENT']));

router.get('/profile', StudentsController.getProfile);
router.put('/profile', validateRequest(updateStudentProfileSchema), StudentsController.updateProfile);
router.post('/upload-avatar', uploadMiddleware.single('avatar'), StudentsController.uploadAvatar);
router.post('/upload-cover', uploadMiddleware.single('cover'), StudentsController.uploadCover);

export const studentsRoutes = router;
