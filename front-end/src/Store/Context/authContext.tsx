import React, {
  createContext, useContext, useEffect, useState
} from 'react';
import { IUser } from '../Interfaces/userInterfaces';
import api, { setTokenApi } from '../Services/api';
import { LoginUser } from '../Services/userServices';

interface IAuthContextUser {
  user?: IUser;
  signed: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  // eslint-disable-next-line no-unused-vars
  Login(email: string, password: string): Promise<void>;
  LogOut(): void;
}

const AuthContext = createContext<IAuthContextUser>({} as IAuthContextUser);

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

type Props = {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser>();

  const Login = async (email: string, password: string) => {
    await LoginUser(email, password).then((response) => setUser(response.user));
  };

  const LogOut = () => {
    setUser(undefined);
    localStorage.removeItem('@App:user');
    localStorage.removeItem('@App:token');
    delete api.defaults.headers.common.Authorization;
  };

  useEffect(() => {
    const storagedUser = localStorage.getItem('@App:user');
    const storagedToken = localStorage.getItem('@App:token');

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      setTokenApi(storagedToken);
    }
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      signed: Boolean(user),
      Login,
      user,
      setUser,
      LogOut
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
