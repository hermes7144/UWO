import { useState } from 'react';
import { UWORouteContext } from './UWORouteContext';

type ContextProviderProps = {
  children: React.ReactNode;
};

export default function UWORouteContextProvider({ children }: ContextProviderProps) {
  const [citys, setCitys] = useState<number[]>([]);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [editable, setEditable] = useState<boolean>(false);

  return <UWORouteContext.Provider value={{ citys, setCitys, coordinates, setCoordinates, editable, setEditable }}>{children}</UWORouteContext.Provider>;
}
