// backend/routes/authRoutes.js
import express from "express";
import { register, loginUser , adminLogin } from '../controllers/authController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();



router.post('/admin/login', adminLogin);

router.post('/register', register);
router.post('/login', loginUser);



export default router;
