import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, CardActions, Box, CircularProgress, Alert } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { petsApi } from '../api';

export default function PetsList() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      const response = await petsApi.getPets();
      setPets(response.data);
    } catch (err) {
      setError('Failed to load pets.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      try {
        await petsApi.deletePet(id);
        setPets(pets.filter(pet => pet.id !== id));
      } catch (err) {
        console.error('Failed to delete pet', err);
        alert('Failed to delete pet');
      }
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          My Pets
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/pets/add"
        >
          Add Pet
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {pets.length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center">
          No pets found. Add your first pet!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {pets.map((pet) => (
            <Grid item xs={12} sm={6} md={4} key={pet.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {pet.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {pet.pet_type} - {pet.breed}
                  </Typography>
                  <Typography variant="body2">
                    Gender: {pet.gender}
                    <br />
                    Status: {pet.status}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" component={RouterLink} to={`/pets/${pet.id}`}>View</Button>
                  <Button size="small" component={RouterLink} to={`/pets/${pet.id}/edit`}>Edit</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(pet.id)}>Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
