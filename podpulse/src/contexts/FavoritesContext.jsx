// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect } from 'react';
import { fetchFavorites, addFavorite, removeFavorite } from '../services/api';

export const FavoritesContext = createContext();

// eslint-disable-next-line react/prop-types
export const FavoritesProvider = ({ children }) => {
    const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);

    useEffect(() => {
        const loadFavorites = async () => {
            const favorites = await fetchFavorites();
            setFavoriteEpisodes(favorites);
        };
        loadFavorites();
    }, []);

    const addFavoriteEpisode = (episode) => {
        addFavorite(episode);
        setFavoriteEpisodes((prevFavorites) => [...prevFavorites, episode]);
    };

    const removeFavoriteEpisode = (episode) => {
        removeFavorite(episode);
        setFavoriteEpisodes((prevFavorites) =>
            prevFavorites.filter(fav => !(fav.episode === episode.episode && fav.showId === episode.showId))
        );
    };

    return (
        <FavoritesContext.Provider
            value={{ favoriteEpisodes, addFavoriteEpisode, removeFavoriteEpisode }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};
