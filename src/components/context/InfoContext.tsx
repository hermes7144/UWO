import { createContext, useContext } from 'react';

type RouteType = {
  id: string;
  title: string;
  remark: string;
};

interface IInfoContext {
  citys: number[];
  setCitys: React.Dispatch<React.SetStateAction<number[]>>;
  route: RouteType;
  setRoute: React.Dispatch<React.SetStateAction<RouteType>>;
  getGoods(id: number): Promise<any[]>;
}

export const InfoContext = createContext<IInfoContext | null>(null);

export function useInfoContext() {
  return useContext(InfoContext);
}
