import React from "react";
import { useNavigate } from "react-router-dom";
import Skillogo from "./assets/logoskils.png";
import sk from "./assets/plumber.png";
import tk from "./assets/image.png"
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="landing-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <div className="branding">
            <img src={Skillogo} alt="Skills Sewa Logo" className="skills-logo" />
            <h1>Skills Sewa</h1>
          </div>
          <h2>
            Start your <br /> journey with us
          </h2>
          <p className="tagline">तपाईंको सीप आवश्यक हातमा</p>
          <button className="cta-button" onClick={handleClick}>
            LET’S GO
          </button>
        </div>

        <div className="hero-image">
          <img
            src={sk}  /* Replace with your first image URL */
            alt="Illustration of plumber and electrician working together"
            className="teamwork-image"
            loading="lazy"
          />
          <img
            src={tk}
            alt="Another skilled worker"
            className="teamwork-image"
            loading="lazy"
          />
        </div>
      </section>

      {/* Info Section */}
      <section className="info-section">
        <h3>🔧 Skill Sewa – Connecting You to Local Experts in Nepal</h3>
        <p>
          Whether it's plumbing, electrical work, appliance repair, or home renovation –
          Skill Sewa is your go-to platform for skilled technical services across Nepal.
        </p>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2>Popular Services</h2>
        <ul className="service-list">
          <li>🛠 Plumbing & Sanitation</li>
          <li>💡 Electrical Installation & Repair</li>
          <li>🪚 Carpentry & Furniture Works</li>
          <li>🎨 Painting & Home Renovation</li>
          <li>❄️ Appliance Maintenance</li>
          <li>🖥️ Computer & Mobile Repair</li>
          <li>⚙️ Welding & Metal Works</li>
        </ul>
      </section>

      {/* Footer Call to Action */}
      <section className="footer-cta">
        <h2>Support Local Skills, Empower Communities</h2>
        <p>
          Join Skill Sewa and become part of a growing network of skilled workers and happy clients across Nepal.
        </p>
        <button className="cta-button" onClick={handleClick}>
          Get Started
        </button>
      </section>
    </div>
  );
}
