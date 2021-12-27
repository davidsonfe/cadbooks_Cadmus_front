import { FormEvent, useContext, useState } from 'react';
import { Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import BgImage from '../../assets/biblioteca.png';
import Logo from '../../assets/logo-white.png';
import { UserContext } from '../../contexts/UserContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { userLogin, loading } = useContext(UserContext);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    userLogin(username, password);
  }

  const mobileScreen = useMediaQuery('(max-width: 400px)');

  const stylesContainer = {
    minWidth: '100vw',
    minHeight: '100vh',
    backgroundImage: `url(${BgImage})`,
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const stylesBox = {
    width: 464,
    maxWidth: '100%',
    backgroundColor: 'rgba(34, 34, 34, 0.4)',
    borderRadius: 2,
    paddingRight: mobileScreen ? 4 : 12,
    paddingLeft: mobileScreen ? 4 : 12,
    paddingTop: 2,
    paddingBottom: 2,
  };
  return (
    <Container sx={stylesContainer}>
      <Box sx={stylesBox}>
        <Stack>
          <img
            src={Logo}
            alt="CadBooks"
            title="CadBooks"
            style={{ maxWidth: '208px', width: '100%', margin: '0 auto' }}
          />

          <Stack component="form" spacing={4} onSubmit={handleSubmit}>
            <Typography
              component="h1"
              fontSize={28}
              fontWeight="bold"
              mt="28px"
              mb="0px"
              textAlign="center"
            >
              Entre na sua conta
            </Typography>
            <TextField
              required
              label="CPF"
              variant="standard"
              color="info"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              required
              label="Senha"
              variant="standard"
              type="password"
              color="info"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ textTransform: 'none', fontWeight: 'bold' }}
            >
              {loading ? 'Carregando...' : 'Entrar'}
            </Button>

            <Typography
              component="h2"
              fontSize={16}
              fontWeight="bold"
              mt="52px"
              mb="22px"
              textAlign="center"
            >
              Ainda não possui uma conta?
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ textTransform: 'none', fontWeight: 'bold' }}
            >
              Crie aqui
            </Button>
            <Typography
              component="p"
              fontSize={12}
              mt="37px"
              textAlign="center"
            >
              By Falcon 🦅
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
