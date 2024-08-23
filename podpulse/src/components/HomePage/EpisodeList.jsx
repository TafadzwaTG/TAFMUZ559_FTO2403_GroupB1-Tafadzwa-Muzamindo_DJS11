/* eslint-disable react/prop-types */
import EpisodeItem from "./EpisodeItem";

const EpisodeList = ({ episodes, title, onPlay, onToggleFavorite }) => (
  <section className="my-12 animate-fadeIn">
    {/* Section heading for the episode list */}
    <h2 className="text-2xl font-bold text-oxford-blue mb-4">{title}</h2>
    <ul className="space-y-4">
      {episodes && episodes.length > 0 ? (
        // If there are episodes, map over them and create an EpisodeItem for each
        episodes.map((episode) => {
          const episodeId = Number(episode.id); // Convert episode ID to a number
          const isFavorite = Boolean(episode.isFavorite); // Convert isFavorite to a boolean

          return (
            <EpisodeItem
              key={episodeId}
              episode={{ ...episode, id: episodeId }} // Pass episode data with updated ID
              onPlay={onPlay}
              onToggleFavorite={onToggleFavorite}
              isFavorite={isFavorite} // Pass whether the episode is a favorite
            />
          );
        })
      ) : (
        // If there are no episodes, display a message
        <li className="bg-white shadow-md rounded-lg p-4">
          <p className="text-center text-gray-600">No episodes available</p>
        </li>
      )}
    </ul>
  </section>
);

export default EpisodeList;
