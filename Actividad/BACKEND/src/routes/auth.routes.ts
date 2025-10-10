import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.ts';
import { validateApiKey } from '../middlewares/apiKey.middleware.ts';

const router = Router();

router.post('/register', validateApiKey, register);
router.post('/login', validateApiKey, login);

export default router;
