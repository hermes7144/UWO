import { createContext, useContext } from 'react';
import { User } from '@firebase/auth';

type UserisAdmin = User & {
  isAdmin?: boolean;
};

export const AuthContext = createContext<UserisAdmin | null>(null);

export function useAuthContext() {
  return useContext(AuthContext);
}
