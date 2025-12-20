import React from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';

export default function AdminDashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total Pets
            </Typography>
            <Typography component="p" variant="h4">
              --
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              active on platform
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Active Campaigns
            </Typography>
            <Typography component="p" variant="h4">
              --
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              fundraising now
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Pending Sitters
            </Typography>
            <Typography component="p" variant="h4">
              --
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              awaiting approval
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
