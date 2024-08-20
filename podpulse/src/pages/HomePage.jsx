import { useState, useEffect } from "react";
import { fetchShows, fetchEpisodes } from "../services/api";
import imageUrl from "../assets/images/pd.jpeg";

const HomePage = () => {
  const [episodes, setEpisodes] = useState([]);
  const [randomPodcast, setRandomPodcast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Fetch all shows to get a random podcast
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
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
              d="M4 12a8 8 0 018-0v8h8a8 8 0 11-16 0z"
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
    <div className="container mx-auto py-8 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-oxford-blue mb-4">
          Welcome to PodPulse!
        </h1>
        <img
          src={imageUrl}
          alt="Podcast Logo"
          className="mx-auto mb-6 w-48 h-48"
        />
        <p className="text-lg text-gray-700">
          Your gateway to discovering, enjoying, and mastering the world of
          podcasts. Dive into fresh shows, keep track of your favorites, and
          savor top-notch audio experiences. Start your podcast adventure now
          and never miss a beat!
        </p>
      </div>
      {randomPodcast && (
        <section className="my-12">
          <h2 className="text-2xl font-bold text-oxford-blue mb-4">
            Featured Podcast
          </h2>
          <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 flex items-center">
            <img
              src={randomPodcast.image || imageUrl}
              alt={randomPodcast.title}
              className="w-48 h-48 object-cover rounded-lg mr-4"
            />
            <div>
              <h3 className="text-xl font-semibold text-oxford-blue">
                {randomPodcast.title}
              </h3>
              <p className="text-gray-600">{randomPodcast.description}</p>
            </div>
          </div>
        </section>
      )}
      <section className="my-12">
        <h2 className="text-2xl font-bold text-oxford-blue mb-4">
          Latest Episodes
        </h2>
        <ul className="space-y-4">
          {episodes.length > 0 ? (
            episodes.map((episode) => (
              <li
                key={episode.id}
                className="bg-white shadow-md rounded-lg overflow-hidden p-4"
              >
                <h3 className="text-xl font-semibold text-oxford-blue">
                  {episode.title}
                </h3>
                <p className="text-gray-600">{episode.description}</p>
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
