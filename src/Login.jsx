import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Skillogo from "./assets/logoskils.png";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    alert(`Logging in with Email: ${data.email}`);
    navigate("/dashboard");
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={Skillogo} alt="Skills Sewa Logo" className="logo" />
        <h2>SKILLS SEWA</h2>
        <h3>Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <span className="error">{errors.password.message}</span>}

          <a href="#" className="forgot-link">Forgot password?</a>
          <button type="submit">Login</button>
        </form>

        <p className="toggle-form">
          New user?{" "}
          <button className="toggle-button" onClick={goToSignup}>
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
