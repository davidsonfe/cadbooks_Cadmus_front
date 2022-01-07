import { Button, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Header } from '../../components/Header';
import { ManagerCard } from '../../components/ManagerCard';
import { Title } from '../../components/Title';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Footer from '../../components/Footer';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

interface BookingProps {
  isn_id_cop: string;
  cpf: string;
  doc_id: string;
  dt_reserva: string;
  dt_ret: string;
  reservado: boolean;
  // dt_devol: string;
}

export default function BookingList() {
  const [bookings, setBookings] = useState<BookingProps[]>([]);
  // const [readerName, setReaderName] = useState('');
  // const [employeeName, setEmployeeName] = useState('');
  // const [bookName, setBookName] = useState('');

  const { userToken, login } = useContext(UserContext);

  useEffect(() => {
    async function getData() {
      try {
        if (userToken) {
          const response = await api.get('/reserv/findall', {
            headers: { Authorization: 'Bearer ' + userToken },
          });

          const ReserverdBooks = response.data.filter(
            (book: BookingProps) => book.reservado === true
          );

          setBookings(ReserverdBooks);
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
          <Title title="Reservas" />
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            href="/reservas/obras"
            sx={{ py: 1.5 }}
          >
            Nova reserva
          </Button>
        </Box>
        <Grid container spacing={6}>
          {bookings &&
            bookings.map((booking) => (
              <ManagerCard
                cardType="reserva"
                key={booking.isn_id_cop}
                id={booking.isn_id_cop}
                // bookName="Obra 1"
                name={booking.doc_id}
                employee={booking.cpf}
                date={booking.dt_reserva}
                withdraw={booking.dt_ret}
              />
            ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
