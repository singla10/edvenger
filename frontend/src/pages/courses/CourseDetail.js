import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useShop } from "../../context/shopcontext";

const CourseDetailPage = () => {
  const { courses, fetchCourses, addToCart } = useShop();
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    if (!courses || courses.length === 0) {
      fetchCourses();
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
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Main Content */}
      <div className="lg:col-span-2">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          {course.title}
        </h1>

        {/* Thumbnail or Demo Video */}
        <div className="mb-6">
          <img
            src={
              course.CourseThumbnail ||
              "https://via.placeholder.com/500x300?text=Course+Image"
            }
            alt={course.title}
            className="w-full h-72 object-cover rounded-xl shadow"
          />
        </div>

        {/* Description */}
        <p className="text-lg text-slate-700 mb-6">{course.description}</p>

        {/* Course Details */}
        <h2 className="text-2xl font-semibold text-teal-700 mb-3">
          Course Details
        </h2>
        <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-600">
          <li>
            <strong>Category:</strong> {course.categoryId}
          </li>
          <li>
            <strong>Level:</strong> {course.levelNumber}
          </li>
          <li>
            <strong>Grade Range:</strong> {course?.gradeRange?.min} -{" "}
            {course?.gradeRange?.max}
          </li>
          <li>
            <strong>Duration:</strong> {course.duration} hrs
          </li>
          <li>
            <strong>Price:</strong>{" "}
            <span className="text-green-600 font-semibold">
              ₹{course.price}
            </span>
          </li>
          <li>
            <strong>Status:</strong> {course.status}
          </li>
        </ul>
      </div>

      {/* Sidebar */}
      <aside className="lg:col-span-1 bg-white/80 rounded-2xl shadow p-6 border border-slate-100 flex flex-col gap-6 h-fit sticky top-24">
        {/* Author / Instructor */}
        {course.instructor && (
          <div className="flex items-center gap-4 mb-4">
            <img
              src={
                course.instructor.avatar ||
                "https://via.placeholder.com/100x100?text=User"
              }
              alt={course.instructor.name}
              className="w-16 h-16 rounded-full border border-teal-200 shadow"
            />
            <div>
              <div className="font-bold text-lg text-slate-800">
                {course.instructor.name}
              </div>
              <div className="text-slate-500 text-sm">
                {course.instructor.bio}
              </div>
            </div>
          </div>
        )}

        {/* Category */}
        <div>
          <span className="block text-slate-500 mb-1">Category</span>
          <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold">
            {course.categoryId}
          </span>
        </div>

        {/* Level */}
        <div>
          <span className="block text-slate-500 mb-1">Level</span>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
            {course.levelNumber}
          </span>
        </div>

        {/* Duration */}
        <div>
          <span className="block text-slate-500 mb-1">Duration</span>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            {course.duration} hrs
          </span>
        </div>

        {/* Buttons */}
        <button
          className="w-full px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-all duration-300"
          onClick={() => setShowDemo(true)}
        >
          🎥 Watch Demo Video
        </button>
        <button
          className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold shadow hover:from-teal-600 hover:to-emerald-600 transition-all duration-300"
          onClick={() => {
            addToCart(course);
            navigate("/cart");
          }}
        >
          🛒 Proceed to Buy
        </button>
      </aside>

      {/* Demo Video Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative">
            <button
              onClick={() => setShowDemo(false)}
              className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {course.title} - Demo Video
            </h2>
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
                <p className="text-center text-gray-500">
                  No demo video available
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;
