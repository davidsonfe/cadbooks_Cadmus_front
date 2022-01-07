import { Box, Button, Container, Grid } from '@mui/material';
import { ManagerCard } from '../../components/ManagerCard';
import { Header } from '../../components/Header';
import { Title } from '../../components/Title';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import Footer from '../../components/Footer';
import { useContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { UserContext } from '../../contexts/UserContext';
import { Navigate } from 'react-router-dom';

interface ReaderProps {
  categoria: {
    cat_id: string;
    desc_cat: string;
    dias_limite: number;
  };
  doc_id: string;
  email: string;
  nome: string;
}

export default function ReadersList() {
  const [readers, setReaders] = useState<ReaderProps[]>([]);

  const { userToken, login } = useContext(UserContext);

  useEffect(() => {
    async function getData() {
      try {
        if (userToken) {
          const response = await api.get('/reader/findall', {
            headers: {
              Authorization: 'Bearer ' + userToken,
            },
          });

          setReaders(response.data);
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
          <Title title="Gerenciar leitores" />
          <Button
            variant="contained"
            startIcon={<PersonAddAltRoundedIcon />}
            sx={{ py: 1.5 }}
            href="/leitores/adicionar"
          >
            Adicionar leitor
          </Button>
        </Box>

        <Grid container spacing={6}>
          {readers.map((reader: ReaderProps) => (
            <ManagerCard
              cardType="leitor"
              key={reader.doc_id}
              id={reader.doc_id}
              name={reader.nome}
              email={reader.email}
              category={reader.categoria.cat_id}
            />
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
