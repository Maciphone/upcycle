import {createTheme} from '@mui/material/styles';


export const theme = createTheme({
  palette: {
    primary: { main: '#0070f3' },
    secondary: { main: '#1a1a1a' }, 
    background: { default: '#f0f0f0', paper: '#ffffff' },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
});