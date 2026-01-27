import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
const Feed = () => {
  const feed = useSelector((state) => state.feed);

  const dispatch = useDispatch();

  const getFeed = async () => {
  
    try {
      const response = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });

      dispatch(addFeed(response?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return <div className="flex justify-center my-10">Loading...</div>;
  if (!Array.isArray(feed) || feed.length <= 0)
    return <div className="flex justify-center my-10">No users found!</div>;

  // ensure content stays above a fixed footer on small screens by adding bottom padding
  return (
    <div className="px-4 sm:px-6 md:px-8 max-w-6xl mx-auto my-10 pb-28">
      {/* single card view preserved, keep layout responsive */}
      <div className="flex justify-center">
        <UserCard user={feed[0]} />
      </div>
    </div>
  );
};

export default Feed;
