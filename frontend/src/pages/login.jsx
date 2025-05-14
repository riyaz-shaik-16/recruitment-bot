import React from "react";
import axios from "axios"
import {useGoogleLogin} from "@react-oauth/google";

import {useDispatch} from "react-redux";

import { login } from "../redux/slices/user.slice";

import {useNavigate} from "react-router-dom"

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const googleResponse = async(authResult) => {
    try {

      const code = authResult['code']

      // console.log(code);
      // return;

      if(code){

        const response = await axios.get(`http://localhost:9876/api/auth/google?code=${code}`,{withCredentials:true});

        // console.log("response: ",response);

        dispatch(login(response.data.user));

        navigate("/dashboard")
        
        // console.log("code: ",authResult['code']);
      }
      // console.log(authResult);
    } catch (error) {
      // console.log(error.message)
      alert("Something went Wrong!");
    }
  }

    const handleOnClick = useGoogleLogin({
      onSuccess:googleResponse,
      onError:googleResponse,
      flow:"auth-code"

    })
  return (
    // <div className="App" style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
    //   <button onClick={handleOnClick}>Login with google</button>
    // </div>
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center p-4">
  <button
    onClick={handleOnClick}
    className="group cursor-pointer flex items-center gap-3 px-8 py-3.5 bg-gray-800 hover:bg-white/5 rounded-xl 
             text-gray-300 hover:text-white font-medium transition-all duration-300
             shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 
             focus:ring-pearl-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
  >
    <svg
      className="w-6 h-6 transition-transform duration-300"
      viewBox="0 0 24 24"
    >
      <path
        className="fill-gray-300 group-hover:fill-[#4285F4] transition-colors duration-300"
        d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
      />
      <path
        className="fill-gray-300 group-hover:fill-[#34A853] transition-colors duration-300 delay-75"
        d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24Z"
      />
      <path
        className="fill-gray-300 group-hover:fill-[#FBBC05] transition-colors duration-300 delay-100"
        d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"
      />
      <path
        className="fill-gray-300 group-hover:fill-[#EA4335] transition-colors duration-200 delay-150"
        d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96Z"
      />
    </svg>
    <span className="transition-colors duration-300 ">Continue with Google</span>
  </button>
</div>
  );
};

export default Login;
