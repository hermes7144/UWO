import { getGoods } from '../../api/firebase';
import { InfoContext } from './InfoContext';
import { useState } from 'react';

type ContextProviderProps = {
  children: React.ReactNode;
};
export function InfoContextProvider({ children }: ContextProviderProps) {
  const [citys, setCitys] = useState<number[]>([]);

  type RouteType = {
    id: string;
    title: string;
    remark: string;
  };
  const [route, setRoute] = useState<RouteType>({ id: '', title: '', remark: '' });

  return <InfoContext.Provider value={{ citys, setCitys, route, setRoute, getGoods }}>{children}</InfoContext.Provider>;
}
