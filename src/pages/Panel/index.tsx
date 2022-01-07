import { Container, Grid } from '@mui/material';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ButtonPanel } from '../../components/ButtonPanel';
import { Header } from '../../components/Header';
import { Title } from '../../components/Title';
import { UserContext } from '../../contexts/UserContext';
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
  const { login, user } = useContext(UserContext);

  if (login === false) return <Navigate to="/" />;

  return (
    <>
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

          {user.admin && (
            <>
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
                link="/reservas-efetuadas-hoje"
                image={reservasEfetuadasImg}
                text="Reservas efetuadas hoje"
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
            </>
          )}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
