import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import { Header } from '../../components/Header';
import { Title } from '../../components/Title';
import Footer from '../../components/Footer';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { UserContext } from '../../contexts/UserContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EmployeersEdit() {
  const query = useLocation();
  const id = query.pathname.split('/editar/')[1];

  const { userToken, login } = useContext(UserContext);

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [cpf, setCpf] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get(`/worker/findone/${id}`, {
          headers: { Authorization: 'Bearer ' + userToken },
        });

        setName(response.data[0].nome);
        setAddress(response.data[0].endereco);
        setCity(response.data[0].cidade);
        setState(response.data[0].estado);
        setPhone(response.data[0].tel);
        setBirthDate(response.data[0].dt_nasc);
        setCpf(response.data[0].cpf);
        setIsAdmin(response.data[0].admin);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [id, userToken]);

  // if (login === false) return <Navigate to="/" />;

  async function editEmployee(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await api.put(
        `/worker/update/${id}`,
        {
          nome: name,
          endereco: address,
          cidade: city,
          estado: state,
          tel: phone,
          cpf,
          dt_nasc: birthDate,
          admin: isAdmin,
        },
        {
          headers: { Authorization: 'Bearer ' + userToken },
        }
      );
      if (response.status === 200) {
        toast.success('Funcionário atualizado com sucesso');
        navigate('/funcionarios');
      }
    } catch (error) {
      toast.error('Por favor, revise os dados e tente novamente');
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <Container sx={{ pb: 6 }}>
        <Title title="Editar funcionário" />
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }}>
          <Stack spacing={4}>
            <Grid container sx={{ justifyContent: 'space-around', gap: 4 }}>
              <Grid item>
                <TextField
                  required
                  label="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid item>
                <TextField
                  required
                  label="Endereço"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>

              <Grid item>
                <TextField
                  required
                  label="Telefone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container sx={{ justifyContent: 'space-around', gap: 4 }}>
              <Grid item>
                <TextField
                  required
                  label="Data de nascimento"
                  placeholder="mm-dd-aaaa"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </Grid>

              <Grid item>
                <TextField
                  required
                  label="Cidade"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  label="UF"
                  placeholder="Ex: SP"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container sx={{ justifyContent: 'space-around', gap: 4 }}>
              <Grid item>
                <TextField
                  required
                  label="CPF"
                  placeholder="apenas números"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </Grid>

              <Grid item>
                <FormControl component="fieldset" sx={{ minWidth: '223px' }}>
                  <FormLabel component="legend">Administrador</FormLabel>
                  <RadioGroup
                    aria-label="Administrador"
                    name="radio-buttons-group"
                    row
                    value={isAdmin}
                    onChange={() => setIsAdmin(!isAdmin)}
                  >
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="Não"
                    />
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Sim"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Stack>

          <Button
            variant="contained"
            type="submit"
            sx={{
              mt: 8,
              width: '50%',
              alignSelf: 'center',
              py: 1.8,
            }}
            onClick={editEmployee}
          >
            Salvar
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
