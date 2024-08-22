import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../contexts/FavoritesContext";

const Favorites = () => {
  const {
    favoriteEpisodes,
    isLoading,
    error,
    setSortOrder,
    removeFavoriteEpisode,
  } = useContext(FavoritesContext);

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

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const groupedEpisodes = favoriteEpisodes.reduce((acc, episode) => {
    const key = `${episode.showId}-${episode.season}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(episode);
    return acc;
  }, {});

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
      {Object.keys(groupedEpisodes).length ? (
        Object.entries(groupedEpisodes).map(([key, episodes]) => (
          <div key={key} className="mb-8">
            <h2 className="text-xl font-bold text-oxford-blue mb-4">
              Show ID: {episodes[0].showId} - Season: {episodes[0].season}
            </h2>
            <ul className="space-y-4">
              {episodes.map((episode) => (
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
                        <p className="text-gray-600">
                          Show ID: {episode.showId}
                        </p>
                        <p className="text-gray-600">
                          Season: {episode.season}
                        </p>
                        <p className="text-gray-600">Episode: {episode.id}</p>
                      </div>
                      <button
                        onClick={() => {
                          console.log("Removing episode ID:", episode.id);
                          removeFavoriteEpisode(episode);
                        }}
                        className="text-red-500 hover:text-red-700 ml-4"
                      >
                        Remove
                      </button>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No favorites available</p>
      )}
    </div>
  );
};

export default Favorites;
