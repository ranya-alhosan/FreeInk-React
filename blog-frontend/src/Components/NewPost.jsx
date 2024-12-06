import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import Head from "./Head";
import NavBar from "./NavBar"; // Ensure you import the correct component

function NewPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [img, setImg] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/categories"); // Replace with your API endpoint for categories
                setCategories(response.data.categories || []); // Adjust according to your backend response structure
            } catch (err) {
                console.error("Error fetching categories:", err);
                setError("Failed to load categories. Please try again.");
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

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
        } catch (error) {
            console.error("Error adding post:", error);
            setError(error.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <>
            <Head />
            <NavBar />
            <div>
            <div className="container">
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
                        <label className="form-label">Category</label>
                        <select
                            className="form-select"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
            </div>
            <Footer />
        </>
    );
}

export default NewPost;
