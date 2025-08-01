import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import "../Styles/Home.css";
import NeuroShowcase from '../components/NeuroShowcase';
import Lottie from "lottie-react";
import FloatingDroneBot from "../components/RobotHead";


// Reusable hook to animate on scroll
const useScrollAnimation = () => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);


 
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

const Home = () => {
  const navbarRef = useRef(null);

  const [heroRef, heroVisible] = useScrollAnimation();
  const [neuroRef, neuroVisible] = useScrollAnimation();
  const [categoriesRef, categoriesVisible] = useScrollAnimation();
  const [aboutRef, aboutVisible] = useScrollAnimation();
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (!navbarRef.current) return;
      if (window.scrollY > 80) {
        navbarRef.current.classList.add("scrolled");
      } else {
        navbarRef.current.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

   const handleEnrollNow = () => {
  const user = localStorage.getItem('user');
  if (user) {
    navigate('/courses'); // redirect to courses if logged in
  } else {
    navigate('/login'); // otherwise redirect to login
  }
};


  return (
    <>
      <Navbar ref={navbarRef} />

      <section
       ref={heroRef}
       className={`fade-in ${heroVisible ? 'visible' : ''} bg-gradient-to-r from-black via-black/80 to-gray-800 [background-size:100%_100%] [background-image:linear-gradient(to_right,_black_60%,_#1f2937_100%)] text-white min-h-[80vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12`}
      >
      <div className="md:w-1/2 space-y-6">
      <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
      Let's Start Your Journey
      </h1>
      <p className="text-lg md:text-xl">
      Empower your future with STEM-powered education.
      </p>
      <button 
      onClick={handleEnrollNow}
      className="mt-4 px-6 py-3 bg-white text-indigo-700 font-semibold rounded shadow hover:bg-gray-100 transition">
      Enroll Now
      </button>
      </div>

       <div className="box">
      <FloatingDroneBot />
      </div> 
      </section>

      <div
        ref={neuroRef}
        className={`fade-in ${neuroVisible ? 'visible' : ''} px-4 md:px-16 py-10 `}
      >
        <NeuroShowcase />
      </div>

     

     <section
     className="bg-gray-50 px-6 md:px-16 py-16"
     >
      <h3 className="text-3xl md:text-4xl font-bold text-center my-12">
        Our Back To School Programs
      </h3>
     </section>


      <section
        ref={aboutRef}
        className={`about-us-section fade-in ${aboutVisible ? 'visible' : ''}`}
      >
        <div className="about-content">
          <h2>About Us</h2>
          <p>
            At <strong>EdVengers</strong>, we're redefining how young minds explore science, technology, engineering, and mathematics.
            Designed especially for curious learners aged 6 to 18, our platform blends hands-on learning with modern tools —
            from <strong>robotics and AI</strong> to our exclusive <strong>Neuroscience Kit</strong> that helps students uncover how the brain works.
          </p>
          <p>
            Our mission is to inspire the next generation of innovators by making STEM fun, relatable, and accessible to everyone.
            With interactive content, real-world projects, and expert-curated courses, we’re helping students think critically, build creatively, and lead confidently in tomorrow’s world.
          </p>
          <p><strong>Let’s spark brilliance — one brain at a time.</strong></p>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
