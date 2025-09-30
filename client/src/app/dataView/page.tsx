"use client";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
 const dataView = () => {
  const [steps, setSteps] = useState(0);

  const handleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      const token = credentialResponse.credential; // ID Token
      if (!token) return;

      // إرسال التوكن للـ backend
      const res = await axios.post("http://localhost:5000/api/fit-data", { token });
      setSteps(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
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
  );
}
export default dataView;