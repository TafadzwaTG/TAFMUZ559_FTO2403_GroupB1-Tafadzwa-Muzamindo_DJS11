/* eslint-disable react/prop-types */
import { PlayIcon } from '@heroicons/react/24/solid';

const FeaturedPodcast = ({ podcast, onPlay }) => (
  <section className="my-12 bg-white shadow-md rounded-lg p-6 animate-fadeIn">
    <h2 className="text-2xl font-bold text-oxford-blue mb-4">Featured Podcast</h2>
    <div className="flex items-center">
      <img
        src={podcast.image || '/path/to/default/image.png'}
        alt={podcast.title}
        className="w-48 h-48 object-cover rounded-lg mr-4 animate-fadeIn"
      />
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-oxford-blue">{podcast.title}</h3>
        <p className="text-gray-600 mb-4">{podcast.description}</p>
        <button
          onClick={() => onPlay(podcast)}
          className="flex items-center bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 animate-bounce"
        >
          <PlayIcon className="w-5 h-5 mr-2" />
          Play
        </button>
      </div>
    </div>
  </section>
);

export default FeaturedPodcast;
