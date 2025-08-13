// controllers/progressController.js
import Progress from "../models/progressmodel.js";
import Course from "../models/CourseModel.js";

export const markLectureComplete = async (req, res) => {
  try {
    const { courseId, lectureId, watchedPercentage } = req.body;
    const userId = req.user.id;

    // 1. Validate input
    if (!courseId || !lectureId || typeof watchedPercentage !== "number") {
      return res.status(400).json({ message: "Invalid input data" });
    }

    if (watchedPercentage < 80) {
      return res.status(400).json({ message: "Video not watched enough to mark complete" });
    }

    // 2. Ensure course exists & get lecture count
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const totalLectures = course.CourseContent.reduce((acc, chapter) => {
      return acc + (chapter.chapterContent?.length || 0);
    }, 0);
    if (totalLectures === 0) {
      return res.status(400).json({ message: "Course has no lectures" });
    }

    // 3. Ensure user has progress record
    let progress = await Progress.findOne({ userId, courseId });
    if (!progress) {
      progress = new Progress({
        userId,
        courseId,
        completedLectures: [],
        totalLectures
      });
    } else if (progress.totalLectures !== totalLectures) {
      // Handle if course structure changed
      progress.totalLectures = totalLectures;
    }

    // 4. Add lecture if not already completed
    if (!progress.completedLectures.includes(lectureId)) {
      progress.completedLectures.push(lectureId);
    }

    // 5. Calculate percentage
    progress.percentage = Math.floor((progress.completedLectures.length / totalLectures) * 100);
    progress.lastUpdated = new Date();

    await progress.save();

    return res.status(200).json({ message: "Lecture marked complete", progress });
  } catch (error) {
    console.error("Error marking lecture complete:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const progress = await Progress.findOne({ userId, courseId });

    if (!progress) {
      return res.status(404).json({ message: "No progress found for this course" });
    }

    return res.status(200).json(progress);
  } catch (error) {
    console.error("Error fetching course progress:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
