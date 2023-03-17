import React from 'react';
import { useEffect, useState } from 'react';
import { login, logout, onUserStateChange } from '../../api/firebase';
import { AuthContext } from './AuthContext';
import { User } from '@firebase/auth';

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onUserStateChange((user: User) => {
      setUser(user);
    });
  }, []);

  return <AuthContext.Provider value={{ user, uid: user && user.uid, login, logout }}>{children}</AuthContext.Provider>;
}
