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
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type categoryType = {
  cat_id: string;
  desc_cat: string;
  dias_limite: number;
};

export default function ReadersAdd() {
  const [categories, setCategories] = useState<categoryType[]>([]);

  const { userToken, login } = useContext(UserContext);

  useEffect(() => {
    async function getCategories() {
      try {
        if (userToken) {
          const response = await api.get('/reader_cat/findall', {
            headers: { Authorization: 'Bearer ' + userToken },
          });

          if (response.status === 200) {
            setCategories(response.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    getCategories();
  }, [userToken]);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState({} as categoryType);

  const navigate = useNavigate();

  // if (login === false) return <Navigate to="/" />;

  async function addReader(e: FormEvent) {
    e.preventDefault();

    try {
      if (userToken) {
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
              cat_id: category.cat_id,
              desc_cat: category.desc_cat,
              dias_limite: category.dias_limite,
            },
          },
          {
            headers: {
              Authorization: 'Bearer ' + userToken,
            },
          }
        );

        if (response.status === 200) {
          toast.success('Leitor adicionado com sucesso');
          navigate('/leitores');
        }
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
                  placeholder="mm-dd-aaaa"
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
                    value={category.cat_id || ''}
                    onChange={(e: SelectChangeEvent) => {
                      const catId = e.target.value;
                      const category = categories.find(
                        (c) => c.cat_id === catId
                      );

                      if (category) {
                        setCategory(category);
                      }
                    }}
                  >
                    {categories.map((category: categoryType) => {
                      return (
                        <MenuItem key={category.cat_id} value={category.cat_id}>
                          {category.cat_id}
                        </MenuItem>
                      );
                    })}
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
                  placeholder="Ex: SP"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </Grid>

              <Grid item>
                <TextField
                  required
                  label="CPF"
                  placeholder="apenas números"
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
