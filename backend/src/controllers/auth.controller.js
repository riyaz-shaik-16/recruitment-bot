import axios from "axios";
import qs from "qs";
import jwt from "jsonwebtoken";
import Session from "../models/session.model.js"
import Message from "../models/message.model.js"
import Result from "../models/result.model.js"
import User from "../models/user.model.js"


const googleAuth = async (req, res) => {

  // console.log("In Google Auth Backend");
  try {
    const { code } = req.query;

    if (!code)
      return res
        .status(400)
        .json({ success: false, message: "No code provided!" });

    // Get the access and ID token from Google
    const tokenRes = await axios.post(
      "https://oauth2.googleapis.com/token",
      qs.stringify({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI, // must match frontend
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, id_token } = tokenRes.data;

    // Get user info from Google
    const userInfo = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const user = userInfo.data;

    // Check if the user already exists
    let existingUser = await User.findOne({ email: user.email });

    // Function to generate JWT token
    const generateToken = (user) => {
      return jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d", 
        }
      );
    };

    // If user exists, set cookie with token and return response
    if (existingUser) {
      const token = generateToken(existingUser);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, 
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000, 
      });

      return res.status(200).json({
        success: true,
        message: "User already exists!",
        user: existingUser,
        token
      });
    }

    // If user doesn't exist, create a new user and save to the database
    const newUser = new User({
      googleId: user.sub,
      name: user.name,
      email: user.email,
      picture: user.picture,
      firstName: user.given_name,
      lastName: user.family_name,
    });

    await newUser.save();

    const token = generateToken(newUser);

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User created and saved successfully!",
      user: newUser,
    });
  } catch (error) {
    // console.error("Google Auth Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
  
  
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Login First",
      });
    }
    return res.status(200).clearCookie("token").json({
      success: true,
      message: "Logged out Successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Internall server error"
    })
  }
};

const deleteAccount = async(req,res) => {
  try {
    const email = req.params.email;

    // console.log("Email in Delete Account: ",email);

    // console.log("Existing User from Middleware: ",req.existingUser);

    if(!req.existingUser){
      return res.status(400).json({
        success:false,
        message:"Invalid User"
      })
    }

    
    await Session.deleteMany({email});
    await Message.deleteMany({email});
    await Result.deleteMany({email});
    await User.deleteOne({email});

    return res.status(200).clearCookie("token").json({
      success:true,
      mesage:"Account Deleted Successfully!"
    })
    
  } catch (error) {
    // console.log("Error in Delete Account: ",error.message);
  }
}

const checkUserAuthenticated = async(req,res) => {
  try {

    // console.log("Valid User: ",req.validUser);
      if(!req.validUser){
        return res.status(400).json({
          success:false,
          message:"Unauthorized User!"
        })
      }

      return res.status(200).json({
        success:true,
        message:"Authorized User!"
      })
  } catch (error) {
    // console.log("Error in checkUserAuthenticated: ",error.message);
    return res.status(500).json({
      success:false,
      message:"Internal Server Error"
    })
  }
}

export { googleAuth, logout, deleteAccount, checkUserAuthenticated };
