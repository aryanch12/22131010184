import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const UrlStats = ({ data }) => {
  return data.map((item, i) => (
    <Box key={i} border={1} p={2} my={2}>
      <Typography><b>Short URL:</b> {item.shortUrl}</Typography>
      <Typography><b>Created:</b> {item.created}</Typography>
      <Typography><b>Expires:</b> {item.expiry}</Typography>
      <Typography><b>Total Clicks:</b> {item.clicks}</Typography>
      <Divider sx={{ my: 1 }} />
      {item.logs.map((log, j) => (
        <Typography key={j}>
          {log.time} from {log.source} in {log.geo}
        </Typography>
      ))}
    </Box>
  ));
};

export default UrlStats;