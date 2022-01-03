import { FormEvent, useContext, useEffect, useState } from 'react';
import { Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import BgImage from '../../assets/biblioteca.png';
import Logo from '../../assets/logo-white.png';
import { UserContext } from '../../contexts/UserContext';

import { Navigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { userLogin, loading, login } = useContext(UserContext);

  const mobileScreen = useMediaQuery('(max-width: 400px)');

  if (login === true) return <Navigate to="/painel" />;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    userLogin(username, password);
  }

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
              color="text.secondary"
            >
              Entre na sua conta
            </Typography>
            <TextField
              required
              label="CPF"
              variant="standard"
              color="info"
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                '& label': {
                  color: 'text.secondary',
                },
                '& input': { color: 'text.secondary' },
                '& div::before': {
                  borderColor: 'text.secondary',
                },
              }}
            />
            <TextField
              required
              label="Senha"
              variant="standard"
              type="password"
              color="info"
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& label': {
                  color: 'text.secondary',
                },
                '& input': {
                  color: 'text.secondary',
                },
                '& div::before': {
                  borderColor: 'text.secondary',
                },
              }}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ textTransform: 'none', fontWeight: 'bold' }}
            >
              {loading ? 'Carregando...' : 'Entrar'}
            </Button>

            <Typography
              component="p"
              fontSize={12}
              mt="37px"
              textAlign="center"
              color="text.secondary"
            >
              By Falcon 🦅
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
