import { Router } from 'express';
import {createProduct, getProducts, getProductById, updateProduct, deleteProduct} from '../controllers/product.controller.ts';
import { verifyToken } from '../middlewares/auth.middleware.ts';
import { checkRole } from '../middlewares/role.middleware.ts';

const router = Router();

// Rutas públicas
router.get('/', verifyToken, getProducts);
router.get('/:id', verifyToken, getProductById);

// Solo admin puede crear, actualizar o eliminar
router.post('/', verifyToken, checkRole(['admin']), createProduct);
router.put('/:id', verifyToken, checkRole(['admin']), updateProduct);
router.delete('/:id', verifyToken, checkRole(['admin']), deleteProduct);

export default router;
