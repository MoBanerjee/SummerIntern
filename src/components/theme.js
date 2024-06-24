// theme.js
import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#1976d2',
        },
        neutral: {
          main: '#64748B',
          contrastText: '#fff',
        },
        
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#90caf9',
        },
        neutral: {
          main: '#64748B',
          contrastText: '#fff',
        },
        
      },
    },
  },
});

export default theme;
