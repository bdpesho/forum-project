import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    showCreateThread: false,
  });

  return (
    <AppContext.Provider
      value={{ showCreateThread: appState.showCreateThread, setAppState }}
    >
      {children}
    </AppContext.Provider>
  );
};
