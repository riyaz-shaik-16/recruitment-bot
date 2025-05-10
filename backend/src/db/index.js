import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({
    path: "./.env"
});

const connectMONGODB = async ( ) => {

    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("✅ MongoDB Database Connected Successfully");
    })
    .catch((error)=>{
        console.log("❌MONGODB connection failed:", error.message)
    })
}

export {  connectMONGODB }; 

