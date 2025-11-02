"use client";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import axios from "axios";
import { use, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import Loading from "@/components/Loading";
import React from "react";
const Dashboard = () => {
  const [steps, setSteps] = useState(0);
  const { isLoaded, realLoad, setIsLoaded } = use(AppContext);

  const handleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      const token = credentialResponse.credential;
      console.log("token: ", token);

      if (!token) return;

      // إرسال التوكن للـ backend
      const res = await axios.post("http://localhost:5000/api/users/getUsers", {
        token,
      });
      setSteps(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  setTimeout(() => {
    setIsLoaded(true);
  }, 2500);
  return (
    <>
      {realLoad ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold mb-6">Google Fit + Next.js 🚀</h1>

          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => console.log("Login Failed")}
          />

          {steps && (
            <pre className="mt-6 p-4 bg-gray-900 text-white rounded">
              {JSON.stringify(steps, null, 2)}
            </pre>
          )}
        </div>
      )}
    </>
  );
};
export default DataView;
