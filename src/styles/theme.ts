import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#35D32F',
      contrastText: '#F1F0F5',
    },
    secondary: {
      main: '#114D9A',
    },
    text: {
      primary: '#F1F0F5',
      secondary: '#222',
    },
  },
  typography: {
    h1: {
      fontFamily: 'Poppins',
    },
    h2: {
      fontFamily: 'Poppins',
    },
    h3: {
      fontFamily: 'Poppins',
    },
    h4: {
      fontFamily: 'Poppins',
    },
    h5: {
      fontFamily: 'Poppins',
    },
    h6: {
      fontFamily: 'Poppins',
    },
    button: {
      fontFamily: 'Poppins',
      color: '#F1F0F5',
    },
    allVariants: {
      color: '#F1F0F5',
      lineHeight: 1.3,
    },
    // body1: {
    //   color: '#222',
    // },
  },
});
