import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid, Card, CardContent, CssBaseline, IconButton, Menu, MenuItem } from '@mui/material';
import { Pets, Search, Favorite, MonetizationOn, Language } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

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
  
  // Replace these URLs with your actual deployed domains
  const CLIENT_URL = "http://client.example.com"; 
  const ADMIN_URL = "http://admin.example.com";

  const isRtl = i18n.language === 'fa';

  useEffect(() => {
    document.dir = isRtl ? 'rtl' : 'ltr';
  }, [isRtl]);

  const theme = createTheme({
    direction: isRtl ? 'rtl' : 'ltr',
    typography: {
      fontFamily: isRtl ? 'Tahoma, Arial, sans-serif' : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
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

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <CssBaseline />
          
          {/* Navbar */}
          <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #eee' }}>
            <Toolbar>
              <Pets sx={{ mr: 2, ml: 2, color: 'primary.main' }} />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'text.primary' }}>
                {t('app_name')}
              </Typography>
              
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
                <Button color="inherit" href="#features">{t('nav_features')}</Button>
                <Button color="inherit" href="#about">{t('nav_about')}</Button>
                <Button variant="outlined" href={`${CLIENT_URL}/login`}>
                  {t('nav_login')}
                </Button>
                <Button variant="contained" href={`${CLIENT_URL}/register`}>
                  {t('nav_signup')}
                </Button>
              </Box>

              <IconButton
                size="large"
                aria-label="change language"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleLanguageMenu}
                color="inherit"
                sx={{ ml: 1, mr: 1 }}
              >
                <Language />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
                <MenuItem onClick={() => changeLanguage('fa')}>فارسی</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>

          {/* Hero Section */}
          <Box sx={{ bgcolor: 'primary.light', color: 'primary.contrastText', py: 8, textAlign: 'center' }}>
            <Container maxWidth="md">
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                {t('hero_title')}
              </Typography>
              <Typography variant="h5" paragraph sx={{ mb: 4 }}>
                {t('hero_subtitle')}
              </Typography>
              <Button variant="contained" color="secondary" size="large" href={`${CLIENT_URL}/register`} sx={{ px: 4, py: 1.5, fontSize: '1.2rem' }}>
                {t('hero_cta')}
              </Button>
            </Container>
          </Box>

          {/* Features Section */}
          <Container id="features" sx={{ py: 8 }}>
            <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
              {t('features_title')}
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                  <Search sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                      {t('feature_sitters_title')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('feature_sitters_desc')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                  <Favorite sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
                  <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                      {t('feature_health_title')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('feature_health_desc')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                  <MonetizationOn sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                  <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                      {t('feature_crowd_title')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('feature_crowd_desc')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>

          {/* Call to Action */}
          <Box sx={{ bgcolor: 'grey.100', py: 8, textAlign: 'center' }}>
            <Container maxWidth="sm">
              <Typography variant="h4" gutterBottom>
                {t('cta_title')}
              </Typography>
              <Typography paragraph color="text.secondary">
                {t('cta_desc')}
              </Typography>
              <Button variant="contained" size="large" href={`${CLIENT_URL}/register`}>
                {t('cta_button')}
              </Button>
            </Container>
          </Box>

          {/* Footer */}
          <Box sx={{ bgcolor: 'text.primary', color: 'background.paper', py: 4, mt: 'auto' }}>
            <Container maxWidth="lg">
              <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" gutterBottom>{t('app_name')}</Typography>
                  <Typography variant="body2">
                    {t('footer_desc')}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" gutterBottom>{t('footer_links')}</Typography>
                  <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                    <li><Button color="inherit" href={`${CLIENT_URL}/login`}>{t('nav_login')}</Button></li>
                    <li><Button color="inherit" href={`${ADMIN_URL}`}>Admin Portal</Button></li>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" gutterBottom>{t('footer_contact')}</Typography>
                  <Typography variant="body2">
                    support@petwebapp.com
                  </Typography>
                </Grid>
              </Grid>
              <Box sx={{ mt: 4, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', pt: 2 }}>
                <Typography variant="body2">
                  © {new Date().getFullYear()} {t('app_name')}. {t('footer_rights')}
                </Typography>
              </Box>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
