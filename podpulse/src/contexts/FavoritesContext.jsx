import { createContext, useState, useEffect } from 'react';
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
        addFavorite(episode).then(() => {
            setFavoriteEpisodes((prevFavorites) => [...prevFavorites, episode]);
        });
    };

    const removeFavoriteEpisode = (episode) => {
        removeFavorite(episode);
            setFavoriteEpisodes((prevFavorites) =>
                prevFavorites.filter(fav => fav.id !== episode.id )
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
