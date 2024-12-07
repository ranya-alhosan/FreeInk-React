// src/components/SearchBar.js
import React from 'react';
import { Form } from 'react-bootstrap';

function SearchBar({ searchQuery, onSearchChange }) {
    return (
        <Form.Control
            type="text"
            placeholder="Search for posts"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)} 
            className="mb-4"
        />
    );
}

export default SearchBar;
