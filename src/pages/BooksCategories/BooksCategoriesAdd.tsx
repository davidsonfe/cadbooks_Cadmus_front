import { Box, Button, Container, Grid, Stack, TextField } from '@mui/material';
import { Header } from '../../components/Header';
import { Title } from '../../components/Title';
import Footer from '../../components/Footer';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { UserContext } from '../../contexts/UserContext';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

export default function BooksCategoriesAdd() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [limitDays, setLimitDays] = useState('');
  const [penalty, setPenalty] = useState('');

  const { userToken, login } = useContext(UserContext);

  const navigate = useNavigate();

  // if (login === false) return <Navigate to="/" />;

  async function addCategory(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await api.post(
        '/book_cat/register',
        {
          cat_id: name,
          desc_cat: description,
          dias_limite: limitDays,
          multa: penalty,
        },
        {
          headers: { Authorization: 'Bearer ' + userToken },
        }
      );
      if (response.status === 200) {
        toast.success('Categoria adicionada com sucesso');
        navigate('/categorias-obras');
      }
      console.log(response);
    } catch (error) {
      throw new Error('deu erro');
    }
  }

  return (
    <>
      <Header />
      <Container sx={{ pb: 6 }}>
        <Title title="Adicionar categoria de obras" />
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }}>
          <Stack spacing={4}>
            <Grid container sx={{ justifyContent: 'space-around', gap: 4 }}>
              <Grid item>
                <TextField
                  required
                  label="Nome da categoria"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  multiline
                  label="Descrição"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  type="number"
                  label="Dias limite"
                  value={limitDays}
                  onChange={(e) => setLimitDays(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  type="number"
                  label="Valor da multa"
                  value={penalty}
                  onChange={(e) => setPenalty(e.target.value)}
                />
              </Grid>
            </Grid>
          </Stack>

          <Button
            variant="contained"
            type="submit"
            sx={{
              mt: 8,
              width: '50%',
              alignSelf: 'center',
              py: 1.8,
            }}
            onClick={addCategory}
          >
            Adicionar
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
