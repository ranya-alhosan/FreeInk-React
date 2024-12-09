import React, { useState, useEffect } from "react";
import apiClient from "../../Api/apiClient.js";

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await apiClient.get(`/comments/${postId}`);
        setComments(response.data.data || []);
      } catch (err) {
        console.error("Failed to load comments:", err);
      }
    };
    fetchComments();
  }, [postId]);

  const addComment = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await apiClient.post("/storecomment", {
        content: newComment,
        post_id: postId,
      });
      if (response.data.success) setComments([...comments, response.data.data]);
    } catch (err) {
      console.error("Error adding comment:", err);
    } finally {
      setNewComment("");
    }
  };

  return (
    <div>
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <strong>{comment.user?.name || "Anonymous"}</strong>: {comment.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={addComment}>Submit</button>
    </div>
  );
}

export default CommentSection;
