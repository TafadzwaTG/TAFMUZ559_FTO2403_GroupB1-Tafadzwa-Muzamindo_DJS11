import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowList from "./components/ShowList.jsx";
import ShowDetails from "./components/ShowDetails.jsx";
import AudioPlayer from "./components/AudioPlayer.jsx";
import Favorites from './components/Favorites.jsx';
import "./index.css";

function App() {
  const [currentAudio, setCurrentAudio] = useState({
    src: 'path/to/audio.mp3',
    title: 'Episode Title',
  });

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-oxford-blue text-white p-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">PodPulse</h1>
        </header>
        <main className="container mx-auto py-8 px-4 sm:px-6 md:px-8 lg:px-10">
          <Routes>
            <Route path="/" element={<ShowList setCurrentAudio={setCurrentAudio} />} />
            <Route path="/show/:id" element={<ShowDetails setCurrentAudio={setCurrentAudio} />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        <AudioPlayer src={currentAudio.src} title={currentAudio.title} />
      </div>
    </Router>
  );
}

export default App;
