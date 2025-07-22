import mongoose from "mongoose";

const instStudentSchema = new mongoose.Schema({
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
  coursesEnrolled: [String], // You can replace with Course ref later
  institute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institute',
    required: true
  }
}, { timestamps: true });

const InstStudent = mongoose.model("InstStudent", instStudentSchema);
export default InstStudent;
