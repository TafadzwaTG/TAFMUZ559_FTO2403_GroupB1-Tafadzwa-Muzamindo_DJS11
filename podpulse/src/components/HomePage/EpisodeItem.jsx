import PropTypes from 'prop-types';

const EpisodeItem = ({ episode, onPlay, onToggleFavorite, isFavorite }) => (
  <li className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
    <div>
      <h3 className="text-xl font-semibold">{episode.title}</h3>
      <p className="text-gray-600">Episode {episode.id}</p> 
    </div>
    <div className="flex items-center">
      <button onClick={() => onPlay(episode)} className="mr-4">
        Play
      </button>
      <button
        onClick={() => onToggleFavorite(episode)}
        className={isFavorite ? 'text-red-500' : 'text-gray-500'}
      >
        ❤️
      </button>
    </div>
  </li>
);

EpisodeItem.propTypes = {
  episode: PropTypes.shape({
    id: PropTypes.number.isRequired, 
    title: PropTypes.string.isRequired,
  }).isRequired,
  onPlay: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired, 
};

export default EpisodeItem;
