import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    showCreateThread: false,
    showCreateComments: false,
  });

  return (
    <AppContext.Provider
      value={{ showCreateThread: appState.showCreateThread, showCreateComments: appState.showCreateComments, setAppState }}
    >
      {children}
    </AppContext.Provider>
  );
};
