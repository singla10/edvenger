import mongoose from "mongoose";

const instTeacherSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
  name: {
    type: String,
    required: true,
  },
  email: String,
  coursesAssigned: [String], // Replace with ref if you have Course model
  institute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institute',
    required: true
  }
}, { timestamps: true });

const InstTeacher = mongoose.model("InstTeacher", instTeacherSchema);
export default InstTeacher;
