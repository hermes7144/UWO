import { createContext, useContext } from 'react';

interface ICoordinatesContext {
  coordinates: [number, number];
  setCoordinates: React.Dispatch<React.SetStateAction<[number, number]>>;
}

export const CoordinatesContext = createContext<ICoordinatesContext | null>(null);

export function useCoordinatesContext() {
  return useContext(CoordinatesContext);
}
