import React, { useState, useEffect } from "react";
import axios from "../Api/axios"; // Ensure this is the correct axios instance
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    bio: '',
    img: null,
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false); // Toggle between view and edit
  const navigate = useNavigate();

  // Fetch the user profile data
  useEffect(() => {
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

    // Create FormData to handle file uploads (image)
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("bio", userData.bio);

    // If there is a file selected, append it to the FormData
    if (userData.img) {
      formData.append("img", userData.img);
    }

    try {

      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('email', userData.email);
      formData.append('bio', userData.bio);
      if (userData.img) formData.append('img', userData.img);

      const response = await axios.put('/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("Profile updated successfully!");
      setEditing(false); // Switch back to view mode
    } catch (error) {
      alert("Failed to update profile.");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      // Handle file input
      setUserData({
        ...userData,
        [name]: files[0], // Set the first file selected
      });
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    setUserData({
      ...userData,
      img: e.target.files[0],
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h3>User Profile</h3>

      {editing ? (
        <div className="edit-profile-container">
          <h3>Edit Profile</h3>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Bio</label>
              <textarea
                name="bio"
                value={userData.bio}
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label>Profile Image</label>
              <input
                type="file"
                name="img"
                onChange={handleFileChange}
              />
            </div>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div className="profile-display-container">
          <h4>{userData.name}</h4>
          <p>{userData.email}</p>
          <p>{userData.bio}</p>
          {userData.img && <img src={userData.img} alt="Profile" />}
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};
<<<<<<< HEAD
export default EditProfile;
=======
export default ProfilePage
>>>>>>> f55c142c4e92c5f110e5f9682d3a77a7bb2c0258
