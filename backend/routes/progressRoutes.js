import express from "express";
import { protect } from "../middleware/auth.js";
import { initProgress, markLectureComplete, getUserProgress } from "../controllers/userProgressController.js";

const router = express.Router();

router.post("/init", protect, initProgress);
router.post("/complete-lecture", protect, markLectureComplete);
router.get("/:courseId", protect, getUserProgress);

export default router;
