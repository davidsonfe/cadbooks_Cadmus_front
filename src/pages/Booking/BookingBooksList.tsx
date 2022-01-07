import { Container, Grid } from '@mui/material';
import { Header } from '../../components/Header';
import { Title } from '../../components/Title';
import Footer from '../../components/Footer';
import { useContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { UserContext } from '../../contexts/UserContext';
import { toast } from 'react-toastify';
import { BookCard } from '../../components/BookCard';
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

export default function BookingBooksList() {
  const [books, setBooks] = useState<BookProps[]>([]);
  const { userToken, login } = useContext(UserContext);

  useEffect(() => {
    async function getData() {
      try {
        if (userToken) {
          const response = await api.get('/books/findall', {
            headers: { Authorization: 'Bearer ' + userToken },
          });

          const booksAvailable = response.data.filter(
            (book: BookProps) =>
              book.emprestado !== true && book.reservado !== true
          );

          setBooks(booksAvailable);
        }
      } catch (error) {
        console.log(error);
        toast.error('Ocorreu um erro');
      }
    }
    getData();
  }, [userToken]);

  // if (login === false) return <Navigate to="/" />;

  return (
    <>
      <Header />
      <Container sx={{ pb: 6 }}>
        <Title title="Fazer reserva" />
        <Grid container spacing={6}>
          {books.map((book: BookProps) => (
            <BookCard
              key={book.isn_id}
              id={book.isn_id}
              name={book.titulo}
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
