import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import { Header } from '../../components/Header';
import { Title } from '../../components/Title';
import Footer from '../../components/Footer';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { UserContext } from '../../contexts/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ReaderProps {
  categoria: {
    cat_id: string;
    desc_cat: string;
    dias_limite: number;
  };
  cidade: string;
  doc_id: string;
  dt_nasc: string;
  email: string;
  endereco: string;
  estado: string;
  nome: string;
  tel: string;
}

export default function ReadersEdit() {
  const query = useLocation();
  const id = query.pathname.split('/editar/')[1];

  const navigate = useNavigate();

  const { userToken } = useContext(UserContext);

  // const [reader, setReader] = useState({} as ReaderProps);

  const a = ['aluno', 'professor', 'externo'];
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [cpf, setCpf] = useState('');
  const [category, setCategory] = useState({
    cat_id: '',
    desc_cat: '',
    dias_limite: 0,
  });

  useEffect(() => {
    async function getData() {
      const response = await api.get(`/reader/findone/${id}`, {
        headers: { Authorization: 'Bearer ' + userToken },
      });

      setName(response.data[0].nome);
      setAddress(response.data[0].endereco);
      setCity(response.data[0].cidade);
      setState(response.data[0].estado);
      setPhone(response.data[0].tel);
      setEmail(response.data[0].email);
      setBirthDate(response.data[0].dt_nasc);
      setCpf(response.data[0].doc_id);
      setCategory(response.data[0].categoria);
    }
    getData();
  }, [id, userToken]);

  async function editReader(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await api.put(
        `/reader/update/${id}`,
        {
          nome: name,
          endereco: address,
          cidade: city,
          estado: state,
          tel: phone,
          email,
          doc_id: cpf,
          dt_nasc: birthDate,
          categoria: {
            cat_id: category.cat_id,
            desc_cat: 'aaa',
            dias_limite: 8,
          },
        },
        {
          headers: { Authorization: 'Bearer ' + userToken },
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success('Leitor atualizado com sucesso');
        navigate('/leitores');
      }
    } catch (error) {
      throw new Error('deu erro');
    }
  }

  return (
    <>
      <Header />
      <Container sx={{ pb: 6 }}>
        <Title title="Editar leitor" />
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
                  label="Telefone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>

              <Grid item>
                <TextField
                  required
                  label="E-mail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container sx={{ justifyContent: 'space-around', gap: 4 }}>
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
                  label="Data de nascimento"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </Grid>
              <Grid item>
                <FormControl fullWidth>
                  <InputLabel id="categoria">Categoria</InputLabel>
                  <Select
                    required
                    labelId="categoria"
                    label="Categoria"
                    sx={{ minWidth: 223 }}
                    value={category?.cat_id}
                    onChange={(e: SelectChangeEvent) =>
                      setCategory({ ...category, cat_id: e.target.value })
                    }
                  >
                    {a.map((categora) => (
                      <MenuItem key={categora} value={categora}>
                        {categora}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container sx={{ justifyContent: 'space-around', gap: 4 }}>
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
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </Grid>

              <Grid item>
                <TextField
                  required
                  label="CPF"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
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
            onClick={editReader}
          >
            Salvar
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
