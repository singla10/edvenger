import { useEffect, useState } from "react";
import axios from "axios";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const dummyCourses = [
    {
      _id: "1",
      title: "AI for Juniors",
      description: "An introductory course to AI for school students.",
      categoryId: "Junior",
      levelNumber: 1,
      price: 1499,
      thumbnail: "https://via.placeholder.com/400x250",
    },
    {
      _id: "2",
      title: "Robotics Explorer",
      description: "Explore robotics using sensors, motors, and logic.",
      categoryId: "Explorer",
      levelNumber: 2,
      price: 1999,
      thumbnail: "https://via.placeholder.com/400x250",
    },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses/all"); // use your endpoint
        setCourses(res.data);
      } catch (err) {
        console.warn("Failed to fetch real courses. Using dummy data.");
        setCourses(dummyCourses);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Available Courses</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded shadow p-4 hover:shadow-lg transition duration-300"
            >
              <img
                src={course.thumbnail || "https://via.placeholder.com/400x250"}
                alt={course.title}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {course.description}
              </p>
              <p className="text-sm text-gray-500">Category: {course.categoryId}</p>
              <p className="font-bold text-blue-600 mt-2">₹{course.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
