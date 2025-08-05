// controllers/userProgressController.js
import UserProgress from "../models/progress.js";
import Course from "../models/CourseModel.js";

// 1️⃣ Initialize user progress for a course (on enrollment)
export const initProgress = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id; // from token

    // Check if progress already exists
    const existing = await UserProgress.findOne({ userId, courseId });
    if (existing) {
      return res.status(200).json({ success: true, message: "Progress already initialized", progress: existing });
    }

    const newProgress = new UserProgress({ userId, courseId });
    await newProgress.save();

    return res.status(201).json({ success: true, message: "Progress initialized", progress: newProgress });
  } catch (error) {
    console.error("Error initializing progress:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// 2️⃣ Mark a lecture as completed
export const markLectureComplete = async (req, res) => {
  try {
    const { courseId, lectureId } = req.body;
    const userId = req.user.id;

    const progress = await UserProgress.findOne({ userId, courseId });
    if (!progress) {
      return res.status(404).json({ success: false, message: "Progress not found" });
    }

    // Avoid duplicate entries
    const alreadyCompleted = progress.completedLectures.some(l => l.lectureId === lectureId);
    if (!alreadyCompleted) {
      progress.completedLectures.push({ lectureId, completedAt: new Date() });
    }

    // Calculate total lectures in this course
    const course = await Course.findById(courseId).select("CourseContent");
    const totalLectures = course.CourseContent.reduce((acc, ch) => acc + ch.chapterContent.length, 0);

    // Update progress percentage
    progress.overallProgress = ((progress.completedLectures.length / totalLectures) * 100).toFixed(2);

    // Mark course completed if all lectures are done
    if (progress.completedLectures.length === totalLectures) {
      progress.completedAt = new Date();
    }

    await progress.save();

    return res.status(200).json({ success: true, message: "Lecture marked complete", progress });
  } catch (error) {
    console.error("Error marking lecture complete:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// 3️⃣ Get user progress for a specific course
export const getUserProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const progress = await UserProgress.findOne({ userId, courseId });
    if (!progress) {
      return res.status(404).json({ success: false, message: "No progress found" });
    }

    return res.status(200).json({ success: true, progress });
  } catch (error) {
    console.error("Error fetching user progress:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
