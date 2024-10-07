import { ReactElement } from 'react';
import { useAuthContext } from '../../Hooks';
import { Navigate } from 'react-router-dom';

interface IRequireAuthProps {
  children: ReactElement;
}

export function RequireAuth({ children }: IRequireAuthProps): ReactElement {
  const { isLoggedIn } = useAuthContext();

  if (isLoggedIn === false) {
    console.log('redirring to login');
    return <Navigate to='/login' />;
  }

  return children;
}
