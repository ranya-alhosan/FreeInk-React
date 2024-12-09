import React, { useState, useEffect } from "react";
import apiClient from "../../Api/apiClient";

function CommentSection({ postId, userId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await apiClient.get(`/comments/${postId}`);
        if (response.data.success) {
          setComments(response.data.data || []);
        } else {
          console.error(response.data.message);
        }
      } catch (err) {
        console.error("Error fetching comments:", err);
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
      if (response.data.success) {
        setComments([...comments, response.data.data]);
        setNewComment(""); // Reset input
      }
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const response = await apiClient.delete(`/comments/${commentId}`);
      if (response.data.success) {
        setComments(comments.filter(comment => comment.id !== commentId));
      } else {
        console.error(response.data.message);
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const handleEdit = async (commentId) => {
    try {
      const response = await apiClient.put(`/comments/${commentId}`, {
        content: editContent,
      });
      if (response.data.success) {
        setComments(
          comments.map((comment) =>
            comment.id === commentId ? { ...comment, content: editContent } : comment
          )
        );
        setIsEditing(null); // Close edit mode
        setEditContent("");
      }
    } catch (err) {
      console.error("Error editing comment:", err);
    }
  };

  return (
    <div>
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="d-flex justify-content-between">
              <strong>{comment.user?.name || "Anonymous"}</strong>

              {/* تحقق إذا كانت userId و comment.user.id متطابقين */}
              {comment.user?.id === userId && (
                <>
                  <button
                    onClick={() => {
                      setIsEditing(comment.id);
                      setEditContent(comment.content);
                    }}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>

            {/* عرض المحتوى بناءً على حالة التحرير */}
            {isEditing === comment.id ? (
              <div>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button
                  onClick={() => handleEdit(comment.id)}
                  className="btn btn-success btn-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(null)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <p>{comment.content}</p>
            )}
          </div>
        ))}
      </div>
      
      {/* Comment input box */}
      <div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={addComment}>Submit</button>
      </div>
    </div>
  );
}

export default CommentSection;
