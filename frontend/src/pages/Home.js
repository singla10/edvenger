import { useEffect, useRef, useState } from 'react';
import CourseCard from '../components/CourseCard';
import programming from '../assets/programming.png';
import Robot from '../assets/robot.png';
import Math from '../assets/mathematics.png';
import AI from '../assets/artificial-intelligence.png';
import Model from '../assets/model.png';
import Board from '../assets/motherboard.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../Styles/Home.css";
import NeuroShowcase from '../components/NeuroShowcase';
import Lottie from "lottie-react";
import robotAnimation from "../assets/robot-banner.json";

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

  return (
    <>
      <Navbar ref={navbarRef} />

      <section
        ref={heroRef}
        className={`hero-section fade-in ${heroVisible ? 'visible' : ''}`}
      >
        <div className="hero-left">
          <h1>Let's Start Your Journey</h1>
          <p>Empower your future with STEM-powered education.</p>
          <button>Enroll Now</button>
        </div>
        <div className="hero-right">
           <Lottie animationData={robotAnimation} loop={true} />
          {/* <Player
            autoplay
            loop
            src={robotAnimation}
            style={{ width: "300px", height: "300px" }}/> */}

          {/* <img alt="STEM Robot" /> */}
        </div>
      </section>

      <div
        ref={neuroRef}
        className={`fade-in ${neuroVisible ? 'visible' : ''}`}
      >
        <NeuroShowcase />
      </div>

      <section
        ref={categoriesRef}
        className={`categories-section fade-in ${categoriesVisible ? 'visible' : ''}`}
      >
        <h2>Our Course Categories</h2>
        <div className="categories-grid">
          <CourseCard title="Coding" icon={programming} link="coding" />
          <CourseCard title="Robotics" icon={Robot} link="robotics" />
          <CourseCard title="Mathematics" icon={Math} link="mathematics" />
          <CourseCard title="Artificial Intelligence" icon={AI} link="AI" />
          <CourseCard title="3D Modelling" icon={Model} link="3d-modelling" />
          <CourseCard title="Ardunio/ Electronics" icon={Board} link="ardunio-electronics" />
        </div>
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
