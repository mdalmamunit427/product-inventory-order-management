import express from 'express';
import { loginUser, registerUser } from './user.controller';

const router = express.Router();

router.post('/create-account', registerUser);
router.post('/login', loginUser);

export const userRoutes = router;