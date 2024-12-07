import React, { useState, useEffect } from "react";
import axios from "../Api/axios"; 
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null); // User data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    password: "",
    password_confirmation: "",
    img: null,
  });
  const [error, setError] = useState(null); // Error message
  const [message, setMessage] = useState(null); // Success message
  const navigate = useNavigate();

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.status) {
          setUser(response.data.data);
          setFormData({
            name: response.data.data.name,
            email: response.data.data.email,
            bio: response.data.data.bio || "",
            password: "",
            password_confirmation: "",
            img: null,
          });
        } else {
          setError(response.data.message || "Failed to fetch profile.");
        }
      } catch (err) {
        setError("An unexpected error occurred.");
      }
    };

    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img") {
      setFormData({ ...formData, img: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          formDataObj.append(key, formData[key]);
        }
      });

      const response = await axios.put("/update", formDataObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status) {
        setMessage(response.data.message);
        setUser(response.data.data); // Update the user data
      } else {
        setError(response.data.message || "Failed to update profile.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}
      <div className="profile-info">
        <img
          src={
            user.img
              ? `${process.env.REACT_APP_BACKEND_URL}/storage/${user.img}`
              : "/public/assets/images/default-profile.png"
          }
          alt="Profile"
          className="profile-picture"
        />
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Profile Picture</label>
            <input type="file" name="img" onChange={handleChange} />
          </div>
          <button type="submit" className="btn-update">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
