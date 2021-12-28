import { Container, Grid } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ButtonPanel } from '../../components/ButtonPanel';
import { Header } from '../../components/Header';
import Loading from '../../components/Loading';
import { Title } from '../../components/Title';
import { UserContext } from '../../contexts/UserContext';
import { api } from '../../services/api';

export default function Dashboard() {
  // const [loading, setLoading] = useState(true);
  const { login } = useContext(UserContext);
  // const [data, setData] = useState([]);
  if (!login) return <Navigate to="/" />;
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  //
  // }, []);

  // console.log(data);

  return (
    <>
      {/* {loading && <Loading />} */}

      <Header />

      <Container sx={{ pt: 18, pb: 6 }}>
        <Title title="Painel de controle" />

        <Grid container spacing={6}>
          <ButtonPanel
            link="/reserva-emprestimo"
            image="favicon.ico"
            text="Fazer reserva / empréstimo"
          />

          <ButtonPanel
            link="/devolucoes"
            image="favicon.ico"
            text="Devoluções"
          />

          <ButtonPanel
            link="/obras"
            image="favicon.ico"
            text="Gerenciar obras literárias"
          />

          <ButtonPanel
            link="/leitores"
            image="favicon.ico"
            text="Gerenciar leitores"
          />

          <ButtonPanel
            link="/funcionários"
            image="favicon.ico"
            text="Gerenciar funcionários"
          />

          <ButtonPanel
            link="/obras-emprestadas"
            image="favicon.ico"
            text="Obras emprestadas no momento"
          />

          <ButtonPanel
            link="/obras-atraso"
            image="favicon.ico"
            text="Obras em atraso"
          />

          <ButtonPanel
            link="/reservas"
            image="favicon.ico"
            text="Reservas efetuadas"
          />

          {/* <Grid item mx="auto">
            <Card sx={{ minWidth: 250 }}>
              <CardMedia
                component="img"
                height="150"
                image="logo512.png"
                alt="imagem"
              />
              <CardContent>
                <Typography variant="h5" color="text.secondary">
                  Livro 1
                </Typography>
                <Typography variant="body2">
                  Livro 1 descrição blablabla
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Ver livro</Button>
              </CardActions>
            </Card>
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
