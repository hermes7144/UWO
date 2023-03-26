import { createContext, useContext } from 'react';

interface IUWORouteContext {
  useCity: any;
}

export const RouteHooksContext = createContext<IUWORouteContext | null>(null);

export function useRouteHooksContext() {
  return useContext(RouteHooksContext);
}
