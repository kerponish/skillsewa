import React from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer"; 

import Skillogo from "../assets/logoskils.png";
import sk from "../assets/carpenter.webp";
import tk from "../assets/skilledworker.webp";

import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  // Use useInView for each section
  const [heroRef, heroInView] = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.1,    // When 10% of the element is visible
  });

  const [infoRef, infoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [footerRef, footerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="landing-wrapper">
      {/* Hero Section */}
      <section
        className={`hero-section animated-section ${heroInView ? "in-view" : ""}`}
        ref={heroRef}
      >
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
            src={sk}
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
      <section
        className={`info-section animated-section ${infoInView ? "in-view" : ""}`}
        ref={infoRef}
      >
        <h3>🔧 Skill Sewa – Connecting You to Local Experts in Nepal</h3>
        <p>
          Whether it's plumbing, electrical work, appliance repair, or home renovation –
          Skill Sewa is your go-to platform for skilled technical services across Nepal.
        </p>
      </section>

      {/* Services Section */}
      <section
        className={`services-section animated-section ${servicesInView ? "in-view" : ""}`}
        ref={servicesRef}
      >
        <h2>Popular Services</h2>
        <ul className={`service-list ${servicesInView ? "in-view" : ""}`}> {/* Add in-view class here */}
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
      <section
        className={`footer-cta animated-section ${footerInView ? "in-view" : ""}`}
        ref={footerRef}
      >
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