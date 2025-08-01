import express from "express";
import multer from "multer";
import { addChapter, addLecture, createCourse, getAllCourses, getCourseById} from "../controllers/courseController.js";
import { authorizeRoles, protect} from "../middleware/auth.js";
import upload from '../middleware/multer.js'

const router = express.Router();
// const upload = multer({ dest: "uploads/"});

router.post("/create", protect,  authorizeRoles('admin'),upload.single("CourseThumbnail"), createCourse);
router.get( "/all", getAllCourses);
router.get("/:id", getCourseById);
router.post("/:courseId/add-chapter", protect, authorizeRoles('admin'), addChapter);
router.post("/:courseId/add-lecture/:chapterId", protect, authorizeRoles('admin'), upload.single("lectureUrl"), addLecture);

export default router;
