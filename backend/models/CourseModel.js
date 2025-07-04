// backend/models/CourseModel.js
import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  level: String,
  duration: String,
  slug: String,
  
  quiz: [
    {
      question: String,
      options: [String],
      answer: String, // correct answer
    }
  ]
});

export default mongoose.model("Course", CourseSchema);
