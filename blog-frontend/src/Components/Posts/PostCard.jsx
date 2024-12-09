
import React, { useState, useEffect } from "react";
import apiClient from "../../Api/apiClient";
import CommentSection from "./CommentSection";
import LikeButtonGroup from "./LikeButton";
import "/public/assets/css/Post.css";

function PostCard({ post, user, handleLikeDislike, setPosts }) {
  const [status, setStatus] = useState(post.status);
  const [commentsVisible, setCommentsVisible] = useState(false);

  const handleButtonClick = async (action) => {
    try {
      const newStatus = await handleLikeDislike(action, post.id);
      if (newStatus) {
        setStatus(newStatus);
        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id === post.id ? { ...p, status: newStatus } : p
          )
        );
      }
    } catch (error) {
      console.error("Failed to update like/dislike:", error);
    }
  };

  useEffect(() => {
    setStatus(post.status);
  }, [post.status]);

  // Toggle comments visibility
  const toggleComments = () => {
    setCommentsVisible(!commentsVisible);
  };

  const handleDeletePost = async () => {
    try {
      const response = await apiClient.delete(`/posts/${post.id}`);
      if (response.data.success) {
        alert("Post deleted successfully.");
        // Handle UI updates after delete
      }
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };


  return (
    <div className="card mb-4 shadow-sm border-light rounded">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <strong>{post.user?.name || "Unknown User"}</strong>
        </div>
        {user.id === post.user_id && (
          <div className="btn-group">
            <button
              onClick={handleDeletePost}
              className="btn btn-danger btn-sm"
              title="Delete Post"
            >
              <i className="bi bi-trash"></i> Delete
            </button>
            <button className="btn btn-warning btn-sm" title="Edit Post">
              <i className="bi bi-pencil-square"></i> Edit
            </button>
          </div>
        )}
      </div>
      <img
        src={post.img}
        alt={post.title}
        className="card-img-top rounded-3"
        style={{ height: "250px", objectFit: "cover" }}
      />
      <div className="card-body">

        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.content}</p>

        <button
          onClick={toggleComments}
          className="btn btn-info btn-sm mb-3"
        >
          {commentsVisible ? "Hide Comments" : "Load Comments"}
        </button>

        {commentsVisible && (
          <div className="comments-section">
            <CommentSection postId={post.id} userId={user.id} />
          </div>
        )}

        <div className="like-buttons mt-3">
          <LikeButtonGroup
            postId={post.id}
            status={status}
            handleLikeDislike={handleButtonClick}
            isDisabled={false}
          />
        </div>

      </div>
    </div>
  );
}

export default PostCard;
