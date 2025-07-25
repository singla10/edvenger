// src/pages/TermsAndConditions.js

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../Styles/TermsAndConditions.css'; // Optional styling

const TermsAndConditions = () => {
  return (
    <>
      <Navbar />
      <div className="terms-container">
        <h1>Terms and Conditions</h1>
        {/* <p><strong>Effective Date:</strong> [DD/MM/YYYY]</p> */}

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to <strong>[Your Platform Name]</strong>. By accessing or using our platform, services, and content, you agree to comply with these Terms and Conditions. If you disagree with any part, please refrain from using our platform.
          </p>
        </section>

        <section>
          <h2>2. User Accounts</h2>
          <p>
            You must provide accurate, complete registration information and keep your account secure. You are responsible for any activity that occurs under your account.
          </p>
        </section>

      

        <section>
          <h2>3. Intellectual Property</h2>
          <p>
            All content, including text, graphics, videos, and code, is the property of Edvenger and is protected by copyright laws. You may not reproduce, distribute, or modify any content without permission.
          </p>
        </section>

        <section>
          <h2>4. Acceptable Use</h2>
          <ul>
            <li>No unauthorized access, hacking, or scraping</li>
            <li>No posting harmful, offensive, or unlawful content</li>
            <li>No disrupting the learning experience of others</li>
          </ul>
        </section>

        <section>
          <h2>5. Payments and Subscriptions</h2>
          <p>
            Some content may require payment or subscription. All fees are non-refundable unless otherwise specified. By purchasing, you agree to our pricing and refund policy.
          </p>
        </section>

        <section>
          <h2>6. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account if you violate these terms or engage in misuse of the platform.
          </p>
        </section>

        <section>
          <h2>7. Limitation of Liability</h2>
          <p>
            We are not liable for any indirect, incidental, or consequential damages resulting from your use of the platform. While we strive for accuracy, we cannot guarantee all content will always be error-free.
          </p>
        </section>

        <section>
          <h2>8. Third-Party Links</h2>
          <p>
            Our platform may contain links to external websites. We are not responsible for the content or practices of these third parties.
          </p>
        </section>

        <section>
          <h2>9. Modifications</h2>
          <p>
            We may update these Terms and Conditions at any time. Continued use after changes indicates your acceptance.
          </p>
        </section>

        <section>
          <h2>10. Contact Information</h2>
          <p>
            For questions or concerns, contact us at <strong>edvenger@email.com</strong>.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
