import { Box, Button, Container, Grid } from '@mui/material';
import { Header } from '../../components/Header';
import { Title } from '../../components/Title';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { ManagerCard } from '../../components/ManagerCard';
import Footer from '../../components/Footer';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

interface BookProps {
  isn_id: string;
  titulo: string;
  autores: string;
  plv_chave: string;
  editora: string;
  num_pag: number;
  num_ed: number;
  dt_public: number;
  emprestado: boolean;
  reservado: boolean;
  categoria: {
    cat_id: string;
    desc_cat: string;
    dias_limite: number;
    multa: number;
  };
}

export default function BooksList() {
  const [books, setBooks] = useState<BookProps[]>([]);
  const { userToken, login } = useContext(UserContext);

  useEffect(() => {
    async function getData() {
      try {
        if (userToken) {
          const response = await api.get('/books/findall', {
            headers: { Authorization: 'Bearer ' + userToken },
          });

          setBooks(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [userToken]);

  // if (login === false) return <Navigate to="/" />;

  return (
    <>
      <Header />
      <Container sx={{ pb: 6 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            mb: 4,
          }}
        >
          <Title title="Gerenciar obras literárias" />
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            href="/obras/adicionar"
            sx={{ py: 1.5 }}
          >
            Adicionar obra
          </Button>
        </Box>
        <Grid container spacing={6}>
          {books.map((book: BookProps) => (
            <ManagerCard
              cardType="obra"
              key={book.isn_id}
              id={book.isn_id}
              bookName={book.titulo}
              authors={book.autores}
              category={book.categoria.cat_id}
            />
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
