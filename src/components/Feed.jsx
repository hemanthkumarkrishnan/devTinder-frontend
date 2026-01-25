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
    if (feed ) return;
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
  return <div className="flex justify-center my-10"> 
     {feed && <UserCard user={feed[0]} />}
  </div>;
};

export default Feed;
