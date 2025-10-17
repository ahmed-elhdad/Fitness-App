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
  chalanges: [];
  setChalanges?: Dispatch<SetStateAction<[]>>;
  realLoad: boolean;
  setRealLoad: Dispatch<SetStateAction<boolean>>;
}
interface FetchAnyType {
  url: string;
  method: string;
  item: [];
  setter: Dispatch<SetStateAction<[]>>;
}
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}
const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const fetchAny = ({ method, url, setter }: FetchAnyType) => {
    try {
      const res = fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.pending) {
        setRealLoad(true);
      }else{
        setRealLoad(false)
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
    fetchAny({ url: "/api/chalanges", method: "GET", setter: setChalanges });
  }, []);
  const [isLoaded, setIsLoaded] = useState(false),
    [isLogIn, setIsLogIn] = useState(false),
    [searchPrompt, setSearchPrompt] = useState(""),
    [chalanges, setChalanges] = useState([]),
    [realLoad, setRealLoad] = useState(false);

  const value: AppContextType = {
    isLoaded,
    setIsLoaded,
    isLogIn,
    setIsLogIn,
    searchPrompt,
    setSearchPrompt,
    chalanges,
    setChalanges,
    realLoad,
    setRealLoad,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
