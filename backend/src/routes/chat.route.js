import {Router} from "express";
import { submitJD, handleChat, evaluateResult } from "../controllers/chat.controller.js";

const router = Router();


router.post("/submit-jd",submitJD)
router.post("/handle-chat",handleChat)
router.post("/evaluate-result",evaluateResult)

export default router;
