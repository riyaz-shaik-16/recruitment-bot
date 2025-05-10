import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/user.slice";
import { NavLink } from "react-router-dom";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9876/api/auth/logout",
        {}, // Empty body (POST requires something, even empty)
        {
          withCredentials: true, // ✅ This must go here (3rd param)
        }
      );

      if (!response?.data?.success) {
        alert("Error logging out");
        return;
      }

      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log("Error while logging out: ", error.message);
    }
  };

  return (
    <aside className="h-screen w-64 bg-white shadow-md p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold mb-6">Recruitment Bot</h1>
        <nav className="space-y-2">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md cursor-pointer ${
                isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
              }`
            }
          >
            <i className="fas fa-user"></i>
            <span>Account Profile</span>
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md cursor-pointer ${
                isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
              }`
            }
          >
            <i className="fas fa-home"></i>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/session"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md cursor-pointer ${
                isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
              }`
            }
          >
            <i className="fas fa-robot"></i>
            <span>AI Q&A Session</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md cursor-pointer ${
                isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
              }`
            }
          >
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>

      <div className="mt-4">
        <div
          className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
          onClick={handleLogout}
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
