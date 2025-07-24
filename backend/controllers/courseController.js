import Course from '../models/CourseModel.js';

export const createCourse = async (req, res) => {
  try {
    const { title, categoryId, levelNumber, description, 
      thumbnail, programHighlights, duration, gradeRangeMin, gradeRangeMax,
      price, status, order, featured, quiz, videoUrl } = req.body;

        // ensure all required fields are provided)
    if (
      !title ||
      !categoryId ||
      !levelNumber ||
      !description ||
      !Array.isArray(programHighlights) || !programHighlights.length ||
      !thumbnail ||
      !duration ||
      gradeRangeMin == undefined ||
      gradeRangeMax == undefined ||
      !price ||
      !videoUrl
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newCourse = new Course({
      title,
      categoryId,
      levelNumber,
      description,
      programHighlights,
      thumbnail,
      duration,
      gradeRange: {
        min: gradeRangeMin,
        max: gradeRangeMax,
      },
      price,
      status,
      order,
      featured,
      quiz,
      videoUrl
    });

  
    const savedCourse = await newCourse.save();
    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: savedCourse
    });
  } catch (err) {
    console.error("Error creating course:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// export const seedCourses = async (req, res) => {
//   try {

//     await Course.deleteMany({});
//     const courses = [
//       {
//         title: "Coding",
//         slug: "coding",
//         description: "Learn programming fundamentals and build cool projects.",
//         image: "https://cdn-icons-png.flaticon.com/512/2721/2721291.png",
//         level: "Beginner",
//         duration: "6 weeks"
//       },
//       {
//         title: "Robotics",
//         slug: "robotics",
//         description: "Build robots and understand automation basics.",
//         image: "https://cdn-icons-png.flaticon.com/512/9636/9636596.png",
//         level: "Intermediate",
//         duration: "8 weeks",
//         quiz: [
//     {
//       question: "What does a sensor do in a robot?",
//       options: ["Provide power", "Send signals", "Detect surroundings", "Move arms"],
//       answer: "Detect surroundings"
//     },
//      {
//       question: "Which component is used to control a robot?",
//       options: ["Battery", "Microcontroller", "Wheels", "Motors"],
//       answer: "Microcontroller"
//     }
//        ]

//       },
//       {
//         title: "Mathematics",
//         slug: "mathematics",
//         description: "Fun ways to master numbers and logic.",
//         image: "https://cdn-icons-png.flaticon.com/512/1177/1177611.png",
//         level: "Beginner",
//         duration: "4 weeks"
//       },

//       {
//         title: "Artificial Intelligence",
//         slug: "AI",
//         description: "Fun ways to master numbers and logic.",
//         image: "https://cdn-icons-png.flaticon.com/512/4712/4712107.png",
//         level: "Beginner",
//         duration: "4 weeks"
//       },
      
//       {
//         title: "3D Modelling",
//         slug: "3d-modelling",
//         description: "Design cool 3D models for STEM projects.",
//         image: "https://cdn-icons-png.flaticon.com/512/1605/1605350.png",
//         level: "Intermediate",
//         duration: "5 weeks"
//       },

//             {
//         title: "Arduino / Electronics",
//         slug: "arduino-electronics",
//         description: "Build electronic circuits using Arduino boards.",
//         image: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
//         level: "Intermediate",
//         duration: "6 weeks"
//       }

//     ];

//     await Course.insertMany(courses);
//     res.json({ message: 'Courses seeded successfully!' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error seeding courses', error: err.message });
//   }
// };

// export const getCourseQuiz = async (req, res) => {
//   try {
//     const course = await Course.findOne({ slug: req.params.slug });
//     if (!course || !course.quiz) return res.status(404).json({ message: "Quiz not found" });
//     res.json(course.quiz);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };



