import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GenerateSummaryPage from './pages/GenerateSummaryPage';

function App() {
  const [summary, setSummary] = useState(null);  // move summary state here

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setSummary={setSummary} />} />
        <Route path="/generate-summary" element={<GenerateSummaryPage summary={summary} />} />
      </Routes>
    </Router>
  );
}

export default App;
