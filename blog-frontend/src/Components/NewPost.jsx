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
        { id: 1, name: "Health & Sport", icon: "🏋️" },
        { id: 2, name: "Romance & Relationships", icon: "❤️" },
        { id: 3, name: "Food & Recipes", icon: "🍳" },
        { id: 4, name: "Travel & Adventure", icon: "✈️" },
        { id: 5, name: "Education & Learning", icon: "📚" },
        { id: 6, name: "Politics & Current Affairs", icon: "🗳️" },
        { id: 7, name: "Art & Creativity", icon: "🎨" },
        { id: 8, name: "History & Culture", icon: "🏛️" },
    ];

    const handleModalToggle = () => {
        setShowModal(!showModal);
        document.body.style.overflow = showModal ? "auto" : "hidden"; 
    };

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
            handleModalToggle();
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
                    className="btn btn-primary rounded-pill mb-3 " 
                    onClick={handleModalToggle}
                >
                    Add New Post
                </button>

                {showModal && (
                    <div className="modal show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-scrollable">
                            <div className="modal-content">
                            <div className="modal-header" style={{ backgroundColor: "#007bff", borderBottom: "2px solid #0056b3" }}>
    <h5
        className="modal-title"
        style={{
            color: "#ffffff",
            fontWeight: "bold", 
            fontSize: "1.25rem", 
        }}
    >
        Add New Post
    </h5>
    <button
        type="button"
        className="btn-close"
        onClick={handleModalToggle}
        style={{
            backgroundColor: "#0056b3", 
            border: "none",
        }}
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
                                            <div className="row">
                                                {categories.map((category) => (
                                                    <div key={category.id} className="col-6 col-md-3 mb-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => setCategoryId(category.id)}
                                                            className={`btn btn-outline-primary d-flex flex-column align-items-center justify-content-center p-3 w-100 ${
                                                                categoryId === category.id
                                                                    ? "bg-primary text-white"
                                                                    : "bg-light text-primary"
                                                            }`}
                                                            style={{
                                                                height: "120px",
                                                                borderRadius: "10px",
                                                            }}
                                                        >
                                                            <span className="fs-4">{category.icon}</span>
                                                            <span className="small" style={{ whiteSpace: "pre-line" }}>
                                                                {category.name.split(" ").join("\n")}
                                                            </span>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
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