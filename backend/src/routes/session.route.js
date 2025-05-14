import {Router} from "express";
import { getSessionDetails,getAllSessions, deleteSession  } from "../controllers/session.controller.js";
import checkSessionId from "../middlewares/session.middleware.js";
import checkUser from "../middlewares/auth.middleware.js"

const router = Router();

router.get("/get-session-details",checkSessionId,getSessionDetails);
router.get("/get-all-sessions/:email",checkUser,getAllSessions);
router.delete("/delete-session",checkSessionId,deleteSession);

export default router;