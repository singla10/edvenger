// backend/controllers/instituteController.js
import Institute from "../models/projectmodel.js";
import InstStudent from "../models/InstStudent.js";
import InstTeacher from "../models/InstTeacher.js";

// GET /api/institute/:id/details
export const getInstituteWithMembers = async (req, res) => {
  try {
    const instituteId = req.params.id;

    // 1. Fetch institute data
    const institute = await Institute.findById(instituteId);
    if (!institute) return res.status(404).json({ message: "Institute not found" });

    // 2. Fetch students under this institute
    const students = await InstStudent.find({ institute: instituteId }).populate("user", "name email");

    // 3. Fetch teachers under this institute
    const teachers = await InstTeacher.find({ institute: instituteId }).populate("user", "name email");

    // 4. Return all data
    res.status(200).json({
      institute,
      studentCount: students.length,
      teacherCount: teachers.length,
      students,
      teachers,
    });

  } catch (err) {
    console.error("Error fetching institute data:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// in instituteController.js
export const getInstituteStudents = async (req, res) => {
  try {
    const students = await InstStudent.find({ institute: req.params.id }).populate("user", "name email");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
};

// in instituteController.js
export const getInstituteTeachers = async (req, res) => {
  try {
    const teachers = await InstTeacher.find({ institute: req.params.id }).populate("user", "name email");
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teachers" });
  }
};


