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

        console.log("response: ",response);

        dispatch(login(response.data.user));

        navigate("/dashboard")
        
        // console.log("code: ",authResult['code']);
      }
      // console.log(authResult);
    } catch (error) {
      console.log(error.message)
    }
  }

    const handleOnClick = useGoogleLogin({
      onSuccess:googleResponse,
      onError:googleResponse,
      flow:"auth-code"

    })
  return (
    <div className="App" style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
      <button onClick={handleOnClick}>Login with google</button>
    </div>
  );
};

export default Login;
