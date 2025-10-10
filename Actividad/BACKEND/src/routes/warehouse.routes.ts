import { Router } from 'express';
import { createWarehouse, getWarehouses, getWarehouseById, updateWarehouse, deleteWarehouse } from '../controllers/warehouse.controller.ts';
import { verifyToken } from '../middlewares/auth.middleware.ts';
import { checkRole } from '../middlewares/role.middleware.ts';

const router = Router();

// Solo usuarios autenticados pueden consultar bodegas
router.get('/', verifyToken, getWarehouses);
router.get('/:id', verifyToken, getWarehouseById);

// Solo admin puede crear, actualizar o eliminar
router.post('/', verifyToken, checkRole(['admin']), createWarehouse);
router.put('/:id', verifyToken, checkRole(['admin']), updateWarehouse);
router.delete('/:id', verifyToken, checkRole(['admin']), deleteWarehouse);

export default router;
