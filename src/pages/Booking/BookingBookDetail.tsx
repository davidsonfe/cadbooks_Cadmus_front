import {
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Header } from '../../components/Header';
import { Title } from '../../components/Title';

import Footer from '../../components/Footer';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { api } from '../../services/api';
import { toast } from 'react-toastify';

interface BookProps {
  autores: string;
  categoria: {
    cat_id: string;
  };
  dt_public: number;
  editora: string;
  emprestado: boolean;
  isn_id: string;
  num_ed: number;
  num_pag: number;
  plv_chave: string;
  reservado: boolean;
  titulo: string;
}

export default function BookingBookDetail() {
  const [book, setBook] = useState({} as BookProps);
  const [readerId, setReaderId] = useState('');
  const query = useLocation();
  const id = query.pathname.split('/obras/')[1];

  const navigate = useNavigate();

  const { userToken, user, login } = useContext(UserContext);

  useEffect(() => {
    async function getData() {
      try {
        if (userToken) {
          const response = await api.get(`/books/findone/${id}`, {
            headers: { Authorization: 'Bearer ' + userToken },
          });

          setBook(response.data[0]);
        }
      } catch (error) {
        console.log(error);
        toast.error('Ocorreu um erro');
      }
    }
    getData();
  }, [id, userToken]);

  // if (login === false) return <Navigate to="/" />;

  async function reserv(e: FormEvent) {
    e.preventDefault();

    if (userToken) {
      try {
        const response = await api.post(
          '/reserv/register',
          {
            isn_id_cop: book.isn_id,
            doc_id: readerId,
            cpf: user.cpf,
          },
          {
            headers: { Authorization: 'Bearer ' + userToken },
          }
        );
        if (response.status === 200) {
          toast.success('Obra reservada com sucesso');
          navigate('/reservas');
        }
      } catch (error) {
        toast.error('Leitor inexistente');
        console.log(error);
      }
    }
  }

  return (
    <>
      <Header />
      <Container sx={{ pb: 6 }}>
        <Title title={book.titulo} />

        <Grid container spacing={6}>
          <Grid item sx={{ width: '50%' }}>
            <Stack spacing={2}>
              <Typography>Código: {book.isn_id}</Typography>
              <Typography>Categoria: {book.categoria?.cat_id}</Typography>
              <Typography>Autores: {book.autores}</Typography>
              <Typography>Ano de publicação: {book.dt_public}</Typography>
              <Typography>Nº da edição: {book.num_ed}ª edição</Typography>
              <Typography>Editora: {book.editora}</Typography>
              <Typography>Nº de páginas: {book.num_pag}</Typography>
            </Stack>
          </Grid>

          <Grid item sx={{ width: '40%' }}>
            <Stack component="form" spacing={4}>
              <TextField
                label="Identificação do leitor"
                placeholder="apenas números"
                value={readerId}
                onChange={(e) => setReaderId(e.target.value)}
              />
              <Button
                variant="contained"
                type="submit"
                onClick={reserv}
                sx={{ py: 2 }}
              >
                Reservar
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
