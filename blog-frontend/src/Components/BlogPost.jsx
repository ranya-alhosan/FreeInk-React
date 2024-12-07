import React, { useState, useEffect } from "react";
import axios from "../Api/axios";
import Head from "./Head";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "/public/assets/css/Post.css";

function BlogPost() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState({});
    const [likes, setLikes] = useState({});
    const [favorites, setFavorites] = useState({});
    const [likeCounts, setLikeCounts] = useState({});

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("/posts");

                if (response.data && response.data.success && response.data.data) {
                    const postsData = response.data.data;

                    // Fetch like and favorite statuses for each post
                    const likesData = {};
                    const favoriteData = {};
                    const likeCountData = {};

                    postsData.forEach(post => {
                        likesData[post.id] = post.like_status;
                        favoriteData[post.id] = post.favorite_status;
                        likeCountData[post.id] = post.likes_count;
                    });

                    setLikes(likesData);
                    setFavorites(favoriteData);
                    setLikeCounts(likeCountData);
                    setPosts(postsData);
                } else {
                    setError("No posts found.");
                }
            } catch (err) {
                setError("Failed to load posts. Please try again.");
            }
        };

        fetchPosts();
    }, []);

    const fetchComments = async (postId) => {
        try {
            const response = await axios.get(`/comments/${postId}`);

            if (response.data.success) {
                setComments((prev) => ({ ...prev, [postId]: response.data.data }));
            }
        } catch (err) {
            setError("Failed to load comments. Please try again later.");
        }
    };

    const handleFavorite = async (postId) => {
        try {
            const currentStatus = favorites[postId] === "1" ? "0" : "1";
            const response = await axios.post("/favorites", { post_id: postId, status: currentStatus });

            if (response.data.success) {
                setFavorites((prev) => ({
                    ...prev,
                    [postId]: currentStatus,
                }));
            }
        } catch (err) {
            console.error("Error updating favorite status:", err);
        }
    };

    const handleAddComment = async (postId) => {
        try {
            const response = await axios.post("/storecomment", { content: newComment[postId], post_id: postId });

            if (response.data.success) {
                setNewComment((prev) => ({ ...prev, [postId]: "" }));
                fetchComments(postId);
            }
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };

    const handleLike = async (postId) => {
        try {
            const currentStatus = likes[postId] === "like" ? "none" : "like";
            const response = await axios.post("/likes", { post_id: postId, status: currentStatus });

            if (response.data.success) {
                setLikes((prev) => ({
                    ...prev,
                    [postId]: currentStatus,
                }));

                setLikeCounts((prev) => ({
                    ...prev,
                    [postId]: prev[postId] + (currentStatus === "like" ? 1 : currentStatus === "none" ? -1 : 0),
                }));
            }
        } catch (err) {
            console.error("Error updating like status:", err);
        }
    };

    const handleDisLike = async (postId) => {
        try {
            const currentStatus = likes[postId] === "dislike" ? "none" : "dislike";
            const response = await axios.post("/likes", { post_id: postId, status: "dislike" });

            if (response.data.success) {
                setLikes((prev) => ({
                    ...prev,
                    [postId]: currentStatus,
                }));

                setLikeCounts((prev) => ({
                    ...prev,
                    [postId]: response.data.data.likes_count,
                }));
            }
        } catch (err) {
            console.error("Error updating dislike status:", err);
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
                                <p>Posted by: {post.user ? post.user.name : "Unknown"}</p>
                                <h3>{post.title}</h3>
                                <img
                                    src={post.img}
                                    alt={post.title}
                                    className="img-fluid"
                                />
                                <p>{post.content}</p>
                                <p>Category: {post.category ? post.category.name : "Uncategorized"}</p>

                                {/* Like Button */}
                                <button
                                    className={`like-button ${likes[post.id] === "like" ? "liked" : ""}`}
                                    onClick={() => handleLike(post.id)}
                                >
                                    Like
                                </button>

                                {/* Dislike button */}
                                <button
                                    className={`dislike-button ${likes[post.id] === "dislike" ? "disliked" : ""}`}
                                    onClick={() => handleDisLike(post.id)}
                                >
                                    Dislike
                                </button>

                                {/* Favorite Button */}
                                <button 
                                    className={`favorite-button ${favorites[post.id] === "1" ? "favorited" : ""}`}
                                    onClick={() => handleFavorite(post.id)}
                                >
                                    Favorite
                                </button>

                                {/* Like Count */}
                                <p>Likes: {likeCounts[post.id] || 0}</p>

                                {/* Comments Section */}
                                <button onClick={() => fetchComments(post.id)}>Load Comments</button>
                                {comments[post.id] && comments[post.id].length > 0 ? (
                                    <div>
                                        {comments[post.id].map((comment) => (
                                            <div key={comment.id} className="comment">
                                                <p>{comment.content}</p>
                                                <p>
                                                    <small>By: {comment.user ? comment.user.name : "Anonymous"}</small>
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
                                    <button onClick={() => handleAddComment(post.id)}>Submit Comment</button>
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
