import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/recipeAPI";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css"; // Reusing the same CSS file

export const SignupForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    const res = await signup(data);
    navigate("/login");
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="login-card card p-4">
        <div className="card-body">
          <div className="welcome-message">
            <h2 className="login-title">Create Your Account</h2>
            <p>Start your recipe journey with us</p>
          </div>

          <form onSubmit={handleSubmit(submitHandler)}>
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
                placeholder="Create a password"
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
              Sign Up
            </button>

            <div className="auth-links">
              <Link to="/login">Already Have An Account? Login</Link>
              <Link to="/">Return to Home</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
