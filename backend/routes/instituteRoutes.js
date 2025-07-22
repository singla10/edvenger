// backend/routes/instituteRoutes.js
import express from "express";
import { getInstituteWithMembers,
    getInstituteStudents, 
    getInstituteTeachers
 } from "../controllers/instituteController.js";

const router = express.Router();

router.get("/:id/details", getInstituteWithMembers);
router.get("/:id/students", getInstituteStudents);
router.get("/:id/teachers", getInstituteTeachers);

export default router;
