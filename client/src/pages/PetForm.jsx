import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, MenuItem, Paper, Alert } from '@mui/material';
import { petsApi } from '../api';

export default function PetForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    pet_type: '',
    breed: '',
    gender: '',
    date_of_birth: '',
    color: '',
    microchip_id: '',
    notes: '',
    status: 'ACTIVE'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      loadPet();
    }
  }, [id]);

  const loadPet = async () => {
    try {
      const response = await petsApi.getPet(id);
      const pet = response.data;
      // Format date for input field (YYYY-MM-DD)
      const formattedDate = pet.date_of_birth ? new Date(pet.date_of_birth).toISOString().split('T')[0] : '';
      
      setFormData({
        ...pet,
        date_of_birth: formattedDate
      });
    } catch (err) {
      setError('Failed to load pet details.');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isEditMode) {
        await petsApi.updatePet(id, formData);
      } else {
        await petsApi.addPet(formData);
      }
      navigate('/pets');
    } catch (err) {
      setError('Failed to save pet. Please check your input.');
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {isEditMode ? 'Edit Pet' : 'Add New Pet'}
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Type (e.g., Dog, Cat)"
            name="pet_type"
            value={formData.pet_type}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Breed"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
          />
          <TextField
            select
            margin="normal"
            fullWidth
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </TextField>
          <TextField
            margin="normal"
            fullWidth
            label="Date of Birth"
            name="date_of_birth"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.date_of_birth}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Microchip ID"
            name="microchip_id"
            value={formData.microchip_id}
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
          <TextField
            select
            margin="normal"
            fullWidth
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="ARCHIVED">Archived</MenuItem>
          </TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            {isEditMode ? 'Update Pet' : 'Add Pet'}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 1 }}
            onClick={() => navigate('/pets')}
          >
            Cancel
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
