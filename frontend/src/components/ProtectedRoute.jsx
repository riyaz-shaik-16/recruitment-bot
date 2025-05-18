// src/ProtectedRoute.js
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import {logout} from "../redux/slices/user.slice.js"

const ProtectedRoute = () => {
  const [isAllowed, setIsAllowed] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.post(
          "/api/auth/check-authentication",
          {},
          { withCredentials: true }
        );

        console.log("In Protected Route: ",response)

        if (response.data.success) {
          setIsAllowed(true);
        } else {
          dispatch(logout())
          setIsAllowed(false);
        }
      } catch (err) {
        setIsAllowed(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (isAllowed === null) return <div>Loading...</div>;

  return isAllowed ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;