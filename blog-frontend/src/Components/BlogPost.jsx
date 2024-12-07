import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "./Head";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "/public/assets/css/Post.css";

import LikeButton from "./LikeButton";

function BlogPost() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState({});
    const [likes, setLikes] = useState({}); // Holds like statuses for each post

    // Fetch posts on component mount
    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("You must be logged in to view posts.");
                return;
            }

            try {
                const response = await axios.get("http://localhost:8000/api/posts", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data && response.data.success && response.data.data) {
                    setPosts(response.data.data);
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

    // Fetch comments for a specific post
    const fetchComments = async (postId) => {
        try {
            const token = localStorage.getItem("token"); // احصل على التوكن من localStorage
            if (!token) {
                console.error("Token not found.");
                return;
            }
    
            const response = await axios.get(`http://localhost:8000/api/comments/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // أضف التوكن إلى رأسات الطلب
                },
            });
    
            if (response.data.success) {
                setComments((prev) => ({ ...prev, [postId]: response.data.data }));
            } else {
                console.error("Error fetching comments:", response.data.message);
            }
        } catch (err) {
            console.error("Error fetching comments:", err);
            setError("Failed to load comments. Please try again later.");
        }
        
    };
    
    
    

    // Handle adding a new comment
    const handleAddComment = async (postId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to comment.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8000/api/storecomment",
                { content: newComment[postId], post_id: postId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                setNewComment((prev) => ({ ...prev, [postId]: "" }));
                fetchComments(postId); // Refresh comments
            }
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };

    // Handle like/unlike a post
    const handleLike = async (postId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to like posts.");
            return;
        }

        try {
            const currentStatus = likes[postId] === "like" ? "none" : "like"; // Toggle status
            const response = await axios.post(
                "http://localhost:8000/api/likes",
                { post_id: postId, status: "like" },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                setLikes((prev) => ({
                    ...prev,
                    [postId]: currentStatus,
                }));
            }
        } catch (err) {
            console.error("Error updating like status:", err);
        }
    };
    const handleDisLike = async (postId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to dislike posts.");
            return;
        }

        try {
            const currentStatus = likes[postId] === "dislike" ? "none" : "dislike"; // Toggle status
            const response = await axios.post(
                "http://localhost:8000/api/likes",
                { post_id: postId, status: "dislike" },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                setLikes((prev) => ({
                    ...prev,
                    [postId]: currentStatus,
                }));
            }
        } catch (err) {
            console.error("Error updating like status:", err);
        }
    };

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
                                    src={`http://localhost:8000/storage/${post.img}`}
                                    alt={post.title}
                                    className="img-fluid"
                                />
                                <p>Posted by: {post.user.name}</p>
                                <p>Category: {post.category.name}</p>

                                {/* Like Button */}
                                <button 
                                    className={`like-button ${likes[post.id] === "like" ? "liked" : ""}`}
                                    onClick={() => handleLike(post.id)}
                                >
                                    {likes[post.id] === "like" ? "Unlike" : "Like"}
                                </button>

                                 {/* dislikebutton  */}
                                 
                                 <button 
                                    className={`dislike-button ${likes[post.id] === "dislike" ? "disliked" : ""}`}
                                    onClick={() => handleDisLike(post.id)}
                                >
                                    {likes[post.id] === "dislike" ? "Undislike" : "dislike"}
                                </button>
                                 



                                

                                {/* Comments Section */}
                                <button onClick={() => fetchComments(post.id)}>Load Comments</button>
                                    {comments[post.id] && comments[post.id].length > 0 ? (
                                        <div>
                                            {comments[post.id].map((comment) => (
                                                <div key={comment.id} className="comment">
                                                    <p>{comment.content}</p>
                                                    <p>
                                                        <small>By: {comment.user.name}</small>
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>No comments yet.</p>
                                    )}
                                

                                {/* Add Comment Section */}
                                <div className="add-comment">
                                    <textarea
                                        placeholder="Add a comment..."
                                        value={newComment[post.id] || ""}
                                        onChange={(e) =>
                                            setNewComment((prev) => ({
                                                ...prev,
                                                [post.id]: e.target.value,
                                            }))
                                        }
                                    ></textarea>
                                    <button onClick={() => handleAddComment(post.id)}>
                                        Submit Comment
                                    </button>
                                </div>
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
