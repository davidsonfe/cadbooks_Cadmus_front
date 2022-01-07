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

type UserType = {
  nome: string;
  cpf: string;
  // tel: string;
  // endereco: string;
  // cidade: string;
  // estado: string;
  token: string;
  admin: boolean;
};

type UserContextType = {
  userLogin: (cpf: string, passwd: string) => void;
  login: boolean;
  loading: boolean;
  userLogout: () => void;
  user: UserType;
  userToken: string;
};

interface UserContextProviderProps {
  children: ReactNode;
}

// interface ResponseProps {
//   status: number;
//   data: {
//     token: string;
//   };
// }

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({} as UserType);
  const [userToken, setUserToken] = useState('');
  let response: any = null;

  const navigate = useNavigate();

  async function getUser(token: string) {
    const response = await api.get('/verifyToken', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    setUserToken(token);
    setUser(response.data[0]);
    setLogin(true);
  }

  const userLogout = useCallback(
    async function () {
      setLogin(false);
      window.localStorage.removeItem('token');
      navigate('/');
    },
    [navigate]
  );

  async function verifyToken(token: string) {
    try {
      const tokenRes = await api.get('/verify', {
        headers: { Authorization: 'Bearer ' + token },
      });

      if (tokenRes.status === 200) {
        window.localStorage.setItem('token', token);
        setUserToken(token);
        return true;
      }
    } catch (error) {
      toast.error('Token invalido');
      return false;
    }
  }

  async function userLogin(cpf: string, passwd: string) {
    try {
      setLoading(true);
      response = await api.post('/login', {
        cpf,
        passwd,
      });

      if (response.status === 200) {
        const { token } = response.data[0];
        const tokenVerified = await verifyToken(token);

        if (tokenVerified) {
          await getUser(token);
          navigate('/painel');
        }
      }
    } catch (error) {
      setLogin(false);

      if (!response) {
        return toast.error(
          'Ocorreu um erro, por favor tente novamente mais tarde!'
        );
      }

      if (response.status === 400) {
        return toast.error('CPF ou senha inválidos!');
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        const tokenVerified = await verifyToken(token);
        if (tokenVerified) {
          await getUser(token);
        } else {
          setLogin(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, []);
  console.log(userToken);

  return (
    <UserContext.Provider
      value={{ userLogin, login, loading, userLogout, user, userToken }}
    >
      {children}
    </UserContext.Provider>
  );
}
