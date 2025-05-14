import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

const checkUserAuthenticated = async(req,res,next) => {
    try {
        const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

      // console.log("Token: ",token);
      // console.log("REq Body: ",req.body);

      if(!token){
        return res.status(400).json({
            suvccess:false,
            message:"Token not Provided"
        })
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // console.log("Decoded: ",decoded);

      const existingUser = await User.findOne({email:decoded.email});

      if(!existingUser || existingUser.length === 0){
        req.validUser = false
      }

      req.validUser = true,

      next();
        
    } catch (error) {
        // console.log("Error in CheckUSerAuthenticated Middleware: ",error.message);
        return res.status(500).json({
            suvccess:false,
            message:"Internal Server Error!"
        })
    }
}

export default checkUserAuthenticated;