import React from "react";

const LikeButtonGroup = ({ postId, status, handleLikeDislike, isDisabled }) => {
    return (
        <div className="like-button-group">
            <button
                disabled={isDisabled}
                onClick={() => handleLikeDislike("like", postId)}
                className={`btn ${
                    status === "like" ? "btn-success active" : "btn-outline-success"
                }`}
            >
                👍 Like
            </button>
            <button
                disabled={isDisabled}
                onClick={() => handleLikeDislike("dislike", postId)}
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
