import React from "react";
import { useNavigate } from "react-router-dom";
import Skillogo from "./assets/logoskils.png";
import logo from "./assets/teamwork.png";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate(); // initialize it

  const handleClick = () => {
    navigate("/login"); // navigate to login page
  };

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
        <button className="" onClick={handleClick}>
          LET’S GO
        </button>
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
