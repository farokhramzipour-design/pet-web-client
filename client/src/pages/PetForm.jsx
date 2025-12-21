import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, MenuItem, Paper, Alert, Input } from '@mui/material';
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
    weight: '',
    notes: '',
    status: 'ACTIVE'
  });
  const [imageFile, setImageFile] = useState(null);
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
      const formattedDate = pet.date_of_birth ? new Date(pet.date_of_birth).toISOString().split('T')[0] : '';
      
      setFormData({
        ...pet,
        date_of_birth: formattedDate,
        status: pet.status ? pet.status.toUpperCase() : 'ACTIVE'
      });
    } catch (err) {
      setError('Failed to load pet details.');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isEditMode) {
        // Update logic (PUT) - usually JSON
        const allowedFields = [
          'name', 'pet_type', 'breed', 'gender', 'date_of_birth', 
          'color', 'microchip_id', 'weight', 'notes', 'status',
          'allergies', 'medical_conditions', 'medications'
        ];
        
        const payload = {};
        for (const field of allowedFields) {
          if (formData[field] !== undefined && formData[field] !== null) {
            payload[field] = formData[field];
          }
        }
        payload.weight = payload.weight ? parseFloat(payload.weight) : null;

        await petsApi.updatePet(id, payload);
        
        // If there's a new image in edit mode, upload it separately
        if (imageFile) {
          const imageFormData = new FormData();
          imageFormData.append('image', imageFile);
          imageFormData.append('is_primary', 'true');
          await petsApi.uploadPetImage(id, imageFormData);
        }

      } else {
        // Create logic (POST) - Multipart Form Data
        const data = new FormData();
        data.append('name', formData.name);
        data.append('pet_type', formData.pet_type);
        if (formData.breed) data.append('breed', formData.breed);
        if (formData.gender) data.append('gender', formData.gender);
        if (formData.date_of_birth) data.append('date_of_birth', formData.date_of_birth);
        if (formData.weight) data.append('weight', formData.weight);
        if (formData.color) data.append('color', formData.color);
        if (formData.microchip_id) data.append('microchip_id', formData.microchip_id);
        if (formData.notes) data.append('notes', formData.notes);
        if (imageFile) {
          data.append('image', imageFile);
        }

        await petsApi.addPet(data);
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
            label="Weight (kg)"
            name="weight"
            type="number"
            value={formData.weight}
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
          
          {/* Image Upload Field */}
          <Box sx={{ mt: 2, mb: 1 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Pet Image (Optional)
            </Typography>
            <Input
              type="file"
              onChange={handleImageChange}
              inputProps={{ accept: 'image/*' }}
              fullWidth
            />
            {imageFile && (
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Selected: {imageFile.name}
              </Typography>
            )}
          </Box>

          {isEditMode && (
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
          )}

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
