import express from "express";
import multer from "multer";
import { createCourse, getAllCourses} from "../controllers/courseController.js";
import { authorizeRoles, protect} from "../middleware/auth.js";
import upload from '../middleware/multer.js'

const router = express.Router();
// const upload = multer({ dest: "uploads/"});

router.post("/create", protect,  authorizeRoles('admin'),upload.single("CourseThumbnail"), createCourse);
router.get( "/all", getAllCourses);
//     try{
//         const courses = await Courses.find().sort({ createdAt: -1 });
//         res.status(200).json({ success: true, courses });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// });
// router.get("/:slug", getCourseBySlug);
//router.post("/add-curriculum/:slug", addCurriculumToCourse);

export default router;
