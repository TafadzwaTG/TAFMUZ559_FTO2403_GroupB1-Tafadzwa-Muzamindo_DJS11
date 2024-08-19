
import PropTypes from "prop-types";

const SeasonView = ({ season, onSelectEpisode }) => {
  if (!season) {
    return <div className="text-center text-red-500">Season not found</div>;
  }
  
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-oxford-blue mb-6">
        Season {season.season}
      </h2>
      <p className="text-gray-700 mb-6">{season.description}</p>
      <ul className="space-y-4">
        {season.episodes.map((episode) => (
          <li
            key={episode.episode}
            className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition duration-200 ease-in-out transform hover:-translate-y-1"
            onClick={() => onSelectEpisode(episode)}
          >
            <span className="font-bold text-oxford-blue">
              Episode {episode.episode}
            </span>{" "}
            {episode.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

SeasonView.propTypes = {
  season: PropTypes.shape({
    season: PropTypes.number.isRequired,
    description: PropTypes.string,
    episodes: PropTypes.arrayOf(
      PropTypes.shape({
        episode: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
      })
    ).isRequired
  }),
  onSelectEpisode: PropTypes.func.isRequired
};

export default SeasonView;
