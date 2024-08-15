import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowList from './components/ShowList';
import ShowDetail from './components/ShowDetails';

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
          <Route path="/show/:id" element={<ShowDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
