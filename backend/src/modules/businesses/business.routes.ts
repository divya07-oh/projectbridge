import { Router } from 'express';
import { BusinessController } from './business.controller';
import { authenticateJWT } from '../../middlewares/auth.middleware';
import { authorizeRole } from '../../middlewares/role.middleware';
import { validateRequest } from '../../middlewares/validation.middleware';
import { uploadMiddleware } from '../../middlewares/upload.middleware';
import { updateBusinessProfileSchema } from './business.validation';

const router = Router();

// Apply auth and role middleware to all business routes
router.use(authenticateJWT, authorizeRole(['BUSINESS']));

router.get('/profile', BusinessController.getProfile);
router.put('/profile', validateRequest(updateBusinessProfileSchema), BusinessController.updateProfile);
router.post('/upload-logo', uploadMiddleware.single('logo'), BusinessController.uploadLogo);

export const businessRoutes = router;
