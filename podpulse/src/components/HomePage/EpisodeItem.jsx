import PropTypes from "prop-types";

const EpisodeItem = ({ episode, onPlay, onToggleFavorite, isFavorite }) => (
  <li className="bg-gray-100 shadow-lg rounded-lg p-6 flex justify-between items-center hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
    {/* Container for episode details */}
    <div className="flex items-center">
      {/* Episode image */}
      <img
        src={episode.image}
        alt={episode.title}
        className="w-20 h-20 rounded-full object-cover mr-6 border-4 border-gray-300"
      />
      <div>
        {/* Episode title */}
        <h3 className="text-2xl font-semibold text-oxford-blue">
          {episode.title}
        </h3>
        {/* Episode ID */}
        <p className="text-gray-500">Episode {episode.id}</p>
      </div>
    </div>
    {/* Container for action buttons */}
    <div className="flex items-center">
      {/* Play button */}
      <button
        onClick={() => onPlay(episode)}
        className="bg-oxford-blue text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-300 mr-4"
      >
        <i className="fas fa-play"></i>
      </button>
      {/* Favorite button */}
      <button
        onClick={() => onToggleFavorite(episode)}
        className={`text-2xl ${isFavorite ? "text-orange-500" : "text-gray-500"} hover:text-orange-400 transition-colors duration-300`}
      >
        ❤️
      </button>
    </div>
  </li>
);

// Define prop types for type-checking
EpisodeItem.propTypes = {
  episode: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  onPlay: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default EpisodeItem;
