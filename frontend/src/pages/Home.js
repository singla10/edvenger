import React from "react";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import NeuroShowcase from "../components/NeuroShowcase";
import StatsCard from "../components/StatsCard";

const Home = () => {
  const neuroRef = useRef(null);
  const [neuroVisible, setNeuroVisible] = useState(false);
 const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setNeuroVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (neuroRef.current) observer.observe(neuroRef.current);
    return () => observer.disconnect();
  }, []);
  
  const handleStartLearning = () => {
    const token = localStorage.getItem("token");
    console.log("Token found:", token);

    if (token) {
    navigate("/courses");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="home-page">
      <Hero handleEnrollNow={handleStartLearning} />
      <StatsCard />
      <div
        ref={neuroRef}
        className={`fade-in ${neuroVisible ? "visible" : ""}`}
      >
        <NeuroShowcase />

        <section className="py-16 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
  <div className="max-w-6xl mx-auto text-center px-6">
    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10">
      🎒 Our Back-to-School Program
    </h2>
    <p className="text-gray-600 max-w-3xl mx-auto mb-12">
      We are proud to partner with leading schools to provide students with innovative learning experiences. Our goal is to bridge the gap between classroom education and real-world skills, making learning exciting, practical, and future-ready.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      {/* Card 1 */}
      <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
        <div className="text-blue-500 text-4xl mb-4">🏫</div>
        <h3 className="text-lg font-semibold mb-2">Partnering with Schools</h3>
        <p className="text-gray-500">
          Collaborating with top schools to bring technology-driven, hands-on learning programs for students of all grades.
        </p>
      </div>

      {/* Card 2 */}
      <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
        <div className="text-green-500 text-4xl mb-4">💡</div>
        <h3 className="text-lg font-semibold mb-2">Future-Ready Skills</h3>
        <p className="text-gray-500">
          Introducing STEM, AI, Robotics, and problem-solving workshops designed to boost creativity and innovation among kids.
        </p>
      </div>

      {/* Card 3 */}
      <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
        <div className="text-yellow-500 text-4xl mb-4">🤝</div>
        <h3 className="text-lg font-semibold mb-2">Empowering Educators</h3>
        <p className="text-gray-500">
          Training teachers with modern teaching tools and methodologies to enhance student engagement and understanding.
        </p>
      </div>
    </div>
  </div>
</section>


      </div>
    </div>
  );
};

export default Home;
