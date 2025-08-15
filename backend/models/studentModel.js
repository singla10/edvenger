const StudentSchema = new mongoose.Schema({
  courses: {},
  phone: {
    type: String,
    required: true,
  },
  address:{
    type: String,
    required: true,
  },
  progress: {
    ref: 'Progress',
    type: mongoose.Schema.Types.ObjectId,
  },

});

export default mongoose.model('Student', StudentSchema);