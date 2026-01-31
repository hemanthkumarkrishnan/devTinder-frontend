import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
 
  const { firstName, lastName, age, photoUrl, gender, about, _id } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error("Error sending connection request:", error);
    }
  };

  return (
    <div className="card bg-base-300 w-full max-w-sm md:max-w-md shadow-xl my-6 mx-auto relative z-10  mt-[-10px] h-80%">
      <figure className="w-full">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-48 md:h-56 object-cover rounded-t-md"
        />
      </figure>
      <div className="card-body p-4 md:p-6">
        <h2 className="card-title text-lg md:text-xl">
          {firstName + " " + lastName}
        </h2>
        {age && gender && (
          <p className="text-sm text-neutral-400">{age + " , " + gender}</p>
        )}
        <p className="mt-2 text-sm">{about}</p>
        <div className="card-actions justify-center my-4 flex flex-col sm:flex-row gap-3">
          <button
            className="btn btn-secondary bg-secondary px-4 py-2 font-medium w-full sm:w-auto"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary bg-primary px-4 py-2 font-medium w-full sm:w-auto"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
