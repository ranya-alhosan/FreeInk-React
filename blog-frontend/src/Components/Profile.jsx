import React, { useState, useEffect } from "react";
import axios from "../Api/axios";
import "/public/assets/css/profile.css";

const Profile = () => {
  const [user, setUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile details
        const profileResponse = await axios.get("/profile");
        setUser(profileResponse.data.data);

        // Fetch user's posts
        const postsResponse = await axios.get("/posts");
        setPosts(
          postsResponse.data.data.filter(
            (post) => post.user_id === profileResponse.data.data.id
          )
        );

        // Fetch favorites
        const favoritesResponse = await axios.get("/favorites");
        setFavorites(favoritesResponse.data.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditProfile = async () => {
    try {
      const response = await axios.post("/profile", user);
      setUser(response.data.data);
      setEditingProfile(false);
    } catch (error) {
      console.error("Error updating profile:", error.response || error.message);
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
  };

  const handleSavePost = async () => {
    if (!editingPost) return;

    try {
      const response = await axios.put(`/posts/${editingPost.id}`, editingPost);
      const updatedPost = response.data?.data || response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === editingPost.id ? { ...updatedPost } : post
        )
      );
      setEditingPost(null);
    } catch (error) {
      console.error("Error updating post:", error.response || error.message);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`/posts/${postId}`);
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      {/* User Profile Section */}
      <div className="profile-header">
        <img src={user.img} alt={user.name} className="profile-image" />
        {editingProfile ? (
          <div>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <textarea
              value={user.bio}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
            />
            <button onClick={handleEditProfile}>Save</button>
            <button onClick={() => setEditingProfile(false)}>Cancel</button>
          </div>
        ) : (
          <>
            <h2>{user.name}</h2>
            <p>{user.bio}</p>
            <button onClick={() => setEditingProfile(true)}>Edit Profile</button>
          </>
        )}
      </div>

      {/* Favorite Blogs Section */}
      <div className="favorites">
        <h3>Your Favorite Blogs</h3>
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite.id}>
              <h4>{favorite.post.title}</h4>
              <p>{favorite.post.content}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* User's Posts Section */}
      <div className="user-posts">
        <h3>Your Posts</h3>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              {editingPost && editingPost.id === post.id ? (
                <div>
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, title: e.target.value })
                    }
                  />
                  <textarea
                    value={editingPost.content}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        content: e.target.value,
                      })
                    }
                  />
                  <button onClick={handleSavePost}>Save</button>
                  <button onClick={() => setEditingPost(null)}>Cancel</button>
                </div>
              ) : (
                <>
                  <h4>{post.title}</h4>
                  <p>{post.content}</p>
                  <button onClick={() => handleEditPost(post)}>Edit</button>
                  <button onClick={() => handleDeletePost(post.id)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
