import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, LinearProgress, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Alert, List, ListItem, ListItemText, Divider } from '@mui/material';
import { crowdfundingApi } from '../api';

export default function CampaignDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openContribute, setOpenContribute] = useState(false);
  const [contributionAmount, setContributionAmount] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [campRes, contribRes] = await Promise.all([
        crowdfundingApi.getCampaign(id),
        crowdfundingApi.getCampaignContributions(id)
      ]);
      setCampaign(campRes.data);
      setContributions(contribRes.data);
    } catch (err) {
      console.error("Failed to load campaign details", err);
    } finally {
      setLoading(false);
    }
  };

  const handleContribute = async () => {
    try {
      await crowdfundingApi.contributeToCampaign(id, { amount: parseFloat(contributionAmount) });
      setOpenContribute(false);
      setContributionAmount('');
      loadData(); // Refresh data
      alert('Thank you for your contribution!');
    } catch (err) {
      console.error(err);
      alert('Contribution failed. Please check your wallet balance.');
    }
  };

  if (loading) return <Box sx={{ p: 4 }}>Loading...</Box>;
  if (!campaign) return <Box sx={{ p: 4 }}>Campaign not found.</Box>;

  const progress = Math.min(((campaign.current_amount || 0) / campaign.goal_amount) * 100, 100);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {campaign.title}
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6" color="primary">
              ${campaign.current_amount || 0} raised
            </Typography>
            <Typography variant="h6" color="text.secondary">
              of ${campaign.goal_amount} goal
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ height: 15, borderRadius: 5 }}
          />
        </Box>

        <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap' }}>
          {campaign.description}
        </Typography>

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            size="large" 
            onClick={() => setOpenContribute(true)}
            disabled={campaign.status !== 'ACTIVE'}
          >
            Contribute Now
          </Button>
          <Button variant="outlined" onClick={() => navigate('/campaigns')}>
            Back to Campaigns
          </Button>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Recent Contributions</Typography>
        <List>
          {contributions.length === 0 ? (
            <Typography color="text.secondary">No contributions yet.</Typography>
          ) : (
            contributions.map((contrib, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText 
                    primary={`$${contrib.amount}`} 
                    secondary={new Date(contrib.created_at).toLocaleDateString()} 
                  />
                </ListItem>
                {index < contributions.length - 1 && <Divider />}
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>

      {/* Contribution Dialog */}
      <Dialog open={openContribute} onClose={() => setOpenContribute(false)}>
        <DialogTitle>Contribute to {campaign.title}</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Enter the amount you wish to contribute. Funds will be deducted from your wallet.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Amount ($)"
            type="number"
            fullWidth
            variant="standard"
            value={contributionAmount}
            onChange={(e) => setContributionAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenContribute(false)}>Cancel</Button>
          <Button onClick={handleContribute} variant="contained">Contribute</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
