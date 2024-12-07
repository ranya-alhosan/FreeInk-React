// src/components/CategoryFilter.js
import React from 'react';
import { Button } from 'react-bootstrap';

function CategoryFilter({ categories, selectedCategory, onCategoryChange, onShowAllPosts }) {
    return (
        <div className="category-filter d-flex flex-wrap mb-4">
            {categories.map((category, index) => (
                <Button
                    key={index}
                    variant={selectedCategory === category ? "success" : "primary"} 
                    onClick={() => onCategoryChange(category)}
                    className="category-btn m-1"
                >
                    {category}
                </Button>
            ))}
           
            <Button
                variant="warning"
                onClick={onShowAllPosts}
                className="m-1"
            >
                Show All Posts
            </Button>
        </div>
    );
}

export default CategoryFilter;
