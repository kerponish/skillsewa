import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Skillogo from "./assets/logoskils.png";
import "./Auth.css";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(user => user.email === data.email && user.password === data.password);

    if (matchedUser) {
      alert(`Welcome back, ${matchedUser.name}!`);
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid email or password!");
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
