import React, { useEffect, useState } from "react";
import { fetchShows } from "../services/api";

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShows().then((data) => {
      setShows(data.sort((a, b) => a.title.localeCompare(b.title)));
      setLoading(false);
    })
    .catch(error =>{
        console.error('Error fetching shows:', error);
        setLoading(false);
    });
  }, []);

  if (loading) {
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
};

return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
    {shows.map((show) => (
      <div
        key={show.id}
        className="bg-white shadow-md rounded-lg overflow-hidden"
      >
        <img
          src={show.image}
          alt={show.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2 text-oxford-blue">
            {show.title}
          </h2>
          <p className="text-gray-600 mb-2">Seasons: {show.seasons}</p>
          <p className="text-gray-600 mb-2">
            Last updated:{new Date(show.updated).toLocaleDateString()}
          </p>
          <p className="text-gray-600">Genres: {show.genres.join(",")}</p>
        </div>
      </div>
    ))}
  </div>
);
}

export default ShowList;