import express from 'express';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Admin-only route
router.get('/admin-data', protect, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Only accessible by admin' });
});

// Student-only route
router.get('/student-data', protect, authorizeRoles('student'), (req, res) => {
  res.json({ message: 'Only accessible by students' });
});

export default router;
