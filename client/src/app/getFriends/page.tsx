"use client";
import React, { use, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AppContext } from "../contexts/challengeContext";
import Loading from "@/components/Loading";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]),
    [searchErrors, setSearchErrors] = useState("");
  const getAllUsers = () => {
    const res = axios.get("http://localhost:5000/api/users/getUsers");
    console.log(res);

    // .then((res) => {
    //   console.log("RESPONSE: ", res);

    // })
    // .then((data) => {
    //   setUsers(data);
    //   console.log("DATA: ", data);
    // })
    // .catch((err) => {
    //   console.log("FETCHError: ", err);
    // });
  };
  const appContext = use(AppContext);
  const isLoaded = appContext?.isLoaded ?? false;
  const [searchPrompt, setSearchPrompt] = useState("");
  Loading();
  // const findUser = () =>
  //   users.find((user) => {
  //     if (!user) {
  //       return;
  //     }
  //     if (user.name.toLowerCase().includes(searchPrompt.toLowerCase())) {
  //       setFilteredUsers(user);
  //       setSearchErrors("");
  //     } else {
  //       setFilteredUsers([]);
  //       setSearchErrors("User Not Found");
  //     }
  //   });
  useEffect(() => {
    getAllUsers();
    // findUser();
  }),
    [searchPrompt];

  return (
    <>
      {isLoaded ? (
        <div className="font-bold text-gray-700 ">
          <div>
            <h1>Get Your Friends</h1>
          </div>
          <div className="">
            <div className="search">
              <input
                type="text"
                placeholder="Search By Name"
                onChange={(e) => {
                  setSearchPrompt(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="users min-h-screen">
            {filteredUsers.length > 0 ? (
              <>
                {filteredUsers.map((user, index) => (
                  <div
                    key={index}
                    className="user md:flex-col w-auto flex justify-between w- p-4 m-3 rounded-md"
                  >
                    <div className="flex md:flex-col items-center gap-4">
                      <div>
                        <Image
                          className="rounded-md"
                          src={user.avatar}
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col gap-5">
                        <h2 className="font-meduim text-gray-500">
                          {user.name}
                        </h2>
                        <h2 className="font-meduim text-gray-500">
                          {user.age}
                        </h2>
                      </div>
                    </div>
                    <div>
                      {user.friends.find(
                        (friend) => friend.name === user.name
                      ) ? (
                        <button className="px-6 py-3 rounded-md bg-sky-900 text-white text-sm font-semibold hover:bg-sky-800">
                          Friends
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            user.friends.push({
                              Id: user.userId,
                              name: user.name,
                              email: user.email,
                            });
                          }}
                          className="px-6 py-3 rounded-md bg-gray-300 text-white text-sm font-semibold"
                        >
                          Add Friend
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div>
                <h1>{searchErrors}</h1>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Page;
