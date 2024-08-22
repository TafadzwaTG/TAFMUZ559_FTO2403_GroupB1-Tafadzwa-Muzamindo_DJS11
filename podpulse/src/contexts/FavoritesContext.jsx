import { createContext, useState, useEffect } from 'react';
import { fetchFavorites, addFavorite, removeFavorite } from '../services/api';

export const FavoritesContext = createContext();

// eslint-disable-next-line react/prop-types
export const FavoritesProvider = ({ children }) => {
    const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const favorites = await fetchFavorites();
                setFavoriteEpisodes(favorites);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };
        loadFavorites();
    }, []);

    const addFavoriteEpisode = async (episode) => {
        try {
            await addFavorite(episode);
            setFavoriteEpisodes((prevFavorites) => [...prevFavorites, episode]);
        } catch (error) {
            console.error("Error adding favorite:", error);
        }
    };

    const removeFavoriteEpisode = async (episode) => {
        try {
            await removeFavorite(episode);
            setFavoriteEpisodes((prevFavorites) =>
                prevFavorites.filter(fav => fav.id !== episode.id)
            );
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    };

    return (
        <FavoritesContext.Provider
            value={{ favoriteEpisodes, addFavoriteEpisode, removeFavoriteEpisode }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};