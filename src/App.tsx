import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Login from './pages/Login';
import Panel from './pages/Panel';
import { theme } from './styles/theme';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/painel" element={<Panel />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
