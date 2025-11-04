"use client";
import axios from "axios";
import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface ChallengeContextType {
  isLoaded: boolean;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
  chalenges: [];
  setChalenges?: Dispatch<SetStateAction<[]>>;
}

export const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

interface ChallengeContextProviderProps {
  children: ReactNode;
}
const ChallengeContextProvider: React.FC<ChallengeContextProviderProps> = ({
  children,
}) => {
  const [isLoaded, setIsLoaded] = useState(false),
    [chalenges, setChalenges] = useState([]),
   getChallenges = async () => {
    const res=await axios.get(`${process.env.BASE_URL}/api/v1/chalenges/chalenges`)
    
    console.log(res);
    
  };
  useEffect(() => {
    getChallenges()
  }, []);

  const value: ChallengeContextType = {
    isLoaded,
    setIsLoaded,
    chalenges,
    setChalenges,
  };

  return <ChallengeContext.Provider value={value}>{children}</ChallengeContext.Provider>;
};

export default ChallengeContextProvider;
