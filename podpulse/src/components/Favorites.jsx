import { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { FavoritesContext } from "../contexts/FavoritesContext"; 
import { fetchFavorites } from '../services/api'; 

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavoriteEpisodes = async () => {
            setIsLoading(true);
            try {
                const data = await fetchFavorites();
                setFavorites(data);
            } catch (error) {
                console.error("Error fetching favorites:", error);
                setError("Failed to load favorites");
            } finally {
                setIsLoading(false);
            }
        };
        fetchFavoriteEpisodes();
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
            <h1 className="text-2xl font-bold mb-4 text-oxford-blue">Favorite Episodes</h1>
            <ul className="space-y-4">
                {favorites.length > 0 ? (
                    favorites.map((episode) => (
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
                                        src={episode.image}
                                        alt={episode.title}
                                        className="w-16 h-16 object-cover rounded-lg"
                                        onError={(e) => e.target.src = 'path/to/placeholder/image.png'} // Placeholder image if fails
                                    />
                                    <div className="ml-4">
                                        <h2 className="text-lg font-semibold text-oxford-blue">
                                            {episode.title}
                                        </h2>
                                        <p className="text-gray-600">Show ID: {episode.showId}</p>
                                        <p className="text-gray-600">Season: {episode.season}</p>
                                        <p className="text-gray-600">Episode: {episode.id}</p>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-600">No favorites available</p>
                )}
            </ul>
        </div>
    );
};

export default Favorites;
