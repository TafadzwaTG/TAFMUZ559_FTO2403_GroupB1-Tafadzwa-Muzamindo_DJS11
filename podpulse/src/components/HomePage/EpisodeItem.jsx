/* eslint-disable react/prop-types */
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const EpisodeItem = ({ episode }) => (
  <li
    key={episode.id}
    className="bg-white shadow-md rounded-lg overflow-hidden animate-fadeInUp"
  >
    <Link
     
      to={`/show/${episode.showId}/season/${episode.season}/episode/${episode.id}`}
      className="block p-4 hover:bg-gray-100"
    >
      <div className="flex items-center">
        <img
          src={episode.image || 'path/to/placeholder/image.png'}
          alt={episode.title}
          className="w-16 h-16 object-cover rounded-lg animate-fadeIn"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-oxford-blue">
            {episode.title}
          </h2>
          <p className="text-gray-600">Show ID: {episode.showId}</p>
          <p className="text-gray-600">Season: {episode.season}</p>
          <p className="text-gray-600">Episode: {episode.ageDescription}</p>
        </div>
        <ChevronRightIcon className="w-6 h-6 text-gray-400 ml-auto" />
      </div>
    </Link>
  </li>
);

export default EpisodeItem;
