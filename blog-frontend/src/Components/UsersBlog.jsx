import React, { useState, useEffect } from 'react';
import axios from "../Api/axios"; // Import Axios instance
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
        const response = await axios.get('/posts');
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
        await axios.delete(`/deletepost/${id}`);
        setPosts(posts.filter((post) => post.id !== id));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  // Handle save edits
  const handleSave = async (id) => {
    try {
      console.log(id);
      const formData = new FormData();
      if (editPost.title) formData.append('title', editPost.title);
      if (editPost.content) formData.append('content', editPost.content);
      if (editPost.category_id) formData.append('category_id', editPost.category_id);
      if (editPost.img) formData.append('img', editPost.img);
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }
    
      const response = await axios.put(`/updatepost/${id}`, formData);
      const updatedPost = response.data.data;
      console.log(updatedPost);

      setPosts(posts.map((post) => (post.id === id ? updatedPost : post)));
      setEditPost(null);
    } catch (error) {
      
      console.error('Error updating post:', error);
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
                  defaultValue={post.title}
                  onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                />
               <textarea
               value={editPost.content || ''} // Ensure it's always a string
                onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
               />
                <input
                  type="number"
                  placeholder="Category ID"
                  defaultValue={post.category_id}
                  onChange={(e) => setEditPost({ ...editPost, category_id: e.target.value })}
                />
                <input
                  type="file"
                  onChange={(e) => setEditPost({ ...editPost, img: e.target.files[0] })}
                />
                <button onClick={() => handleSave(post.id)}>Save</button>
                <button onClick={() => setEditPost(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <img src={post.img} alt="Post" style={{ width: '100px' }} />
                <p>Category: {post.category_id}</p>
                <button onClick={() => setEditPost(post)}>Edit</button>
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