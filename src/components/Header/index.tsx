import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Logo from '../../assets/logo.png';

export function Header() {
  return (
    <Box
      py={2}
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
        >
          <Grid item>
            <img src={Logo} alt="CadBooks" />
          </Grid>
          <Box>
            <Grid container sx={{ alignItems: 'center' }}>
              <Typography color="text.secondary">Yuri Alves</Typography>
              <Button color="error">Sair</Button>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
