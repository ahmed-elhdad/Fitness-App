"use client";
import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface AppContextType {
  isLoaded: boolean;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
  isLogIn: boolean;
  setIsLogIn: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [isLoaded, setIsLoaded] = useState(false),
    [isLogIn, setIsLogIn] = useState(false);

  const value: AppContextType = {
    isLoaded,
    setIsLoaded,
    isLogIn,
    setIsLogIn,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
