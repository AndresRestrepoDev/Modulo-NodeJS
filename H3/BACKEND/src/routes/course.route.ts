import { Router } from 'express';
import { CourseController } from '../controllers/course.controller.ts';
import { authenticate, authorize } from '../middleware/auth.middleware.ts';

const router = Router();

// Admin puede crear, editar y eliminar cursos
router.post('/', authenticate, authorize(['admin']), CourseController.create);
router.put('/:id', authenticate, authorize(['admin']), CourseController.update);
router.delete('/:id', authenticate, authorize(['admin']), CourseController.remove);

// Cualquier usuario autenticado (admin o student) puede ver cursos
router.get('/', authenticate, authorize(['admin', 'student']), CourseController.getAll);
router.get('/:id', authenticate, authorize(['admin', 'student']), CourseController.getById);

export default router;
