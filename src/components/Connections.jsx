import React from "react";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(response?.data?.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;
  if (!Array.isArray(connections) || connections.length === 0) {
    return (
      <div className="text-center text-white text-2xl mt-10">
        No connections found.
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-8 max-w-6xl mx-auto my-10 py-4 pb-28">
      <h1 className="text-bold text-white text-3xl text-center mb-6">
        Connections
      </h1>
      <div className="flex flex-col gap-2">
        {connections.map((connection) => {
          const { firstName, lastName, photoUrl, about, age, gender, _id } =
            connection;

          return (
            <div
              className="flex flex-col sm:flex-row m-4 p-4 rounded-lg bg-base-300"
              key={_id}
            >
              <div className="flex-shrink-0">
                <img
                  className="w-20 h-20 rounded-full"
                  alt="connection photo"
                  src={photoUrl}
                />
              </div>
              <div className="text-left mx-4 sm:ml-4 sm:mt-0">
                <h2 className="text-lg font-bold">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm">{age + ", " + gender}</p>
                )}
                <p className="text-sm">{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
