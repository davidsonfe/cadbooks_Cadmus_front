import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { UserContext } from '../../contexts/UserContext';

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export function Header() {
  const { userLogout } = useContext(UserContext);
  const mobileScreen = useMediaQuery('(max-width: 400px)');

  return (
    <Box
      py={2}
      component="header"
      sx={{
        boxShadow: '5px 8px 8px -1px rgb(0 0 0 / 15%)',
        position: 'fixed',
        width: '100%',
        top: '0',
        backgroundColor: '#fff',
        zIndex: 2021,
      }}
    >
      <Container>
        <Grid
          container
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          direction="row"
        >
          <Grid item>
            <Link to="/painel">
              <img
                src={Logo}
                alt="CadBooks"
                style={{ width: mobileScreen ? '150px' : '' }}
              />
            </Link>
          </Grid>
          <Box>
            <Grid container sx={{ alignItems: 'center' }}>
              <Typography color="text.secondary">Yuri Alves</Typography>
              <Button
                onClick={userLogout}
                color="error"
                endIcon={<LogoutOutlinedIcon />}
                sx={{ ml: 1 }}
              >
                Sair
              </Button>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
