// src/pages/CourseDetails.js
import { useParams, useNavigate } from 'react-router-dom';

const courseData = {
  coding: {
    title: 'Coding',
    description: 'Learn programming from scratch using fun and interactive lessons.',
    outcomes: ['Problem solving', 'Logic building', 'Real-world coding'],
    price: '₹999'
  },
  robotics: {
    title: 'Robotics',
    description: 'Build robots and learn the basics of engineering and automation.',
    outcomes: ['Engineering mindset', 'Teamwork', 'Hands-on learning'],
    price: '₹1299'
  },
  // Add more courses similarly
};

const CourseDetail = () => {
  const { id } = useParams(); // e.g., 'coding'
  const navigate = useNavigate();

  const course = courseData[id];

  if (!course) return <div className="p-10 text-red-500">Course not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="mb-6">{course.description}</p>

      <h2 className="text-xl font-semibold mb-2">What you'll learn:</h2>
      <ul className="list-disc ml-6 mb-6">
        {course.outcomes.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      <div className="text-lg font-semibold mb-4">Price: {course.price}</div>

      <button
        onClick={() => navigate(`/buy/${id}`)}
        className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition"
      >
        Proceed to Buy
      </button>
    </div>
  );
};

export default CourseDetail;
