import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Box, List, ListItem, ListItemText, Divider, TextField, MenuItem, Alert, ToggleButton, ToggleButtonGroup, ListItemIcon } from '@mui/material';
import { Pets, Delete } from '@mui/icons-material';
import { sitterApi } from '../api';

export default function SitterDashboard() {
  const [availability, setAvailability] = useState([]);
  const [services, setServices] = useState([]);
  
  // State for new service form
  const [petType, setPetType] = useState('dog');
  const [newService, setNewService] = useState({ service_type: 'boarding', price: '' });
  
  const [newAvailability, setNewAvailability] = useState({ start_time: '', end_time: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [availRes, servRes] = await Promise.all([
        sitterApi.getAvailability(),
        sitterApi.getServices()
      ]);
      setAvailability(availRes.data);
      setServices(servRes.data);
    } catch (err) {
      console.error("Failed to load sitter data", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePetTypeChange = (event, newPetType) => {
    if (newPetType !== null) {
      setPetType(newPetType);
      // Reset service type to a valid default if the current one isn't allowed
      if (newPetType === 'cat' && (newService.service_type === 'dog_walking' || newService.service_type === 'day_care')) {
        setNewService({ ...newService, service_type: 'boarding' });
      }
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      await sitterApi.addService({
        ...newService,
        pet_type: petType, // Sending pet_type to backend
        price: parseFloat(newService.price)
      });
      setNewService({ ...newService, price: '' });
      loadData();
    } catch (err) {
      setError('Failed to add service.');
    }
  };

  const handleAddAvailability = async (e) => {
    e.preventDefault();
    try {
      await sitterApi.addAvailability(newAvailability);
      setNewAvailability({ start_time: '', end_time: '' });
      loadData();
    } catch (err) {
      setError('Failed to add availability.');
    }
  };

  const handleApply = async () => {
    try {
      await sitterApi.applyToBecomeSitter();
      alert('Application submitted!');
    } catch (err) {
      alert('Failed to submit application.');
    }
  };

  // Define available services based on pet type
  const getServiceOptions = () => {
    const commonServices = [
      { value: 'boarding', label: petType === 'dog' ? 'Dog Boarding' : 'Cat Boarding' },
      { value: 'house_sitting', label: 'House Sitting' },
      { value: 'drop_in_visit', label: 'Drop-In Visits' },
    ];

    const dogOnlyServices = [
      { value: 'day_care', label: 'Doggy Day Care' },
      { value: 'dog_walking', label: 'Dog Walking' },
    ];

    if (petType === 'dog') {
      return [...commonServices, ...dogOnlyServices];
    }
    return commonServices;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Sitter Dashboard
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleApply}>
          Re-Submit Application
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={4}>
        {/* Services Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>My Services</Typography>
              <List>
                {services.map((service, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        <Pets color={service.pet_type === 'cat' ? 'secondary' : 'primary'} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={service.service_type.replace(/_/g, ' ').toUpperCase()} 
                        secondary={`${service.pet_type ? service.pet_type.toUpperCase() : 'PET'} - $${service.price}`} 
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
                {services.length === 0 && <Typography color="text.secondary">No services added yet.</Typography>}
              </List>

              <Box component="form" onSubmit={handleAddService} sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>Add New Service</Typography>
                
                <Box sx={{ mb: 2 }}>
                  <ToggleButtonGroup
                    value={petType}
                    exclusive
                    onChange={handlePetTypeChange}
                    aria-label="pet type"
                    fullWidth
                    size="small"
                  >
                    <ToggleButton value="dog">Dog</ToggleButton>
                    <ToggleButton value="cat">Cat</ToggleButton>
                  </ToggleButtonGroup>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      label="Service Type"
                      value={newService.service_type}
                      onChange={(e) => setNewService({...newService, service_type: e.target.value})}
                    >
                      {getServiceOptions().map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Price ($)"
                      type="number"
                      value={newService.price}
                      onChange={(e) => setNewService({...newService, price: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="outlined" fullWidth>Add Service</Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Availability Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>My Availability</Typography>
              <List>
                {availability.map((slot, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText 
                        primary={`${new Date(slot.start_time).toLocaleString()} - ${new Date(slot.end_time).toLocaleString()}`} 
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
                {availability.length === 0 && <Typography color="text.secondary">No availability set.</Typography>}
              </List>

              <Box component="form" onSubmit={handleAddAvailability} sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>Add Availability Block</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Start"
                      type="datetime-local"
                      InputLabelProps={{ shrink: true }}
                      value={newAvailability.start_time}
                      onChange={(e) => setNewAvailability({...newAvailability, start_time: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="End"
                      type="datetime-local"
                      InputLabelProps={{ shrink: true }}
                      value={newAvailability.end_time}
                      onChange={(e) => setNewAvailability({...newAvailability, end_time: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="outlined" fullWidth>Add Availability</Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
