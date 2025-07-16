import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // Ensure you have this CSS file


import logo from "../assets/logoskils.png";
import { auth } from "../Utils/axios";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await auth.post("/login", data);
      if (!res.status === 200) {
        alert(resData.error || "Login failed");
        return;
      }

      localStorage.setItem("token", res.data.token); // Store token in localStorage
      alert("Login successful!");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="auth-wrapper"> {/* Wrapper for the whole card */}
      <div className="auth-card">
        <div className="auth-header">
          {/* Logo Section */}
          <img src={logo} alt="Skills Sewa Logo" className="auth-logo" />
          <h1 className="auth-title">SKILLS SEWA</h1>
          <h2 className="auth-subtitle">Login</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
              className="auth-input"
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <div className="password-input-container">
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
                className="auth-input"
              />
              {/* This is a placeholder for the eye icon, you might use an actual icon library like FontAwesome */}
              <span className="password-toggle-icon"></span>
            </div>
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          <div className="forgot-password-link">
            <span onClick={() => navigate("/forgot-password")}>Forgot password?</span>
          </div>

          <button type="submit" className="auth-button">Login</button>
        </form>

        <p className="auth-footer-text">
          Don't have an account? <span className="auth-link" onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;