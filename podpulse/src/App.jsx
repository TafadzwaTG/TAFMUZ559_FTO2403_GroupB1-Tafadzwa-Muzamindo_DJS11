import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowList from "./components/ShowList";
import ShowDetails from "./components/ShowDetails";
import AudioPlayer from "./components/AudioPlayer";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import "./App.css";

function App() {
  const [currentAudio, setCurrentAudio] = useState({
    src: "path/to/audio.mp3",
    title: "Episode Title",
  });

  return (
    <FavoritesProvider>
    <Router>
      <div className="min-h-screen bg-gray-500">
        <Navbar />
        <main className="container mx-auto py-8 px-4 sm:px-6 md:px-8 lg:px-10">
          <Routes>
          
            <Route path="/" element={<HomePage setCurrentAudio={setCurrentAudio} />} />
            <Route
              path="/shows"
              element={<ShowList setCurrentAudio={setCurrentAudio} />}
            />
            <Route
              path="/show/:id"
              element={<ShowDetails setCurrentAudio={setCurrentAudio} />}
            />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>
        <AudioPlayer src={currentAudio.src} title={currentAudio.title} />
      </div>
    </Router>
    </FavoritesProvider>
  );
}

export default App;
