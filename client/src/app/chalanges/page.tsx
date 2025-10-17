"use client";
import React, { use } from "react";
import { AppContext } from "../contexts/AppContext";
import SmallLoading from "@/components/SmallLoading";
const Page = () => {
  const { chalanges, realLoad } = use(AppContext);
  return (
    <>
      <h1>Chalanges</h1>

      {realLoad ? <SmallLoading /> : <div className="chalanges"></div>}
    </>
  );
};

export default Page;
