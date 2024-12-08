import React, { useState, useEffect } from "react";
import axios from "../Api/axios";
import UsersPosts from "./UsersBlog";
import "/public/assets/css/profile.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '', bio: '', img: null });

  useEffect(() => {
    axios.get('/profile')
      .then((response) => {
        setUser(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch profile data");
        setLoading(false);
      });
  }, []);

  const handleEditClick = () => {
    setFormData({
      name: user.name,
      email: user.email,
      bio: user.bio,
      password: '',
      password_confirmation: ''
    });
    setShowEditModal(true);
  };

  const handleCloseModal = () => setShowEditModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => setFormData((prev) => ({ ...prev, img: e.target.files[0] }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));
    console.log(formDataToSend)
    axios.put('/update', formDataToSend)
      .then((response) => {
        setUser(response.data.data);
        setShowEditModal(false);
      })
      .catch(() => setError("Failed to update profile data"));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-page">
      <h2>User Profile</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Bio:</strong> {user.bio}</p>
        <button onClick={handleEditClick}>Edit Profile</button>
      </div>

      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </label>
              <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
              </label>
              <label>
                Confirm Password:
                <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} />
              </label>
              <label>
                Bio:
                <textarea name="bio" value={formData.bio} onChange={handleChange} />
              </label>
              <label>
                Upload Image:
                <input type="file" name="img" onChange={handleFileChange} />
              </label>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={handleCloseModal}>Close</button>
            </form>
          </div>
        </div>
      )}

      <UsersPosts />
    </div>
  );
};

export default ProfilePage;
