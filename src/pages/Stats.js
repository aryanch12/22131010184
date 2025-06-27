import React from 'react';
import { Box, Typography, Divider, Link } from '@mui/material';

const Stats = () => {
  const urlData = JSON.parse(localStorage.getItem('urlData') || '{}');
  const clickLogs = JSON.parse(localStorage.getItem('clickLogs') || '{}');

  const stats = Object.keys(urlData).map(code => {
    const data = urlData[code];
    const logs = clickLogs[code] || [];

    return {
      shortUrl: `http://localhost:3000/${code}`,
      originalUrl: data.original,
      createdAt: data.createdAt,
      expiresAt: new Date(new Date(data.createdAt).getTime() + data.expiry * 60000).toISOString(),
      clicks: logs.length,
      logs
    };
  });

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>📊 URL Statistics</Typography>

      {stats.length === 0 ? (
        <Typography>No shortened URLs found.</Typography>
      ) : (
        stats.map((url, idx) => (
          <Box key={idx} border={1} borderRadius={2} p={3} mb={4}>
            <Typography><strong>Original URL:</strong> <Link href={url.originalUrl} target="_blank">{url.originalUrl}</Link></Typography>
            <Typography><strong>Short URL:</strong> <Link href={url.shortUrl} target="_blank">{url.shortUrl}</Link></Typography>
            <Typography><strong>Created At:</strong> {new Date(url.createdAt).toLocaleString()}</Typography>
            <Typography><strong>Expires At:</strong> {new Date(url.expiresAt).toLocaleString()}</Typography>
            <Typography><strong>Total Clicks:</strong> {url.clicks}</Typography>

            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Click Log:</Typography>
            {url.logs.length === 0 ? (
              <Typography>No clicks recorded.</Typography>
            ) : (
              url.logs.map((log, i) => (
                <Box key={i} mb={1}>
                  <Typography variant="body2">
                    🔸 {new Date(log.time).toLocaleString()} — <strong>{log.source}</strong> from <em>{log.geo}</em>
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        ))
      )}

      <Box mt={4}>
        <Typography variant="caption" color="textSecondary">
          Afford Medical Technologies Private Limited — B 230 2nd Main Road, Sainikpuri, Hyderabad-500094, Telangana, INDIA. Phone: 91-40-27117068 / 27116133.
        </Typography><br />
        <Typography variant="caption" color="textSecondary">
          Web: <Link href="https://www.affordmed.com" target="_blank">www.affordmed.com</Link> | Email: contact@affordmed.com
        </Typography><br />
        <Typography variant="caption" color="textSecondary">
          CIN: U72200TG2007PTC056067, URN: UDYAM-TS-20-0013532 — <strong>AFFORDMED®</strong> Technology, Innovation & Affordability
        </Typography>
      </Box>
    </Box>
  );
};

export default Stats;
