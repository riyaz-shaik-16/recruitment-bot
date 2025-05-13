import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/user.slice";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaChartLine,
  FaCommentDots,
  FaCogs,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { removeSession } from "../redux/slices/session.slice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9876/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (!response?.data?.success) {
        alert("Error logging out");
        return;
      }

      dispatch(logout());
      dispatch(removeSession());
      navigate("/");
    } catch (error) {
      console.log("Error while logging out: ", error.message);
    }
  };

  return (
    <>
      <aside
        className={`h-screen w-64 bg-black-pearl-950 text-gray-100 fixed left-0 top-0 transform transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } z-50`}
      >
        <div className="p-4 flex flex-col justify-between h-full">
          {/* Mobile Close Button */}
          <button
            className="lg:hidden absolute right-4 top-4 p-2 hover:text-mercury-400 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes className="text-xl" />
          </button>

          <div>
            <h1 className="text-2xl font-bold mb-8 text-mercury-400 flex items-center gap-2">
              <span className="text-3xl">🤖</span>
              RecruitAI
            </h1>

            <nav className="space-y-2">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-black-pearl-950 text-mercury-400 shadow-lg"
                      : "hover:bg-black-pearl-950 hover:text-mercury-600"
                  }`
                }
              >
                <FaUser className="text-lg w-6 group-hover:scale-110 transition-transform" />
                <span>Account Profile</span>
              </NavLink>

              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-black-pearl-950 text-mercury-400 shadow-lg"
                      : "hover:bg-black-pearl-950 hover:text-mercury-600"
                  }`
                }
              >
                <FaChartLine className="text-lg w-6 group-hover:scale-110 transition-transform" />
                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to="/session"
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-black-pearl-950 text-mercury-400 shadow-lg"
                      : "hover:bg-black-pearl-950 hover:text-mercury-600"
                  }`
                }
              >
                <FaCommentDots className="text-lg w-6 group-hover:scale-110 transition-transform" />
                <span>AI Session</span>
              </NavLink>

              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-black-pearl-950 text-mercury-400 shadow-lg"
                      : "hover:bg-black-pearl-950 hover:text-mercury-600"
                  }`
                }
              >
                <FaCogs className="text-lg w-6 group-hover:scale-110 transition-transform" />
                <span>Settings</span>
              </NavLink>
            </nav>
          </div>

          <div className="border-t border-gray-700 pt-2">
            <div
              className="flex items-center gap-4  rounded-lg hover:bg-black-pearl-950 hover:text-mercury-600 cursor-pointer transition-all duration-200 group"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="text-lg w-6 group-hover:scale-110 transition-transform" />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 w-full bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 z-40">
        <div className="flex justify-between items-center p-4">
          {/* Logo/Branding */}
          <div className="flex items-center gap-2">
            <span className="text-2xl text-amber-400">🤖</span>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              RecruitAI
            </span>
          </div>

          {/* Hamburger Menu Button */}
          <button
            className="p-2 text-gray-300 hover:text-amber-400 transition-colors"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
