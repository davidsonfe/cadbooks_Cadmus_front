import { Box, Container, Grid, Typography } from '@mui/material';
import Footer from '../../components/Footer';
import { Header } from '../../components/Header';
import { ManagerCard } from '../../components/ManagerCard';
import { Title } from '../../components/Title';

export default function Borrowed() {
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
          filtro
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 10 }}>
          Revistas
        </Typography>
        <Grid container spacing={6}>
          <ManagerCard
            cardType="obra-emprestada"
            bookName="Livro 1"
            name="Yuri"
            date="29/12/2021"
            devolution="12/01/2022"
          />

          <ManagerCard
            cardType="obra-emprestada"
            bookName="Livro 1"
            name="Yuri"
            date="29/12/2021"
            devolution="12/01/2022"
          />

          <ManagerCard
            cardType="obra-emprestada"
            bookName="Livro 1"
            name="Yuri"
            date="29/12/2021"
            devolution="12/01/2022"
          />

          <ManagerCard
            cardType="obra-emprestada"
            bookName="Livro 1"
            name="Yuri"
            date="29/12/2021"
            devolution="12/01/2022"
          />
        </Grid>

        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 10 }}>
          Periódicos
        </Typography>
        <Grid container spacing={6}>
          <ManagerCard
            cardType="obra-emprestada"
            bookName="Livro 1"
            name="Yuri"
            date="29/12/2021"
            devolution="12/01/2022"
          />

          <ManagerCard
            cardType="obra-emprestada"
            bookName="Livro 1"
            name="Yuri"
            date="29/12/2021"
            devolution="12/01/2022"
          />

          <ManagerCard
            cardType="obra-emprestada"
            bookName="Livro 1"
            name="Yuri"
            date="29/12/2021"
            devolution="12/01/2022"
          />

          <ManagerCard
            cardType="obra-emprestada"
            bookName="Livro 1"
            name="Yuri"
            date="29/12/2021"
            devolution="12/01/2022"
          />
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
