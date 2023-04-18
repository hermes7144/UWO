import React from 'react';
import { RouteHooksContext } from './RouteHooksContext';
import useRoute from '../hooks/useRoute';
type ContextProviderProps = {
  children: React.ReactNode;
};

export default function RouteHooksProvider({ children }: ContextProviderProps) {
  return <RouteHooksContext.Provider value={{ useRoute }}>{children}</RouteHooksContext.Provider>;
}
