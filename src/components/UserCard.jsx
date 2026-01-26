import React, { use } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import  BASE_URL  from '../utils/constants';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
    console.log(user);
    const { firstName, lastName, age ,photoUrl ,gender, about,_id } = user;
    const dispatch = useDispatch();

      const handleSendRequest = async(status,userId) => {
        try {
          const res = await axios.post(BASE_URL + "/request/send/" +status+"/"+userId, {}, {withCredentials: true});
          dispatch(removeUserFromFeed(userId));
        } catch (error) {
          console.error("Error sending connection request:", error);
        }
      }



  return (
    <div className="card bg-base-300 w-96 shadow-xl my-10">
  <figure>
    <img
      src={photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && gender && <p>{age + " , " + gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-secondary bg-secondary  p-5 font-medium" onClick={()=>handleSendRequest("ignored", _id)}>Ignore</button>
      <button className="btn btn-primary bg-primary p-5 font-medium" onClick={()=>handleSendRequest("interested", _id)}>Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard
