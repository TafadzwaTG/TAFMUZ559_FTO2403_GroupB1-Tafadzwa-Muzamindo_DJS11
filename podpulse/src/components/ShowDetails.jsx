import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchShowById } from '../services/api.js';
import SeasonView from './SeasonView.jsx';

const ShowDetail = ({ setCurrentAudio }) => {
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const data = await fetchShowById(id);
        setShow(data);
        if (data.seasons && data.seasons.length > 0) {
          setSelectedSeason(data.seasons[0]);
        }
      } catch (error) {
        console.error('Error fetching show:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, [id]);

  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
  };

  if (loading) {
    return <div className="text-center mt-8 text-oxford-blue">Loading...</div>;
  }

  if (!show) {
    return <div className="text-center mt-8 text-oxford-blue">Show not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-oxford-blue">{show.title}</h1>
      <p className="mb-4 text-gray-700">{show.description}</p>
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-oxford-blue">Seasons</h2>
        <div className="flex flex-wrap gap-2">
          {show.seasons && show.seasons.length > 0 ? (
            show.seasons.map((season) => (
              <button
                key={season.season}
                onClick={() => handleSeasonSelect(season)}
                className={`px-4 py-2 rounded ${
                  selectedSeason && selectedSeason.season === season.season
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-oxford-blue'
                }`}
              >
                Season {season.season}
              </button>
            ))
          ) : (
            <p>No seasons available</p>
          )}
        </div>
      </div>
      {selectedSeason && <SeasonView season={selectedSeason} onSelectEpisode={(episode) => console.log(episode)} />}
    </div>
  );
};

export default ShowDetail;
