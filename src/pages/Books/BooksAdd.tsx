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
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

type categoryType = {
  cat_id: string;
  desc_cat: string;
  dias_limite: number;
  multa: number;
};

export default function BooksAdd() {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState({} as categoryType);
  const [authors, setAuthors] = useState('');
  const [keywords, setKeywords] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [edition, setEdition] = useState('');
  const [pages, setPages] = useState('');
  const [publisher, setPublisher] = useState('');

  const { userToken, login } = useContext(UserContext);

  const navigate = useNavigate();

  const [categories, setCategories] = useState<categoryType[]>([]);

  useEffect(() => {
    async function getCategories() {
      try {
        if (userToken) {
          const response = await api.get('/book_cat/findall', {
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

  // if (login === false) return <Navigate to="/" />;

  async function addBook(e: FormEvent) {
    e.preventDefault();

    if (userToken) {
      try {
        const response = await api.post(
          '/books/register',
          {
            isn_id: code,
            titulo: title,
            autores: authors,
            plv_chave: keywords,
            editora: publisher,
            num_pag: pages,
            num_ed: edition,
            dt_public: publicationYear,
            emprestado: false,
            reservado: false,
            categoria: {
              cat_id: category.cat_id,
              desc_cat: category.desc_cat,
              dias_limite: category.dias_limite,
              multa: category.multa,
            },
          },
          {
            headers: { Authorization: 'Bearer ' + userToken },
          }
        );
        if (response.status === 200) {
          toast.success('Obra adicionada com sucesso');
          navigate('/obras');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <Header />
      <Container sx={{ pb: 6 }}>
        <Title title="Adicionar obra" />
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }}>
          <Stack spacing={4}>
            <Grid container sx={{ justifyContent: 'space-around', gap: 4 }}>
              <Grid item>
                <TextField
                  required
                  label="Código"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  label="Título"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  label="Autores"
                  value={authors}
                  onChange={(e) => setAuthors(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  multiline
                  label="Palavras-chave"
                  value={keywords}
                  sx={{ minWidth: '223px' }}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  type="number"
                  label="Ano de publicação"
                  value={publicationYear}
                  onChange={(e) => setPublicationYear(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container sx={{ justifyContent: 'space-around', gap: 4 }}>
              <Grid item>
                <TextField
                  required
                  type="number"
                  label="Número da edição"
                  value={edition}
                  onChange={(e) => setEdition(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  type="number"
                  label="Número de páginas"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  label="Editora"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
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
            onClick={addBook}
          >
            Adicionar
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
