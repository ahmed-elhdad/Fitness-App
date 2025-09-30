"use client";

import React, { createContext } from "react";
const AppContextProvider = (props: any) => {
  const value = {};
  const AppContext = createContext(value);
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
