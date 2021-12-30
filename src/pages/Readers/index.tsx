import { Box, Button, Container, Grid } from '@mui/material';
import { ManagerCard } from '../../components/ManagerCard';
import { Header } from '../../components/Header';
import { Title } from '../../components/Title';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import Footer from '../../components/Footer';

export default function Readers() {
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
          <Title title="Gerenciar leitores" />
          <Button
            variant="contained"
            startIcon={<PersonAddAltRoundedIcon />}
            sx={{ py: 1.5 }}
          >
            Adicionar leitor
          </Button>
        </Box>

        <Grid container spacing={6}>
          <ManagerCard
            cardType="leitor"
            name="Yuri Pires Alves"
            email="yuripiresalves@gmail.com"
            category="Aluno de graduação"
          />
          <ManagerCard
            cardType="leitor"
            name="Davidson Felix"
            email="davidsonfelix@gmail.com"
            category="Aluno de graduação"
          />
          <ManagerCard
            cardType="leitor"
            name="Helena"
            email="lena@gmail.com"
            category="Aluno de pós-graduação"
          />
          <ManagerCard
            cardType="leitor"
            name="João Paulo"
            email="jp@gmail.com"
            category="Usuário externo"
          />
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
