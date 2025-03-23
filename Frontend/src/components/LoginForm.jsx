import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../api/recipeAPI";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await login(data);
      console.log(res.data);
      localStorage.setItem("id", res.data.data._id);
      navigate("/");
    } catch (error) {
      setLoginError(
        error.response?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="login-card card p-4">
        <div className="card-body">
          <div className="welcome-message">
            <h2 className="login-title">Welcome Back!</h2>
            <p>Please sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit(submitHandler)}>
            {/* Add error message display here */}
            {loginError && (
              <div className="alert alert-danger" role="alert">
                {loginError}
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                {...register("email", { required: true })}
                placeholder="Enter your email"
              />
              {errors.email && (
                <div className="custom-invalid-feedback">Email is required</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                {...register("password", { required: true })}
                placeholder="Enter your password"
              />
              {errors.password && (
                <div className="custom-invalid-feedback">
                  Password is required
                </div>
              )}
            </div>

            <button
              type="submit"
              className="submit-btn btn btn-primary w-100 py-2"
            >
              Login
            </button>

            <div className="auth-links">
              <Link to="/signup">Don't Have An Account? Sign Up</Link>
              <Link to="/">Return to Home</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
