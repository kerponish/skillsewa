import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import "./Login.css";
import Skillogo from "./assets/logoskils.png";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate(); // ✅ initialize navigate

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // TODO: Add your signup logic
    alert(`Signing up user: ${name} with Email: ${email}`);
  };

  const goToLogin = () => {
    navigate("/login"); // ✅ navigate to login page
  };

  return (
    <div className="login-container">
      <div className="login-card signup">
        <img src={Skillogo} alt="Skills Sewa Logo" className="logo" />
        <h2>SKILLS SEWA</h2>
        <h3>Sign Up</h3>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p className="toggle-form">
          Already have an account?{" "}
          <button className="toggle-button" onClick={goToLogin}>
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
