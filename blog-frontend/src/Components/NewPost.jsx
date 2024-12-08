import React, { useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import Head from "./Head";
import NavBar from "./NavBar";

function NewPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [img, setImg] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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
            setShowDropdown(false);
        } catch (error) {
            console.error("Error adding post:", error);
            setError(
                error.response?.data?.message || "An error occurred. Please try again."
            );
        }
    };

    return (
        <>
            <Head />
            <NavBar />
            <div className="container py-5">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-8">
                        <div className="card shadow-lg border-0 rounded-4">
                            <div className="card-header bg-gradient text-white rounded-top p-4">
                                <h3 className="text-center fw-bold mb-0">
                                    <i className="bi bi-pencil-square me-2"></i> Add New Post
                                </h3>
                            </div>
                            <div className="card-body p-4">
                                {error && <div className="alert alert-danger">{error}</div>}
                                {success && (
                                    <div className="alert alert-success">{success}</div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">
                                            <i className="bi bi-card-text me-2"></i> Title
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control rounded-pill"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Enter your post title"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">
                                            <i className="bi bi-file-text me-2"></i> Content
                                        </label>
                                        <textarea
                                            className="form-control rounded-3"
                                            rows="5"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            placeholder="Write your post content here"
                                        ></textarea>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">
                                            <i className="bi bi-image me-2"></i> Image
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control rounded-pill"
                                            onChange={(e) => setImg(e.target.files[0])}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">
                                            <i className="bi bi-list-task me-2"></i> Category
                                        </label>
                                        <div className="dropdown">
                                            <button
                                                type="button"
                                                className="btn btn-secondary dropdown-toggle rounded-pill"
                                                onClick={() => setShowDropdown(!showDropdown)}
                                            >
                                                {categoryId
                                                    ? categories.find(
                                                          (c) => c.id === parseInt(categoryId)
                                                      )?.name
                                                    : "Select a category"}
                                            </button>
                                            {showDropdown && (
                                                <ul className="dropdown-menu show rounded-3">
                                                    {categories.map((category) => (
                                                        <li
                                                            key={category.id}
                                                            className="dropdown-item cursor-pointer"
                                                            onClick={() => {
                                                                setCategoryId(category.id);
                                                                setShowDropdown(false);
                                                            }}
                                                        >
                                                            {category.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 rounded-pill fw-bold btn-gradient"
                                    >
                                        <i className="bi bi-send-fill me-2"></i> Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default NewPost;
