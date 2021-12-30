import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import Footer from '../../components/Footer';
import { Header } from '../../components/Header';
import { ManagerCard } from '../../components/ManagerCard';
import { Title } from '../../components/Title';

export default function DoneBooking() {
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
          filtro
        </Box>
        <Grid container spacing={6}>
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
          />
          <ManagerCard
            cardType="reserva-efetuada"
            bookName="Senhor dos anéis"
            name="Davidson Felix"
            phone=" (81) 9 1234-56789"
            email="davidson@gmail.com"
          />
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
