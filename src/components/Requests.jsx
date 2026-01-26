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
    <div className=" text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

      {requests.map((connection) => {
        const { firstName, lastName, photoUrl, about, age, gender, _id } =
          connection.fromUserId;

        return (
          <div
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 full mx-auto"
            key={_id}
          >
            <div>
              <img
                className="w-20 h-20 rounded-full "
                alt="connection photo"
                src={photoUrl}
              />
            </div>
            <div className="text-left   mx-10 flex-grow">
              <h2 className="text-lg font-bold">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button
                className="btn btn-primary bg-primary mx-2 p-5 font-medium"
                onClick={() => {
                  reviewRequest("accepted", connection._id);
                }}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary bg-secondary mx-2 p-5 font-medium"
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
  );
};

export default Requests;
