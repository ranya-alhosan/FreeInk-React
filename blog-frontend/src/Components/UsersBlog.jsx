import React, { useState, useEffect } from 'react';
import apiClient from "../Api/apiClient"; // Import apiClient instance
import { Navbar } from 'react-bootstrap';
import Head from './Head';
import NavBar from './NavBar';
import Footer from './Footer'

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState({
    title: '',
    content: '',
    category_id: '',
    img: null, // This is fine because it's not bound to an input field
  });
  const [loading, setLoading] = useState(false);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/posts');
        const userId = JSON.parse(localStorage.getItem('userId')); // Assumes user ID is stored in localStorage
        const userPosts = response.data.data.filter((post) => post.user_id === userId);
        setPosts(userPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Handle delete post
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await apiClient.delete(`/deletepost/${id}`);
        setPosts(posts.filter((post) => post.id !== id));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  // Handle save edits
  const handleSave = async (id) => {
    try {
      const formData = new FormData();

      if (editPost.title) formData.append('title', editPost.title);
      if (editPost.content) formData.append('content', editPost.content);
      if (editPost.category_id) formData.append('category_id', editPost.category_id);
      //if (editPost.img instanceof File) formData.append('img', editPost.img); // Ensure img is a File object

      console.log('FormData Entries:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await apiClient.put(`/updatepost/${id}`, formData);

      const updatedPost = response.data.data;
      console.log('Updated Post:', updatedPost);

      // Update posts state
      setPosts(posts.map((post) => (post.id === id ? updatedPost : post)));
      setEditPost(null); // Clear edit state
    } catch (error) {
      console.error('Error updating post:', error.response?.data || error);
    }
  };


  return (
    <div>

      <h1>Your Posts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post">
            {editPost && editPost.id === post.id ? (
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  value={editPost.title || ''} // Ensure it uses editPost values
                  onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                />
                <textarea
                  placeholder="Content"
                  value={editPost.content || ''} // Ensure it uses editPost values
                  onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Category ID"
                  value={editPost.category_id || ''} // Ensure it uses editPost values
                  onChange={(e) => setEditPost({ ...editPost, category_id: e.target.value })}
                />
                {/* <input
                  type="file"
                  onChange={(e) => setEditPost({ ...editPost, img: e.target.files[0] })}
                /> */}

                <button onClick={() => handleSave(post.id)}>Save</button>
                <button onClick={() => setEditPost(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <img src={post.img} alt="Post" style={{ width: '100px' }} />
                <p>Category: {post.category_id}</p>
                <button onClick={() => setEditPost({ ...post })}>Edit</button>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>You have no posts.</p>
      )}
    </div>
  );
};

export default UserPosts;