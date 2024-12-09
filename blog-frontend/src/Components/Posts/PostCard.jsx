import React from "react";

function PostCard({ post, user }) {
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
      </div>
    </div>
  );
}

export default PostCard;
