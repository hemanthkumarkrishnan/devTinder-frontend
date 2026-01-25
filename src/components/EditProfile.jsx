import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import BASE_URL from "../utils/constants";
const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          gender,
          age,
          about,
          photoUrl,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(
        error?.response?.data || "Profile update failed. Please try again.",
      );
    }
  };
  return (
    <>
      <div className="flex justify-center my-10 ">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center font-medium text-base">
                Edit Profile
              </h2>
              <div>
                <label className="form-control w-full max-w-xs ">
                  <div className="label">
                    <span className="label-text">First Name:</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs my-1 xs focus:outline-black   "
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs ">
                  <div className="label">
                    <span className="label-text my-1 ">Last Name:</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs  focus:outline-black"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs ">
                  <div className="label">
                    <span className="label-text my-1 "> Age:</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs  focus:outline-black"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs ">
                  <div className="label">
                    <span className="label-text my-1 ">Gender:</span>
                  </div>
                  <select
                    className="select select-bordered w-full max-w-xs focus:outline-none focus:ring-0"
                    value={gender ?? ""}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs ">
                  <div className="label">
                    <span className="label-text my-1 ">Photo Url:</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs  focus:outline-black"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs ">
                  <div className="label">
                    <span className="label-text my-1 ">About:</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered w-full max-w-xs focus:outline-none focus:ring-0"
                    rows={4}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>

              {error && <p className="text-red-500">{error}</p>}
              <div className="card-actions justify-center m-2">
                <button
                  className="btn btn-primary bg-primary p-5 font-medium "
                  onClick={saveProfile}
                >
                  save profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, photoUrl, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Profile updated successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
