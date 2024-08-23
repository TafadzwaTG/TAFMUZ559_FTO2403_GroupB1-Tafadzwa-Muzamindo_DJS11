/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  fetchShows,
  fetchEpisodes,
  fetchPreviews,
  fetchFavorites,
  addFavorite,
  removeFavorite,
} from "../../services/api";
import logo from "../../assets/images/pd.jpeg";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import FeaturedPodcast from "./FeaturedPodcast";
import EpisodeList from "./EpisodeList";
import GenreFilter from "../GenreFilter";

const HomePage = ({ setCurrentAudio }) => {
  // State to store episodes, random podcast, latest episodes, loading status, and error message
  // eslint-disable-next-line no-unused-vars
  const [episodes, setEpisodes] = useState([]);
  const [randomPodcast, setRandomPodcast] = useState(null);
  const [latestEpisodes, setLatestEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to load content asynchronously
    const loadContent = async () => {
      setIsLoading(true); // Set loading to true before fetching data
      try {
        // Fetch all shows (podcasts)
        const shows = await fetchShows();
        if (shows.length === 0) throw new Error("No podcasts available");

        // Select a random podcast
        const randomIndex = Math.floor(Math.random() * shows.length);
        const selectedPodcast = shows[randomIndex];
        setRandomPodcast(selectedPodcast);

        // Fetch episodes for the selected podcast
        const episodeData = await fetchEpisodes(selectedPodcast.id);
        setEpisodes(episodeData);

        // Fetch and shuffle preview episodes, then select the latest ones
        const previewData = await fetchPreviews();
        const shuffledPreviews = previewData.sort(() => 0.5 - Math.random());
        const latestPreviewEpisodes = shuffledPreviews.slice(0, 5);
        setLatestEpisodes(latestPreviewEpisodes);

        // Fetch favorite episodes
        const favoriteEpisodes = await fetchFavorites();
        console.log("Favorite episodes:", favoriteEpisodes);
      } catch (err) {
        // Set error message if fetching fails
        setError(err.message || "Failed to load content");
        console.error(err);
      } finally {
        // Set loading to false after fetching is done
        setIsLoading(false);
      }
    };

    loadContent(); // Call the function to load content
  }, []);

  // Function to handle playing an episode
  const handlePlayEpisode = (episode) => {
    if (setCurrentAudio) {
      setCurrentAudio({ src: episode.audioUrl, title: episode.title });
    } else {
      console.error("setCurrentAudio is not defined");
    }
  };

  // Function to get description of how recent an episode is
  const getEpisodeAgeDescription = (episode) => {
    const now = new Date();
    const episodeDate = new Date(episode.published);
    const diffInDays = Math.floor((now - episodeDate) / (1000 * 60 * 60 * 24));
    return diffInDays < 7
      ? "New"
      : diffInDays < 30
        ? "Recent"
        : diffInDays < 365
          ? "A few months ago"
          : "Over a year ago";
  };

  // Add age description to each episode
  const latestEpisodesWithDescription = latestEpisodes.map((episode) => ({
    ...episode,
    ageDescription: getEpisodeAgeDescription(episode),
  }));

  // Show loading spinner if content is still loading
  if (isLoading) return <LoadingSpinner />;
  // Show error message if there was an error loading content
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 md:px-8 lg:px-10 bg-gray-300">
      {/* Page title and logo */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-oxford-blue mb-4">
          Catch the Pulse of Trending Podcasts
        </h1>
        <img
          src={logo}
          alt="Podcast Logo"
          className="mx-auto mb-6 w-48 h-48 rounded-full shadow-lg bg-gray-200 animate-pulse"
        />
      </div>
      <GenreFilter /> {/* Genre filter component */}
      {randomPodcast && (
        <FeaturedPodcast podcast={randomPodcast} onPlay={handlePlayEpisode} />
      )}
      <EpisodeList
        episodes={latestEpisodesWithDescription}
        title="Latest Episodes"
        onPlay={handlePlayEpisode}
        onToggleFavorite={(episode) => {
          // Toggle favorite status of the episode
          const isFavorite = localStorage
            .getItem("favoriteEpisodes")
            ?.includes(episode.id);
          if (isFavorite) {
            removeFavorite(episode);
          } else {
            addFavorite(episode);
          }
        }}
      />
    </div>
  );
};

export default HomePage;
