import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;