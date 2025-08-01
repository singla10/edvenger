import mongoose from "mongoose";

const lectureProgressSchema = new mongoose.Schema({
  lectureId: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  timeSpent: { type: Number, default: 0 }, // in seconds
  completedAt: { type: Date },
  watchPercentage: { type: Number, default: 0 }, // 0-100
  lastWatchedPosition: { type: Number, default: 0 } // in seconds for video resume
}, { _id: false });

const chapterProgressSchema = new mongoose.Schema({
  chapterId: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  completedLectures: { type: Number, default: 0 },
  totalLectures: { type: Number, required: true },
  completionPercentage: { type: Number, default: 0 }, // 0-100
  timeSpent: { type: Number, default: 0 }, // in seconds
  lectures: [lectureProgressSchema]
}, { _id: false });

const quizScoreSchema = new mongoose.Schema({
  quizId: { type: String, required: true },
  score: { type: Number, required: true },
  maxScore: { type: Number, required: true },
  percentage: { type: Number, required: true },
  attemptedAt: { type: Date, default: Date.now },
  timeTaken: { type: Number }, // in seconds
  correctAnswers: { type: Number, required: true },
  totalQuestions: { type: Number, required: true }
}, { _id: false });

const ProgressSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  courseId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course',
    required: true 
  },
  
  // Overall course progress
  overallProgress: { type: Number, default: 0 }, // 0-100
  isCompleted: { type: Boolean, default: false },
  completedAt: { type: Date },
  totalTimeSpent: { type: Number, default: 0 }, // in seconds
  
  // Chapter and lecture progress
  chapters: [chapterProgressSchema],
  
  // Quiz scores
  quizScores: [quizScoreSchema],
  averageQuizScore: { type: Number, default: 0 },
  
  // Additional tracking fields
  streak: { type: Number, default: 0 }, // consecutive days
  lastAccessedDate: { type: Date, default: Date.now },
  certificateEarned: { type: Boolean, default: false },
  studySessionCount: { type: Number, default: 0 },
  skillsAcquired: [{ type: String }],
  
  // Progress milestones
  milestones: [{
    type: { type: String, enum: ['first_lecture', 'chapter_complete', 'quiz_passed', 'course_complete'] },
    achievedAt: { type: Date, default: Date.now },
    chapterId: String,
    lectureId: String
  }],
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Compound index for efficient queries
ProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });
ProgressSchema.index({ userId: 1 });
ProgressSchema.index({ courseId: 1 });

// Update the updatedAt field before saving
ProgressSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Progress", ProgressSchema);