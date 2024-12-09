import React from "react";

function CategoryFilter({ categories, selectedCategory, setSelectedCategory }) {
  const handleCheckboxChange = (category) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };

  return (
    <div className="category-filter">
      <h5 className="filter-title">Filter by Category</h5>
      <ul className="list-unstyled">
        <li>
          <label className="d-flex align-items-center">
            <input
              type="radio"
              name="category"
              checked={!selectedCategory}
              onChange={() => setSelectedCategory("")}
              className="form-check-input me-2"
            />
            All Categories
          </label>
        </li>
        {categories.map((category) => (
          <li key={category}>
            <label className="d-flex align-items-center">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category}
                onChange={() => handleCheckboxChange(category)}
                className="form-check-input me-2"
              />
              {category}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryFilter;
