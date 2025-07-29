import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./services/passport.js"


import authRouter from "./routes/auth.route.js"
import chatRouter from "./routes/chat.route.js"
import sessionRouter from "./routes/session.route.js"
import passport from "passport";


const app = express();
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(passport.initialize());

const allowedOrigin = process.env.CLIENT_URI ;
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());



app.get("/", (req,res) => {
    return res.send("Hii");
})



app.use("/api/auth",authRouter);
app.use("/api/chat",chatRouter);
app.use("/api/session",sessionRouter);


export default app;