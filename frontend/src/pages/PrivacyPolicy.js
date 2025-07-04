// src/pages/PrivacyPolicy.js

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../Styles/PrivacyPolicy.css'; // Optional: Create styling for the policy page

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="privacy-policy-container">
        <h1>Privacy Policy</h1>
        {/* <p><strong>Effective Date:</strong> [DD/MM/YYYY]</p> */}

        <section>
          <h2>1. Information We Collect</h2>
          <p><strong>a. Personal Information:</strong> We may collect your name, email, phone, DOB, and payment details when you register or enroll.</p>
          <p><strong>b. Technical Data:</strong> Includes IP address, browser type, device info, and session activity.</p>
          <p><strong>c. Learning Activity:</strong> We track course progress, quiz attempts, and content interactions.</p>
        </section>

        <section>
          <h2>2. How We Use Your Data</h2>
          <ul>
            <li>Create and manage accounts</li>
            <li>Enhance learning experience</li>
            <li>Send updates and marketing (opt-in only)</li>
            <li>Meet legal obligations</li>
          </ul>
        </section>

        <section>
          <h2>3. Sharing Your Information</h2>
          <p>We do <strong>not</strong> sell your data. We may share it with:</p>
          <ul>
            <li>Trusted service providers (like hosting, payments)</li>
            <li>Teachers/mentors for education purposes</li>
            <li>Authorities if legally required</li>
          </ul>
        </section>

        <section>
          <h2>4. Cookies and Tracking</h2>
          <p>We use cookies for login sessions, site analytics, and user experience improvements. You may disable cookies via your browser settings.</p>
        </section>

        <section>
          <h2>5. Data Security</h2>
          <p>Your data is protected using encryption, firewalls, and secure access controls. However, no method is 100% secure.</p>
        </section>

        <section>
          <h2>6. Children’s Privacy</h2>
          <p>Our platform is built for students aged 6-18. For children under 13, parental consent is required.</p>
        </section>

        <section>
          <h2>7. Your Rights</h2>
          <p>You may request to:</p>
          <ul>
            <li>Access, correct, or delete your data</li>
            <li>Withdraw consent</li>
            <li>Opt out of marketing</li>
          </ul>
          <p>Contact us at <strong>edvenger@email.com</strong>.</p>
        </section>

        <section>
          <h2>8. Third-Party Links</h2>
          <p>We are not responsible for privacy practices of third-party websites linked on our platform.</p>
        </section>

        <section>
          <h2>9. Updates to Policy</h2>
          <p>We may update this policy. The latest version will be posted here with the effective date.</p>
        </section>

       
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
