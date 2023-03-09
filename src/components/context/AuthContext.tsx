import { createContext, useContext } from 'react';
import { User } from '@firebase/auth';

export const AuthContext = createContext<User | null>(null);

export function useAuthContext() {
  return useContext(AuthContext);
}
