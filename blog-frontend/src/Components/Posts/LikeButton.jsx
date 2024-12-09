import React from "react";

const LikeButtonGroup = ({ postId, status, handleLikeDislike, isDisabled }) => {
  return (
    <div className="like-button-group d-flex justify-content-start gap-2">
      <button
        disabled={isDisabled}
        onClick={() => handleLikeDislike("like", postId)} // Action is "like"
        className={`btn ${status === "like" ? "btn-success active" : "btn-outline-success"}`}
        style={{ fontSize: "1.1rem", padding: "8px 15px", borderRadius: "20px" }}
      >
        <i className="bi bi-hand-thumbs-up"></i> Like
      </button>
      <button
        disabled={isDisabled}
        onClick={() => handleLikeDislike("dislike", postId)} // Action is "dislike"
        className={`btn ${status === "dislike" ? "btn-danger active" : "btn-outline-danger"}`}
        style={{ fontSize: "1.1rem", padding: "8px 15px", borderRadius: "20px" }}
      >
        <i className="bi bi-hand-thumbs-down"></i> Dislike
      </button>
    </div>
  );
};

export default LikeButtonGroup;
