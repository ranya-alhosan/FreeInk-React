import React, { useState, useEffect } from "react";
import axios from "../Api/axios";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import "/public/assets/css/profile.css";
import Head from "./Head";
import NavBar from "./NavBar";

const Profile = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const response = await axios.get("/profile");
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Fetch posts after profile data is fetched
  const fetchPosts = async () => {
    try {
      const response = await axios.get("/posts");
      const userPosts = response.data.data.filter(
        (post) => post.user_id === user.id
      );
      setPosts(userPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (user.id) fetchPosts();
    setLoading(false);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
  };

  const handleSavePost = async () => {
    try {
      const response = await axios.put(`/posts/updatepost/${editingPost.id}`, {
        title: editingPost.title,
        content: editingPost.content,
      });
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === editingPost.id ? { ...editingPost } : post
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
        const response = await axios.delete(`/posts/deletepost/${postId}`);
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } catch (error) {
        console.error("Error deleting post:", error.response || error.message);
      }
    }
  };

  const handleFavorite = async (postId) => {
    try {
      const response = await axios.post("/favorites", {
        post_id: postId,
        status: 1, // Mark as favorite
      });
      console.log(response.data.message);
    } catch (error) {
      console.error("Error adding to favorites:", error.response || error.message);
    }
  };

  const handleUnfavorite = async (postId) => {
    try {
      const response = await axios.post("/favorites", {
        post_id: postId,
        status: 0, // Unmark as favorite
      });
      console.log(response.data.message);
    } catch (error) {
      console.error("Error removing from favorites:", error.response || error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head />
      <NavBar />
      <div className="profile-container">
        <div className="profile-header">
          <img src={user.img} alt={user.name} className="profile-image" />
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
          <button onClick={() => navigate("/edit-profile")}>Edit Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="profile-posts">
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
                        setEditingPost({
                          ...editingPost,
                          title: e.target.value,
                        })
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
                    <button onClick={() => handleFavorite(post.id)}>Favorite</button>
                    <button onClick={() => handleUnfavorite(post.id)}>Unfavorite</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;