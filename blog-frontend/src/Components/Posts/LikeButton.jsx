import React from "react";

const LikeButtonGroup = ({ postId, status, handleLikeDislike, isDisabled }) => {
  return (
    <div className="like-button-group">
      <button
        disabled={isDisabled}
        onClick={() => handleLikeDislike("like")} // Action is "like"
        className={`btn ${
          status === "like" ? "btn-success active" : "btn-outline-success"
        }`}
      >
        👍 Like
      </button>
      <button
        disabled={isDisabled}
        onClick={() => handleLikeDislike("dislike")} // Action is "dislike"
        className={`btn ${
          status === "dislike" ? "btn-danger active" : "btn-outline-danger"
        }`}
      >
        👎 Dislike
      </button>
    </div>
  );
};

export default LikeButtonGroup;
