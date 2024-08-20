import { useState, useEffect } from 'react';
import { fetchShows, fetchEpisodes } from '../services/api';
import logo from '../assets/images/pd.jpeg';

const HomePage = ({ setCurrentAudio }) => {
  const [episodes, setEpisodes] = useState([]);
  const [randomPodcast, setRandomPodcast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const shows = await fetchShows();
        if (shows.length === 0) {
          throw new Error('No podcasts available');
        }
        const randomIndex = Math.floor(Math.random() * shows.length);
        const randomPodcast = shows[randomIndex];
        setRandomPodcast(randomPodcast);

        const data = await fetchEpisodes(randomPodcast.id);
        if (Array.isArray(data)) {
          setEpisodes(data);
        } else {
          throw new Error('Unexpected data format');
        }
      } catch (err) {
        setError(err.message || 'Failed to load content');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  const handlePlayEpisode = (episode) => {
    setCurrentAudio({ src: episode.audioUrl, title: episode.title });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex items-center space-x-2 text-oxford-blue">
          <svg
            className="animate-spin h-8 w-8 text-orange-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
            ></path>
          </svg>
          <span className="text-lg font-semibold">Loading content...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 md:px-8 lg:px-10 bg-gray-100">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-oxford-blue mb-4">Welcome to</h1>
        <img
          src={logo}
          alt="Podcast Logo"
          className="mx-auto mb-6 w-48 h-48 rounded-full shadow-lg bg-gray-200"
        />
        <p className="text-lg text-gray-700">
          Your gateway to discovering, enjoying, and mastering the world of podcasts. Dive into fresh shows, keep track of your favorites, and savor top-notch audio experiences. Start your podcast adventure now and never miss a beat!
        </p>
      </div>
      {randomPodcast && (
        <section className="my-12 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-oxford-blue mb-4">Featured Podcast</h2>
          <div className="flex items-center">
            <img
              src={randomPodcast.image || logo}
              alt={randomPodcast.title}
              className="w-48 h-48 object-cover rounded-lg mr-4"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-oxford-blue">{randomPodcast.title}</h3>
              <p className="text-gray-600">{randomPodcast.description}</p>
              <button
                onClick={() => handlePlayEpisode(randomPodcast)}
                className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                Play
              </button>
            </div>
          </div>
        </section>
      )}
      <section className="my-12">
        <h2 className="text-2xl font-bold text-oxford-blue mb-4">Latest Episodes</h2>
        <ul className="space-y-4">
          {episodes.length > 0 ? (
            episodes.map((episode) => (
              <li
                key={episode.id}
                className="bg-white shadow-md rounded-lg overflow-hidden p-4"
              >
                <h3 className="text-xl font-semibold text-oxford-blue">{episode.title}</h3>
                <p className="text-gray-600">{episode.description}</p>
                <button
                  onClick={() => handlePlayEpisode(episode)}
                  className="mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                  Play
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No episodes available</p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
