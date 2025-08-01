import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/shopcontext";

const CoursePages = () => {
  const { fetchCourses, courses } = useShop();
  const navigate = useNavigate();

  // Filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  // ✅ Apply filters and search
  const filteredCourses = (courses || []).filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || course.categoryId === selectedCategory;

    const matchesLevel =
      selectedLevel === "All" || course.levelNumber.toString() === selectedLevel;

    const matchesPrice =
      !maxPrice || course.price <= Number(maxPrice);

    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">🎓 Browse Our Courses</h2>

      {/* ✅ Filters Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-gray-100 p-4 rounded-lg">
        <input
          type="text"
          placeholder="🔍 Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-1/3"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-1/4"
        >
          <option value="All">All Categories</option>
          <option value="Junior">Junior</option>
          <option value="Explorer">Explorer</option>
          <option value="Master">Master</option>
        </select>

        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-1/4"
        >
          <option value="All">All Levels</option>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
        </select>

        <input
          type="number"
          placeholder="Max Price (₹)"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-1/4"
        />
      </div>

      {/* ✅ Courses Grid */}
      {!Array.isArray(filteredCourses) || filteredCourses.length === 0 ? (
        <p className="text-center text-gray-500">🚫 No courses found matching your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              onClick={() => navigate(`/courses/${course._id}`)}
              className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition duration-300 cursor-pointer"
            >
              <img
                src={course.CourseThumbnail || "https://via.placeholder.com/400x250?text=Course+Image"}
                alt={course.title}
                className="w-full h-40 object-cover rounded mb-3 hover:opacity-90"
              />
              <h3 className="text-xl font-semibold mb-1">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{course.description}</p>
              <p><strong>Category:</strong> {course.categoryId}</p>
              <p><strong>Level:</strong> {course.levelNumber}</p>
              <p><strong>Price:</strong> <span className="text-green-600">₹{course.price}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursePages;
