import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowList from "./components/ShowList.jsx";
import ShowDetails from "./components/ShowDetails.jsx";
import AudioPlayer from "./components/AudioPlayer.jsx";
import Favorites from './components/Favorites.jsx';
import Navbar from './components/Navbar.jsx';

import "./App.css"

function App() {
  const [currentAudio, setCurrentAudio] = useState({
    src: 'path/to/audio.mp3',
    title: 'Episode Title',
  });

  return (
    <Router>
      <div className="min-h-screen bg-gray-500">
        <Navbar /> 
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
