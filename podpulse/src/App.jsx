import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowList from "./components/ShowList.jsx";
import ShowDetails from "./components/ShowDetails.jsx";
import AudioPlayer from "./components/AudioPlayer.jsx";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-oxford-blue text-white p-4">
          <h1 className="text-2xl font-bold">PodPulse</h1>
        </header>
        <main className="container mx-auto py-8">
          <Routes>
            <Route path="/" element={<ShowList />} />
            <Route path="/show/:id" element={<ShowDetails />} />
          </Routes>
        </main>
        <AudioPlayer src="path/to/audio.mp3" title="Episode Title" />
      </div>
    </Router>
  );
}

export default App;
