import { CoordinatesContext } from './CoordinatesContext';
import { useState } from 'react';

type ContextProviderProps = {
  children: React.ReactNode;
};
export function CoordinatesContextProvider({ children }: ContextProviderProps) {
  const [coordinates, setCoordinates] = useState<[number, number]>([0, 0]);

  return <CoordinatesContext.Provider value={{ coordinates, setCoordinates }}>{children}</CoordinatesContext.Provider>;
}
