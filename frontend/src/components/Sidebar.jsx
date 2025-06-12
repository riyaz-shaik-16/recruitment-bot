import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/user.slice";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaChartLine,
  FaCommentDots,
  FaCogs,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance";
import { removeAllSessions } from "../redux/slices/session.slice";

const navLinks = [
  { path: "/profile", label: "Account Profile", icon: <FaUser /> },
  { path: "/dashboard", label: "Dashboard", icon: <FaChartLine /> },
  { path: "/session", label: "AI Session", icon: <FaCommentDots /> },
  { path: "/settings", label: "Settings", icon: <FaCogs /> },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      );

      if (!response?.data?.success) {
        alert("Error logging out");
        return;
      }

      sessionStorage.clear(); // Clears all keys
      dispatch(logout());
      dispatch(removeAllSessions());
      navigate("/");
    } catch (error) {
      // console.log("Error while logging out: ", error.message);
      alert("Something Went Wrong!");
    }
  };

  const handleNavClick = () => {
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  return (
    <>
      <aside
        className={`h-screen w-64 bg-black-pearl-950 text-gray-100 fixed left-0 top-0 transform transition-transform duration-300  ${
          isSidebarOpen
            ? "translate-x-0 z-50 fixed left-0 top-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 flex flex-col justify-between h-full">
          {/* Close Button */}
          <button
            className="lg:hidden absolute right-4 top-4 p-2 hover:text-mercury-400"
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
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `flex items-center gap-4 p-3 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? "bg-black-pearl-950 text-mercury-400 shadow-lg"
                        : "hover:bg-black-pearl-950 hover:text-mercury-600"
                    }`
                  }
                >
                  <span className="text-lg w-6 group-hover:scale-110 transition-transform">
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </NavLink>
              ))}
              <div className="border-t hidden sm:block border-gray-700 p-2">
                <button
                  className="flex items-center gap-4 rounded-lg hover:bg-black-pearl-950 hover:text-mercury-600 cursor-pointer transition-all duration-200 group"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="text-lg w-6 group-hover:scale-110 transition-transform" />
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </div>

          <div className="border-t block sm:hidden border-gray-700 pt-2">
            <button
              className="flex items-center gap-4 rounded-lg hover:bg-black-pearl-950 hover:text-mercury-600 cursor-pointer transition-all duration-200 group"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="text-lg w-6 group-hover:scale-110 transition-transform" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 w-full bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 z-40">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl text-amber-400">🤖</span>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              RecruitAI
            </span>
          </div>

          {!isSidebarOpen && (
            <button
              className="p-2 text-gray-300 hover:text-amber-400 transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FaBars className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
