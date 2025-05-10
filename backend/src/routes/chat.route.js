import {Router} from "express";
import { submitJD, handleChat } from "../controllers/chat.controller.js";

const router = Router();


router.post("/submit-jd",submitJD)
router.post("/handle-chat",handleChat)

export default router;
