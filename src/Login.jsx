import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Skillogo from "./assets/logoskils.png";
import "./Auth.css";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      });

      const resData = await response.json();

      if (!response.ok) {
        alert(resData.error || "Login failed!");
        return;
      }

      // Save token and user info
      localStorage.setItem("token", resData.token);
      localStorage.setItem("user", JSON.stringify(resData.user));
      localStorage.setItem("isLoggedIn", "true");

      alert(`Welcome back, ${resData.user.name}!`);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Something went wrong during login.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={Skillogo} alt="Skills Sewa Logo" className="logo" />
        <h2>SKILLS SEWA</h2>
        <h3>Login</h3>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            {...register("password", { required: "Password is required" })}
            className={errors.password ? "input-error" : ""}
          />
          {errors.password && <span className="error">{errors.password.message}</span>}

          <button type="submit" className="auth-button">Login</button>
        </form>
        <p className="toggle-form">
          New user?{" "}
          <button className="toggle-button" onClick={() => navigate("/signup")}>
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
