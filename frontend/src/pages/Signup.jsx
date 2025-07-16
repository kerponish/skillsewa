import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // Ensure you have this CSS file

import logo from "../assets/logoskils.png"; // Adjust path if necessary

const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const password = watch("password"); // Watch password field for confirmation validation

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const resData = await res.json();
      if (!res.ok) {
        alert(resData.error || "Signup failed");
        return;
      }

      alert("Signup successful! Please log in."); // More informative message
      navigate("/login"); // Redirect to login page after successful signup
    } catch (err) {
      alert("Something went wrong.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <img src={logo} alt="Skills Sewa Logo" className="auth-logo" />
          <h1 className="auth-title">SKILLS SEWA</h1>
          <h2 className="auth-subtitle">Sign Up</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">

          {/* Username Field */}
          <div className="form-group">
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              placeholder="Username"
              className="auth-input"
            />
            {errors.username && <p className="error-message">{errors.username.message}</p>}
          </div>

          {/* First Name and Last Name on the same line */}
          <div className="name-group">
            <div className="form-group name-input-wrapper">
              <input
                {...register("firstname", { required: "First name is required" })}
                placeholder="First Name"
                className="auth-input"
              />
              {errors.firstname && <p className="error-message">{errors.firstname.message}</p>}
            </div>

            <div className="form-group name-input-wrapper">
              <input
                {...register("secondname", { required: "Last name is required" })}
                placeholder="Last Name"
                className="auth-input"
              />
              {errors.secondname && <p className="error-message">{errors.secondname.message}</p>}
            </div>
          </div>

          <div className="form-group">
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address"
                }
              })}
              placeholder="Email"
              className="auth-input"
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          {/* Password and Confirm Password on the same line */}
          <div className="name-group">
            <div className="form-group name-input-wrapper">
              <div className="password-input-container">
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 7, message: "Password must be at least 7 characters" }
                  })}
                  placeholder="Password"
                  className="auth-input"
                />
                <span className="password-toggle-icon"></span>
              </div>
              {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>

            <div className="form-group name-input-wrapper">
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: value => value === password || "Passwords do not match"
                })}
                placeholder="Confirm Password"
                className="auth-input"
              />
              {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dob" className="sr-only">Date of Birth</label>
            <input
              type="date"
              id="dob"
              {...register("dob", { required: "Date of birth is required" })}
              className="auth-input"
              title="Date of Birth"
            />
            {errors.dob && <p className="error-message">{errors.dob.message}</p>}
          </div>

          <button type="submit" className="auth-button">Register</button>
        </form>

        <p className="auth-footer-text">
          Already have an account? <span className="auth-link" onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;