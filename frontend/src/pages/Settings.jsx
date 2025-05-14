import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {logout} from "../redux/slices/user.slice.js"
import {removeAllSessions} from "../redux/slices/session.slice.js"

const SettingsPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? All your sessions will be permanently removed."
    );

    if (!confirmed) return;

    // http://localhost:9876/api/auth/delete-account/sr308379@gmail.com

    try {
      const response = await axios.delete(`http://localhost:9876/api/auth/delete-account/${user.email}`,{withCredentials:true});

      console.log(response);

      dispatch(logout());
      dispatch(removeAllSessions());

      sessionStorage.clear();
      dispatch(removeAllSessions());
      dispatch(logout());
      
      navigate("/");
    } catch (err) {
      console.error("Failed to delete account:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-black-pearl-950 border border-gray-700 rounded-xl shadow-lg text-mercury-50">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
        <h2 className="text-xl font-semibold mb-2 text-red-400">Danger Zone</h2>
        <p className="text-gray-400 mb-4">
          Deleting your account will remove all interview sessions and cannot be undone.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-6 py-3 rounded-lg transition duration-200 font-semibold"
        >
          Delete My Account
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
