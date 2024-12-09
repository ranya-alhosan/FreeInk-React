import React from "react";

function CategoryFilter({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="mb-4">
      <div className="d-flex flex-wrap gap-2">
        <button
          className={`btn btn-${!selectedCategory ? "primary" : "outline-primary"}`}
          onClick={() => setSelectedCategory("")}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`btn btn-${selectedCategory === category ? "primary" : "outline-primary"}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
