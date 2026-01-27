import React, { use } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import BASE_URL from "../utils/constants";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [showButtons, setShowButtons] = React.useState(true);
  const reviewRequest = (status, id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeRequest(id));
    } catch (error) {
      console.error("Error reviewing request:", error);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(response?.data?.data));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) {
    return (
      <div className="text-center text-white text-2xl mt-10">
        No requests found.
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-8 max-w-6xl mx-auto my-10 pb-28">
      <h1 className="text-bold text-white text-3xl text-center mb-6">
        Connection Requests
      </h1>

      <div className="flex flex-col gap-4">
        {requests.map((connection) => {
          const { firstName, lastName, photoUrl, about, age, gender, _id } =
            connection.fromUserId;

          return (
            <div
              className="flex flex-col sm:flex-row items-center sm:items-start justify-between m-2 p-4 rounded-lg bg-base-300 w-full shadow"
              key={_id}
            >
              <div className="flex-shrink-0">
                <img
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                  alt="connection photo"
                  src={photoUrl}
                />
              </div>

              <div className="text-left mt-3 sm:mt-0 sm:mx-4 flex-1">
                <h2 className="text-lg font-bold truncate">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-neutral-400">
                    {age + ", " + gender}
                  </p>
                )}
                <p className="mt-2 text-sm line-clamp-3">{about}</p>
              </div>

              <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row items-center gap-3">
                <button
                  className="btn btn-primary bg-primary px-4 py-2 font-medium w-full sm:w-auto"
                  onClick={() => {
                    reviewRequest("accepted", connection._id);
                  }}
                >
                  Accept
                </button>
                <button
                  className="btn btn-secondary bg-secondary px-4 py-2 font-medium w-full sm:w-auto"
                  onClick={() => {
                    reviewRequest("rejected", connection._id);
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
