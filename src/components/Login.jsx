import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import BASE_URL from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Add login logic here
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(response.data));
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Login failed. Please try again.");
      console.error(error);
    }
  };
  const handleSignup = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(response.data.data));
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Signup failed. Please try again.");
      
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center font-medium text-base">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs ">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs my-1 xs focus:outline-black   "
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs ">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs my-1 xs focus:outline-black   "
                    value={lastName}
                    onChange={ (e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}

            <label className="form-control w-full max-w-xs ">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs my-1 xs focus:outline-black   "
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs ">
              <div className="label">
                <span className="label-text my-1 ">password</span>
              </div>
              <input
                type="password"
                className="input input-bordered w-full max-w-xs  focus:outline-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary bg-primary p-5 font-medium "
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm(!isLoginForm)}
          >
            {isLoginForm ? (
              <>
                Don't have an account?{" "}
                <span className="text-red-500 font-medium">Sign Up</span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span className="text-red-500 font-medium">Login</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
