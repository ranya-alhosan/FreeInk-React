import React, { useState, useEffect } from "react";
import CommentSection from "./CommentSection";
import LikeButtonGroup from "./LikeButton";

function PostCard({ post, user, handleLikeDislike, setPosts }) {
  const [status, setStatus] = useState(post.status); // تزامن مبدئي مع الحالة القادمة من props

  const handleButtonClick = async (action) => {
    try {
      const newStatus = await handleLikeDislike(action, post.id);
      if (newStatus) {
        setStatus(newStatus); // تحديث الحالة محليًا

        // تحديث المنشورات في PostList
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
    setStatus(post.status); // تحديث الحالة عند تغيير حالة المنشور
  }, [post.status]);

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header d-flex justify-content-between">
        <div>{post.user?.name || "Unknown User"}</div>
        {user.id === post.user_id && (
          <button className="btn btn-danger btn-sm">Delete</button>
        )}
      </div>
      <img src={post.img} alt={post.title} className="card-img-top" />
      <div className="card-body">
        <h5>{post.title}</h5>
        <p>{post.content}</p>
        <CommentSection postId={post.id} />
        <LikeButtonGroup
          postId={post.id}
          status={status} // الحالة المحلية
          handleLikeDislike={handleButtonClick} // تفاعل الأزرار
          isDisabled={false}
        />
      </div>
    </div>
  );
}

export default PostCard;
