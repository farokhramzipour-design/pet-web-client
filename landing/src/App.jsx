import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid, Card, CardContent, CssBaseline, IconButton, Menu, MenuItem, Paper, TextField, InputAdornment, CircularProgress, CardActions, Checkbox, FormControlLabel } from '@mui/material';
import { Search, Favorite, MonetizationOn, Language, LocationOn, ShoppingBag, VolunteerActivism, Home, Luggage, WbSunny, DirectionsWalk, MeetingRoom } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import WagyLogo from './components/WagyLogo';
import LocationPicker from './components/LocationPicker';

// Create RTL cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// Create LTR cache
const cacheLtr = createCache({
  key: 'muiltr',
});

function App() {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMap, setOpenMap] = useState(false);
  const [location, setLocation] = useState(null);
  
  // Search state
  const [petType, setPetType] = useState('dog');
  const [serviceType, setServiceType] = useState('boarding');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dogSize, setDogSize] = useState(null);

  // External Auth URL
  const AUTH_URL = "https://webapp.gp24.ir"; 
  const ADMIN_URL = "http://admin.example.com";

  const isRtl = i18n.language === 'fa';

  useEffect(() => {
    document.dir = isRtl ? 'rtl' : 'ltr';
  }, [isRtl]);

  const theme = createTheme({
    direction: isRtl ? 'rtl' : 'ltr',
    typography: {
      fontFamily: isRtl ? 'Tahoma, Arial, sans-serif' : '"Averta", "Helvetica Neue", Helvetica, Arial, sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    palette: {
      primary: {
        main: '#00c98b', // Wagy Green
        contrastText: '#fff',
      },
      secondary: {
        main: '#fff',
        contrastText: '#333',
      },
      text: {
        primary: '#333',
        secondary: '#666',
      }
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 24,
            padding: '8px 24px',
          },
          containedPrimary: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: '#00a673',
            }
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#fff',
            color: '#333',
          }
        }
      }
    }
  });

  const handleLanguageMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    handleClose();
  };

  const handleLocationSelect = (latlng) => {
    setLocation(latlng);
  };

  const handlePetTypeChange = (type) => {
    setPetType(type);
    if (type === 'cat' && (serviceType === 'dog_walking' || serviceType === 'day_care')) {
      setServiceType('boarding');
    }
  };

  const handleDogSizeChange = (size) => {
    setDogSize(prevSize => prevSize === size ? null : size); // Toggle or set new size
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.append('pet_type', petType);
    params.append('service_type', serviceType);
    if (location) {
      params.append('lat', location.lat);
      params.append('lon', location.lng);
    }
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    
    if (dogSize) {
      params.append('pet_size', dogSize);
    }

    window.location.href = `${AUTH_URL}/login?${params.toString()}`;
  };

  // Define available services based on pet type with icons
  const getServiceOptions = () => {
    const commonServices = [
      { value: 'boarding', label: t('service_boarding'), icon: <Luggage fontSize="large" /> },
      { value: 'house_sitting', label: t('service_house_sitting'), icon: <Home fontSize="large" /> },
      { value: 'drop_in_visit', label: t('service_drop_in'), icon: <MeetingRoom fontSize="large" /> },
    ];

    const dogOnlyServices = [
      { value: 'day_care', label: t('service_day_care'), icon: <WbSunny fontSize="large" /> },
      { value: 'dog_walking', label: t('service_dog_walking'), icon: <DirectionsWalk fontSize="large" /> },
    ];

    if (petType === 'dog') {
      return [...commonServices, ...dogOnlyServices];
    }
    return commonServices;
  };

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <CssBaseline />
          
          {/* Navbar */}
          <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid #eee' }}>
            <Container maxWidth="lg">
              <Toolbar disableGutters>
                <WagyLogo sx={{ mr: 1, color: 'primary.main', fontSize: 40 }} />
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'primary.main', letterSpacing: '-0.5px' }}>
                  {t('app_name')}
                </Typography>
                
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
                  <Button color="inherit" href="#features">{t('nav_features')}</Button>
                  <Button color="inherit" href={`${AUTH_URL}/register`}>{t('nav_signup')}</Button>
                  <Button color="inherit" href={`${AUTH_URL}/login`}>{t('nav_login')}</Button>
                </Box>

                <IconButton
                  size="large"
                  onClick={handleLanguageMenu}
                  color="inherit"
                  sx={{ ml: 1 }}
                >
                  <Language />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
                  <MenuItem onClick={() => changeLanguage('fa')}>فارسی</MenuItem>
                </Menu>
              </Toolbar>
            </Container>
          </AppBar>

          {/* Hero Section with Search Box */}
          <Box sx={{ 
            position: 'relative',
            bgcolor: '#f3f3f3',
            backgroundImage: 'url(https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            py: { xs: 6, md: 12 },
            minHeight: '600px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Box sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              bgcolor: 'rgba(0,0,0,0.3)' 
            }} />
            
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                    {t('hero_title')}
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#fff', mb: 4, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                    {t('hero_subtitle')}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={5} mdOffset={1}>
                  <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                    
                    {/* Pet Type Selection */}
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {t('search_heading')}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                      <FormControlLabel
                        control={
                          <Checkbox 
                            checked={petType === 'dog'} 
                            onChange={() => handlePetTypeChange('dog')}
                            sx={{ '&.Mui-checked': { color: 'primary.main' } }}
                          />
                        }
                        label={t('pet_dog')}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox 
                            checked={petType === 'cat'} 
                            onChange={() => handlePetTypeChange('cat')}
                            sx={{ '&.Mui-checked': { color: 'primary.main' } }}
                          />
                        }
                        label={t('pet_cat')}
                      />
                    </Box>

                    {/* Service Type Selection */}
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                      {t('search_service_label')}
                    </Typography>
                    <Grid container spacing={1} sx={{ mb: 3 }}>
                      {getServiceOptions().map((option) => (
                        <Grid item xs={4} key={option.value}>
                          <Paper
                            elevation={serviceType === option.value ? 0 : 1}
                            variant={serviceType === option.value ? "outlined" : "elevation"}
                            sx={{
                              p: 1,
                              textAlign: 'center',
                              cursor: 'pointer',
                              border: serviceType === option.value ? `2px solid ${theme.palette.primary.main}` : '1px solid transparent',
                              bgcolor: serviceType === option.value ? 'rgba(0, 201, 139, 0.08)' : 'background.paper',
                              color: serviceType === option.value ? 'primary.main' : 'text.secondary',
                              height: '100%',
                              minHeight: '90px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.2s',
                              '&:hover': {
                                borderColor: 'primary.main',
                              }
                            }}
                            onClick={() => setServiceType(option.value)}
                          >
                            {option.icon}
                            <Typography variant="caption" sx={{ mt: 0.5, fontWeight: 'bold', lineHeight: 1.2 }}>
                              {option.label}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>

                    {/* Dog Size Selection (Only if Dog is selected) */}
                    {petType === 'dog' && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                          {t('dog_size_label')}
                        </Typography>
                        <Grid container spacing={1}>
                          {['small', 'medium', 'large', 'giant'].map((size) => (
                            <Grid item xs={3} key={size}>
                              <Paper
                                elevation={dogSize === size ? 0 : 1}
                                variant={dogSize === size ? "outlined" : "elevation"}
                                sx={{
                                  p: 1,
                                  textAlign: 'center',
                                  cursor: 'pointer',
                                  border: dogSize === size ? `2px solid ${theme.palette.primary.main}` : '1px solid transparent',
                                  bgcolor: dogSize === size ? 'rgba(0, 201, 139, 0.08)' : 'background.paper',
                                  color: dogSize === size ? 'primary.main' : 'text.secondary',
                                  transition: 'all 0.2s',
                                }}
                                onClick={() => handleDogSizeChange(size)}
                              >
                                <Typography variant="body2" fontWeight="bold">{t(`size_${size}`)}</Typography>
                                <Typography variant="caption" display="block">{t(`size_${size}_desc`)}</Typography>
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    )}
                    
                    {/* Location Input */}
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                      {t('search_location_label')}
                    </Typography>
                    <TextField 
                      fullWidth 
                      size="small"
                      placeholder={t('search_location_placeholder')}
                      value={location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : ''}
                      onClick={() => setOpenMap(true)}
                      InputProps={{
                        readOnly: true,
                        startAdornment: <InputAdornment position="start"><LocationOn color="action" /></InputAdornment>,
                      }}
                      sx={{ mb: 3 }}
                    />
                    
                    {/* Date Selection */}
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                      {t('search_dates_label')}
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={6}>
                        <TextField 
                          fullWidth 
                          size="small"
                          label={t('search_start_date')}
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField 
                          fullWidth 
                          size="small"
                          label={t('search_end_date')}
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </Grid>
                    </Grid>

                    <Button 
                      variant="contained" 
                      size="large" 
                      fullWidth 
                      onClick={handleSearch}
                      sx={{ py: 1.5, fontSize: '1.1rem' }}
                    >
                      {t('search_btn')}
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* Features Section */}
          <Container id="features" sx={{ py: 8 }}>
            <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: 'bold' }}>
              {t('features_title')}
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Search sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {t('feature_sitters_title')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('feature_sitters_desc')}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Favorite sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {t('feature_health_title')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('feature_health_desc')}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <MonetizationOn sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {t('feature_crowd_title')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('feature_crowd_desc')}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <ShoppingBag sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {t('feature_batch_title')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('feature_batch_desc')}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>

          {/* Static Crowdfunding & Batch Sales Highlight */}
          <Box sx={{ bgcolor: '#fff', py: 8 }}>
            <Container maxWidth="lg">
              <Grid container spacing={6}>
                {/* Crowdfunding Card */}
                <Grid item xs={12} md={6}>
                  <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: 4, overflow: 'hidden', boxShadow: 3 }}>
                    <Box 
                      sx={{ 
                        height: 200, 
                        bgcolor: '#e3f2fd', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}
                    >
                      <VolunteerActivism sx={{ fontSize: 80, color: '#1976d2' }} />
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 4 }}>
                      <Typography variant="h5" gutterBottom fontWeight="bold">
                        {t('crowd_section_title')}
                      </Typography>
                      <Typography paragraph color="text.secondary">
                        {t('crowd_section_desc')}
                      </Typography>
                      <Button variant="outlined" color="primary" href={`${AUTH_URL}/login`}>
                        {t('crowd_btn')}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Batch Sales Card */}
                <Grid item xs={12} md={6}>
                  <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: 4, overflow: 'hidden', boxShadow: 3 }}>
                    <Box 
                      sx={{ 
                        height: 200, 
                        bgcolor: '#e8f5e9', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}
                    >
                      <ShoppingBag sx={{ fontSize: 80, color: '#2e7d32' }} />
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 4 }}>
                      <Typography variant="h5" gutterBottom fontWeight="bold">
                        {t('batch_section_title')}
                      </Typography>
                      <Typography paragraph color="text.secondary">
                        {t('batch_section_desc')}
                      </Typography>
                      <Button variant="outlined" color="success" href={`${AUTH_URL}/login`}>
                        {t('batch_btn')}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* Trust/Safety Section */}
          <Box sx={{ bgcolor: '#f9f9f9', py: 8 }}>
            <Container maxWidth="lg">
              <Grid container spacing={6} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Box 
                    component="img" 
                    src="https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    sx={{ width: '100%', borderRadius: 4, boxShadow: 3 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h4" gutterBottom fontWeight="bold">
                    We're the dog people.
                  </Typography>
                  <Typography paragraph color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                    The Wagy Guarantee: 24/7 support, reservation protection, and verified sitters. We make sure your pet is happy and safe.
                  </Typography>
                  <Button variant="outlined" color="primary" href={`${AUTH_URL}/register`}>
                    Read more about safety
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* Footer */}
          <Box sx={{ bgcolor: '#333', color: '#fff', py: 6, mt: 'auto' }}>
            <Container maxWidth="lg">
              <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <WagyLogo sx={{ color: 'primary.main', fontSize: 32 }} />
                    <Typography variant="h6" fontWeight="bold">{t('app_name')}</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    {t('footer_desc')}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" gutterBottom fontWeight="bold">{t('footer_links')}</Typography>
                  <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                    <li style={{ marginBottom: 8 }}><a href={`${AUTH_URL}/login`} style={{ color: '#fff', textDecoration: 'none', opacity: 0.8 }}>{t('nav_login')}</a></li>
                    <li style={{ marginBottom: 8 }}><a href={`${AUTH_URL}/register`} style={{ color: '#fff', textDecoration: 'none', opacity: 0.8 }}>{t('nav_signup')}</a></li>
                    <li style={{ marginBottom: 8 }}><a href={`${ADMIN_URL}`} style={{ color: '#fff', textDecoration: 'none', opacity: 0.8 }}>Admin Portal</a></li>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" gutterBottom fontWeight="bold">{t('footer_contact')}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    support@wagy.com
                  </Typography>
                </Grid>
              </Grid>
              <Box sx={{ mt: 6, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', pt: 3 }}>
                <Typography variant="body2" sx={{ opacity: 0.5 }}>
                  © {new Date().getFullYear()} {t('app_name')}. {t('footer_rights')}
                </Typography>
              </Box>
            </Container>
          </Box>

          {/* Location Picker Dialog */}
          <LocationPicker 
            open={openMap} 
            onClose={() => setOpenMap(false)} 
            onSelect={handleLocationSelect} 
          />
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
