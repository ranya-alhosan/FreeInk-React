import React, { useState, useEffect } from "react";
import apiClient from "../Api/apiClient";
import { useNavigate } from "react-router-dom";
  import "/public/assets/css/FormProfileEdit.css";



const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    bio: '',
    img: null, // Default for file input
  });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile data for editing
    const fetchProfileData = async () => {
      try {
        const response = await apiClient.get('/profile');
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
      const response = await apiClient.put('/update', userData);
      alert("Profile updated successfully!");
      navigate('/profile');
      setIsModalOpen(false); 
      window.location.href = "http://localhost:5173/profile";
      // Close modal after successful update
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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Button to open the modal */}
      <button onClick={toggleModal} className="edit-profile-btn">Edit Profile</button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
              <button type="submit">Save Changes</button>
            </form>
            {/* Close button */}
            <button onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
