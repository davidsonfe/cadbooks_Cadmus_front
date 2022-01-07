import { Button, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Footer from '../../components/Footer';
import { Header } from '../../components/Header';
import { ManagerCard } from '../../components/ManagerCard';
import { Title } from '../../components/Title';
import { UserContext } from '../../contexts/UserContext';
import { api } from '../../services/api';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import { CSVLink } from 'react-csv';

interface BookingProps {
  nome: string;
  tel: string;
  email: string;
  titulo: string;
}

export default function DoneBooking() {
  const [bookings, setBookings] = useState<BookingProps[]>([]);

  const { userToken } = useContext(UserContext);

  useEffect(() => {
    async function getData() {
      try {
        if (userToken) {
          const response = await api.get('/reserv/report', {
            headers: { Authorization: 'Bearer ' + userToken },
          });

          setBookings(response.data);
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
          <Title title="Reservas efetuadas hoje" />
          {bookings && (
            <CSVLink data={bookings} style={{ color: 'white' }}>
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
          {bookings.map((booking, index) => (
            <ManagerCard
              cardType="reserva-efetuada"
              id={booking.titulo}
              key={index}
              bookName={booking.titulo}
              name={booking.nome}
              phone={booking.tel}
              email={booking.email}
            />
          ))}
          {/* <ManagerCard
            cardType="reserva-efetuada"
            bookName="Senhor dos anéis"
            name="Davidson Felix"
            phone=" (81) 9 1234-56789"
            email="davidson@gmail.com"
          />

          <ManagerCard
            cardType="reserva-efetuada"
            bookName="Senhor dos anéis"
            name="Davidson Felix"
            phone=" (81) 9 1234-56789"
            email="davidson@gmail.com"
          />
          <ManagerCard
            cardType="reserva-efetuada"
            bookName="Senhor dos anéis"
            name="Davidson Felix"
            phone=" (81) 9 1234-56789"
            email="davidson@gmail.com"
          />
          <ManagerCard
            cardType="reserva-efetuada"
            bookName="Senhor dos anéis"
            name="Davidson Felix"
            phone=" (81) 9 1234-56789"
            email="davidson@gmail.com"
          /> */}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
