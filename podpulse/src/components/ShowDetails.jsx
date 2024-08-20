import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchShowById } from '../services/api.js';
import SeasonView from './SeasonView.jsx';

function ShowDetail({ setCurrentAudio }) {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    const fetchShowData = async () => {
      try {
        const data = await fetchShowById(id);
        setShow(data);
        if (data.seasons && data.seasons.length > 0) {
          setSelectedSeason(data.seasons[0]); 
        }
      } catch (error) {
        setError('Failed to fetch show details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowData();
  }, [id]);

  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      {show && (
        <>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-oxford-blue">{show.title}</h1>
          <p className="mb-4 text-gray-700">{show.description}</p>
          <button onClick={() => setCurrentAudio(show.audioUrl)} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
            Play Audio
          </button>

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

          {selectedSeason && (
            <SeasonView season={selectedSeason} onSelectEpisode={(episode) => console.log(episode)} />
          )}
        </>
      )}
    </div>
  );
}

export default ShowDetail;
