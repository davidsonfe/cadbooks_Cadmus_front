import { Box, Button, Container, Grid, Stack, TextField } from '@mui/material';
import { Header } from '../../components/Header';
import { Title } from '../../components/Title';
import Footer from '../../components/Footer';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { UserContext } from '../../contexts/UserContext';
import { toast } from 'react-toastify';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export default function ReaderCategoriesEdit() {
  const query = useLocation();
  const id = query.pathname.split('/editar/')[1];

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [limitDays, setLimitDays] = useState('');

  const { userToken, login } = useContext(UserContext);

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get(`/reader_cat/findone/${id}`, {
          headers: { Authorization: 'Bearer ' + userToken },
        });

        setName(response.data[0].cat_id);
        setDescription(response.data[0].desc_cat);
        setLimitDays(response.data[0].dias_limite);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [id, userToken]);

  const navigate = useNavigate();

  // if (login === false) return <Navigate to="/" />;

  async function updateCategory(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await api.put(
        `/reader_cat/update/${id}`,
        {
          cat_id: name,
          desc_cat: description,
          dias_limite: limitDays,
        },
        {
          headers: { Authorization: 'Bearer ' + userToken },
        }
      );
      if (response.status === 200) {
        toast.success('Categoria atualizada com sucesso');
        navigate('/categorias-leitores');
      }
    } catch (error) {
      throw new Error('deu erro');
    }
  }

  return (
    <>
      <Header />
      <Container sx={{ pb: 6 }}>
        <Title title="Editar categoria de leitores" />
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
            onClick={updateCategory}
          >
            Salvar
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
