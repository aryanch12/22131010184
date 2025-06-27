import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const UrlShortenerForm = ({ onShorten }) => {
  const [url, setUrl] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [validity, setValidity] = useState(30);
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    if (!url.trim()) return alert('Please enter a valid URL.');

    const code = shortcode || 'u' + Math.floor(Math.random() * 10000);
    const shortUrl = `http://localhost:3000/${code}`;

    const newEntry = {
      original: url,
      createdAt: new Date().toISOString(),
      expiry: parseInt(validity),
    };

    // Save or update in localStorage
    const stored = JSON.parse(localStorage.getItem('urlData') || '{}');
    stored[code] = newEntry;
    localStorage.setItem('urlData', JSON.stringify(stored));

    setResult({ original: url, shortened: shortUrl, expiry: validity });
    onShorten && onShorten({ original: url, shortened: shortUrl, expiry: validity });

    // Reset form
    setUrl('');
    setShortcode('');
    setValidity(30);
  };

  return (
    <Box p={3} maxWidth={600} mx="auto">
      <Typography variant="h5" gutterBottom>
        🔗 URL Shortener
      </Typography>

      <TextField
        fullWidth
        label="Long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        sx={{ my: 1 }}
      />

      <TextField
        fullWidth
        label="Shortcode (optional)"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
        sx={{ my: 1 }}
      />

      <TextField
        fullWidth
        label="Validity (minutes)"
        type="number"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
        sx={{ my: 1 }}
      />

      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        Generate Short URL
      </Button>

      {result && (
        <Box mt={3}>
          <Typography variant="subtitle1">✅ Shortened Result:</Typography>
          <Typography>
            <strong>Original:</strong> {result.original}
          </Typography>
          <Typography>
            <strong>Short URL:</strong>{' '}
            <a href={result.shortened} target="_blank" rel="noopener noreferrer">
              {result.shortened}
            </a>
          </Typography>
          <Typography>
            <strong>Expires in:</strong> {result.expiry} minutes
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default UrlShortenerForm;

