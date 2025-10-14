import { Router } from 'express';
import { RegistrationController } from '../controllers/registration.controller.ts';
import { authenticate, authorize } from '../middleware/auth.middleware.ts';

const router = Router();

// Solo los estudiantes pueden inscribirse o ver sus inscripciones
router.post('/', authenticate, authorize(['student']), RegistrationController.register);
router.get('/me', authenticate, authorize(['student']), RegistrationController.getMyRegistrations);

export default router;
