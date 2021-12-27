import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { UserContextProvider } from './contexts/UserContext';
import Login from './pages/Login';
import Panel from './pages/Panel';
import { theme } from './styles/theme';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <ToastContainer autoClose={5000} />
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/painel" element={<Panel />} />
          </Routes>
        </ThemeProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
