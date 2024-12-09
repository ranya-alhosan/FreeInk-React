import React, { useState, useEffect } from "react";
import apiClient from "../../Api/apiClient";
import PostCard from "./PostCard";

function PostList({ posts, user }) {
  const [localPosts, setPosts] = useState(posts);

  const handleLikeDislike = async (action, postId) => {
    try {
      const response = await apiClient.post(`/likes`, {
        post_id: postId,
        status: action,
      });

      if (response.data.success) {
        console.log(response.data.message);

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, status: response.data.status } : post
          )
        );

        localStorage.setItem(`post_${postId}_status`, response.data.status);
      } else {
        console.error("Failed to update post status.");
      }
    } catch (error) {
      console.error("Error updating like/dislike:", error);
    }
  };

  return (
    <div className="post-list">
      {localPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          user={user}
          handleLikeDislike={handleLikeDislike}
          setPosts={setPosts}
        />
      ))}
    </div>
  );
}

export default PostList;
