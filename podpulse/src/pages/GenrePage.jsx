import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPreviews } from '../services/api';
import LoadingSpinner from '../components/HomePage/LoadingSpinner';
import ErrorMessage from '../components/HomePage/ErrorMessage';
import EpisodeList from '../components/HomePage/EpisodeList';
import { genreMapping } from '../constants/GenreMapping';

const GenrePage = () => {
  const { genreId } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGenreContent = async () => {
      setIsLoading(true);
      try {
        const previews = await fetchPreviews();
        const filteredEpisodes = previews
          .filter(preview => preview.genreIds && preview.genreIds.includes(Number(genreId)))
          .map(preview => preview.episodes)
          .flat();
        setEpisodes(filteredEpisodes);
      } catch (err) {
        setError(err.message || 'Failed to load genre content');
      } finally {
        setIsLoading(false);
      }
    };

    loadGenreContent();
  }, [genreId]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 md:px-8 lg:px-10 bg-gray-300">
      <h1 className="text-2xl font-bold text-oxford-blue mb-4">
        Episodes in Genre: {genreMapping[genreId] || 'Unknown Genre'}
      </h1>
      {episodes.length === 0 ? (
        <p className="text-gray-700">No episodes available for this genre.</p>
      ) : (
        <EpisodeList
          episodes={episodes}
          title={`Episodes in ${genreMapping[genreId] || 'Genre'}`}
          onPlay={(episode) => {
           
          }}
        />
      )}
    </div>
  );
};

export default GenrePage;
