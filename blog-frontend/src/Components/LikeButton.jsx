import React, { useState } from "react";
import axios from "../api/axios"; // تأكد من أن axios يتم استيراده بشكل صحيح

const LikeButton = ({ postId, initialStatus, onStatusChange }) => {
  const [status, setStatus] = useState(initialStatus || "none");
  const [isLoading, setIsLoading] = useState(false);

  // التعامل مع حالة الإعجاب أو عدم الإعجاب
  const handleLikeDislike = async (newStatus) => {
    if (isLoading) return; // منع النقر أثناء التحميل
    if (status === newStatus) newStatus = "none"; // إذا كانت الحالة نفس الحالة الحالية، قم بإعادة تعيينها إلى none

    try {
      setIsLoading(true);

      const response = await axios.post("/likes", {
        post_id: postId,
        status: newStatus,
      });

      if (response.data.success) {
        setStatus(newStatus); // تحديث الحالة في الواجهة
        if (onStatusChange) onStatusChange(newStatus); // إبلاغ المكون الأب بتغيير الحالة
      }
    } catch (error) {
      console.error("Error updating like status:", error.response?.data || error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="like-button">
      <button
        onClick={() => handleLikeDislike("like")}
        className={status === "like" ? "active btn btn-success" : "btn btn-outline-success"}
        disabled={isLoading}
      >
        👍 Like
      </button>
      <button
        onClick={() => handleLikeDislike("dislike")}
        className={status === "dislike" ? "active btn btn-danger" : "btn btn-outline-danger"}
        disabled={isLoading}
      >
        👎 Dislike
      </button>
    </div>
  );
};

export default LikeButton;
