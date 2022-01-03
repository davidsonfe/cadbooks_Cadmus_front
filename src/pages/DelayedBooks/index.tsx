import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import Footer from '../../components/Footer';
import { Header } from '../../components/Header';
import { ManagerCard } from '../../components/ManagerCard';
import { Title } from '../../components/Title';

export default function DelayedBooks() {
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
          filtro
        </Box>
        <Grid container spacing={6}>
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
