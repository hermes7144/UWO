import { createContext, useContext } from 'react';
import { Dispatch, SetStateAction } from 'react';

interface IUWORouteContext {
  citys: number[];
  setCitys: Dispatch<SetStateAction<number[]>>;
  coordinates: [number, number] | null;
  setCoordinates: Dispatch<SetStateAction<[number, number] | null>>;
  editable: boolean;
  setEditable: Dispatch<SetStateAction<boolean>>;
}

export const UWORouteContext = createContext<IUWORouteContext | null>(null);

export function useUWORouteContext() {
  return useContext(UWORouteContext);
}
