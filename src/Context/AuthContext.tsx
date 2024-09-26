import {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import {
  IAuthContext,
  ILoginCredentials,
  ITokens,
  loginReq,
  TOKENS,
} from '../utils';
import { useLocalStorage } from 'usehooks-ts';

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: IAuthProviderProps): ReactElement {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [tokens, setTokens, clearTokens] = useLocalStorage<ITokens | null>(
    TOKENS,
    null
  );
  const values: IAuthContext = { isLoggedIn, login, logout };

  async function login({ userName, password }: ILoginCredentials) {
    const tokens = await loginReq({ userName, password });
    setTokens(tokens);
  }

  function logout() {
    clearTokens();
  }

  useEffect(() => {
    if (tokens === null) setIsLoggedIn(false);
    if (tokens) setIsLoggedIn(true);
  }, [tokens]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
