"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
interface FormData {
  name: string;
  email: string;
  password: string;
  age: string;
  weight: string;
  height: string;
  gender: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  age?: string;
  weight?: string;
  height?: string;
  gender?: string;
  [key: string]: string | undefined;
}
const Page = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
  });
  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (
      isNaN(Number(formData.age)) ||
      Number(formData.age) < 13 ||
      Number(formData.age) > 120
    ) {
      newErrors.age = "Please enter a valid age (13-120)";
    }

    if (!formData.weight) {
      newErrors.weight = "Weight is required";
    } else if (
      isNaN(Number(formData.weight)) ||
      Number(formData.weight) < 20 ||
      Number(formData.weight) > 300
    ) {
      newErrors.weight = "Please enter a valid weight (20-300 kg)";
    }

    if (!formData.height) {
      newErrors.height = "Height is required";
    } else if (
      isNaN(Number(formData.height)) ||
      Number(formData.height) < 100 ||
      Number(formData.height) > 250
    ) {
      newErrors.height = "Please enter a valid height (100-250 cm)";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/users/create-account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.status === 200) {
        navigate.push("/");
      } else if (response.status === 409) {
        setErrors({ ...errors, email: "Valid Email" });
      }
      if (response.ok) {
        const data = (await response.json()) as unknown;
        console.log("Registration successful:", data);
        alert("Registration successful!");
        setFormData({
          name: "",
          email: "",
          password: "",
          age: "",
          weight: "",
          height: "",
          gender: "",
        });
      } else {
        const errorData = await response.text();
        console.error("Registration failed:", errorData);
        alert(`Registration failed: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Network error:", err);
        alert(`Registration failed: ${err.message}`);
      } else {
        console.error("Unknown error:", err);
        alert("Registration failed: Unknown error");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  return (
    <>
      <div>Genarate your food Plan for you</div>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div>
              <a className="flex items-center gap-2" href={"/"}>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-gray-900 text-white font-bold text-lg">
                  F
                </span>
                <span className="text-2xl font-bold tracking-tight text-gray-900">
                  Fitness
                </span>
              </a>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join thousands of people transforming their lives
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm ${
                      errors.password ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              {/* Age and Weight Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Age
                  </label>
                  <div className="mt-1">
                    <input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm ${
                        errors.age ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="25"
                    />
                    {errors.age && (
                      <p className="mt-1 text-sm text-red-600">{errors.age}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="weight"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Weight (kg)
                  </label>
                  <div className="mt-1">
                    <input
                      id="weight"
                      name="weight"
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm ${
                        errors.weight ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="70"
                    />
                    {errors.weight && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.weight}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Height and Gender Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="height"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Height (cm)
                  </label>
                  <div className="mt-1">
                    <input
                      id="height"
                      name="height"
                      type="number"
                      value={formData.height}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm ${
                        errors.height ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="175"
                    />
                    {errors.height && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.height}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <div className="mt-1">
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm ${
                        errors.gender ? "border-red-300" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.gender}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </form>

            {/* OR Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
