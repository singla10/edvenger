import { useEffect } from "react";
import { useShop } from "../context/shopcontext";

const CoursesPage = () => {
  const { fetchCourses, courses } = useShop();

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Courses</h2>

      {!courses || courses.length === 0 ? (
        <p className="text-center">🚫 No courses available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition duration-300">
              {course.CourseThumbnail && (
                <img
                  src={course.CourseThumbnail || "https://via.placeholder.com/400x250?text=Course+Image"}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded mb-3 cursor-pointer hover:opacity-90"
                />
              )}
              <h3 className="text-xl font-semibold mb-1">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{course.description}</p>
              <p><strong>Category:</strong> {course.categoryId}</p>
              <p><strong>Level:</strong> {course.levelNumber}</p>
              <p><strong>Price:</strong> ₹{course.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
