import React, { useState } from "react";
import axios from "axios";

function NewPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [img, setImg] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showModal, setShowModal] = useState(false);

    const categories = [
        { id: 1, name: "Health & Sport" },
        { id: 2, name: "Romance & Relationships" },
        { id: 3, name: "Food & Recipes" },
        { id: 4, name: "Travel & Adventure" },
        { id: 5, name: "Education & Learning" },
        { id: 6, name: "Politics & Current Affairs" },
        { id: 7, name: "Art & Creativity" },
        { id: 8, name: "History & Culture" },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!title.trim()) {
            setError("Title is required.");
            return;
        }
        if (!content.trim()) {
            setError("Content is required.");
            return;
        }
        if (!categoryId) {
            setError("Please select a category.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setError("You must be logged in to add a post.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        
        if (img) {
            formData.append("img", img);
        }
        formData.append("category_id", categoryId);

        try {
            const response = await axios.post(
                "http://localhost:8000/api/storepost",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSuccess("Post added successfully!");
            setTitle("");
            setContent("");
            setImg(null);
            setCategoryId("");
            setShowModal(false);

            // إعادة التوجيه إلى صفحة blogPost
            window.location.href = "http://localhost:5173/blogPost";
        } catch (error) {
            console.error("Error adding post:", error);
            setError(
                error.response?.data?.message || "An error occurred. Please try again."
            );
        }
    };

    return (
        <>
            <div className="container py-5">
                <button
                    className="btn btn-primary rounded-pill"
                    onClick={() => setShowModal(true)}
                >
                    Add New Post
                </button>

                {showModal && (
                    <div className="modal show d-block" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add New Post</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    {success && (
                                        <div className="alert alert-success">{success}</div>
                                    )}
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="Enter your post title"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Content</label>
                                            <textarea
                                                className="form-control"
                                                rows="4"
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                                placeholder="Write your post content here"
                                            ></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Image</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                onChange={(e) => setImg(e.target.files[0])}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Category</label>
                                            <select
                                                className="form-select"
                                                value={categoryId}
                                                onChange={(e) => setCategoryId(e.target.value)}
                                            >
                                                <option value="">Select a category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100">
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default NewPost;
