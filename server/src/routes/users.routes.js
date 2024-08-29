import { Router } from 'express';
const router = Router();
import {registerUser, autenticateUser } from '../controllers/users.controller.js'

router.post("/signup", registerUser)
router.post("/login", autenticateUser)

export default router;