"use client";
import React, { use } from "react";
import { AppContext } from "../../contexts/AppContext";
import SmallLoading from "@/components/SmallLoading";
import Link from "next/link";
const Page = () => {
  const { chalenges, realLoad } = use(AppContext);
  const handleJoinChalenge = async (idex: number) => {
    const mode = process.env.VITE_STUTOS as string;
    const req = await fetch(
      `${
        mode == "dev"
          ? "http://localhost:3000/api/chalenges/join"
          : "http://localhost:3000/api/chalenges/join"
      }`,
      {
        method: "POST",
        body: chalenges[idex],
      }
    );
  };
  return (
    <>
      <h1>Chalanges</h1>
      {realLoad ? (
        <SmallLoading />
      ) : (
        <>
          <div className="chalanges">
            {chalenges.map((chalenge, index: number) => (
              <table key={index}>
                <thead>
                  <th>title</th>
                  <th>description</th>
                  <th>target</th>
                  <th>start date</th>
                  <th>end date</th>
                  <th>join</th>
                </thead>
                <tbody>
                  <td>{chalenge.title}</td>
                  <td>{chalenge.description}</td>
                  <td>{chalenge.target}</td>
                  <td>{chalenge.startDate}</td>
                  <td>{chalenge.endDate}</td>
                  <td>
                    <Link href={`/${chalenge.title}`}></Link>
                    <button
                      onClick={() => handleJoinChalenge(index)}
                      className="bg-sky-500 p-2 m-2 text-white font-bold capitalize hover:bg-sky-600"
                    >
                      join
                    </button>
                  </td>
                </tbody>
              </table>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Page;
