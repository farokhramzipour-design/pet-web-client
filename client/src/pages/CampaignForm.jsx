import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Paper, Alert } from '@mui/material';
import { crowdfundingApi } from '../api';

export default function CampaignForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal_amount: '',
    end_date: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await crowdfundingApi.createCampaign({
        ...formData,
        goal_amount: parseFloat(formData.goal_amount)
      });
      navigate('/campaigns');
    } catch (err) {
      setError('Failed to create campaign.');
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Start a Campaign
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Campaign Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            label="Goal Amount ($)"
            name="goal_amount"
            type="number"
            inputProps={{ min: "1", step: "0.01" }}
            value={formData.goal_amount}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="End Date"
            name="end_date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.end_date}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            Create Campaign
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
