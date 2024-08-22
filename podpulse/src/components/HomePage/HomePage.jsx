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
  const [episodes, setEpisodes] = useState([]);
  const [randomPodcast, setRandomPodcast] = useState(null);
  const [latestEpisodes, setLatestEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      try {
        const shows = await fetchShows();
        if (shows.length === 0) throw new Error("No podcasts available");
        const randomIndex = Math.floor(Math.random() * shows.length);
        const selectedPodcast = shows[randomIndex];
        setRandomPodcast(selectedPodcast);

        const episodeData = await fetchEpisodes(selectedPodcast.id);
        setEpisodes(episodeData);

        const previewData = await fetchPreviews();
        const shuffledPreviews = previewData.sort(() => 0.5 - Math.random());
        const latestPreviewEpisodes = shuffledPreviews.slice(0, 5);
        setLatestEpisodes(latestPreviewEpisodes);

        const favoriteEpisodes = await fetchFavorites();
        console.log("Favorite episodes:", favoriteEpisodes);
      } catch (err) {
        setError(err.message || "Failed to load content");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  const handlePlayEpisode = (episode) => {
    if (setCurrentAudio) {
      setCurrentAudio({ src: episode.audioUrl, title: episode.title });
    } else {
      console.error("setCurrentAudio is not defined");
    }
  };

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

  const latestEpisodesWithDescription = latestEpisodes.map((episode) => ({
    ...episode,
    ageDescription: getEpisodeAgeDescription(episode),
  }));

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 md:px-8 lg:px-10 bg-gray-300">
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

      <GenreFilter />

      {randomPodcast && (
        <FeaturedPodcast podcast={randomPodcast} onPlay={handlePlayEpisode} />
      )}

      <EpisodeList
        episodes={latestEpisodesWithDescription}
        title="Latest Episodes"
        onPlay={handlePlayEpisode}
        onToggleFavorite={(episode) => {
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