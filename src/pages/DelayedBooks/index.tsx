import { Button, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import Footer from '../../components/Footer';
import { Header } from '../../components/Header';
import { ManagerCard } from '../../components/ManagerCard';
import { Title } from '../../components/Title';
import { UserContext } from '../../contexts/UserContext';
import { api } from '../../services/api';

import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface BookProps {
  nome: string;
  tel: string;
  email: string;
  dt_empr: string;
  dt_devol: string;
}

export default function DelayedBooks() {
  const [books, setBooks] = useState([]);
  const { userToken } = useContext(UserContext);

  useEffect(() => {
    async function getData() {
      try {
        if (userToken) {
          const response = await api.get('/books/report', {
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
          <Title title="Obras atrasadas" />
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
          {books.map((book: BookProps, index) => (
            <ManagerCard
              cardType="obra-atrasada"
              id={String(index)}
              key={index}
              name={book.nome}
              phone={book.tel}
              email={book.email}
              date={book.dt_empr}
              devolution={book.dt_devol}
            />
          ))}
          {/* <ManagerCard
            cardType="obra-atrasada"
            name="Yuri"
            phone="(44) 9 1234-5678"
            email="yuri@gmail.com"
            date="27/12/2021"
            devolution="29/12/2021"
          />
          <ManagerCard
            cardType="obra-atrasada"
            name="Yuri"
            phone="(44) 9 1234-5678"
            email="yuri@gmail.com"
            date="27/12/2021"
            devolution="29/12/2021"
          />
          <ManagerCard
            cardType="obra-atrasada"
            name="Yuri"
            phone="(44) 9 1234-5678"
            email="yuri@gmail.com"
            date="27/12/2021"
            devolution="29/12/2021"
          /> */}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
