// eslint-disable-next-line no-unused-vars
import React, { createContext, useState} from "react";

export const FavoritesContext = createContext();

// eslint-disable-next-line react/prop-types
export const FavoritesProvider = ({ children}) => {
    const [favoriteEpisodes, setFavoritesEpisodes] = useState([]);

    const  addFavoriteEpisodes = (episode) => {
        setFavoritesEpisodes((prevFavorites) => {
            if(!prevFavorites.some((fav) => fav.episode == episode.episode)){
                return[...prevFavorites, episode].sort((a,b) => 
                 a.title.localeCompare(b.title)
            );
            }

            return prevFavorites;
    });
    };

    const removeFavorite = (episodeId) => {
        setFavoritesEpisodes((prevFavorites) =>
        prevFavorites.filter((fav) => fav.episode !== episodeId) 
    );
    };
    
    return (
        <FavoritesContext.Provider
        value={{ favoriteEpisodes, addFavoriteEpisodes, removeFavorite}} >
            {children}
        </FavoritesContext.Provider>
    );

}; 