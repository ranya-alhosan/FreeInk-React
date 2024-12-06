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
    const [showDropdown, setShowDropdown] = useState(false); // للتحكم في عرض القائمة
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // التصنيفات
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
                            <div className="dropdown">
                                <button
                                    type="button"
                                    className="btn btn-secondary dropdown-toggle"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    {categoryId
                                        ? categories.find((c) => c.id === parseInt(categoryId))?.name
                                        : "Select a category"}
                                </button>
                                {showDropdown && (
                                    <ul className="dropdown-menu show">
                                        {categories.map((category) => (
                                            <li
                                                key={category.id}
                                                className="dropdown-item cursor-pointer"
                                                onClick={() => {
                                                    setCategoryId(category.id);
                                                    setShowDropdown(false); // لإخفاء القائمة
                                                }}
                                            >
                                                {category.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
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
