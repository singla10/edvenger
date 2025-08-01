import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShop } from "../context/shopcontext";

const CourseDetailPage = () => {
  const { courses, fetchCourses } = useShop();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    if (!courses || courses.length === 0) {
      fetchCourses(); // Fetch courses if not already loaded
    }
  }, []);

  useEffect(() => {
    const selectedCourse = courses.find((c) => c._id === id);
    setCourse(selectedCourse);
  }, [courses, id]);

  if (!course) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 text-lg">⏳ Loading course details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Course Thumbnail */}
        <div>
          <img
            src={
              course.CourseThumbnail ||
              "https://via.placeholder.com/500x300?text=Course+Image"
            }
            alt={course.title}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Course Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-700 mb-4">{course.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <p><strong>Category:</strong> {course.categoryId}</p>
            <p><strong>Level:</strong> {course.levelNumber}</p>
            <p><strong>Grade Range:</strong> {course?.gradeRange?.min} - {course?.gradeRange?.max}</p>
            <p><strong>Duration:</strong> {course.duration} hrs</p>
            <p><strong>Price:</strong> <span className="text-green-600 font-semibold">₹{course.price}</span></p>
            <p><strong>Status:</strong> {course.status}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => setShowDemo(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              🎥 Watch Demo Video
            </button>
            <button
              onClick={() => alert("Proceeding to buy...")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              🛒 Proceed to Buy
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Modal for Demo Video */}
      {showDemo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative">
            <button
              onClick={() => setShowDemo(false)}
              className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4">{course.title} - Demo Video</h2>
            <div className="w-full h-64">
              {course.videoUrl ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={course.videoUrl}
                  title="Demo Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <p className="text-center text-gray-500">No demo video available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;
