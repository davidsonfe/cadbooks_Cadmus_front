import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function Footer() {
  return (
    <Box
      component="footer"
      mt={4}
      sx={{
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: '100%',
        mt: 'auto',
      }}
    >
      <Container
        sx={{
          borderTop: '1px solid #35D32F',
          py: 3,
        }}
      >
        <Typography align="center">&copy; By Falcon 🦅 2021</Typography>
      </Container>
    </Box>
  );
}
