import PropTypes from 'prop-types';
import { useContext } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { FavoritesContext } from '../contexts/FavoritesContext';

const SeasonView = ({ season, onSelectEpisode }) => {
    const { favoriteEpisodes, addFavoriteEpisode, removeFavoriteEpisode } = useContext(FavoritesContext);

    if (!season) {
        return <div className="text-center text-red-500">Season not found</div>;
    }

    const handleFavoriteToggle = (episode) => {
        if (favoriteEpisodes.some((fav) => fav.episode === episode.episode && fav.showId === episode.showId)) {
            removeFavoriteEpisode(episode.episode);
        } else {
            addFavoriteEpisode(episode);
        }
    };

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
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-oxford-blue">
                                Episode {episode.episode}: {episode.title}
                            </span>
                            <button
                                className={`ml-2 ${
                                    favoriteEpisodes.some((fav) => fav.episode === episode.episode && fav.showId === episode.showId)
                                        ? 'text-red-500'
                                        : 'text-gray-500'
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
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

SeasonView.propTypes = {
    season: PropTypes.shape({
        season: PropTypes.number.isRequired,
        description: PropTypes.string,
        episodes: PropTypes.arrayOf(
            PropTypes.shape({
                episode: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                showId: PropTypes.string.isRequired, // Ensure `showId` is a required prop
            })
        ).isRequired,
    }),
    onSelectEpisode: PropTypes.func.isRequired,
};

export default SeasonView;
