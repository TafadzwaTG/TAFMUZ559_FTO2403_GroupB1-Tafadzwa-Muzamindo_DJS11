import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../contexts/FavoritesContext"; 
import { fetchFavorites } from "../services/api"; 

const Favorites = () => {
  const [favoriteShows, setFavoriteShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favoriteEpisodes, removeFavoriteEpisode } = useContext(FavoritesContext);

  useEffect(() => {
    const fetchFavoriteShows = async () => {
      setIsLoading(true);
      try {
        const data = await fetchFavorites();
        setFavoriteShows(data);
      } catch (error) {
        console.error("Error fetching favorite shows:", error);
        setError("Failed to load favorite shows");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFavoriteShows();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center mt-8">
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 mr-3 text-orange-500"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-0v8h8a8 8 0 11-16 0z"
            ></path>
          </svg>
          <span className="text-oxford-blue">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

 
  const groupedEpisodes = favoriteEpisodes.reduce((acc, episode) => {
    const showSeasonKey = `${episode.showId}-${episode.season}`;
    if (!acc[showSeasonKey]) {
      acc[showSeasonKey] = {
        showId: episode.showId,
        season: episode.season,
        episodes: [],
      };
    }
    acc[showSeasonKey].episodes.push(episode);
    return acc;
  }, {});

  const handleRemoveFavorite = (episode) => {
    removeFavoriteEpisode(episode);
  };

  const renderFavoriteShows = () => {
    return favoriteShows.length > 0 ? (
      <ul className="space-y-4">
        {favoriteShows.map((show) => (
          <li
            key={show.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <Link
              to={`/show/${show.id}`}
              className="block p-4 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <img
                  src={show.image}
                  alt={show.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-oxford-blue">
                    {show.title}
                  </h2>
                  <p className="text-gray-600">Seasons: {show.seasons}</p>
                  <p className="text-gray-600">
                    Last updated:{" "}
                    {new Date(show.updated).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-center text-gray-600">No favorite shows added yet</p>
    );
  };

  const renderFavoriteEpisodes = () => {
    return Object.values(groupedEpisodes).length > 0 ? (
      Object.values(groupedEpisodes).map(({ showId, season, episodes }) => (
        <div key={`${showId}-${season}`}>
          <h2 className="text-xl font-semibold mt-6 mb-4 text-oxford-blue">
            Show ID: {showId} - Season: {season}
          </h2>
          <ul className="space-y-4">
            {episodes.map((episode) => (
              <li
                key={episode.episode}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <Link
                  to={`/show/${episode.showId}/season/${episode.season}`}
                  className="block p-4 hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <img
                      src={episode.image}
                      alt={episode.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="ml-4">
                      <h2 className="text-lg font-semibold text-oxford-blue">
                        {episode.title}
                      </h2>
                      <p className="text-gray-600">Season: {episode.season}</p>
                      <p className="text-gray-600">Episode: {episode.episode}</p>
                      <p className="text-gray-600">
                        Added on: {new Date(episode.addedDate).toLocaleDateString()}{" "}
                        {new Date(episode.addedDate).toLocaleTimeString()}
                      </p>
                      <button
                        onClick={() => handleRemoveFavorite(episode)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove from Favorites
                      </button>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-600">No favorite episodes added yet</p>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-oxford-blue">Favorites</h1>
      {renderFavoriteShows()}
      <h2 className="text-xl font-semibold mt-6 mb-4 text-oxford-blue">Favorite Episodes</h2>
      {renderFavoriteEpisodes()}
    </div>
  );
};

export default Favorites;
