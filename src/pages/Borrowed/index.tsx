import { Box, Button, Container, Grid } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import Footer from '../../components/Footer';
import { Header } from '../../components/Header';
import { ManagerCard } from '../../components/ManagerCard';
import { Title } from '../../components/Title';
import { UserContext } from '../../contexts/UserContext';
import { api } from '../../services/api';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Navigate } from 'react-router-dom';

interface BookProps {
  dt_empr: string;
  dt_devol: string;
  nome: string;
  titulo: string;
  categoria: string;
}

export default function Borrowed() {
  const [books, setBooks] = useState([]);
  const { userToken, user } = useContext(UserContext);

  useEffect(() => {
    async function getData() {
      try {
        if (userToken) {
          const response = await api.get('/borrow/report', {
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
  if (user.admin !== true) return <Navigate to="/painel" />;

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
          <Title title="Obras emprestadas" />
          {books && (
            <CSVLink data={books} style={{ color: 'white' }}>
              <Button
                variant="contained"
                startIcon={<FileDownloadIcon />}
                sx={{ py: 1.5 }}
              >
                Exportar CSV
              </Button>
            </CSVLink>
          )}
        </Box>

        <Grid container spacing={6}>
          {books.map((book: BookProps, index: number) => (
            <ManagerCard
              cardType="obra-emprestada"
              key={index}
              id={book.titulo}
              bookName={book.titulo}
              name={book.nome}
              date={book.dt_empr}
              devolution={book.dt_devol}
              category={book.categoria}
            />
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
