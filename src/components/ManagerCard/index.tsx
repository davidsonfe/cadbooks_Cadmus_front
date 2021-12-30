import { Button, Card, Grid, Stack, Typography } from '@mui/material';

import editIcon from '../../assets/editar.svg';
import deleteIcon from '../../assets/deletar.svg';
import checkIcon from '../../assets/check.svg';

interface ManagerCardProps {
  cardType:
    | 'reserva'
    | 'leitor'
    | 'obra'
    | 'funcionario'
    | 'obra-emprestada'
    | 'obra-atrasada'
    | 'reserva-efetuada'
    | 'categoria-leitores'
    | 'categoria-obras';
  name?: string;
  bookName?: string;
  email?: string;
  author?: string;
  category?: string;
  date?: string;
  devolution?: string;
  employee?: string;
  phone?: string;
}

export function ManagerCard({
  cardType,
  name,
  bookName,
  email,
  author,
  category,
  date,
  devolution,
  employee,
  phone,
}: ManagerCardProps) {
  return (
    <Grid item>
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 4,
          maxWidth: '350px',
          minWidth: '350px',
          boxShadow: '5px 8px 8px -1px rgb(0 0 0 / 15%)',
          borderRadius: '32px',
        }}
      >
        <Stack
          spacing={1}
          sx={{
            maxWidth:
              cardType !== 'obra-emprestada' &&
              cardType !== 'obra-atrasada' &&
              cardType !== 'reserva-efetuada'
                ? '200px'
                : '100%',
          }}
        >
          {cardType === 'reserva' ? (
            <>
              <Typography
                variant="h6"
                noWrap={true}
                sx={{ fontWeight: 'bold' }}
                title={bookName}
              >
                {bookName}
              </Typography>
              <Typography noWrap={true} title={name}>
                Reservado por: {name}
              </Typography>
              <Typography noWrap={true} title={employee}>
                Responsável: {employee}
              </Typography>
              <Typography noWrap={true} title={date}>
                Data de retirada: {date}
              </Typography>
            </>
          ) : cardType === 'leitor' ? (
            <>
              <Typography
                variant="h6"
                noWrap={true}
                sx={{ fontWeight: 'bold' }}
                title={name}
              >
                {name}
              </Typography>
              <Typography noWrap={true} title={email}>
                {email}
              </Typography>
              <Typography noWrap={true} title={category}>
                {category}
              </Typography>
            </>
          ) : cardType === 'obra' ? (
            <>
              <Typography
                variant="h6"
                noWrap={true}
                sx={{ fontWeight: 'bold' }}
                title={bookName}
              >
                {bookName}
              </Typography>
              <Typography noWrap={true} title={author}>
                Autor: {author}
              </Typography>
              <Typography noWrap={true} title={category}>
                {category}
              </Typography>
            </>
          ) : cardType === 'funcionario' ? (
            <>
              <Typography
                variant="h6"
                noWrap={true}
                sx={{ fontWeight: 'bold' }}
                title={name}
              >
                {name}
              </Typography>
              <Typography noWrap={true} title={phone}>
                Telefone: {phone}
              </Typography>
            </>
          ) : cardType === 'obra-emprestada' ? (
            <>
              <Typography
                variant="h6"
                noWrap={true}
                sx={{ fontWeight: 'bold' }}
                title={bookName}
              >
                {bookName}
              </Typography>
              <Typography noWrap={true} title={name}>
                Emprestado por: {name}
              </Typography>
              <Typography noWrap={true} title={date}>
                Retirada: {date}
              </Typography>
              <Typography noWrap={true} title={devolution}>
                Devolução: {devolution}
              </Typography>
            </>
          ) : cardType === 'obra-atrasada' ? (
            <>
              <Typography
                variant="h6"
                noWrap={true}
                sx={{ fontWeight: 'bold' }}
                title={name}
              >
                Emprestado por: {name}
              </Typography>
              <Typography noWrap={true} title={phone}>
                Telefone: {phone}
              </Typography>
              <Typography noWrap={true} title={email}>
                E-mail: {email}
              </Typography>
              <Typography noWrap={true} title={date}>
                Empréstimo: {date}
              </Typography>
              <Typography noWrap={true} title={devolution} color="error">
                Devolução: {devolution}
              </Typography>
            </>
          ) : cardType === 'reserva-efetuada' ? (
            <>
              <Typography
                variant="h6"
                noWrap={true}
                sx={{ fontWeight: 'bold' }}
                title={bookName}
              >
                {bookName}
              </Typography>
              <Typography noWrap={true} title={name}>
                Reservado por: {name}
              </Typography>
              <Typography noWrap={true} title={phone}>
                Telefone: {phone}
              </Typography>
              <Typography noWrap={true} title={email}>
                E-mail: {email}
              </Typography>
            </>
          ) : cardType === 'categoria-leitores' ? (
            <>
              <Typography
                variant="h6"
                noWrap={true}
                sx={{ fontWeight: 'bold' }}
                title={name}
              >
                {name}
              </Typography>
            </>
          ) : cardType === 'categoria-obras' ? (
            <>
              <Typography
                variant="h6"
                noWrap={true}
                sx={{ fontWeight: 'bold' }}
                title={name}
              >
                {name}
              </Typography>
            </>
          ) : null}
        </Stack>

        {cardType !== 'obra-emprestada' &&
        cardType !== 'obra-atrasada' &&
        cardType !== 'reserva-efetuada' ? (
          <Stack spacing={2}>
            <Button color={cardType === 'reserva' ? 'success' : 'info'}>
              {cardType === 'reserva' ? (
                <img src={checkIcon} alt="Confirmar" />
              ) : (
                <img src={editIcon} alt="Editar" />
              )}
            </Button>
            <Button color="error">
              <img src={deleteIcon} alt="Deletar" />
            </Button>
          </Stack>
        ) : null}
      </Card>
    </Grid>
  );
}
