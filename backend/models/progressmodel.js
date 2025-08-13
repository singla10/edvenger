// models/Progress.js
import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  completedLectures: [{ type: String }], // Store lecture IDs as strings
  // completedLectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
  totalLectures: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

progressSchema.index({ userId: 1, courseId: 1 }, { unique: true }); // Prevent duplicates

export default mongoose.model("Progress", progressSchema);
