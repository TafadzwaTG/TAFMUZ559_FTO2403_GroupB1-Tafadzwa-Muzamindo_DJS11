import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../contexts/FavoritesContext";

const Favorites = () => {
  // Get context values related to favorites from FavoritesContext
  const {
    favoriteEpisodes,
    isLoading,
    error,
    setSortOrder,
    removeFavoriteEpisode,
  } = useContext(FavoritesContext);

  // Show loading spinner while data is loading
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

  // Show error message if there was an error loading the data
  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  // Function to handle sorting order change
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Function to handle removing an episode from favorites
  const handleRemove = (episodeId) => {
    removeFavoriteEpisode(episodeId);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-oxford-blue">
        Favorite Episodes
      </h1>
      <div className="mb-4">
        <label className="mr-2">Sort by title:</label>
        <select onChange={handleSortChange} className="p-2 border rounded">
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
      {/* Show list of favorite episodes if there are any */}
      {favoriteEpisodes.length ? (
        <ul className="space-y-4">
          {favoriteEpisodes.map((episode) => (
            <li
              key={episode.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <Link
                to={`/show/${episode.showId}/season/${episode.season}/episode/${episode.id}`}
                className="block p-4 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <img
                    src={episode.image || "/path/to/placeholder/image.png"}
                    alt={episode.title}
                    className="w-16 h-16 object-cover rounded-lg"
                    onError={(e) =>
                      (e.target.src = "/path/to/placeholder/image.png")
                    }
                  />
                  <div className="ml-4 flex-1">
                    <h2 className="text-lg font-semibold text-oxford-blue">
                      {episode.title}
                    </h2>
                    <p className="text-gray-600">Show ID: {episode.showId}</p>
                    <p className="text-gray-600">Season: {episode.season}</p>
                    <p className="text-gray-600">Episode: {episode.id}</p>
                  </div>
                  <button
                    onClick={() => handleRemove(episode.id)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    Remove
                  </button>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">No favorites available</p>
      )}
    </div>
  );
};

export default Favorites;
