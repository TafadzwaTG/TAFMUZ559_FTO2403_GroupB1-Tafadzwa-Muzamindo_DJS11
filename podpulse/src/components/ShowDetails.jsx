import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchShowByid } from "../services/api";


const ShowDetail = () => {
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchShowByid(id)
      .then((data) => {
        setShow(data);
        setSelectedSeason(data.seasons[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching show:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <div className="text-center mt-8 text-oxford-blue">Loading...</div>;
  if (!show)
    return (
      <div className="text-center mt-8 text-oxford-blue">Show not found</div>
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-oxford-blue">{show.title}</h1>
      <p className="mb-4 text-gray-700">{show.description}</p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 text-oxford-blue">Seasons</h2>
        <div className="flex space-x-2">
          {show.seasons.map((season) => (
            <button
              key={season.season}
              onClick={() => setSelectedSeason(season)}
              className={`px-4 py-2 rounded ${
                selectedSeason === season
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-oxford-blue"
              }`}
            >
              Season {season.season}
            </button>
          ))}
        </div>
      </div>
      {selectedSeason && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-oxford-blue">
            Season {selectedSeason.season} Episodes
          </h3>
          <ul className="space-y-2">
            {selectedSeason.episodes.map((episode) => (
              <li
                key={episode.episode}
                className="bg-white shadow rounded p-2 text-gray-700"
              >
                {episode.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShowDetail;
