// routes/userRoutes.ts
import { Router } from 'express';
import { createUser, getUser, getUserById, updateUser, deleteUser } from '../controllers/user.controller.ts';

const router = Router();

router.post('/', createUser);
router.get('/', getUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
