import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useNavigate } from "react-router";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.patch(
        `${BASE_URL}/profile/change-password`,
        { oldPassword, newPassword },
        { withCredentials: true },
      );
      setSuccess(res?.data?.message || "Password updated successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      // optional: redirect after a short delay
      setTimeout(() => navigate("/profile"), 1200);
    } catch (err) {
      const msg =
        err?.response?.data ||
        err?.response?.data?.message ||
        err?.message ||
        "Failed to change password";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen  mt-[-50px]">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center font-medium text-base">
            Change Password
          </h2>

          <form onSubmit={submit}>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Old Password</span>
              </div>
              <input
                type="password"
                className="input input-bordered w-full max-w-xs focus:outline-none focus:ring-0"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </label>

            <label className="form-control w-full max-w-xs mt-3">
              <div className="label">
                <span className="label-text">New Password</span>
              </div>
              <input
                type="password"
                className="input input-bordered w-full max-w-xs focus:outline-none focus:ring-0"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </label>

            <label className="form-control w-full max-w-xs mt-3">
              <div className="label">
                <span className="label-text">Confirm New Password</span>
              </div>
              <input
                type="password"
                className="input input-bordered w-full max-w-xs focus:outline-none focus:ring-0"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}

            <div className="card-actions justify-center m-2">
              <button
                type="submit"
                className="btn btn-primary bg-primary p-3 font-medium"
                disabled={loading}
              >
                {loading ? "Saving..." : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
