import React from "react";
import Skillogo from "./assets/logoskils.png";
import logo from "./assets/teamwork.png";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-container">
      {/* Left Side */}
      <div className="">
        <div className="landing-title">
          <img src={Skillogo} alt="Skills Sewa Logo" className="skills-logo" />
          <h1 className="">Skills Sewa</h1>
        </div>
        <h2 className="">
          Start your <br /> journey with us
        </h2>
        <p className="text-lg mb-6">तपाईंको सीप आवश्यक हातमा</p>
        <button className="">LET’S GO</button>
      </div>

      {/* Right Side */}
      <div className="image-container">
        <img
          src={logo}
          alt="Illustration of plumber and electrician working together"
          className="teamwork-image"
          loading="lazy"
        />
      </div>
    </div>
  );
}
