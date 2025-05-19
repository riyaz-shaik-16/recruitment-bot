// src/ProtectedRoute.js
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { logout } from "../redux/slices/user.slice.js";
import { removeAllSessions } from "../redux/slices/session.slice.js";
import Loader from "./Loader.jsx"

const ProtectedRoute = () => {
  const [isAllowed, setIsAllowed] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.post(
          "/api/auth/check-authentication",
          {},
          { withCredentials: true }
        );

        // console.log("In Protected Route: ", response);

        if (response.data.success) {
          setIsAllowed(true);
        } else {
          dispatch(logout());
          dispatch(removeAllSessions());
          setIsAllowed(false);
          navigate("/login"); // immediate navigation
        }
      } catch (err) {
        dispatch(logout());
        dispatch(removeAllSessions());
        setIsAllowed(false);
        navigate("/login"); // immediate navigation on error
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  if (isAllowed === null) return <Loader/>;

  return isAllowed ? <Outlet /> : null;
};

export default ProtectedRoute;