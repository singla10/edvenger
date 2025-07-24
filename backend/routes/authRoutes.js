// backend/routes/authRoutes.js
import express from "express";
import { register, loginUser , adminLogin } from '../controllers/authController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// const ADMIN_USERNAME = "admin";
// const ADMIN_PASSWORD = "admin123"; 

router.post('/admin/login', adminLogin);

router.post('/register', register);
router.post('/login', loginUser);

router.get('/admin-data', protect, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Only accessible by admin', user: req.user });
});

export default router;
