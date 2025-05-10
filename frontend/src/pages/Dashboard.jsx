import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {logout} from "../redux/slices/user.slice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
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
  

  // console.log(user.picture);
  return (
    <>
    <h1>Dashboard</h1>
    </>
  );
};

export default Dashboard;
