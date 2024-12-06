import React, { useState } from "react";
import axios from "axios";

function NewPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [img, setImg] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get the token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
            setError("You must be logged in to add a post.");
            return;
        }

        // Create form data
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (img) {
            formData.append("img", img);
        }
        formData.append("category_id", categoryId);

        try {
            // Make the POST request with the token
            const response = await axios.post(
                "http://localhost:8000/api/storepost",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`, // Include the token
                    },
                }
            );

            setSuccess("Post added successfully!");
            setTitle("");
            setContent("");
            setImg(null);
            setCategoryId("");
        } catch (error) {
            console.error("Error adding post:", error);

            // Handle specific error responses
            setError(error.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add New Post</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea
                        className="form-control"
                        rows="5"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
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
                    <label className="form-label">Category ID</label>
                    <input
                        type="text"
                        className="form-control"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default NewPost;
