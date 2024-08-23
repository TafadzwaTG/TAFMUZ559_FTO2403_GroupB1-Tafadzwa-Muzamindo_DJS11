import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPreviews } from "../services/api";
import LoadingSpinner from "../components/HomePage/LoadingSpinner";
import ErrorMessage from "../components/HomePage/ErrorMessage";
import EpisodeList from "../components/HomePage/EpisodeList";
import { genreMapping } from "../constants/GenreMapping";

const GenrePage = () => {
  // Get the genre ID from the URL parameters
  const { genreId } = useParams();

  // State to hold episodes data
  const [episodes, setEpisodes] = useState([]);
  // State to handle loading state
  const [isLoading, setIsLoading] = useState(true);
  // State to handle error messages
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGenreContent = async () => {
      setIsLoading(true);
      try {
        // Fetch previews from the API
        const previews = await fetchPreviews();
        console.log("Fetched Previews:", previews);

        // Filter episodes based on the genre ID
        const filteredEpisodes = previews
          .filter((preview) => {
            console.log("Preview Genres:", preview.genres);
            return preview.genres && preview.genres.includes(Number(genreId));
          })
          .map((preview) => {
            console.log("Filtered Preview Episodes:", preview.episodes);
            return preview.episodes;
          })
          .flat();

        // Update state with the filtered episodes
        setEpisodes(filteredEpisodes);
      } catch (err) {
        // Set error message if something goes wrong
        setError(err.message || "Failed to load genre content");
      } finally {
        // Set loading to false once data is fetched or error occurs
        setIsLoading(false);
      }
    };

    loadGenreContent();
  }, [genreId]);

  // Show loading spinner while data is being fetched
  if (isLoading) return <LoadingSpinner />;
  // Show error message if there is an error
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 md:px-8 lg:px-10 bg-gray-300">
      {/* Display genre title */}
      <h1 className="text-2xl font-bold text-oxford-blue mb-4">
        Episodes in Genre: {genreMapping[genreId] || "Unknown Genre"}
      </h1>
      {/* Show a message if no episodes are available */}
      {episodes.length === 0 ? (
        <p className="text-gray-700">No episodes available for this genre.</p>
      ) : (
        // Display the list of episodes
        <EpisodeList
          episodes={episodes}
          title={`Episodes in ${genreMapping[genreId] || "Genre"}`}
          onPlay={(episode) => {
            console.log("Playing Episode:", episode);
          }}
        />
      )}
    </div>
  );
};

export default GenrePage;
