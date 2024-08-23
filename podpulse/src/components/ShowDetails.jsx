import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchShowById } from "../services/api.js";
import SeasonView from "./SeasonView.jsx";

// eslint-disable-next-line react/prop-types
function ShowDetail({ setCurrentAudio }) {
  // Extract the show ID from the URL parameters
  const { id } = useParams();
  // State to hold the show data
  const [show, setShow] = useState(null);
  // State to handle error messages
  const [error, setError] = useState(null);
  // State to handle loading state
  const [isLoading, setIsLoading] = useState(true);
  // State to track the selected season
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    // Fetch show data when component mounts or ID changes
    const fetchShowData = async () => {
      try {
        // Fetch show details by ID
        const data = await fetchShowById(id);
        setShow(data);
        // Set the default selected season if seasons are available
        if (data.seasons && data.seasons.length > 0) {
          setSelectedSeason(data.seasons[0]);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        // Handle errors by setting an error message
        setError("Failed to fetch show details");
      } finally {
        // Set loading to false once data is fetched or if an error occurs
        setIsLoading(false);
      }
    };

    fetchShowData();
  }, [id]);

  // Handle the selection of a season
  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
  };

  // Display loading message while data is being fetched
  if (isLoading) return <div>Loading...</div>;
  // Display error message if there is an error
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      {show && (
        <>
          {/* Show title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-oxford-blue">
            {show.title}
          </h1>
          {/* Show description */}
          <p className="mb-4 text-gray-700">{show.description}</p>
          {/* Button to play show audio */}
          <button
            onClick={() => setCurrentAudio(show.audioUrl)}
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Play Audio
          </button>

          <div className="mb-4">
            {/* Seasons section */}
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-oxford-blue">
              Seasons
            </h2>
            <div className="flex flex-wrap gap-2">
              {show.seasons && show.seasons.length > 0 ? (
                show.seasons.map((season) => (
                  <button
                    key={season.season}
                    onClick={() => handleSeasonSelect(season)}
                    className={`px-4 py-2 rounded ${
                      selectedSeason && selectedSeason.season === season.season
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200 text-oxford-blue"
                    }`}
                  >
                    Season {season.season}
                  </button>
                ))
              ) : (
                <p>No seasons available</p>
              )}
            </div>
          </div>

          {/* Render the SeasonView component if a season is selected */}
          {selectedSeason && (
            <SeasonView
              season={selectedSeason}
              onSelectEpisode={(episode) => console.log(episode)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ShowDetail;
