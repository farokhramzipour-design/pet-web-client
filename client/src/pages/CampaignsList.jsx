import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, CardActions, Box, LinearProgress, Chip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { crowdfundingApi } from '../api';

export default function CampaignsList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const response = await crowdfundingApi.getCampaigns();
      setCampaigns(response.data);
    } catch (err) {
      console.error('Failed to load campaigns', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = (raised, goal) => {
    if (!goal) return 0;
    return Math.min((raised / goal) * 100, 100);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Crowdfunding Campaigns
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/campaigns/create"
        >
          Start Campaign
        </Button>
      </Box>

      <Grid container spacing={3}>
        {campaigns.map((campaign) => (
          <Grid item xs={12} sm={6} md={4} key={campaign.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div" gutterBottom>
                  {campaign.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}>
                  {campaign.description}
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Raised: ${campaign.current_amount || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Goal: ${campaign.goal_amount}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={calculateProgress(campaign.current_amount || 0, campaign.goal_amount)} 
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Chip 
                    label={campaign.status} 
                    color={campaign.status === 'ACTIVE' ? 'success' : 'default'} 
                    size="small" 
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate(`/campaigns/${campaign.id}`)}>
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        {!loading && campaigns.length === 0 && (
          <Grid item xs={12}>
            <Typography align="center" color="text.secondary">
              No active campaigns found. Be the first to start one!
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
