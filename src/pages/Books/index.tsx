import { Box, Button, Container, Grid } from '@mui/material';
import { Header } from '../../components/Header';
import { Title } from '../../components/Title';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { ManagerCard } from '../../components/ManagerCard';
import Footer from '../../components/Footer';

export default function Books() {
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
          <Title title="Gerenciar obras literárias" />
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            sx={{ py: 1.5 }}
          >
            Adicionar obra
          </Button>
        </Box>
        <Grid container spacing={6}>
          {/* <ManagerCard
            cardType="obra"
            bookName="Obra 1"
            author="yuri"
            category="Romance"
          />
          <ManagerCard
            cardType="obra"
            bookName="Obra 2"
            author="Davidson"
            category="Ação"
          />
          <ManagerCard
            cardType="obra"
            bookName="Obra 3"
            author="Lena"
            category="Aventura"
          />
          <ManagerCard
            cardType="obra"
            bookName="Obra 4"
            author="João"
            category="Romance"
          /> */}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
