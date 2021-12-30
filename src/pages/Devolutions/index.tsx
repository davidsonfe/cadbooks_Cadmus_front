import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Footer from '../../components/Footer';
import { Header } from '../../components/Header';
import { Title } from '../../components/Title';

export default function Devolutions() {
  return (
    <>
      <Header />
      <Container sx={{ pb: 6 }}>
        <Title title="Devoluções" />

        <Stack
          component="form"
          spacing={5}
          sx={{ maxWidth: '400px', mx: 'auto' }}
        >
          <Box>
            <Typography>Identificação da cópia:</Typography>
            <TextField
              required
              fullWidth
              sx={{ '& input': { color: 'black' }, mt: '8px' }}
            />
          </Box>
          <Box>
            <Typography>Data de devolução:</Typography>
            <TextField
              required
              fullWidth
              type="date"
              sx={{ '& input': { color: 'black' }, mt: '8px' }}
            />
          </Box>
          <Button variant="contained" sx={{ py: 1.5 }}>
            Devolver
          </Button>
          <Box>
            <Typography variant="h6" color="error" align="center">
              Devolução em atraso
            </Typography>
            <Typography variant="h5" color="error" align="center">
              Multa no valor de: R$2,50
            </Typography>
          </Box>
        </Stack>
      </Container>
      <Footer />
    </>
  );
}
