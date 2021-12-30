import { Button, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Header } from '../../components/Header';
import { ManagerCard } from '../../components/ManagerCard';
import { Title } from '../../components/Title';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Footer from '../../components/Footer';

export default function Booking() {
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
            sx={{ py: 1.5 }}
          >
            Nova reserva
          </Button>
        </Box>
        <Grid container spacing={6}>
          <ManagerCard
            cardType="reserva"
            bookName="Obra 1"
            name="yuri"
            employee="everton"
            date="29/12/2021"
          />
          <ManagerCard
            cardType="reserva"
            bookName="Obra 2"
            name="lena"
            employee="everton"
            date="29/12/2021"
          />
          <ManagerCard
            cardType="reserva"
            bookName="Obra 3"
            name="davidson"
            employee="everton"
            date="29/12/2021"
          />
          <ManagerCard
            cardType="reserva"
            bookName="Obra 4"
            name="joao"
            employee="everton"
            date="29/12/2021"
          />
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
