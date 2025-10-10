import { Router } from 'express';
import { createMovement, getMovements } from '../controllers/movement.controller.ts';
import { verifyToken } from '../middlewares/auth.middleware.ts';
import { checkRole } from '../middlewares/role.middleware.ts';

const router = Router();

// Solo usuarios autenticados pueden acceder
router.get('/', verifyToken, getMovements);

// Solo admin o analyst pueden crear movimientos
router.post('/', verifyToken, checkRole(['admin', 'analyst']), createMovement);

export default router;
