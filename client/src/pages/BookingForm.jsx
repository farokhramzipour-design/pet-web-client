import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, MenuItem, Paper, Alert, FormControl, InputLabel, Select } from '@mui/material';
import { bookingsApi, petsApi, sitterApi } from '../api';

export default function BookingForm() {
  const { sitterId } = useParams();
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [sitterServices, setSitterServices] = useState([]);
  const [formData, setFormData] = useState({
    pet_id: '',
    service_id: '',
    start_date: '',
    end_date: '',
    is_recurring: false,
    recurrence_days: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    loadInitialData();
  }, [sitterId]);

  const loadInitialData = async () => {
    try {
      const [petsRes, servicesRes] = await Promise.all([
        petsApi.getPets(),
        sitterApi.getServices(sitterId) // Assuming getServices can take a sitterId
      ]);
      setPets(petsRes.data);
      setSitterServices(servicesRes.data);
    } catch (err) {
      console.error("Failed to load data", err);
      setError('Failed to load necessary data for booking.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await bookingsApi.createBooking({
        ...formData,
        pet_id: parseInt(formData.pet_id),
        service_id: parseInt(formData.service_id)
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Pet</InputLabel>
            <Select
              name="pet_id"
              value={formData.pet_id}
              onChange={handleChange}
              label="Select Pet"
              required
            >
              {pets.map((pet) => (
                <MenuItem key={pet.id} value={pet.id}>
                  {pet.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Select Service</InputLabel>
            <Select
              name="service_id"
              value={formData.service_id}
              onChange={handleChange}
              label="Select Service"
              required
            >
              {sitterServices.map((service) => (
                <MenuItem key={service.id} value={service.id}>
                  {service.service_type.replace('_', ' ')} (${service.price})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            label="Start Date"
            name="start_date"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={formData.start_date}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="End Date"
            name="end_date"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={formData.end_date}
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
