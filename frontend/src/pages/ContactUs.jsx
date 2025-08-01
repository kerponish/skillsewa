import React from "react";
import { FaEnvelope, FaWhatsapp, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "./ContactUs.css";

const ContactUs = () => {
  const handleEmailClick = () => {
    window.open("mailto:krpnspkt@gmail.com", "_blank");
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/9809293778", "_blank");
  };

  return (
    <div className="contact-us-container">
      <div className="contact-header">
        <h2>Contact Us</h2>
        <p>Get in touch with us for any questions or support</p>
      </div>

      <div className="contact-content">
        <div className="contact-info-grid">
          <div className="contact-card email-card" onClick={handleEmailClick}>
            <div className="contact-icon">
              <FaEnvelope />
            </div>
            <div className="contact-details">
              <h3>Email</h3>
              <p>krpnspkt@gmail.com</p>
              <span className="click-hint">Click to send email</span>
            </div>
          </div>

          <div className="contact-card whatsapp-card" onClick={handleWhatsAppClick}>
            <div className="contact-icon">
              <FaWhatsapp />
            </div>
            <div className="contact-details">
              <h3>WhatsApp</h3>
              <p>+977 9809293778</p>
              <span className="click-hint">Click to chat on WhatsApp</span>
            </div>
          </div>

          <div className="contact-card phone-card">
            <div className="contact-icon">
              <FaPhone />
            </div>
            <div className="contact-details">
              <h3>Phone</h3>
              <p>+977 9809293778</p>
              <span className="contact-note">Available during business hours</span>
            </div>
          </div>

          <div className="contact-card location-card">
            <div className="contact-icon">
              <FaMapMarkerAlt />
            </div>
            <div className="contact-details">
              <h3>Location</h3>
              <p>Nepal</p>
              <span className="contact-note">Serving all across Nepal</span>
            </div>
          </div>
        </div>

        <div className="contact-message">
          <h3>We're Here to Help!</h3>
          <p>
            Whether you need help with finding skilled workers, posting a job request, 
            or have any questions about our services, we're just a message away.
          </p>
          <div className="response-time">
            <strong>Response Time:</strong> We typically respond within 2-4 hours during business hours.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs; 