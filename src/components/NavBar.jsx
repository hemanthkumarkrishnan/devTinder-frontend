import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import BASE_URL from "../utils/constants";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      Navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="navbar bg-base-300 shadow-sm px-4 sm:px-6 lg:px-8 flex-wrap">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl px-0 sm:px-2">
          👩‍💻DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex gap-2 sm:gap-4 justify-center items-center flex-wrap">
          <div className="form-control max-w-[120px] sm:max-w-full truncate">
            Welcome, {user.firstName}
          </div>
          <div className="dropdown dropdown-end mx-2 sm:mx-5 flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar p-0"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-40 sm:w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to={"/connections"}>Connections</Link>
              </li>
              <li>
                <Link to={"/requests"}> Requests</Link>
              </li>
              <li>
                <Link to={"/change-password"}>Change Password</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
