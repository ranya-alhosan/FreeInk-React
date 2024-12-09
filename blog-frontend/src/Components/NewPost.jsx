import React, { useState } from "react";
import axios from "axios";

function NewPost({ onNewPost }) {
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

        if (!title.trim() || !content.trim() || !categoryId) {
            setError("All fields are required.");
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
        if (img) formData.append("img", img);
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
            window.location.reload();
            onNewPost(response.data);
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };
    return (
        <>
            <div className="container py-5 text-center">
                <button
                    className="btn rounded-pill px-4 py-2 shadow-sm"
                    style={{ backgroundColor: "#0c1045", color: "#fff" }}
                    onClick={() => setShowModal(true)}
                >
                    <i className="bi bi-plus-circle me-2"></i> Add New Post
                </button>

                {showModal && (
                    <div className="modal show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div
                                    className="modal-header text-white"
                                    style={{ backgroundColor: "#0c1045" }}
                                >
                                    <h5 className="modal-title text-white">Add New Post</h5>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    {error && (
                                        <div className="alert alert-danger">
                                            <i className="bi bi-exclamation-triangle me-2"></i>
                                            {error}
                                        </div>
                                    )}
                                    {success && (
                                        <div className="alert alert-success">
                                            <i className="bi bi-check-circle me-2"></i>
                                            {success}
                                        </div>
                                    )}
                                    <form onSubmit={handleSubmit}>
                                        <div className="row d-flex align-items-center gap-3">
                                            <div className="col-md-5 mb-3">
                                                <label className="form-label">Title</label>
                                                <input
                                                    type="text"
                                                    className="form-control rounded-pill shadow-sm"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    placeholder="Post title"
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Image</label>
                                                <input
                                                    type="file"
                                                    className="form-control rounded-pill shadow-sm"
                                                    onChange={(e) => setImg(e.target.files[0])}
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Content</label>
                                            <textarea
                                                className="form-control shadow-sm"
                                                rows="4"
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                                placeholder="Write content here..."
                                            ></textarea>
                                        </div>
                                        <div className="col-md-6 mb-3 d-flex flex-column align-items-start">
                                            <label className="form-label">Category</label>
                                            <select
                                                className="form-select rounded-pill shadow-sm"
                                                value={categoryId}
                                                onChange={(e) => setCategoryId(e.target.value)}
                                            >
                                                <option value="">Select category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn w-500 shadow-sm rounded-pill"
                                            style={{
                                                backgroundColor: "#0c1045",
                                                color: "#fff",
                                            }}
                                        >
                                            <i className="bi bi-send-fill me-2"></i> Submit
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
