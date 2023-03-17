import { createContext, useContext } from 'react';

interface IInfoContext {
  getGoods(id: number): Promise<any[]>;
}

export const InfoContext = createContext<IInfoContext | null>(null);

export function useInfoContext() {
  return useContext(InfoContext);
}
