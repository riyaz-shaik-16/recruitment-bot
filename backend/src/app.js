import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route.js"
import chatRouter from "./routes/chat.route.js"
import sessionRouter from "./routes/session.route.js"


const app = express();
app.use(cookieParser());

const allowedOrigin = process.env.CLIENT_URI;
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());



app.get("/", (req,res) => {
    res.send("Hii");
})



app.use("/api/auth",authRouter);
app.use("/api/chat",chatRouter);
app.use("/api/session",sessionRouter);


export default app;