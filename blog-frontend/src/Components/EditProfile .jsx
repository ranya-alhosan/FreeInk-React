import React, { useState, useEffect } from "react";
import axios from "../Api/axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile data for editing
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('/profile');
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchProfileData();
    setLoading(false);
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put('/update', userData);
      alert("Profile updated successfully!");
      navigate('/profile');
    } catch (error) {
      alert("Failed to update profile.");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-profile-container">
      <h3>Edit Profile</h3>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={userData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={userData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Bio</label>
          <textarea name="bio" value={userData.bio} onChange={handleChange}></textarea>
        </div>
        <div>
          <label>Profile Image</label>
          <input type="file" name="img" onChange={handleChange} />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;