// src/ProtectedRoute.js
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { login, logout } from "../redux/slices/user.slice.js";
import { removeAllSessions } from "../redux/slices/session.slice.js";
import Loader from "./Loader.jsx";

const ProtectedRoute = () => {
  const [isAllowed, setIsAllowed] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.post(
          "/api/auth/check-authentication",
          {},
          { withCredentials: true }
        );

        // console.log("Response: ",response);

        if (response.data.success) {
          dispatch(login(response.data.user))
          setIsAllowed(true);
        } else {
          throw new Error("Unauthorized");
        }
      } catch (err) {
        // Clear user state, but delay navigation
        localStorage.removeItem("token");
        dispatch(logout());
        dispatch(removeAllSessions());
        setIsAllowed(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  useEffect(() => {
    if (isAllowed === false) {
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, [isAllowed, navigate, location]);

  if (isAllowed === null) return <div className="h-full w-full flex justify-center items-center"><Loader /></div>;

  return isAllowed ? <Outlet /> : null;
};

export default ProtectedRoute;
