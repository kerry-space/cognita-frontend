import { createContext, ReactElement, ReactNode } from 'react';
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
  const [tokens, setTokens, clearTokens] = useLocalStorage<ITokens | null>(
    TOKENS,
    null
  );
  const values: IAuthContext = { isLoggedIn: tokens !== null, login, logout,tokens };

  async function login({ userName, password }: ILoginCredentials) {
    const tokens = await loginReq({ userName, password });
    setTokens(tokens);
  }

  function logout() {
    clearTokens();
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
