/* eslint-disable react/prop-types */
import { PlayIcon } from "@heroicons/react/24/solid";

const FeaturedPodcast = ({ podcast, onPlay }) => (
  <section className="my-12 bg-white shadow-lg rounded-lg p-8 animate-fadeIn transition-transform transform hover:scale-105 duration-300">
    {/* Section header with title and play button */}
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-3xl font-bold text-oxford-blue">Featured Podcast</h2>
      <button
        onClick={() => onPlay(podcast)} // Play the selected podcast when button is clicked
        className="flex items-center bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors duration-300"
      >
        <PlayIcon className="w-6 h-6 mr-2" /> {/* Play icon */}
        Play
      </button>
    </div>
    {/* Display podcast image and details */}
    <div className="flex items-center">
      <img
        src={podcast.image || "/path/to/default/image.png"} // Show podcast image or default if none
        alt={podcast.title} // Alt text for accessibility
        className="w-48 h-48 object-cover rounded-lg mr-8 shadow-lg border-4 border-gray-200"
      />
      <div className="flex-1">
        <h3 className="text-2xl font-semibold text-oxford-blue mb-2">
          {podcast.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{podcast.description}</p>
      </div>
    </div>
  </section>
);

export default FeaturedPodcast;
