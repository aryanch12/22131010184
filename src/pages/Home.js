import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import UrlShortenerForm from '../components/UrlShortenerForm';
import UrlTable from '../components/UrlTable';
import { logEvent } from '../components/Logger';

const Home = () => {
  const [urls, setUrls] = useState([{ original: '', validity: 30, shortcode: '' }]);
  const [results, setResults] = useState([]);

  const addField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { original: '', validity: 30, shortcode: '' }]);
    }
  };

  const handleSubmit = () => {
    logEvent('Submitting URL form', urls);
    const mockShortened = urls.map((u, i) => ({
      original: u.original,
      shortened: `http://localhost:3000/u${i + 1}`,
      expiry: u.validity || 30,
    }));
    setResults(mockShortened);
  };

  return (
    <Box p={3}>
      <Typography variant="h4">URL Shortener</Typography>
      <UrlShortenerForm urls={urls} setUrls={setUrls} handleSubmit={handleSubmit} addField={addField} />
      <UrlTable results={results} />
    </Box>
  );
};

export default Home;