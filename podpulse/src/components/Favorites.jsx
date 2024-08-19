import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchFavorites } from "../services/api";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoriteShows = async () => {
      setIsLoading(true);
      try {
        const data = await fetchFavorites();
        setFavorites(data);
      } catch (error) {
        console.error("Error  fetching favorites:", error);
        setError("Failed to load favorites");
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
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-oxford-blue">Favorites</h1>
      {favorites.length > 0 ? (
        <ul className="space-y-4">
          {favorites.map((show) => (
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
        <p className="text-center text-gray-600">No favorites added yet</p>
      )}
    </div>
  );
};

export default Favorites;
