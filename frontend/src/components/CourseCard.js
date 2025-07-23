import { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/shopcontext";
import "../Styles/CourseCard.css";

const CourseCard = ({ title, icon, link }) => {
  const navigate = useNavigate();
  const { user } = useShop();  // ✅ Context access

  const handleClick = () => {
    if (user && user.role === "student") {
      navigate(`/courses/${link}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="course-card" onClick={handleClick}>
      <img src={icon} alt={title} className="course-icon" />
      <h3>{title}</h3>
      <span className="arrow"> ➜</span>
    </div>
  );
};

export default CourseCard;

// import "../tyles/CourseCard.css";

// const CourseCard = ({ title, duration, progress, image }) => {
//   return (
//     <div className="course-card">
//       <img src={image} alt={title} />
//       <h4>{title}</h4>
//       <p>{duration}</p>
//       <div className="progress-bar">
//         <div className="filled" style={{ width: progress }}></div>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;
