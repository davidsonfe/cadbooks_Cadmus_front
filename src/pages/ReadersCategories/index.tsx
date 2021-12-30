import { Button, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Header } from '../../components/Header';
import { ManagerCard } from '../../components/ManagerCard';
import { Title } from '../../components/Title';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Footer from '../../components/Footer';

export default function ReadersCategories() {
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
          <Title title="Categorias de leitores" />
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            sx={{ py: 1.5 }}
          >
            Adicionar categoria
          </Button>
        </Box>
        <Grid container spacing={6}>
          <ManagerCard
            cardType="categoria-leitores"
            name="Aluno de graduação"
          />
          <ManagerCard
            cardType="categoria-leitores"
            name="Aluno de pós-graduação"
          />
          <ManagerCard cardType="categoria-leitores" name="Professor" />
          <ManagerCard cardType="categoria-leitores" name="Funcionário" />
          <ManagerCard cardType="categoria-leitores" name="Usuário externo" />
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
