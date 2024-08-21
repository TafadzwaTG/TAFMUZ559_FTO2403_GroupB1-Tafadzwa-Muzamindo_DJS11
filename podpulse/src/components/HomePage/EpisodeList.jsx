/* eslint-disable react/prop-types */
import EpisodeItem from './EpisodeItem';

const EpisodeList = ({ episodes, title }) => (
  <section className="my-12 animate-fadeIn">
    <h2 className="text-2xl font-bold text-oxford-blue mb-4">{title}</h2>
    <ul className="space-y-4">
      {episodes.length > 0 ? (
        episodes.map((episode) => (
          <EpisodeItem
            key={episode.id}
            episode={episode}
          />
        ))
      ) : (
        <li className="bg-white shadow-md rounded-lg p-4">
          <p className="text-center text-gray-600">No episodes available</p>
        </li>
      )}
    </ul>
  </section>
);

export default EpisodeList;
