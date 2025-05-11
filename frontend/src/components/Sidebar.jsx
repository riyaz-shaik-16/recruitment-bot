import React, {useState} from "react";
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
  FaTimes
} from 'react-icons/fa';

import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      navigate("/");
    } catch (error) {
      console.log("Error while logging out: ", error.message);
    }
  };

  return (
    <>
      <aside className={`h-screen w-64 bg-gray-900 text-gray-100 fixed left-0 top-0 transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}>
        <div className="p-4 flex flex-col justify-between h-full">
          {/* Mobile Close Button */}
          <button
            className="lg:hidden absolute right-4 top-4 p-2 hover:text-amber-400 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes className="text-xl" />
          </button>

          <div>
            <h1 className="text-2xl font-bold mb-8 text-amber-400 flex items-center gap-2">
              <span className="text-3xl">🤖</span>
              RecruitAI
            </h1>
            
            <nav className="space-y-2">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center gap-4 p-3 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? "bg-gray-800 text-amber-400 shadow-lg" 
                      : "hover:bg-gray-800 hover:text-amber-300"
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
                      ? "bg-gray-800 text-amber-400 shadow-lg" 
                      : "hover:bg-gray-800 hover:text-amber-300"
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
                      ? "bg-gray-800 text-amber-400 shadow-lg" 
                      : "hover:bg-gray-800 hover:text-amber-300"
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
                      ? "bg-gray-800 text-amber-400 shadow-lg" 
                      : "hover:bg-gray-800 hover:text-amber-300"
                  }`
                }
              >
                <FaCogs className="text-lg w-6 group-hover:scale-110 transition-transform" />
                <span>Settings</span>
              </NavLink>
            </nav>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <div
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 hover:text-amber-300 cursor-pointer transition-all duration-200 group"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="text-lg w-6 group-hover:scale-110 transition-transform" />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        className="fixed lg:hidden top-4 left-4 p-4 bg-amber-500 text-gray-900 rounded-full shadow-lg hover:bg-amber-400 transition-colors z-40"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FaBars className="text-xl" />
      </button>
    </>
  );
};

export default Sidebar;
