import { Box, Button, Container, Grid } from '@mui/material';
import { Header } from '../../components/Header';
import { ManagerCard } from '../../components/ManagerCard';
import { Title } from '../../components/Title';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Footer from '../../components/Footer';
import { useContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { UserContext } from '../../contexts/UserContext';

interface EmployeeProps {
  nome: string;
  tel: string;
  cpf: string;
}

export default function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const { userToken } = useContext(UserContext);

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get('/worker/findall', {
          headers: {
            Authorization: 'Bearer ' + userToken,
          },
        });

        setEmployees(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [userToken]);
  return (
    <>
      <Header />
      <Container sx={{ pb: 6 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            mb: 4,
          }}
        >
          <Title title="Gerenciar funcionários" />
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            sx={{ py: 1.5 }}
            href="/funcionarios/adicionar"
          >
            Adicionar funcionário
          </Button>
        </Box>
        <Grid container spacing={6}>
          {employees.map((employee: EmployeeProps) => (
            <ManagerCard
              cardType="funcionario"
              key={employee.cpf}
              id={employee.cpf}
              name={employee.nome}
              phone={employee.tel}
            />
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
