import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardContent, CardActions, Box, MenuItem, Slider, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { sitterApi } from '../api';

export default function SitterSearch() {
  const [sitters, setSitters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    service_type: '',
    min_price: '',
    max_price: '',
    lat: 0, // Default or get from geolocation
    lon: 0,
    radius: 10
  });

  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      // Filter out empty values
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '')
      );
      const response = await sitterApi.searchSitters(params);
      setSitters(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch sitters.');
    } finally {
      setLoading(false);
    }
  };

  // Initial search on load (optional)
  useEffect(() => {
    handleSearch();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Find a Sitter
      </Typography>

      <Card sx={{ p: 2, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Service Type"
              name="service_type"
              value={filters.service_type}
              onChange={handleChange}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="dog_walking">Dog Walking</MenuItem>
              <MenuItem value="house_sitting">House Sitting</MenuItem>
              <MenuItem value="drop_in_visit">Drop-in Visit</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Min Price"
              name="min_price"
              type="number"
              value={filters.min_price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Max Price"
              name="max_price"
              type="number"
              value={filters.max_price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant="contained" fullWidth onClick={handleSearch} disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </Grid>
        </Grid>
      </Card>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={3}>
        {sitters.map((sitter) => (
          <Grid item xs={12} sm={6} md={4} key={sitter.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{sitter.first_name} {sitter.last_name}</Typography>
                <Typography color="text.secondary" gutterBottom>
                  {sitter.bio || "No bio available"}
                </Typography>
                <Typography variant="body2">
                  Rating: {sitter.rating || 'N/A'} ({sitter.reviews_count || 0} reviews)
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" onClick={() => navigate(`/book/${sitter.id}`)}>
                  Book Now
                </Button>
                <Button size="small" onClick={() => navigate(`/sitters/${sitter.id}`)}>
                  View Profile
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        {!loading && sitters.length === 0 && (
          <Grid item xs={12}>
            <Typography align="center" color="text.secondary">
              No sitters found matching your criteria.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
