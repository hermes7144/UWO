import React from 'react';
import { RouteHooksContext } from './RouteHooksContext';
import useCity from '../Hooks/useCity';
type ContextProviderProps = {
  children: React.ReactNode;
};

export default function RouteHooksProvider({ children }: ContextProviderProps) {
  return <RouteHooksContext.Provider value={{ useCity }}>{children}</RouteHooksContext.Provider>;
}
