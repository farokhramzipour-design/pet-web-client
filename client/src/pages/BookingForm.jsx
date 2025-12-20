import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, MenuItem, Paper, Alert } from '@mui/material';
import { bookingsApi, petsApi } from '../api';

export default function BookingForm() {
  const { sitterId } = useParams();
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [formData, setFormData] = useState({
    sitter_id: sitterId,
    pet_id: '',
    start_time: '',
    end_time: '',
    service_type: '',
    notes: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      const response = await petsApi.getPets();
      setPets(response.data);
    } catch (err) {
      console.error("Failed to load pets", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await bookingsApi.createBooking({
        ...formData,
        sitter_id: parseInt(sitterId)
      });
      alert('Booking request sent successfully!');
      navigate('/');
    } catch (err) {
      setError('Failed to create booking.');
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Book a Sitter
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            select
            margin="normal"
            required
            fullWidth
            label="Select Pet"
            name="pet_id"
            value={formData.pet_id}
            onChange={handleChange}
          >
            {pets.map((pet) => (
              <MenuItem key={pet.id} value={pet.id}>
                {pet.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            margin="normal"
            required
            fullWidth
            label="Service Type"
            name="service_type"
            value={formData.service_type}
            onChange={handleChange}
          >
            <MenuItem value="dog_walking">Dog Walking</MenuItem>
            <MenuItem value="house_sitting">House Sitting</MenuItem>
            <MenuItem value="drop_in_visit">Drop-in Visit</MenuItem>
          </TextField>

          <TextField
            margin="normal"
            required
            fullWidth
            label="Start Time"
            name="start_time"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={formData.start_time}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="End Time"
            name="end_time"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={formData.end_time}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Notes"
            name="notes"
            multiline
            rows={3}
            value={formData.notes}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            Send Request
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
