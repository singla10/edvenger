import express from "express";
import {
  getCourseProgress,
  markLectureComplete
} from "../controllers/ProgressController.js";
import {  protect } from "../middleware/auth.js";

const router = express.Router();

// Get the completion bar progress for a specific course
router.get("/:courseId", protect, getCourseProgress);

// Mark a lecture as completed by the user
router.post("/mark-complete", protect, markLectureComplete);

export default router;
