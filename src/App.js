import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import UrlShortenerForm from './components/UrlShortenerForm';
import Stats from './pages/Stats';

const RedirectPage = () => {
  const { code } = useParams();

  const stored = JSON.parse(localStorage.getItem('urlData') || '{}');
  const item = stored[code];

  if (item) {
    const clickLogs = JSON.parse(localStorage.getItem('clickLogs') || '{}');
    if (!clickLogs[code]) clickLogs[code] = [];

    clickLogs[code].push({
      time: new Date().toISOString(),
      source: navigator.userAgent,
      geo: 'India (Mock)'
    });

    localStorage.setItem('clickLogs', JSON.stringify(clickLogs));

    window.location.href = item.original;
  }

  return <p>Redirecting...</p>;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlShortenerForm />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/:code" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
};

export default App;
