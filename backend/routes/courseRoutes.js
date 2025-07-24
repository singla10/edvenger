import express from "express";
import { createCourse} from "../controllers/courseController.js";
import { protect} from "../middleware/auth.js";
import Courses from "../../admin/src/Pages/Courses.js";

const router = express.Router();

router.post("/create", protect, createCourse);
router.get( "/all", protect, async (req, res) => {
    try{
        const courses = await Courses.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, courses });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});
// router.get("/:slug", getCourseBySlug);
//router.post("/add-curriculum/:slug", addCurriculumToCourse);

export default router;
