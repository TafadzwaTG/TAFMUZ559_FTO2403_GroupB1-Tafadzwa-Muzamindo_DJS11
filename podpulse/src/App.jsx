import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowList from './components/ShowList';
import ShowDetails from './components/ShowDetails';
import AudioPlayer from './components/AudioPlayer';
import FavoritesPage from './pages/FavoritesPage';
import HomePage from './components/HomePage/HomePage';
import GenrePage from './pages/GenrePage'; 
import Navbar from './components/Navbar';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { fetchShows } from './services/api';
import './App.css';

function App() {
  const [currentAudio, setCurrentAudio] = useState({
    src: 'path/to/audio.mp3',
    title: 'Episode Title',
  });
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const loadShows = async () => {
      const data = await fetchShows();
      setShows(data);
    };
    loadShows();
  }, []);

  const handlePlayAudio = (audioData) => {
    setCurrentAudio(audioData);
  };

  return (
    <FavoritesProvider>
      <Router>
        <div className="min-h-screen bg-gray-500 flex flex-col">
          <Navbar />
          <main className="container mx-auto py-8 px-4 sm:px-6 md:px-8 lg:px-10 flex-grow">
            <Routes>
              <Route
                path="/"
                element={<HomePage shows={shows} onPlayAudio={handlePlayAudio} />}
              />
              <Route
                path="/shows"
                element={<ShowList shows={shows} onPlayAudio={handlePlayAudio} />}
              />
              <Route
                path="/show/:id"
                element={<ShowDetails onPlayAudio={handlePlayAudio} />}
              />
              <Route
                path="/favorites"
                element={<FavoritesPage />}
              />
              <Route
                path="/genre/:genreId"
                element={<GenrePage />}
              />
            </Routes>
          </main>
          <AudioPlayer src={currentAudio.src} title={currentAudio.title} />
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
