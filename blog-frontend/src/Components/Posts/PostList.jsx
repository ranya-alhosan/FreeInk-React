import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";

function PostList({ posts, user, query }) {
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    if (query) {
      setFilteredPosts(
        posts.filter((post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) || 
          post.content.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredPosts(posts); // إذا كان الاستعلام فارغًا، عرض جميع المنشورات
    }
  }, [query, posts]); // إعادة الفلترة عند تغيير الاستعلام أو المنشورات

  return (
    <div className="post-list">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} user={user} />
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default PostList;
