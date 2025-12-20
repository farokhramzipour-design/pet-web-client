import React, { useEffect, useState } from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Chip } from '@mui/material';
import { Delete, Block, Visibility } from '@mui/icons-material';
import { adminApi } from '../api';

export default function AdminPets() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      const response = await adminApi.getAllPets();
      setPets(response.data);
    } catch (err) {
      console.error("Failed to load pets", err);
    }
  };

  const handleDisable = async (id) => {
    if (window.confirm('Are you sure you want to disable this pet profile?')) {
      try {
        await adminApi.disablePet(id);
        loadPets();
      } catch (err) {
        console.error("Failed to disable pet", err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to PERMANENTLY delete this pet? This cannot be undone.')) {
      try {
        await adminApi.deletePet(id);
        setPets(pets.filter(p => p.id !== id));
      } catch (err) {
        console.error("Failed to delete pet", err);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Pets
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pets.map((pet) => (
              <TableRow key={pet.id}>
                <TableCell>{pet.id}</TableCell>
                <TableCell>{pet.name}</TableCell>
                <TableCell>{pet.pet_type}</TableCell>
                <TableCell>{pet.owner_id}</TableCell>
                <TableCell>
                  <Chip 
                    label={pet.status} 
                    color={pet.status === 'ACTIVE' ? 'success' : 'default'} 
                    size="small" 
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="warning" onClick={() => handleDisable(pet.id)} title="Disable">
                    <Block />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(pet.id)} title="Delete">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {pets.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">No pets found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
