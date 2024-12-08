import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [categories] = useState([
    { name: "Health & Sport", img: "/assets/images/cat1.png" },
    { name: "Romance & Relationships", img: "/assets/images/cat2.png" },
    { name: "Food & Recipes", img: "/assets/images/cat3.png" },
    { name: "Travel & Adventure", img: "/assets/images/cat4.png" },
    { name: "Education & Learning", img: "/assets/images/cat5.png" },
    { name: "Politics & Current Affairs", img: "/assets/images/cat6.png" },
    { name: "Art & Creativity", img: "/assets/images/cat7.png" },
    { name: "History & Culture", img: "/assets/images/cat8.png" },
  ]);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Explore Categories</h2>
      <div className="row">
        {categories.map((category, index) => (
          <div className="col-md-4 col-lg-3 mb-4" key={index}>
            <Link to={`/blogposts?category=${encodeURIComponent(category.id)}`} className="text-decoration-none">
             <div className="card shadow-sm h-100">
                <img
                  src={category.img}
                  className="card-img-top img-fluid"
                  alt={category.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h6 className="card-title text-dark">{category.name}</h6>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
