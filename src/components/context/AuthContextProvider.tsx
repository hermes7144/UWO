import React from 'react';
import { useEffect, useState } from 'react';
import { onUserStateChange } from '../../api/firebase';
import { AuthContext } from './AuthContext';
import { User } from '@firebase/auth';

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onUserStateChange((user: User) => {
      setUser(user);
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
