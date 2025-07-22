import mongoose from "mongoose";
import User from "./User";

const instituteSchema = new mongoose.Schema({
  Institutename: {
    type: String,
    required: true,
    ref: User
  },
  logo: {
    type: String, // URL or filename
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    ref: User
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InstStudent'
  }],
  teachers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InstTeacher'
  }],

   isRegistered: {
    type: Boolean,
    default: false // initially not registered
  },

  registeredAt: {
    type: Date
  }
}, { timestamps: true });

const Institute = mongoose.model("Institute", instituteSchema);
export default Institute;
