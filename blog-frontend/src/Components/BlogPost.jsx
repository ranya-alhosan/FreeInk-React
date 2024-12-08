import React, { useState, useEffect } from "react";
import axios from "../api/axios";  // Import the axios instance from your axios.js file
import Head from "./Head";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Swal from 'sweetalert2';
import "/public/assets/css/Post.css";

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
        post.content.toLowerCase().includes(searchQuery.toLowerCase())||post.user?.name.toLowerCase().includes(searchQuery.toLowerCase())||post.title.toLowerCase().includes(searchQuery.toLowerCase());    

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
            const response = await axios.get(`/comments/${postId}`);
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
                            style={{width: '40px', height: '40px', objectFit: 'cover'}}
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
                const response = await axios.get("/posts");
                
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
    const handleLike = async (postId) => {
        try {
            const currentStatus = 
                likes[postId] === 'none' ? 'like' : 
                likes[postId] === 'like' ? 'none' : 
                'like';

            const response = await axios.post("/likes", { 
                post_id: postId, 
                status: currentStatus 
            });

            if (response.data.success) {
                const updatedLikes = {
                    ...likes,
                    [postId]: currentStatus
                };

                setLikes(updatedLikes);
                setLikeCounts(
               updatedLikes
            );
            }
        } catch (err) {
            console.error("Error updating like status:", err);
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
                    await axios.delete(`/deletepost/${postId}`);
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
    
            const response = await axios.post("http://127.0.0.1:8000/api/favorites", {
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
            const response = await axios.post("/storecomment", { 
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
            <div className="container ">
                <div className="row">
                    <div className="col-md-8 offset-md-2 mt-4">
                     
                        
                        {/* Search Bar */}
                        <div className="input-group mb-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Search posts..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="input-group-append">
                                <button 
                                    className="btn btn-outline-secondary" 
                                    type="button" 
                                    onClick={showAllPosts}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="mb-3">
                            <div className="btn-group flex-wrap" role="group">
                                <button 
                                    type="button" 
                                    className={`btn btn-${selectedCategory === '' ? 'primary' : 'outline-primary'}`}
                                    onClick={showAllPosts}
                                >
                                    All Categories
                                </button>
                                {categories.map((category) => (
                                    <button 
                                        key={category} 
                                        type="button" 
                                        className={`btn btn-${selectedCategory === category ? 'primary' : 'outline-primary'}`}
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
                                                src={post.user?.img || '/default-avatar.png'} 
                                                alt={post.user?.name} 
                                                className="rounded-circle mr-3" 
                                                style={{width: '50px', height: '50px', objectFit: 'cover'}}
                                            />
                                            <span className="font-weight-bold">
                                                {post.user?.name || 'Unknown User'}
                                            </span>
                                        </div>
                                        <div className="d-flex align-items-center ">
                                            <small className="text-muted mr-3">
                                                {new Date(post.created_at).toLocaleDateString()}
                                            </small>
                                            {/* Delete Button (Only for post owner) */}
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
                                        style={{maxHeight: '400px', objectFit: 'cover'}}
                                    />

                                    {/* Post Content */}
                                    <div className="card-body">
                                        <h5 className="card-title">{post.title}</h5>
                                        <p className="card-text">{post.content}</p>
                                        <p className="text-muted">Category: {post.category?.name || 'Uncategorized'}</p>
                                        
                                        {/* Post Actions */}
                                        <div className="d-flex justify-content-between">
                                            <button 
                                                className={`btn btn-${likes[post.id] === 'like' ? 'primary' : 'outline-primary'}`} 
                                                onClick={() => handleLike(post.id)}
                                            >
                                                <i className="fas fa-thumbs-up"></i> 
                                                {likeCounts[post.id]} 
                                            </button>
                                            <button 
                                                className={`btn btn-${favorites[post.id] === '1' ? 'warning' : 'outline-warning'}`} 
                                                onClick={() => handleFavorite(post.id)}
                                            >
                                                <i className="fas fa-star"></i> 
                                                {favorites[post.id] === '1' ? 'Unfavorite' : 'Favorite'}
                                            </button>
                                            </div>
                                    </div>

                                      
                                        {/* Comments Section */}
                                        <div className="mt-3">
                                            <button 
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => fetchComments(post.id)}
                                            >
                                                Load Comments
                                            </button>

                                            {/* Render Comments */}
                                            {renderComments(post.id)}

                                            {/* Add Comment Section */}
                                            <div className="mt-3">
                                                <textarea
                                                    className="form-control mb-2"
                                                    placeholder="Add a comment..."
                                                    value={newComment[post.id] || ""}
                                                    onChange={(e) =>
                                                        setNewComment((prev) => ({
                                                            ...prev,
                                                            [post.id]: e.target.value,
                                                        }))
                                                    }
                                                ></textarea>
                                                <button 
                                                    className="btn btn-primary"
                                                    onClick={() => handleAddComment(post.id)}
                                                >
                                                    Submit Comment
                                                </button>
                                            </div>
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