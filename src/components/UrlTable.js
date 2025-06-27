import React from 'react';
import { Box, Typography } from '@mui/material';

const UrlTable = ({ results }) => {
  return (
    <Box mt={3}>
      {results.map((r, idx) => (
        <Typography key={idx}>
          {r.original} → <a href={r.shortened}>{r.shortened}</a> (Expires in: {r.expiry} min)
        </Typography>
      ))}
    </Box>
  );
};

export default UrlTable;
