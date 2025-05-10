// models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    firstName:{
      type:String,
      required:true
    },

    lastName:{
      type:String
    },
    
    name: String,
    picture: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
