import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

export function useAuthContext() {
  return useContext(AuthContext);
}
