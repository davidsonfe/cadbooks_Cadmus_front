import { Box, Button, Container, Grid } from '@mui/material';
import { Header } from '../../components/Header';
import { Title } from '../../components/Title';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { ManagerCard } from '../../components/ManagerCard';
import Footer from '../../components/Footer';

export default function BooksCategories() {
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
          <Title title="Categorias de obras" />
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            sx={{ py: 1.5 }}
          >
            Adicionar categoria
          </Button>
        </Box>
        <Grid container spacing={6}>
          {/* <ManagerCard cardType="categoria-obras" name="Livro" />
          <ManagerCard cardType="categoria-obras" name="Periódico" />
          <ManagerCard cardType="categoria-obras" name="Revista" />
          <ManagerCard cardType="categoria-obras" name="Nota didática" />
          <ManagerCard cardType="categoria-obras" name="Jornal" />
          <ManagerCard cardType="categoria-obras" name="Relatório técnico" />
          <ManagerCard cardType="categoria-obras" name="Tese de doutorado" />
          <ManagerCard
            cardType="categoria-obras"
            name="Dissertação de mestrado"
          /> */}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
