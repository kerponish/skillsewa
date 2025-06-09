import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Skillogo from "./assets/logoskils.png";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 🚫 Check if email already exists
    const emailExists = users.some((user) => user.email === data.email);
    if (emailExists) {
      alert("Email already registered!");
      return;
    }

    // ✅ Save new user
    users.push({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful!");

    navigate("/login");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="login-card signup">
        <img src={Skillogo} alt="Skills Sewa Logo" className="logo" />
        <h2>SKILLS SEWA</h2>
        <h3>Sign Up</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", { required: "Full name is required" })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}

          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
          />
          {errors.password && <span className="error">{errors.password.message}</span>}

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match"
            })}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword.message}</span>
          )}

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
