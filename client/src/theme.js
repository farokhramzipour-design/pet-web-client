import { createTheme } from '@mui/material/styles';

// Function to create theme based on direction (ltr/rtl)
export const createWagyTheme = (direction = 'ltr') => {
  return createTheme({
    direction: direction,
    typography: {
      fontFamily: direction === 'rtl' ? 'Tahoma, Arial, sans-serif' : '"Averta", "Helvetica Neue", Helvetica, Arial, sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
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
      background: {
        default: '#f9f9f9',
        paper: '#fff',
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
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            borderRadius: 12,
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          rounded: {
            borderRadius: 12,
          }
        }
      }
    }
  });
};
