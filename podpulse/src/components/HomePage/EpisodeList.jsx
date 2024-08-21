/* eslint-disable react/prop-types */
import EpisodeItem from './EpisodeItem';

const EpisodeList = ({ episodes, title, onPlay, onToggleFavorite }) => (
  <section className="my-12 animate-fadeIn">
    <h2 className="text-2xl font-bold text-oxford-blue mb-4">{title}</h2>
    <ul className="space-y-4">
      {episodes && episodes.length > 0 ? (
        episodes.map((episode) => {
          const episodeId = Number(episode.id);
          const isFavorite = Boolean(episode.isFavorite);

          return (
            <EpisodeItem
              key={episodeId}
              episode={{ ...episode, id: episodeId }}  
              onPlay={onPlay}
              onToggleFavorite={onToggleFavorite}
              isFavorite={isFavorite}  
            />
          );
        })
      ) : (
        <li className="bg-white shadow-md rounded-lg p-4">
          <p className="text-center text-gray-600">No episodes available</p>
        </li>
      )}
    </ul>
  </section>
);

export default EpisodeList;
