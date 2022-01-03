import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { UserContextProvider } from './contexts/UserContext';
import Login from './pages/Login';
import Panel from './pages/Panel';
import { theme } from './styles/theme';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Readers from './pages/Readers';
import Books from './pages/Books';
import Booking from './pages/Booking';
import Employees from './pages/Employees';
import Devolutions from './pages/Devolutions';
import Borrowed from './pages/Borrowed';
import DelayedBooks from './pages/DelayedBooks';
import DoneBooking from './pages/DoneBooking';
import ReadersCategories from './pages/ReadersCategories';
import BooksCategories from './pages/BooksCategories';

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <ToastContainer autoClose={5000} />
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/painel" element={<Panel />} />
            <Route path="/leitores/*" element={<Readers />} />
            <Route path="/obras" element={<Books />} />
            <Route path="/reservas" element={<Booking />} />
            <Route path="/funcionarios/*" element={<Employees />} />
            <Route path="/devolucoes" element={<Devolutions />} />
            <Route path="/obras-emprestadas" element={<Borrowed />} />
            <Route path="/obras-atrasadas" element={<DelayedBooks />} />
            <Route path="/reservas-efetuadas" element={<DoneBooking />} />
            <Route
              path="/categorias-leitores"
              element={<ReadersCategories />}
            />
            <Route path="/categorias-obras" element={<BooksCategories />} />
          </Routes>
        </ThemeProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
