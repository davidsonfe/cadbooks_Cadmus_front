import { Box, Button, Container, Grid, Stack, TextField } from '@mui/material';
import { Header } from '../../components/Header';
import { Title } from '../../components/Title';
import Footer from '../../components/Footer';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { UserContext } from '../../contexts/UserContext';
import { toast } from 'react-toastify';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export default function BooksCategoriesEdit() {
  const query = useLocation();
  const id = query.pathname.split('/editar/')[1];
  console.log(id);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [limitDays, setLimitDays] = useState('');
  const [penalty, setPenalty] = useState('');

  const { userToken, user } = useContext(UserContext);

  useEffect(() => {
    async function getData() {
      try {
        if (userToken) {
          const response = await api.get(`/book_cat/findone/${id}`, {
            headers: { Authorization: 'Bearer ' + userToken },
          });

          setName(response.data[0].cat_id);
          setDescription(response.data[0].desc_cat);
          setLimitDays(response.data[0].dias_limite);
          setPenalty(response.data[0].multa);
        }
      } catch (error) {
        toast.error('Ocorreu um erro');
        console.log(error);
      }
    }
    getData();
  }, [id, userToken]);

  const navigate = useNavigate();

  // if (login === false) return <Navigate to="/" />;
  // if (user.admin !== true) return <Navigate to="/painel" />;

  async function updateCategory(e: FormEvent) {
    e.preventDefault();

    try {
      if (userToken) {
        const response = await api.put(
          `/book_cat/update/${id}`,
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
          toast.success('Categoria atualizada com sucesso');
          navigate('/categorias-obras');
        }
      }
    } catch (error) {
      toast.error('Ocorreu um erro');
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <Container sx={{ pb: 6 }}>
        <Title title="Editar categoria de obras" />
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
