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
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ReadersAdd() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  // const [categories, setCategories] = useState<string[]>([]);

  const { userToken } = useContext(UserContext);

  const a = ['aluno', 'professor', 'externo'];

  const navigate = useNavigate();

  // setCategories(a);

  // useEffect(() => {
  //   async function getData() {
  //     const response = await api.get('')
  //   }
  //   getData()
  // }, [])

  async function addReader(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await api.post(
        '/reader/register',
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
            cat_id: category,
            desc_cat: 'aaa',
            dias_limite: 8,
          },
        },
        {
          headers: {
            Authorization: 'Bearer ' + userToken,
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        toast.success('Leitor adicionado com sucesso');
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
        <Title title="Adicionar leitor" />
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
                    value={category}
                    onChange={(e: SelectChangeEvent) =>
                      setCategory(e.target.value)
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
            onClick={addReader}
          >
            Adicionar
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
