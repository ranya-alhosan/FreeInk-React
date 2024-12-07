import React, { useState, useEffect } from 'react';
import axios from '../api/axios'; // Make sure the axios instance is imported correctly

function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    img: '',
  });
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the user's profile on component mount
    axios
      .get('/profile')
      .then((response) => {
        setProfile(response.data.data);
        setPreviewImage(`http://127.0.0.1:8000/storage/${response.data.data.img}`);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch profile data');
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prevProfile) => ({ ...prevProfile, img: file }));
      setPreviewImage(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('email', profile.email);
    formData.append('bio', profile.bio); // Ensure bio is appended to formData
    if (profile.img instanceof File) {
      formData.append('img', profile.img);
    }
  
    axios
      .put('/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        alert('Profile updated successfully!');
        setProfile(response.data.data);
        setPreviewImage(`http://127.0.0.1:8000/storage/${response.data.data.img}`);
      })
      .catch((err) => {
        alert('Error updating profile');
        console.error(err);
      });
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container" style={{ marginTop: '20px' }}>
      <h1 className="text-center">Profile</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="text-center">
              <img
                src={previewImage || 'https://via.placeholder.com/150'}
                alt="Profile"
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'block', marginTop: '10px' }}
              />
            </div>
            <div className="form-group mt-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mt-3">
              <label>Bio</label>
              <textarea
                className="form-control"
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mt-3 text-center">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
