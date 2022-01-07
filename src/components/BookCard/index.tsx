import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

interface BookCardProps {
  id: string;
  name: string;
  readerName?: string;
  authors?: string;
  category: string;
  withdrawDate?: string;
  devolutionDate?: string;
}

export function BookCard({
  id,
  name,
  readerName,
  authors,
  category,
  withdrawDate,
  devolutionDate,
}: BookCardProps) {
  return (
    <Grid item>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          maxWidth: '350px',
          minWidth: '350px',
          boxShadow: '5px 8px 8px -1px rgb(0 0 0 / 15%)',
          borderRadius: '32px',
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            noWrap={true}
            title={name}
            sx={{ fontWeight: 'bold', maxWidth: '291px' }}
          >
            {name}
          </Typography>
          {authors && (
            <Typography align="center">Autores: {authors}</Typography>
          )}
          {readerName && withdrawDate && devolutionDate && (
            <Stack spacing={1}>
              <Typography align="center">Leitor: {readerName}</Typography>
              <Typography align="center">
                Data de retirada: {withdrawDate}
              </Typography>
              <Typography align="center">
                Data de devolução: {devolutionDate}
              </Typography>
            </Stack>
          )}
          <Typography align="center">Categoria: {category}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            href={`/reservas/obras/${id}`}
            sx={{ py: 1.5 }}
          >
            Ver obra
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
