"use client";
import React, { use } from "react";
const Chalange = ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = use(params);
  return (
    <>
      <div className="flex justify-center items-center bg-sky-500">

        <h1 className="text-gray-900 font-bold"> Chalange {name}:</h1>
      </div>
      
    </>
  );
};

export default Chalange;
