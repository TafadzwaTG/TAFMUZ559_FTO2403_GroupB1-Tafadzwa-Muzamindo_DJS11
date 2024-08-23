import PropTypes from "prop-types";
import { useContext } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { FavoritesContext } from "../contexts/FavoritesContext";

// Component to display episodes of a season with options to add/remove from favorites
const SeasonView = ({ season, onSelectEpisode }) => {
  // Access favorite episodes and favorite management functions from context
  const { favoriteEpisodes, addFavoriteEpisode, removeFavoriteEpisode } =
    useContext(FavoritesContext);

  // If no season or episodes are provided, display an error message
  if (!season || !season.episodes) {
    return <div className="text-center text-red-500">Season not found</div>;
  }

  // Toggle the favorite status of an episode
  const handleFavoriteToggle = (episode) => {
    console.log(episode); // Debug log for episode data
    // Check if the episode is already in favorites and add/remove accordingly
    if (favoriteEpisodes.some((fav) => fav.episode === episode.episode)) {
      removeFavoriteEpisode(episode.episode);
    } else {
      addFavoriteEpisode(episode);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      {/* Season title */}
      <h2 className="text-3xl font-bold text-oxford-blue mb-6">
        Season {season.season}
      </h2>
      {/* Season description */}
      <p className="text-gray-700 mb-6">{season.description}</p>
      <ul className="space-y-4">
        {/* Render each episode */}
        {season.episodes.map((episode) => (
          <li
            key={episode.episode}
            className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition duration-200 ease-in-out transform hover:-translate-y-1"
            onClick={() => onSelectEpisode(episode)}
          >
            <div className="flex justify-between items-center">
              {/* Episode title and number */}
              <span className="font-bold text-oxford-blue">
                Episode {episode.episode}: {episode.title}
              </span>
              {/* Favorite button */}
              <button
                className={`ml-2 ${
                  favoriteEpisodes.some(
                    (fav) => fav.episode === episode.episode
                  )
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click event from bubbling up
                  handleFavoriteToggle(episode);
                }}
              >
                <HeartIcon className="w-5 h-5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// PropTypes to validate the component's props
SeasonView.propTypes = {
  season: PropTypes.shape({
    season: PropTypes.number.isRequired,
    description: PropTypes.string,
    episodes: PropTypes.arrayOf(
      PropTypes.shape({
        episode: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        showId: PropTypes.number,
      })
    ).isRequired,
  }).isRequired,
  onSelectEpisode: PropTypes.func.isRequired,
};

export default SeasonView;
