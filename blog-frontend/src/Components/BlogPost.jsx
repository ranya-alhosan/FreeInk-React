import React, { useState, useEffect } from "react";
import Head from "./Head";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Swal from 'sweetalert2';
import LikeButtonGroup from './LikeButton';
import apiClient from "../Api/apiClient.js";
import "/public/assets/css/Post.css";


import NewPost from "./NewPost";

function BlogPost() {
    // User state from localStorage
    const [user, setUser] = useState({
        id: localStorage.getItem('userId'),
        name: localStorage.getItem('userName'),
        email: localStorage.getItem('userEmail'),
        img: localStorage.getItem('userImg'),
        bio: localStorage.getItem('userBio')
    });

    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState({});
    const [likes, setLikes] = useState({});
    const [favorites, setFavorites] = useState({});
    const [likeCounts, setLikeCounts] = useState({});
    const [loading, setLoading] = useState(true);

    // Search and Filter States
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories] = useState([
        "Health & Sport",
        "Romance & Relationships",
        "Food & Recipes",
        "Travel & Adventure",
        "Education & Learning",
        "Politics & Current Affairs",
        "Art & Creativity",
        "History & Culture",
    ]);

    // Filtered Posts
    const filteredPosts = posts.filter((post) => {
        const isCategoryMatch = selectedCategory ? post.category?.name === selectedCategory : true;
        const isSearchMatch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase()) || post.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) || post.title.toLowerCase().includes(searchQuery.toLowerCase());

        return isCategoryMatch && isSearchMatch;
    });

    // Filter by search query
    if (searchQuery) {
        const lowercaseQuery = searchQuery.toLowerCase();
        const filteredBySearchQuery = filteredPosts.filter(post =>
            post.title.toLowerCase().includes(lowercaseQuery) ||
            post.content.toLowerCase().includes(lowercaseQuery) ||
            post.user?.name.toLowerCase().includes(lowercaseQuery)
        );

        // Now filteredBySearchQuery contains only the posts that match the search query
        // You can use this filtered result as needed
    }


    // Fetch Comments for a Post
    const fetchComments = async (postId) => {
        try {
            const response = await apiClient.get(`/comments/${postId}`);
            if (response.data.success) {
                setComments((prev) => ({
                    ...prev,
                    [postId]: response.data.data
                }));
            }
        } catch (err) {
            setError("Failed to load comments.");
        }
    };

    // Filter Posts by Category
    const filterPostsByCategory = (category) => {
        setSelectedCategory(category);
    };

    // Show All Posts
    const showAllPosts = () => {
        setSelectedCategory("");
        setSearchQuery("");
    };

    // Render method for comments
    const renderComments = (postId) => {
        if (!comments[postId] || comments[postId].length === 0) {
            return <p className="text-muted mt-2">No comments yet.</p>;
        }

        return (
            <div className="mt-3">
                {comments[postId].map((comment) => (
                    <div
                        key={comment.id}
                        className="d-flex align-items-start mb-3"
                    >
                        {/* Comment User Avatar */}
                        <img
                            src={comment.user?.img || '/default-avatar.png'}
                            alt={comment.user?.name}
                            className="rounded-circle mr-3"
                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />

                        {/* Comment Content */}
                        <div className="flex-grow-1">
                            <div className="card">
                                <div className="card-body py-2 px-3">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <h6 className="mb-0 text-primary">
                                            {comment.user?.name || 'Anonymous'}
                                        </h6>
                                        <small className="text-muted">
                                            {new Date(comment.created_at).toLocaleString()}
                                        </small>
                                    </div>
                                    <p className="mb-0">{comment.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get("/posts");

                if (response.data && response.data.success && response.data.data) {
                    const postsData = response.data.data;

                    // Retrieve persisted states from localStorage
                    const savedFavorites = JSON.parse(localStorage.getItem('postFavorites') || '{}');

                    const likesData = {};
                    const favoriteData = {};
                    const likeCountData = {};

                    postsData.forEach(post => {
                        // Ensure 'none' is the default like status
                        likesData[post.id] = post.like_status || 'none';
                        favoriteData[post.id] = savedFavorites[post.id] || post.favorite_status || '0';
                        likeCountData[post.id] = post.likes_count || 0;
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
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Like Post Handler
    const handleLikeDislike = async (action, postId) => {
        try {
            const newStatus =
                action === "like"
                    ? (likes[postId] === "like" ? "none" : "like")
                    : (likes[postId] === "dislike" ? "none" : "dislike");

            const response = await apiClient.post("/likes", { post_id: postId, status: newStatus });

            if (response.data.success) {
                setLikes((prevLikes) => ({
                    ...prevLikes,
                    [postId]: newStatus
                }));

                // Update like counts if needed
                setLikeCounts((prevCounts) => ({
                    ...prevCounts,
                    [postId]: newStatus === "like"
                        ? prevCounts[postId] + 1
                        : newStatus === "dislike" && likes[postId] === "like"
                            ? prevCounts[postId] - 1
                            : prevCounts[postId],
                }));
            }
        } catch (err) {
            console.error("Error updating like/dislike status:", err);
        }
    };


    // Delete Post Handler
    const handleDeletePost = async (postId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await apiClient.delete(`/deletepost/${postId}`);
                    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

                    Swal.fire(
                        'Deleted!',
                        'Your post has been deleted.',
                        'success'
                    );
                } catch (error) {
                    console.error("Error deleting post:", error.response || error.message);
                    Swal.fire(
                        'Error!',
                        'Failed to delete post.',
                        'error'
                    );
                }
            }
        });
    };

    // Favorite Post Handler
    const handleFavorite = async (postId) => {
        try {
            const currentStatus = favorites[postId] === "1" ? "0" : "1";

            const token = localStorage.getItem('token');
            if (!token) {
                alert("Token is missing.");
                return;
            }

            const response = await apiClient.post("http://127.0.0.1:8000/api/favorites", {
                post_id: postId,
                status: currentStatus,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.data.success) {
                const updatedFavorites = {
                    ...favorites,
                    [postId]: currentStatus
                };

                setFavorites(updatedFavorites);
            } else {
                alert('Error: Unable to update favorite status.');
            }

        } catch (err) {
            if (err.response) {
                console.error("Error response data:", err.response.data);
                alert(`Error: ${err.response.data.message || 'An error occurred while updating the favorite status.'}`);
            } else if (err.request) {
                console.error("No response received:", err.request);
                alert("Error: No response received from the server.");
            } else {
                console.error("Error message:", err.message);
                alert(`Error: ${err.message}`);
            }
        }
    };

    // Add Comment Handler
    const handleAddComment = async (postId) => {
        if (!newComment[postId] || newComment[postId].trim() === '') {
            alert("Comment cannot be empty");
            return;
        }

        try {
            const response = await apiClient.post("/storecomment", {
                content: newComment[postId],
                post_id: postId
            });

            if (response.data.success) {
                setNewComment((prev) => ({ ...prev, [postId]: "" }));
                fetchComments(postId);
            }
        } catch (err) {
            console.error("Error adding comment:", err);
            alert("Failed to add comment");
        }
    };

    // Render Loading State
    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head />
            <NavBar />
            <NewPost />
            <div className="container ">
                <div className="row">
                    <div className="col-md-8 offset-md-2 mt-4">


                        {/* Search Bar */}
                        <div className="input-group mb-4 shadow-sm rounded">
                            <input
                                type="text"
                                className="form-control border-0 py-2 px-3"
                                style={{
                                    borderTopLeftRadius: "0.5rem",
                                    borderBottomLeftRadius: "0.5rem",
                                    boxShadow: "none",
                                }}
                                placeholder="Search posts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-danger px-4"
                                    style={{
                                        borderTopRightRadius: "0.5rem",
                                        borderBottomRightRadius: "0.5rem",
                                    }}
                                    type="button"
                                    onClick={showAllPosts}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>


                        {/* Category Filter */}

                        <div className="mb-4">
                            <div
                                className="border p-3 rounded bg-light shadow-sm"
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "10px",
                                    alignItems: "center",
                                }}
                            >
                                <button
                                    type="button"
                                    className={`btn btn-${selectedCategory === '' ? 'primary' : 'outline-primary'} px-4 py-2`}
                                    style={{ borderRadius: "20px" }}
                                    onClick={showAllPosts}
                                >
                                    All Categories
                                </button>
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        type="button"
                                        className={`btn btn-${selectedCategory === category ? 'primary' : 'outline-primary'} px-4 py-2`}
                                        style={{ borderRadius: "20px" }}
                                        onClick={() => filterPostsByCategory(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>


                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

                        {filteredPosts.length === 0 ? (
                            <div className="alert alert-info">No posts available</div>
                        ) : (
                            filteredPosts.map((post) => (
                                <div key={post.id} className="card mb-4 shadow-sm">
                                    {/* Post Header */}
                                    <div className="card-header d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={'http://localhost:8000/storage/users/' + post.user?.img || 'http://localhost:8000/storage/users/default-profile.png'}
                                                alt={post.user?.name}
                                                className="rounded-circle mr-3"
                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                            />
                                            <span className="font-weight-bold">{post.user?.name || 'Unknown User'}</span>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <small className="text-muted mr-3">{new Date(post.created_at).toLocaleDateString()}</small>
                                            {user.id == post.user_id && (
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDeletePost(post.id)}
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Post Image */}
                                    <img
                                        src={post.img}
                                        alt={post.title}
                                        className="card-img-top"
                                        style={{ maxHeight: '400px', objectFit: 'cover' }}
                                    />

                                    {/* Post Content */}
                                    <div className="card-body">
                                        <h5 className="card-title">{post.title}</h5>
                                        <p className="card-text">{post.content}</p>
                                        <p className="text-muted">Category: {post.category?.name || 'Uncategorized'}</p>

                                        {/* Comments Section */}
                                        <div className="mt-4">
                                            {/* Render Existing Comments */}
                                            <div className="comments-container">
                                                {comments[post.id] && comments[post.id].length > 0 ? (
                                                    comments[post.id].map((comment, index) => (
                                                        <div key={index} className="mb-3 p-3 bg-light rounded shadow-sm">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <strong>{comment.user?.name || "Anonymous"}</strong>
                                                                <small className="text-muted">{new Date(comment.created_at).toLocaleString()}</small>
                                                            </div>
                                                            <p className="mb-0 mt-2">{comment.content}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-muted text-center py-3">
                                                        No comments yet. Be the first to comment!
                                                    </div>
                                                )}
                                            </div>

                                            {/* New Comment Input */}
                                            <div className="input-group mt-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Add a comment..."
                                                    value={newComment[post.id] || ""}
                                                    onChange={(e) =>
                                                        setNewComment((prev) => ({ ...prev, [post.id]: e.target.value }))
                                                    }
                                                />
                                                <div className="input-group-append">
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => handleAddComment(post.id)}
                                                        disabled={!newComment[post.id]?.trim()}
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>


                                        {/* Like Button Group */}
                                        <LikeButtonGroup
                                            postId={post.id}
                                            initialStatus={likes[post.id]?.status || "none"} // Pass initial status from the backend
                                            handleUpdate={(postId, status) => {
                                                // Optional: Update likes state in parent component
                                                setLikes((prev) => ({
                                                    ...prev,
                                                    [postId]: { ...prev[postId], status },
                                                }));
                                            }}
                                        />
                                    </div>
                                </div>
                            ))
                        )}

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default BlogPost;