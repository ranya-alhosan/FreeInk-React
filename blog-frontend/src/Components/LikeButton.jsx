import React from "react";
import { FaHeart } from "react-icons/fa"; // FontAwesome Heart Icon

const LikeButton = ({ post, likes, handleLike, currentUserId }) => {
  const isLikedByUser = likes[post.id] === currentUserId; // تحقق من أن المستخدم الحالي هو من قام بالإعجاب

  return (
    <button
      className="like-button"
      onClick={() => handleLike(post.id)}
      style={{ background: "transparent", border: "none", cursor: "pointer" }}
    >
      <FaHeart
        size={24}
        color={isLikedByUser ? "red" : "gray"} // لون الأيقونة يتغير بناءً على الإعجاب
      />
    </button>
  );
};

export default LikeButton;