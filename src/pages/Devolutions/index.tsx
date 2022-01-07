import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../../components/Footer';
import { Header } from '../../components/Header';
import { Title } from '../../components/Title';
import { UserContext } from '../../contexts/UserContext';
import { api } from '../../services/api';

export default function Devolutions() {
  const [bookId, setBookId] = useState('');
  const [penalty, setPenalty] = useState('');

  const navigate = useNavigate();

  const { userToken } = useContext(UserContext);

  async function devolution() {
    if (userToken) {
      try {
        const response = await api.post(
          '/devolution/register',
          {
            isn_id_cop: bookId,
          },
          {
            headers: { Authorization: 'Bearer ' + userToken },
          }
        );

        if (response.status === 200) {
          toast.success('Obra devolvida com sucesso');

          if (response.data.penalty) {
            const penaltyFormated = response.data.penalty.toFixed(2);
            setPenalty(penaltyFormated);
          }
          if (!response.data.penalty) {
            navigate('/painel');
          }
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }

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
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              sx={{ '& input': { color: 'black' }, mt: '8px' }}
            />
          </Box>
          <Button variant="contained" onClick={devolution} sx={{ py: 1.5 }}>
            Devolver
          </Button>
          {penalty && (
            <Box>
              <Typography variant="h6" color="error" align="center">
                Devolução em atraso
              </Typography>
              <Typography variant="h5" color="error" align="center">
                Multa no valor de: R${penalty}
              </Typography>
            </Box>
          )}
          {/* <Box>
            <Typography variant="h6" color="error" align="center">
              Devolução em atraso
            </Typography>
            <Typography variant="h5" color="error" align="center">
              Multa no valor de: R$2,50
            </Typography>
          </Box> */}
        </Stack>
      </Container>
      <Footer />
    </>
  );
}
