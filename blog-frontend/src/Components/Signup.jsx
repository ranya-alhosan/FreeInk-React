import React, { useState } from "react";
import apiClient from "../Api/apiClient"; // Import apiClient instance
import { useNavigate } from "react-router-dom";
import "/public/assets/css/Login.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState(null); // For displaying error messages
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending signup request to the backend (register endpoint)
      const response = await apiClient.post("/register", formData);

      console.log("Signup response:", response.data);

      if (response.data.status) {
        setError(null); // Clear error if successful
        navigate("/login"); // Redirect to login page
      } else {
        const backendErrors = response.data.error;
        if (typeof backendErrors === "string") {
          setError(backendErrors.split(" (")[0]); // Show only text before "("
        } else if (typeof backendErrors === "object") {
          const firstError = Object.values(backendErrors).flat()[0];
          setError(firstError.split(" (")[0]); // Show only text before "("
        } else {
          setError("An unknown error occurred. Please try again.");
        }
      }
    } catch (err) {
      console.error("Signup error:", err.response);

      const backendErrors = err.response?.data?.error;
      if (typeof backendErrors === "string") {
        setError(backendErrors.split(" (")[0]); // Show only text before "("
      } else if (typeof backendErrors === "object") {
        const firstError = Object.values(backendErrors).flat()[0];
        setError(firstError.split(" (")[0]); // Show only text before "("
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="background-container" /> {/* Background with blur effect */}
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Create an Account</h2>
          <p className="login-subtitle">
            Sign up to start your blogging adventure with FreeInk
          </p>
          {error && <div className="login-error">{error}</div>} {/* Error message */}
          <form onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="login-input"
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="login-input"
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="login-input"
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="password_confirmation"
                className="login-input"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="login-button">
              Register
            </button>
          </form>

          {/* Back to Login Option */}
          <div className="back-to-login-container">
            <p>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="back-to-login-link"
              >
                Log in here
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
