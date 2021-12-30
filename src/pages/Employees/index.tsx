import { Box, Button, Container, Grid } from '@mui/material';
import { Header } from '../../components/Header';
import { ManagerCard } from '../../components/ManagerCard';
import { Title } from '../../components/Title';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Footer from '../../components/Footer';

export default function Employees() {
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
          <Title title="Gerenciar funcionários" />
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            sx={{ py: 1.5 }}
          >
            Adicionar funcionário
          </Button>
        </Box>
        <Grid container spacing={6}>
          <ManagerCard
            cardType="funcionario"
            name="Yuri Pires"
            phone="(44) 9 9811-3052"
          />
          <ManagerCard
            cardType="funcionario"
            name="Davidson Felix"
            phone="(44) 9 9811-3052"
          />
          <ManagerCard
            cardType="funcionario"
            name="Lena"
            phone="(44) 9 9811-3052"
          />
          <ManagerCard
            cardType="funcionario"
            name="Joao"
            phone="(44) 9 9811-3052"
          />
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
