"use client";
import React, { useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import { FiEyeOff } from "react-icons/fi";
const Page = () => {
  const [password, setPassword] = useState(""),
    [success, setSuccess] = useState(false),
    [showPassword, setShowPassword] = useState(false),
    [error, setError] = useState("");
  const checkPassword = () => {
    if (password === "ahmedisauthor") {
      setSuccess(true);
    } else {
      setSuccess(false);
      setError("Valid Password");
    }
  };
  return (
    <>
      {success ? (
        <main className="flex justify-center items-center flex-col">
          <header>
            <h1>Dashboard</h1>
          </header>
          <div className="add-chalange flex flex-col min-h-full bg-gray-600 justify-center items-center w-75 rounded-2xl">
            <div className="flex flex-col gap-1.5 text-white capitalize font-bold">
              <label htmlFor="">title</label>
              <input
                className="w-auto border-white rounded p-1 m-1"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1.5 text-white capitalize font-bold">
              <label htmlFor="">description</label>
              <input
                className="w-auto border-white rounded p-1 m-1"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1.5 text-white capitalize font-bold">
              <label htmlFor="">target</label>
              <input
                className="w-auto border-white rounded p-1 m-1"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1.5 text-white capitalize font-bold">
              <label htmlFor="">start</label>
              <input
                className="w-auto border-white rounded p-1 m-1"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1.5 text-white capitalize font-bold">
              <label htmlFor="">end</label>
              <input
                className="w-auto border-white rounded p-1 m-1"
                type="text"
              />
            </div>
          </div>
        </main>
      ) : (
        <center>
          <label htmlFor="">password</label>
          <div>
            <input
              type={`${showPassword ? "text" : "password"}`}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={(prev) => {
                if (showPassword == false) {
                  setShowPassword(true);
                } else {
                  setShowPassword(false);
                }
              }}
            >
              {showPassword ? <BsEye /> : <FiEyeOff />}
            </button>
          </div>
          <button
            className="p-3 m-5 transition-all bg-sky-500 hover:bg-sky-400 rounded cursor-pointer text-white font-bold"
            onClick={checkPassword}
          >
            check
          </button>
          <div className="bg-red-600 w-50 rounded text-white font-bold">
            {error}
          </div>
        </center>
      )}
    </>
  );
};

export default Page;
