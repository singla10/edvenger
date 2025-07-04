// src/pages/student/CourseLevels.js
import { useParams, useNavigate } from 'react-router-dom';
import '../../Styles/CourseLevels.css';

const levelData = {
      grade2_4: [
    {
      title: 'Explorer',
      level: '1',
      grade: '2-4',
      desc: 'Introductory robotics and visual coding to spark early curiosity.',
      duration: '4 weeks'
    },
    {
      title: 'Builder',
      level: '2',
      grade: '2-4',
      desc: 'Arduino simulations and basic app development with MIT App Inventor.',
      duration: '6 weeks'
    },
    {
      title: 'Innovator',
      level: '3',
      grade: '2-4',
      desc: 'Coding, sensors, and simple AI-powered robotics.',
      duration: '8 weeks'
    }
  ],

   grade5_8: [
    {
      title: 'Creators',
      level: '1',
      grade: '5-8',
      desc: 'Text-based coding, real-world sensors, and logic design.',
      duration: '6 weeks'
    },
    {
      title: 'Masterminds',
      level: '2',
      grade: '5-8',
      desc: 'Advanced Arduino, IoT, and building smart automation systems.',
      duration: '8 weeks'
    }
  ],
   grade9_12: [
    {
      title: 'Innovators Pro',
      level: '3',
      grade: '9-12',
      desc: 'AI, ML concepts with Python, robotics + neuroscience integration.',
      duration: '10 weeks'
    },
    {
      title: 'Futurist',
      level: '4',
      grade: '9-12',
      desc: 'Build autonomous robots, voice assistants, brain-signal interfaces.',
      duration: '12 weeks'
    }
  ]

};

const CourseLevels = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="course-levels-page">
      <h2 className="page-title">
        Levels
  // {courseId.toUpperCase()} - Levels
      </h2>

      {Object.entries(levelData).map(([ageGroup, levels]) => (
        <div key={ageGroup} className="age-group-section">
          <h3 className="age-group-heading">
            Age Group: {levels[0]?.grade}
          </h3>
          <div className="level-grid">
            {levels.map((level, idx) => (
              <div key={idx} className="level-card">
                <h4>{level.title}</h4>
                <p>{level.desc}</p>
                <div className="level-meta">
                  <span>Level: {level.level}</span>
                  <span>Duration: {level.duration}</span>
                </div>
                <button className='start-btn'
                  onClick={() =>
                    navigate(`/courses/${courseId}/level/learn?group=${ageGroup}&level=${level.level}`)
                  }
                >
                  Start Learning
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};


export default CourseLevels;
