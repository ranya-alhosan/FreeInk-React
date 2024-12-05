import React, { useState } from "react";
import axios from "../Api/axios"; // Import Axios instance
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
      const response = await axios.post("/register", formData);

      // Log the response to check if it's successful
      console.log("Signup response:", response.data);

      // If the response indicates success (status true), navigate to login page or home
      if (response.data.status) {
        alert(response.data.message); // Alert the success message
        navigate("/"); // Redirect to login page
      } else {
        // If signup failed, show error message and stay on signup page
        setError(response.data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      // Catch any unexpected errors and display them
      console.error("Signup error:", err);
      setError("An unexpected error occurred. Please try again.");
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
        </div>
      </div>
    </>
  );
};

export default Signup;
