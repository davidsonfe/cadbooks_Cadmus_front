import { Container, Grid } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ButtonPanel } from '../../components/ButtonPanel';
import { Header } from '../../components/Header';
import Loading from '../../components/Loading';
import { Title } from '../../components/Title';
import { UserContext } from '../../contexts/UserContext';
import { api } from '../../services/api';
import reservasImg from '../../assets/reservas.svg';
import devolucoesImg from '../../assets/devolucoes.svg';
import obrasImg from '../../assets/obras.svg';
import leitoresImg from '../../assets/leitores.svg';
import funcionariosImg from '../../assets/funcionarios.svg';
import obrasEmprestadasImg from '../../assets/obras-emprestadas.svg';
import obrasAtrasoImg from '../../assets/atraso.svg';
import reservasEfetuadasImg from '../../assets/reservas-efetuadas.svg';
import categoriasObrasImg from '../../assets/categorias-obras.svg';
import categoriasLeitoresImg from '../../assets/categorias-leitores.svg';
import Footer from '../../components/Footer';

export default function Dashboard() {
  // const [loading, setLoading] = useState(true);
  const { login } = useContext(UserContext);
  // const [data, setData] = useState([]);
  if (login === false) return <Navigate to="/" />;
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

      <Container sx={{ pb: 6 }}>
        <Title title="Painel de controle" />

        <Grid container spacing={6}>
          <ButtonPanel link="/reservas" image={reservasImg} text="Reservas" />

          <ButtonPanel
            link="/devolucoes"
            image={devolucoesImg}
            text="Devoluções"
          />

          <ButtonPanel
            link="/obras"
            image={obrasImg}
            text="Gerenciar obras literárias"
          />

          <ButtonPanel
            link="/leitores"
            image={leitoresImg}
            text="Gerenciar leitores"
          />

          <ButtonPanel
            link="/funcionarios"
            image={funcionariosImg}
            text="Gerenciar funcionários"
          />

          <ButtonPanel
            link="/obras-emprestadas"
            image={obrasEmprestadasImg}
            text="Obras emprestadas no momento"
          />

          <ButtonPanel
            link="/obras-atrasadas"
            image={obrasAtrasoImg}
            text="Obras em atraso"
          />

          <ButtonPanel
            link="/reservas-efetuadas"
            image={reservasEfetuadasImg}
            text="Reservas efetuadas"
          />

          <ButtonPanel
            link="/categorias-leitores"
            image={categoriasLeitoresImg}
            text="Gerenciar categoria de leitores"
          />

          <ButtonPanel
            link="/categorias-obras"
            image={categoriasObrasImg}
            text="Gerenciar categoria de obras"
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
      <Footer />
    </>
  );
}
