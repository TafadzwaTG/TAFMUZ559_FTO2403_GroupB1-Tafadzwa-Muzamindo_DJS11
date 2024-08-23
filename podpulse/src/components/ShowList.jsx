import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPreviews } from "../services/api";

const ShowList = () => {
  // State to hold the list of shows
  const [shows, setShows] = useState([]);
  // State to handle loading state
  const [isLoading, setIsLoading] = useState(true);
  // State to handle error messages
  const [error, setError] = useState(null);
  // State to handle sorting order (ascending or descending)
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchShowList = async () => {
      setIsLoading(true);
      try {
        // Fetch shows from the API
        const data = await fetchPreviews();
        setShows(data);
      } catch (error) {
        console.error("Error fetching shows:", error);
        setError("Failed to load shows");
      } finally {
        setIsLoading(false);
      }
    };
    fetchShowList();
  }, []);

  // Handle sorting order change
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Sort shows based on the selected order
  const sortedShows = [...shows].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  // Show loading spinner while data is being fetched
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

  // Show error message if there is an error
  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      {/* Title of the page */}
      <h1 className="text-2xl font-bold mb-4 text-oxford-blue">Show List</h1>
      <div className="mb-4">
        {/* Sort by dropdown */}
        <label htmlFor="sortOrder" className="mr-2 text-gray-700">
          Sort by:
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={handleSortChange}
          className="bg-gray-200 px-2 py-1 rounded"
        >
          <option value="asc">Alphabetical A-Z</option>
          <option value="desc">Alphabetical Z-A</option>
        </select>
      </div>
      <ul className="space-y-4">
        {sortedShows.length > 0 ? (
          sortedShows.map((show) => (
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
                    onError={(e) =>
                      (e.target.src = "path/to/placeholder/image.png")
                    }
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold text-oxford-blue">
                      {show.title}
                    </h2>
                    <p className="text-gray-600">ID: {show.id}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-600">No shows available</p>
        )}
      </ul>
    </div>
  );
};

export default ShowList;
