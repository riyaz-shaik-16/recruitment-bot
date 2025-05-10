import dotenv from "dotenv";
import {  connectMONGODB } from "./db/index.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

const connectDB = () => {
  connectMONGODB()
  .then(app.listen(process.env.PORT || 9001, () => {
    console.log(`⚙️  Server is running at port: ${process.env.PORT}`);
  }))
  .catch((err)=>{
    console.log("Error  connecting to mongodb : ",err.message);
  })
  
};

connectDB();
