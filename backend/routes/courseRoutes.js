import express from "express";
import { getAllCourses, getCourseBySlug, seedCourses,
    getCourseQuiz
 } from "../controllers/courseController.js";

const router = express.Router();


router.get('/:slug/quiz', getCourseQuiz);

router.get("/", getAllCourses);
router.get('/seed', seedCourses);
router.get("/:slug", getCourseBySlug);
//router.post("/add-curriculum/:slug", addCurriculumToCourse);

export default router;
