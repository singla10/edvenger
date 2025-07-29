
import Course from '../models/CourseModel.js';
import { v2 as cloudinary} from 'cloudinary';

export const createCourse = async (req, res) => {
  try {
    console.log("incoming course data:",req.body);
    const { title, categoryId, 
       levelNumber, description, 
       price, duration, gradeRangeMin, gradeRangeMax,
        status, order, featured } = req.body
       const CourseThumbnail = req.file
       

        // ensure all required fields are provided)

        // if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
        // return res.status(400).json({ message: "Invalid category ID" });}
        const missingFields = [];
        if (!title)missingFields.push("title");
        if (!categoryId)missingFields.push("categoryId");
        if (!levelNumber)missingFields.push("levelNumber");
        if (!description)missingFields.push("description");
        if (!duration)missingFields.push("duration");
        if (!gradeRangeMax)missingFields.push("grade range max");
        if (!gradeRangeMin)missingFields.push("grade range min");
        if (!price)missingFields.push("price");
        if (!CourseThumbnail)missingFields.push("CourseThumbnail");
    if (
      
      // !Array.isArray(programHighlights) || !programHighlights.length ||
      missingFields.length>0
      //!videoUrl
     ){
      return res.status(400).json({ message: "Missing required fields", missingFields });
    }

   


    const newCourse = new Course({
      title,
      categoryId,
      levelNumber,
      description,
      
       CourseThumbnail,
       duration,
       gradeRange: {
         min: gradeRangeMin,
         max: gradeRangeMax,
       },
      price,
      status,
      order,
      featured,
     
    }); 
     const thumbnailUpload = await cloudinary.uploader.upload(CourseThumbnail.path);
     newCourse.CourseThumbnail = thumbnailUpload.secure_url;

  
    const savedCourse = await newCourse.save();
     console.log(`Course created: ${savedCourse.title} by admin ${req.user.id}`);
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

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({
      success: true,
      courses
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Failed to fetch courses" });
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



