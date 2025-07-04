// src/components/NeuroShowcase.js
import "../Styles/NeuroShowcase.css";

const NeuroShowcase = () => {
  return (
    <section className="neuro-showcase">
      <div className="neuro-content">
        <h2>🧠 Explore the Brain with Our Neuroscience Kit</h2>
        <p>
          Dive into the world of neurons, circuits, and the human brain! Designed for curious learners (ages 6–18),
          our <strong>Neuroscience STEM Kit</strong> combines interactive learning with real-world experiments to build brainy futures.
        </p>
        <button className="neuro-btn">Discover More</button>
      </div>
      <div className="neuro-image">
        <img
          src="https://cdn.pixabay.com/photo/2016/11/21/14/10/brain-1845946_960_720.png"
          alt="Neuroscience Kit"
        />
      </div>
    </section>
  );
};

export default NeuroShowcase;
