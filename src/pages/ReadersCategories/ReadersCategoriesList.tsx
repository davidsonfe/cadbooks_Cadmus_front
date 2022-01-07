import { Button, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Header } from '../../components/Header';
import { ManagerCard } from '../../components/ManagerCard';
import { Title } from '../../components/Title';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Footer from '../../components/Footer';
import { useContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { UserContext } from '../../contexts/UserContext';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

type CategoryType = {
  cat_id: string;
  desc_cat: string;
  dias_limite: number;
};

export default function ReadersCategoriesList() {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const { userToken, login } = useContext(UserContext);

  useEffect(() => {
    async function getData() {
      try {
        if (userToken) {
          const response = await api.get('/reader_cat/findall', {
            headers: { Authorization: 'Bearer ' + userToken },
          });

          setCategories(response.data);
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
          <Title title="Categorias de leitores" />
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            href="/categorias-leitores/adicionar"
            sx={{ py: 1.5 }}
          >
            Adicionar categoria
          </Button>
        </Box>
        <Grid container spacing={6}>
          {categories.map((category) => (
            <ManagerCard
              cardType="categoria-leitores"
              key={category.cat_id}
              name={category.cat_id}
              id={category.cat_id}
            />
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
