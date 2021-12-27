import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../services/api';

type UserContextType = {
  userLogin: (cpf: string, passwd: string) => void;
  login: boolean;
  loading: boolean;
  userLogout: () => void;
};

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userLogout = useCallback(
    async function () {
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem('token');
      navigate('/');
    },
    [navigate]
  );

  async function userLogin(cpf: string, passwd: string) {
    try {
      setLoading(true);
      const response = await api.post('/login', {
        cpf,
        passwd,
      });

      if (response.status === 200) {
        const { token } = response.data;
        window.localStorage.setItem('token', token);

        setLogin(true);

        navigate('/painel');
      }
    } catch (error) {
      setLogin(false);

      return toast.error('CPF ou senha inválidos!');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setLoading(true);

          await userLogin('00099988811', '1234554321');
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider value={{ userLogin, login, loading, userLogout }}>
      {children}
    </UserContext.Provider>
  );
}
