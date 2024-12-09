import React, { useState, useEffect } from "react";
import Head from "../Head.jsx";
import NavBar from "../NavBar.jsx";
import Footer from "../Footer.jsx";
import NewPost from "../NewPost.jsx";
import SearchBar from "./SearchBar.jsx";
import CategoryFilter from "./CategoryFilter.jsx";
import PostList from "./PostList.jsx";
import apiClient from "../../Api/apiClient.js";
import "/public/assets/css/Post.css";

function BlogPost() {
  // الحالة الرئيسية
  const [user, setUser] = useState({
    id: localStorage.getItem("userId"),
    name: localStorage.getItem("userName"),
    email: localStorage.getItem("userEmail"),
    img: localStorage.getItem("userImg"),
    bio: localStorage.getItem("userBio"),
  });

  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/posts");
        if (response.data?.success) {
          const postsWithStatus = response.data.data.map((post) => {
            // جلب الحالة المخزنة في localStorage أو استخدام الحالة القادمة من API
            const localStatus = localStorage.getItem(`post_${post.id}_status`);
            return {
              ...post,
              status: localStatus || post.status || "none", // إعطاء الأولوية للحالة المحلية
            };
          });
          setPosts(postsWithStatus);
        } else {
          setError("No posts found.");
        }
      } catch (err) {
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleLikeDislike = async (action, postId) => {
    try {
      const response = await apiClient.post(`/likes`, {
        post_id: postId,
        status: action,
      });

      if (response.data.success) {
        console.log(response.data.message);

        // تحديث الحالة في الواجهة
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, status: response.data.status } : post
          )
        );

        // تخزين الحالة في localStorage
        localStorage.setItem(`post_${postId}_status`, response.data.status);
      } else {
        console.error("Failed to update post status.");
      }
    } catch (error) {
      console.error("Error updating like/dislike:", error);
    }
  };

  // تصفية المنشورات حسب الفئة وكلمة البحث
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory ? post.category?.name === selectedCategory : true;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Head />
      <NavBar />
      <NewPost />
      <div className="container">
        <SearchBar query={searchQuery} setQuery={setSearchQuery} />
        <CategoryFilter
          categories={[
            "Health & Sport",
            "Romance & Relationships",
            "Food & Recipes",
            "Travel & Adventure",
            "Education & Learning",
            "Politics & Current Affairs",
            "Art & Creativity",
            "History & Culture",
          ]}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {loading ? <div>Loading...</div> : <PostList posts={filteredPosts} user={user} />}
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
      <Footer />
    </>
  );
}

export default BlogPost;
