import React from 'react'

const UserCard = ({ user }) => {
    console.log(user);
    const { firstName, lastName, age ,photoUrl ,gender, about } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
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
      <button className="btn btn-secondary bg-secondary  p-5 font-medium">Ignore</button>
      <button className="btn btn-primary bg-primary p-5 font-medium">Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard
