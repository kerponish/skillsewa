import React, { useState } from "react";
import "./Login.css";
import Skillogo from "./assets/logoskils.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Add your login logic (API, Firebase, etc.)
    alert(`Logging in with Email: ${email}`);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={Skillogo} alt="Skills Sewa Logo" className="logo" />
        <h2>SKILLS SEWA</h2>
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
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
          <a href="#" className="forgot-link">
            Forgot password?
          </a>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
