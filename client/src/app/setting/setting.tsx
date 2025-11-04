import Image from "next/image";
import React from "react";
import { BsForwardFill, BsPencilFill } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";

const page = () => {
  return (
    <main className="bg-gray-900">
      <header className="flex justify-between items-center bg-gray-800 h-12">
        <button title="setting" className="text-white p-2 m-1">
          <CiSettings className="size-10" />
        </button>
        <button className="text-white p-2 m-1 cursor-pointer">
          <BsForwardFill />
        </button>
      </header>
      <h1 className="font-light text-white capitalize">Edit your profile:</h1>
      <div>
        <Image
          width={200}
          height={200}
          className="rounded-full"
          src="/client/public/next.svg"
          alt=""
        />
        <button
          type="button"
          className="text-white bg-gray-300 rounded-full p-2 m-2"
        >
          <BsPencilFill />
        </button>
      </div>
    </main>
  );
};

export default page;