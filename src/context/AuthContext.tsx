import { createContext, useContext } from 'react';
import { User } from '@firebase/auth';

type UserType = {
  user: User & {
    isAdmin?: boolean;
  };
  uid?: string;
  login: () => {};
  logout: () => void;
};

export const AuthContext = createContext<UserType | null>(null);

export function useAuthContext() {
  return useContext(AuthContext);
}
