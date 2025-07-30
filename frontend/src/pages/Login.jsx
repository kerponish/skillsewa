import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // Ensure you have this CSS file


import logo from "../assets/logoskils.png";
import { auth } from "../Utils/axios";
import { useUser } from "../UserContext";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const onSubmit = async (data) => {
    try {
      // Prepare login data based on login type
      const loginData = isAdminLogin 
        ? { username: data.username, password: data.password }
        : { email: data.email, password: data.password };

      console.log('Sending login data:', loginData);

      const res = await auth.post("/login", loginData);
      console.log('Login response:', res.data);
      
      if (res.status !== 200) {
        alert(res.data.error || "Login failed");
        return;
      }
      // Store user info in context
      setUser({ 
        userId: res.data.userId, 
        username: res.data.username,
        token: res.data.token,
        role: res.data.role
      });
      // Optionally, store token in localStorage for auth headers
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      
      // Redirect based on role
      if (res.data.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        console.error('Error response:', err.response.data);
        alert(err.response.data.error || "Login failed");
      } else {
        alert("Something went wrong.");
      }
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
          {/* Login Type Toggle */}
          <div className="login-type-toggle">
            <button 
              type="button"
              className={`toggle-btn ${!isAdminLogin ? 'active' : ''}`}
              onClick={() => setIsAdminLogin(false)}
            >
              Client Login
            </button>
            <button 
              type="button"
              className={`toggle-btn ${isAdminLogin ? 'active' : ''}`}
              onClick={() => setIsAdminLogin(true)}
            >
              Admin Login
            </button>
          </div>

          {isAdminLogin ? (
            <div className="form-group">
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                placeholder="Username"
                className="auth-input"
              />
              {errors.username && <p className="error-message">{errors.username.message}</p>}
            </div>
          ) : (
            <div className="form-group">
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                className="auth-input"
              />
              {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>
          )}

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