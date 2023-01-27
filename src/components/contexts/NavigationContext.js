import { createContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const NavigationContext = createContext();
export default NavigationContext;

export function NavigationContextProvider({ children }) {
  const [choosedMovie, setUserData] = useLocalStorage('userData', {});

  return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>;
}
