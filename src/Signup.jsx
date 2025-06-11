import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Skillogo from "./assets/logoskils.png";
import "./Auth.css";

const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === data.email)) {
      alert("Email already registered!");
      return;
    }

    users.push({ name: data.name, email: data.email, password: data.password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful!");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={Skillogo} alt="Skills Sewa Logo" className="logo" />
        <h2>SKILLS SEWA</h2>
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", { required: "Full name is required" })}
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}

          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 7, message: "Password must be at least 7 characters" }
            })}
            className={errors.password ? "input-error" : ""}
          />
          {errors.password && <span className="error">{errors.password.message}</span>}

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: value => value === password || "Passwords do not match"
            })}
            className={errors.confirmPassword ? "input-error" : ""}
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}

          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <p className="toggle-form">
          Already have an account?{" "}
          <button className="toggle-button" onClick={() => navigate("/login")}>
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
