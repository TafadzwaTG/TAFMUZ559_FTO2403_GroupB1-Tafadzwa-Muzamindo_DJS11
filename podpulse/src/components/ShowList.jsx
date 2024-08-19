import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchShows } from "../services/api";

const ShowList = ({ setCurrentAudio }) => {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10); 

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchShows();
        setShows(data);
      } catch (error) {
        console.error("Error fetching shows:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  if (isLoading) {
    return (
      <div className="text-center mt-8">
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 mr-3 text-orange-500"
            viewBox="0 0 24 32"
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
              d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
            ></path>
          </svg>
          <span className="text-oxford-blue">Loading</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-500">
        Error fetching shows: {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {shows.slice(0, visibleCount).map((show) => (
          <Link to={`/show/${show.id}`} key={show.id}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={show.image}
                alt={show.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-2">
                <h2 className="text-sm font-bold mb-1 text-oxford-blue">
                  {show.title}
                </h2>
                <p className="text-gray-600 mb-1 text-xs">
                  Seasons: {show.seasons}
                </p>
                <p className="text-gray-600 mb-1 text-xs">
                  Last updated: {new Date(show.updated).toLocaleDateString()}
                </p>
                <p className="text-gray-600 text-xs">
                  Genres: {show.genres.join(", ")}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {visibleCount < shows.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleShowMore}
            className="bg-oxford-blue text-white px-4 py-2 rounded"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowList;
