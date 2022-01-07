import { Button, Card, Grid, Stack, Typography } from '@mui/material';

import editIcon from '../../assets/editar.svg';
import deleteIcon from '../../assets/deletar.svg';
import checkIcon from '../../assets/check.svg';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { api } from '../../services/api';

import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

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
  authors?: string;
  category?: string;
  date?: string;
  devolution?: string;
  withdraw?: string;
  employee?: string;
  phone?: string;
  id: string;
}

export function ManagerCard({
  cardType,
  name,
  bookName,
  email,
  authors,
  category,
  date,
  devolution,
  withdraw,
  employee,
  phone,
  id,
}: ManagerCardProps) {
  const { userToken } = useContext(UserContext);
  const navigate = useNavigate();

  async function deleteReader(id: string) {
    const deleteConfirm = window.confirm(`Tem certeza que deseja deletar?`);

    if (deleteConfirm) {
      try {
        const response = await api.delete(`/reader/delete/${id}`, {
          headers: { Authorization: 'Bearer ' + userToken },
        });

        if (response.status === 200) {
          navigate('/painel');
          navigate('/leitores');
          return toast.success('Leitor deletado com sucesso');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function deleteReadersCategories(id: string) {
    const deleteConfirm = window.confirm(`Tem certeza que deseja deletar?`);

    if (deleteConfirm) {
      try {
        const response = await api.delete(`/reader_cat/delete/${id}`, {
          headers: { Authorization: 'Bearer ' + userToken },
        });

        if (response.status === 200) {
          navigate('/painel');
          navigate('/categorias-leitores');
          return toast.success('Categoria deletada com sucesso');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function deleteEmployee(id: string) {
    const deleteConfirm = window.confirm(`Tem certeza que deseja deletar?`);

    if (deleteConfirm) {
      try {
        const response = await api.delete(`/worker/delete/${id}`, {
          headers: { Authorization: 'Bearer ' + userToken },
        });

        if (response.status === 200) {
          navigate('/painel');
          navigate('/funcionarios');
          return toast.success('Funcionário deletado com sucesso');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function deleteBook(id: string) {
    const deleteConfirm = window.confirm(`Tem certeza que deseja deletar?`);

    if (deleteConfirm) {
      try {
        const response = await api.delete(`/books/delete/${id}`, {
          headers: { Authorization: 'Bearer ' + userToken },
        });

        if (response.status === 200) {
          navigate('/painel');
          navigate('/obras');
          return toast.success('Obra deletada com sucesso');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function deleteBooksCategories(id: string) {
    const deleteConfirm = window.confirm(`Tem certeza que deseja deletar?`);

    if (deleteConfirm) {
      try {
        const response = await api.delete(`/book_cat/delete/${id}`, {
          headers: { Authorization: 'Bearer ' + userToken },
        });

        if (response.status === 200) {
          navigate('/painel');
          navigate('/categorias-obras');
          return toast.success('Categoria deletada com sucesso');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function deleteBooking(id: string) {
    const deleteConfirm = window.confirm(`Tem certeza que deseja deletar?`);

    if (deleteConfirm) {
      try {
        const response = await api.delete(`/reserv/delete/${id}`, {
          headers: { Authorization: 'Bearer ' + userToken },
        });

        if (response.status === 200) {
          navigate('/painel');
          navigate('/reservas');
          return toast.success('Reserva deletada com sucesso');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleDelete(id: string) {
    if (cardType === 'leitor') {
      deleteReader(id);
    } else if (cardType === 'funcionario') {
      deleteEmployee(id);
    } else if (cardType === 'categoria-leitores') {
      deleteReadersCategories(id);
    } else if (cardType === 'categoria-obras') {
      deleteBooksCategories(id);
    } else if (cardType === 'obra') {
      deleteBook(id);
    } else if (cardType === 'reserva') {
      deleteBooking(id);
    }
  }

  async function BookingConfirm() {
    const bookingConfirm = window.confirm(`Deseja realizar o empréstimo?`);

    if (bookingConfirm) {
      if (userToken) {
        try {
          const response = await api.post(
            '/borrow/register',
            {
              doc_id: name,
              cpf: employee,
              isn_id_cop: id,
            },
            {
              headers: { Authorization: 'Bearer ' + userToken },
            }
          );
          if (response.status === 200) {
            toast.success('Empréstimo realizado com sucesso');
            navigate('/painel');
          }
          console.log(response);
        } catch (error) {
          throw new Error('deu erro');
        }
      }
    }
  }

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
                Data da reserva: {date}
              </Typography>
              <Typography noWrap={true} title={withdraw}>
                Data de retirada: {withdraw}
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
              <Typography noWrap={true} title={authors}>
                Autores: {authors}
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
              <Typography noWrap={true} title={category}>
                Categoria: {category}
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
                {name}
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
            {cardType === 'reserva' ? (
              <Button color="success" onClick={BookingConfirm}>
                <img src={checkIcon} alt="Confirmar" />
              </Button>
            ) : (
              <Button
                color="info"
                href={`/${
                  cardType === 'funcionario'
                    ? 'funcionarios'
                    : cardType === 'leitor'
                    ? 'leitores'
                    : cardType === 'categoria-leitores'
                    ? 'categorias-leitores'
                    : cardType === 'categoria-obras'
                    ? 'categorias-obras'
                    : cardType === 'obra'
                    ? 'obras'
                    : ''
                }/editar/${id}`}
              >
                <img src={editIcon} alt="Editar" />
              </Button>
            )}
            <Button color="error" onClick={() => handleDelete(id)}>
              <img src={deleteIcon} alt="Deletar" />
            </Button>
          </Stack>
        ) : null}
      </Card>
    </Grid>
  );
}
