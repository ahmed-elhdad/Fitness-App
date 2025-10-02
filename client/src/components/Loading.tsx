import React, { useContext } from "react";
import { AppContext } from "../app/contexts/AppContext";

type AppContextType = {
  isLoaded: boolean;
  setIsLoaded: (value: boolean) => void;
};

const Loading = () => {
  const appContext = useContext(AppContext) as AppContextType;
  const setIsLoaded = appContext?.setIsLoaded ?? (() => {});
  
  setTimeout(() => {
    setIsLoaded(true);
  }, 2500);
  return (
    <>
      <center className="flex justify-center items-center min-h-screen">
        <div className="boxes">
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </center>
    </>
  );
};

export default Loading;
