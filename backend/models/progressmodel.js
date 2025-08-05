import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  completedLectures: [
    {
      lectureId: { type: String, required: true },
      completedAt: { type: Date, default: Date.now }
    }
  ],
  lastAccessedLecture: { type: String }, // to resume last watched
  overallProgress: { type: Number, default: 0 }, // percentage
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
}, { timestamps: true });

// Ensure one record per user+course
userProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.model("UserProgress", userProgressSchema);
