import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "./Head";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "/public/assets/css/Post.css";

function BlogPost() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    
    // Fetch posts on component mount
    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem("token"); // Get the token from localStorage
            
            if (!token) {
                setError("You must be logged in to view posts.");
                return;
            }

            try {
                const response = await axios.get("http://localhost:8000/api/posts", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add token to request headers
                    }
                });

                console.log("Response Data:", response.data); // Log the full response

                // Check if the response contains the 'data' field
                if (response.data && response.data.success && response.data.data) {
                    setPosts(response.data.data); // Set posts from 'data'
                } else {
                    setError("No posts found.");
                }
            } catch (err) {
                console.error("Error fetching posts:", err);
                setError("Failed to load posts. Please try again.");
            }
        };

        fetchPosts();
    }, []);

    return (
        <>
            <Head />
            <NavBar />
            <div className="container mt-5">
                <h2>All Posts</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {posts.length === 0 ? (
                    <p>No posts available</p>
                ) : (
                    <div>
                        {posts.map((post) => (
                            <div key={post.id} className="post-item">
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                                
                                <img
  src={`http://localhost:8000/storage/posts/${post.img}}`}
  alt={post.title}
  className="img-fluid"
/>


                                {/* Optionally display the user and category */}
                                <p>Posted by: {post.user.name}</p>
                                <p>Category: {post.category.name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default BlogPost;
