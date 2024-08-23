import { createContext, useState, useEffect } from "react";
import { fetchFavorites, addFavorite, removeFavorite } from "../services/api";

// Create a context for favorites
export const FavoritesContext = createContext();

// Provider component to manage favorite episodes
// eslint-disable-next-line react/prop-types
export const FavoritesProvider = ({ children }) => {
  // State to hold the list of favorite episodes
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        // Fetch favorites from the API
        const favorites = await fetchFavorites();
        setFavoriteEpisodes(favorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    loadFavorites();
  }, []);

  // Add an episode to favorites
  const addFavoriteEpisode = async (episode) => {
    try {
      await addFavorite(episode);
      setFavoriteEpisodes((prevFavorites) => [...prevFavorites, episode]);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  // Remove an episode from favorites
  const removeFavoriteEpisode = async (episodeId) => {
    try {
      await removeFavorite(episodeId);
      setFavoriteEpisodes((prevFavorites) =>
        prevFavorites.filter((fav) => fav.id !== episodeId)
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
