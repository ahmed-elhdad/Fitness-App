"use client";
import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface AppContextType {
  isLoaded: boolean;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
  isLogIn: boolean;
  setIsLogIn: Dispatch<SetStateAction<boolean>>;
  searchPrompt: string;
  setSearchPrompt?: Dispatch<SetStateAction<string>>;
  chalenges: [];
  setChalenges?: Dispatch<SetStateAction<[]>>;
  realLoad: boolean;
  setRealLoad: Dispatch<SetStateAction<boolean>>;
}
interface FetchAnyType {
  url: string;
  method: string;
  setter: Dispatch<SetStateAction<[]>>;
}
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}
const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [isLoaded, setIsLoaded] = useState(false),
    [isLogIn, setIsLogIn] = useState(false),
    [searchPrompt, setSearchPrompt] = useState(""),
    [chalenges, setChalenges] = useState([]),
    [realLoad, setRealLoad] = useState(false);
  const fetchAny = async ({ method, url, setter }: FetchAnyType) => {
    try {
      const res = fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (await res) {
        setRealLoad(false);
      } else {
        setRealLoad(true);
      }
      res
        .then((res) => {
          const data = res.json();
          setter(data);
          return data;
        })
        .catch((err) => console.log("FetchingError: ", err));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAny("/api/chalanges", "GET" , setChalenges);
  }, []);

  const value: AppContextType = {
    isLoaded,
    setIsLoaded,
    isLogIn,
    setIsLogIn,
    searchPrompt,
    setSearchPrompt,
    chalenges,
    setChalenges,
    realLoad,
    setRealLoad,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
