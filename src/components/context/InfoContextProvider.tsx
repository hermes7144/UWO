import { getGoods } from '../../api/firebase';
import { InfoContext } from './InfoContext';

type ContextProviderProps = {
  children: React.ReactNode;
};
export function InfoContextProvider({ children }: ContextProviderProps) {
  return <InfoContext.Provider value={{ getGoods }}>{children}</InfoContext.Provider>;
}
