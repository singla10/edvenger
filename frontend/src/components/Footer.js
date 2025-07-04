import { Link } from 'react-router-dom';
import '../Styles/Footer.css'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-container">
        <div className="footer-column brand">
          <h2>EdVengers</h2>
          <p>Prepare your child for the future with our Innovative STEM Program.</p>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <ul>
            <li>About</li>
            <li>Labs</li>
            <li>Contact</li>
            <li>Blogs</li>
            <li>Careers</li>
            <li>Shipping Policy</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
               <li><Link className="foot-links" to="/resources">Resources</Link></li>
               <li><Link className="foot-links" to="/refund-policy">Refund Policy</Link></li>
               <li><Link className="foot-links"to="/terms">Terms and Conditions</Link></li>
               <li><Link className="foot-links"to="/policy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contact Info</h3>
          <ul>
            <li><FaMapMarkerAlt /> 123 STEM Lane, Innovation City, India</li>
            <li><FaPhone /> +91-9876543210</li>
            <li><FaEnvelope /> support@stemlearn.com</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 STEM Learn. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
