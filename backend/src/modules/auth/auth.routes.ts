import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validateRequest } from '../../middlewares/validation.middleware';
import { authenticateJWT } from '../../middlewares/auth.middleware';
import { studentSignupSchema, businessSignupSchema, loginSchema } from './auth.validation';

const router = Router();

router.post('/student/signup', validateRequest(studentSignupSchema), AuthController.studentSignup);
router.post('/business/signup', validateRequest(businessSignupSchema), AuthController.businessSignup);
router.post('/student/login', validateRequest(loginSchema), AuthController.studentLogin);
router.post('/business/login', validateRequest(loginSchema), AuthController.businessLogin);
router.post('/logout', authenticateJWT, AuthController.logout);
router.get('/me', authenticateJWT, AuthController.getMe);

export const authRoutes = router;
