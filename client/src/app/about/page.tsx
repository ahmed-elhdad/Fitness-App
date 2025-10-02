"use client";

import React, { use } from "react";
import {
  FaDumbbell,
  FaHeartbeat,
  FaChartLine,
  FaUserFriends,
} from "react-icons/fa";
import { AppContext } from "../contexts/AppContext";
import Loading from "../../components/Loading";
const features = [
  {
    icon: <FaDumbbell className="text-3xl text-gray-900" />,
    title: "Workout Tracking",
    description:
      "Log your workouts, track progress, and stay motivated with personalized routines.",
  },
  {
    icon: <FaHeartbeat className="text-3xl text-red-500" />,
    title: "Health Monitoring",
    description:
      "Monitor your weight, height, BMI, and other health metrics in one place.",
  },
  {
    icon: <FaChartLine className="text-3xl text-blue-600" />,
    title: "Progress Analytics",
    description:
      "Visualize your fitness journey with detailed charts and analytics.",
  },
  {
    icon: <FaUserFriends className="text-3xl text-green-600" />,
    title: "Community Support",
    description:
      "Join a community of fitness enthusiasts, share achievements, and get inspired.",
  },
];

const AboutPage = () => {
  const appContext = use(AppContext);
  const isLoaded = appContext?.isLoaded ?? false;
  Loading();
  return (
    <>
      {isLoaded ? (
        <div className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center">
          <div className="max-w-2xl w-full text-center mb-10">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white font-bold text-2xl mb-4 shadow-lg">
              F
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              About Fitness Tracker
            </h1>
            <p className="text-gray-600 text-lg">
              Fitness Tracker is your all-in-one solution to monitor, analyze,
              and improve your health and fitness journey. Whether you&apos;re a
              beginner or a pro, our app helps you stay on track and reach your
              goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
              >
                {feature.icon}
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 max-w-xl text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Why Choose Us?
            </h2>
            <p className="text-gray-600">
              Our mission is to empower you to live a healthier, happier life.
              With intuitive tools, real-time analytics, and a supportive
              community, Fitness Tracker makes your fitness journey enjoyable
              and effective.
            </p>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AboutPage;
