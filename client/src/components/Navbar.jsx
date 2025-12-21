import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Language } from '@mui/icons-material';
import WagyLogo from './WagyLogo';

export default function Navbar() {
  const { logout, user } = useAuth(); // Assuming user object has role info now?
  // If user object doesn't have role, we might need to fetch profile or decode token.
  // For now, I'll add the link for everyone or check if we can get role.

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
    <AppBar position="static" color="inherit" elevation={1}>
      <Toolbar>
        <WagyLogo sx={{ mr: 1, color: 'primary.main', fontSize: 32 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'primary.main' }}>
          {t('app_name')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button color="inherit" component={RouterLink} to="/">
            {t('dashboard')}
          </Button>
          <Button color="inherit" component={RouterLink} to="/pets">
            {t('my_pets')}
          </Button>
          <Button color="inherit" component={RouterLink} to="/sitters">
            {t('find_sitter')}
          </Button>

          {/* Sitter Dashboard Link - Ideally only show if user is a sitter */}
          <Button color="inherit" component={RouterLink} to="/sitter-dashboard">
            Sitter Mode
          </Button>

          <Button color="inherit" component={RouterLink} to="/campaigns">
            {t('crowdfunding')}
          </Button>
          <Button color="inherit" component={RouterLink} to="/wallet">
            {t('wallet')}
          </Button>
          
          <IconButton
            size="large"
            onClick={handleLanguageMenu}
            color="inherit"
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

          <Button color="error" onClick={handleLogout}>
            {t('logout')}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
