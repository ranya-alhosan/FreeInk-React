import React, { useEffect, useState } from "react";
import axios from "../Api/axios";

const UsersPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editPost, setEditPost] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("userId")); // Get user ID from localStorage
        const response = await axios.get("/posts"); // Fetch all posts from backend
        const userPosts = response.data.data.filter((post) => post.user_id === userId); // Filter posts by user ID
        setPosts(userPosts);
        setLoading(false);
      } catch (err) {
        setError("Failed to load user posts.");
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`/deletepost/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };
 const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("title", editPost.title);
    formData.append("content", editPost.content);
    if (editPost.img instanceof File) {
      formData.append("img", editPost.img);  // Ensure the image is appended correctly
    }

    const response = await axios.put(`/updatepost/${editPost.id}`, formData, {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data"  // Explicitly set the content type to multipart
      },
    });

    console.log(response.data); 

    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === editPost.id ? { ...post, ...editPost } : post))
    );

    setEditPost(null);
    alert("Post updated successfully!");
  } catch (err) {
    console.error(err); // Log any errors
    alert("Failed to update the post.");
  }
};


  const handleEdit = (post) => {
    setEditPost(post);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-posts">
      <h2>Your Posts</h2>
      {posts.length === 0 ? (
        <p>You haven't created any posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {post.img && <img src={post.img} alt={post.title} />}
            <p>
              <strong>Likes:</strong> {post.likes_count} | <strong>Dislikes:</strong> {post.dislikes_count}
            </p>
            <button onClick={() => handleEdit(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        ))
      )}

      {editPost && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Post</h2>
            <form onSubmit={handleUpdate}>
              <label>
                Title:
                <input
                  type="text"
                  value={editPost.title}
                  onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                />
              </label>
              <label>
                Content:
                <textarea
                  value={editPost.content}
                  onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
                />
              </label>
              <label>
                Upload Image:
                <input
                  type="file"
                  onChange={(e) => setEditPost({ ...editPost, img: e.target.files[0] })}
                />
              </label>
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditPost(null)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPosts;
