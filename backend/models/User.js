// /backend/models/UserModel.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: function() {
      return this.role !== 'institute';
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false // hide password in queries by default
  },
  role: {
    type: String,
    enum: ['admin', 'student', 'teacher', 'institute'],
    default: 'student'
  },
  profileImage: {
    type: String,
    default: ''
  },
  phone: {
    type: String
  },
  // Optional fields based on role
  instituteName: {
    type: String, // if the user is of role: institute
    required: function() {
      return this.role === 'institute';
    }
  },

  instituteLogo: {
    type: String,
    required: function() {
      return this.role === 'institute';
    }
  },

  specialization: {
    type: String // for teachers
  },
  // enrolledCourses: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Course'
  // }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 🔐 Password hash middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// 🔐 Password comparison method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
