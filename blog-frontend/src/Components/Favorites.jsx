import React, { useEffect, useState } from 'react';
import apiClient from "../Api/apiClient";

const UserFavorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const response = await apiClient.get('/favorites');
            // Filter favorites where the status is "1"
            const filteredFavorites = response.data.data.filter(favorite => favorite.status === "1");
            console.log(filteredFavorites);
            setFavorites(filteredFavorites);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };
    
    const toggleFavorite = async (favorite) => {
        try {
            await apiClient.post('/favorites', {
                post_id: favorite.post_id,
                status: 0, // Unfavorite
            });
            fetchFavorites(); // Refresh the list
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    return (
        <div>
            <h2>User Favorites</h2>
            <ul>
                {favorites.map((favorite) => (
                    <li key={favorite.id}>
                        <span>{favorite.post.title}</span>
                        <button onClick={() => toggleFavorite(favorite)}>Unfavorite</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserFavorites;
