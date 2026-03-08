import express from 'express';
import { authUser, registerUser, registerDriver } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', authUser);
router.post('/register-user', registerUser);
router.post('/register-driver', registerDriver);

export default router;
